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
    const [selectedPayment, setSelectedPayment] = useState<string>('');

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
    const canProceedStep2 = paymentSelected;

    const paymentMethods = [
        { id: 'credit', label: 'クレジットカード' },
        { id: 'bank', label: '銀行振込' },
        { id: 'convenience', label: 'コンビニ決済' },
    ];

    return (
        <>
            <Head>
                <title>購入手続き | 天空隊長</title>
            </Head>
            <div className="min-h-screen bg-[#F8F8F8]">
                <div className="max-w-[1200px] mx-auto px-4">
                    {/* Header */}
                    <div className="flex flex-col items-start pt-10 pb-5 gap-10 border-b border-[#E1E1E1]">
                        <h1 className="text-[#231C1D] text-2xl font-medium opacity-80">
                            購入手続き
                        </h1>
                    </div>

                    <div className="py-8">
                        <div className="flex flex-col items-start gap-8 max-w-[1000px] mx-auto">
                            {/* Section 1: Delivery Address */}
                            <section className="w-full bg-white p-5">
                                <div className="flex flex-col gap-[18px]">
                                    <h2 className="text-[#231C1D] text-xl font-normal">
                                        1.お届け先
                                    </h2>

                                    <div className="flex flex-col gap-2">
                                        {step === 1 ? (
                                            <>
                                                <p className="text-[#231C1D] text-sm">
                                                    商品をお届けする住所を入力してください。
                                                </p>
                                                <div className="flex items-center gap-2.5">
                                                    <Link
                                                        href={addressesUrl}
                                                        className="inline-flex items-center gap-1 text-[#006AFF] font-semibold text-sm hover:underline"
                                                    >
                                                        + 新しい住所
                                                    </Link>
                                                </div>
                                                {addresses.length > 0 ? (
                                                    <div className="mt-2">
                                                        {addresses.map((addr) => (
                                                            <button
                                                                key={addr.id}
                                                                type="button"
                                                                onClick={() => setSelectedId(addr.id)}
                                                                className={`w-full flex flex-col items-start p-4 gap-1 border-2 rounded transition-colors ${(selectedId ?? selectedAddressId) === addr.id
                                                                        ? 'border-[#DCC364] bg-[#F8F8F8]'
                                                                        : 'border-[#D9D9D9] bg-white hover:border-[#B3B3B3]'
                                                                    }`}
                                                            >
                                                                <p className="text-[#231C1D] font-medium">
                                                                    {addr.surname} {addr.givenName}
                                                                </p>
                                                                <p className="text-[#231C1D] text-sm">
                                                                    {addr.phone}
                                                                </p>
                                                                <p className="text-[#231C1D] text-sm">
                                                                    {addr.postal1}-{addr.postal2}
                                                                </p>
                                                                <p className="text-[#231C1D] text-sm">
                                                                    {formatAddressLine(addr)}
                                                                </p>
                                                            </button>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center p-3 border-2 border-[#D9D9D9] rounded bg-white">
                                                        <span className="text-[#231C1D]/30 text-sm">
                                                            東京都〇〇区△△1-23-4
                                                        </span>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="flex items-center p-3 border-2 border-[#D9D9D9] rounded bg-white">
                                                <p className="text-[#231C1D]">{displayAddress || '住所が選択されていません'}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>

                            {/* Section 2: Payment Method */}
                            <section className="w-full bg-white p-5">
                                <div className="flex flex-col gap-[18px]">
                                    <h2 className="text-[#231C1D] text-xl font-normal">
                                        2.お支払い方法
                                    </h2>

                                    <div className="flex flex-col gap-4">
                                        <p className="text-[#231C1D] text-sm">
                                            お支払方法を下記より選択してください。
                                        </p>

                                        <div className="flex flex-col gap-4">
                                            {paymentMethods.map((method) => (
                                                <label
                                                    key={method.id}
                                                    className={`flex items-center p-4 gap-3 border-2 rounded cursor-pointer transition-colors ${selectedPayment === method.id
                                                            ? 'border-[#DCC364] bg-[#F8F8F8]'
                                                            : 'border-[#D9D9D9] bg-white hover:border-[#B3B3B3]'
                                                        }`}
                                                >
                                                    <div className={`flex justify-center items-center w-8 h-8 rounded-full border-2 ${selectedPayment === method.id
                                                            ? 'border-[#DCC364] bg-[#DCC364]'
                                                            : 'border-[#B3B3B3] bg-white'
                                                        }`}>
                                                        {selectedPayment === method.id && (
                                                            <div className="w-3 h-3 rounded-full bg-white" />
                                                        )}
                                                    </div>
                                                    <input
                                                        type="radio"
                                                        name="payment"
                                                        value={method.id}
                                                        checked={selectedPayment === method.id}
                                                        onChange={(e) => {
                                                            setSelectedPayment(e.target.value);
                                                            setPaymentSelected(true);
                                                        }}
                                                        className="sr-only"
                                                    />
                                                    <span className="text-[#333333] font-medium text-base">
                                                        {method.label}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>

                                        {selectedPayment === 'credit' && paymentSelected && (
                                            <div className="ml-12 p-4 rounded border border-[#E1E1E1] bg-[#F8F8F8]/30 text-sm text-[#231C1D] space-y-1">
                                                <p>VISA 末尾 0000</p>
                                                <p>クレジットカード名義人: TARO YAMADA</p>
                                                <p>有効期限: 01/2027</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>

                            {/* Section 3: Product Details */}
                            <section className="w-full bg-white p-5">
                                <div className="flex flex-col gap-[18px]">
                                    <h2 className="text-[#231C1D] text-xl font-normal">
                                        3.商品詳細
                                    </h2>

                                    <div className="flex gap-[50px] items-start">
                                        {/* Product Image */}
                                        <div className="flex flex-col justify-center items-center p-10 border border-[#E1E1E1] bg-white">
                                            <img
                                                src="/images/5.png"
                                                alt={productName}
                                                className="w-[140px] h-[66px] object-contain"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex flex-col gap-2 pt-2">
                                            <p className="text-[#231C1D] font-medium">{productName}</p>
                                            <p className="text-[#231C1D] text-lg font-semibold">
                                                {price.toLocaleString()}円
                                            </p>
                                            <div className="flex justify-center items-center px-1.5 py-1 gap-2.5 bg-[rgba(220,195,100,0.08)] border border-[#DCC364]">
                                                <span className="text-[#DCC364] font-medium text-xs">
                                                    {purchaseType === 'subscription'
                                                        ? '6ヶ月定期購入'
                                                        : '通常購入'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Next Button */}
                            <div className="w-full">
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    disabled={(step === 1 && !canProceedStep1) || (step === 2 && !canProceedStep2)}
                                    className="w-full flex justify-center items-center py-3 px-10 gap-2.5 bg-[#DCC364] rounded hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="text-white font-medium text-base">
                                        次へ
                                    </span>
                                </button>
                            </div>

                            {/* Back Link */}
                            <div className="w-full mt-6">
                                <Link
                                    href={`/product/${variant}`}
                                    className="text-[#006AFF] font-medium hover:underline"
                                >
                                    ← 商品ページへ戻る
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}