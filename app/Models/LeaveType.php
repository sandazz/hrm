<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LeaveType extends Model
{
    protected $fillable = [
        'name',
        'code',
        'days_allowed',
        'is_paid',
        'is_active',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'is_paid'   => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    public function leaveRequests()
    {
        return $this->hasMany(LeaveRequest::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
