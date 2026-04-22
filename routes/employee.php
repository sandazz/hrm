<?php

use App\Http\Controllers\Employee\DashboardController;
use App\Http\Controllers\Employee\LeaveController;
use App\Http\Controllers\Employee\PayrollController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:employee,hr,admin'])->prefix('employee')->name('employee.')->group(function () {

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('check-in', [DashboardController::class, 'checkIn'])->name('check-in');
    Route::post('check-out', [DashboardController::class, 'checkOut'])->name('check-out');

    // Leave
    Route::get('leave', [LeaveController::class, 'index'])->name('leave.index');
    Route::post('leave', [LeaveController::class, 'store'])->name('leave.store');
    Route::delete('leave/{leave}/cancel', [LeaveController::class, 'cancel'])->name('leave.cancel');

    // Payroll (view own)
    Route::get('payroll', [PayrollController::class, 'index'])->name('payroll.index');
});
