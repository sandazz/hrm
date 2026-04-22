<?php

use App\Http\Controllers\Admin\AttendanceImportController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DepartmentController;
use App\Http\Controllers\Admin\EmployeeController;
use App\Http\Controllers\Admin\FingerprintController;
use App\Http\Controllers\Admin\LeaveController;
use App\Http\Controllers\Admin\PayrollController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Admin\SettingController;
use App\Models\Shift;
use App\Models\LeaveType;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Employees
    Route::resource('employees', EmployeeController::class);

    // Departments
    Route::resource('departments', DepartmentController::class)->except('show');

    // Leave
    Route::get('leave', [LeaveController::class, 'index'])->name('leave.index');
    Route::post('leave/{leave}/approve', [LeaveController::class, 'approve'])->name('leave.approve');
    Route::post('leave/{leave}/reject', [LeaveController::class, 'reject'])->name('leave.reject');

    // Payroll
    Route::get('payroll', [PayrollController::class, 'index'])->name('payroll.index');
    Route::get('payroll/{payroll}', [PayrollController::class, 'show'])->name('payroll.show');
    Route::post('payroll/generate', [PayrollController::class, 'generate'])->name('payroll.generate');
    Route::post('payroll/generate-bulk', [PayrollController::class, 'generateBulk'])->name('payroll.generate-bulk');
    Route::post('payroll/{payroll}/mark-paid', [PayrollController::class, 'markPaid'])->name('payroll.mark-paid');

    // Salary Components (per employee)
    Route::post('employees/{employee}/components', [PayrollController::class, 'storeComponent'])->name('payroll.component.store');
    Route::delete('salary-components/{component}', [PayrollController::class, 'destroyComponent'])->name('payroll.component.destroy');

    // Fingerprint Devices
    Route::get('fingerprint', [FingerprintController::class, 'index'])->name('fingerprint.index');
    Route::post('fingerprint', [FingerprintController::class, 'store'])->name('fingerprint.store');
    Route::put('fingerprint/{device}', [FingerprintController::class, 'update'])->name('fingerprint.update');
    Route::delete('fingerprint/{device}', [FingerprintController::class, 'destroy'])->name('fingerprint.destroy');
    Route::post('fingerprint/{device}/sync', [FingerprintController::class, 'sync'])->name('fingerprint.sync');
    Route::post('fingerprint/{device}/sync-now', [FingerprintController::class, 'syncNow'])->name('fingerprint.sync-now');
    Route::post('fingerprint/process-logs', [FingerprintController::class, 'processLogs'])->name('fingerprint.process-logs');
    Route::get('fingerprint/logs', [FingerprintController::class, 'logs'])->name('fingerprint.logs');

    // Attendance Import (CSV)
    Route::get('attendance-import', [AttendanceImportController::class, 'index'])->name('attendance-import.index');
    Route::post('attendance-import', [AttendanceImportController::class, 'store'])->name('attendance-import.store');
    Route::get('attendance-import/{import}', [AttendanceImportController::class, 'show'])->name('attendance-import.show');

    // Reports
    Route::get('reports/attendance', [ReportController::class, 'attendance'])->name('reports.attendance');
    Route::get('reports/payroll', [ReportController::class, 'payroll'])->name('reports.payroll');
    Route::get('reports/leave', [ReportController::class, 'leave'])->name('reports.leave');

    // Settings (single panel)
    Route::get('settings', [SettingController::class, 'index'])->name('settings.index');
    Route::post('settings/company', [SettingController::class, 'updateCompany'])->name('settings.company');
    Route::post('settings/payroll', [SettingController::class, 'updatePayroll'])->name('settings.payroll');
    Route::post('settings/fingerprint', [SettingController::class, 'updateFingerprint'])->name('settings.fingerprint');

    // Shifts (managed within Settings)
    Route::post('settings/shifts', [SettingController::class, 'storeShift'])->name('settings.shifts.store');
    Route::put('settings/shifts/{shift}', [SettingController::class, 'updateShift'])->name('settings.shifts.update');
    Route::delete('settings/shifts/{shift}', [SettingController::class, 'destroyShift'])->name('settings.shifts.destroy');

    // Leave Types (managed within Settings)
    Route::post('settings/leave-types', [SettingController::class, 'storeLeaveType'])->name('settings.leave-types.store');
    Route::put('settings/leave-types/{leaveType}', [SettingController::class, 'updateLeaveType'])->name('settings.leave-types.update');
    Route::delete('settings/leave-types/{leaveType}', [SettingController::class, 'destroyLeaveType'])->name('settings.leave-types.destroy');
});

