<?php

namespace App\Services;

use App\Models\Attendance;
use App\Models\Department;
use App\Models\Employee;
use App\Models\LeaveRequest;
use App\Models\Payroll;
use App\Models\User;
use Illuminate\Support\Carbon;

class DashboardService
{
    public function getAdminStats(): array
    {
        $now = Carbon::now();

        return [
            'total_employees'      => Employee::count(),
            'active_employees'     => Employee::active()->count(),
            'total_departments'    => Department::where('is_active', true)->count(),
            'pending_leaves'       => LeaveRequest::pending()->count(),
            'today_present'        => Attendance::today()->where('status', 'present')->count(),
            'today_absent'         => Attendance::today()->where('status', 'absent')->count(),
            'total_payroll_month'  => Payroll::forPeriod($now->month, $now->year)->sum('net_salary'),
            'new_employees_month'  => Employee::whereMonth('hire_date', $now->month)
                                              ->whereYear('hire_date', $now->year)
                                              ->count(),
        ];
    }

    public function getHrStats(): array
    {
        $now = Carbon::now();

        return [
            'total_employees'  => Employee::count(),
            'pending_leaves'   => LeaveRequest::pending()->count(),
            'today_present'    => Attendance::today()->where('status', 'present')->count(),
            'today_absent'     => Attendance::today()->where('status', 'absent')->count(),
            'on_leave_today'   => Attendance::today()->where('status', 'on_leave')->count(),
            'departments'      => Department::where('is_active', true)->count(),
        ];
    }

    public function getEmployeeStats(int $employeeId): array
    {
        $now = Carbon::now();

        $presentDays = Attendance::where('employee_id', $employeeId)
            ->forMonth($now->month, $now->year)
            ->where('status', 'present')
            ->count();

        $leaveDays = LeaveRequest::where('employee_id', $employeeId)
            ->where('status', 'approved')
            ->whereMonth('start_date', $now->month)
            ->whereYear('start_date', $now->year)
            ->sum('total_days');

        $pendingLeaves = LeaveRequest::where('employee_id', $employeeId)
            ->pending()
            ->count();

        $latestPayroll = Payroll::where('employee_id', $employeeId)
            ->orderByDesc('year')->orderByDesc('month')
            ->first();

        return [
            'present_days_month' => $presentDays,
            'leave_days_month'   => $leaveDays,
            'pending_leaves'     => $pendingLeaves,
            'net_salary'         => $latestPayroll?->net_salary ?? 0,
        ];
    }

    public function getRecentAttendance(int $limit = 10): \Illuminate\Database\Eloquent\Collection
    {
        return Attendance::with('employee.user')
            ->orderByDesc('date')
            ->limit($limit)
            ->get();
    }

    public function getMonthlyAttendanceChart(int $month, int $year): array
    {
        return Attendance::selectRaw('status, COUNT(*) as count')
            ->whereMonth('date', $month)
            ->whereYear('date', $year)
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();
    }
}
