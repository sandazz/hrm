<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\LeaveRequest;
use App\Models\LeaveType;
use App\Services\LeaveService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LeaveController extends Controller
{
    public function __construct(private LeaveService $leaveService) {}

    public function index(): Response
    {
        $employee = auth()->user()->employee;
        abort_unless($employee, 403);

        $leaveTypes = LeaveType::active()->get();

        return Inertia::render('employee/leave/index', [
            'leaves'     => $this->leaveService->paginate(['employee_id' => $employee->id]),
            'leaveTypes' => $leaveTypes,
            'balances'   => $leaveTypes->map(fn ($lt) => [
                'id'        => $lt->id,
                'name'      => $lt->name,
                'allowed'   => $lt->days_allowed,
                'remaining' => $this->leaveService->getRemainingDays($employee->id, $lt->id, now()->year),
            ]),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $employee = auth()->user()->employee;
        abort_unless($employee, 403);

        $data = $request->validate([
            'leave_type_id' => 'required|exists:leave_types,id',
            'start_date'    => 'required|date|after_or_equal:today',
            'end_date'      => 'required|date|after_or_equal:start_date',
            'reason'        => 'required|string|min:10',
        ]);

        $this->leaveService->submitRequest($employee->id, $data);

        return back()->with('success', 'Leave request submitted.');
    }

    public function cancel(LeaveRequest $leave): RedirectResponse
    {
        $employee = auth()->user()->employee;
        abort_unless($employee && $leave->employee_id === $employee->id && $leave->isPending(), 403);

        $this->leaveService->cancel($leave);

        return back()->with('success', 'Leave cancelled.');
    }
}
