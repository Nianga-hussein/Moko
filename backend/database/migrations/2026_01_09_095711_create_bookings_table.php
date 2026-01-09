<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('item_id')->nullable()->constrained('items')->nullOnDelete();
            $table->string('booking_type');
            $table->string('status')->default('pending');
            $table->date('scheduled_date')->nullable();
            $table->time('scheduled_time')->nullable();
            $table->decimal('total_amount', 12, 2)->nullable();
            $table->string('payment_status')->default('unpaid');
            $table->string('payment_method')->default('cash');
            $table->text('delivery_address')->nullable();
            $table->text('user_notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
