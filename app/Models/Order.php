<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'order_number',
        'amount',
        'quantity',
        'count',
        'mode',
        'status',
        'shipped_at',
        'currency',
        'stripe_payment_intent_id',
        'delivery_postal_code_1',
        'delivery_postal_code_2',
        'delivery_prefecture',
        'delivery_city',
        'delivery_street',
        'delivery_building',
    ];

    protected function casts(): array
    {
        return [
            'shipped_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function orderItems(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Generate a unique order number: ORD-YYYYMMDD-XXXX
     */
    public static function generateOrderNumber(): string
    {
        do {
            $number = 'ORD-' . date('Ymd') . '-' . strtoupper(\Illuminate\Support\Str::random(6));
        } while (static::where('order_number', $number)->exists());

        return $number;
    }
}
