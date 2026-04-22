<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Services\ReportService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function __construct(private ReportService $reportService) {}

    public function attendance(Request $request): Response
    {
        $month        = (int) $request->get('month', now()->month);
        $year         = (int) $request->get('year', now()->year);
        $departmentId = $request->get('department_id');

        return Inertia::render('admin/reports/attendance', [
            'report'      => $this->reportService->attendanceSummary($month, $year, $departmentId),
            'departments' => Department::active()->orderBy('name')->get(['id', 'name']),
            'filters'     => compact('month', 'year', 'departmentId'),
        ]);
    }

    public function payroll(Request $request): Response
    {
        $month        = (int) $request->get('month', now()->month);
        $year         = (int) $request->get('year', now()->year);
        $departmentId = $request->get('department_id');

        return Inertia::render('admin/reports/payroll', [
            'report'      => $this->reportService->payrollSummary($month, $year, $departmentId),
            'trend'       => $this->reportService->payrollTrend(6),
            'departments' => Department::active()->orderBy('name')->get(['id', 'name']),
            'filters'     => compact('month', 'year', 'departmentId'),
        ]);
    }

    public function leave(Request $request): Response
    {
        $month = (int) $request->get('month', now()->month);
        $year  = (int) $request->get('year', now()->year);

        return Inertia::render('admin/reports/leave', [
            'report'  => $this->reportService->leaveReport($month, $year),
            'filters' => compact('month', 'year'),
        ]);
    }
}
