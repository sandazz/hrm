<?php

namespace App\Services;

use App\Models\Attendance;
use App\Models\Employee;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Carbon;

class AttendanceService
{
    public function paginate(array $filters = [], int $perPage = 20): LengthAwarePaginator
    {
        return Attendance::with('employee.user')
            ->when($filters['employee_id'] ?? null, fn ($q, $id) => $q->where('employee_id', $id))
            ->when($filters['date'] ?? null, fn ($q, $d) => $q->whereDate('date', $d))
            ->when($filters['month'] ?? null, fn ($q, $m) =>
                $q->whereMonth('date', $m)->whereYear('date', $filters['year'] ?? now()->year)
            )
            ->when($filters['status'] ?? null, fn ($q, $s) => $q->where('status', $s))
            ->orderByDesc('date')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function checkIn(int $employeeId): Attendance
    {
        return Attendance::updateOrCreate(
            ['employee_id' => $employeeId, 'date' => today()],
            ['check_in' => now()->format('H:i:s'), 'status' => 'present']
        );
    }

    public function checkOut(int $employeeId): ?Attendance
    {
        $attendance = Attendance::where('employee_id', $employeeId)
            ->whereDate('date', today())
            ->first();

        if ($attendance && $attendance->check_in) {
            $checkIn   = Carbon::parse($attendance->check_in);
            $checkOut  = now();
            $workHours = round($checkIn->diffInMinutes($checkOut) / 60, 2);

            $attendance->update([
                'check_out'  => $checkOut->format('H:i:s'),
                'work_hours' => $workHours,
            ]);
        }

        return $attendance;
    }

    public function manualEntry(array $data): Attendance
    {
        return Attendance::updateOrCreate(
            ['employee_id' => $data['employee_id'], 'date' => $data['date']],
            [
                'check_in'   => $data['check_in'] ?? null,
                'check_out'  => $data['check_out'] ?? null,
                'work_hours' => $data['work_hours'] ?? 0,
                'status'     => $data['status'],
                'notes'      => $data['notes'] ?? null,
            ]
        );
    }

    public function getMonthlyReport(int $employeeId, int $month, int $year): array
    {
        $records = Attendance::where('employee_id', $employeeId)
            ->forMonth($month, $year)
            ->get();

        return [
            'present'   => $records->where('status', 'present')->count(),
            'absent'    => $records->where('status', 'absent')->count(),
            'late'      => $records->where('status', 'late')->count(),
            'half_day'  => $records->where('status', 'half_day')->count(),
            'on_leave'  => $records->where('status', 'on_leave')->count(),
            'total_hours' => $records->sum('work_hours'),
            'records'   => $records,
        ];
    }
}
