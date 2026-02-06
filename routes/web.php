<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Pages
|--------------------------------------------------------------------------
*/

Route::get('/', fn () => Inertia::render('landing'))->name('home');

Route::get('product/{variant?}', function (string $variant = '5') {
    $variant = in_array($variant, ['5', '10', '20'], true) ? $variant : '5';
    return Inertia::render('product', ['variant' => $variant]);
})->name('product');

Route::get('cart', fn () => Inertia::render('cart'))->name('cart');

Route::get('checkout', function () {
    $variant = request()->query('variant', '5');
    $variant = in_array($variant, ['5', '10', '20'], true) ? $variant : '5';

    $purchaseType = request()->query('type', 'subscription');
    $purchaseType = $purchaseType === 'normal' ? 'normal' : 'subscription';

    $addressId = request()->query('address');

    $addresses = [
        ['id' => '1', 'surname' => '山田', 'givenName' => '太郎', 'phone' => '0900000000', 'postal1' => '980', 'postal2' => '1234', 'prefecture' => '東京都', 'city' => '○○区△△', 'street' => '1-23-4', 'building' => ''],
        ['id' => '2', 'surname' => '山田', 'givenName' => '太郎', 'phone' => '0900000000', 'postal1' => '000', 'postal2' => '1234', 'prefecture' => '沖縄県', 'city' => '那覇市おもろまち', 'street' => '1-23-4', 'building' => 'おもろまちマンション1304'],
    ];

    return Inertia::render('checkout', [
        'variant' => $variant,
        'purchaseType' => $purchaseType,
        'addresses' => $addresses,
        'selectedAddressId' => $addressId,
    ]);
})->name('checkout');

Route::get('addresses', function () {
    $fromCheckout = request()->query('from') === 'checkout';
    $variant = request()->query('variant', '5');
    $type = request()->query('type', 'subscription');

    return Inertia::render('addresses', [
        'fromCheckout' => $fromCheckout,
        'checkoutReturnUrl' => $fromCheckout
            ? "/checkout?variant={$variant}&type={$type}"
            : '/checkout',
    ]);
})->name('addresses');

Route::get('purchase-history', fn () => Inertia::render('purchase-history'))
    ->name('purchase-history');

Route::get('order/complete', function () {
    return Inertia::render('order-complete', [
        'orderNumber' => request()->query('order', '00000000'),
    ]);
})->name('order-complete');

/*
|--------------------------------------------------------------------------
| Auth (Public – Guest)
|--------------------------------------------------------------------------
*/

Route::middleware('guest')->prefix('auth')->group(function () {
    Route::get('login', fn () => Inertia::render('auth/login'))->name('login');
    Route::get('register', fn () => Inertia::render('auth/register'))->name('register');
    Route::get('forgot-password', fn () => Inertia::render('auth/forgot-password'))->name('password.request');
    Route::get('reset-password/{token}', fn ($token) =>
        Inertia::render('auth/reset-password', ['token' => $token])
    )->name('password.reset');
});

/*
|--------------------------------------------------------------------------
| Auth (Protected)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');
});

/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/

Route::post('logout', function (Request $request) {
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return redirect()->route('logged-out');
})->name('logout');

Route::get('logged-out', fn () => Inertia::render('auth/logged-out'))
    ->name('logged-out');

/*
|--------------------------------------------------------------------------
| Admin Auth
|--------------------------------------------------------------------------
*/

Route::get('admin', function () {
    return Auth::check()
        ? redirect('/admin/users')
        : Inertia::render('admin/login');
})->name('admin.login');

Route::post('admin/login', function (Request $request) {
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (Auth::attempt($credentials, $request->boolean('remember'))) {
        $request->session()->regenerate();
        return redirect()->intended('/admin/users');
    }

    return back()->withErrors([
        'email' => __('The provided credentials do not match our records.'),
    ]);
})->name('admin.login.store');

Route::post('admin/logout', function (Request $request) {
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect('/admin/logged-out');
})->name('admin.logout');

Route::get('admin/logged-out', fn () => Inertia::render('admin/logged-out'))
    ->name('admin.logged-out');

/*
|--------------------------------------------------------------------------
| Admin (Protected)
|--------------------------------------------------------------------------
*/

Route::middleware('admin.auth')->prefix('admin')->name('admin.')->group(function () {
    Route::get('users', fn () =>
        Inertia::render('admin/users/index', ['users' => []])
    )->name('users.index');

    Route::get('users/{id}', fn ($id) =>
        Inertia::render('admin/users/show', ['id' => $id])
    )->name('users.show');

    Route::get('orders', fn () =>
        Inertia::render('admin/orders/index', ['orders' => []])
    )->name('orders.index');
});

require __DIR__ . '/settings.php';
