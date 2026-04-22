<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(private DashboardService $dashboardService) {}

    public function index(): Response
    {
        return Inertia::render('admin/dashboard', [
            'stats'           => $this->dashboardService->getAdminStats(),
            'recentAttendance' => $this->dashboardService->getRecentAttendance(8),
            'chart'           => $this->dashboardService->getMonthlyAttendanceChart(
                now()->month, now()->year
            ),
        ]);
    }
}
