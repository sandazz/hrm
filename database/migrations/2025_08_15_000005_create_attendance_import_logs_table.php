<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('attendance_import_logs', function (Blueprint $table) {
            $table->id();
            $table->string('filename');
            $table->foreignId('imported_by')->constrained('users')->cascadeOnDelete();
            $table->unsignedInteger('total_records')->default(0);
            $table->unsignedInteger('success_count')->default(0);
            $table->unsignedInteger('error_count')->default(0);
            $table->unsignedInteger('duplicate_count')->default(0);
            $table->json('error_details')->nullable();
            $table->enum('status', ['pending', 'processing', 'completed', 'failed'])->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attendance_import_logs');
    }
};
