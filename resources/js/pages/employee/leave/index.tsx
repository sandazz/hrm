import { Head, router, useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import InputError from '@/components/input-error';
import * as leaveRoutes from '@/routes/employee/leave';
import type { LeaveRequest, LeaveType, PaginatedData } from '@/types';

interface LeaveBalance {
    id: number;
    name: string;
    allowed: number;
    remaining: number;
}

interface Props {
    leaves: PaginatedData<LeaveRequest>;
    leaveTypes: LeaveType[];
    balances: LeaveBalance[];
}

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-emerald-100 text-emerald-800',
    rejected: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-800',
};

function ApplyLeaveDialog({ leaveTypes }: { leaveTypes: LeaveType[] }) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        leave_type_id: '',
        start_date: '',
        end_date: '',
        reason: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(leaveRoutes.store().url, { onSuccess: () => { reset(); setOpen(false); } });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button><Plus className="mr-2 h-4 w-4" /> Apply for Leave</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader><DialogTitle>Apply for Leave</DialogTitle></DialogHeader>
                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-1">
                        <Label>Leave Type *</Label>
                        <Select value={data.leave_type_id} onValueChange={(v) => setData('leave_type_id', v)}>
                            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                            <SelectContent>
                                {leaveTypes.map((lt) => (
                                    <SelectItem key={lt.id} value={String(lt.id)}>{lt.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.leave_type_id} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label>Start Date *</Label>
                            <Input type="date" value={data.start_date} onChange={(e) => setData('start_date', e.target.value)} required />
                            <InputError message={errors.start_date} />
                        </div>
                        <div className="space-y-1">
                            <Label>End Date *</Label>
                            <Input type="date" value={data.end_date} onChange={(e) => setData('end_date', e.target.value)} required />
                            <InputError message={errors.end_date} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label>Reason *</Label>
                        <Input value={data.reason} onChange={(e) => setData('reason', e.target.value)} placeholder="Briefly describe the reason…" required />
                        <InputError message={errors.reason} />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" type="button" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={processing}>Submit</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default function EmployeeLeave({ leaves: data, leaveTypes, balances }: Props) {
    return (
        <>
            <Head title="My Leave" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">My Leave</h1>
                        <p className="text-muted-foreground text-sm">Manage your leave requests</p>
                    </div>
                    <ApplyLeaveDialog leaveTypes={leaveTypes} />
                </div>

                {/* Leave Balances */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {balances.map((b) => (
                        <Card key={b.id}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">{b.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">{b.remaining}</p>
                                <p className="text-muted-foreground text-xs">of {b.allowed} days remaining</p>
                                <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-primary"
                                        style={{ width: `${Math.round((b.remaining / b.allowed) * 100)}%` }}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Leave History */}
                <Card>
                    <CardHeader><CardTitle>Leave History</CardTitle></CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="border-b bg-muted/40">
                                    <tr>
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
                                            <td className="px-4 py-3">{leave.leave_type?.name}</td>
                                            <td className="px-4 py-3 text-xs">
                                                {new Date(leave.start_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} → {new Date(leave.end_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td className="px-4 py-3">{leave.total_days}d</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusColors[leave.status] ?? ''}`}>
                                                    {leave.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                {leave.status === 'pending' && (
                                                    <Button size="sm" variant="ghost" className="text-red-600"
                                                        onClick={() => {
                                                            if (confirm('Cancel this leave request?')) {
                                                                router.delete(leaveRoutes.cancel({ leave: leave.id }).url);
                                                            }
                                                        }}>
                                                        Cancel
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {data.data.length === 0 && (
                                        <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No leave requests yet.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
