<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Services\ReportService;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ReportController extends Controller
{
    public function __construct(private ReportService $reportService) {}

    public function attendance(Request $request)
    {
        $month        = (int) $request->get('month', now()->month);
        $year         = (int) $request->get('year', now()->year);
        $departmentId = $request->get('department_id');

        if ($request->get('format') === 'csv') {
            return $this->downloadAttendanceCsv($month, $year, $departmentId);
        }

        return Inertia::render('admin/reports/attendance', [
            'report'      => $this->reportService->attendanceSummary($month, $year, $departmentId),
            'departments' => Department::active()->orderBy('name')->get(['id', 'name']),
            'filters'     => compact('month', 'year', 'departmentId'),
        ]);
    }

    public function payroll(Request $request)
    {
        $month        = (int) $request->get('month', now()->month);
        $year         = (int) $request->get('year', now()->year);
        $departmentId = $request->get('department_id');

        if ($request->get('format') === 'csv') {
            return $this->downloadPayrollCsv($month, $year, $departmentId);
        }

        return Inertia::render('admin/reports/payroll', [
            'report'      => $this->reportService->payrollSummary($month, $year, $departmentId),
            'trend'       => $this->reportService->payrollTrend(6),
            'departments' => Department::active()->orderBy('name')->get(['id', 'name']),
            'filters'     => compact('month', 'year', 'departmentId'),
        ]);
    }

    private function downloadAttendanceCsv(int $month, int $year, ?int $departmentId = null): StreamedResponse
    {
        $report = $this->reportService->attendanceSummary($month, $year, $departmentId);
        $filename = sprintf('attendance-report-%04d-%02d.csv', $year, $month);

        return response()->streamDownload(function () use ($report) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['Employee ID', 'Name', 'Department', 'Working Days', 'Present Days', 'Absent Days', 'Late Days', 'Leave Days', 'Overtime Hours', 'Total Work Hours']);
            foreach ($report['summary'] as $row) {
                fputcsv($handle, [
                    $row['employee_id'],
                    $row['name'],
                    $row['department'],
                    $row['working_days'],
                    $row['present_days'],
                    $row['absent_days'],
                    $row['late_days'],
                    $row['leave_days'],
                    $row['overtime_hours'],
                    $row['total_work_hours'],
                ]);
            }
            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv; charset=utf-8',
            'Cache-Control' => 'no-store, no-cache',
        ]);
    }

    private function downloadPayrollCsv(int $month, int $year, ?int $departmentId = null): StreamedResponse
    {
        $report = $this->reportService->payrollSummary($month, $year, $departmentId);
        $filename = sprintf('payroll-report-%04d-%02d.csv', $year, $month);

        return response()->streamDownload(function () use ($report) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['Employee ID', 'Name', 'Department', 'Base Salary', 'Gross Salary', 'Allowances', 'Overtime Pay', 'Bonus', 'EPF Employee', 'EPF Employer', 'ETF Employer', 'No-Pay Deduction', 'Late Deduction', 'Tax', 'Net Salary', 'Status']);
            foreach ($report['payrolls'] as $row) {
                fputcsv($handle, [
                    $row['employee_id'],
                    $row['name'],
                    $row['department'],
                    $row['base_salary'],
                    $row['gross_salary'],
                    $row['allowances'],
                    $row['overtime_pay'],
                    $row['bonus'],
                    $row['epf_employee'],
                    $row['epf_employer'],
                    $row['etf_employer'],
                    $row['no_pay_deduction'],
                    $row['late_deduction'],
                    $row['tax'],
                    $row['net_salary'],
                    $row['status'],
                ]);
            }
            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv; charset=utf-8',
            'Cache-Control' => 'no-store, no-cache',
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
