<?php

namespace App\Services;

use App\Models\FingerprintDevice;
use App\Models\DeviceLog;
use App\Models\Employee;
use Exception;
use Illuminate\Support\Carbon;

/**
 * ZKTeco Fingerprint Device Service
 *
 * Communicates with ZKTeco devices via TCP/IP (ZKProtocol).
 * Compatible with ZK4500, ZKTeco K40, iClock series, etc.
 */
class FingerprintSyncService
{
    private $socket = null;
    private int $sessionId = 0;
    private int $replyId   = 0;

    // ZK Protocol command codes
    private const CMD_CONNECT       = 1000;
    private const CMD_EXIT          = 1001;
    private const CMD_ENABLEDEVICE  = 1002;
    private const CMD_DISABLEDEVICE = 1003;
    private const CMD_GETTIMEINFO   = 1100;
    private const CMD_ACK_OK        = 2000;
    private const CMD_ACK_ERROR     = 2001;
    private const CMD_ATTLOG_RRQ    = 13;
    private const CMD_DATA          = 15;
    private const CMD_FREE_DATA     = 1502;
    private const CMD_DATA_WRRQ     = 1500;
    private const CMD_DATA_RDY      = 1501;

    public function syncDevice(FingerprintDevice $device): array
    {
        $results = ['success' => false, 'records' => 0, 'message' => ''];

        try {
            $device->update(['status' => 'syncing']);

            $connected = $this->connect($device->ip_address, $device->port, $device->timeout_seconds);

            if (! $connected) {
                throw new Exception("Cannot connect to device at {$device->ip_address}:{$device->port}");
            }

            $attendanceLogs = $this->getAttendanceLogs();
            $count          = $this->storeRawLogs($device, $attendanceLogs);

            $this->disconnect();

            $device->markOnline($count);

            $results = ['success' => true, 'records' => $count, 'message' => "Synced {$count} records."];
        } catch (Exception $e) {
            $device->markError($e->getMessage());
            $results['message'] = $e->getMessage();
            if ($this->socket) {
                @socket_close($this->socket);
            }
        }

        return $results;
    }

    // ── Low-level ZKProtocol TCP ──────────────────────────────────────────────

    private function connect(string $ip, int $port, int $timeout): bool
    {
        $this->socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
        if (! $this->socket) {
            return false;
        }

        socket_set_option($this->socket, SOL_SOCKET, SO_RCVTIMEO, ['sec' => $timeout, 'usec' => 0]);
        socket_set_option($this->socket, SOL_SOCKET, SO_SNDTIMEO, ['sec' => $timeout, 'usec' => 0]);

        $connected = @socket_connect($this->socket, $ip, $port);
        if (! $connected) {
            return false;
        }

        $this->sessionId = 0;
        $this->replyId   = 0;

        $buf = $this->sendCommand(self::CMD_CONNECT, '');
        if (! $buf) {
            return false;
        }

        $this->sessionId = unpack('v', substr($buf, 4, 2))[1];

        return true;
    }

    private function disconnect(): void
    {
        $this->sendCommand(self::CMD_EXIT, '');
        if ($this->socket) {
            @socket_close($this->socket);
            $this->socket = null;
        }
    }

    private function sendCommand(int $cmd, string $data): string|false
    {
        $this->replyId++;

        $buf = pack('vvvv', $cmd, 0, $this->sessionId, $this->replyId) . $data;
        // Fix checksum position
        $checksum = $this->calcChecksum($buf);
        $buf[2]   = chr($checksum & 0xFF);
        $buf[3]   = chr(($checksum >> 8) & 0xFF);

        $sent = @socket_send($this->socket, $buf, strlen($buf), 0);
        if ($sent === false) {
            return false;
        }

        $response = '';
        @socket_recv($this->socket, $response, 1024, 0);

        return $response ?: false;
    }

    private function calcChecksum(string $buf): int
    {
        $u      = 0;
        $length = strlen($buf);
        for ($i = 0; $i < $length; $i += 2) {
            if ($i + 2 <= $length) {
                $u += unpack('v', substr($buf, $i, 2))[1];
            } else {
                $u += ord($buf[$i]);
            }
            $u = $u & 0xFFFF;
        }
        while ($u > 0xFFFF) {
            $u = ($u & 0xFFFF) + ($u >> 16);
        }
        return (~$u) & 0xFFFF;
    }

