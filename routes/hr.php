<?php

use App\Http\Controllers\HR\AttendanceController;
use App\Http\Controllers\HR\DashboardController;
use App\Http\Controllers\HR\LeaveController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:hr,admin'])->prefix('hr')->name('hr.')->group(function () {

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Attendance
    Route::get('attendance', [AttendanceController::class, 'index'])->name('attendance.index');
    Route::post('attendance', [AttendanceController::class, 'store'])->name('attendance.store');

    // Leave
    Route::get('leave', [LeaveController::class, 'index'])->name('leave.index');
    Route::post('leave/{leave}/approve', [LeaveController::class, 'approve'])->name('leave.approve');
    Route::post('leave/{leave}/reject', [LeaveController::class, 'reject'])->name('leave.reject');
});
