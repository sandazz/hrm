import { Head, useForm } from '@inertiajs/react';
import { AlertTriangle, CheckCircle, Clock, FileText, Upload, XCircle } from 'lucide-react';
import { useRef } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import * as importRoutes from '@/routes/admin/attendance-import';

interface ImportLog {
    id: number;
    filename: string;
    total_records: number;
    success_count: number;
    error_count: number;
    duplicate_count: number;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    created_at: string;
    importer?: { name: string };
    error_details?: Array<{ employee_id?: string; row?: number; error: string }>;
}

interface Props {
    imports: { data: ImportLog[]; meta: { current_page: number; last_page: number; total: number } };
}

export default function AttendanceImportPage({ imports }: Props) {
    const fileRef = useRef<HTMLInputElement>(null);
    const form = useForm<{ file: File | null }>({ file: null });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(importRoutes.store().url, {
            forceFormData: true,
            onSuccess: () => {
                form.reset();
                if (fileRef.current) fileRef.current.value = '';
            },
        });
    };

    const statusIcon = (status: ImportLog['status']) =>
        ({
            pending: <Clock className="h-4 w-4 text-yellow-500" />,
            processing: <Clock className="h-4 w-4 animate-pulse text-blue-500" />,
            completed: <CheckCircle className="h-4 w-4 text-green-500" />,
            failed: <XCircle className="h-4 w-4 text-red-500" />,
        })[status];

    return (
        <>
            <Head title="Import Attendance" />

            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold">Import Attendance</h1>
                    <p className="text-muted-foreground text-sm">Upload a ZKTeco CSV / DAT export to bulk-import attendance records</p>
                </div>

                {/* Upload Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Upload File</CardTitle>
                        <CardDescription>
                            Supported formats: CSV, TXT, DAT (max 10 MB). ZKTeco default export format is supported.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div
                                className="cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition hover:border-primary"
                                onClick={() => fileRef.current?.click()}
                            >
                                <Upload className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                                <p className="text-sm font-medium">Click to select file or drag & drop</p>
                                <p className="text-muted-foreground text-xs">CSV, TXT, DAT accepted</p>
                                {form.data.file && (
                                    <p className="mt-2 text-sm font-medium text-primary">{form.data.file.name}</p>
                                )}
                            </div>
                            <input
                                ref={fileRef}
                                type="file"
                                accept=".csv,.txt,.dat"
                                className="hidden"
                                onChange={(e) => form.setData('file', e.target.files?.[0] ?? null)}
                            />
                            {form.errors.file && <p className="text-destructive text-sm">{form.errors.file}</p>}

                            {/* Format guide */}
                            <div className="rounded-lg bg-muted/50 p-4 text-xs">
                                <p className="mb-2 font-semibold">Expected CSV format:</p>
                                <code className="text-muted-foreground">
                                    Employee ID, Name, Date Time, Punch Type<br />
                                    1, John Doe, 2024-08-01 08:02:00, 0<br />
                                    1, John Doe, 2024-08-01 17:05:00, 1
                                </code>
                                <p className="mt-2 font-semibold">ZKTeco DAT (tab-separated):</p>
                                <code className="text-muted-foreground">1\t2024-08-01 08:02:00\t0\t1</code>
                            </div>

                            <Button type="submit" disabled={!form.data.file || form.processing} className="w-full">
                                {form.processing ? 'Importing…' : 'Import Attendance'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Import History */}
                <Card>
                    <CardHeader>
                        <CardTitle>Import History</CardTitle>
                        <CardDescription>{imports.data.length} recent imports</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {imports.data.map((imp) => (
                                <div key={imp.id} className="flex items-start justify-between rounded-lg border p-4">
                                    <div className="flex items-start gap-3">
                                        <FileText className="text-muted-foreground mt-0.5 h-5 w-5 shrink-0" />
                                        <div>
                                            <p className="font-medium">{imp.filename}</p>
                                            <p className="text-muted-foreground text-xs">
                                                By {imp.importer?.name ?? '—'} · {new Date(imp.created_at).toLocaleDateString()}
                                            </p>
                                            <div className="mt-1 flex flex-wrap gap-2 text-xs">
                                                <span className="rounded bg-green-100 px-1.5 py-0.5 text-green-800">{imp.success_count} added</span>
                                                {imp.duplicate_count > 0 && (
                                                    <span className="rounded bg-yellow-100 px-1.5 py-0.5 text-yellow-800">{imp.duplicate_count} duplicates</span>
                                                )}
                                                {imp.error_count > 0 && (
                                                    <span className="rounded bg-red-100 px-1.5 py-0.5 text-red-800">{imp.error_count} errors</span>
                                                )}
                                                <span className="text-muted-foreground">{imp.total_records} total</span>
                                            </div>
                                            {imp.error_details && imp.error_details.length > 0 && (
                                                <div className="mt-2 rounded bg-red-50 p-2">
                                                    {imp.error_details.slice(0, 3).map((err, i) => (
                                                        <p key={i} className="text-xs text-red-700">
                                                            <AlertTriangle className="mr-1 inline h-3 w-3" />
                                                            {err.employee_id && `Emp ${err.employee_id}: `}{err.error}
                                                        </p>
                                                    ))}
                                                    {imp.error_details.length > 3 && (
                                                        <p className="text-xs text-red-600">…and {imp.error_details.length - 3} more</p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {statusIcon(imp.status)}
                                        <Badge variant={imp.status === 'completed' ? 'default' : imp.status === 'failed' ? 'destructive' : 'secondary'}>
                                            {imp.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}

                            {imports.data.length === 0 && (
                                <p className="text-muted-foreground py-8 text-center text-sm">No imports yet</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
