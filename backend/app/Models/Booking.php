<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'item_id',
        'booking_type',
        'status',
        'scheduled_date',
        'scheduled_time',
        'total_amount',
        'payment_status',
        'payment_method',
        'delivery_address',
        'user_notes',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
