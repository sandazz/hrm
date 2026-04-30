<?php

namespace App\Http\Requests\Employee;

use Illuminate\Foundation\Http\FormRequest;

class StoreEmployeeRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name'             => 'required|string|max:255',
            'email'            => ['required', 'string', 'max:255', 'regex:/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/', 'unique:users,email'],
            'password'         => 'nullable|string|min:8',
            'department_id'    => 'nullable|exists:departments,id',
            'job_title'        => 'required|string|max:100',
            'phone'            => ['nullable', 'string', 'regex:/^[0-9]{10}$/'],
            'address'          => 'nullable|string',
            'date_of_birth'    => 'nullable|date|before:today',
            'gender'           => 'nullable|in:male,female,other',
            'hire_date'        => 'required|date',
            'employment_type'  => 'required|in:full_time,part_time,contract,intern',
            'base_salary'      => 'nullable|numeric|min:0',
            'emergency_contact_name'  => 'nullable|string|max:100',
            'emergency_contact_phone' => 'nullable|string|max:20',
            'fingerprint_uid'          => 'nullable|string|max:50|unique:employees,fingerprint_uid',
            'allowance_type_ids'      => 'nullable|array',
            'allowance_type_ids.*'    => 'exists:allowance_types,id',
        ];
    }
}
