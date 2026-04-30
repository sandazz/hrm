import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/input-error';
import * as employeeRoutes from '@/routes/admin/employees';
import type { Department } from '@/types';

interface AllowanceType {
    id: number;
    name: string;
    component_type: string;
    amount: number;
    is_percentage: boolean;
    percentage: number | null;
}

interface Props {
    departments: Department[];
    allowanceTypes: AllowanceType[];
}

export default function CreateEmployee({ departments, allowanceTypes }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        department_id: '',
        job_title: '',
        phone: '',
        address: '',
        hire_date: '',
        employment_type: 'full_time',
        base_salary: '',
        gender: '',
        date_of_birth: '',
        allowance_type_ids: [] as number[],
    });

    const toggleAllowance = (id: number) => {
        setData('allowance_type_ids', data.allowance_type_ids.includes(id)
            ? data.allowance_type_ids.filter((x) => x !== id)
            : [...data.allowance_type_ids, id]
        );
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(employeeRoutes.store().url);
    };

    return (
        <>
            <Head title="Add Employee" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Add New Employee</h1>
                        <p className="text-muted-foreground text-sm">Fill in the details below</p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={employeeRoutes.index().url}>← Back</Link>
                    </Button>
                </div>

                <form onSubmit={submit} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Account Info */}
                    <Card>
                        <CardHeader><CardTitle>Account Info</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="name">Full Name *</Label>
                                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                                <InputError message={errors.name} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
                                    title="Enter a valid email address (e.g. user@example.com)"
                                    required
                                />
                                <InputError message={errors.email} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="Leave blank for default (password123)" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                                <InputError message={errors.password} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Employment Info */}
                    <Card>
                        <CardHeader><CardTitle>Employment Details</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="job_title">Job Title *</Label>
                                <Input id="job_title" value={data.job_title} onChange={(e) => setData('job_title', e.target.value)} required />
                                <InputError message={errors.job_title} />
                            </div>
                            <div className="space-y-1">
                                <Label>Department</Label>
                                <Select value={data.department_id} onValueChange={(v) => setData('department_id', v)}>
                                    <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                                    <SelectContent>
                                        {departments.map((d) => (
                                            <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.department_id} />
                            </div>
                            <div className="space-y-1">
                                <Label>Employment Type *</Label>
                                <Select value={data.employment_type} onValueChange={(v) => setData('employment_type', v)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="full_time">Full Time</SelectItem>
                                        <SelectItem value="part_time">Part Time</SelectItem>
                                        <SelectItem value="contract">Contract</SelectItem>
                                        <SelectItem value="intern">Intern</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="hire_date">Hire Date *</Label>
                                <Input id="hire_date" type="date" value={data.hire_date} onChange={(e) => setData('hire_date', e.target.value)} required />
                                <InputError message={errors.hire_date} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="base_salary">Base Salary</Label>
                                <Input id="base_salary" type="number" min="0" step="0.01" value={data.base_salary} onChange={(e) => setData('base_salary', e.target.value)} />
                                <InputError message={errors.base_salary} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Personal Info */}
                    <Card className="lg:col-span-2">
                        <CardHeader><CardTitle>Personal Info</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="space-y-1">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    pattern="[0-9]{10}"
                                    maxLength={10}
                                    title="Enter a valid 10-digit phone number"
                                />
                                <InputError message={errors.phone} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" value={data.address} onChange={(e) => setData('address', e.target.value)} />
                                <InputError message={errors.address} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="date_of_birth">Date of Birth</Label>
                                <Input id="date_of_birth" type="date" value={data.date_of_birth} onChange={(e) => setData('date_of_birth', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>Gender</Label>
                                <Select value={data.gender} onValueChange={(v) => setData('gender', v)}>
                                    <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Allowances */}
                    {allowanceTypes.length > 0 && (
                        <Card className="lg:col-span-2">
                            <CardHeader><CardTitle>Allowances</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-3 text-sm">Select the allowances this employee will receive in payroll calculations.</p>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                    {allowanceTypes.map((at) => (
                                        <label key={at.id} className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 hover:bg-muted">
                                            <Checkbox
                                                checked={data.allowance_type_ids.includes(at.id)}
                                                onCheckedChange={() => toggleAllowance(at.id)}
                                            />
                                            <div>
                                                <p className="text-sm font-medium">{at.name}</p>
                                                <p className="text-muted-foreground text-xs">
                                                    {at.is_percentage ? `${at.percentage}% of basic` : `LKR ${Number(at.amount).toLocaleString()}`}
                                                </p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <div className="lg:col-span-2 flex justify-end gap-3">
                        <Button variant="outline" type="button" asChild>
                            <Link href={employeeRoutes.index().url}>Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Creating…' : 'Create Employee'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
