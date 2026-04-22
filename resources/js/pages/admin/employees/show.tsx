import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import * as employeeRoutes from '@/routes/admin/employees';
import type { Attendance, Department, Employee } from '@/types';

interface Props {
    employee: Employee & {
        attendances?: Attendance[];
    };
}

const statusBadge: Record<string, string> = {
    active: 'bg-emerald-100 text-emerald-800',
    on_leave: 'bg-blue-100 text-blue-800',
    terminated: 'bg-red-100 text-red-800',
    probation: 'bg-yellow-100 text-yellow-800',
};

export default function EmployeeShow({ employee }: Props) {
    return (
        <>
            <Head title={`Employee — ${employee.user?.name ?? employee.employee_id}`} />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{employee.user?.name ?? 'Employee Details'}</h1>
                        <p className="text-muted-foreground text-sm">Employee ID: {employee.employee_id}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={employeeRoutes.index().url}>← Back</Link>
                        </Button>
                        <Button size="sm" asChild>
                            <Link href={employeeRoutes.edit({ employee: employee.id }).url}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                            </Link>
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between gap-4">
                            <CardTitle>Profile</CardTitle>
                            <Badge className={statusBadge[employee.status] ?? ''}>
                                {employee.status.replace('_', ' ')}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-muted-foreground">Full Name</p>
                                <p className="font-medium">{employee.user?.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Email</p>
                                <p className="font-medium">{employee.user?.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Phone</p>
                                <p className="font-medium">{employee.phone ?? '—'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Address</p>
                                <p className="font-medium">{employee.address ?? '—'}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-muted-foreground">Department</p>
                                <p className="font-medium">{employee.department?.name ?? '—'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Job Title</p>
                                <p className="font-medium">{employee.job_title}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Employment Type</p>
                                <p className="font-medium">{employee.employment_type.replace('_', ' ')}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Hire Date</p>
                                <p className="font-medium">{new Date(employee.hire_date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Date of Birth</p>
                                <p className="font-medium">{employee.date_of_birth ? new Date(employee.date_of_birth).toLocaleDateString() : '—'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Gender</p>
                                <p className="font-medium">{employee.gender ?? '—'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Base Salary</p>
                                <p className="font-medium">{employee.base_salary?.toLocaleString ? `LKR ${employee.base_salary.toLocaleString()}` : '—'}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Attendance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {employee.attendances && employee.attendances.length > 0 ? (
                                <div className="space-y-3">
                                    {employee.attendances.map((attendance) => (
                                        <div key={attendance.id} className="rounded-lg border p-3">
                                            <div className="flex items-center justify-between gap-3">
                                                <div>
                                                    <p className="font-medium">{new Date(attendance.date).toLocaleDateString()}</p>
                                                    <p className="text-xs text-muted-foreground">{attendance.status.replace('_', ' ')}</p>
                                                </div>
                                                <p className="text-sm font-medium">{attendance.work_hours} hrs</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">No recent attendance records available.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
