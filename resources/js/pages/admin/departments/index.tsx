import { Head, Link, router, useForm } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import InputError from '@/components/input-error';
import * as deptRoutes from '@/routes/admin/departments';
import type { Department, PaginatedData } from '@/types';

interface Manager {
    id: number;
    name: string;
}

interface Props {
    departments: PaginatedData<Department>;
    filters: { search?: string };
    managers: Manager[];
}

function DeptFormFields({ data, setData, errors, managers }: any) {
    return (
        <div className="space-y-4">
            <div className="space-y-1">
                <Label htmlFor="name">Name *</Label>
                <Input id="name" value={data.name} onChange={(e: any) => setData('name', e.target.value)} required />
                <InputError message={errors.name} />
            </div>
            <div className="space-y-1">
                <Label htmlFor="code">Code *</Label>
                <Input id="code" value={data.code} onChange={(e: any) => setData('code', e.target.value.toUpperCase())} required maxLength={10} />
                <InputError message={errors.code} />
            </div>
            <div className="space-y-1">
                <Label htmlFor="description">Description</Label>
                <Input id="description" value={data.description} onChange={(e: any) => setData('description', e.target.value)} />
                <InputError message={errors.description} />
            </div>
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
                        {managers.map((manager: Manager) => (
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
        </div>
    );
}

function CreateDeptDialog({ managers }: { managers: Manager[] }) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', code: '', description: '', manager_id: '', is_active: '1',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(deptRoutes.store().url, { onSuccess: () => { reset(); setOpen(false); } });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button><Plus className="mr-2 h-4 w-4" /> Add Department</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader><DialogTitle>New Department</DialogTitle></DialogHeader>
                <form onSubmit={submit} className="space-y-4">
                    <DeptFormFields data={data} setData={setData} errors={errors} managers={managers} />
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" type="button" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={processing}>Create</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default function DepartmentsIndex({ departments: data, filters, managers }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(deptRoutes.index().url, { search }, { preserveState: true, replace: true });
    };

    return (
        <>
            <Head title="Departments" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Departments</h1>
                        <p className="text-muted-foreground text-sm">{data.total} total departments</p>
                    </div>
                    <CreateDeptDialog managers={managers} />
                </div>

                <form onSubmit={handleSearch} className="flex gap-2">
                    <Input
                        placeholder="Search departments…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm"
                    />
                    <Button type="submit" variant="secondary"><Search className="h-4 w-4" /></Button>
                </form>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {data.data.map((dept) => (
                        <Card key={dept.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">{dept.name}</CardTitle>
                                    <Badge variant="outline" className="font-mono text-xs">{dept.code}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {dept.description && (
                                    <p className="text-muted-foreground text-sm">{dept.description}</p>
                                )}
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Employees</span>
                                    <span className="font-semibold">{dept.active_employee_count ?? 0}</span>
                                </div>
                                {dept.manager && (
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Manager</span>
                                        <span className="font-medium">{dept.manager.name}</span>
                                    </div>
                                )}
                                <div className="flex gap-2 pt-2">
                                    <Button variant="outline" size="sm" asChild className="flex-1">
                                        <Link href={deptRoutes.edit({ department: dept.id }).url}>Edit</Link>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-red-600 hover:text-red-700"
                                        onClick={() => {
                                            if (confirm('Delete this department?')) {
                                                router.delete(deptRoutes.destroy({ department: dept.id }).url);
                                            }
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {data.data.length === 0 && (
                        <div className="col-span-full text-center py-12 text-muted-foreground">
                            No departments found.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
