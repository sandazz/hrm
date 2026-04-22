<?php

namespace App\Jobs;

use App\Models\FingerprintDevice;
use App\Services\AttendanceImportService;
use App\Services\FingerprintSyncService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class PollFingerprintDeviceJob implements ShouldQueue
{
    use Queueable, InteractsWithQueue, SerializesModels;

    public int $timeout = 120;
    public int $tries   = 3;

    public function __construct(public FingerprintDevice $device) {}

    public function handle(FingerprintSyncService $syncService, AttendanceImportService $importService): void
    {
        $result = $syncService->syncDevice($this->device);

        if ($result['success'] && $result['records'] > 0) {
            $importService->processDeviceLogs();
        }
    }
}
