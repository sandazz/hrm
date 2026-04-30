<?php

namespace App\Services;

use App\Models\Attendance;
use App\Models\AttendanceImportLog;
use App\Models\DeviceLog;
use App\Models\Employee;
use App\Models\Shift;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\UploadedFile;

class AttendanceImportService
{
    /**
     * Import attendance data from a CSV / plain-text file.
     *
     * Expected CSV columns (ZKTeco default export):
     *   Employee ID, Name, Date/Time, Status/Type
     *
     * The file may also be a raw ZKTeco "att.dat" style text export.
     */
    public function importCsv(UploadedFile $file): AttendanceImportLog
    {
        $log = AttendanceImportLog::create([
            'filename'    => $file->getClientOriginalName(),
            'imported_by' => Auth::id(),
            'status'      => 'processing',
        ]);

        try {
            $rows   = $this->parseCsvFile($file->getRealPath());
            $result = $this->processRows($rows, $log);

            $log->update([
                'total_records'   => $result['total'],
                'success_count'   => $result['success'],
                'error_count'     => $result['errors'],
                'duplicate_count' => $result['duplicates'],
                'error_details'   => $result['error_details'],
                'status'          => 'completed',
            ]);
        } catch (\Throwable $e) {
            $log->update([
                'status'       => 'failed',
                'error_details' => [['row' => 0, 'error' => $e->getMessage()]],
            ]);
        }

        return $log;
    }

    private function parseCsvFile(string $path): array
    {
        $rows   = [];
        $handle = fopen($path, 'r');

        if (! $handle) {
            throw new \RuntimeException("Cannot read file.");
        }

        // Detect if it's a standard CSV or ZK raw export
        $firstLine = fgets($handle);
        rewind($handle);

        $isRaw = ! str_contains($firstLine, ',') && str_contains($firstLine, "\t");

        while (($line = fgets($handle)) !== false) {
            $line = trim($line);
            if (empty($line)) {
                continue;
            }

            if ($isRaw) {
                // Tab-separated: uid \t datetime \t status \t verify
                $parts = preg_split('/\t+/', $line);
                if (count($parts) >= 2) {
                    $rows[] = [
                        'employee_id' => trim($parts[0] ?? ''),
                        'datetime'    => trim($parts[1] ?? ''),
                        'type'        => trim($parts[2] ?? '0'),
                    ];
                }
            } else {
                // CSV
                $parts = str_getcsv($line);
                if (count($parts) >= 2) {
                    $rows[] = [
                        'employee_id' => trim($parts[0] ?? ''),
                        'datetime'    => trim($parts[2] ?? $parts[1] ?? ''),
                        'type'        => trim($parts[3] ?? '0'),
                    ];
                }
            }
        }

        fclose($handle);

        // Skip header row if it contains text like "No." or "Employee"
        if (isset($rows[0]) && ! is_numeric($rows[0]['employee_id'])) {
            array_shift($rows);
        }

        return $rows;
    }

    private function processRows(array $rows, AttendanceImportLog $log): array
    {
        $total       = count($rows);
        $success     = 0;
        $errors      = 0;
        $duplicates  = 0;
        $errorDetail = [];

        $defaultShift = Shift::getDefault();

        // Group by employee + date to determine check-in / check-out
        $grouped = [];
        foreach ($rows as $row) {
            $empId = $row['employee_id'];
            try {
                $dt   = Carbon::parse($row['datetime']);
                $date = $dt->toDateString();
                $grouped[$empId][$date][] = $dt;
            } catch (\Throwable) {
                // bad date
            }
        }

        DB::transaction(function () use ($grouped, $defaultShift, &$success, &$errors, &$duplicates, &$errorDetail) {
            foreach ($grouped as $biometricId => $dates) {
                // Try to resolve employee
                $employee = Employee::where('fingerprint_uid', $biometricId)
                    ->orWhere('employee_id', 'EMP-' . str_pad($biometricId, 4, '0', STR_PAD_LEFT))
                    ->orWhere('employee_id', $biometricId)
                    ->first();

                if (! $employee) {
                    $errors++;
                    $errorDetail[] = ['employee_id' => $biometricId, 'error' => 'Employee not found'];
                    continue;
                }

                foreach ($dates as $date => $times) {
                    // Check duplicate
                    if (Attendance::where('employee_id', $employee->id)->whereDate('date', $date)->exists()) {
                        $duplicates++;
                        continue;
                    }

                    sort($times); // ascending
                    $checkIn  = $times[0] ?? null;
                    $checkOut = count($times) > 1 ? end($times) : null;

                    $workHours = 0;
                    if ($checkIn && $checkOut) {
                        $workHours = round($checkIn->diffInMinutes($checkOut) / 60, 2);
                    }

                    $isLate      = false;
                    $lateMinutes = 0;
                    if ($defaultShift && $checkIn) {
                        $shiftStart  = Carbon::parse($date . ' ' . $defaultShift->start_time);
                        $lateMinutes = max(0, $checkIn->diffInMinutes($shiftStart, false) * -1);
                        $isLate      = $lateMinutes > $defaultShift->grace_period_minutes;
                    }

                    Attendance::create([
                        'employee_id'    => $employee->id,
                        'shift_id'       => $defaultShift?->id,
                        'date'           => $date,
                        'check_in'       => $checkIn?->format('H:i:s'),
                        'check_out'      => $checkOut?->format('H:i:s'),
                        'work_hours'     => $workHours,
                        'status'         => 'present',
                        'source'         => 'import',
                        'is_late'        => $isLate,
                        'late_minutes'   => $lateMinutes,
                        'overtime_hours' => max(0, $workHours - ($defaultShift?->overtime_after_hours ?? 8)),
                    ]);

                    $success++;
                }
            }
        });

        return compact('total', 'success', 'errors', 'duplicates') + ['error_details' => $errorDetail];
    }

