<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreBiometricLogRequest;
use App\Services\BiometricAttendanceService;
use Illuminate\Http\JsonResponse;

class BiometricAttendanceController extends Controller
{
    public function __construct(
        private readonly BiometricAttendanceService $service,
    ) {}

    /**
     * Store attendance logs received from a biometric device.
     *
     * POST /api/attendance/logs
     *
     * Request body (JSON array):
     * [
     *   { "UID": "1", "AttTime": "2026-04-30 08:15:00" },
     *   ...
     * ]
     */
    public function store(StoreBiometricLogRequest $request): JsonResponse
    {
        $records = $request->validated();

        $result = $this->service->processBatch($records);

        $hasErrors  = count($result['errors']) > 0;
        $statusCode = $hasErrors ? 207 : 200; // 207 Multi-Status when some records failed

        return response()->json([
            'success'  => ! $hasErrors || $result['inserted'] > 0,
            'message'  => sprintf(
                'Processed %d record(s): %d inserted, %d skipped as duplicate, %d error(s).',
                count($records),
                $result['inserted'],
                $result['skipped'],
                count($result['errors']),
            ),
            'data' => [
                'total'    => count($records),
                'inserted' => $result['inserted'],
                'skipped'  => $result['skipped'],
                'errors'   => $result['errors'],
            ],
        ], $statusCode);
    }
}
