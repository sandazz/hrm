<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\LeaveRequest;
use App\Models\LeaveType;
use App\Services\LeaveService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
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
            'start_date'    => 'required|date',
            'end_date'      => 'required|date|after_or_equal:start_date',
            'reason'        => 'required|string|min:10',
        ]);

        // Check for existing attendance records in the requested date range
        $conflictDate = Attendance::where('employee_id', $employee->id)
            ->whereBetween('date', [$data['start_date'], $data['end_date']])
            ->orderBy('date')
            ->value('date');

        if ($conflictDate) {
            $formatted = \Carbon\Carbon::parse($conflictDate)->format('d M Y');
            throw ValidationException::withMessages([
                'start_date' => "An attendance record already exists for {$formatted}. You cannot request leave for a day with an attendance record.",
            ]);
        }

        // Check for overlapping leave requests (pending or approved)
        $overlappingLeave = LeaveRequest::where('employee_id', $employee->id)
            ->whereIn('status', ['pending', 'approved'])
            ->where(function ($q) use ($data) {
                $q->whereBetween('start_date', [$data['start_date'], $data['end_date']])
                  ->orWhereBetween('end_date', [$data['start_date'], $data['end_date']])
                  ->orWhere(function ($q) use ($data) {
                      $q->where('start_date', '<=', $data['start_date'])
                        ->where('end_date', '>=', $data['end_date']);
                  });
            })
            ->orderBy('start_date')
            ->first();

        if ($overlappingLeave) {
            $start = \Carbon\Carbon::parse($overlappingLeave->start_date)->format('d M Y');
            $end   = \Carbon\Carbon::parse($overlappingLeave->end_date)->format('d M Y');
            throw ValidationException::withMessages([
                'start_date' => "You already have a {$overlappingLeave->status} leave request for {$start} → {$end} that overlaps with the selected dates.",
            ]);
        }

        // Check leave balance
        $startDate = \Carbon\Carbon::parse($data['start_date']);
        $endDate   = \Carbon\Carbon::parse($data['end_date']);
        $totalDays = $startDate->diffInWeekdays($endDate) + 1;

        $remaining = $this->leaveService->getRemainingDays($employee->id, $data['leave_type_id'], $startDate->year);

        if ($remaining < $totalDays) {
            throw ValidationException::withMessages([
                'leave_type_id' => "Insufficient leave balance. You requested {$totalDays} day(s) but only {$remaining} day(s) remaining for this leave type.",
            ]);
        }

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
