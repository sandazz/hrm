<?php

namespace App\Http\Requests\Employee;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmployeeRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $employeeId   = $this->route('employee')?->user_id;
        $currentEmpId = $this->route('employee')?->id;

        return [
            'name'            => 'required|string|max:255',
            'email'           => ['required', 'string', 'max:255', 'regex:/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/', "unique:users,email,{$employeeId}"],
            'department_id'   => 'nullable|exists:departments,id',
            'job_title'       => 'required|string|max:100',
            'phone'           => ['nullable', 'string', 'regex:/^[0-9]{10}$/'],
            'address'         => 'nullable|string',
            'date_of_birth'   => 'nullable|date|before:today',
            'gender'          => 'nullable|in:male,female,other',
            'hire_date'       => 'required|date',
            'employment_type' => 'required|in:full_time,part_time,contract,intern',
            'base_salary'          => 'nullable|numeric|min:0',
            'status'               => 'nullable|in:active,on_leave,terminated,probation',
            'fingerprint_uid'      => "nullable|string|max:50|unique:employees,fingerprint_uid,{$currentEmpId}",
            'allowance_type_ids'   => 'nullable|array',
            'allowance_type_ids.*' => 'exists:allowance_types,id',
        ];
    }
}
