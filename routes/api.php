<?php

use App\Http\Controllers\Api\BiometricAttendanceController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| These routes are stateless and do not use session / cookie authentication.
| Protect them via API token middleware (e.g. auth:sanctum) as needed.
|
*/

Route::prefix('attendance')->name('api.attendance.')->group(function () {
    /**
     * POST /api/attendance/logs
     *
     * Accepts a JSON array of biometric punch records and stores them
     * with automatic IN / OUT type determination.
     */
    Route::post('logs', [BiometricAttendanceController::class, 'store'])
        ->name('logs.store');
});
