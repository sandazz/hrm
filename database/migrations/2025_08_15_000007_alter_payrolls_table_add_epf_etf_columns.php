<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('payrolls', function (Blueprint $table) {
            $table->decimal('gross_salary', 12, 2)->default(0)->after('base_salary');
            $table->decimal('overtime_pay', 12, 2)->default(0)->after('gross_salary');
            $table->decimal('bonus', 12, 2)->default(0)->after('overtime_pay');
            $table->decimal('no_pay_deduction', 12, 2)->default(0)->after('deductions');
            $table->decimal('late_deduction', 12, 2)->default(0)->after('no_pay_deduction');
            $table->decimal('epf_employee', 12, 2)->default(0)->after('late_deduction'); // 8%
            $table->decimal('epf_employer', 12, 2)->default(0)->after('epf_employee');   // 12%
            $table->decimal('etf_employer', 12, 2)->default(0)->after('epf_employer');   // 3%
            $table->integer('overtime_hours')->default(0)->after('leave_days');
            $table->integer('late_days')->default(0)->after('overtime_hours');
            $table->integer('no_pay_days')->default(0)->after('late_days');
            $table->string('payslip_path')->nullable()->after('notes');  // PDF path
        });
    }

    public function down(): void
    {
        Schema::table('payrolls', function (Blueprint $table) {
            $table->dropColumn([
                'gross_salary', 'overtime_pay', 'bonus',
                'no_pay_deduction', 'late_deduction',
                'epf_employee', 'epf_employer', 'etf_employer',
                'overtime_hours', 'late_days', 'no_pay_days', 'payslip_path',
            ]);
        });
    }
};
