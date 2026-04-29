import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import InputError from '@/components/input-error';
import * as payrollRoutes from '@/routes/admin/payroll';
import type { Employee, Payroll, PaginatedData } from '@/types';

interface Props {
    payrolls: PaginatedData<Payroll>;
    filters: Record<string, string>;
    employees?: Employee[];
}

const statusColors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700',
    processed: 'bg-blue-100 text-blue-800',
    paid: 'bg-emerald-100 text-emerald-800',
};

const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fmt = (n: number | string | undefined) => `LKR ${Number(n ?? 0).toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

function GenerateForm({ onSuccess }: { onSuccess?: () => void }) {
    const { data, setData, post, processing, errors } = useForm({
        month: String(currentMonth),
        year: String(currentYear),
    });

    return (
        <div className="grid grid-cols-3 gap-3">
            <div>
                <Label>Month</Label>
                <Select value={data.month} onValueChange={(v) => setData('month', v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {monthNames.slice(1).map((m, i) => (
                            <SelectItem key={i + 1} value={String(i + 1)}>{m}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={errors.month} />
            </div>
            <div>
                <Label>Year</Label>
                <Input type="number" value={data.year} onChange={(e) => setData('year', e.target.value)} min={2020} max={2099} />
                <InputError message={errors.year} />
            </div>
            <div className="flex items-end">
                <Button
                    className="w-full"
                    disabled={processing}
                    onClick={() => post(payrollRoutes.generateBulk().url, { onSuccess })}
                >
                    {processing ? 'Generating…' : 'Generate All'}
                </Button>
            </div>
        </div>
    );
}

export default function AdminPayroll({ payrolls: data }: Props) {
    const [bulkOpen, setBulkOpen] = useState(false);

    return (
        <>
            <Head title="Payroll" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Payroll Management</h1>
                        <p className="text-muted-foreground text-sm">{data.total} payroll records</p>
                    </div>
                    <Dialog open={bulkOpen} onOpenChange={setBulkOpen}>
                        <DialogTrigger asChild>
                            <Button>Generate Bulk Payroll</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Generate Bulk Payroll</DialogTitle>
                            </DialogHeader>
                            <p className="text-muted-foreground text-sm mb-3">
                                Generates payroll for all active employees with EPF/ETF/PAYE calculations.
                            </p>
                            <GenerateForm onSuccess={() => setBulkOpen(false)} />
                        </DialogContent>
                    </Dialog>
                </div>

                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="border-b bg-muted/40">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-medium">Employee</th>
                                        <th className="px-4 py-3 text-left font-medium">Period</th>
                                        <th className="px-4 py-3 text-right font-medium">Gross</th>
                                        <th className="px-4 py-3 text-right font-medium">EPF (8%)</th>
                                        <th className="px-4 py-3 text-right font-medium">Deductions</th>
                                        <th className="px-4 py-3 text-right font-medium">Net</th>
                                        <th className="px-4 py-3 text-left font-medium">Status</th>
                                        <th className="px-4 py-3 text-left font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.data.map((p) => (
                                        <tr key={p.id} className="border-b last:border-0 hover:bg-muted/20">
                                            <td className="px-4 py-3 font-medium">{p.employee?.user?.name}</td>
                                            <td className="px-4 py-3 text-muted-foreground">{monthNames[p.month]} {p.year}</td>
                                            <td className="px-4 py-3 text-right">{fmt(p.gross_salary ?? p.base_salary)}</td>
                                            <td className="px-4 py-3 text-right text-red-600">{fmt(p.epf_employee)}</td>
                                            <td className="px-4 py-3 text-right text-red-600">
                                                {fmt(Number(p.deductions ?? 0) + Number(p.tax ?? 0) + Number(p.no_pay_deduction ?? 0) + Number(p.late_deduction ?? 0))}
                                            </td>
                                            <td className="px-4 py-3 text-right font-bold text-emerald-700">{fmt(p.net_salary)}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusColors[p.status] ?? ''}`}>
                                                    {p.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => router.visit(payrollRoutes.show({ payroll: p.id }).url)}
                                                    >
                                                        View
                                                    </Button>
                                                    {p.status === 'processed' && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="text-emerald-600"
                                                            onClick={() => router.post(payrollRoutes.markPaid({ payroll: p.id }).url)}
                                                        >
                                                            Mark Paid
                                                        </Button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {data.data.length === 0 && (
                                        <tr>
                                            <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                                                No payroll records. Use "Generate Bulk Payroll" to create payroll for all employees.
                                            </td>
                                        </tr>
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
