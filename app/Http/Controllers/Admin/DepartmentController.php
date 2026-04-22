<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\User;
use App\Services\DepartmentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DepartmentController extends Controller
{
    public function __construct(private DepartmentService $departmentService) {}

    public function index(): Response
    {
        return Inertia::render('admin/departments/index', [
            'departments' => $this->departmentService->paginate(request()->only('search')),
            'filters'     => request()->only('search'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/departments/create', [
            'managers' => User::whereIn('role', ['admin', 'hr'])->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name'        => 'required|string|max:100|unique:departments,name',
            'code'        => 'required|string|max:10|unique:departments,code',
            'description' => 'nullable|string',
            'manager_id'  => 'nullable|exists:users,id',
        ]);

        $this->departmentService->create($data);

        return redirect()->route('admin.departments.index')
            ->with('success', 'Department created.');
    }

    public function edit(Department $department): Response
    {
        return Inertia::render('admin/departments/edit', [
            'department' => $department->load('manager'),
            'managers'   => User::whereIn('role', ['admin', 'hr'])->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, Department $department): RedirectResponse
    {
        $data = $request->validate([
            'name'        => "required|string|max:100|unique:departments,name,{$department->id}",
            'code'        => "required|string|max:10|unique:departments,code,{$department->id}",
            'description' => 'nullable|string',
            'manager_id'  => 'nullable|exists:users,id',
            'is_active'   => 'boolean',
        ]);

        $this->departmentService->update($department, $data);

        return redirect()->route('admin.departments.index')
            ->with('success', 'Department updated.');
    }

    public function destroy(Department $department): RedirectResponse
    {
        $this->departmentService->delete($department);

        return redirect()->route('admin.departments.index')
            ->with('success', 'Department deleted.');
    }
}
