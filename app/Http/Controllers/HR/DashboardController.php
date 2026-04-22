<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(private DashboardService $dashboardService) {}

    public function index(): Response
    {
        return Inertia::render('hr/dashboard', [
            'stats' => $this->dashboardService->getHrStats(),
            'chart' => $this->dashboardService->getMonthlyAttendanceChart(now()->month, now()->year),
            'recentAttendance' => $this->dashboardService->getRecentAttendance(6),
        ]);
    }
}
