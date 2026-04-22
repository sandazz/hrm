import { Head, router } from '@inertiajs/react';
import { Download, TrendingDown, TrendingUp, Users, Wallet } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import HrmLayout from '@/layouts/hrm-layout';
import * as reportsRoutes from '@/routes/admin/reports';

interface PayrollRow {
    employee_id: string;
    name: string;
    department: string;
    base_salary: number;
    gross_salary: number;
    allowances: number;
    overtime_pay: number;
    bonus: number;
    epf_employee: number;
    epf_employer: number;
    etf_employer: number;
    no_pay_deduction: number;
    late_deduction: number;
    tax: number;
    net_salary: number;
    status: string;
}

interface TrendItem {
    label: string;
    month: number;
    year: number;
    total_gross: number;
    total_net: number;
    total_epf: number;
    total_etf: number;
    head_count: number;
}

interface Report {
    month: number;
    year: number;
    payrolls: PayrollRow[];
    totals: { gross_salary: number; net_salary: number; epf_employee: number; epf_employer: number; etf_employer: number; tax: number };
}

interface Props {
    report: Report;
    trend: TrendItem[];
    departments: { id: number; name: string }[];
    filters: { month: number; year: number; departmentId?: number };
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const fmt = (n: number) => `LKR ${n.toLocaleString('en-LK', { minimumFractionDigits: 2 })}`;

export default function PayrollReport({ report, trend, departments, filters }: Props) {
    const [month, setMonth] = useState(filters.month.toString());
    const [year, setYear] = useState(filters.year.toString());
    const [dept, setDept] = useState(filters.departmentId?.toString() ?? '');

    const applyFilter = () => router.get(reportsRoutes.payroll().url, { month, year, department_id: dept || undefined });

    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

    const maxGross = Math.max(...trend.map((t) => t.total_gross), 1);

    return (
        <HrmLayout>
            <Head title="Payroll Report" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Payroll Report</h1>
                        <p className="text-muted-foreground text-sm">Monthly payroll breakdown with EPF/ETF/PAYE</p>
                    </div>
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export Excel
                    </Button>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="flex flex-wrap gap-4 pt-4">
                        <Select value={month} onValueChange={setMonth}>
                            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {MONTHS.map((m, i) => <SelectItem key={i} value={(i + 1).toString()}>{m}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Select value={year} onValueChange={setYear}>
                            <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {years.map((y) => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Select value={dept} onValueChange={setDept}>
                            <SelectTrigger className="w-44"><SelectValue placeholder="All Departments" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Departments</SelectItem>
                                {departments.map((d) => <SelectItem key={d.id} value={d.id.toString()}>{d.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Button onClick={applyFilter}>Apply</Button>
                    </CardContent>
                </Card>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                    {[
                        { label: 'Gross Payroll', value: report.totals.gross_salary, sub: 'Total earnings', icon: <Wallet className="h-5 w-5 text-blue-500" /> },
                        { label: 'Net Payroll', value: report.totals.net_salary, sub: 'Take-home total', icon: <TrendingUp className="h-5 w-5 text-green-500" /> },
                        { label: 'EPF Employee', value: report.totals.epf_employee, sub: '8% contribution', icon: <TrendingDown className="h-5 w-5 text-purple-500" /> },
                        { label: 'EPF Employer', value: report.totals.epf_employer, sub: '12% contribution', icon: <TrendingDown className="h-5 w-5 text-indigo-500" /> },
                        { label: 'ETF Employer', value: report.totals.etf_employer, sub: '3% contribution', icon: <TrendingDown className="h-5 w-5 text-teal-500" /> },
                        { label: 'PAYE Tax', value: report.totals.tax, sub: 'Total tax', icon: <TrendingDown className="h-5 w-5 text-orange-500" /> },
                    ].map((s) => (
                        <Card key={s.label}>
                            <CardContent className="pt-4">
                                <div className="flex items-start justify-between">
                                    <div className="min-w-0">
                                        <p className="text-muted-foreground truncate text-xs">{s.label}</p>
                                        <p className="truncate text-sm font-bold">{fmt(s.value)}</p>
                                        <p className="text-muted-foreground text-xs">{s.sub}</p>
                                    </div>
                                    <div className="shrink-0">{s.icon}</div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Trend Chart (bar) */}
                <Card>
                    <CardHeader>
                        <CardTitle>6-Month Payroll Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex h-32 items-end gap-3">
                            {trend.map((t) => (
                                <div key={t.label} className="flex flex-1 flex-col items-center gap-1">
                                    <span className="text-muted-foreground text-[10px]">{(t.total_net / 1000).toFixed(0)}K</span>
                                    <div
                                        className="w-full rounded-t bg-primary/80"
                                        style={{ height: `${(t.total_net / maxGross) * 100}%`, minHeight: '4px' }}
                                        title={`Net: ${fmt(t.total_net)}`}
                                    />
                                    <span className="text-muted-foreground text-[10px]">{t.label.split(' ')[0]}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Payroll Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>{MONTHS[report.month - 1]} {report.year} — Payroll Details</CardTitle>
                        <CardDescription>{report.payrolls.length} employees</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                                <thead>
                                    <tr className="border-b">
                                        {['Emp ID', 'Name', 'Dept', 'Basic', 'Gross', 'EPF(E)', 'ETF', 'Tax', 'Net', 'Status'].map((h) => (
                                            <th key={h} className="text-muted-foreground py-2 text-right font-medium first:text-left">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {report.payrolls.map((p, i) => (
                                        <tr key={i} className="border-b last:border-0 hover:bg-muted/30">
                                            <td className="py-2 font-mono text-xs">{p.employee_id}</td>
                                            <td className="py-2 font-medium">{p.name}</td>
                                            <td className="py-2"><Badge variant="outline">{p.department}</Badge></td>
                                            <td className="py-2 text-right">{p.base_salary.toLocaleString()}</td>
                                            <td className="py-2 text-right font-medium">{p.gross_salary.toLocaleString()}</td>
                                            <td className="py-2 text-right text-purple-700">{p.epf_employee.toLocaleString()}</td>
                                            <td className="py-2 text-right text-teal-700">{p.etf_employer.toLocaleString()}</td>
                                            <td className="py-2 text-right text-orange-700">{p.tax.toLocaleString()}</td>
                                            <td className="py-2 text-right font-bold text-green-700">{p.net_salary.toLocaleString()}</td>
                                            <td className="py-2 text-right">
                                                <Badge variant={p.status === 'paid' ? 'default' : p.status === 'processed' ? 'secondary' : 'outline'}>
                                                    {p.status}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                    {report.payrolls.length === 0 && (
                                        <tr>
                                            <td colSpan={10} className="text-muted-foreground py-8 text-center">No payrolls for selected period</td>
                                        </tr>
                                    )}
                                </tbody>
                                {report.payrolls.length > 0 && (
                                    <tfoot>
                                        <tr className="border-t-2 font-bold">
                                            <td colSpan={3} className="py-2">Total</td>
                                            <td className="py-2 text-right">{report.totals.gross_salary.toLocaleString()}</td>
                                            <td className="py-2 text-right">{report.totals.gross_salary.toLocaleString()}</td>
                                            <td className="py-2 text-right text-purple-700">{report.totals.epf_employee.toLocaleString()}</td>
                                            <td className="py-2 text-right text-teal-700">{report.totals.etf_employer.toLocaleString()}</td>
                                            <td className="py-2 text-right text-orange-700">{report.totals.tax.toLocaleString()}</td>
                                            <td className="py-2 text-right text-green-700">{report.totals.net_salary.toLocaleString()}</td>
                                            <td />
                                        </tr>
                                    </tfoot>
                                )}
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </HrmLayout>
    );
}
