<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FingerprintDevice extends Model
{
    protected $fillable = [
        'name',
        'ip_address',
        'port',
        'device_password',
        'serial_number',
        'location',
        'connection_type',
        'timeout_seconds',
        'sync_interval_minutes',
        'last_synced_at',
        'last_sync_records',
        'is_active',
        'status',
        'last_error',
    ];

    protected function casts(): array
    {
        return [
            'is_active'      => 'boolean',
            'last_synced_at' => 'datetime',
        ];
    }

    public function deviceLogs()
    {
        return $this->hasMany(DeviceLog::class, 'device_id');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function markOnline(int $records = 0): void
    {
        $this->update([
            'status'             => 'online',
            'last_synced_at'     => now(),
            'last_sync_records'  => $records,
            'last_error'         => null,
        ]);
    }

    public function markError(string $message): void
    {
        $this->update([
            'status'     => 'error',
            'last_error' => $message,
        ]);
    }
}
