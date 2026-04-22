<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeviceLog extends Model
{
    protected $fillable = [
        'device_id',
        'employee_id',
        'biometric_uid',
        'biometric_employee_id',
        'punch_time',
        'punch_type',
        'verify_type',
        'is_processed',
        'processed_at',
        'error_notes',
    ];

    protected function casts(): array
    {
        return [
            'punch_time'   => 'datetime',
            'processed_at' => 'datetime',
            'is_processed' => 'boolean',
        ];
    }

    public function device()
    {
        return $this->belongsTo(FingerprintDevice::class, 'device_id');
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function scopeUnprocessed($query)
    {
        return $query->where('is_processed', false);
    }

    public function scopeForDate($query, string $date)
    {
        return $query->whereDate('punch_time', $date);
    }
}
