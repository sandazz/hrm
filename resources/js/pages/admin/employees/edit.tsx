import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';
import { KeyRound } from 'lucide-react';
import * as employeeRoutes from '@/routes/admin/employees';
import type { Department, Employee } from '@/types';

type EmployeeFormData = {
    name: string;
    email: string;
    department_id: string;
    job_title: string;
    phone: string;
    address: string;
    date_of_birth: string;
    gender: '' | 'male' | 'female' | 'other';
    hire_date: string;
    employment_type: 'full_time' | 'part_time' | 'contract' | 'intern';
    base_salary: string;
    status: 'active' | 'on_leave' | 'terminated' | 'probation';
};

interface Props {
    employee: Employee;
    departments: Department[];
}

export default function EditEmployee({ employee, departments }: Props) {
    const { data, setData, put, processing, errors } = useForm<EmployeeFormData>({
        name: employee.user?.name ?? '',
        email: employee.user?.email ?? '',
        department_id: employee.department_id ? String(employee.department_id) : '',
        job_title: employee.job_title,
        phone: employee.phone ?? '',
        address: employee.address ?? '',
        date_of_birth: employee.date_of_birth ? employee.date_of_birth.slice(0, 10) : '',
        gender: employee.gender ?? '',
        hire_date: employee.hire_date ? employee.hire_date.slice(0, 10) : '',
        employment_type: employee.employment_type,
        base_salary: employee.base_salary !== undefined && employee.base_salary !== null ? String(employee.base_salary) : '',
        status: employee.status,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(employeeRoutes.update({ employee: employee.id }).url);
    };

    const {
        data: pwData,
        setData: setPwData,
        post: postPassword,
        processing: pwProcessing,
        errors: pwErrors,
        reset: resetPwForm,
    } = useForm({ password: '', password_confirmation: '' });

    const submitPassword = (e: React.FormEvent) => {
        e.preventDefault();
        postPassword(employeeRoutes.resetPassword({ employee: employee.id }).url, {
            onSuccess: () => resetPwForm(),
        });
    };

    return (
        <>
            <Head title={`Edit ${employee.user?.name ?? 'Employee'}`} />

            <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Edit Employee</h1>
                        <p className="text-muted-foreground text-sm">Update the employee profile and employment details.</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={employeeRoutes.show({ employee: employee.id }).url}>← Back to profile</Link>
                    </Button>
                </div>

                <form onSubmit={submit} className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="name">Full Name *</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="job_title">Job Title *</Label>
                                <Input
                                    id="job_title"
                                    value={data.job_title}
                                    onChange={(e) => setData('job_title', e.target.value)}
                                    required
                                />
                                <InputError message={errors.job_title} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Employment Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <Label>Department</Label>
                                <Select value={data.department_id} onValueChange={(value) => setData('department_id', value)}>
                                    <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                                    <SelectContent>
                                        {departments.map((department) => (
                                            <SelectItem key={department.id} value={String(department.id)}>
                                                {department.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.department_id} />
                            </div>
                            <div className="space-y-1">
                                <Label>Employment Type *</Label>
                                <Select
                                    value={data.employment_type}
                                    onValueChange={(value) => setData('employment_type', value as EmployeeFormData['employment_type'])}
                                >
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="full_time">Full Time</SelectItem>
                                        <SelectItem value="part_time">Part Time</SelectItem>
                                        <SelectItem value="contract">Contract</SelectItem>
                                        <SelectItem value="intern">Intern</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.employment_type} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="hire_date">Hire Date *</Label>
                                <Input
                                    id="hire_date"
                                    type="date"
                                    value={data.hire_date}
                                    onChange={(e) => setData('hire_date', e.target.value)}
                                    required
                                />
                                <InputError message={errors.hire_date} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(value) => setData('status', value as EmployeeFormData['status'])}
                                >
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="on_leave">On Leave</SelectItem>
                                        <SelectItem value="terminated">Terminated</SelectItem>
                                        <SelectItem value="probation">Probation</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.status} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="base_salary">Base Salary</Label>
                                <Input
                                    id="base_salary"
                                    type="number"
                                    value={data.base_salary}
                                    onChange={(e) => setData('base_salary', e.target.value)}
                                />
                                <InputError message={errors.base_salary} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Personal Info</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-1">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                />
                                <InputError message={errors.phone} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                />
                                <InputError message={errors.address} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="date_of_birth">Date of Birth</Label>
                                <Input
                                    id="date_of_birth"
                                    type="date"
                                    value={data.date_of_birth}
                                    onChange={(e) => setData('date_of_birth', e.target.value)}
                                />
                                <InputError message={errors.date_of_birth} />
                            </div>
                            <div className="space-y-1">
                                <Label>Gender</Label>
                                <Select
                                    value={data.gender}
                                    onValueChange={(value) => setData('gender', value as EmployeeFormData['gender'])}
                                >
                                    <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.gender} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Password Reset */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <KeyRound className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <CardTitle>Reset Password</CardTitle>
                                    <CardDescription>Set a new password for this employee's account.</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submitPassword} className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-1">
                                    <Label htmlFor="password">New Password *</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={pwData.password}
                                        onChange={(e) => setPwData('password', e.target.value)}
                                        placeholder="Min. 8 characters"
                                        required
                                    />
                                    <InputError message={pwErrors.password} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password_confirmation">Confirm Password *</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        value={pwData.password_confirmation}
                                        onChange={(e) => setPwData('password_confirmation', e.target.value)}
                                        placeholder="Re-enter new password"
                                        required
                                    />
                                    <InputError message={pwErrors.password_confirmation} />
                                </div>
                                <div className="sm:col-span-2 flex justify-end">
                                    <Button type="submit" variant="secondary" disabled={pwProcessing}>
                                        {pwProcessing ? 'Updating…' : 'Update Password'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="lg:col-span-2 flex justify-end gap-3">
                        <Button variant="outline" type="button" asChild>
                            <Link href={employeeRoutes.show({ employee: employee.id }).url}>Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving…' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
