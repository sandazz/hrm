<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Services\AttendanceService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AttendanceController extends Controller
{
    public function __construct(private AttendanceService $attendanceService) {}

    public function index(): Response
    {
        return Inertia::render('hr/attendance/index', [
            'attendance' => $this->attendanceService->paginate(
                request()->only('employee_id', 'date', 'month', 'year', 'status')
            ),
            'employees' => Employee::with('user')->active()->get(['id', 'employee_id', 'user_id']),
            'filters'   => request()->only('employee_id', 'date', 'month', 'year', 'status'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'date'        => 'required|date',
            'check_in'    => 'nullable|date_format:H:i',
            'check_out'   => 'nullable|date_format:H:i',
            'status'      => 'required|in:present,absent,late,half_day,holiday,on_leave',
            'notes'       => 'nullable|string',
        ]);

        $this->attendanceService->manualEntry($data);

        return back()->with('success', 'Attendance recorded.');
    }
}
