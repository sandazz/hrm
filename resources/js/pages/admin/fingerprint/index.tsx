import { Head, router, useForm } from '@inertiajs/react';
import { Activity, AlertCircle, CheckCircle, Clock, Cpu, Loader2, Plus, RefreshCw, Server, Trash2, Wifi, WifiOff } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import HrmLayout from '@/layouts/hrm-layout';
import * as fingerprintRoutes from '@/routes/admin/fingerprint';

interface Device {
    id: number;
    name: string;
    ip_address: string;
    port: number;
    serial_number?: string;
    location?: string;
    sync_interval_minutes: number;
    last_synced_at?: string;
    last_sync_records: number;
    is_active: boolean;
    status: 'online' | 'offline' | 'error' | 'syncing';
    last_error?: string;
}

interface DeviceLog {
    id: number;
    biometric_uid: number;
    punch_time: string;
    punch_type: 'in' | 'out' | 'unknown';
    is_processed: boolean;
    device?: { name: string };
    employee?: { employee_id: string; user?: { name: string } };
}

interface Stats {
    total_devices: number;
    online_devices: number;
    unprocessed_logs: number;
    today_logs: number;
}

interface Props {
    devices: Device[];
    recentLogs: DeviceLog[];
    stats: Stats;
}

export default function FingerprintIndex({ devices, recentLogs, stats }: Props) {
    const [showAdd, setShowAdd] = useState(false);
    const [editDevice, setEditDevice] = useState<Device | null>(null);
    const [syncing, setSyncing] = useState<number | null>(null);

    const form = useForm({
        name: '',
        ip_address: '',
        port: 4370,
        device_password: '0',
        serial_number: '',
        location: '',
        sync_interval_minutes: 30,
        timeout_seconds: 10,
    });

    const editForm = useForm({
        name: '',
        ip_address: '',
        port: 4370,
        device_password: '',
        serial_number: '',
        location: '',
        sync_interval_minutes: 30,
        timeout_seconds: 10,
        is_active: true,
    });

    const openEdit = (device: Device) => {
        setEditDevice(device);
        editForm.setData({
            name: device.name,
            ip_address: device.ip_address,
            port: device.port,
            device_password: '',
            serial_number: device.serial_number ?? '',
            location: device.location ?? '',
            sync_interval_minutes: device.sync_interval_minutes,
            timeout_seconds: 10,
            is_active: device.is_active,
        });
    };

    const handleSync = (device: Device) => {
        setSyncing(device.id);
        router.post(
            fingerprintRoutes.syncNow(device.id).url,
            {},
            { onFinish: () => setSyncing(null) },
        );
    };

    const handleProcessLogs = () => {
        router.post(fingerprintRoutes.processLogs().url);
    };

    const statusBadge = (status: Device['status']) => {
        const map = {
            online: { label: 'Online', variant: 'default' as const, icon: <Wifi className="h-3 w-3" /> },
            offline: { label: 'Offline', variant: 'secondary' as const, icon: <WifiOff className="h-3 w-3" /> },
            error: { label: 'Error', variant: 'destructive' as const, icon: <AlertCircle className="h-3 w-3" /> },
            syncing: { label: 'Syncing', variant: 'outline' as const, icon: <Loader2 className="h-3 w-3 animate-spin" /> },
        };
        const s = map[status];
        return (
            <Badge variant={s.variant} className="gap-1">
                {s.icon} {s.label}
            </Badge>
        );
    };

    return (
        <HrmLayout>
            <Head title="Fingerprint Devices" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Fingerprint Integration</h1>
                        <p className="text-muted-foreground text-sm">Manage ZKTeco devices and attendance sync</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleProcessLogs}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Process Logs
                        </Button>
                        <Button size="sm" onClick={() => setShowAdd(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Device
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {[
                        { label: 'Total Devices', value: stats.total_devices, icon: <Cpu className="h-5 w-5" /> },
                        { label: 'Online Devices', value: stats.online_devices, icon: <CheckCircle className="h-5 w-5 text-green-500" /> },
                        { label: 'Today Punches', value: stats.today_logs, icon: <Activity className="h-5 w-5 text-blue-500" /> },
                        { label: 'Unprocessed', value: stats.unprocessed_logs, icon: <Clock className="h-5 w-5 text-orange-500" /> },
                    ].map((s) => (
                        <Card key={s.label}>
                            <CardContent className="pt-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-muted-foreground text-xs">{s.label}</p>
                                        <p className="text-2xl font-bold">{s.value}</p>
                                    </div>
                                    {s.icon}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Devices */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {devices.map((device) => (
                        <Card key={device.id} className={!device.is_active ? 'opacity-60' : ''}>
                            <CardHeader className="pb-2">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <Server className="h-5 w-5 text-blue-500" />
                                        <CardTitle className="text-base">{device.name}</CardTitle>
                                    </div>
                                    {statusBadge(device.status)}
                                </div>
                                <CardDescription>
                                    {device.ip_address}:{device.port}
                                    {device.location && ` · ${device.location}`}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {device.last_error && (
                                    <p className="text-destructive rounded bg-red-50 p-2 text-xs">{device.last_error}</p>
                                )}
                                <div className="text-muted-foreground flex justify-between text-xs">
                                    <span>Sync every {device.sync_interval_minutes}m</span>
                                    <span>{device.last_sync_records} records last sync</span>
                                </div>
                                {device.last_synced_at && (
                                    <p className="text-muted-foreground text-xs">
                                        Last synced: {new Date(device.last_synced_at).toLocaleString()}
                                    </p>
                                )}
                                <div className="flex gap-2 pt-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="flex-1"
                                        disabled={syncing === device.id || !device.is_active}
                                        onClick={() => handleSync(device)}
                                    >
                                        {syncing === device.id ? (
                                            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                                        ) : (
                                            <RefreshCw className="mr-1 h-3 w-3" />
                                        )}
                                        Sync Now
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={() => openEdit(device)}>
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-destructive"
                                        onClick={() =>
                                            router.delete(fingerprintRoutes.destroy(device.id).url, {
                                                onBefore: () => confirm('Delete this device?'),
                                            })
                                        }
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {devices.length === 0 && (
                        <Card className="col-span-full">
                            <CardContent className="flex flex-col items-center py-12 text-center">
                                <Cpu className="text-muted-foreground mb-4 h-12 w-12" />
                                <p className="font-medium">No devices configured</p>
                                <p className="text-muted-foreground text-sm">Add a ZKTeco fingerprint device to start syncing attendance.</p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Recent Logs */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Punch Logs</CardTitle>
                        <CardDescription>Last 50 records from all devices</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        {['Device', 'Employee', 'Punch Time', 'Type', 'Status'].map((h) => (
                                            <th key={h} className="text-muted-foreground py-2 text-left font-medium">
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentLogs.map((log) => (
                                        <tr key={log.id} className="border-b last:border-0">
                                            <td className="py-2">{log.device?.name ?? '—'}</td>
                                            <td className="py-2">
                                                {log.employee ? (
                                                    <span>
                                                        {log.employee.user?.name ?? log.employee.employee_id}
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground">UID {log.biometric_uid}</span>
                                                )}
                                            </td>
                                            <td className="py-2">{new Date(log.punch_time).toLocaleString()}</td>
                                            <td className="py-2">
                                                <Badge
                                                    variant={
                                                        log.punch_type === 'in'
                                                            ? 'default'
                                                            : log.punch_type === 'out'
                                                                ? 'secondary'
                                                                : 'outline'
                                                    }
                                                >
                                                    {log.punch_type}
                                                </Badge>
                                            </td>
                                            <td className="py-2">
                                                {log.is_processed ? (
                                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                                ) : (
                                                    <Clock className="text-muted-foreground h-4 w-4" />
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {recentLogs.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="text-muted-foreground py-8 text-center">
                                                No logs yet
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Add Device Dialog */}
            <Dialog open={showAdd} onOpenChange={setShowAdd}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Add Fingerprint Device</DialogTitle>
                    </DialogHeader>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.post(fingerprintRoutes.store().url, { onSuccess: () => setShowAdd(false) });
                        }}
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 space-y-1">
                                <Label>Device Name</Label>
                                <Input value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} placeholder="Main Entrance" required />
                            </div>
                            <div className="space-y-1">
                                <Label>IP Address</Label>
                                <Input value={form.data.ip_address} onChange={(e) => form.setData('ip_address', e.target.value)} placeholder="192.168.1.100" required />
                            </div>
                            <div className="space-y-1">
                                <Label>Port</Label>
                                <Input type="number" value={form.data.port} onChange={(e) => form.setData('port', parseInt(e.target.value))} />
                            </div>
                            <div className="space-y-1">
                                <Label>Location</Label>
                                <Input value={form.data.location} onChange={(e) => form.setData('location', e.target.value)} placeholder="Front Office" />
                            </div>
                            <div className="space-y-1">
                                <Label>Sync Interval (minutes)</Label>
                                <Input type="number" value={form.data.sync_interval_minutes} onChange={(e) => form.setData('sync_interval_minutes', parseInt(e.target.value))} />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
                            <Button type="submit" disabled={form.processing}>Add Device</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Device Dialog */}
            <Dialog open={!!editDevice} onOpenChange={(o) => !o && setEditDevice(null)}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Edit Device — {editDevice?.name}</DialogTitle>
                    </DialogHeader>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            editForm.put(fingerprintRoutes.update(editDevice!.id).url, {
                                onSuccess: () => setEditDevice(null),
                            });
                        }}
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 space-y-1">
                                <Label>Device Name</Label>
                                <Input value={editForm.data.name} onChange={(e) => editForm.setData('name', e.target.value)} required />
                            </div>
                            <div className="space-y-1">
                                <Label>IP Address</Label>
                                <Input value={editForm.data.ip_address} onChange={(e) => editForm.setData('ip_address', e.target.value)} required />
                            </div>
                            <div className="space-y-1">
                                <Label>Port</Label>
                                <Input type="number" value={editForm.data.port} onChange={(e) => editForm.setData('port', parseInt(e.target.value))} />
                            </div>
                            <div className="space-y-1">
                                <Label>Location</Label>
                                <Input value={editForm.data.location} onChange={(e) => editForm.setData('location', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label>Sync Interval (minutes)</Label>
                                <Input type="number" value={editForm.data.sync_interval_minutes} onChange={(e) => editForm.setData('sync_interval_minutes', parseInt(e.target.value))} />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setEditDevice(null)}>Cancel</Button>
                            <Button type="submit" disabled={editForm.processing}>Save Changes</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </HrmLayout>
    );
}
