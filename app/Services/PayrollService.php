<?php

namespace App\Services;

use App\Models\Employee;
use App\Models\Payroll;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;

class PayrollService
{
    public function paginate(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        return Payroll::with(['employee.user', 'processor'])
            ->when($filters['month'] ?? null, fn ($q, $m) => $q->where('month', $m))
            ->when($filters['year'] ?? null, fn ($q, $y) => $q->where('year', $y))
            ->when($filters['status'] ?? null, fn ($q, $s) => $q->where('status', $s))
            ->when($filters['employee_id'] ?? null, fn ($q, $id) => $q->where('employee_id', $id))
            ->orderByDesc('year')->orderByDesc('month')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function generate(int $employeeId, int $month, int $year, array $overrides = []): Payroll
    {
        $employee = Employee::findOrFail($employeeId);

        $baseSalary  = $overrides['base_salary'] ?? $employee->base_salary;
        $allowances  = $overrides['allowances'] ?? 0;
        $deductions  = $overrides['deductions'] ?? 0;
        $tax         = round(($baseSalary + $allowances) * 0.1, 2); // 10% tax flat
        $netSalary   = $baseSalary + $allowances - $deductions - $tax;

        return Payroll::updateOrCreate(
            ['employee_id' => $employeeId, 'month' => $month, 'year' => $year],
            [
                'base_salary'   => $baseSalary,
                'allowances'    => $allowances,
                'deductions'    => $deductions,
                'tax'           => $tax,
                'net_salary'    => $netSalary,
                'working_days'  => $overrides['working_days'] ?? 26,
                'present_days'  => $overrides['present_days'] ?? 26,
                'leave_days'    => $overrides['leave_days'] ?? 0,
                'status'        => 'processed',
                'processed_by'  => Auth::id(),
                'notes'         => $overrides['notes'] ?? null,
            ]
        );
    }

    public function markAsPaid(Payroll $payroll): Payroll
    {
        $payroll->update(['status' => 'paid', 'paid_at' => now()]);
        return $payroll;
    }
}
