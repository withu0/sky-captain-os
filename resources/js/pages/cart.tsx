import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import EcommerceLayout from '@/layouts/ecommerce-layout';

type CartItem = {
    id: string;
    variant: string;
    purchaseType: 'subscription' | 'normal';
    productName: string;
    amount: number;
    quantity: number;
};

const MOCK_CART_ITEMS: CartItem[] = [
    {
        id: '1',
        variant: '10',
        purchaseType: 'subscription',
        productName: '天空隊長10袋セット',
        amount: 2240,
        quantity: 1,
    },
];

export default function Cart() {
    const [paymentSelected, setPaymentSelected] = useState(false);
    const [items] = useState<CartItem[]>(MOCK_CART_ITEMS);

    const totalAmount = items.reduce((sum, i) => sum + i.amount * i.quantity, 0);
    const checkoutParams = items.length > 0
        ? `?variant=${items[0].variant}&type=${items[0].purchaseType}`
        : '';

    return (
        <EcommerceLayout>
            <Head>
                <title>カート | 天空隊長</title>
            </Head>
            <div className="bg-[#F8F8F8]">
                <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-0">
                    {/* Header */}
                    <div className="border-b border-[#E1E1E1] py-10 px-[100px]">
                        <h1 className="text-[#231C1D] opacity-80 text-2xl font-medium">カート</h1>
                    </div>

                    <div className="px-[100px] py-10">
                        <div className="max-w-[1000px] mx-auto">
                            <div className="space-y-10">
                                {/* Main content grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[29px]">
                                    {/* Left section - Cart info */}
                                    <div className="bg-white p-5">
                                        <h2 className="text-[#231C1D] text-xl font-normal mb-[18px]">1. カート情報</h2>
                                        {items.length === 0 ? (
                                            <p className="text-muted-foreground text-sm">カートに商品がありません。</p>
                                        ) : (
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-5">
                                                    {/* Product image */}
                                                    <div className="border border-[#E1E1E1] bg-white flex justify-center items-center p-10 w-[178px] h-[112px]">
                                                        <img
                                                            src="/images/天空隊長.png"
                                                            alt={items[0].productName}
                                                            className="w-[140px] h-[66px] object-contain"
                                                        />
                                                    </div>

                                                    {/* Product details */}
                                                    <div className="space-y-2">
                                                        {/* Purchase type badge */}
                                                        <div className="bg-[rgba(220,195,100,0.08)] border border-[#DCC364] rounded px-1.5 py-1 w-fit">
                                                            <span className="text-[#DCC364] text-xs font-bold">
                                                                {items[0].purchaseType === 'subscription'
                                                                    ? '6ヶ月定期購入'
                                                                    : '通常購入'}
                                                            </span>
                                                        </div>

                                                        {/* Product name */}
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="text-[#231C1D] text-base">商品：</span>
                                                            <span className="text-[#231C1D] text-base">{items[0].productName}</span>
                                                        </div>

                                                        {/* Amount */}
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="text-[#231C1D] text-base">金額：</span>
                                                            <span className="text-[#231C1D] text-base">{items[0].amount.toLocaleString()}円</span>
                                                        </div>

                                                        {/* Quantity */}
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="text-[#231C1D] text-base">数量：</span>
                                                            <span className="text-[#231C1D] text-base">{items[0].quantity}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Mobile view details (hidden on desktop) */}
                                                <div className="lg:hidden space-y-1.5">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-[#231C1D] text-[10px] font-light">商品：</span>
                                                        <span className="text-[#231C1D] text-[10px] font-light">{items[0].productName}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-[#231C1D] text-[10px] font-light">金額：</span>
                                                        <span className="text-[#231C1D] text-[10px] font-light">{items[0].amount.toLocaleString()}円</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-[#231C1D] text-[10px] font-light">数量：</span>
                                                        <span className="text-[#231C1D] text-[10px] font-light">{items[0].quantity}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right section - Payment method */}
                                    <div className="bg-white p-5">
                                        <div className="space-y-[18px]">
                                            <h2 className="text-[#231C1D] text-xl font-normal">2. お支払い方法</h2>
                                            <div className="space-y-4">
                                                <p className="text-[#231C1D] text-sm">
                                                    お支払方法を下記より選択してください。
                                                </p>

                                                {/* Radio button for credit card */}
                                                <label
                                                    className={`flex flex-row items-center py-[10px] px-4 gap-3 w-full min-h-14 h-14 bg-white border-2 rounded cursor-pointer transition-colors ${paymentSelected
                                                            ? 'border-[#00A5D9]'
                                                            : 'border-[#D9D9D9] hover:border-[#00A5D9]'
                                                        }`}
                                                    style={{ minHeight: '56px' }}
                                                >
                                                    <span
                                                        className={`relative flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-white ${paymentSelected
                                                                ? 'border-[#00A5D9]'
                                                                : 'border-[#D9D9D9]'
                                                            }`}
                                                    >
                                                        {paymentSelected && (
                                                            <span className="w-5 h-5 rounded-full bg-[#00A5D9]" />
                                                        )}
                                                    </span>
                                                    <input
                                                        type="radio"
                                                        name="payment"
                                                        checked={paymentSelected}
                                                        onChange={() => setPaymentSelected(true)}
                                                        className="sr-only"
                                                    />
                                                    <span className={`font-medium text-base leading-[110%] ${paymentSelected ? 'text-[#00A5D9]' : 'text-[#333333]'}`}>
                                                        クレジットカード
                                                    </span>
                                                </label>

                                                {/* Card details when selected */}
                                                {paymentSelected && (
                                                    <div className="flex flex-col justify-center items-start py-[10px] px-4 gap-3 w-full min-h-[188px] bg-white border-2 border-[#D9D9D9] rounded">
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-[#333333] font-medium text-base leading-[100%]">
                                                                VISA
                                                            </span>
                                                            <span className="text-[#333333] font-normal text-base leading-[100%]">
                                                                末尾 0000
                                                            </span>
                                                        </div>

                                                        <div className="flex flex-col gap-1">
                                                            <span className="text-[14px] leading-[100%] text-[rgba(51,51,51,0.5)]">
                                                                クレジットカード名義人
                                                            </span>
                                                            <span className="text-[#333333] font-normal text-base leading-[100%]">
                                                                TARO YAMADA
                                                            </span>
                                                        </div>

                                                        <div className="flex flex-col gap-1">
                                                            <span className="text-[14px] leading-[100%] text-[rgba(51,51,51,0.5)]">
                                                                有効期限
                                                            </span>
                                                            <span className="text-[#333333] font-normal text-base leading-[100%]">
                                                                01/2027
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Total amount and checkout button */}
                                {items.length > 0 && (
                                    <div className="bg-white p-5">
                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
                                            <p className="text-dark font-semibold text-lg">
                                                合計: {totalAmount.toLocaleString()}円
                                            </p>
                                            <Link
                                                href={`/checkout${checkoutParams}`}
                                                className="bg-[#DCC364] text-white font-semibold py-3 px-8 rounded hover:opacity-90"
                                            >
                                                購入手続きへ
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Navigation links */}
                            <div className="mt-6 flex flex-wrap gap-4">
                                <Link href="/" className="text-purple font-medium hover:underline">
                                    ← トップへ戻る
                                </Link>
                                <Link href="/product/10" className="text-purple font-medium hover:underline">
                                    商品を見る
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </EcommerceLayout>
    );
}