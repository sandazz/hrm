<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('device_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('device_id')->constrained('fingerprint_devices')->cascadeOnDelete();
            $table->foreignId('employee_id')->nullable()->constrained('employees')->nullOnDelete();
            $table->unsignedInteger('biometric_uid');   // UID in fingerprint device
            $table->string('biometric_employee_id')->nullable(); // Employee code in device
            $table->dateTime('punch_time');
            $table->enum('punch_type', ['in', 'out', 'unknown'])->default('unknown');
            $table->unsignedTinyInteger('verify_type')->default(0); // 0=finger,15=face,etc
            $table->boolean('is_processed')->default(false);
            $table->timestamp('processed_at')->nullable();
            $table->text('error_notes')->nullable();
            $table->timestamps();

            $table->unique(['device_id', 'biometric_uid', 'punch_time']);
            $table->index(['is_processed', 'punch_time']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('device_logs');
    }
};
