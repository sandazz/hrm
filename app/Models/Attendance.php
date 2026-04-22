<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $fillable = [
        'employee_id',
        'shift_id',
        'date',
        'check_in',
        'check_out',
        'work_hours',
        'status',
        'notes',
        'source',
        'is_late',
        'late_minutes',
        'overtime_hours',
    ];

    protected function casts(): array
    {
        return [
            'date'           => 'date',
            'work_hours'     => 'decimal:2',
            'overtime_hours' => 'decimal:2',
            'is_late'        => 'boolean',
        ];
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function shift()
    {
        return $this->belongsTo(Shift::class);
    }

    public function scopeForMonth($query, int $month, int $year)
    {
        return $query->whereMonth('date', $month)->whereYear('date', $year);
    }

    public function scopeToday($query)
    {
        return $query->whereDate('date', today());
    }
}
