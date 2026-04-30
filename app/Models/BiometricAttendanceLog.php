<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BiometricAttendanceLog extends Model
{
    protected $fillable = [
        'employee_id',
        'attendance_time',
        'type',
        'biometric_uid',
    ];

    protected function casts(): array
    {
        return [
            'attendance_time' => 'datetime',
        ];
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    /**
     * Scope to fetch the latest log for a given employee.
     */
    public function scopeLatestForEmployee($query, int $employeeId)
    {
        return $query->where('employee_id', $employeeId)
            ->orderByDesc('attendance_time');
    }
}
