import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import InputError from '@/components/input-error';
import { Trash2, UserPlus, ShieldCheck, Users } from 'lucide-react';
import * as userRoutes from '@/routes/admin/users';

interface AdminUser {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'hr';
    is_active: boolean;
    created_at: string;
}

interface Props {
    users: AdminUser[];
}

export default function AdminUsersIndex({ users }: Props) {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'hr' as 'admin' | 'hr',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(userRoutes.store().url, {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };

    const handleDelete = (user: AdminUser) => {
        if (confirm(`Delete "${user.name}"? This cannot be undone.`)) {
            router.delete(userRoutes.destroy(user.id).url);
        }
    };

    const roleColor = (role: string) =>
        role === 'admin' ? 'destructive' : 'secondary';

    return (
        <>
            <Head title="Users" />
            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Admin &amp; HR Users</h1>
                        <p className="text-muted-foreground text-sm">
                            Manage admin and HR role accounts
                        </p>
                    </div>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Add User
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Create Admin / HR User</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={submit} className="space-y-4 pt-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="John Doe"
                                        required
                                        autoFocus
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
                                        placeholder="user@company.lk"
                                        required
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="password">Password *</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Min. 8 characters"
                                        required
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="space-y-1">
                                    <Label>Role *</Label>
                                    <Select
                                        value={data.role}
                                        onValueChange={(v) => setData('role', v as 'admin' | 'hr')}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="hr">HR Manager</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.role} />
                                </div>

                                <div className="flex justify-end gap-2 pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Creating…' : 'Create User'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <Card>
                        <CardContent className="flex items-center gap-3 p-4">
                            <Users className="text-muted-foreground h-8 w-8" />
                            <div>
                                <p className="text-2xl font-bold">{users.length}</p>
                                <p className="text-muted-foreground text-xs">Total Users</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex items-center gap-3 p-4">
                            <ShieldCheck className="h-8 w-8 text-red-500" />
                            <div>
                                <p className="text-2xl font-bold">
                                    {users.filter((u) => u.role === 'admin').length}
                                </p>
                                <p className="text-muted-foreground text-xs">Admins</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex items-center gap-3 p-4">
                            <ShieldCheck className="h-8 w-8 text-blue-500" />
                            <div>
                                <p className="text-2xl font-bold">
                                    {users.filter((u) => u.role === 'hr').length}
                                </p>
                                <p className="text-muted-foreground text-xs">HR Managers</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Users Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Users</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {users.length === 0 ? (
                            <p className="text-muted-foreground p-6 text-center text-sm">
                                No admin or HR users found.
                            </p>
                        ) : (
                            <div className="divide-y">
                                {users.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center justify-between px-6 py-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="bg-muted flex h-9 w-9 items-center justify-center rounded-full font-semibold text-sm uppercase">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium leading-tight">{user.name}</p>
                                                <p className="text-muted-foreground text-xs">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Badge variant={roleColor(user.role)}>
                                                {user.role === 'admin' ? 'Admin' : 'HR Manager'}
                                            </Badge>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() => handleDelete(user)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
