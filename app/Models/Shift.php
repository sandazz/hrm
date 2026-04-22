<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Shift extends Model
{
    protected $fillable = [
        'name',
        'start_time',
        'end_time',
        'max_late_minutes',
        'grace_period_minutes',
        'overtime_after_hours',
        'is_default',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_default'            => 'boolean',
            'is_active'             => 'boolean',
            'overtime_after_hours'  => 'decimal:2',
        ];
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public static function getDefault(): ?self
    {
        return static::where('is_default', true)->where('is_active', true)->first();
    }
}
