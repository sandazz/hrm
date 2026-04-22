import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';
import * as departmentRoutes from '@/routes/admin/departments';
import type { Department } from '@/types';

interface Props {
    department: Department;
    managers: { id: number; name: string }[];
}

export default function EditDepartment({ department, managers }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: department.name,
        code: department.code,
        description: department.description ?? '',
        manager_id: department.manager_id ? String(department.manager_id) : '',
        is_active: department.is_active ? '1' : '0',
    });

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        put(departmentRoutes.update({ department: department.id }).url);
    };

    return (
        <>
            <Head title="Edit Department" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Edit Department</h1>
                        <p className="text-muted-foreground text-sm">Update department details and manager assignments.</p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={departmentRoutes.index().url}>← Back to Departments</Link>
                    </Button>
                </div>

                <form onSubmit={submit} className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Department Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name *</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(event) => setData('name', event.target.value)}
                                    required
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="code">Code *</Label>
                                <Input
                                    id="code"
                                    value={data.code}
                                    onChange={(event) => setData('code', event.target.value)}
                                    required
                                />
                                <InputError message={errors.code} />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    value={data.description}
                                    onChange={(event) => setData('description', event.target.value)}
                                />
                                <InputError message={errors.description} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Manager & Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="manager_id">Manager</Label>
                                <Select
                                    value={data.manager_id}
                                    onValueChange={(value) => setData('manager_id', value === 'none' ? '' : value)}
                                >
                                    <SelectTrigger id="manager_id">
                                        <SelectValue placeholder="Select manager" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">None</SelectItem>
                                        {managers.map((manager) => (
                                            <SelectItem key={manager.id} value={String(manager.id)}>{manager.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.manager_id} />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="is_active">Status</Label>
                                <Select value={data.is_active} onValueChange={(value) => setData('is_active', value)}>
                                    <SelectTrigger id="is_active">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Active</SelectItem>
                                        <SelectItem value="0">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.is_active} />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="lg:col-span-2 flex justify-end gap-3">
                        <Button variant="outline" type="button" asChild>
                            <Link href={departmentRoutes.index().url}>Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Updating…' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
