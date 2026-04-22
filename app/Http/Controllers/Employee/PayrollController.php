<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\Payroll;
use Inertia\Inertia;
use Inertia\Response;

class PayrollController extends Controller
{
    public function index(): Response
    {
        $employee = auth()->user()->employee;
        abort_unless($employee, 403);

        return Inertia::render('employee/payroll/index', [
            'payrolls' => Payroll::where('employee_id', $employee->id)
                ->orderByDesc('year')->orderByDesc('month')
                ->paginate(12),
        ]);
    }
}
