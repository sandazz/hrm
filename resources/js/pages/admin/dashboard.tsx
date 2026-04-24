import { Head } from '@inertiajs/react';
import { Building2, CalendarClock, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { AdminStats, Attendance } from '@/types';

interface Props {
    stats: AdminStats;
    recentAttendance: Attendance[];
    chart: Record<string, number>;
}

const statusColors: Record<string, string> = {
    present: 'bg-emerald-100 text-emerald-800',
    absent: 'bg-red-100 text-red-800',
    late: 'bg-yellow-100 text-yellow-800',
    half_day: 'bg-orange-100 text-orange-800',
    on_leave: 'bg-blue-100 text-blue-800',
    holiday: 'bg-purple-100 text-purple-800',
};

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatAttendanceDate = (attendance: Attendance) => {
    const datePart = attendance.date.split('T')[0].split(' ')[0];
    const [year, month, day] = datePart.split('-');

    const validDate = year && month && day && Number(month) >= 1 && Number(month) <= 12;
    const formattedDate = validDate
        ? `${MONTH_NAMES[Number(month) - 1]} ${Number(day)}, ${year}`
        : attendance.date;

    const formatTime = (time?: string) => {
        if (!time) {
            return null;
        }

        const [hour = '0', minute = '00'] = time.split(':');
        const hourNumber = Number(hour);
        if (Number.isNaN(hourNumber)) {
            return time;
        }

        const period = hourNumber >= 12 ? 'PM' : 'AM';
        const hour12 = ((hourNumber + 11) % 12) + 1;
        return `${hour12.toString().padStart(2, '0')}:${minute.padStart(2, '0')} ${period}`;
    };

    const formattedCheckIn = formatTime(attendance.check_in);
    const formattedCheckOut = formatTime(attendance.check_out);

    if (formattedCheckIn && formattedCheckOut) {
        return `${formattedDate} · ${formattedCheckIn} - ${formattedCheckOut}`;
    }

    if (formattedCheckIn) {
        return `${formattedDate} · ${formattedCheckIn}`;
    }

    return formattedDate;
};

export default function AdminDashboard({ stats, recentAttendance, chart }: Props) {
    const statCards = [
        { label: 'Total Employees', value: stats.total_employees, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Departments', value: stats.total_departments, icon: Building2, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Present Today', value: stats.today_present, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Pending Leaves', value: stats.pending_leaves, icon: CalendarClock, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="flex flex-col gap-6 p-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
                    <p className="text-muted-foreground text-sm">Overview of your organization</p>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {statCards.map((card) => (
                        <Card key={card.label}>
                            <CardContent className="flex items-center gap-4 p-6">
                                <div className={`rounded-lg p-3 ${card.bg}`}>
                                    <card.icon className={`h-6 w-6 ${card.color}`} />
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">{card.label}</p>
                                    <p className="text-2xl font-bold">{card.value}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Monthly Attendance Chart Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle>This Month's Attendance</CardTitle>
                            <CardDescription>Breakdown by status</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {Object.entries(chart).map(([status, count]) => (
                                <div key={status} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusColors[status] ?? 'bg-gray-100 text-gray-800'}`}>
                                            {status.replace('_', ' ')}
                                        </span>
                                    </div>
                                    <span className="font-semibold">{count}</span>
                                </div>
                            ))}
                            {Object.keys(chart).length === 0 && (
                                <p className="text-muted-foreground text-sm">No attendance records this month.</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recent Attendance */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Attendance</CardTitle>
                            <CardDescription>Latest check-ins</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recentAttendance.map((att) => (
                                    <div key={att.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                                        <div>
                                            <p className="font-medium text-sm">{att.employee?.user?.name ?? '—'}</p>
                                            <p className="text-muted-foreground text-xs">{formatAttendanceDate(att)}</p>
                                        </div>
                                        <Badge className={`text-xs ${statusColors[att.status] ?? ''}`} variant="outline">
                                            {att.status.replace('_', ' ')}
                                        </Badge>
                                    </div>
                                ))}
                                {recentAttendance.length === 0 && (
                                    <p className="text-muted-foreground text-sm">No attendance records yet.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Extra Stats Row */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-muted-foreground text-sm">New Hires This Month</p>
                            <p className="mt-1 text-3xl font-bold">{stats.new_employees_month}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-muted-foreground text-sm">Absent Today</p>
                            <p className="mt-1 text-3xl font-bold text-red-600">{stats.today_absent}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-muted-foreground text-sm">Monthly Payroll Total</p>
                            <p className="mt-1 text-3xl font-bold">
                                ${Number(stats.total_payroll_month).toLocaleString()}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
