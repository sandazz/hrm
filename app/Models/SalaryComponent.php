<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalaryComponent extends Model
{
    protected $fillable = [
        'employee_id',
        'component_type',
        'name',
        'amount',
        'is_percentage',
        'percentage',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'amount'        => 'decimal:2',
            'percentage'    => 'decimal:2',
            'is_percentage' => 'boolean',
            'is_active'     => 'boolean',
        ];
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function isAllowance(): bool
    {
        return str_contains($this->component_type, 'allowance');
    }

    public function isDeduction(): bool
    {
        return str_contains($this->component_type, 'deduction');
    }

    public function resolveAmount(float $baseSalary): float
    {
        if ($this->is_percentage && $this->percentage) {
            return round($baseSalary * ($this->percentage / 100), 2);
        }

        return (float) $this->amount;
    }
}
