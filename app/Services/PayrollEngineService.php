<?php

namespace App\Services;

use App\Models\Attendance;
use App\Models\Employee;
use App\Models\Payroll;
use App\Models\SalaryComponent;
use App\Models\Setting;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

/**
 * Advanced Payroll Engine — Sri Lanka compliant
 *
 * Rates (2024):
 *   EPF Employee  : 8%  of basic salary
 *   EPF Employer  : 12% of basic salary
 *   ETF Employer  : 3%  of basic salary
 *   PAYE Tax      : Progressive — see calcPayeTax()
 */
class PayrollEngineService
{
    // EPF/ETF Rates
    private float $epfEmployee = 0.08;
    private float $epfEmployer = 0.12;
    private float $etfEmployer = 0.03;

    // Overtime multiplier
    private float $overtimeMultiplier = 1.5;

    public function __construct()
    {
        // Load configurable rates from settings
        $this->epfEmployee       = (float) (Setting::get('payroll_epf_employee_rate', 8) / 100);
        $this->epfEmployer       = (float) (Setting::get('payroll_epf_employer_rate', 12) / 100);
        $this->etfEmployer       = (float) (Setting::get('payroll_etf_employer_rate', 3) / 100);
        $this->overtimeMultiplier = (float) Setting::get('payroll_overtime_multiplier', 1.5);
    }

    public function generate(int $employeeId, int $month, int $year, array $overrides = []): Payroll
    {
        $employee = Employee::with('salaryComponents')->findOrFail($employeeId);

        return DB::transaction(function () use ($employee, $month, $year, $overrides) {
            $baseSalary = (float) ($overrides['base_salary'] ?? $employee->base_salary);

            // ── Attendance data ─────────────────────────────────────────────
            $attendance = $this->getAttendanceData($employee->id, $month, $year);

            $workingDays  = $overrides['working_days'] ?? $attendance['working_days'];
            $presentDays  = $overrides['present_days'] ?? $attendance['present_days'];
            $leaveDays    = $overrides['leave_days'] ?? $attendance['leave_days'];
            $lateDays     = $overrides['late_days'] ?? $attendance['late_days'];
            $noPayDays    = $overrides['no_pay_days'] ?? $attendance['no_pay_days'];
            $overtimeHrs  = $overrides['overtime_hours'] ?? $attendance['overtime_hours'];

            // ── Allowances from salary components ────────────────────────────
            $componentAllowances = 0;
            $componentDeductions = 0;

            foreach ($employee->salaryComponents->where('is_active', true) as $component) {
                $amount = $component->resolveAmount($baseSalary);
                if ($component->isAllowance()) {
                    $componentAllowances += $amount;
                } else {
                    $componentDeductions += $amount;
                }
            }

            $additionalAllowances = (float) ($overrides['allowances'] ?? 0);
            $totalAllowances      = round($componentAllowances + $additionalAllowances, 2);

            $bonus        = (float) ($overrides['bonus'] ?? 0);
            $grossSalary  = round($baseSalary + $totalAllowances + $bonus, 2);

            // ── Deductions ────────────────────────────────────────────────────
            $dailyRate       = $workingDays > 0 ? $baseSalary / $workingDays : 0;
            $noPayDeduction  = round($dailyRate * $noPayDays, 2);
            $lateDeduction   = (float) ($overrides['late_deduction'] ?? $this->calcLateDeduction($baseSalary, $workingDays, $lateDays));

            $overtimePay     = $this->calcOvertimePay($baseSalary, $workingDays, $overtimeHrs);
            $grossSalary    += $overtimePay;

            // ── EPF / ETF (on basic salary) ───────────────────────────────────
            $epfEmployee  = round($baseSalary * $this->epfEmployee, 2);
            $epfEmployer  = round($baseSalary * $this->epfEmployer, 2);
            $etfEmployer  = round($baseSalary * $this->etfEmployer, 2);

            // ── PAYE Tax (on gross after EPF employee contribution) ───────────
            $taxableIncome = $grossSalary - $epfEmployee - $noPayDeduction;
            $tax           = $this->calcPayeTax($taxableIncome);

            $additionalDeductions = (float) ($overrides['deductions'] ?? 0);
            $totalDeductions      = $componentDeductions + $additionalDeductions;

            $netSalary = round(
                $grossSalary - $epfEmployee - $noPayDeduction - $lateDeduction - $tax - $totalDeductions,
                2
            );

            return Payroll::updateOrCreate(
                ['employee_id' => $employee->id, 'month' => $month, 'year' => $year],
                [
                    'base_salary'      => $baseSalary,
                    'gross_salary'     => $grossSalary,
                    'overtime_pay'     => $overtimePay,
                    'bonus'            => $bonus,
                    'allowances'       => $totalAllowances,
                    'deductions'       => $totalDeductions,
                    'no_pay_deduction' => $noPayDeduction,
                    'late_deduction'   => $lateDeduction,
                    'epf_employee'     => $epfEmployee,
                    'epf_employer'     => $epfEmployer,
                    'etf_employer'     => $etfEmployer,
                    'tax'              => $tax,
                    'net_salary'       => $netSalary,
                    'working_days'     => $workingDays,
                    'present_days'     => $presentDays,
                    'leave_days'       => $leaveDays,
                    'overtime_hours'   => $overtimeHrs,
                    'late_days'        => $lateDays,
                    'no_pay_days'      => $noPayDays,
                    'status'           => 'processed',
                    'processed_by'     => Auth::id(),
                    'notes'            => $overrides['notes'] ?? null,
                ]
            );
        });
    }

