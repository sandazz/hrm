import { Head, router } from '@inertiajs/react';
import { CalendarClock, Clock, CreditCard, LogIn, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import * as empRoutes from '@/routes/employee';
import type { Attendance, Employee, EmployeeStats } from '@/types';

interface Props {
    stats: EmployeeStats;
    employee: Employee | null;
    todayAttendance: Attendance | null;
}

export default function EmployeeDashboard({ stats, employee, todayAttendance }: Props) {
    const canCheckIn = !todayAttendance || !todayAttendance.check_in;
    const canCheckOut = todayAttendance?.check_in && !todayAttendance?.check_out;

    const statCards = [
        { label: 'Present Days (Month)', value: stats.present_days_month, icon: CalendarClock, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Leave Days (Month)', value: stats.leave_days_month, icon: CalendarClock, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Pending Leaves', value: stats.pending_leaves, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
        { label: 'Net Salary', value: `LKR ${Number(stats.net_salary).toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, icon: CreditCard, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    return (
        <>
            <Head title="My Dashboard" />
            <div className="flex flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold">Welcome back! 👋</h1>
                    {employee && (
                        <p className="text-muted-foreground text-sm">
                            {employee.employee_id} · {employee.job_title} · {employee.department?.name ?? 'No Department'}
                        </p>
                    )}
                </div>

                {/* Check In / Out */}
                {employee && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Today's Attendance</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center gap-4">
                            <div className="flex-1 space-y-1 text-sm">
                                <div className="flex gap-4">
                                    <span className="text-muted-foreground">Check In:</span>
                                    <span className="font-medium">{todayAttendance?.check_in ?? '—'}</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-muted-foreground">Check Out:</span>
                                    <span className="font-medium">{todayAttendance?.check_out ?? '—'}</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-muted-foreground">Hours:</span>
                                    <span className="font-medium">{todayAttendance?.work_hours ?? 0}h</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {canCheckIn && (
                                    <Button onClick={() => router.post(empRoutes.checkIn().url)} className="gap-2">
                                        <LogIn className="h-4 w-4" /> Check In
                                    </Button>
                                )}
                                {canCheckOut && (
                                    <Button variant="outline" onClick={() => router.post(empRoutes.checkOut().url)} className="gap-2">
                                        <LogOut className="h-4 w-4" /> Check Out
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Stats */}
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
            </div>
        </>
    );
}
