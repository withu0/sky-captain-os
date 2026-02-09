<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CheckoutController extends Controller
{
    /**
     * Store cart items in session and redirect to checkout (buy-all flow).
     */
    public function cartCheckout(Request $request): RedirectResponse
    {
        $items = $request->input('items');
        if (is_string($items)) {
            $items = json_decode($items, true) ?: [];
        }
        $request->merge(['items' => $items]);
        $validated = $request->validate([
            'items' => ['required', 'array'],
            'items.*.quantity' => ['required', 'integer', 'in:5,10,20'],
            'items.*.count' => ['required', 'integer', 'min:1', 'max:999'],
            'items.*.mode' => ['required', 'string', 'in:subscription,normal'],
        ]);
        $request->session()->put('checkout_cart', $validated['items']);
        return redirect()->route('checkout', ['from_cart' => 1]);
    }
    /**
     * Create a Stripe PaymentIntent for the given amount (JPY).
     * Returns client_secret for frontend to confirm the payment.
     */
    public function createPaymentIntent(Request $request): JsonResponse
    {
        $secret = config('services.stripe.secret');
        if (! $secret) {
            return response()->json(['error' => 'Stripe is not configured.'], 500);
        }

        $validated = $request->validate([
            'amount' => ['required', 'integer', 'min:1', 'max:9999999'],
        ]);

        $amount = $validated['amount'];
        // JPY has no subunits; Stripe expects amount in yen for currency 'jpy'

        $params = [
            'amount' => $amount,
            'currency' => 'jpy',
            'automatic_payment_methods[enabled]' => 'true',
        ];

        $user = $request->user();
        if ($user?->email) {
            $params['receipt_email'] = $user->email;
        }

        $response = Http::withToken($secret)
            ->asForm()
            ->post('https://api.stripe.com/v1/payment_intents', $params);

        if (! $response->successful()) {
            return response()->json(
                ['error' => $response->json('error.message', 'Failed to create payment intent')],
                $response->status()
            );
        }

        $body = $response->json();
        $clientSecret = $body['client_secret'] ?? null;

        if (! $clientSecret) {
            return response()->json(['error' => 'Invalid response from Stripe.'], 500);
        }

        return response()->json(['clientSecret' => $clientSecret]);
    }

    /**
     * Create an order after successful payment and store order_number in session.
     * Single-item flow: quantity, count, mode. Cart (buy-all) flow: items array.
     */
    public function completeOrder(Request $request): JsonResponse
    {
        $user = $request->user();
        if (! $user) {
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }

        $fromCart = $request->has('items') && is_array($request->input('items')) && count($request->input('items')) > 0;

        if ($fromCart) {
            $validated = $request->validate([
                'amount' => ['required', 'integer', 'min:1', 'max:9999999'],
                'items' => ['required', 'array'],
                'items.*.quantity' => ['required', 'integer', 'in:5,10,20'],
                'items.*.count' => ['required', 'integer', 'min:1', 'max:999'],
                'items.*.mode' => ['required', 'string', 'in:subscription,normal'],
                'items.*.amount' => ['required', 'integer', 'min:1', 'max:9999999'],
                'address_id' => ['required', 'integer'],
                'payment_intent_id' => ['nullable', 'string', 'max:255'],
            ]);
            $address = Address::where('user_id', $user->id)->findOrFail($validated['address_id']);
            $first = $validated['items'][0];

            $order = Order::create([
                'user_id' => $user->id,
                'order_number' => Order::generateOrderNumber(),
                'amount' => $validated['amount'],
                'quantity' => $first['quantity'],
                'count' => array_sum(array_column($validated['items'], 'count')),
                'mode' => $first['mode'],
                'status' => 'preparing',
                'currency' => 'jpy',
                'stripe_payment_intent_id' => $validated['payment_intent_id'] ?? null,
                'delivery_postal_code_1' => $address->postal_code_1,
                'delivery_postal_code_2' => $address->postal_code_2,
                'delivery_prefecture' => $address->prefecture,
                'delivery_city' => $address->city,
                'delivery_street' => $address->street,
                'delivery_building' => $address->building,
            ]);
            foreach ($validated['items'] as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'quantity' => $item['quantity'],
                    'count' => $item['count'],
                    'mode' => $item['mode'],
                    'amount' => $item['amount'],
                ]);
            }
        } else {
            $validated = $request->validate([
                'amount' => ['required', 'integer', 'min:1', 'max:9999999'],
                'quantity' => ['required', 'integer', 'in:5,10,20'],
                'count' => ['required', 'integer', 'min:1', 'max:999'],
                'mode' => ['required', 'string', 'in:subscription,normal'],
                'address_id' => ['required', 'integer'],
                'payment_intent_id' => ['nullable', 'string', 'max:255'],
            ]);
            $address = Address::where('user_id', $user->id)->findOrFail($validated['address_id']);

            $order = Order::create([
                'user_id' => $user->id,
                'order_number' => Order::generateOrderNumber(),
                'amount' => $validated['amount'],
                'quantity' => $validated['quantity'],
                'count' => $validated['count'],
                'mode' => $validated['mode'],
                'status' => 'preparing',
                'currency' => 'jpy',
                'stripe_payment_intent_id' => $validated['payment_intent_id'] ?? null,
                'delivery_postal_code_1' => $address->postal_code_1,
                'delivery_postal_code_2' => $address->postal_code_2,
                'delivery_prefecture' => $address->prefecture,
                'delivery_city' => $address->city,
                'delivery_street' => $address->street,
                'delivery_building' => $address->building,
            ]);
            OrderItem::create([
                'order_id' => $order->id,
                'quantity' => $validated['quantity'],
                'count' => $validated['count'],
                'mode' => $validated['mode'],
                'amount' => $validated['amount'],
            ]);
        }

        $request->session()->put('order_number', $order->order_number);

        return response()->json(['order_number' => $order->order_number]);
    }
}
