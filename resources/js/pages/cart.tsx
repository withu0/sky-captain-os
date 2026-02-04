import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

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
        <>
            <Head>
                <title>カート | 天空隊長</title>
            </Head>
            <div className="min-h-screen bg-white">
                <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-8 md:py-12">
                    <h1 className="text-dark text-xl md:text-2xl font-bold mb-6">カート</h1>

                    <div className="border border-[#E0E8F0] rounded-lg bg-white p-6 md:p-8 space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <section>
                                <h2 className="text-dark font-bold mb-4">1. カート情報</h2>
                                {items.length === 0 ? (
                                    <p className="text-muted-foreground text-sm">カートに商品がありません。</p>
                                ) : (
                                    <div className="space-y-4">
                                        {items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex gap-4 p-4 border border-border rounded-lg"
                                            >
                                                <img
                                                    src="/images/天空隊長.png"
                                                    alt={item.productName}
                                                    className="w-20 h-20 md:w-24 md:h-24 object-contain rounded border border-border flex-shrink-0"
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <span
                                                        className={`inline-block px-3 py-1 rounded text-sm border mb-2 ${
                                                            item.purchaseType === 'subscription'
                                                                ? 'bg-[#F5E6C8] border-amber-200 text-dark'
                                                                : 'bg-red-50 border-red-200 text-red-800'
                                                        }`}
                                                    >
                                                        {item.purchaseType === 'subscription'
                                                            ? '6ヶ月定期購入'
                                                            : '通常購入'}
                                                    </span>
                                                    <p className="text-dark font-medium">{item.productName}</p>
                                                    <p className="text-dark text-sm">金額: {item.amount.toLocaleString()}円</p>
                                                    <p className="text-dark text-sm">数量: {item.quantity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>

                            <section>
                                <h2 className="text-dark font-bold mb-1">2. お支払い方法</h2>
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
                        </div>

                        {items.length > 0 && (
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
                                <p className="text-dark font-semibold">
                                    合計: {totalAmount.toLocaleString()}円
                                </p>
                                <Link
                                    href={`/checkout${checkoutParams}`}
                                    className="bg-gold text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90"
                                >
                                    購入手続きへ
                                </Link>
                            </div>
                        )}
                    </div>

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
        </>
    );
}