    private function getAttendanceLogs(): array
    {
        $this->sendCommand(self::CMD_DISABLEDEVICE, chr(0) . chr(0));

        $response = $this->sendCommand(self::CMD_ATTLOG_RRQ, '');
        if (! $response || strlen($response) < 8) {
            $this->sendCommand(self::CMD_ENABLEDEVICE, '');
            return [];
        }

        $cmdCode = unpack('v', substr($response, 0, 2))[1];
        if ($cmdCode === self::CMD_ACK_OK) {
            $this->sendCommand(self::CMD_ENABLEDEVICE, '');
            return [];
        }

        // Read bulk data
        $rawData = $this->readBulkData();
        $this->sendCommand(self::CMD_ENABLEDEVICE, '');

        return $this->parseAttendanceLogs($rawData);
    }

    private function readBulkData(): string
    {
        $buf = '';

        // Signal ready
        $this->sendCommand(self::CMD_DATA_RDY, pack('V', 0));

        $chunk = '';
        while (true) {
            @socket_recv($this->socket, $chunk, 65536, 0);
            if (! $chunk) {
                break;
            }
            if (strlen($chunk) < 8) {
                break;
            }
            $cmdCode = unpack('v', substr($chunk, 0, 2))[1];
            if ($cmdCode === self::CMD_FREE_DATA || $cmdCode === self::CMD_ACK_OK) {
                break;
            }
            $buf .= substr($chunk, 8); // strip header
        }

        return $buf;
    }

    private function parseAttendanceLogs(string $raw): array
    {
        $logs  = [];
        $i     = 0;
        $len   = strlen($raw);
        $recSz = 40; // standard ZK attendance record size

        while ($i + $recSz <= $len) {
            $record = substr($raw, $i, $recSz);
            $uid    = unpack('v', substr($record, 0, 2))[1];
            $year   = unpack('C', substr($record, 26, 1))[1] + 2000;
            $month  = unpack('C', substr($record, 27, 1))[1];
            $day    = unpack('C', substr($record, 28, 1))[1];
            $hour   = unpack('C', substr($record, 29, 1))[1];
            $min    = unpack('C', substr($record, 30, 1))[1];
            $sec    = unpack('C', substr($record, 31, 1))[1];
            $type   = unpack('C', substr($record, 32, 1))[1] ?? 255; // 0=check-in,1=check-out

            if ($uid > 0 && $month >= 1 && $month <= 12 && $day >= 1 && $day <= 31) {
                $logs[] = [
                    'uid'        => $uid,
                    'punch_time' => sprintf('%04d-%02d-%02d %02d:%02d:%02d', $year, $month, $day, $hour, $min, $sec),
                    'type'       => $type,
                ];
            }
            $i += $recSz;
        }

        return $logs;
    }

    private function storeRawLogs(FingerprintDevice $device, array $logs): int
    {
        $count = 0;

        foreach ($logs as $log) {
            // Map biometric UID to employee
            $employee = Employee::where('employee_id', $log['uid'])->first()
                ?? Employee::whereHas('user', fn ($q) => $q->where('id', $log['uid']))->first();

            $punchType = match ($log['type']) {
                0 => 'in',
                1 => 'out',
                default => 'unknown',
            };

            try {
                DeviceLog::firstOrCreate(
                    [
                        'device_id'    => $device->id,
                        'biometric_uid' => $log['uid'],
                        'punch_time'   => $log['punch_time'],
                    ],
                    [
                        'employee_id'  => $employee?->id,
                        'punch_type'   => $punchType,
                        'is_processed' => false,
                    ]
                );
                $count++;
            } catch (\Throwable) {
                // Duplicate — skip
            }
        }

        return $count;
    }

    // ── Employee Enrollment Mapping ───────────────────────────────────────────

    /**
     * Map employee records to biometric UIDs via employee_id prefix number.
     */
    public function matchEmployees(): int
    {
        $updated = DeviceLog::whereNull('employee_id')->get()->each(function (DeviceLog $log) {
            $employee = Employee::where('employee_id', 'EMP-' . str_pad($log->biometric_uid, 4, '0', STR_PAD_LEFT))
                ->orWhere('employee_id', (string) $log->biometric_uid)
                ->first();

            if ($employee) {
                $log->update(['employee_id' => $employee->id]);
            }
        });

        return $updated->count();
    }
}
