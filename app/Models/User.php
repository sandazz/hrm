<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'avatar',
        'is_active',
    ];

    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'is_active'         => 'boolean',
        ];
    }

    // ─── Role Helpers ────────────────────────────────────────────────────────────

    public function isAdmin(): bool { return $this->role === 'admin'; }
    public function isHr(): bool    { return $this->role === 'hr'; }
    public function isEmployee(): bool { return $this->role === 'employee'; }

    public function hasRole(string|array $roles): bool
    {
        return in_array($this->role, (array) $roles);
    }

    public function getDashboardRoute(): string
    {
        return match ($this->role) {
            'admin'  => 'admin.dashboard',
            'hr'     => 'hr.dashboard',
            default  => 'employee.dashboard',
        };
    }

    // ─── Relationships ────────────────────────────────────────────────────────────

    public function employee()
    {
        return $this->hasOne(Employee::class);
    }

    public function managedDepartments()
    {
        return $this->hasMany(Department::class, 'manager_id');
    }

    public function approvedLeaves()
    {
        return $this->hasMany(LeaveRequest::class, 'approved_by');
    }
}
