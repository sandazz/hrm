<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Employee;
use App\Models\SalaryComponent;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class StarEmployeeSeeder extends Seeder
{
    public function run(): void
    {
        // Ensure a default department exists
        $dept = Department::firstOrCreate(
            ['code' => 'GEN'],
            ['name' => 'General', 'code' => 'GEN', 'manager_id' => null]
        );

        $employees = [
            [
                'id'                     => 1,
                'name'                   => 'Vishshanka Wanasinghe',
                'nickname'               => 'VISHSHANKA',
                'position'               => 'SUPERVISOR',
                'time'                   => '9.00 AM - 6.00 PM',
                'phone'                  => '763707750',
                'emergency_contact_phone'=> '775377572',
                'base_salary'            => 90000.00,
                'per_day'                => 3500.00,
                'ot_rate_per_hour'       => 120.00,
            ],
            [
                'id'                     => 2,
                'name'                   => 'Mahadewan Sareetha',
                'nickname'               => 'SAREETHA',
                'position'               => 'Senior Helper',
                'time'                   => '9.00 AM - 6.00 PM',
                'phone'                  => '776440938',
                'emergency_contact_phone'=> '770225708',
                'base_salary'            => 60000.00,
                'per_day'                => 1200.00,
                'ot_rate_per_hour'       => 120.00,
            ],
            [
                'id'                     => 3,
                'name'                   => 'Sriyan P.K Fernando',
                'nickname'               => 'SHERAN',
                'position'               => 'Grafix Designing',
                'time'                   => '9.00 AM - 6.00 PM',
                'phone'                  => '784467952',
                'emergency_contact_phone'=> '784467951',
                'base_salary'            => 31200.00,
                'per_day'                => 1200.00,
                'ot_rate_per_hour'       => 120.00,
            ],
            [
                'id'                     => 4,
                'name'                   => 'Harshan Sandrasekar',
                'nickname'               => 'HARSHA',
                'position'               => 'Helper',
                'time'                   => '9.00 AM - 6.00 PM',
                'phone'                  => '768959704',
                'emergency_contact_phone'=> '779924976',
                'base_salary'            => 31200.00,
                'per_day'                => 1200.00,
                'ot_rate_per_hour'       => 120.00,
            ],
            [
                'id'                     => 5,
                'name'                   => 'H. Piuma Sujvni',
                'nickname'               => 'SUJVNI',
                'position'               => 'Helper',
                'time'                   => '9.00 AM - 6.00 PM',
                'phone'                  => '766958896',
                'emergency_contact_phone'=> '771803187',
                'base_salary'            => 31200.00,
                'per_day'                => 1200.00,
                'ot_rate_per_hour'       => 120.00,
            ],
        ];

        foreach ($employees as $data) {
            $email = strtolower(str_replace([' ', '.'], ['_', ''], $data['nickname'])) . '@starprint.lk';

            // Create user
            $user = User::firstOrCreate(
                ['email' => $email],
                [
                    'name'               => $data['name'],
                    'password'           => Hash::make('password'),
                    'role'               => 'employee',
                    'email_verified_at'  => now(),
                ]
            );

            // Create employee record
            $employee = Employee::firstOrCreate(
                ['employee_id' => 'STAR-' . str_pad($data['id'], 3, '0', STR_PAD_LEFT)],
                [
                    'user_id'                 => $user->id,
                    'department_id'           => $dept->id,
                    'employee_id'             => 'STAR-' . str_pad($data['id'], 3, '0', STR_PAD_LEFT),
                    'job_title'               => $data['position'],
                    'phone'                   => $data['phone'],
                    'emergency_contact_name'  => $data['nickname'],
                    'emergency_contact_phone' => $data['emergency_contact_phone'],
                    'hire_date'               => now(),
                    'employment_type'         => 'full_time',
                    'base_salary'             => $data['base_salary'],
                    'status'                  => 'active',
                ]
            );

            // OT rate salary component
            SalaryComponent::firstOrCreate(
                ['employee_id' => $employee->id, 'name' => 'OT Rate Per Hour'],
                [
                    'component_type' => 'other_allowance',
                    'name'           => 'OT Rate Per Hour',
                    'amount'         => $data['ot_rate_per_hour'],
                    'is_percentage'  => false,
                    'is_active'      => true,
                ]
            );

            // Per day rate salary component
            SalaryComponent::firstOrCreate(
                ['employee_id' => $employee->id, 'name' => 'Per Day Rate'],
                [
                    'component_type' => 'other_allowance',
                    'name'           => 'Per Day Rate',
                    'amount'         => $data['per_day'],
                    'is_percentage'  => false,
                    'is_active'      => true,
                ]
            );
        }

        $this->command->info('✅ Star employees seeded successfully.');
        $this->command->table(
            ['#', 'Name', 'Email', 'Position', 'Salary', 'OT Rate'],
            collect($employees)->map(fn ($e) => [
                $e['id'],
                $e['name'],
                strtolower(str_replace([' ', '.'], ['_', ''], $e['nickname'])) . '@starprint.lk',
                $e['position'],
                'LKR ' . number_format($e['base_salary'], 2),
                'LKR ' . $e['ot_rate_per_hour'] . '/hr',
            ])->toArray()
        );
    }
}
