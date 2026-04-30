<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Employee\StoreEmployeeRequest;
use App\Http\Requests\Employee\UpdateEmployeeRequest;
use App\Models\AllowanceType;
use App\Models\Employee;
use App\Services\DepartmentService;
use App\Services\EmployeeService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeController extends Controller
{
    public function __construct(
        private EmployeeService $employeeService,
        private DepartmentService $departmentService,
    ) {}

    public function index(): Response
    {
        return Inertia::render('admin/employees/index', [
            'employees'   => $this->employeeService->paginate(request()->only('search', 'department_id', 'status')),
            'departments' => $this->departmentService->getAllActive(),
            'filters'     => request()->only('search', 'department_id', 'status'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/employees/create', [
            'departments'    => $this->departmentService->getAllActive(),
            'allowanceTypes' => AllowanceType::where('is_active', true)->orderBy('name')->get(),
        ]);
    }

    public function store(StoreEmployeeRequest $request): RedirectResponse
    {
        $this->employeeService->create($request->validated());

        return redirect()->route('admin.employees.index')
            ->with('success', 'Employee created successfully.');
    }

    public function show(Employee $employee): Response
    {
        $employee->load(['user', 'department', 'attendances' => fn ($q) => $q->orderByDesc('date')->limit(10)]);

        return Inertia::render('admin/employees/show', [
            'employee' => $employee,
        ]);
    }

    public function edit(Employee $employee): Response
    {
        return Inertia::render('admin/employees/edit', [
            'employee'       => $employee->load(['user', 'allowanceTypes']),
            'departments'    => $this->departmentService->getAllActive(),
            'allowanceTypes' => AllowanceType::where('is_active', true)->orderBy('name')->get(),
        ]);
    }

    public function update(UpdateEmployeeRequest $request, Employee $employee): RedirectResponse
    {
        $this->employeeService->update($employee, $request->validated());

        return redirect()->route('admin.employees.index')
            ->with('success', 'Employee updated successfully.');
    }

    public function destroy(Employee $employee): RedirectResponse
    {
        $this->employeeService->delete($employee);

        return redirect()->route('admin.employees.index')
            ->with('success', 'Employee deleted.');
    }

    public function resetPassword(Request $request, Employee $employee): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $employee->user->update([
            'password' => Hash::make($request->password),
        ]);

        return back()->with('success', 'Password updated successfully.');
    }
}
