<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Models\LeaveRequest;
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
        return Inertia::render('hr/leave/index', [
            'leaves'  => $this->leaveService->paginate(request()->only('status', 'employee_id')),
            'filters' => request()->only('status'),
        ]);
    }

    public function approve(LeaveRequest $leave): RedirectResponse
    {
        $error = $this->leaveService->approve($leave, auth()->id());

        if ($error) {
            Inertia::flash('toast', ['type' => 'error', 'message' => $error]);
            return back();
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Leave approved.']);
        return back();
    }

    public function reject(Request $request, LeaveRequest $leave): RedirectResponse
    {
        $request->validate(['rejection_reason' => 'required|string']);
        $this->leaveService->reject($leave, auth()->id(), $request->rejection_reason);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Leave rejected.']);
        return back();
    }
}
