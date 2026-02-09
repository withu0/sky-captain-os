<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->unsignedTinyInteger('quantity')->default(5)->after('amount'); // 5, 10, or 20 (product variant)
            $table->unsignedInteger('count')->default(1)->after('quantity'); // number of sets
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['quantity', 'count']);
        });
    }
};
