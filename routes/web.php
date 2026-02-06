<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('landing');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('purchase', function () {
        return Inertia::render('purchase');
    })->name('purchase');

    Route::get('purchase-history', function () {
        return Inertia::render('purchase-history');
    })->name('purchase-history');

    Route::get('purchase-procedure', function () {
        return Inertia::render('purchase-procedure');
    })->name('purchase-procedure');

    Route::get('purchase-procedure/addresses', function (Request $request) {
        return Inertia::render('addresses/edit', [
            'addresses' => $request->user()->addresses()->orderBy('created_at')->get(),
        ]);
    })->name('purchase.addresses.edit');

    Route::get('purchase-complete', function () {
        return Inertia::render('purchase-complete');
    })->name('purchase-complete');

    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
