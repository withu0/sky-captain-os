<?php

use App\Http\Controllers\CheckoutController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('landing');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('purchase', function (Request $request) {
        $quantity = (int) $request->query('quantity', 5);
        if (! in_array($quantity, [5, 10, 20], true)) {
            $quantity = 5;
        }
        return Inertia::render('purchase', ['quantity' => $quantity]);
    })->name('purchase');

    Route::get('purchase-history', function (Request $request) {
        $orders = $request->user()
            ->orders()
            ->with('orderItems')
            ->orderByDesc('created_at')
            ->get([
                'id', 'order_number', 'amount', 'quantity', 'count', 'mode', 'status', 'shipped_at', 'created_at',
                'delivery_postal_code_1', 'delivery_postal_code_2', 'delivery_prefecture', 'delivery_city', 'delivery_street', 'delivery_building',
            ]);
        return Inertia::render('purchase-history', [
            'orders' => $orders,
        ]);
    })->name('purchase-history');

    Route::get('cart', function () {
        return Inertia::render('cart');
    })->name('cart');

    Route::post('cart/checkout', [CheckoutController::class, 'cartCheckout'])
        ->name('cart.checkout');

    Route::get('checkout', function (Request $request) {
        $fromCart = $request->boolean('from_cart');
        $cartItems = [];
        if ($fromCart) {
            $cartItems = $request->session()->get('checkout_cart', []);
            $request->session()->forget('checkout_cart');
        }
        if ($fromCart && count($cartItems) > 0) {
            return Inertia::render('checkout', [
                'fromCart' => true,
                'cartItems' => $cartItems,
                'stripePublishableKey' => config('services.stripe.publishable'),
                'addresses' => $request->user()->addresses()->orderBy('created_at')->get(),
            ]);
        }
        $quantity = (int) $request->query('quantity', 5);
        if (! in_array($quantity, [5, 10, 20], true)) {
            $quantity = 5;
        }
        $mode = $request->query('mode', 'subscription');
        if (! in_array($mode, ['subscription', 'normal'], true)) {
            $mode = 'subscription';
        }
        $count = (int) $request->query('count', 1);
        if ($count < 1) {
            $count = 1;
        }
        return Inertia::render('checkout', [
            'fromCart' => false,
            'quantity' => $quantity,
            'mode' => $mode,
            'count' => $count,
            'stripePublishableKey' => config('services.stripe.publishable'),
            'addresses' => $request->user()->addresses()->orderBy('created_at')->get(),
        ]);
    })->name('checkout');

    Route::post('checkout/create-payment-intent', [CheckoutController::class, 'createPaymentIntent'])
        ->name('checkout.create-payment-intent');

    Route::post('checkout/complete-order', [CheckoutController::class, 'completeOrder'])
        ->name('checkout.complete-order');

    Route::get('checkout/addresses', function (Request $request) {
        return Inertia::render('addresses/edit', [
            'addresses' => $request->user()->addresses()->orderBy('created_at')->get(),
            'returnTo' => $request->query('return_to'),
        ]);
    })->name('checkout.addresses.edit');

    Route::get('purchase-complete', function (Request $request) {
        $orderNumber = $request->session()->pull('order_number');
        return Inertia::render('purchase-complete', [
            'orderNumber' => $orderNumber,
        ]);
    })->name('purchase-complete');

    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
