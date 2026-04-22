<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payslip - {{ $payroll->employee->user->name ?? 'Employee' }} - {{ date('F Y', mktime(0, 0, 0, $payroll->month, 1, $payroll->year)) }}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: DejaVu Sans, Arial, sans-serif; font-size: 11px; color: #1a1a2e; background: #fff; }
        .container { max-width: 720px; margin: 0 auto; padding: 24px; }

        /* Header */
        .header { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 16px; border-bottom: 2px solid #2563eb; margin-bottom: 20px; }
        .company-name { font-size: 20px; font-weight: 700; color: #1d4ed8; }
        .company-address { font-size: 10px; color: #6b7280; margin-top: 2px; }
        .payslip-title { text-align: right; }
        .payslip-title h2 { font-size: 16px; font-weight: 700; color: #374151; }
        .payslip-title .period { font-size: 13px; color: #2563eb; font-weight: 600; margin-top: 2px; }

        /* Employee Info */
        .info-grid { display: table; width: 100%; margin-bottom: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; }
        .info-row { display: table-row; }
        .info-cell { display: table-cell; padding: 4px 12px 4px 0; width: 25%; }
        .info-label { font-size: 9px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; }
        .info-value { font-size: 11px; font-weight: 600; color: #111827; margin-top: 1px; }

        /* Sections */
        .section { margin-bottom: 16px; }
        .section-title { font-size: 11px; font-weight: 700; color: #374151; background: #f1f5f9; padding: 6px 10px; border-left: 3px solid #2563eb; margin-bottom: 0; }
        table { width: 100%; border-collapse: collapse; }
        td, th { padding: 6px 10px; border-bottom: 1px solid #f1f5f9; }
        th { font-size: 9px; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; font-weight: 600; background: #f8fafc; }
        .amount { text-align: right; }
        .subtotal td { font-weight: 700; background: #f8fafc; border-top: 1px solid #e2e8f0; }

        /* Net Salary Box */
        .net-box { background: #1d4ed8; color: #fff; border-radius: 6px; padding: 14px 18px; margin: 16px 0; display: flex; justify-content: space-between; align-items: center; }
        .net-label { font-size: 12px; font-weight: 600; }
        .net-amount { font-size: 22px; font-weight: 700; }
        .net-sub { font-size: 10px; opacity: 0.8; margin-top: 2px; }

        /* Employer Section */
        .employer-section { background: #fefce8; border: 1px solid #fde68a; border-radius: 6px; padding: 10px; margin-bottom: 16px; }
        .employer-title { font-size: 10px; font-weight: 700; color: #92400e; margin-bottom: 6px; }
        .employer-grid { display: flex; gap: 24px; }
        .emp-item { flex: 1; text-align: center; }
        .emp-item .label { font-size: 9px; color: #78716c; }
        .emp-item .val { font-size: 12px; font-weight: 700; color: #451a03; }

        /* Footer */
        .footer { border-top: 1px solid #e2e8f0; padding-top: 10px; margin-top: 16px; text-align: center; font-size: 9px; color: #9ca3af; }
        .status-badge { display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 9px; font-weight: 700; text-transform: uppercase; }
        .status-paid { background: #dcfce7; color: #166534; }
        .status-processed { background: #dbeafe; color: #1e40af; }
        .status-draft { background: #f3f4f6; color: #6b7280; }

        @media print {
            body { -webkit-print-color-adjust: exact; }
        }
    </style>
</head>
<body>
<div class="container">

    {{-- Header --}}
    <div class="header">
        <div>
            <div class="company-name">{{ $company_name ?? config('app.name') }}</div>
            <div class="company-address">{{ $company_address ?? '' }}</div>
        </div>
        <div class="payslip-title">
            <h2>PAYSLIP</h2>
            <div class="period">{{ date('F Y', mktime(0, 0, 0, $payroll->month, 1, $payroll->year)) }}</div>
            <div style="margin-top:4px;">
                <span class="status-badge status-{{ $payroll->status }}">{{ ucfirst($payroll->status) }}</span>
            </div>
        </div>
    </div>

    {{-- Employee Info --}}
    <div class="info-grid">
        <div class="info-row">
            <div class="info-cell">
                <div class="info-label">Employee Name</div>
                <div class="info-value">{{ $payroll->employee->user->name ?? '—' }}</div>
            </div>
            <div class="info-cell">
                <div class="info-label">Employee ID</div>
                <div class="info-value">{{ $payroll->employee->employee_id ?? '—' }}</div>
            </div>
            <div class="info-cell">
                <div class="info-label">Department</div>
                <div class="info-value">{{ $payroll->employee->department->name ?? '—' }}</div>
            </div>
            <div class="info-cell">
                <div class="info-label">Designation</div>
                <div class="info-value">{{ $payroll->employee->job_title ?? '—' }}</div>
            </div>
        </div>
        <div class="info-row" style="margin-top:8px;">
            <div class="info-cell">
                <div class="info-label">Pay Period</div>
                <div class="info-value">{{ date('F Y', mktime(0, 0, 0, $payroll->month, 1, $payroll->year)) }}</div>
            </div>
            <div class="info-cell">
                <div class="info-label">Working Days</div>
                <div class="info-value">{{ $payroll->working_days }}</div>
            </div>
            <div class="info-cell">
                <div class="info-label">Present Days</div>
                <div class="info-value">{{ $payroll->present_days }}</div>
            </div>
            <div class="info-cell">
                <div class="info-label">No-Pay Days</div>
                <div class="info-value">{{ $payroll->no_pay_days ?? 0 }}</div>
            </div>
        </div>
    </div>

    {{-- Earnings --}}
    <div class="section">
        <div class="section-title">EARNINGS</div>
        <table>
            <thead>
                <tr><th>Description</th><th class="amount">Amount (LKR)</th></tr>
            </thead>
            <tbody>
                <tr><td>Basic Salary</td><td class="amount">{{ number_format($payroll->base_salary, 2) }}</td></tr>
                @if(($payroll->allowances ?? 0) > 0)
                <tr><td>Allowances</td><td class="amount">{{ number_format($payroll->allowances, 2) }}</td></tr>
                @endif
                @if(($payroll->overtime_pay ?? 0) > 0)
                <tr><td>Overtime Pay ({{ $payroll->overtime_hours ?? 0 }} hrs)</td><td class="amount">{{ number_format($payroll->overtime_pay, 2) }}</td></tr>
                @endif
                @if(($payroll->bonus ?? 0) > 0)
                <tr><td>Bonus</td><td class="amount">{{ number_format($payroll->bonus, 2) }}</td></tr>
                @endif
            </tbody>
            <tfoot>
                <tr class="subtotal"><td>Gross Salary</td><td class="amount">{{ number_format($payroll->gross_salary ?? ($payroll->base_salary + $payroll->allowances), 2) }}</td></tr>
            </tfoot>
        </table>
    </div>

    {{-- Deductions --}}
    <div class="section">
        <div class="section-title">DEDUCTIONS</div>
        <table>
            <thead>
                <tr><th>Description</th><th class="amount">Amount (LKR)</th></tr>
            </thead>
            <tbody>
                @if(($payroll->epf_employee ?? 0) > 0)
                <tr><td>EPF Employee Contribution (8%)</td><td class="amount">{{ number_format($payroll->epf_employee, 2) }}</td></tr>
                @endif
                @if(($payroll->no_pay_deduction ?? 0) > 0)
                <tr><td>No-Pay Deduction ({{ $payroll->no_pay_days ?? 0 }} days)</td><td class="amount">{{ number_format($payroll->no_pay_deduction, 2) }}</td></tr>
                @endif
                @if(($payroll->late_deduction ?? 0) > 0)
                <tr><td>Late Deduction ({{ $payroll->late_days ?? 0 }} days)</td><td class="amount">{{ number_format($payroll->late_deduction, 2) }}</td></tr>
                @endif
                @if(($payroll->tax ?? 0) > 0)
                <tr><td>PAYE Tax</td><td class="amount">{{ number_format($payroll->tax, 2) }}</td></tr>
                @endif
                @if(($payroll->deductions ?? 0) > 0)
                <tr><td>Other Deductions</td><td class="amount">{{ number_format($payroll->deductions, 2) }}</td></tr>
                @endif
            </tbody>
            <tfoot>
                <tr class="subtotal">
                    <td>Total Deductions</td>
                    <td class="amount">{{ number_format(($payroll->epf_employee ?? 0) + ($payroll->no_pay_deduction ?? 0) + ($payroll->late_deduction ?? 0) + ($payroll->tax ?? 0) + ($payroll->deductions ?? 0), 2) }}</td>
                </tr>
            </tfoot>
        </table>
    </div>

    {{-- Net Salary --}}
    <div class="net-box">
        <div>
            <div class="net-label">NET SALARY</div>
            <div class="net-sub">{{ date('F Y', mktime(0, 0, 0, $payroll->month, 1, $payroll->year)) }}</div>
        </div>
        <div style="text-align:right;">
            <div class="net-amount">LKR {{ number_format($payroll->net_salary, 2) }}</div>
            @if($payroll->status === 'paid' && $payroll->paid_at)
            <div class="net-sub">Paid on {{ \Carbon\Carbon::parse($payroll->paid_at)->format('d M Y') }}</div>
            @endif
        </div>
    </div>

    {{-- Employer Contributions --}}
    @if(($payroll->epf_employer ?? 0) > 0 || ($payroll->etf_employer ?? 0) > 0)
    <div class="employer-section">
        <div class="employer-title">EMPLOYER CONTRIBUTIONS (Not deducted from salary)</div>
        <div class="employer-grid">
            @if(($payroll->epf_employer ?? 0) > 0)
            <div class="emp-item">
                <div class="label">EPF Employer (12%)</div>
                <div class="val">LKR {{ number_format($payroll->epf_employer, 2) }}</div>
            </div>
            @endif
            @if(($payroll->etf_employer ?? 0) > 0)
            <div class="emp-item">
                <div class="label">ETF Employer (3%)</div>
                <div class="val">LKR {{ number_format($payroll->etf_employer, 2) }}</div>
            </div>
            @endif
            <div class="emp-item">
                <div class="label">Total Employer Cost</div>
                <div class="val">LKR {{ number_format($payroll->net_salary + ($payroll->epf_employer ?? 0) + ($payroll->etf_employer ?? 0), 2) }}</div>
            </div>
        </div>
    </div>
    @endif

    {{-- Footer --}}
    <div class="footer">
        <p>This is a computer-generated payslip and does not require a signature.</p>
        <p style="margin-top:4px;">{{ $company_name ?? config('app.name') }} &bull; Generated on {{ now()->format('d M Y H:i') }}</p>
    </div>

</div>
</body>
</html>
