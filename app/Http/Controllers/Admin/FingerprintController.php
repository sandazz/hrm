<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Jobs\PollFingerprintDeviceJob;
use App\Models\DeviceLog;
use App\Models\FingerprintDevice;
use App\Services\AttendanceImportService;
use App\Services\FingerprintSyncService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FingerprintController extends Controller
{
    public function __construct(
        private FingerprintSyncService $syncService,
        private AttendanceImportService $importService,
    ) {}

    public function index(): Response
    {
        return Inertia::render('admin/fingerprint/index', [
            'devices' => FingerprintDevice::orderBy('name')->get(),
            'recentLogs' => DeviceLog::with(['device', 'employee.user'])
                ->orderByDesc('punch_time')
                ->limit(50)
                ->get(),
            'stats' => [
                'total_devices'      => FingerprintDevice::count(),
                'online_devices'     => FingerprintDevice::where('status', 'online')->count(),
                'unprocessed_logs'   => DeviceLog::unprocessed()->count(),
                'today_logs'         => DeviceLog::forDate(today()->toDateString())->count(),
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name'                   => 'required|string|max:100',
            'ip_address'             => 'required|ip',
            'port'                   => 'required|integer|between:1,65535',
            'device_password'        => 'nullable|string|max:50',
            'serial_number'          => 'nullable|string|max:100',
            'location'               => 'nullable|string|max:200',
            'sync_interval_minutes'  => 'required|integer|min:5|max:1440',
            'timeout_seconds'        => 'nullable|integer|min:5|max:120',
        ]);

        FingerprintDevice::create($data);

        return back()->with('success', 'Device added successfully.');
    }

    public function update(Request $request, FingerprintDevice $device): RedirectResponse
    {
        $data = $request->validate([
            'name'                   => 'required|string|max:100',
            'ip_address'             => 'required|ip',
            'port'                   => 'required|integer|between:1,65535',
            'device_password'        => 'nullable|string|max:50',
            'serial_number'          => 'nullable|string|max:100',
            'location'               => 'nullable|string|max:200',
            'sync_interval_minutes'  => 'required|integer|min:5|max:1440',
            'timeout_seconds'        => 'nullable|integer|min:5|max:120',
            'is_active'              => 'boolean',
        ]);

        $device->update($data);

        return back()->with('success', 'Device updated.');
    }

    public function destroy(FingerprintDevice $device): RedirectResponse
    {
        $device->delete();
        return back()->with('success', 'Device removed.');
    }

    /**
     * Manually trigger a sync for a device (dispatches a job).
     */
    public function sync(FingerprintDevice $device): RedirectResponse
    {
        if (! $device->is_active) {
            return back()->with('error', 'Device is not active.');
        }

        PollFingerprintDeviceJob::dispatch($device);

        return back()->with('success', "Sync queued for {$device->name}. Results will appear shortly.");
    }

    /**
     * Immediately sync (synchronous, for testing purposes).
     */
    public function syncNow(FingerprintDevice $device): RedirectResponse
    {
        $result = $this->syncService->syncDevice($device);

        if ($result['success']) {
            $this->importService->processDeviceLogs();
            return back()->with('success', $result['message']);
        }

        return back()->with('error', $result['message']);
    }

    /**
     * Process all unprocessed device logs into attendance records.
     */
    public function processLogs(): RedirectResponse
    {
        $count = $this->importService->processDeviceLogs();

        return back()->with('success', "Processed {$count} attendance records from device logs.");
    }

    /**
     * Show device logs with filters.
     */
    public function logs(Request $request): Response
    {
        $logs = DeviceLog::with(['device', 'employee.user'])
            ->when($request->device_id, fn ($q, $id) => $q->where('device_id', $id))
            ->when($request->date, fn ($q, $d) => $q->whereDate('punch_time', $d))
            ->when($request->unprocessed, fn ($q) => $q->unprocessed())
            ->orderByDesc('punch_time')
            ->paginate(50)
            ->withQueryString();

        return Inertia::render('admin/fingerprint/logs', [
            'logs'    => $logs,
            'devices' => FingerprintDevice::orderBy('name')->get(['id', 'name']),
            'filters' => $request->only('device_id', 'date', 'unprocessed'),
        ]);
    }
}
