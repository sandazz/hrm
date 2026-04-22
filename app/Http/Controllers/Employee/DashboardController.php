<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Services\AttendanceService;
use App\Services\DashboardService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        private DashboardService $dashboardService,
        private AttendanceService $attendanceService,
    ) {}

    public function index(): Response
    {
        $employee = auth()->user()->employee;

        return Inertia::render('employee/dashboard', [
            'stats'      => $employee
                ? $this->dashboardService->getEmployeeStats($employee->id)
                : [],
            'employee'   => $employee?->load('department'),
            'todayAttendance' => $employee
                ? \App\Models\Attendance::where('employee_id', $employee->id)->today()->first()
                : null,
        ]);
    }

    public function checkIn(): RedirectResponse
    {
        $employee = auth()->user()->employee;
        abort_unless($employee, 403);
        $this->attendanceService->checkIn($employee->id);
        return back()->with('success', 'Checked in successfully.');
    }

    public function checkOut(): RedirectResponse
    {
        $employee = auth()->user()->employee;
        abort_unless($employee, 403);
        $this->attendanceService->checkOut($employee->id);
        return back()->with('success', 'Checked out successfully.');
    }
}
