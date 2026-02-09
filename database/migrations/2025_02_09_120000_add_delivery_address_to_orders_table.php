<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('delivery_postal_code_1', 10)->nullable()->after('stripe_payment_intent_id');
            $table->string('delivery_postal_code_2', 10)->nullable()->after('delivery_postal_code_1');
            $table->string('delivery_prefecture', 255)->nullable()->after('delivery_postal_code_2');
            $table->string('delivery_city', 255)->nullable()->after('delivery_prefecture');
            $table->string('delivery_street', 255)->nullable()->after('delivery_city');
            $table->string('delivery_building', 255)->nullable()->after('delivery_street');
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn([
                'delivery_postal_code_1',
                'delivery_postal_code_2',
                'delivery_prefecture',
                'delivery_city',
                'delivery_street',
                'delivery_building',
            ]);
        });
    }
};
