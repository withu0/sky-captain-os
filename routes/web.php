<?php

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

    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
