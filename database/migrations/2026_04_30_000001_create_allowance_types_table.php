<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('allowance_types', function (Blueprint $table) {
            $table->id();
            $table->enum('component_type', [
                'transport_allowance',
                'meal_allowance',
                'housing_allowance',
                'medical_allowance',
                'other_allowance',
            ]);
            $table->string('name');
            $table->decimal('amount', 12, 2)->default(0);
            $table->boolean('is_percentage')->default(false);
            $table->decimal('percentage', 5, 2)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('employee_allowance_type', function (Blueprint $table) {
            $table->foreignId('employee_id')->constrained('employees')->cascadeOnDelete();
            $table->foreignId('allowance_type_id')->constrained('allowance_types')->cascadeOnDelete();
            $table->primary(['employee_id', 'allowance_type_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employee_allowance_type');
        Schema::dropIfExists('allowance_types');
    }
};
