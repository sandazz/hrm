<?php

namespace App\Services;

use App\Models\Attendance;
use App\Models\LeaveRequest;
use App\Models\LeaveType;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;

class LeaveService
{
    public function paginate(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        return LeaveRequest::with(['employee.user', 'leaveType', 'approver'])
            ->when($filters['employee_id'] ?? null, fn ($q, $id) => $q->where('employee_id', $id))
            ->when($filters['status'] ?? null, fn ($q, $s) => $q->where('status', $s))
            ->when($filters['leave_type_id'] ?? null, fn ($q, $l) => $q->where('leave_type_id', $l))
            ->orderByDesc('created_at')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function submitRequest(int $employeeId, array $data): LeaveRequest
    {
        $startDate = \Illuminate\Support\Carbon::parse($data['start_date']);
        $endDate   = \Illuminate\Support\Carbon::parse($data['end_date']);
        $totalDays = $startDate->diffInWeekdays($endDate) + 1;

        return LeaveRequest::create([
            'employee_id'   => $employeeId,
            'leave_type_id' => $data['leave_type_id'],
            'start_date'    => $data['start_date'],
            'end_date'      => $data['end_date'],
            'total_days'    => $totalDays,
            'reason'        => $data['reason'],
            'status'        => 'pending',
        ]);
    }

    /**
     * Returns null on success, or an error message string if the approval cannot proceed.
     */
    public function approve(LeaveRequest $leave, int $approverId): ?string
    {
        $leave->load('leaveType', 'employee.user');

        // 1. Check remaining leave balance
        $remaining = $this->getRemainingDays($leave->employee_id, $leave->leave_type_id, $leave->start_date->year);

        if ($remaining < $leave->total_days) {
            return "Cannot approve: insufficient leave balance. Requested {$leave->total_days} day(s) but only {$remaining} day(s) remaining for {$leave->leaveType->name}.";
        }

        // 2. Check for existing attendance records in the date range
        $conflict = Attendance::where('employee_id', $leave->employee_id)
            ->whereBetween('date', [$leave->start_date->toDateString(), $leave->end_date->toDateString()])
            ->orderBy('date')
            ->first();

        if ($conflict) {
            $date   = $conflict->date->format('d M Y');
            $status = ucfirst(str_replace('_', ' ', $conflict->status));
            return "Cannot approve: {$leave->employee->user->name} already has an attendance record ({$status}) on {$date}. Please resolve the conflict first.";
        }

        // 3. Approve
        $leave->update([
            'status'      => 'approved',
            'approved_by' => $approverId,
            'approved_at' => now(),
        ]);

        // 4. Bulk-insert attendance records for every day in the leave range
        $rows    = [];
        $now     = now()->toDateTimeString();
        $current = $leave->start_date->copy();

        while ($current->lte($leave->end_date)) {
            $rows[] = [
                'employee_id' => $leave->employee_id,
                'date'        => $current->toDateString(),
                'status'      => 'on_leave',
                'check_in'    => null,
                'check_out'   => null,
                'work_hours'  => 0,
                'notes'       => 'Auto-generated: Approved leave (' . $leave->leaveType->name . ')',
                'source'      => 'manual',
                'is_late'     => false,
                'late_minutes'=> 0,
                'overtime_hours' => 0,
                'created_at'  => $now,
                'updated_at'  => $now,
            ];
            $current->addDay();
        }

        Attendance::upsert($rows, ['employee_id', 'date'], [
            'status', 'check_in', 'check_out', 'work_hours', 'notes', 'source', 'updated_at',
        ]);

        return null;
    }

    public function reject(LeaveRequest $leave, int $approverId, string $reason): LeaveRequest
    {
        $leave->update([
            'status'           => 'rejected',
            'approved_by'      => $approverId,
            'approved_at'      => now(),
            'rejection_reason' => $reason,
        ]);

        return $leave;
    }

    public function cancel(LeaveRequest $leave): LeaveRequest
    {
        $leave->update(['status' => 'cancelled']);
        return $leave;
    }

    public function getRemainingDays(int $employeeId, int $leaveTypeId, int $year): int
    {
        $leaveType = LeaveType::findOrFail($leaveTypeId);
        $used = LeaveRequest::where('employee_id', $employeeId)
            ->where('leave_type_id', $leaveTypeId)
            ->where('status', 'approved')
            ->whereYear('start_date', $year)
            ->sum('total_days');

        return max(0, $leaveType->days_allowed - $used);
    }
}
