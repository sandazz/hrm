import { Head, router } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import * as leaveRoutes from '@/routes/hr/leave';
import type { LeaveRequest, PaginatedData } from '@/types';

interface Props {
    leaves: PaginatedData<LeaveRequest>;
    filters: { status?: string };
}

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-emerald-100 text-emerald-800',
    rejected: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-800',
};

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatLeaveDate = (value?: string) => {
    if (!value) {
        return '—';
    }

    const [datePart] = value.split('T');
    const [year, month, day] = datePart.split('-');
    const monthIndex = Number(month) - 1;

    if (!year || Number.isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11 || !day) {
        return value;
    }

    return `${MONTH_NAMES[monthIndex]} ${Number(day)}, ${year}`;
};

export default function HrLeave({ leaves: data, filters }: Props) {
    const [rejectDialog, setRejectDialog] = useState<{ open: boolean; id?: number }>({ open: false });
    const [reason, setReason] = useState('');

    const approve = (id: number) => router.post(leaveRoutes.approve({ leave: id }).url);

    const submitReject = () => {
        if (!rejectDialog.id) return;
        router.post(leaveRoutes.reject({ leave: rejectDialog.id }).url, { rejection_reason: reason }, {
            onSuccess: () => setRejectDialog({ open: false }),
        });
    };

    return (
        <>
            <Head title="Leave Requests" />
            <div className="flex flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold">Leave Requests</h1>
                    <p className="text-muted-foreground text-sm">{data.total} total</p>
                </div>

                <div className="flex gap-2">
                    {['', 'pending', 'approved', 'rejected'].map((s) => (
                        <Button key={s} size="sm" variant={(filters.status === s || (!filters.status && !s)) ? 'default' : 'outline'}
                            onClick={() => router.get(leaveRoutes.index().url, { status: s }, { preserveState: true, replace: true })}>
                            {s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All'}
                        </Button>
                    ))}
                </div>

                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="border-b bg-muted/40">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-medium">Employee</th>
                                        <th className="px-4 py-3 text-left font-medium">Type</th>
                                        <th className="px-4 py-3 text-left font-medium">Period</th>
                                        <th className="px-4 py-3 text-left font-medium">Days</th>
                                        <th className="px-4 py-3 text-left font-medium">Status</th>
                                        <th className="px-4 py-3 text-left font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.data.map((leave) => (
                                        <tr key={leave.id} className="border-b last:border-0 hover:bg-muted/20">
                                            <td className="px-4 py-3 font-medium">{leave.employee?.user?.name}</td>
                                            <td className="px-4 py-3">{leave.leave_type?.name}</td>
                                            <td className="px-4 py-3 text-xs">{formatLeaveDate(leave.start_date)} → {formatLeaveDate(leave.end_date)}</td>
                                            <td className="px-4 py-3">{leave.total_days}d</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusColors[leave.status] ?? ''}`}>
                                                    {leave.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                {leave.status === 'pending' && (
                                                    <div className="flex gap-1">
                                                        <Button size="sm" variant="outline" className="text-emerald-600" onClick={() => approve(leave.id)}>
                                                            <Check className="h-3 w-3" />
                                                        </Button>
                                                        <Button size="sm" variant="outline" className="text-red-600" onClick={() => { setReason(''); setRejectDialog({ open: true, id: leave.id }); }}>
                                                            <X className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {data.data.length === 0 && (
                                        <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No records.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={rejectDialog.open} onOpenChange={(o) => setRejectDialog({ open: o })}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Reject Leave</DialogTitle></DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <Label>Reason *</Label>
                            <Input value={reason} onChange={(e) => setReason(e.target.value)} />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setRejectDialog({ open: false })}>Cancel</Button>
                            <Button variant="destructive" onClick={submitReject} disabled={!reason.trim()}>Reject</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
