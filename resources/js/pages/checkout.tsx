import AppLayout from '@/layouts/app-layout';
import { clearCart } from '@/lib/cart';
import { formatYen, getVariant } from '@/lib/product-variants';
import { toUrl } from '@/lib/utils';
import { purchase, purchaseComplete } from '@/routes';
import { Head, Link, router, usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ChevronLeft } from 'lucide-react';
import { useMemo, useState } from 'react';

type PurchaseMode = 'subscription' | 'normal';

type Address = {
    id: number;
    last_name: string;
    first_name: string;
    phone: string;
    postal_code_1: string;
    postal_code_2: string;
    prefecture: string;
    city: string;
    street: string;
    building: string | null;
};

function formatAddressLabel(addr: Address): string {
    const postal = `${addr.postal_code_1}-${addr.postal_code_2}`;
    const line2 = [addr.prefecture, addr.city, addr.street].join('') + (addr.building ? ` ${addr.building}` : '');
    return `〒${postal} ${line2}`;
}

const CARD_ELEMENT_OPTIONS = {
    hidePostalCode: true,
    disableLink: true,
    style: {
        base: {
            fontSize: '14px',
            color: '#231C1D',
            '::placeholder': { color: '#9ca3af' },
        },
        invalid: {
            color: '#E00000',
        },
    },
};

/** Map Stripe error code/message to Japanese for display. */
function stripeErrorToJapanese(error: { code?: string; message?: string } | string | null): string {
    if (!error) return '支払いに失敗しました。';
    const code = typeof error === 'string' ? undefined : error?.code;
    const messages: Record<string, string> = {
        card_declined: 'カードが拒否されました。別のカードをお試しください。',
        expired_card: 'カードの有効期限が切れています。',
        incorrect_cvc: 'セキュリティコード（CVC）が正しくありません。',
        invalid_number: 'カード番号が正しくありません。',
        invalid_expiry_month: '有効期限（月）が正しくありません。',
        invalid_expiry_year: '有効期限（年）が正しくありません。',
        invalid_cvc: 'セキュリティコード（CVC）が正しくありません。',
        processing_error: '処理中にエラーが発生しました。しばらくしてからお試しください。',
        rate_limit_error: 'リクエストが多すぎます。しばらくしてからお試しください。',
        authentication_required: '本人確認が必要です。カード会社の認証画面で手続きを完了してください。',
        insufficient_funds: '残高が不足しています。',
    };
    if (code && messages[code]) return messages[code];
    if (typeof error === 'string') return error;
    return '支払いに失敗しました。カード情報をご確認のうえ、再度お試しください。';
}

