<?php

namespace App\Services;

use App\Models\Employee;
use App\Models\LeaveType;
use App\Models\SalaryComponent;
use App\Models\Setting;
use App\Models\Shift;
use Illuminate\Support\Facades\DB;

class SettingService
{
    // ── General company settings ──────────────────────────────────────────────

    public function getCompanySettings(): array
    {
        return [
            'company_name'    => Setting::get('company_name', 'Starprint'),
            'company_address' => Setting::get('company_address', 'Ragama, Sri Lanka'),
            'company_phone'   => Setting::get('company_phone', ''),
            'company_email'   => Setting::get('company_email', ''),
            'company_logo'    => Setting::get('company_logo', ''),
            'currency'        => Setting::get('currency', 'LKR'),
            'timezone'        => Setting::get('timezone', 'Asia/Colombo'),
        ];
    }

    public function saveCompanySettings(array $data): void
    {
        foreach ($data as $key => $value) {
            Setting::set($key, $value, 'general');
        }
    }

    // ── Payroll settings ──────────────────────────────────────────────────────

    public function getPayrollSettings(): array
    {
        return [
            'payroll_epf_employee_rate'    => Setting::get('payroll_epf_employee_rate', 8),
            'payroll_epf_employer_rate'    => Setting::get('payroll_epf_employer_rate', 12),
            'payroll_etf_employer_rate'    => Setting::get('payroll_etf_employer_rate', 3),
            'payroll_overtime_multiplier'  => Setting::get('payroll_overtime_multiplier', 1.5),
            'payroll_late_threshold_days'  => Setting::get('payroll_late_threshold_days', 3),
            'payroll_late_deduction_days'  => Setting::get('payroll_late_deduction_days', 0),
            'working_days_per_week'        => Setting::get('working_days_per_week', 5),
        ];
    }

    public function savePayrollSettings(array $data): void
    {
        $types = [
            'payroll_epf_employee_rate'   => 'integer',
            'payroll_epf_employer_rate'   => 'integer',
            'payroll_etf_employer_rate'   => 'integer',
            'payroll_overtime_multiplier' => 'string',
            'payroll_late_threshold_days' => 'integer',
            'payroll_late_deduction_days' => 'integer',
            'working_days_per_week'       => 'integer',
        ];

        foreach ($data as $key => $value) {
            Setting::set($key, $value, 'payroll', $types[$key] ?? 'string');
        }
    }

    // ── PAYE Tax settings ─────────────────────────────────────────────────────

    public static function defaultPayeBrackets(): array
    {
        return [
            ['from' => 0,      'to' => 100000, 'rate' => 0],
            ['from' => 100000, 'to' => 141667, 'rate' => 6],
            ['from' => 141667, 'to' => 183333, 'rate' => 12],
            ['from' => 183333, 'to' => 225000, 'rate' => 18],
            ['from' => 225000, 'to' => 266667, 'rate' => 24],
            ['from' => 266667, 'to' => null,   'rate' => 30],
        ];
    }

    public function getPayeBrackets(): array
    {
        $raw = Setting::get('paye_tax_brackets', null);
        if ($raw) {
            $decoded = json_decode($raw, true);
            if (is_array($decoded)) return $decoded;
        }
        return self::defaultPayeBrackets();
    }

    public function savePayeBrackets(array $brackets): void
    {
        Setting::set('paye_tax_brackets', json_encode($brackets), 'payroll', 'string');
    }

    // ── Global allowance components ───────────────────────────────────────────

    public function getAllowanceComponents(): \Illuminate\Support\Collection
    {
        return SalaryComponent::with('employee.user')
            ->where('component_type', 'like', '%allowance%')
            ->orderBy('component_type')
            ->orderBy('name')
            ->get();
    }

    // ── Shift settings ────────────────────────────────────────────────────────

    public function getShifts(): \Illuminate\Database\Eloquent\Collection
    {
        return Shift::orderBy('name')->get();
    }

    public function createShift(array $data): Shift
    {
        if (isset($data['is_default']) && $data['is_default']) {
            Shift::where('is_default', true)->update(['is_default' => false]);
        }
        return Shift::create($data);
    }

    public function updateShift(Shift $shift, array $data): Shift
    {
        if (isset($data['is_default']) && $data['is_default']) {
            Shift::where('id', '!=', $shift->id)->where('is_default', true)->update(['is_default' => false]);
        }
        $shift->update($data);
        return $shift;
    }

    public function deleteShift(Shift $shift): void
    {
        $shift->delete();
    }

    // ── Leave type settings ───────────────────────────────────────────────────

    public function getLeaveTypes(): \Illuminate\Database\Eloquent\Collection
    {
        return LeaveType::orderBy('name')->get();
    }

    public function createLeaveType(array $data): LeaveType
    {
        return LeaveType::create($data);
    }

    public function updateLeaveType(LeaveType $leaveType, array $data): LeaveType
    {
        $leaveType->update($data);
        return $leaveType;
    }

    public function deleteLeaveType(LeaveType $leaveType): void
    {
        $leaveType->delete();
    }

    // ── Fingerprint settings ──────────────────────────────────────────────────

    public function getFingerprintSettings(): array
    {
        return [
            'fp_auto_sync_enabled'   => Setting::get('fp_auto_sync_enabled', false),
            'fp_sync_interval'       => Setting::get('fp_sync_interval', 30),
            'fp_auto_process_logs'   => Setting::get('fp_auto_process_logs', true),
        ];
    }

    public function saveFingerprintSettings(array $data): void
    {
        $types = [
            'fp_auto_sync_enabled' => 'boolean',
            'fp_sync_interval'     => 'integer',
            'fp_auto_process_logs' => 'boolean',
        ];
        foreach ($data as $key => $value) {
            Setting::set($key, $value, 'fingerprint', $types[$key] ?? 'string');
        }
    }

    // ── Initial seed (called from seeder) ────────────────────────────────────

    public function seedDefaults(): void
    {
        $defaults = [
            // Company
            ['company_name',    'Starprint',         'general', 'string'],
            ['company_address', 'Ragama, Sri Lanka',  'general', 'string'],
            ['currency',        'LKR',                'general', 'string'],
            ['timezone',        'Asia/Colombo',       'general', 'string'],
            // Payroll
            ['payroll_epf_employee_rate',   '8',    'payroll', 'integer'],
            ['payroll_epf_employer_rate',   '12',   'payroll', 'integer'],
            ['payroll_etf_employer_rate',   '3',    'payroll', 'integer'],
            ['payroll_overtime_multiplier', '1.5',  'payroll', 'string'],
            ['payroll_late_threshold_days', '3',    'payroll', 'integer'],
            ['payroll_late_deduction_days', '0',    'payroll', 'integer'],
            ['working_days_per_week',       '5',    'payroll', 'integer'],
            // Fingerprint
            ['fp_auto_sync_enabled',  '0',  'fingerprint', 'boolean'],
            ['fp_sync_interval',      '30', 'fingerprint', 'integer'],
            ['fp_auto_process_logs',  '1',  'fingerprint', 'boolean'],
        ];

        foreach ($defaults as [$key, $value, $group, $type]) {
            Setting::firstOrCreate(['key' => $key], compact('value', 'group', 'type'));
        }
    }
}
