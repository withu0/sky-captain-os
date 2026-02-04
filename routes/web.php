<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('landing');
})->name('home');

Route::get('product/{variant?}', function (string $variant = '5') {
    $variant = in_array($variant, ['5', '10', '20'], true) ? $variant : '5';
    return Inertia::render('product', ['variant' => $variant]);
})->name('product');

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
    $checkoutReturnUrl = $fromCheckout ? "/checkout?variant={$variant}&type={$type}" : '/checkout';
    return Inertia::render('addresses', [
        'fromCheckout' => $fromCheckout,
        'checkoutReturnUrl' => $checkoutReturnUrl,
    ]);
})->name('addresses');

Route::get('cart', function () {
    return Inertia::render('cart');
})->name('cart');

Route::get('purchase-history', function () {
    return Inertia::render('purchase-history');
})->name('purchase-history');

Route::get('order/complete', function () {
    $orderNumber = request()->query('order', '00000000');
    return Inertia::render('order-complete', ['orderNumber' => $orderNumber]);
})->name('order-complete');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('admin', function () {
    if (Auth::check()) {
        return redirect('/admin/users');
    }
    return Inertia::render('admin/login');
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
    ])->onlyInput('email');
})->name('admin.login.store');

Route::post('admin/logout', function (Request $request) {
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect('/admin/logged-out');
})->name('admin.logout');

Route::get('admin/logged-out', function () {
    return Inertia::render('admin/logged-out');
})->name('admin.logged-out');

Route::middleware(['admin.auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('users', function () {
        $users = [
            ['id' => '1', 'name' => '天空 太郎', 'email' => 'xxx@konnichi.com', 'lastPurchaseDate' => '2025年02月10日', 'status' => '6ヶ月定期購入中'],
            ['id' => '2', 'name' => '天空 太郎', 'email' => 'xxx@konnichi.com', 'lastPurchaseDate' => '2025年02月10日', 'status' => null],
            ['id' => '3', 'name' => '天空 太郎', 'email' => 'xxx@konnichi.com', 'lastPurchaseDate' => '2025年02月10日', 'status' => null],
            ['id' => '4', 'name' => '天空 太郎', 'email' => 'xxx@konnichi.com', 'lastPurchaseDate' => '2025年02月10日', 'status' => '6ヶ月定期購入中'],
        ];
        return Inertia::render('admin/users/index', ['users' => $users]);
    })->name('users.index');

    Route::get('users/{id}', function (string $id) {
        $user = [
            'id' => $id,
            'name' => '天空 太郎',
            'email' => 'xxx@konnichi.com',
            'lastPurchaseDate' => '2025年02月10日',
            'phone' => '090-0000-1234',
            'shippingAddress' => '大阪府守口市佐太東町3-101-5',
        ];
        $purchases = [
            ['productName' => '天空隊長10袋セット', 'amount' => '2,240円', 'purchaseDate' => '2025年02月10日', 'purchaseType' => '6ヶ月定期購入'],
            ['productName' => '天空隊長10袋セット', 'amount' => '2,240円', 'purchaseDate' => '2025年02月10日', 'purchaseType' => '通常購入'],
            ['productName' => '天空隊長10袋セット', 'amount' => '2,240円', 'purchaseDate' => '2025年02月10日', 'purchaseType' => '通常購入'],
            ['productName' => '天空隊長10袋セット', 'amount' => '2,240円', 'purchaseDate' => '2025年02月10日', 'purchaseType' => '通常購入'],
        ];
        return Inertia::render('admin/users/show', ['user' => $user, 'purchases' => $purchases]);
    })->name('users.show');

    Route::get('orders', function () {
        $orders = [
            ['orderNo' => '00000000', 'productName' => '天空隊長10袋セット', 'orderDate' => '2025年02月10日', 'status' => '6ヶ月定期購入中'],
            ['orderNo' => '天空太郎', 'productName' => 'xxx@konnichi.com', 'orderDate' => '2025年02月10日', 'status' => null],
            ['orderNo' => '天空太郎', 'productName' => 'xxx@konnichi.com', 'orderDate' => '2025年02月10日', 'status' => null],
            ['orderNo' => '天空太郎', 'productName' => 'xxx@konnichi.com', 'orderDate' => '2025年02月10日', 'status' => '6ヶ月定期購入中'],
            ['orderNo' => '天空太郎', 'productName' => 'xxx@konnichi.com', 'orderDate' => '2025年02月10日', 'status' => null],
        ];
        return Inertia::render('admin/orders/index', ['orders' => $orders]);
    })->name('orders.index');
});

Route::get('logged-out', function () {
    return Inertia::render('auth/logged-out');
})->name('logged-out');

require __DIR__.'/settings.php';
