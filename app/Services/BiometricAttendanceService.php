<?php

namespace App\Services;

use App\Models\Attendance;
use App\Models\BiometricAttendanceLog;
use App\Models\Employee;
use App\Models\Shift;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class BiometricAttendanceService
{
    /**
     * Minimum minutes between two punches to be treated as a new event.
     * Punches within this window are considered duplicates and ignored.
     */
    private const DUPLICATE_THRESHOLD_MINUTES = 30;

    /**
     * Process a batch of raw biometric records.
     *
     * Each item in $records must have:
     *   - UID      (string) : biometric UID that maps to Employee::id (primary key)
     *   - AttTime  (string) : datetime string in 'Y-m-d H:i:s' format
     *
     * @param  array<int, array{UID: string, AttTime: string}>  $records
     * @return array{inserted: int, skipped: int, errors: array}
     */
    public function processBatch(array $records): array
    {
        // Sort records ascending by time so we process them in chronological order.
        usort($records, fn ($a, $b) => strcmp($a['AttTime'], $b['AttTime']));

        // Pre-load all employees keyed by fingerprint_uid.
        $uids      = collect($records)->pluck('UID')->unique()->map(fn ($uid) => (string) $uid)->values()->all();
        $employees = Employee::whereIn('fingerprint_uid', $uids)
            ->get()
            ->keyBy('fingerprint_uid');

        // Fetch the current last log for every relevant employee in one query.
        $employeeIds = $employees->pluck('id')->all();

        /**
         * @var Collection<int, BiometricAttendanceLog>
         * Keyed by employee primary key → latest log row.
         */
        $lastLogs = BiometricAttendanceLog::whereIn('employee_id', $employeeIds)
            ->orderBy('attendance_time')
            ->get()
            ->groupBy('employee_id')
            ->map(fn (Collection $logs) => $logs->last());

        $inserted = 0;
        $skipped  = 0;
        $errors   = [];

        $defaultShift = Shift::getDefault();

        DB::transaction(function () use (
            $records, $employees, &$lastLogs, &$inserted, &$skipped, &$errors, $defaultShift
        ) {
            foreach ($records as $index => $record) {
                try {
                    $uid     = (string) $record['UID'];
                    $attTime = Carbon::createFromFormat('Y-m-d H:i:s', $record['AttTime']);

                    // Resolve employee by fingerprint_uid.
                    $employee = $employees->get($uid);

                    if (! $employee) {
                        $errors[] = [
                            'record'  => $record,
                            'reason'  => "No employee found with fingerprint_uid = '{$uid}'.",
                        ];
                        continue;
                    }

                    $employeeId = $employee->id;
                    $lastLog    = $lastLogs->get($employeeId);

                    // ── Determine punch type ───────────────────────────────────────
                    if ($lastLog === null) {
                        // No previous record → first punch is always IN.
                        $type = 'IN';
                    } else {
                        $diffMinutes = $lastLog->attendance_time->diffInMinutes($attTime, absolute: true);

                        if ($diffMinutes < self::DUPLICATE_THRESHOLD_MINUTES) {
                            // Within duplicate window → skip silently.
                            $skipped++;
                            continue;
                        }

                        // Alternate the type from the previous record.
                        $type = $lastLog->type === 'IN' ? 'OUT' : 'IN';
                    }

                    // ── Persist biometric log ─────────────────────────────────────
                    $log = BiometricAttendanceLog::create([
                        'employee_id'     => $employeeId,
                        'attendance_time' => $attTime,
                        'type'            => $type,
                        'biometric_uid'   => $uid,
                    ]);

                    // Update the in-memory last log so subsequent records in this
                    // same batch are evaluated against the just-inserted row.
                    $lastLogs->put($employeeId, $log);

                    // ── Sync attendances table (same as CSV / device import) ───────
                    $date            = $attTime->toDateString();
                    $existingAttendance = Attendance::where('employee_id', $employeeId)
                        ->whereDate('date', $date)
                        ->first();

                    if ($type === 'IN') {
                        // Calculate late minutes against default shift.
                        $isLate      = false;
                        $lateMinutes = 0;
                        if ($defaultShift) {
                            $shiftStart  = Carbon::parse($date . ' ' . $defaultShift->start_time);
                            $lateMinutes = max(0, $attTime->diffInMinutes($shiftStart, false) * -1);
                            $isLate      = $lateMinutes > $defaultShift->grace_period_minutes;
                        }

                        Attendance::updateOrCreate(
                            ['employee_id' => $employeeId, 'date' => $date],
                            [
                                'shift_id'       => $defaultShift?->id,
                                'check_in'       => $attTime->format('H:i:s'),
                                'status'         => 'present',
                                'source'         => 'device',
                                'is_late'        => $isLate,
                                'late_minutes'   => $lateMinutes,
                            ]
                        );
                    } else {
                        // OUT punch — update check_out and recalculate work/overtime hours.
                        $checkIn   = $existingAttendance?->check_in
                            ? Carbon::parse($date . ' ' . $existingAttendance->check_in)
                            : null;
                        $workHours = 0;
                        if ($checkIn) {
                            $workHours = round($checkIn->diffInMinutes($attTime) / 60, 2);
                        }

                        Attendance::updateOrCreate(
                            ['employee_id' => $employeeId, 'date' => $date],
                            [
                                'shift_id'       => $defaultShift?->id,
                                'check_out'      => $attTime->format('H:i:s'),
                                'work_hours'     => $workHours,
                                'status'         => $workHours > 0 ? 'present' : 'absent',
                                'source'         => 'device',
                                'overtime_hours' => max(0, $workHours - ($defaultShift?->overtime_after_hours ?? 8)),
                            ]
                        );
                    }

                    $inserted++;
                } catch (\Throwable $e) {
                    Log::error('BiometricAttendanceService: failed to process record', [
                        'record' => $record,
                        'error'  => $e->getMessage(),
                    ]);

                    $errors[] = [
                        'record' => $record,
                        'reason' => $e->getMessage(),
                    ];
                }
            }
        });

        return compact('inserted', 'skipped', 'errors');
    }
}