type CartCheckoutItem = { quantity: 5 | 10 | 20; mode: PurchaseMode; count: number };

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [address, setAddress] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [addressError, setAddressError] = useState<string>('');
    const [paymentError, setPaymentError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fromCart = (usePage<SharedData>().props.fromCart as boolean | undefined) ?? false;
    const cartItems = (usePage<SharedData>().props.cartItems as CartCheckoutItem[] | undefined) ?? [];
    const quantity = (usePage<SharedData>().props.quantity as number | undefined) ?? 5;
    const mode = (usePage<SharedData>().props.mode as PurchaseMode | undefined) ?? 'subscription';
    const count = (usePage<SharedData>().props.count as number | undefined) ?? 1;
    const addresses = (usePage<SharedData>().props.addresses as Address[] | undefined) ?? [];

    const isCartFlow = fromCart && cartItems.length > 0;
    const { totalPrice, checkoutItems } = (() => {
        if (isCartFlow) {
            const items: { quantity: 5 | 10 | 20; count: number; mode: PurchaseMode; amount: number }[] = [];
            let total = 0;
            for (const item of cartItems) {
                const variant = getVariant(item.quantity);
                const unitPrice = item.mode === 'subscription' ? variant.subscription.total : variant.normal.total;
                const lineAmount = unitPrice * item.count;
                items.push({ quantity: item.quantity, count: item.count, mode: item.mode, amount: lineAmount });
                total += lineAmount;
            }
            return { totalPrice: total, checkoutItems: items };
        }
        const variant = getVariant(quantity);
        const isSubscription = mode === 'subscription';
        const total = isSubscription
            ? variant.subscription.total
            : variant.normal.total * Math.max(1, count);
        return { totalPrice: total, checkoutItems: null };
    })();

    const variant = getVariant(quantity);
    const isSubscription = mode === 'subscription';

    const handleNext = async () => {
        let hasError = false;
        if (!address.trim()) {
            setAddressError('住所を選択してください。');
            hasError = true;
        } else {
            setAddressError('');
        }
        if (paymentMethod !== 'credit') {
            setPaymentError('お支払い方法を選択してください。');
            hasError = true;
        } else {
            setPaymentError('');
        }
        if (hasError) return;

        if (paymentMethod === 'credit' && stripe && elements) {
            setIsSubmitting(true);
            setPaymentError('');
            try {
                const res = await fetch('/checkout/create-payment-intent', {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    body: JSON.stringify({ amount: totalPrice }),
                });
                const data = await res.json();
                if (!res.ok) {
                    setPaymentError(stripeErrorToJapanese(data.error ?? '支払いの準備に失敗しました。'));
                    setIsSubmitting(false);
                    return;
                }
                const cardElement = elements.getElement(CardElement);
                if (!cardElement) {
                    setPaymentError('カード情報を入力してください。');
                    setIsSubmitting(false);
                    return;
                }
                const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
                    payment_method: { card: cardElement },
                });
                if (error) {
                    setPaymentError(stripeErrorToJapanese(error));
                    setIsSubmitting(false);
                    return;
                }
                const completeBody = isCartFlow && checkoutItems
                    ? {
                          amount: totalPrice,
                          items: checkoutItems,
                          address_id: address ? Number(address) : undefined,
                          payment_intent_id: paymentIntent?.id ?? undefined,
                      }
                    : {
                          amount: totalPrice,
                          quantity,
                          count: Math.max(1, count),
                          mode: isSubscription ? 'subscription' : 'normal',
                          address_id: address ? Number(address) : undefined,
                          payment_intent_id: paymentIntent?.id ?? undefined,
                      };
                const completeRes = await fetch('/checkout/complete-order', {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    body: JSON.stringify(completeBody),
                });
                if (!completeRes.ok) {
                    setPaymentError('注文の記録に失敗しました。');
                    setIsSubmitting(false);
                    return;
                }
                if (isCartFlow) {
                    clearCart();
                }
                router.visit(purchaseComplete());
            } catch {
                setPaymentError('通信エラーが発生しました。');
                setIsSubmitting(false);
            }
        } else {
            router.visit(purchaseComplete());
        }
    };

    return (
        <>
            <section className="rounded-[3px] border border-[#D9D9D9] bg-white p-4 sm:p-6 shadow-sm">
                <h2 className="text-sm sm:text-base font-bold text-[#231C1D]">
                    1. お届け先
                </h2>
                <p className="mt-2 text-[13px] sm:text-[14px] text-[#231C1D]">
                    商品をお届けする住所を入力してください。
                </p>
                <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <select
                        name="address"
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value);
                            setAddressError('');
                        }}
                        className={`min-w-0 flex-1 rounded-[3px] border bg-white px-3 py-2.5 text-[13px] sm:text-[14px] text-[#231C1D] focus:outline-none focus:ring-2 focus:ring-[#D4AC4C]/40 ${
                            addressError ? 'border-[#E00000]' : 'border-[#D9D9D9]'
                        }`}
                    >
                        <option value="">選択してください</option>
                        {addresses.map((addr) => (
                            <option key={addr.id} value={String(addr.id)}>
                                {formatAddressLabel(addr)}
                            </option>
                        ))}
                    </select>
                    <Link
                        href={`/checkout/addresses?return_to=${encodeURIComponent(
                            `/checkout?quantity=${quantity}&mode=${mode}&count=${count}${fromCart ? '&from_cart=1' : ''}`
                        )}`}
                        className="shrink-0 text-[13px] sm:text-[14px] font-medium text-[#2563eb] hover:underline"
                    >
                        変更
                    </Link>
                </div>
                {addressError && (
                    <p className="mt-2 text-[12px] sm:text-[13px] text-[#E00000]">
                        {addressError}
                    </p>
                )}
            </section>

            <section className="rounded-[3px] border border-[#D9D9D9] bg-white p-4 sm:p-6 shadow-sm">
                <h2 className="text-sm sm:text-base font-bold text-[#231C1D]">
                    2. お支払い方法
                </h2>
                <p className="mt-2 text-[13px] sm:text-[14px] text-[#231C1D]">
                    お支払方法を下記より選択してください。
                </p>
                <label
                    className={`mt-3 flex cursor-pointer items-center gap-2 sm:gap-3 rounded-[3px] border bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#D4AC4C]/40 ${
                        paymentError
                            ? 'border-[#E00000]'
                            : paymentMethod === 'credit'
                              ? 'border-[#93C5FD]'
                              : 'border-[#D9D9D9]'
                    }`}
                >
                    <input
                        type="radio"
                        name="payment"
                        value="credit"
                        checked={paymentMethod === 'credit'}
                        onChange={() => {
                            setPaymentMethod('credit');
                            setPaymentError('');
                        }}
                        className="size-4 shrink-0 border-[#D9D9D9] text-[#2563eb] focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="text-[13px] sm:text-[14px] text-[#231C1D]">
                        クレジットカード
                    </span>
                </label>
                {paymentMethod === 'credit' && (
                    <div className="mt-3 rounded-[3px] border border-[#D9D9D9] bg-white px-3 sm:px-4 py-3">
                        <p className="text-[12px] sm:text-[13px] text-[#666666] mb-2">
                            カード情報を入力してください
                        </p>
                        <div className="rounded-[3px] border border-[#D9D9D9] bg-[#fafafa] px-3 py-2.5 min-h-[40px]">
                            <CardElement options={CARD_ELEMENT_OPTIONS} />
                        </div>
                    </div>
                )}
                {paymentError && (
                    <p className="mt-2 text-[12px] sm:text-[13px] text-[#E00000]">
                        {paymentError}
                    </p>
                )}
            </section>

            <section className="rounded-[3px] border border-[#D9D9D9] bg-white p-4 sm:p-6 shadow-sm">
                <h2 className="text-sm sm:text-base font-bold text-[#231C1D]">
                    3. 商品詳細
                </h2>
                {isCartFlow && checkoutItems ? (
                    <div className="mt-4 space-y-3">
                        {checkoutItems.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex flex-wrap items-center justify-between gap-2 py-2 border-b border-[#E5E5E5] last:border-b-0 text-[13px] sm:text-[14px] text-[#231C1D]"
                            >
                                <span className="font-medium flex flex-wrap items-center gap-2">
                                    {getVariant(item.quantity).label}
                                    <span
                                        className={`inline-flex items-center rounded border px-2 py-1 text-[11px] sm:text-[12px] font-medium ${
                                            item.mode === 'subscription'
                                                ? 'border-[#D4AC4C] bg-[#F8F2E2] text-[#D4AC4C]'
                                                : 'border-[#E00000] bg-white text-[#E00000]'
                                        }`}
                                    >
                                        {item.mode === 'subscription' ? '6ヶ月定期購入' : '通常購入'}
                                    </span>
                                    <span className="text-[12px] font-normal text-[#666]">
                                        × {item.count}
                                    </span>
                                </span>
                                <span className="font-medium">{formatYen(item.amount)}円</span>
                            </div>
                        ))}
                        <div className="flex justify-between items-center pt-2 font-medium text-[#231C1D]">
                            <span>合計</span>
                            <span>{formatYen(totalPrice)}円</span>
                        </div>
                    </div>
                ) : (
                    <div className="mt-4 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                        <div className="flex w-full max-w-[200px] sm:max-w-[240px] lg:w-[260px] lg:max-w-none shrink-0 items-center justify-center border-2 border-border bg-transparent p-2 sm:p-3 mx-auto lg:mx-0">
                            <div className="relative w-full aspect-[2/1] overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <img
                                        src="/images/スクリーンショット.png"
                                        alt={variant.label}
                                        className="h-full w-auto max-w-full object-contain"
                                    />
                                </div>
                                <div
                                    className="absolute inset-0 flex items-center justify-center"
                                    aria-hidden
                                >
                                    <div className="h-full w-full bg-[#D9D9D9]/60" />
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span
                                        className="font-bold text-[14px] sm:text-[18px] lg:text-[22px]"
                                        style={{
                                            color: '#DCC364',
                                            WebkitTextStroke: '2px #000000',
                                            paintOrder: 'stroke fill',
                                        }}
                                    >
                                        商品画像
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5 min-w-0 lg:ml-8">
                            <span className="text-[13px] sm:text-[14px] font-medium text-[#231C1D]">
                                {variant.label}
                            </span>
                            <span className="text-[13px] sm:text-[14px] font-medium text-[#231C1D]">
                                {formatYen(totalPrice)}円
                            </span>
                            <span
                                className={`inline-flex w-fit items-center rounded border px-2 py-1 text-[11px] sm:text-[12px] font-medium ${
                                    isSubscription
                                        ? 'border-[#D4AC4C] bg-[#F8F2E2] text-[#D4AC4C]'
                                        : 'border-[#E00000] bg-white text-[#E00000]'
                                }`}
                            >
                                {isSubscription ? '6ヶ月定期購入' : '通常購入'}
                            </span>
                            {!isSubscription && (
                                <span className="text-[13px] sm:text-[14px] text-[#231C1D]">
                                    数量：{count}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </section>

            <div className="pt-1">
                <button
                    type="button"
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="w-full rounded-[4px] bg-[#D4AC4C] px-6 sm:px-8 py-2.5 text-[14px] sm:text-base font-medium text-white hover:bg-[#D4AC4C]/90 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? '処理中...' : '次へ'}
                </button>
            </div>
        </>
    );
}

export default function Checkout() {
    const stripePublishableKey = usePage<SharedData>().props.stripePublishableKey as string | undefined;
    const stripePromise = useMemo(
        () => (stripePublishableKey ? loadStripe(stripePublishableKey) : null),
        [stripePublishableKey]
    );

    const fromCart = (usePage<SharedData>().props.fromCart as boolean | undefined) ?? false;
    const quantity = (usePage<SharedData>().props.quantity as number | undefined) ?? 5;
    const backHref = fromCart ? '/cart' : `${toUrl(purchase())}?quantity=${quantity}`;

    return (
        <AppLayout sidebar={false}>
            <Head title="チェックアウト | 天空隊長" />
            <div className="mx-auto w-full max-w-[980px] px-4 sm:px-6 pt-4 pb-8 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3">
                    <Link
                        href={backHref}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D9D9D9] bg-white text-[#231C1D] hover:bg-[#F5F5F5]"
                        aria-label="戻る"
                    >
                        <ChevronLeft className="size-5" />
                    </Link>
                    <h1 className="text-[18px] sm:text-[20px] font-bold text-[#231C1D] truncate min-w-0">
                        チェックアウト
                    </h1>
                </div>
                <hr className="mt-3 border-t border-[#D9D9D9]" />

                <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
                    {stripePromise ? (
                        <Elements stripe={stripePromise} options={{ locale: 'ja' }}>
                            <CheckoutForm />
                        </Elements>
                    ) : (
                        <p className="rounded-[3px] border border-[#D9D9D9] bg-amber-50 p-4 text-[13px] text-[#92400e]">
                            Stripeが設定されていません。.envにSTRIPE_PUBLISHABLE_KEYとSTRIPE_SECRET_KEYを設定してください。
                        </p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
