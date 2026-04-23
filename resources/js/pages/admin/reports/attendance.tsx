import { Head, router } from '@inertiajs/react';
import { AlertCircle, BarChart3, CheckCircle, ChevronDown, Clock, Download, Users } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import * as reportsRoutes from '@/routes/admin/reports';

interface AttendanceRow {
    employee_id: string;
    name: string;
    department: string;
    working_days: number;
    present_days: number;
    absent_days: number;
    late_days: number;
    leave_days: number;
    overtime_hours: number;
    total_work_hours: number;
}

interface Department {
    id: number;
    name: string;
}

interface Report {
    month: number;
    year: number;
    working_days: number;
    summary: AttendanceRow[];
    totals: { present_days: number; absent_days: number; late_days: number; overtime_hours: number };
}

interface Props {
    report: Report;
    departments: Department[];
    filters: { month: number; year: number; departmentId?: number };
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function AttendanceReport({ report, departments, filters }: Props) {
    const [month, setMonth] = useState(filters.month.toString());
    const [year, setYear] = useState(filters.year.toString());
    const [dept, setDept] = useState(filters.departmentId?.toString() ?? 'all');

    const applyFilter = () => {
        router.get(reportsRoutes.attendance().url, { month, year, department_id: dept === 'all' ? undefined : dept });
    };

    const exportReport = () => {
        const params = new URLSearchParams({
            month,
            year,
            format: 'csv',
        });

        if (dept !== 'all') {
            params.set('department_id', dept);
        }

        window.location.href = `${reportsRoutes.attendance().url}?${params.toString()}`;
    };

    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

    return (
        <>
            <Head title="Attendance Report" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Attendance Report</h1>
                        <p className="text-muted-foreground text-sm">Monthly attendance summary for all employees</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={exportReport}>
                        <Download className="mr-2 h-4 w-4" />
                        Export Excel
                    </Button>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="flex flex-wrap gap-4 pt-4">
                        <Select value={month} onValueChange={setMonth}>
                            <SelectTrigger className="w-36">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {MONTHS.map((m, i) => (
                                    <SelectItem key={i} value={(i + 1).toString()}>{m}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={year} onValueChange={setYear}>
                            <SelectTrigger className="w-28">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {years.map((y) => (
                                    <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={dept} onValueChange={setDept}>
                            <SelectTrigger className="w-44">
                                <SelectValue placeholder="All Departments" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Departments</SelectItem>
                                {departments.map((d) => (
                                    <SelectItem key={d.id} value={d.id.toString()}>{d.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button onClick={applyFilter}>Apply</Button>
                    </CardContent>
                </Card>

                {/* Totals */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {[
                        { label: 'Total Present', value: report.totals.present_days, icon: <CheckCircle className="h-5 w-5 text-green-500" /> },
                        { label: 'Total Absent', value: report.totals.absent_days, icon: <AlertCircle className="h-5 w-5 text-red-500" /> },
                        { label: 'Late Arrivals', value: report.totals.late_days, icon: <Clock className="h-5 w-5 text-orange-500" /> },
                        { label: 'Overtime Hrs', value: report.totals.overtime_hours, icon: <BarChart3 className="h-5 w-5 text-blue-500" /> },
                    ].map((s) => (
                        <Card key={s.label}>
                            <CardContent className="pt-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-muted-foreground text-xs">{s.label}</p>
                                        <p className="text-2xl font-bold">{s.value}</p>
                                    </div>
                                    {s.icon}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>{MONTHS[report.month - 1]} {report.year} — Attendance Summary</CardTitle>
                        <CardDescription>Working days this month: {report.working_days}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        {['Emp ID', 'Name', 'Department', 'Present', 'Absent', 'Late', 'Leave', 'OT Hrs', 'Work Hrs'].map((h) => (
                                            <th key={h} className="text-muted-foreground py-2 text-left font-medium">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {report.summary.map((row, i) => {
                                        const attendanceRate = report.working_days > 0 ? (row.present_days / report.working_days) * 100 : 0;
                                        return (
                                            <tr key={i} className="border-b last:border-0 hover:bg-muted/30">
                                                <td className="py-2 font-mono text-xs">{row.employee_id}</td>
                                                <td className="py-2 font-medium">{row.name}</td>
                                                <td className="py-2">
                                                    <Badge variant="outline">{row.department}</Badge>
                                                </td>
                                                <td className="py-2">
                                                    <span className={row.present_days < report.working_days * 0.8 ? 'text-red-600' : 'text-green-600'}>
                                                        {row.present_days}
                                                    </span>
                                                    <span className="text-muted-foreground text-xs"> ({attendanceRate.toFixed(0)}%)</span>
                                                </td>
                                                <td className="py-2">{row.absent_days > 0 ? <span className="text-red-600">{row.absent_days}</span> : <span className="text-muted-foreground">0</span>}</td>
                                                <td className="py-2">{row.late_days > 0 ? <span className="text-orange-600">{row.late_days}</span> : <span className="text-muted-foreground">0</span>}</td>
                                                <td className="py-2">{row.leave_days}</td>
                                                <td className="py-2">{row.overtime_hours > 0 ? <span className="text-blue-600">{row.overtime_hours}</span> : <span className="text-muted-foreground">0</span>}</td>
                                                <td className="py-2">{row.total_work_hours.toFixed(1)}</td>
                                            </tr>
                                        );
                                    })}
                                    {report.summary.length === 0 && (
                                        <tr>
                                            <td colSpan={9} className="text-muted-foreground py-8 text-center">No data for selected period</td>
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
