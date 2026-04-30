<?php

namespace App\Services;

use App\Models\Employee;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class EmployeeService
{
    public function paginate(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        return Employee::with(['user', 'department'])
            ->when($filters['search'] ?? null, fn ($q, $s) =>
                $q->whereHas('user', fn ($u) => $u->where('name', 'like', "%{$s}%")
                    ->orWhere('email', 'like', "%{$s}%"))
                  ->orWhere('employee_id', 'like', "%{$s}%")
            )
            ->when($filters['department_id'] ?? null, fn ($q, $d) => $q->where('department_id', $d))
            ->when($filters['status'] ?? null, fn ($q, $s) => $q->where('status', $s))
            ->orderByDesc('created_at')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function create(array $data): Employee
    {
        return DB::transaction(function () use ($data) {
            $user = User::create([
                'name'     => $data['name'],
                'email'    => $data['email'],
                'password' => Hash::make($data['password'] ?? 'password123'),
                'role'     => 'employee',
            ]);

            $employee = Employee::create([
                'user_id'       => $user->id,
                'department_id' => $data['department_id'] ?? null,
                'employee_id'   => $data['employee_id'] ?? $this->generateEmployeeId(),
                'job_title'     => $data['job_title'],
                'phone'         => $data['phone'] ?? null,
                'address'       => $data['address'] ?? null,
                'date_of_birth' => $data['date_of_birth'] ?? null,
                'gender'        => $data['gender'] ?? null,
                'hire_date'     => $data['hire_date'],
                'employment_type' => $data['employment_type'] ?? 'full_time',
                'base_salary'   => $data['base_salary'] ?? 0,
                'status'        => 'active',
            ]);

            if (!empty($data['allowance_type_ids'])) {
                $employee->allowanceTypes()->sync($data['allowance_type_ids']);
            }

            return $employee;
        });
    }

    public function update(Employee $employee, array $data): Employee
    {
        return DB::transaction(function () use ($employee, $data) {
            $employee->user->update([
                'name'  => $data['name'],
                'email' => $data['email'],
            ]);

            $employee->update([
                'department_id'   => $data['department_id'] ?? $employee->department_id,
                'job_title'       => $data['job_title'],
                'phone'           => $data['phone'] ?? null,
                'address'         => $data['address'] ?? null,
                'date_of_birth'   => $data['date_of_birth'] ?? null,
                'gender'          => $data['gender'] ?? null,
                'hire_date'       => $data['hire_date'],
                'employment_type' => $data['employment_type'] ?? $employee->employment_type,
                'base_salary'     => $data['base_salary'] ?? $employee->base_salary,
                'status'          => $data['status'] ?? $employee->status,
            ]);

            $employee->allowanceTypes()->sync($data['allowance_type_ids'] ?? []);

            return $employee->fresh(['user', 'department']);
        });
    }

    public function delete(Employee $employee): void
    {
        DB::transaction(function () use ($employee) {
            $userId = $employee->user_id;
            $employee->delete();
            User::destroy($userId);
        });
    }

    public function generateEmployeeId(): string
    {
        $last = Employee::orderByDesc('id')->value('employee_id');
        $num  = $last ? (int) ltrim(str_replace('EMP-', '', $last), '0') + 1 : 1;
        return 'EMP-' . str_pad($num, 4, '0', STR_PAD_LEFT);
    }
}
