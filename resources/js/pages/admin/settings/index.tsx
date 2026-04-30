import { Head, router, useForm } from '@inertiajs/react';
import { Building2, ChevronRight, Clock, CreditCard, DollarSign, Fingerprint, Percent, Plus, Save, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import * as settingsRoutes from '@/routes/admin/settings';
import * as allowanceSettingsRoutes from '@/routes/admin/settings/allowances';
import * as shiftRoutes from '@/routes/admin/settings/shifts';
import * as leaveTypeRoutes from '@/routes/admin/settings/leave-types';

// ── Types ─────────────────────────────────────────────────────────────────────

interface CompanySettings {
    company_name: string; company_address: string; company_phone: string;
    company_email: string; currency: string; timezone: string;
}

interface PayrollSettings {
    payroll_epf_employee_rate: number; payroll_epf_employer_rate: number;
    payroll_etf_employer_rate: number; payroll_overtime_multiplier: number;
    payroll_late_threshold_days: number; payroll_late_deduction_days: number;
    working_days_per_week: number;
}

interface FpSettings {
    fp_auto_sync_enabled: boolean; fp_sync_interval: number; fp_auto_process_logs: boolean;
}

interface Shift {
    id: number; name: string; start_time: string; end_time: string;
    max_late_minutes: number; grace_period_minutes: number;
    overtime_after_hours: number; is_default: boolean; is_active: boolean;
}

interface LeaveType {
    id: number; name: string; code: string; days_allowed: number;
    is_paid: boolean; is_active: boolean; description?: string;
}

interface PayeBracket {
    from: number; to: number | null; rate: number;
}

interface AllowanceComponent {
    id: number; component_type: string; name: string;
    amount: number; is_percentage: boolean; percentage: number | null; is_active: boolean;
}

interface Props {
    company: CompanySettings;
    payroll: PayrollSettings;
    fingerprint: FpSettings;
    shifts: Shift[];
    leaveTypes: LeaveType[];
    payeBrackets: PayeBracket[];
    allowances: AllowanceComponent[];
}

type Tab = 'company' | 'payroll' | 'shifts' | 'leave-types' | 'fingerprint' | 'paye-tax' | 'allowances';

// ── Component ─────────────────────────────────────────────────────────────────

export default function SettingsIndex({ company, payroll, fingerprint, shifts, leaveTypes, payeBrackets, allowances }: Props) {
    const [tab, setTab] = useState<Tab>('company');
    const [shiftDialog, setShiftDialog] = useState<{ open: boolean; shift?: Shift }>({ open: false });
    const [ltDialog, setLtDialog] = useState<{ open: boolean; lt?: LeaveType }>({ open: false });

    const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
        { key: 'company', label: 'Company', icon: <Building2 className="h-4 w-4" /> },
        { key: 'payroll', label: 'Payroll', icon: <CreditCard className="h-4 w-4" /> },
        { key: 'paye-tax', label: 'PAYE Tax', icon: <Percent className="h-4 w-4" /> },
        { key: 'allowances', label: 'Allowances', icon: <DollarSign className="h-4 w-4" /> },
        { key: 'shifts', label: 'Shifts', icon: <Clock className="h-4 w-4" /> },
        { key: 'leave-types', label: 'Leave Types', icon: <ChevronRight className="h-4 w-4" /> },
        { key: 'fingerprint', label: 'Fingerprint', icon: <Fingerprint className="h-4 w-4" /> },
    ];

    return (
        <>
            <Head title="System Settings" />
            <div className="flex gap-6 p-6">
                {/* Sidebar nav */}
                <nav className="w-48 shrink-0 space-y-1">
                    <p className="text-muted-foreground mb-3 text-xs font-semibold uppercase tracking-wider">Settings</p>
                    {tabs.map((t) => (
                        <button
                            key={t.key}
                            onClick={() => setTab(t.key)}
                            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${tab === t.key ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                                }`}
                        >
                            {t.icon} {t.label}
                        </button>
                    ))}
                </nav>

                {/* Content */}
                <div className="flex-1">
                    {tab === 'company' && <CompanyPanel initial={company} />}
                    {tab === 'payroll' && <PayrollPanel initial={payroll} />}
                    {tab === 'paye-tax' && <PayeTaxPanel brackets={payeBrackets} />}
                    {tab === 'allowances' && <AllowancesPanel allowances={allowances} />}
                    {tab === 'shifts' && <ShiftsPanel shifts={shifts} onAdd={() => setShiftDialog({ open: true })} onEdit={(s) => setShiftDialog({ open: true, shift: s })} />}
                    {tab === 'leave-types' && <LeaveTypesPanel leaveTypes={leaveTypes} onAdd={() => setLtDialog({ open: true })} onEdit={(lt) => setLtDialog({ open: true, lt })} />}
                    {tab === 'fingerprint' && <FingerprintPanel initial={fingerprint} />}
                </div>
            </div>

            <ShiftDialog
                open={shiftDialog.open}
                shift={shiftDialog.shift}
                onClose={() => setShiftDialog({ open: false })}
            />
            <LeaveTypeDialog
                open={ltDialog.open}
                lt={ltDialog.lt}
                onClose={() => setLtDialog({ open: false })}
            />
        </>
    );
}

// ── Company Panel ─────────────────────────────────────────────────────────────

function CompanyPanel({ initial }: { initial: CompanySettings }) {
    const form = useForm({ ...initial });
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(settingsRoutes.company().url);
    };
    return (
        <Card>
            <CardHeader><CardTitle>Company Information</CardTitle><CardDescription>Used on payslips and reports</CardDescription></CardHeader>
            <CardContent>
                <form onSubmit={submit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Company Name" value={form.data.company_name} onChange={(v) => form.setData('company_name', v)} required />
                        <Field label="Currency" value={form.data.currency} onChange={(v) => form.setData('currency', v)} />
                        <div className="col-span-2">
                            <Field label="Address" value={form.data.company_address} onChange={(v) => form.setData('company_address', v)} />
                        </div>
                        <Field label="Phone" value={form.data.company_phone} onChange={(v) => form.setData('company_phone', v)} />
                        <Field label="Email" type="email" value={form.data.company_email} onChange={(v) => form.setData('company_email', v)} />
                        <div className="col-span-2">
                            <Label>Timezone</Label>
                            <Select value={form.data.timezone} onValueChange={(v) => form.setData('timezone', v)}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {['Asia/Colombo', 'Asia/Kolkata', 'UTC'].map((tz) => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Button type="submit" disabled={form.processing}><Save className="mr-2 h-4 w-4" />Save Company Settings</Button>
                </form>
            </CardContent>
        </Card>
    );
}

// ── Payroll Panel ─────────────────────────────────────────────────────────────

function PayrollPanel({ initial }: { initial: PayrollSettings }) {
    const form = useForm({ ...initial });
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(settingsRoutes.payroll().url);
    };
    return (
        <Card>
            <CardHeader><CardTitle>Payroll Configuration</CardTitle><CardDescription>EPF/ETF rates and payroll rules (Sri Lanka)</CardDescription></CardHeader>
            <CardContent>
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <p className="mb-3 text-sm font-semibold">EPF / ETF Rates (%)</p>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <Label>EPF Employee</Label>
                                <div className="relative">
                                    <Input type="number" step="0.5" value={form.data.payroll_epf_employee_rate} onChange={(e) => form.setData('payroll_epf_employee_rate', parseFloat(e.target.value))} />
                                    <span className="text-muted-foreground absolute right-3 top-2.5 text-sm">%</span>
                                </div>
                                <p className="text-muted-foreground text-xs">Deducted from employee salary</p>
                            </div>
                            <div className="space-y-1">
                                <Label>EPF Employer</Label>
                                <div className="relative">
                                    <Input type="number" step="0.5" value={form.data.payroll_epf_employer_rate} onChange={(e) => form.setData('payroll_epf_employer_rate', parseFloat(e.target.value))} />
                                    <span className="text-muted-foreground absolute right-3 top-2.5 text-sm">%</span>
                                </div>
                                <p className="text-muted-foreground text-xs">Paid by employer</p>
                            </div>
                            <div className="space-y-1">
                                <Label>ETF Employer</Label>
                                <div className="relative">
                                    <Input type="number" step="0.5" value={form.data.payroll_etf_employer_rate} onChange={(e) => form.setData('payroll_etf_employer_rate', parseFloat(e.target.value))} />
                                    <span className="text-muted-foreground absolute right-3 top-2.5 text-sm">%</span>
                                </div>
                                <p className="text-muted-foreground text-xs">Employer contribution</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="mb-3 text-sm font-semibold">Overtime & Working Days</p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label>Overtime Multiplier</Label>
                                <Input type="number" step="0.25" value={form.data.payroll_overtime_multiplier} onChange={(e) => form.setData('payroll_overtime_multiplier', parseFloat(e.target.value))} />
                                <p className="text-muted-foreground text-xs">1.5 = time and a half</p>
                            </div>
                            <div className="space-y-1">
                                <Label>Working Days Per Week</Label>
                                <Select value={form.data.working_days_per_week.toString()} onValueChange={(v) => form.setData('working_days_per_week', parseInt(v))}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="5">5 days (Mon–Fri)</SelectItem>
                                        <SelectItem value="6">6 days (Mon–Sat)</SelectItem>
                                        <SelectItem value="7">7 days</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="mb-3 text-sm font-semibold">Late Arrival Rules</p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label>Free Late Days / Month</Label>
                                <Input type="number" min={0} value={form.data.payroll_late_threshold_days} onChange={(e) => form.setData('payroll_late_threshold_days', parseInt(e.target.value))} />
                                <p className="text-muted-foreground text-xs">No deduction for first N late days</p>
                            </div>
                            <div className="space-y-1">
                                <Label>Days Deducted per Extra Late Day</Label>
                                <Input type="number" min={0} step="0.5" value={form.data.payroll_late_deduction_days} onChange={(e) => form.setData('payroll_late_deduction_days', parseFloat(e.target.value))} />
                                <p className="text-muted-foreground text-xs">0 = no deduction</p>
                            </div>
                        </div>
                    </div>

                    <Button type="submit" disabled={form.processing}><Save className="mr-2 h-4 w-4" />Save Payroll Settings</Button>
                </form>
            </CardContent>
        </Card>
    );
}

// ── Shifts Panel ──────────────────────────────────────────────────────────────

function ShiftsPanel({ shifts, onAdd, onEdit }: { shifts: Shift[]; onAdd: () => void; onEdit: (s: Shift) => void }) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div><CardTitle>Work Shifts</CardTitle><CardDescription>Define shifts for attendance tracking</CardDescription></div>
                    <Button size="sm" onClick={onAdd}><Plus className="mr-2 h-4 w-4" />Add Shift</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {shifts.map((shift) => (
                        <div key={shift.id} className="flex items-center justify-between rounded-lg border p-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="font-medium">{shift.name}</p>
                                    {shift.is_default && <Badge>Default</Badge>}
                                    {!shift.is_active && <Badge variant="secondary">Inactive</Badge>}
                                </div>
                                <p className="text-muted-foreground text-sm">
                                    {shift.start_time} – {shift.end_time} · Grace {shift.grace_period_minutes}m · Late after {shift.max_late_minutes}m · OT after {shift.overtime_after_hours}h
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => onEdit(shift)}>Edit</Button>
                                <Button size="sm" variant="ghost" className="text-destructive" onClick={() => router.delete(shiftRoutes.destroy(shift.id).url, { onBefore: () => confirm('Delete shift?') })}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    {shifts.length === 0 && <p className="text-muted-foreground py-8 text-center text-sm">No shifts configured</p>}
                </div>
            </CardContent>
        </Card>
    );
}

// ── Leave Types Panel ─────────────────────────────────────────────────────────

function LeaveTypesPanel({ leaveTypes, onAdd, onEdit }: { leaveTypes: LeaveType[]; onAdd: () => void; onEdit: (lt: LeaveType) => void }) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div><CardTitle>Leave Types</CardTitle><CardDescription>Configure available leave types</CardDescription></div>
                    <Button size="sm" onClick={onAdd}><Plus className="mr-2 h-4 w-4" />Add Type</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {leaveTypes.map((lt) => (
                        <div key={lt.id} className="flex items-center justify-between rounded-lg border p-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="font-medium">{lt.name}</p>
                                    <Badge variant="outline">{lt.code}</Badge>
                                    {lt.is_paid && <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>}
                                    {!lt.is_active && <Badge variant="secondary">Inactive</Badge>}
                                </div>
                                <p className="text-muted-foreground text-sm">{lt.days_allowed} days allowed per year</p>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => onEdit(lt)}>Edit</Button>
                                <Button size="sm" variant="ghost" className="text-destructive" onClick={() => router.delete(leaveTypeRoutes.destroy(lt.id).url, { onBefore: () => confirm('Delete leave type?') })}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    {leaveTypes.length === 0 && <p className="text-muted-foreground py-8 text-center text-sm">No leave types configured</p>}
                </div>
            </CardContent>
        </Card>
    );
}

// ── Fingerprint Panel ─────────────────────────────────────────────────────────

function FingerprintPanel({ initial }: { initial: FpSettings }) {
    const form = useForm({ ...initial, fp_auto_sync_enabled: initial.fp_auto_sync_enabled ? 'true' : 'false', fp_auto_process_logs: initial.fp_auto_process_logs ? 'true' : 'false' });
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(settingsRoutes.fingerprint().url);
    };
    return (
        <Card>
            <CardHeader><CardTitle>Fingerprint Settings</CardTitle><CardDescription>Automatic sync and log processing settings</CardDescription></CardHeader>
            <CardContent>
                <form onSubmit={submit} className="space-y-6">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <p className="font-medium">Auto Sync Enabled</p>
                            <p className="text-muted-foreground text-sm">Automatically sync all active devices on schedule</p>
                        </div>
                        <Switch
                            checked={form.data.fp_auto_sync_enabled === 'true'}
                            onCheckedChange={(c) => form.setData('fp_auto_sync_enabled', c ? 'true' : 'false')}
                        />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <p className="font-medium">Auto Process Logs</p>
                            <p className="text-muted-foreground text-sm">Automatically convert device logs to attendance records</p>
                        </div>
                        <Switch
                            checked={form.data.fp_auto_process_logs === 'true'}
                            onCheckedChange={(c) => form.setData('fp_auto_process_logs', c ? 'true' : 'false')}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Sync Interval (minutes)</Label>
                        <Input type="number" min={5} value={form.data.fp_sync_interval} onChange={(e) => form.setData('fp_sync_interval', parseInt(e.target.value))} className="w-40" />
                    </div>
                    <Button type="submit" disabled={form.processing}><Save className="mr-2 h-4 w-4" />Save Fingerprint Settings</Button>
                </form>
            </CardContent>
        </Card>
    );
}

// ── Dialogs ───────────────────────────────────────────────────────────────────

function ShiftDialog({ open, shift, onClose }: { open: boolean; shift?: Shift; onClose: () => void }) {
    const form = useForm({
        name: shift?.name ?? '',
        start_time: shift?.start_time ?? '08:00',
        end_time: shift?.end_time ?? '17:00',
        max_late_minutes: shift?.max_late_minutes ?? 30,
        grace_period_minutes: shift?.grace_period_minutes ?? 5,
        overtime_after_hours: shift?.overtime_after_hours ?? 8,
        is_default: shift?.is_default ?? false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (shift) {
            form.put(shiftRoutes.update(shift.id).url, { onSuccess: onClose });
        } else {
            form.post(shiftRoutes.store().url, { onSuccess: onClose });
        }
    };

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent>
                <DialogHeader><DialogTitle>{shift ? 'Edit Shift' : 'New Shift'}</DialogTitle></DialogHeader>
                <form onSubmit={submit} className="space-y-4">
                    <Field label="Shift Name" value={form.data.name} onChange={(v) => form.setData('name', v)} required />
                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Start Time" type="time" value={form.data.start_time} onChange={(v) => form.setData('start_time', v)} />
                        <Field label="End Time" type="time" value={form.data.end_time} onChange={(v) => form.setData('end_time', v)} />
                        <div className="space-y-1">
                            <Label>Max Late (min)</Label>
                            <Input type="number" value={form.data.max_late_minutes} onChange={(e) => form.setData('max_late_minutes', parseInt(e.target.value))} />
                        </div>
                        <div className="space-y-1">
                            <Label>Grace Period (min)</Label>
                            <Input type="number" value={form.data.grace_period_minutes} onChange={(e) => form.setData('grace_period_minutes', parseInt(e.target.value))} />
                        </div>
                        <div className="space-y-1">
                            <Label>OT After (hours)</Label>
                            <Input type="number" step="0.5" value={form.data.overtime_after_hours} onChange={(e) => form.setData('overtime_after_hours', parseFloat(e.target.value))} />
                        </div>
                        <div className="flex items-center gap-2 pt-6">
                            <Switch checked={form.data.is_default} onCheckedChange={(c) => form.setData('is_default', c)} />
                            <Label>Set as default</Label>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={form.processing}>{shift ? 'Update' : 'Create'}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function LeaveTypeDialog({ open, lt, onClose }: { open: boolean; lt?: LeaveType; onClose: () => void }) {
    const form = useForm({
        name: lt?.name ?? '',
        code: lt?.code ?? '',
        days_allowed: lt?.days_allowed ?? 14,
        is_paid: lt?.is_paid ?? true,
        description: lt?.description ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (lt) {
            form.put(leaveTypeRoutes.update(lt.id).url, { onSuccess: onClose });
        } else {
            form.post(leaveTypeRoutes.store().url, { onSuccess: onClose });
        }
    };

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent>
                <DialogHeader><DialogTitle>{lt ? 'Edit Leave Type' : 'New Leave Type'}</DialogTitle></DialogHeader>
                <form onSubmit={submit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Name" value={form.data.name} onChange={(v) => form.setData('name', v)} required />
                        <Field label="Code" value={form.data.code} onChange={(v) => form.setData('code', v.toUpperCase())} required placeholder="e.g. AL" disabled={!!lt} />
                        <div className="space-y-1">
                            <Label>Days Allowed / Year</Label>
                            <Input type="number" min={1} value={form.data.days_allowed} onChange={(e) => form.setData('days_allowed', parseInt(e.target.value))} />
                        </div>
                        <div className="flex items-center gap-2 pt-6">
                            <Switch checked={form.data.is_paid} onCheckedChange={(c) => form.setData('is_paid', c)} />
                            <Label>Paid Leave</Label>
                        </div>
                        <div className="col-span-2 space-y-1">
                            <Label>Description</Label>
                            <Input value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={form.processing}>{lt ? 'Update' : 'Create'}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

// ── PAYE Tax Panel ────────────────────────────────────────────────────────────

function PayeTaxPanel({ brackets: initial }: { brackets: PayeBracket[] }) {
    const [brackets, setBrackets] = useState<PayeBracket[]>(initial.map(b => ({ ...b })));
    const [saving, setSaving] = useState(false);

    const updateBracket = (i: number, field: keyof PayeBracket, val: string) => {
        setBrackets(prev => prev.map((b, idx) => idx === i ? { ...b, [field]: val === '' ? null : parseFloat(val) } : b));
    };

    const addBracket = () => {
        const last = brackets[brackets.length - 1];
        setBrackets(prev => [...prev, { from: last?.to ?? 0, to: null, rate: 0 }]);
    };

    const removeBracket = (i: number) => setBrackets(prev => prev.filter((_, idx) => idx !== i));

    const save = () => {
        setSaving(true);
        router.post(settingsRoutes.paye().url, { brackets } as never, {
            preserveScroll: true,
            onFinish: () => setSaving(false),
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>PAYE Tax Brackets</CardTitle>
                <CardDescription>
                    Sri Lanka PAYE income tax brackets applied to monthly taxable income. The last bracket should have no upper limit.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="pb-2 pr-4 text-left font-medium">From (LKR / mo)</th>
                                <th className="pb-2 pr-4 text-left font-medium">To (LKR / mo)</th>
                                <th className="pb-2 pr-4 text-left font-medium">Rate (%)</th>
                                <th className="pb-2 text-left font-medium"></th>
                            </tr>
                        </thead>
                        <tbody className="space-y-2">
                            {brackets.map((b, i) => (
                                <tr key={i} className="border-b last:border-0">
                                    <td className="py-2 pr-4">
                                        <Input
                                            type="number"
                                            min={0}
                                            value={b.from}
                                            onChange={(e) => updateBracket(i, 'from', e.target.value)}
                                            className="w-36"
                                        />
                                    </td>
                                    <td className="py-2 pr-4">
                                        <Input
                                            type="number"
                                            min={0}
                                            value={b.to ?? ''}
                                            placeholder="No limit"
                                            onChange={(e) => updateBracket(i, 'to', e.target.value)}
                                            className="w-36"
                                        />
                                    </td>
                                    <td className="py-2 pr-4">
                                        <div className="relative w-28">
                                            <Input
                                                type="number"
                                                min={0}
                                                max={100}
                                                step={0.5}
                                                value={b.rate}
                                                onChange={(e) => updateBracket(i, 'rate', e.target.value)}
                                            />
                                            <span className="text-muted-foreground absolute right-3 top-2.5">%</span>
                                        </div>
                                    </td>
                                    <td className="py-2">
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="ghost"
                                            className="text-destructive"
                                            onClick={() => removeBracket(i)}
                                            disabled={brackets.length === 1}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center gap-3">
                    <Button type="button" variant="outline" size="sm" onClick={addBracket}>
                        <Plus className="mr-2 h-4 w-4" /> Add Bracket
                    </Button>
                    <Button onClick={save} disabled={saving}>
                        <Save className="mr-2 h-4 w-4" /> Save PAYE Brackets
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

// ── Allowances Panel ──────────────────────────────────────────────────────────

const ALLOWANCE_TYPES: { value: string; label: string }[] = [
    { value: 'transport_allowance', label: 'Transport Allowance' },
    { value: 'meal_allowance', label: 'Meal Allowance' },
    { value: 'housing_allowance', label: 'Housing Allowance' },
    { value: 'medical_allowance', label: 'Medical Allowance' },
    { value: 'other_allowance', label: 'Other Allowance' },
];

function formatType(t: string) {
    return ALLOWANCE_TYPES.find(a => a.value === t)?.label ?? t.replace(/_/g, ' ');
}

function AllowancesPanel({ allowances }: { allowances: AllowanceComponent[] }) {
    const form = useForm({
        component_type: 'transport_allowance',
        name: '',
        amount: '',
        is_percentage: false,
        percentage: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(allowanceSettingsRoutes.store().url, { preserveScroll: true, onSuccess: () => form.reset() });
    };

    return (
        <div className="space-y-6">
            {/* Existing allowance types */}
            <Card>
                <CardHeader>
                    <CardTitle>Allowance Types</CardTitle>
                    <CardDescription>Global allowance types available to assign to employees. These are used in payroll calculations.</CardDescription>
                </CardHeader>
                <CardContent>
                    {allowances.length === 0 ? (
                        <p className="text-muted-foreground py-6 text-center text-sm">No allowance types configured yet</p>
                    ) : (
                        <div className="space-y-2">
                            {allowances.map((a) => (
                                <div key={a.id} className="flex items-center justify-between rounded-lg border p-3">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <p className="font-medium">{a.name}</p>
                                        </div>
                                        <Badge variant="outline">{formatType(a.component_type)}</Badge>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="text-sm font-semibold">
                                            {a.is_percentage
                                                ? `${a.percentage}% of basic`
                                                : `LKR ${Number(a.amount).toLocaleString()}`}
                                        </p>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-destructive"
                                            onClick={() => router.delete(allowanceSettingsRoutes.destroy(a.id).url, {
                                                preserveScroll: true,
                                                onBefore: () => confirm(`Remove "${a.name}"?`),
                                            })}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Add allowance type form */}
            <Card>
                <CardHeader>
                    <CardTitle>Add Allowance Type</CardTitle>
                    <CardDescription>Create a new allowance type. You can then assign it to employees when creating or editing their profile.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label>Allowance Type</Label>
                                <Select value={form.data.component_type} onValueChange={(v) => form.setData('component_type', v)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {ALLOWANCE_TYPES.map((t) => (
                                            <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1">
                                <Label>Display Name</Label>
                                <Input value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} placeholder="e.g. Transport Allowance" required />
                                {form.errors.name && <p className="text-destructive text-xs">{form.errors.name}</p>}
                            </div>
                            <div className="space-y-1">
                                <Label>Value Type</Label>
                                <div className="flex items-center gap-3 pt-2">
                                    <Switch
                                        checked={form.data.is_percentage}
                                        onCheckedChange={(c) => form.setData('is_percentage', c)}
                                    />
                                    <span className="text-sm">{form.data.is_percentage ? 'Percentage of basic salary' : 'Fixed amount (LKR)'}</span>
                                </div>
                            </div>
                            {form.data.is_percentage ? (
                                <div className="space-y-1">
                                    <Label>Percentage (%)</Label>
                                    <div className="relative">
                                        <Input
                                            type="number"
                                            min={0}
                                            max={100}
                                            step={0.5}
                                            value={form.data.percentage}
                                            onChange={(e) => form.setData('percentage', e.target.value)}
                                            required
                                        />
                                        <span className="text-muted-foreground absolute right-3 top-2.5 text-sm">%</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    <Label>Amount (LKR)</Label>
                                    <Input
                                        type="number"
                                        min={0}
                                        step={0.01}
                                        value={form.data.amount}
                                        onChange={(e) => form.setData('amount', e.target.value)}
                                        required
                                    />
                                </div>
                            )}
                        </div>
                        <Button type="submit" disabled={form.processing}>
                            <Plus className="mr-2 h-4 w-4" /> Add Allowance Type
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

// ── Shared Field ──────────────────────────────────────────────────────────────

function Field({ label, value, onChange, type = 'text', required, placeholder, disabled }: {
    label: string; value: string; onChange: (v: string) => void;
    type?: string; required?: boolean; placeholder?: string; disabled?: boolean;
}) {
    return (
        <div className="space-y-1">
            <Label>{label}</Label>
            <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} placeholder={placeholder} disabled={disabled} />
        </div>
    );
}
