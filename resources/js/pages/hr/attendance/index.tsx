import { Head, router, useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import InputError from '@/components/input-error';
import * as attRoutes from '@/routes/hr/attendance';
import type { Attendance, Employee, PaginatedData } from '@/types';

interface Props {
    attendance: PaginatedData<Attendance>;
    employees: Employee[];
    filters: Record<string, string>;
}

const statusColors: Record<string, string> = {
    present: 'bg-emerald-100 text-emerald-800',
    absent: 'bg-red-100 text-red-800',
    late: 'bg-yellow-100 text-yellow-800',
    half_day: 'bg-orange-100 text-orange-800',
    on_leave: 'bg-blue-100 text-blue-800',
    holiday: 'bg-purple-100 text-purple-800',
};

const formatDate = (value?: string) => {
    if (!value) {
        return '—';
    }

    return value.split('T')[0];
};

function AddAttendanceDialog({ employees }: { employees: Employee[] }) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        employee_id: '',
        date: new Date().toISOString().slice(0, 10),
        check_in: '',
        check_out: '',
        status: 'present',
        notes: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(attRoutes.store().url, { onSuccess: () => { reset(); setOpen(false); } });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button><Plus className="mr-2 h-4 w-4" /> Mark Attendance</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader><DialogTitle>Record Attendance</DialogTitle></DialogHeader>
                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-1">
                        <Label>Employee *</Label>
                        <Select value={data.employee_id} onValueChange={(v) => setData('employee_id', v)}>
                            <SelectTrigger><SelectValue placeholder="Select employee" /></SelectTrigger>
                            <SelectContent>
                                {employees.map((e) => (
                                    <SelectItem key={e.id} value={String(e.id)}>
                                        {e.user?.name} ({e.employee_id})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.employee_id} />
                    </div>
                    <div className="space-y-1">
                        <Label>Date *</Label>
                        <Input type="date" value={data.date} onChange={(e) => setData('date', e.target.value)} required />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label>Check In</Label>
                            <Input type="time" value={data.check_in} onChange={(e) => setData('check_in', e.target.value)} />
                        </div>
                        <div className="space-y-1">
                            <Label>Check Out</Label>
                            <Input type="time" value={data.check_out} onChange={(e) => setData('check_out', e.target.value)} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label>Status *</Label>
                        <Select value={data.status} onValueChange={(v) => setData('status', v)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {['present', 'absent', 'late', 'half_day', 'holiday', 'on_leave'].map((s) => (
                                    <SelectItem key={s} value={s}>{s.replace('_', ' ')}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" type="button" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={processing}>Save</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default function HrAttendance({ attendance: data, employees, filters }: Props) {
    return (
        <>
            <Head title="Attendance" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Attendance</h1>
                        <p className="text-muted-foreground text-sm">{data.total} records</p>
                    </div>
                    <AddAttendanceDialog employees={employees} />
                </div>

                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="border-b bg-muted/40">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-medium">Employee</th>
                                        <th className="px-4 py-3 text-left font-medium">Date</th>
                                        <th className="px-4 py-3 text-left font-medium">Check In</th>
                                        <th className="px-4 py-3 text-left font-medium">Check Out</th>
                                        <th className="px-4 py-3 text-left font-medium">Hours</th>
                                        <th className="px-4 py-3 text-left font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.data.map((att) => (
                                        <tr key={att.id} className="border-b last:border-0 hover:bg-muted/20">
                                            <td className="px-4 py-3">
                                                <p className="font-medium">{att.employee?.user?.name}</p>
                                                <p className="text-muted-foreground text-xs">{att.employee?.employee_id}</p>
                                            </td>
                                            <td className="px-4 py-3">{formatDate(att.date as string)}</td>
                                            <td className="px-4 py-3">{att.check_in ?? '—'}</td>
                                            <td className="px-4 py-3">{att.check_out ?? '—'}</td>
                                            <td className="px-4 py-3">{att.work_hours}h</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusColors[att.status] ?? ''}`}>
                                                    {att.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {data.data.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No records.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {data.last_page > 1 && (
                    <div className="flex justify-center gap-1">
                        {data.links.map((link, i) => (
                            <Button key={i} variant={link.active ? 'default' : 'outline'} size="sm"
                                disabled={!link.url} onClick={() => link.url && router.get(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
