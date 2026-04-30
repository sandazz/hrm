import { Head, router } from '@inertiajs/react';
import { ArrowLeft, Download, Printer } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import HrmLayout from '@/layouts/hrm-layout';
import * as payrollRoutes from '@/routes/admin/payroll';

interface AllowanceBreakdownItem {
    name: string;
    component_type: string;
    amount: number;
    is_percentage: boolean;
    percentage: number | null;
}

interface Payroll {
    id: number;
    month: number;
    year: number;
    base_salary: number;
    gross_salary: number;
    overtime_pay: number;
    bonus: number;
    allowances: number;
    allowances_breakdown?: AllowanceBreakdownItem[];
    deductions: number;
    no_pay_deduction: number;
    late_deduction: number;
    epf_employee: number;
    epf_employer: number;
    etf_employer: number;
    tax: number;
    net_salary: number;
    working_days: number;
    present_days: number;
    leave_days: number;
    overtime_hours: number;
    late_days: number;
    no_pay_days: number;
    status: string;
    paid_at?: string;
    notes?: string;
    employee?: {
        employee_id: string;
        job_title: string;
        user?: { name: string; email: string };
        department?: { name: string };
    };
    processor?: { name: string };
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const fmt = (n: number) => `LKR ${n.toLocaleString('en-LK', { minimumFractionDigits: 2 })}`;

export default function PayrollShow({ payroll }: { payroll: Payroll }) {
    const emp = payroll.employee;

    const allowanceRows: { label: string; amount: number }[] =
        payroll.allowances_breakdown && payroll.allowances_breakdown.length > 0
            ? payroll.allowances_breakdown.map((a) => ({
                label: a.is_percentage ? `${a.name} (${a.percentage}%)` : a.name,
                amount: a.amount,
            }))
            : payroll.allowances > 0
                ? [{ label: 'Allowances', amount: payroll.allowances }]
                : [];

    const earningsRows = [
        { label: 'Basic Salary', amount: payroll.base_salary },
        ...allowanceRows,
        ...(payroll.overtime_pay > 0 ? [{ label: `Overtime Pay (${payroll.overtime_hours} hrs)`, amount: payroll.overtime_pay }] : []),
        ...(payroll.bonus > 0 ? [{ label: 'Bonus', amount: payroll.bonus }] : []),
    ];

    const deductionRows = [
        { label: 'EPF (Employee 8%)', amount: payroll.epf_employee },
        ...(payroll.no_pay_deduction > 0 ? [{ label: `No-Pay (${payroll.no_pay_days} days)`, amount: payroll.no_pay_deduction }] : []),
        ...(payroll.late_deduction > 0 ? [{ label: 'Late Deduction', amount: payroll.late_deduction }] : []),
        ...(payroll.deductions > 0 ? [{ label: 'Other Deductions', amount: payroll.deductions }] : []),
        { label: 'PAYE Tax', amount: payroll.tax },
    ];

    const employerContribs = [
        { label: 'EPF Employer (12%)', amount: payroll.epf_employer },
        { label: 'ETF Employer (3%)', amount: payroll.etf_employer },
    ];

    const printStyles = '@media print { body * { visibility: hidden !important; } .payslip-printable, .payslip-printable * { visibility: visible !important; } .payslip-printable { position: absolute; top: 0; left: 0; width: 100%; } }';

    return (
        <>
            <Head title={`Payslip — ${emp?.user?.name ?? ''} ${MONTHS[payroll.month - 1]} ${payroll.year}`} />
            <style>{printStyles}</style>
            <div className="space-y-4 p-6">
                <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" onClick={() => router.visit(payrollRoutes.index().url)}>
                        <ArrowLeft className="mr-2 h-4 w-4" />Back to Payroll
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => window.print()}>
                            <Printer className="mr-2 h-4 w-4" />Print
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.location.href = `/admin/payroll/${payroll.id}/download`}
                        >
                            <Download className="mr-2 h-4 w-4" />Download PDF
                        </Button>
                        {payroll.status === 'processed' && (
                            <Button size="sm" onClick={() => router.post(payrollRoutes.markPaid(payroll.id).url)}>
                                Mark as Paid
                            </Button>
                        )}
                    </div>
                </div>

                <div className="payslip-printable">
                    <Card className="mx-auto max-w-3xl print:shadow-none">
                        <CardHeader className="border-b">
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-xl">PAYSLIP</CardTitle>
                                    <p className="text-muted-foreground text-sm">
                                        {MONTHS[payroll.month - 1]} {payroll.year}
                                    </p>
                                </div>
                                <Badge
                                    variant={
                                        payroll.status === 'paid'
                                            ? 'default'
                                            : payroll.status === 'processed'
                                                ? 'secondary'
                                                : 'outline'
                                    }
                                    className="text-sm"
                                >
                                    {payroll.status.toUpperCase()}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted/30 p-4 text-sm">
                                <div>
                                    <p className="text-muted-foreground text-xs">Employee</p>
                                    <p className="font-semibold">{emp?.user?.name ?? '—'}</p>
                                    <p className="text-muted-foreground">{emp?.employee_id}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs">Department / Role</p>
                                    <p className="font-semibold">{emp?.department?.name ?? '—'}</p>
                                    <p className="text-muted-foreground">{emp?.job_title}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs">Attendance</p>
                                    <p>{payroll.present_days} / {payroll.working_days} days present</p>
                                    {payroll.late_days > 0 && (
                                        <p className="text-orange-600 text-xs">{payroll.late_days} late days</p>
                                    )}
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs">Period</p>
                                    <p>{MONTHS[payroll.month - 1]} {payroll.year}</p>
                                    {payroll.paid_at && (
                                        <p className="text-xs text-green-600">Paid: {new Date(payroll.paid_at).toLocaleDateString()}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="mb-3 font-semibold text-green-700">Earnings</p>
                                    <div className="space-y-2">
                                        {earningsRows.map((r, i) => (
                                            <div key={i} className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">{r.label}</span>
                                                <span>{fmt(Number(r.amount))}</span>
                                            </div>
                                        ))}
                                        <Separator />
                                        <div className="flex justify-between font-semibold">
                                            <span>Gross Salary</span>
                                            <span>{fmt(Number(payroll.gross_salary))}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="mb-3 font-semibold text-red-700">Deductions</p>
                                    <div className="space-y-2">
                                        {deductionRows.map((r, i) => (
                                            <div key={i} className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">{r.label}</span>
                                                <span className="text-red-600">({fmt(Number(r.amount))})</span>
                                            </div>
                                        ))}
                                        <Separator />
                                        <div className="flex justify-between font-semibold">
                                            <span>Total Deductions</span>
                                            <span className="text-red-600">({fmt(deductionRows.reduce((s, r) => s + Number(r.amount), 0))})</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg bg-primary/10 p-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold">NET SALARY</span>
                                    <span className="text-2xl font-bold text-primary">{fmt(Number(payroll.net_salary))}</span>
                                </div>
                            </div>

                            <div className="rounded-lg border p-4 text-sm">
                                <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Employer Contributions (not deducted from salary)</p>
                                <div className="flex gap-8">
                                    {employerContribs.map((r, i) => (
                                        <div key={i}>
                                            <p className="text-muted-foreground text-xs">{r.label}</p>
                                            <p className="font-medium">{fmt(Number(r.amount))}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {payroll.notes && (
                                <p className="text-muted-foreground text-sm">Notes: {payroll.notes}</p>
                            )}

                            <div className="text-muted-foreground text-right text-xs">
                                Generated by: {payroll.processor?.name ?? 'System'}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
