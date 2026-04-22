<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('shifts', function (Blueprint $table) {
            $table->id();
            $table->string('name');                             // e.g. "Morning Shift"
            $table->time('start_time');
            $table->time('end_time');
            $table->unsignedSmallInteger('max_late_minutes')->default(15);
            $table->unsignedSmallInteger('grace_period_minutes')->default(5);
            $table->decimal('overtime_after_hours', 4, 2)->default(8.00);
            $table->boolean('is_default')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('shifts');
    }
};
