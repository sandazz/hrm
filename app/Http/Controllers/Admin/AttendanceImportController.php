<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AttendanceImportLog;
use App\Services\AttendanceImportService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AttendanceImportController extends Controller
{
    public function __construct(private AttendanceImportService $importService) {}

    public function index(): Response
    {
        return Inertia::render('admin/fingerprint/import', [
            'imports' => AttendanceImportLog::with('importer')
                ->orderByDesc('created_at')
                ->paginate(20),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,txt,dat|max:10240',
        ]);

        $log = $this->importService->importCsv($request->file('file'));

        $message = "Import complete: {$log->success_count} records added";
        if ($log->duplicate_count > 0) {
            $message .= ", {$log->duplicate_count} duplicates skipped";
        }
        if ($log->error_count > 0) {
            $message .= ", {$log->error_count} errors";
        }

        return back()->with(
            $log->error_count > 0 ? 'warning' : 'success',
            $message
        );
    }

    public function show(AttendanceImportLog $import): Response
    {
        return Inertia::render('admin/fingerprint/import-detail', [
            'import' => $import->load('importer'),
        ]);
    }
}
