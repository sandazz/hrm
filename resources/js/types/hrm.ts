// ─── HRM Domain Types ────────────────────────────────────────────────────────

export interface Department {
    id: number;
    name: string;
    code: string;
    description?: string;
    manager_id?: number;
    manager?: { id: number; name: string };
    is_active: boolean;
    active_employee_count?: number;
    created_at: string;
    updated_at: string;
}

export interface Employee {
    id: number;
    user_id: number;
    department_id?: number;
    employee_id: string;
    job_title: string;
    phone?: string;
    address?: string;
    date_of_birth?: string;
    gender?: 'male' | 'female' | 'other';
    hire_date: string;
    end_date?: string;
    employment_type: 'full_time' | 'part_time' | 'contract' | 'intern';
    status: 'active' | 'on_leave' | 'terminated' | 'probation';
    base_salary: number;
    user?: { id: number; name: string; email: string; avatar?: string };
    department?: Department;
    created_at: string;
    updated_at: string;
}

export interface Attendance {
    id: number;
    employee_id: number;
    shift_id?: number;
    date: string;
    check_in?: string;
    check_out?: string;
    work_hours: number;
    status: 'present' | 'absent' | 'late' | 'half_day' | 'holiday' | 'on_leave';
    source: 'manual' | 'fingerprint' | 'csv_import';
    is_late: boolean;
    late_minutes: number;
    overtime_hours: number;
    notes?: string;
    employee?: Employee;
    shift?: Shift;
    created_at: string;
    updated_at: string;
}

export interface LeaveType {
    id: number;
    name: string;
    code: string;
    days_allowed: number;
    is_paid: boolean;
    is_active: boolean;
    description?: string;
}

export interface LeaveRequest {
    id: number;
    employee_id: number;
    leave_type_id: number;
    approved_by?: number;
    start_date: string;
    end_date: string;
    total_days: number;
    reason: string;
    status: 'pending' | 'approved' | 'rejected' | 'cancelled';
    rejection_reason?: string;
    approved_at?: string;
    employee?: Employee;
    leave_type?: LeaveType;
    approver?: { id: number; name: string };
    created_at: string;
    updated_at: string;
}

export interface Shift {
    id: number;
    name: string;
    start_time: string;
    end_time: string;
    max_late_minutes: number;
    grace_period_minutes: number;
    overtime_after_hours: number;
    is_default: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface FingerprintDevice {
    id: number;
    name: string;
    ip_address: string;
    port: number;
    location?: string;
    serial_number?: string;
    is_active: boolean;
    status: 'online' | 'offline' | 'error' | 'syncing';
    last_synced_at?: string;
    last_sync_records?: number;
    last_error?: string;
    sync_interval_minutes: number;
    timeout_seconds: number;
    created_at: string;
    updated_at: string;
}

export interface DeviceLog {
    id: number;
    device_id: number;
    employee_id?: number;
    biometric_uid: string;
    biometric_employee_id?: string;
    punch_time: string;
    punch_type: 'in' | 'out' | 'unknown';
    is_processed: boolean;
    processed_at?: string;
    error_notes?: string;
    device?: FingerprintDevice;
    employee?: Employee;
}

export interface AttendanceImportLog {
    id: number;
    filename: string;
    imported_by: number;
    total_records: number;
    success_count: number;
    error_count: number;
    duplicate_count: number;
    error_details?: Record<string, string>;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    importer?: { id: number; name: string };
    created_at: string;
    updated_at: string;
}

export interface SalaryComponent {
    id: number;
    employee_id: number;
    component_type: 'transport_allowance' | 'meal_allowance' | 'housing_allowance' | 'medical_allowance' | 'other_allowance' | 'other_deduction';
    name: string;
    amount: number;
    is_percentage: boolean;
    percentage?: number;
    is_active: boolean;
    employee?: Employee;
}

export interface Setting {
    id: number;
    key: string;
    value: string | null;
    group: string;
    type: 'string' | 'boolean' | 'integer' | 'json';
    created_at: string;
    updated_at: string;
}

export interface Payroll {
    id: number;
    employee_id: number;
    month: number;
    year: number;
    base_salary: number;
    gross_salary: number;
    allowances: number;
    overtime_pay: number;
    bonus: number;
    deductions: number;
    no_pay_deduction: number;
    late_deduction: number;
    epf_employee: number;
    epf_employer: number;
    etf_employer: number;
    tax: number;
    net_salary: number;
    working_days: number;
    present_days: number;
    leave_days: number;
    overtime_hours: number;
    late_days: number;
    no_pay_days: number;
    status: 'draft' | 'processed' | 'paid';
    paid_at?: string;
    payslip_path?: string;
    notes?: string;
    employee?: Employee;
    salary_components?: SalaryComponent[];
    created_at: string;
    updated_at: string;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: { url: string | null; label: string; active: boolean }[];
}

export interface AdminStats {
    total_employees: number;
    active_employees: number;
    total_departments: number;
    pending_leaves: number;
    today_present: number;
    today_absent: number;
    total_payroll_month: number;
    new_employees_month: number;
}

export interface HrStats {
    total_employees: number;
    pending_leaves: number;
    today_present: number;
    today_absent: number;
    on_leave_today: number;
    departments: number;
}

export interface EmployeeStats {
    present_days_month: number;
    leave_days_month: number;
    pending_leaves: number;
    net_salary: number;
}
