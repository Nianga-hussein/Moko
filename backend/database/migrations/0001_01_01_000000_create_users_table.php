<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('full_name', 100);
            $table->string('email', 100)->unique()->nullable();
            $table->string('phone_number', 20)->unique();
            $table->string('password_hash')->nullable();
            $table->enum('role', ['admin','client','provider','driver'])->default('client');
            $table->string('avatar_url')->nullable();
            $table->text('address')->nullable();
            $table->string('city', 50)->nullable();
            $table->boolean('is_verified')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
