<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AllowanceType;
use App\Models\Employee;
use App\Models\LeaveType;
use App\Models\SalaryComponent;
use App\Models\Shift;
use App\Services\SettingService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function __construct(private SettingService $settingService) {}

    public function index(): Response
    {
        return Inertia::render('admin/settings/index', [
            'company'     => $this->settingService->getCompanySettings(),
            'payroll'     => $this->settingService->getPayrollSettings(),
            'payeBrackets'=> $this->settingService->getPayeBrackets(),
            'fingerprint' => $this->settingService->getFingerprintSettings(),
            'shifts'      => $this->settingService->getShifts(),
            'leaveTypes'  => $this->settingService->getLeaveTypes(),
            'allowances'  => $this->settingService->getAllowanceComponents(),
        ]);
    }

    // ── Company ───────────────────────────────────────────────────────────────

    public function updateCompany(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'company_name'    => 'required|string|max:200',
            'company_address' => 'nullable|string|max:500',
            'company_phone'   => 'nullable|string|max:50',
            'company_email'   => 'nullable|email|max:200',
            'currency'        => 'required|string|max:10',
            'timezone'        => 'required|string|max:50',
        ]);

        $this->settingService->saveCompanySettings($data);

        return back()->with('success', 'Company settings saved.');
    }

    // ── Payroll ───────────────────────────────────────────────────────────────

    public function updatePayroll(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'payroll_epf_employee_rate'   => 'required|numeric|min:0|max:100',
            'payroll_epf_employer_rate'   => 'required|numeric|min:0|max:100',
            'payroll_etf_employer_rate'   => 'required|numeric|min:0|max:100',
            'payroll_overtime_multiplier' => 'required|numeric|min:1|max:5',
            'payroll_late_threshold_days' => 'required|integer|min:0',
            'payroll_late_deduction_days' => 'required|integer|min:0',
            'working_days_per_week'       => 'required|integer|between:5,7',
        ]);

        $this->settingService->savePayrollSettings($data);

        return back()->with('success', 'Payroll settings saved.');
    }

    // ── PAYE Tax Brackets ─────────────────────────────────────────────────────

    public function updatePayeTax(Request $request): RedirectResponse
    {
        $request->validate([
            'brackets'               => 'required|array|min:1',
            'brackets.*.from'        => 'required|numeric|min:0',
            'brackets.*.to'          => 'nullable|numeric',
            'brackets.*.rate'        => 'required|numeric|min:0|max:100',
        ]);

        $this->settingService->savePayeBrackets($request->brackets);

        return back()->with('success', 'PAYE tax brackets saved.');
    }

    // ── Global Allowances ─────────────────────────────────────────────────────

    public function storeAllowance(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'component_type' => 'required|in:transport_allowance,meal_allowance,housing_allowance,medical_allowance,other_allowance',
            'name'           => 'required|string|max:100',
            'amount'         => 'nullable|numeric|min:0',
            'is_percentage'  => 'boolean',
            'percentage'     => 'nullable|numeric|min:0|max:100',
        ]);

        AllowanceType::create(array_merge($data, ['is_active' => true]));

        return back()->with('success', 'Allowance type added.');
    }

    public function destroyAllowance(AllowanceType $component): RedirectResponse
    {
        $component->delete();
        return back()->with('success', 'Allowance type removed.');
    }

    // ── Fingerprint ──────────────────────────────────────────────────────────

    public function updateFingerprint(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'fp_auto_sync_enabled' => 'boolean',
            'fp_sync_interval'     => 'required|integer|min:5|max:1440',
            'fp_auto_process_logs' => 'boolean',
        ]);

        $this->settingService->saveFingerprintSettings($data);

        return back()->with('success', 'Fingerprint settings saved.');
    }

    // ── Shifts ────────────────────────────────────────────────────────────────

    public function storeShift(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name'                  => 'required|string|max:100',
            'start_time'            => 'required|date_format:H:i',
            'end_time'              => 'required|date_format:H:i',
            'max_late_minutes'      => 'required|integer|min:0',
            'grace_period_minutes'  => 'required|integer|min:0',
            'overtime_after_hours'  => 'required|numeric|min:1|max:24',
            'is_default'            => 'boolean',
        ]);

        $this->settingService->createShift($data);

        return back()->with('success', 'Shift created.');
    }

    public function updateShift(Request $request, Shift $shift): RedirectResponse
    {
        $data = $request->validate([
            'name'                  => 'required|string|max:100',
            'start_time'            => 'required|date_format:H:i',
            'end_time'              => 'required|date_format:H:i',
            'max_late_minutes'      => 'required|integer|min:0',
            'grace_period_minutes'  => 'required|integer|min:0',
            'overtime_after_hours'  => 'required|numeric|min:1|max:24',
            'is_default'            => 'boolean',
            'is_active'             => 'boolean',
        ]);

        $this->settingService->updateShift($shift, $data);

        return back()->with('success', 'Shift updated.');
    }

    public function destroyShift(Shift $shift): RedirectResponse
    {
        $this->settingService->deleteShift($shift);
        return back()->with('success', 'Shift deleted.');
    }

    // ── Leave Types ───────────────────────────────────────────────────────────

    public function storeLeaveType(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name'         => 'required|string|max:100',
            'code'         => 'required|string|max:20|unique:leave_types,code',
            'days_allowed' => 'required|integer|min:1',
            'is_paid'      => 'boolean',
            'description'  => 'nullable|string|max:500',
        ]);

        $this->settingService->createLeaveType($data);

        return back()->with('success', 'Leave type created.');
    }

    public function updateLeaveType(Request $request, LeaveType $leaveType): RedirectResponse
    {
        $data = $request->validate([
            'name'         => 'required|string|max:100',
            'days_allowed' => 'required|integer|min:1',
            'is_paid'      => 'boolean',
            'is_active'    => 'boolean',
            'description'  => 'nullable|string|max:500',
        ]);

        $this->settingService->updateLeaveType($leaveType, $data);

        return back()->with('success', 'Leave type updated.');
    }

    public function destroyLeaveType(LeaveType $leaveType): RedirectResponse
    {
        $this->settingService->deleteLeaveType($leaveType);
        return back()->with('success', 'Leave type deleted.');
    }
}