    // ── Bulk generation for a period ─────────────────────────────────────────

    public function generateBulk(int $month, int $year): array
    {
        $employees = Employee::active()->get();
        $results   = ['success' => 0, 'failed' => 0, 'errors' => []];

        foreach ($employees as $employee) {
            try {
                $this->generate($employee->id, $month, $year);
                $results['success']++;
            } catch (\Throwable $e) {
                $results['failed']++;
                $results['errors'][] = "Employee #{$employee->employee_id}: " . $e->getMessage();
            }
        }

        return $results;
    }

    public function markAsPaid(Payroll $payroll): Payroll
    {
        $payroll->update(['status' => 'paid', 'paid_at' => now()]);
        return $payroll;
    }

    public function paginate(array $filters = [], int $perPage = 15)
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

    // ── Calculation helpers ───────────────────────────────────────────────────

    private function getAttendanceData(int $employeeId, int $month, int $year): array
    {
        $records      = Attendance::where('employee_id', $employeeId)->forMonth($month, $year)->get();
        $daysInMonth  = Carbon::createFromDate($year, $month, 1)->daysInMonth;
        $workingDays  = $this->getWorkingDays($month, $year);

        return [
            'working_days'  => $workingDays,
            'present_days'  => $records->whereIn('status', ['present', 'late'])->count(),
            'leave_days'    => $records->where('status', 'on_leave')->count(),
            'late_days'     => $records->where('is_late', true)->count(),
            'no_pay_days'   => max(0, $workingDays - $records->whereIn('status', ['present', 'late', 'on_leave', 'holiday'])->count()),
            'overtime_hours' => (int) $records->sum('overtime_hours'),
        ];
    }

    private function getWorkingDays(int $month, int $year): int
    {
        $workingDaysPerWeek = (int) Setting::get('working_days_per_week', 5);
        $holidays           = (int) Setting::get("holidays_{$year}_{$month}", 0);

        $start = Carbon::createFromDate($year, $month, 1);
        $end   = $start->copy()->endOfMonth();

        $count = 0;
        for ($d = $start->copy(); $d->lte($end); $d->addDay()) {
            if ($workingDaysPerWeek >= 5 && $d->isWeekend()) {
                continue;
            }
            if ($workingDaysPerWeek < 5 && $d->isSunday()) {
                continue;
            }
            $count++;
        }

        return max(1, $count - $holidays);
    }

    /**
     * PAYE Tax — Sri Lanka (monthly, LKR)
     * Monthly taxable income bands (FY 2024):
     *   Up to 100,000          → 0%
     *   100,001 – 141,667      → 6%
     *   141,668 – 183,333      → 12%
     *   183,334 – 225,000      → 18%
     *   225,001 – 266,667      → 24%
     *   Above 266,667          → 30%
     */
    private function calcPayeTax(float $monthlyIncome): float
    {
        $raw = \App\Models\Setting::get('paye_tax_brackets', null);
        $brackets = $raw ? json_decode($raw, true) : null;

        if (!is_array($brackets) || empty($brackets)) {
            $brackets = \App\Services\SettingService::defaultPayeBrackets();
        }

        $tax = 0;
        foreach ($brackets as $bracket) {
            $lower = (float) $bracket['from'];
            $upper = isset($bracket['to']) && $bracket['to'] !== null ? (float) $bracket['to'] : PHP_FLOAT_MAX;
            $rate  = (float) $bracket['rate'] / 100;

            if ($monthlyIncome > $lower) {
                $taxable = min($monthlyIncome, $upper) - $lower;
                $tax    += $taxable * $rate;
            }
        }

        return round($tax, 2);
    }

    private function calcOvertimePay(float $baseSalary, int $workingDays, int $overtimeHours): float
    {
        if ($overtimeHours <= 0 || $workingDays <= 0) {
            return 0;
        }
        $hourlyRate = $baseSalary / ($workingDays * 8);
        return round($hourlyRate * $this->overtimeMultiplier * $overtimeHours, 2);
    }

    private function calcLateDeduction(float $baseSalary, int $workingDays, int $lateDays): float
    {
        $lateDeductionDays = (int) Setting::get('payroll_late_deduction_days', 0);
        if ($lateDeductionDays <= 0 || $workingDays <= 0) {
            return 0;
        }
        $lateThreshold = (int) Setting::get('payroll_late_threshold_days', 3);
        $daysToDeduct  = max(0, $lateDays - $lateThreshold) * $lateDeductionDays;
        return round(($baseSalary / $workingDays) * $daysToDeduct, 2);
    }
}
