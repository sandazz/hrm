<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->string('fingerprint_uid')->nullable()->unique()->after('employee_id')
                ->comment('Unique ID registered in the fingerprint / biometric device');
        });
    }

    public function down(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->dropUnique(['fingerprint_uid']);
            $table->dropColumn('fingerprint_uid');
        });
    }
};
