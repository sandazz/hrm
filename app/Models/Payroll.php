<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payroll extends Model
{
    protected $fillable = [
        'employee_id',
        'month',
        'year',
        'base_salary',
        'gross_salary',
        'overtime_pay',
        'bonus',
        'allowances',
        'allowances_breakdown',
        'deductions',
        'no_pay_deduction',
        'late_deduction',
        'epf_employee',
        'epf_employer',
        'etf_employer',
        'tax',
        'net_salary',
        'working_days',
        'present_days',
        'leave_days',
        'overtime_hours',
        'late_days',
        'no_pay_days',
        'status',
        'paid_at',
        'notes',
        'payslip_path',
        'processed_by',
    ];

    protected function casts(): array
    {
        return [
            'base_salary'      => 'decimal:2',
            'gross_salary'     => 'decimal:2',
            'overtime_pay'     => 'decimal:2',
            'bonus'            => 'decimal:2',
            'allowances'           => 'decimal:2',
            'allowances_breakdown' => 'array',
            'deductions'           => 'decimal:2',
            'no_pay_deduction' => 'decimal:2',
            'late_deduction'   => 'decimal:2',
            'epf_employee'     => 'decimal:2',
            'epf_employer'     => 'decimal:2',
            'etf_employer'     => 'decimal:2',
            'tax'              => 'decimal:2',
            'net_salary'       => 'decimal:2',
            'paid_at'          => 'datetime',
        ];
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function processor()
    {
        return $this->belongsTo(User::class, 'processed_by');
    }

    public function scopeForPeriod($query, int $month, int $year)
    {
        return $query->where('month', $month)->where('year', $year);
    }
}
