<?php

namespace App\Services;

use App\Models\Attendance;
use App\Models\Department;
use App\Models\Employee;
use App\Models\LeaveRequest;
use App\Models\Payroll;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class ReportService
{
    // ── Attendance Reports ────────────────────────────────────────────────────

    public function attendanceSummary(int $month, int $year, ?int $departmentId = null): array
    {
        $query = Attendance::with(['employee.user', 'employee.department'])
            ->forMonth($month, $year);

        if ($departmentId) {
            $query->whereHas('employee', fn ($q) => $q->where('department_id', $departmentId));
        }

        $records = $query->get();

        $employees = Employee::with('user', 'department')
            ->when($departmentId, fn ($q) => $q->where('department_id', $departmentId))
            ->active()
            ->get();

        $workingDays = $this->getWorkingDaysInMonth($month, $year);

        $rows = $employees->map(function (Employee $emp) use ($records, $workingDays) {
            $empRecords = $records->where('employee_id', $emp->id);

            return [
                'employee_id'     => $emp->employee_id,
                'name'            => $emp->user->name ?? '',
                'department'      => $emp->department->name ?? '',
                'working_days'    => $workingDays,
                'present_days'    => $empRecords->whereIn('status', ['present', 'late'])->count(),
                'absent_days'     => $empRecords->where('status', 'absent')->count(),
                'late_days'       => $empRecords->where('is_late', true)->count(),
                'leave_days'      => $empRecords->where('status', 'on_leave')->count(),
                'overtime_hours'  => round($empRecords->sum('overtime_hours'), 2),
                'total_work_hours'=> round($empRecords->sum('work_hours'), 2),
            ];
        });

        return [
            'month'       => $month,
            'year'        => $year,
            'working_days'=> $workingDays,
            'summary'     => $rows,
            'totals'      => [
                'present_days'    => $rows->sum('present_days'),
                'absent_days'     => $rows->sum('absent_days'),
                'late_days'       => $rows->sum('late_days'),
                'overtime_hours'  => $rows->sum('overtime_hours'),
            ],
        ];
    }

    public function dailyAttendance(string $date, ?int $departmentId = null): array
    {
        $records = Attendance::with(['employee.user', 'employee.department'])
            ->whereDate('date', $date)
            ->when($departmentId, fn ($q) => $q->whereHas('employee', fn ($eq) => $eq->where('department_id', $departmentId)))
            ->get();

        return [
            'date'    => $date,
            'total'   => $records->count(),
            'present' => $records->whereIn('status', ['present', 'late'])->count(),
            'absent'  => $records->where('status', 'absent')->count(),
            'late'    => $records->where('is_late', true)->count(),
            'records' => $records->map(fn ($r) => [
                'employee_id'  => $r->employee->employee_id ?? '',
                'name'         => $r->employee->user->name ?? '',
                'department'   => $r->employee->department->name ?? '',
                'check_in'     => $r->check_in,
                'check_out'    => $r->check_out,
                'work_hours'   => $r->work_hours,
                'status'       => $r->status,
                'is_late'      => $r->is_late,
                'late_minutes' => $r->late_minutes,
                'source'       => $r->source,
            ]),
        ];
    }

    // ── Payroll Reports ───────────────────────────────────────────────────────

    public function payrollSummary(int $month, int $year, ?int $departmentId = null): array
    {
        $payrolls = Payroll::with(['employee.user', 'employee.department'])
            ->forPeriod($month, $year)
            ->when($departmentId, fn ($q) => $q->whereHas('employee', fn ($eq) => $eq->where('department_id', $departmentId)))
            ->get();

        $rows = $payrolls->map(fn (Payroll $p) => [
            'employee_id'      => $p->employee->employee_id ?? '',
            'name'             => $p->employee->user->name ?? '',
            'department'       => $p->employee->department->name ?? '',
            'base_salary'      => $p->base_salary,
            'gross_salary'     => $p->gross_salary,
            'allowances'       => $p->allowances,
            'overtime_pay'     => $p->overtime_pay,
            'bonus'            => $p->bonus,
            'epf_employee'     => $p->epf_employee,
            'epf_employer'     => $p->epf_employer,
            'etf_employer'     => $p->etf_employer,
            'no_pay_deduction' => $p->no_pay_deduction,
            'late_deduction'   => $p->late_deduction,
            'tax'              => $p->tax,
            'net_salary'       => $p->net_salary,
            'status'           => $p->status,
        ]);

        return [
            'month'        => $month,
            'year'         => $year,
            'payrolls'     => $rows,
            'totals'       => [
                'gross_salary'     => round($rows->sum('gross_salary'), 2),
                'net_salary'       => round($rows->sum('net_salary'), 2),
                'epf_employee'     => round($rows->sum('epf_employee'), 2),
                'epf_employer'     => round($rows->sum('epf_employer'), 2),
                'etf_employer'     => round($rows->sum('etf_employer'), 2),
                'tax'              => round($rows->sum('tax'), 2),
            ],
        ];
    }

    public function payrollTrend(int $months = 6): array
    {
        $data = [];
        for ($i = $months - 1; $i >= 0; $i--) {
            $date  = now()->subMonths($i);
            $month = (int) $date->format('m');
            $year  = (int) $date->format('Y');

            $payrolls = Payroll::forPeriod($month, $year)->get();

            $data[] = [
                'label'        => $date->format('M Y'),
                'month'        => $month,
                'year'         => $year,
                'total_gross'  => round($payrolls->sum('gross_salary'), 2),
                'total_net'    => round($payrolls->sum('net_salary'), 2),
                'total_epf'    => round($payrolls->sum('epf_employee') + $payrolls->sum('epf_employer'), 2),
                'total_etf'    => round($payrolls->sum('etf_employer'), 2),
                'head_count'   => $payrolls->count(),
            ];
        }

        return $data;
    }

    public function leaveReport(int $month, int $year): array
    {
        $requests = LeaveRequest::with(['employee.user', 'employee.department', 'leaveType'])
            ->whereYear('start_date', $year)
            ->whereMonth('start_date', $month)
            ->get();

        return [
            'total'    => $requests->count(),
            'approved' => $requests->where('status', 'approved')->count(),
            'pending'  => $requests->where('status', 'pending')->count(),
            'rejected' => $requests->where('status', 'rejected')->count(),
            'records'  => $requests->map(fn ($r) => [
                'employee'   => $r->employee->user->name ?? '',
                'department' => $r->employee->department->name ?? '',
                'leave_type' => $r->leaveType->name ?? '',
                'start_date' => $r->start_date->toDateString(),
                'end_date'   => $r->end_date->toDateString(),
                'total_days' => $r->total_days,
                'status'     => $r->status,
            ]),
        ];
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private function getWorkingDaysInMonth(int $month, int $year): int
    {
        $start = Carbon::createFromDate($year, $month, 1);
        $end   = $start->copy()->endOfMonth();
        $count = 0;
        for ($d = $start->copy(); $d->lte($end); $d->addDay()) {
            if (! $d->isWeekend()) {
                $count++;
            }
        }
        return $count;
    }
}
