<?php

namespace App\Services;

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

    public function approve(LeaveRequest $leave, int $approverId): LeaveRequest
    {
        $leave->update([
            'status'      => 'approved',
            'approved_by' => $approverId,
            'approved_at' => now(),
        ]);

        return $leave;
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
