<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('biometric_attendance_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('employees')->cascadeOnDelete();
            $table->dateTime('attendance_time');
            $table->enum('type', ['IN', 'OUT']);
            $table->string('biometric_uid')->index()->comment('UID received from biometric device');
            $table->timestamps();

            // Prevent exact duplicate punch: same employee at the exact same timestamp
            $table->unique(['employee_id', 'attendance_time']);
            $table->index(['employee_id', 'attendance_time']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('biometric_attendance_logs');
    }
};
