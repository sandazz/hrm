<?php

namespace App\Jobs;

use App\Services\AttendanceImportService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessDeviceLogsJob implements ShouldQueue
{
    use Queueable, InteractsWithQueue, SerializesModels;

    public int $timeout = 300;
    public int $tries   = 2;

    public function handle(AttendanceImportService $importService): void
    {
        $importService->processDeviceLogs();
    }
}
