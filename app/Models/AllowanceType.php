<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AllowanceType extends Model
{
    protected $fillable = [
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

    public function employees()
    {
        return $this->belongsToMany(Employee::class, 'employee_allowance_type');
    }

    public function resolveAmount(float $baseSalary): float
    {
        if ($this->is_percentage && $this->percentage) {
            return round($baseSalary * ($this->percentage / 100), 2);
        }

        return (float) $this->amount;
    }
}
