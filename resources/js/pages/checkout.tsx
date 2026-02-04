import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const PRICE_MAP: Record<string, { subTotal: number; normalTotal: number }> = {
    '5': { subTotal: 1212, normalTotal: 1515 },
    '10': { subTotal: 2424, normalTotal: 3800 },
    '20': { subTotal: 4480, normalTotal: 6400 },
};

type PurchaseType = 'subscription' | 'normal';

type AddressRecord = {
    id: string;
    surname: string;
    givenName: string;
    phone: string;
    postal1: string;
    postal2: string;
    prefecture: string;
    city: string;
    street: string;
    building: string;
};

type CheckoutProps = {
    variant: string;
    purchaseType: PurchaseType;
    addresses: AddressRecord[];
    selectedAddressId: string | null;
};

function formatAddressLine(a: AddressRecord) {
    const base = `${a.prefecture}${a.city}${a.street}`;
    return a.building ? `${base} ${a.building}` : base;
}

export default function Checkout({
    variant = '5',
    purchaseType = 'subscription',
    addresses = [],
    selectedAddressId = null,
}: CheckoutProps) {
    const [step, setStep] = useState<1 | 2>(1);
    const [selectedId, setSelectedId] = useState<string | null>(selectedAddressId);
    const [displayAddress, setDisplayAddress] = useState('');
    const [paymentSelected, setPaymentSelected] = useState(false);

    const prices = PRICE_MAP[variant] ?? PRICE_MAP['5'];
    const price = purchaseType === 'subscription' ? prices.subTotal : prices.normalTotal;
    const productName = `天空隊長${variant}袋セット`;
    const selectedAddress = addresses.find((a) => a.id === (selectedId ?? selectedAddressId));

    const checkoutQuery = `variant=${variant}&type=${purchaseType}`;
    const addressesUrl = `/addresses?from=checkout&${checkoutQuery}`;

    const handleNext = () => {
        if (step === 1) {
            if (selectedAddress) {
                setDisplayAddress(
                    `${selectedAddress.postal1}-${selectedAddress.postal2} ${formatAddressLine(selectedAddress)}`
                );
            }
            setStep(2);
        } else {
            router.visit(`/order/complete?order=${Date.now().toString(36).toUpperCase()}`);
        }
    };

    const canProceedStep1 = selectedAddress != null;

    return (
        <>
            <Head>
                <title>購入手続き | 天空隊長</title>
            </Head>
            <div className="min-h-screen bg-white">
                <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-8 md:py-12">
                    <h1 className="text-dark text-xl md:text-2xl font-bold mb-6">購入手続き</h1>

                    <div className="border border-[#E0E8F0] rounded-lg bg-white p-6 md:p-8 space-y-8">
                        <h2 className="text-dark text-lg font-semibold pb-2 border-b border-border">
                            購入手続き
                        </h2>

                        <section>
                            <h3 className="text-dark font-bold mb-1">1.お届け先</h3>
                            {step === 1 ? (
                                <>
                                    <p className="text-dark text-sm text-muted-foreground mb-2">
                                        お届け先住所を選択するか、新しい住所を追加してください。
                                    </p>
                                    <Link
                                        href={addressesUrl}
                                        className="inline-flex items-center gap-1 text-purple font-semibold mb-4 hover:underline"
                                    >
                                        + 新しい住所
                                    </Link>
                                    {addresses.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {addresses.map((addr) => (
                                                <button
                                                    key={addr.id}
                                                    type="button"
                                                    onClick={() => setSelectedId(addr.id)}
                                                    className={`text-left border-2 rounded-lg p-4 transition-colors ${
                                                        (selectedId ?? selectedAddressId) === addr.id
                                                            ? 'border-teal-500 bg-teal-50/50'
                                                            : 'border-border bg-white hover:border-teal-300'
                                                    }`}
                                                >
                                                    <p className="text-dark font-medium">{addr.surname} {addr.givenName}</p>
                                                    <p className="text-dark text-sm">{addr.phone}</p>
                                                    <p className="text-dark text-sm">{addr.postal1}-{addr.postal2}</p>
                                                    <p className="text-dark text-sm">{formatAddressLine(addr)}</p>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground text-sm mb-2">登録された住所がありません。</p>
                                    )}
                                </>
                            ) : (
                                <div className="flex flex-wrap items-center justify-between gap-2 py-2 border-b border-border">
                                    <p className="text-dark">{displayAddress}</p>
                                    <Link
                                        href={addressesUrl}
                                        className="text-blue-600 hover:underline text-sm font-medium"
                                    >
                                        変更
                                    </Link>
                                </div>
                            )}
                        </section>

                        <section>
                            <h3 className="text-dark font-bold mb-1">2.お支払い方法</h3>
                            <p className="text-dark text-sm text-muted-foreground mb-3">
                                お支払方法を下記より選択してください。
                            </p>
                            <label
                                className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                                    paymentSelected
                                        ? 'border-teal-500 bg-teal-50/50'
                                        : 'border-border bg-white'
                                }`}
                            >
                                <span
                                    className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        paymentSelected
                                            ? 'border-teal-500 bg-teal-500'
                                            : 'border-border bg-white'
                                    }`}
                                >
                                    {paymentSelected && (
                                        <span className="w-2 h-2 rounded-full bg-white" />
                                    )}
                                </span>
                                <input
                                    type="radio"
                                    name="payment"
                                    checked={paymentSelected}
                                    onChange={() => setPaymentSelected(true)}
                                    className="sr-only"
                                />
                                <span className={paymentSelected ? 'text-teal-700 font-medium' : 'text-dark'}>
                                    クレジットカード
                                </span>
                            </label>
                            {paymentSelected && (
                                <div className="mt-3 ml-8 p-4 rounded-lg border border-border bg-muted/30 text-sm text-dark space-y-1">
                                    <p>VISA 末尾 0000</p>
                                    <p>クレジットカード名義人: TARO YAMADA</p>
                                    <p>有効期限: 01/2027</p>
                                </div>
                            )}
                        </section>

                        <section>
                            <h3 className="text-dark font-bold mb-3">3.商品詳細</h3>
                            <div className="flex gap-4 items-start p-4 border border-border rounded-lg">
                                <img
                                    src="/images/天空隊長.png"
                                    alt={productName}
                                    className="w-20 h-20 md:w-24 md:h-24 object-contain rounded border border-border flex-shrink-0"
                                />
                                <div className="min-w-0">
                                    <p className="text-dark font-medium">{productName}</p>
                                    <p className="text-dark text-lg font-semibold mt-1">
                                        {price.toLocaleString()}円
                                    </p>
                                    <span
                                        className={`inline-block mt-2 px-3 py-1 rounded text-sm border ${
                                            purchaseType === 'subscription'
                                                ? 'bg-gold/20 border-gold/50 text-dark'
                                                : 'bg-red-50 border-red-200 text-red-800'
                                        }`}
                                    >
                                        {purchaseType === 'subscription'
                                            ? '6ヶ月定期購入'
                                            : '通常購入'}
                                    </span>
                                </div>
                            </div>
                        </section>

                        <div className="pt-4">
                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={step === 1 && !canProceedStep1}
                                className="w-full max-w-md mx-auto flex justify-center bg-gold text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                次へ
                            </button>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Link href={`/product/${variant}`} className="text-purple font-medium hover:underline">
                            ← 商品ページへ戻る
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
