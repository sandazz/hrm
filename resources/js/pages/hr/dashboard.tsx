import { Head } from '@inertiajs/react';
import { CalendarCheck, CalendarClock, TrendingDown, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { HrStats, Attendance } from '@/types';

interface Props {
    stats: HrStats;
    recentAttendance: Attendance[];
    chart: Record<string, number>;
}

const statusColors: Record<string, string> = {
    present: 'bg-emerald-100 text-emerald-800',
    absent: 'bg-red-100 text-red-800',
    late: 'bg-yellow-100 text-yellow-800',
    half_day: 'bg-orange-100 text-orange-800',
    on_leave: 'bg-blue-100 text-blue-800',
};

const formatRecentAttendanceTime = (attendance: Attendance) => {
    const date = new Date(attendance.date);
    if (Number.isNaN(date.getTime())) {
        return attendance.date;
    }

    const formattedDate = date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    const formattedCheckIn = attendance.check_in
        ? new Date(`${attendance.date}T${attendance.check_in}`).toLocaleTimeString(undefined, {
            hour: 'numeric',
            minute: '2-digit',
        })
        : null;

    const formattedCheckOut = attendance.check_out
        ? new Date(`${attendance.date}T${attendance.check_out}`).toLocaleTimeString(undefined, {
            hour: 'numeric',
            minute: '2-digit',
        })
        : null;

    if (formattedCheckIn && formattedCheckOut) {
        return `${formattedDate} · ${formattedCheckIn} - ${formattedCheckOut}`;
    }

    if (formattedCheckIn) {
        return `${formattedDate} · ${formattedCheckIn}`;
    }

    return formattedDate;
};

export default function HrDashboard({ stats, recentAttendance, chart }: Props) {
    const cards = [
        { label: 'Total Employees', value: stats.total_employees, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Present Today', value: stats.today_present, icon: CalendarCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Absent Today', value: stats.today_absent, icon: TrendingDown, color: 'text-red-600', bg: 'bg-red-50' },
        { label: 'Pending Leaves', value: stats.pending_leaves, icon: CalendarClock, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    return (
        <>
            <Head title="HR Dashboard" />
            <div className="flex flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold">HR Dashboard</h1>
                    <p className="text-muted-foreground text-sm">Manage your workforce</p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {cards.map((card) => (
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
                    <Card>
                        <CardHeader>
                            <CardTitle>Attendance This Month</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {Object.entries(chart).map(([status, count]) => (
                                <div key={status} className="flex items-center justify-between">
                                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusColors[status] ?? 'bg-gray-100 text-gray-800'}`}>
                                        {status.replace('_', ' ')}
                                    </span>
                                    <span className="font-semibold">{count}</span>
                                </div>
                            ))}
                            {Object.keys(chart).length === 0 && <p className="text-muted-foreground text-sm">No data yet.</p>}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Attendance</CardTitle>
                            <CardDescription>Latest check-ins across all employees</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recentAttendance.map((att) => (
                                    <div key={att.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                                        <div>
                                            <p className="font-medium text-sm">{att.employee?.user?.name}</p>
                                            <p className="text-muted-foreground text-xs">{formatRecentAttendanceTime(att)}</p>
                                        </div>
                                        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusColors[att.status] ?? ''}`}>
                                            {att.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                ))}
                                {recentAttendance.length === 0 && <p className="text-muted-foreground text-sm">No records.</p>}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