    /**
     * Process unprocessed DeviceLogs into Attendance records.
     */
    public function processDeviceLogs(): int
    {
        $defaultShift = Shift::getDefault();
        $processed    = 0;

        $unprocessed = DeviceLog::with('employee')
            ->unprocessed()
            ->whereNotNull('employee_id')
            ->orderBy('punch_time')
            ->get();

        // Group by employee + date
        $grouped = $unprocessed->groupBy(function (DeviceLog $log) {
            return $log->employee_id . '_' . Carbon::parse($log->punch_time)->toDateString();
        });

        DB::transaction(function () use ($grouped, $defaultShift, &$processed) {
            foreach ($grouped as $key => $logs) {
                [$employeeId, $date] = explode('_', $key);

                $inLogs  = $logs->where('punch_type', 'in')->sortBy('punch_time');
                $outLogs = $logs->where('punch_type', 'out')->sortByDesc('punch_time');

                // If punch_type unknown, use first as in, last as out
                if ($inLogs->isEmpty() && $outLogs->isEmpty()) {
                    $sorted   = $logs->sortBy('punch_time');
                    $checkIn  = Carbon::parse($sorted->first()->punch_time);
                    $checkOut = $sorted->count() > 1 ? Carbon::parse($sorted->last()->punch_time) : null;
                } else {
                    $checkIn  = $inLogs->isNotEmpty() ? Carbon::parse($inLogs->first()->punch_time) : null;
                    $checkOut = $outLogs->isNotEmpty() ? Carbon::parse($outLogs->first()->punch_time) : null;
                }

                $workHours = 0;
                if ($checkIn && $checkOut) {
                    $workHours = round($checkIn->diffInMinutes($checkOut) / 60, 2);
                }

                $isLate      = false;
                $lateMinutes = 0;
                if ($defaultShift && $checkIn) {
                    $shiftStart  = Carbon::parse($date . ' ' . $defaultShift->start_time);
                    $lateMinutes = max(0, $checkIn->diffInMinutes($shiftStart, false) * -1);
                    $isLate      = $lateMinutes > $defaultShift->grace_period_minutes;
                }

                Attendance::updateOrCreate(
                    ['employee_id' => $employeeId, 'date' => $date],
                    [
                        'shift_id'       => $defaultShift?->id,
                        'check_in'       => $checkIn?->format('H:i:s'),
                        'check_out'      => $checkOut?->format('H:i:s'),
                        'work_hours'     => $workHours,
                        'status'         => $workHours > 0 ? 'present' : 'absent',
                        'source'         => 'device',
                        'is_late'        => $isLate,
                        'late_minutes'   => $lateMinutes,
                        'overtime_hours' => max(0, $workHours - ($defaultShift?->overtime_after_hours ?? 8)),
                    ]
                );

                $logs->each(fn (DeviceLog $l) => $l->update([
                    'is_processed' => true,
                    'processed_at' => now(),
                ]));

                $processed++;
            }
        });

        return $processed;
    }
}
