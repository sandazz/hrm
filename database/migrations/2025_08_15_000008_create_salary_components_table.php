<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('salary_components', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('employees')->cascadeOnDelete();
            $table->enum('component_type', [
                'transport_allowance',
                'meal_allowance',
                'housing_allowance',
                'medical_allowance',
                'other_allowance',
                'other_deduction',
            ]);
            $table->string('name');                             // Custom label
            $table->decimal('amount', 12, 2)->default(0);       // Fixed amount
            $table->boolean('is_percentage')->default(false);   // % of base salary?
            $table->decimal('percentage', 5, 2)->nullable();    // if is_percentage
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('salary_components');
    }
};
