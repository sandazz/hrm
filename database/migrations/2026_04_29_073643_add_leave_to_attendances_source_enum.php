<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("ALTER TABLE attendances MODIFY COLUMN source ENUM('manual','device','import','leave') NOT NULL DEFAULT 'manual'");
    }

    public function down(): void
    {
        DB::statement("ALTER TABLE attendances MODIFY COLUMN source ENUM('manual','device','import') NOT NULL DEFAULT 'manual'");
    }
};
