<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Employee;
use App\Models\LeaveType;
use App\Models\Setting;
use App\Models\Shift;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class HrmSeeder extends Seeder
{
    public function run(): void
    {
        // ── Leave Types ──────────────────────────────────────────────────────────
        $leaveTypes = [
            ['name' => 'Annual Leave',    'code' => 'AL',  'days_allowed' => 21, 'is_paid' => true],
            ['name' => 'Sick Leave',      'code' => 'SL',  'days_allowed' => 10, 'is_paid' => true],
            ['name' => 'Maternity Leave', 'code' => 'ML',  'days_allowed' => 90, 'is_paid' => true],
            ['name' => 'Unpaid Leave',    'code' => 'UL',  'days_allowed' => 30, 'is_paid' => false],
            ['name' => 'Emergency Leave', 'code' => 'EML', 'days_allowed' => 3,  'is_paid' => true],
        ];

        foreach ($leaveTypes as $lt) {
            LeaveType::firstOrCreate(['code' => $lt['code']], $lt);
        }

        // ── Admin User ────────────────────────────────────────────────────────────
        $admin = User::firstOrCreate(
            ['email' => 'admin@hrm.test'],
            [
                'name'     => 'Super Admin',
                'password' => Hash::make('password'),
                'role'     => 'admin',
                'email_verified_at' => now(),
            ]
        );

        // ── HR Manager ────────────────────────────────────────────────────────────
        $hr = User::firstOrCreate(
            ['email' => 'hr@hrm.test'],
            [
                'name'     => 'HR Manager',
                'password' => Hash::make('password'),
                'role'     => 'hr',
                'email_verified_at' => now(),
            ]
        );

        // ── Departments ───────────────────────────────────────────────────────────
        $departments = [
            ['name' => 'Engineering',     'code' => 'ENG',  'manager_id' => $admin->id],
            ['name' => 'Human Resources', 'code' => 'HR',   'manager_id' => $hr->id],
            ['name' => 'Finance',         'code' => 'FIN',  'manager_id' => null],
            ['name' => 'Marketing',       'code' => 'MKT',  'manager_id' => null],
            ['name' => 'Operations',      'code' => 'OPS',  'manager_id' => null],
        ];

        foreach ($departments as $dept) {
            Department::firstOrCreate(['code' => $dept['code']], $dept);
        }

        // ── Sample Employees ──────────────────────────────────────────────────────
        $engDept = Department::where('code', 'ENG')->first();

        $sampleEmployees = [
            ['name' => 'John Doe',   'email' => 'john@hrm.test',   'job_title' => 'Senior Developer'],
            ['name' => 'Jane Smith', 'email' => 'jane@hrm.test',   'job_title' => 'UI/UX Designer'],
            ['name' => 'Ali Hassan', 'email' => 'ali@hrm.test',    'job_title' => 'QA Engineer'],
        ];

        foreach ($sampleEmployees as $i => $emp) {
            $user = User::firstOrCreate(
                ['email' => $emp['email']],
                [
                    'name'     => $emp['name'],
                    'password' => Hash::make('password'),
                    'role'     => 'employee',
                    'email_verified_at' => now(),
                ]
            );

            Employee::firstOrCreate(
                ['user_id' => $user->id],
                [
                    'department_id'   => $engDept?->id,
                    'employee_id'     => 'EMP-' . str_pad($i + 1, 4, '0', STR_PAD_LEFT),
                    'job_title'       => $emp['job_title'],
                    'hire_date'       => now()->subMonths(rand(3, 24)),
                    'employment_type' => 'full_time',
                    'base_salary'     => rand(3000, 8000),
                    'status'          => 'active',
                ]
            );
        }

        // ── Default Settings ──────────────────────────────────────────────────────
        $settings = [
            ['key' => 'company_name',          'value' => 'Starprint',   'group' => 'company',     'type' => 'string'],
            ['key' => 'company_address',        'value' => 'Ragama, Sri Lanka', 'group' => 'company', 'type' => 'string'],
            ['key' => 'company_phone',          'value' => '',            'group' => 'company',     'type' => 'string'],
            ['key' => 'company_email',          'value' => '',            'group' => 'company',     'type' => 'string'],
            ['key' => 'currency',               'value' => 'LKR',         'group' => 'company',     'type' => 'string'],
            ['key' => 'timezone',               'value' => 'Asia/Colombo','group' => 'company',     'type' => 'string'],
            ['key' => 'epf_employee_rate',      'value' => '8',           'group' => 'payroll',     'type' => 'integer'],
            ['key' => 'epf_employer_rate',      'value' => '12',          'group' => 'payroll',     'type' => 'integer'],
            ['key' => 'etf_employer_rate',      'value' => '3',           'group' => 'payroll',     'type' => 'integer'],
            ['key' => 'overtime_multiplier',    'value' => '1.5',         'group' => 'payroll',     'type' => 'string'],
            ['key' => 'working_days_per_week',  'value' => '5',           'group' => 'payroll',     'type' => 'integer'],
            ['key' => 'late_deduction_enabled', 'value' => '1',           'group' => 'payroll',     'type' => 'boolean'],
            ['key' => 'late_threshold_minutes', 'value' => '30',          'group' => 'payroll',     'type' => 'integer'],
            ['key' => 'fingerprint_auto_sync',  'value' => '0',           'group' => 'fingerprint', 'type' => 'boolean'],
            ['key' => 'fingerprint_sync_interval', 'value' => '30',       'group' => 'fingerprint', 'type' => 'integer'],
            ['key' => 'fingerprint_auto_process', 'value' => '1',         'group' => 'fingerprint', 'type' => 'boolean'],
        ];
        foreach ($settings as $s) {
            Setting::firstOrCreate(['key' => $s['key']], $s);
        }

        // ── Default Shift ─────────────────────────────────────────────────────────
        Shift::firstOrCreate(
            ['name' => 'Day Shift'],
            [
                'start_time'            => '08:30:00',
                'end_time'              => '17:30:00',
                'max_late_minutes'      => 30,
                'grace_period_minutes'  => 10,
                'overtime_after_hours'  => 9,
                'is_default'            => true,
                'is_active'             => true,
            ]
        );

        $this->command->info('✅ HRM seed completed.');
        $this->command->table(
            ['Role', 'Email', 'Password'],
            [
                ['Admin',    'admin@hrm.test', 'password'],
                ['HR',       'hr@hrm.test',    'password'],
                ['Employee', 'john@hrm.test',  'password'],
            ]
        );
    }
}
