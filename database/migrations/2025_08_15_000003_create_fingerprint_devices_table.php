<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fingerprint_devices', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('ip_address');
            $table->unsignedSmallInteger('port')->default(4370);
            $table->string('device_password')->default('0');
            $table->string('serial_number')->nullable();
            $table->string('location')->nullable();
            $table->enum('connection_type', ['tcp', 'udp'])->default('tcp');
            $table->unsignedSmallInteger('timeout_seconds')->default(10);
            $table->unsignedSmallInteger('sync_interval_minutes')->default(30);
            $table->timestamp('last_synced_at')->nullable();
            $table->unsignedInteger('last_sync_records')->default(0);
            $table->boolean('is_active')->default(true);
            $table->enum('status', ['online', 'offline', 'error', 'syncing'])->default('offline');
            $table->text('last_error')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fingerprint_devices');
    }
};
