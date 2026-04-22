<?php

namespace App\Services;

use App\Models\Department;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class DepartmentService
{
    public function paginate(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        return Department::withCount(['employees as active_employee_count' => fn ($q) => $q->where('status', 'active')])
            ->with('manager')
            ->when($filters['search'] ?? null, fn ($q, $s) =>
                $q->where('name', 'like', "%{$s}%")->orWhere('code', 'like', "%{$s}%")
            )
            ->orderBy('name')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function create(array $data): Department
    {
        return Department::create([
            'name'        => $data['name'],
            'code'        => strtoupper($data['code']),
            'description' => $data['description'] ?? null,
            'manager_id'  => $data['manager_id'] ?? null,
            'is_active'   => true,
        ]);
    }

    public function update(Department $department, array $data): Department
    {
        $department->update([
            'name'        => $data['name'],
            'code'        => strtoupper($data['code']),
            'description' => $data['description'] ?? null,
            'manager_id'  => $data['manager_id'] ?? null,
            'is_active'   => $data['is_active'] ?? $department->is_active,
        ]);

        return $department->fresh('manager');
    }

    public function delete(Department $department): void
    {
        // Unlink employees before deleting
        $department->employees()->update(['department_id' => null]);
        $department->delete();
    }

    public function getAllActive(): \Illuminate\Database\Eloquent\Collection
    {
        return Department::where('is_active', true)->orderBy('name')->get(['id', 'name', 'code']);
    }
}
