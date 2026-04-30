import { Head, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Payroll, PaginatedData } from '@/types';

interface Props {
    payrolls: PaginatedData<Payroll>;
}

const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fmt = (n: number) => `LKR ${Number(n).toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const statusColors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700',
    processed: 'bg-blue-100 text-blue-800',
    paid: 'bg-emerald-100 text-emerald-800',
};

export default function EmployeePayroll({ payrolls: data }: Props) {
    return (
        <>
            <Head title="My Payslips" />
            <div className="flex flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold">My Payslips</h1>
                    <p className="text-muted-foreground text-sm">{data.total} payslips</p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {data.data.map((p) => (
                        <Card key={p.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-base">{monthNames[p.month]} {p.year}</CardTitle>
                                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusColors[p.status] ?? ''}`}>
                                        {p.status}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Base Salary</span>
                                    <span>{fmt(p.base_salary)}</span>
                                </div>
                                {p.allowances_breakdown && p.allowances_breakdown.length > 0 ? (
                                    p.allowances_breakdown.map((a, i) => (
                                        <div key={i} className="flex justify-between">
                                            <span className="text-muted-foreground">
                                                {a.name}{a.is_percentage ? ` (${a.percentage}%)` : ''}
                                            </span>
                                            <span className="text-emerald-600">+{fmt(a.amount)}</span>
                                        </div>
                                    ))
                                ) : Number(p.allowances) > 0 ? (
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Allowances</span>
                                        <span className="text-emerald-600">+{fmt(p.allowances)}</span>
                                    </div>
                                ) : null}
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Deductions</span>
                                    <span className="text-red-600">-{fmt(p.deductions)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Tax</span>
                                    <span className="text-red-600">-{fmt(p.tax)}</span>
                                </div>
                                <div className="flex justify-between border-t pt-2 font-bold">
                                    <span>Net Pay</span>
                                    <span>{fmt(p.net_salary)}</span>
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Present: {p.present_days}/{p.working_days} days</span>
                                    {p.paid_at && <span>Paid {p.paid_at}</span>}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {data.data.length === 0 && (
                        <div className="col-span-full text-center py-12 text-muted-foreground">
                            No payslips available yet.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
