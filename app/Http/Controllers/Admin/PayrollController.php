<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Jobs\GeneratePayslipJob;
use App\Models\Employee;
use App\Models\Payroll;
use App\Models\SalaryComponent;
use App\Services\PayrollEngineService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PayrollController extends Controller
{
    public function __construct(private PayrollEngineService $payrollEngine) {}

    public function index(): Response
    {
        return Inertia::render('admin/payroll/index', [
            'payrolls'  => $this->payrollEngine->paginate(
                request()->only('month', 'year', 'status', 'employee_id')
            ),
            'employees' => Employee::active()->with('user')->get(['id', 'employee_id', 'user_id']),
            'filters'   => request()->only('month', 'year', 'status', 'employee_id'),
        ]);
    }

    public function generate(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'employee_id'    => 'required|exists:employees,id',
            'month'          => 'required|integer|between:1,12',
            'year'           => 'required|integer|min:2020',
            'base_salary'    => 'nullable|numeric|min:0',
            'allowances'     => 'nullable|numeric|min:0',
            'deductions'     => 'nullable|numeric|min:0',
            'bonus'          => 'nullable|numeric|min:0',
            'overtime_hours' => 'nullable|integer|min:0',
            'working_days'   => 'nullable|integer|min:1',
            'notes'          => 'nullable|string|max:500',
        ]);

        $payroll = $this->payrollEngine->generate($data['employee_id'], $data['month'], $data['year'], $data);
        GeneratePayslipJob::dispatch($payroll);

        return back()->with('success', 'Payroll generated with EPF/ETF/PAYE calculations.');
    }

    public function generateBulk(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'month' => 'required|integer|between:1,12',
            'year'  => 'required|integer|min:2020',
        ]);

        $results = $this->payrollEngine->generateBulk($data['month'], $data['year']);
        $message = "Generated {$results['success']} payrolls";
        if ($results['failed'] > 0) {
            $message .= ", {$results['failed']} failed";
        }

        return back()->with($results['failed'] > 0 ? 'warning' : 'success', $message);
    }

    public function markPaid(Payroll $payroll): RedirectResponse
    {
        $this->payrollEngine->markAsPaid($payroll);
        return back()->with('success', 'Payroll marked as paid.');
    }

    public function show(Payroll $payroll): Response
    {
        return Inertia::render('admin/payroll/show', [
            'payroll' => $payroll->load(['employee.user', 'employee.department', 'processor']),
        ]);
    }

    public function storeComponent(Request $request, Employee $employee): RedirectResponse
    {
        $data = $request->validate([
            'component_type' => 'required|in:transport_allowance,meal_allowance,housing_allowance,medical_allowance,other_allowance,other_deduction',
            'name'           => 'required|string|max:100',
            'amount'         => 'nullable|numeric|min:0',
            'is_percentage'  => 'boolean',
            'percentage'     => 'nullable|numeric|min:0|max:100',
        ]);

        $employee->salaryComponents()->create($data);
        return back()->with('success', 'Salary component added.');
    }

    public function destroyComponent(SalaryComponent $component): RedirectResponse
    {
        $component->delete();
        return back()->with('success', 'Component removed.');
    }
}
