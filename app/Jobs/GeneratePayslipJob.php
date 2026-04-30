<?php

namespace App\Jobs;

use App\Models\Payroll;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class GeneratePayslipJob implements ShouldQueue
{
    use Queueable, InteractsWithQueue, SerializesModels;

    public int $timeout = 60;
    public int $tries   = 3;

    public function __construct(public Payroll $payroll) {}

    public function handle(): void
    {
        // Requires barryvdh/laravel-dompdf
        // Run: composer require barryvdh/laravel-dompdf
        if (! class_exists(\Barryvdh\DomPDF\Facade\Pdf::class)) {
            return;
        }

        $payroll = $this->payroll->load(['employee.user', 'employee.department', 'employee.allowanceTypes', 'processor']);

        $pdf  = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.payslip', ['payroll' => $payroll]);
        $path = "payslips/{$payroll->year}/{$payroll->month}/{$payroll->employee->employee_id}.pdf";

        Storage::put($path, $pdf->output());

        $payroll->update(['payslip_path' => $path]);
    }
}
