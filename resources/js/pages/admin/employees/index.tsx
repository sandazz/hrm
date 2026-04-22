import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as employees from '@/routes/admin/employees';
import type { Department, Employee, PaginatedData } from '@/types';

interface Props {
    employees: PaginatedData<Employee>;
    departments: Department[];
    filters: { search?: string; department_id?: string; status?: string };
}

const statusBadge: Record<string, string> = {
    active: 'bg-emerald-100 text-emerald-800',
    on_leave: 'bg-blue-100 text-blue-800',
    terminated: 'bg-red-100 text-red-800',
    probation: 'bg-yellow-100 text-yellow-800',
};

export default function EmployeesIndex({ employees: data, departments, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(employees.index().url, { search }, { preserveState: true, replace: true });
    };

    return (
        <>
            <Head title="Employees" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Employees</h1>
                        <p className="text-muted-foreground text-sm">{data.total} total employees</p>
                    </div>
                    <Button asChild>
                        <Link href={employees.create().url}>
                            <Plus className="mr-2 h-4 w-4" /> Add Employee
                        </Link>
                    </Button>
                </div>

                {/* Filters */}
                <form onSubmit={handleSearch} className="flex gap-2">
                    <Input
                        placeholder="Search by name, email or ID…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm"
                    />
                    <Button type="submit" variant="secondary">
                        <Search className="h-4 w-4" />
                    </Button>
                </form>

                {/* Table */}
                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="border-b bg-muted/40">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-medium">Employee</th>
                                        <th className="px-4 py-3 text-left font-medium">ID</th>
                                        <th className="px-4 py-3 text-left font-medium">Department</th>
                                        <th className="px-4 py-3 text-left font-medium">Job Title</th>
                                        <th className="px-4 py-3 text-left font-medium">Status</th>
                                        <th className="px-4 py-3 text-left font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.data.map((emp) => (
                                        <tr key={emp.id} className="border-b last:border-0 hover:bg-muted/20">
                                            <td className="px-4 py-3">
                                                <div>
                                                    <p className="font-medium">{emp.user?.name}</p>
                                                    <p className="text-muted-foreground text-xs">{emp.user?.email}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 font-mono text-xs">{emp.employee_id}</td>
                                            <td className="px-4 py-3">{emp.department?.name ?? '—'}</td>
                                            <td className="px-4 py-3">{emp.job_title}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusBadge[emp.status] ?? ''}`}>
                                                    {emp.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-2">
                                                    <Button variant="ghost" size="sm" asChild>
                                                        <Link href={employees.show({ employee: emp.id }).url}>View</Link>
                                                    </Button>
                                                    <Button variant="ghost" size="sm" asChild>
                                                        <Link href={employees.edit({ employee: emp.id }).url}>Edit</Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-red-600 hover:text-red-700"
                                                        onClick={() => {
                                                            if (confirm('Delete this employee?')) {
                                                                router.delete(employees.destroy({ employee: emp.id }).url);
                                                            }
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {data.data.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                                                No employees found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Pagination */}
                {data.last_page > 1 && (
                    <div className="flex justify-center gap-1">
                        {data.links.map((link, i) => (
                            <Button
                                key={i}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                disabled={!link.url}
                                onClick={() => link.url && router.get(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
