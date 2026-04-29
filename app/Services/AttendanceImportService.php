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
    /** Minimum gap (minutes) between two punches of the same employee to NOT be a duplicate */
    private const DUPLICATE_GAP_MINUTES = 30;

    /** Minimum gap (minutes) between check-in and check-out to be considered valid */
    private const MIN_WORK_GAP_MINUTES = 30;

    /**
     * Import attendance data from a CSV / plain-text file.
     *
     * Supported format — HisGLog tab-separated export (ZKTeco):
     *   No  DN  UID  Name  Status  Action  APB  JobCode  DateTime
     *   Action: 01 = check-in, 02 = check-out
     *   UID is mapped to employees.id (leading zeros stripped)
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
                'status'        => 'failed',
                'error_details' => [['row' => 0, 'error' => $e->getMessage()]],
            ]);
        }

        return $log;
    }

    /**
     * Parse the HisGLog tab-separated file.
     *
     * Returns array of ['uid' => int, 'action' => '01'|'02', 'datetime' => Carbon]
     */
    private function parseCsvFile(string $path): array
    {
        $content = file_get_contents($path);

        if ($content === false) {
            throw new \RuntimeException("Cannot read file.");
        }

        // ── Detect and convert encoding ───────────────────────────────────────
        // UTF-16 LE BOM: FF FE
        if (str_starts_with($content, "\xFF\xFE")) {
            $content = mb_convert_encoding(substr($content, 2), 'UTF-8', 'UTF-16LE');
        }
        // UTF-16 BE BOM: FE FF
        elseif (str_starts_with($content, "\xFE\xFF")) {
            $content = mb_convert_encoding(substr($content, 2), 'UTF-8', 'UTF-16BE');
        }
        // UTF-8 BOM: EF BB BF
        elseif (str_starts_with($content, "\xEF\xBB\xBF")) {
            $content = substr($content, 3);
        }

        // Normalise all line endings to \n
        $content = str_replace(["\r\n", "\r"], "\n", $content);
        $lines = explode("\n", $content);
        $rows  = [];

        foreach ($lines as $lineNumber => $line) {
            $line = trim($line);

            if (empty($line)) {
                continue;
            }

            // Skip header row: line 0 or starts with "No"
            if ($lineNumber === 0 || stripos($line, 'No') === 0) {
                continue;
            }

            // Tab-separated columns:
            // 0:No  1:DN  2:UID  3:Name  4:Status  5:Action  6:APB  7:JobCode  8:DateTime
            $parts = preg_split('/\t/', $line);

            // Need at least 9 columns (indices 0–8)
            if (count($parts) < 9) {
                continue;
            }

            // Trim each part individually to remove padding / CR artefacts
            $parts = array_map('trim', $parts);

            $rawUid = $parts[2];   // e.g. 000000000000000002
            $rawDt  = $parts[8];   // e.g. 2026/04/29 12:55:21

            // Strip leading zeros — UID maps directly to employees.id
            $numericUid = ltrim($rawUid, '0');
            $uid        = ($numericUid === '') ? 0 : (int) $numericUid;

            if ($uid <= 0) {
                continue;
            }

            // Try multiple datetime formats
            $dt = null;
            foreach (['Y/m/d H:i:s', 'Y-m-d H:i:s', 'd/m/Y H:i:s'] as $format) {
                try {
                    $dt = Carbon::createFromFormat($format, $rawDt);
                    if ($dt !== false) {
                        break;
                    }
                } catch (\Throwable) {
                    // try next format
                }
            }

            if ($dt === null) {
                continue;
            }

            $rows[] = [
                'uid'      => $uid,
                'datetime' => $dt,
            ];
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

        // ── Step 1: Group raw rows by uid + date ─────────────────────────────
        $grouped = [];
        foreach ($rows as $row) {
            $date = $row['datetime']->toDateString();
            $grouped[$row['uid']][$date][] = $row['datetime'];
        }

        DB::transaction(function () use (
            $grouped, $defaultShift,
            &$success, &$errors, &$duplicates, &$errorDetail
        ) {
            foreach ($grouped as $uid => $dates) {
                // ── Resolve employee by primary key (id) ─────────────────────
                $employee = Employee::find($uid);

                if (! $employee) {
                    $errors++;
                    $errorDetail[] = [
                        'uid'   => $uid,
                        'error' => "Employee with id={$uid} not found",
                    ];
                    continue;
                }

                foreach ($dates as $date => $punches) {
                    // ── Step 2: Sort punches by time ascending ────────────────
                    usort($punches, fn ($a, $b) => $a->timestamp <=> $b->timestamp);

                    // ── Step 3: Deduplicate — remove punches within 30 min gap
                    $deduplicated   = [];
                    $lastKeptTime   = null;
                    $internalDupCnt = 0;

                    foreach ($punches as $dt) {
                        if (
                            $lastKeptTime !== null &&
                            $dt->diffInMinutes($lastKeptTime) < self::DUPLICATE_GAP_MINUTES
                        ) {
                            $internalDupCnt++;
                            continue;
                        }
                        $deduplicated[] = $dt;
                        $lastKeptTime   = $dt;
                    }

                    $duplicates += $internalDupCnt;

                    if (empty($deduplicated)) {
                        $duplicates++;
                        continue;
                    }

                    // ── Step 4: Skip if attendance already exists for this day ─
                    if (Attendance::where('employee_id', $employee->id)
                        ->whereDate('date', $date)
                        ->exists()
                    ) {
                        $duplicates++;
                        continue;
                    }

                    // ── Step 5: First punch = check-in, last punch = check-out ─
                    $checkIn  = $deduplicated[0];
                    $checkOut = count($deduplicated) > 1 ? end($deduplicated) : null;

                    // ── Step 6: Validate check-in/check-out gap ───────────────
                    if ($checkOut !== null &&
                        $checkOut->diffInMinutes($checkIn) < self::MIN_WORK_GAP_MINUTES
                    ) {
                        $checkOut = null;
                    }

                    // ── Step 7: Calculate work hours & late status ────────────
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

                    $overtimeHours = max(0, $workHours - ($defaultShift?->overtime_after_hours ?? 8));

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
                        'overtime_hours' => $overtimeHours,
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
