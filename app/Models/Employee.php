<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'department_id',
        'employee_id',
        'job_title',
        'phone',
        'address',
        'date_of_birth',
        'gender',
        'hire_date',
        'end_date',
        'employment_type',
        'status',
        'base_salary',
        'bank_account',
        'emergency_contact_name',
        'emergency_contact_phone',
    ];

    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date',
            'hire_date'     => 'date',
            'end_date'      => 'date',
            'base_salary'   => 'decimal:2',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function leaveRequests()
    {
        return $this->hasMany(LeaveRequest::class);
    }

    public function payrolls()
    {
        return $this->hasMany(Payroll::class);
    }

    public function salaryComponents()
    {
        return $this->hasMany(SalaryComponent::class);
    }

    public function deviceLogs()
    {
        return $this->hasMany(DeviceLog::class);
    }

    public function getFullNameAttribute(): string
    {
        return $this->user->name ?? '';
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}
