<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('attendances', function (Blueprint $table) {
            $table->foreignId('shift_id')->nullable()->after('employee_id')
                ->constrained('shifts')->nullOnDelete();
            $table->enum('source', ['manual', 'device', 'import'])->default('manual')->after('notes');
            $table->boolean('is_late')->default(false)->after('source');
            $table->unsignedSmallInteger('late_minutes')->default(0)->after('is_late');
            $table->decimal('overtime_hours', 4, 2)->default(0)->after('late_minutes');
        });
    }

    public function down(): void
    {
        Schema::table('attendances', function (Blueprint $table) {
            $table->dropForeign(['shift_id']);
            $table->dropColumn(['shift_id', 'source', 'is_late', 'late_minutes', 'overtime_hours']);
        });
    }
};
