import { Head, Link } from '@inertiajs/react';
import EcommerceLayout from '@/layouts/ecommerce-layout';

type OrderStatus = 'preparing' | 'shipped';
type PurchaseType = 'subscription' | 'normal';

type Order = {
    id: string;
    purchaseDate: string;
    status: OrderStatus;
    shippedDate?: string;
    purchaseType: PurchaseType;
    productName: string;
    productVariant: string;
    amount: string;
    quantity: number;
    total: string;
};

const MOCK_ORDERS: Order[] = [
    {
        id: '1',
        purchaseDate: '2025年06月30日',
        status: 'preparing',
        purchaseType: 'subscription',
        productName: '天空隊長10袋セット',
        productVariant: '10',
        amount: '2,240円',
        quantity: 1,
        total: '1,212円',
    },
    {
        id: '2',
        purchaseDate: '2025年04月05日',
        status: 'shipped',
        shippedDate: '2025年04月07日 発送完了',
        purchaseType: 'normal',
        productName: '天空隊長5袋セット',
        productVariant: '5',
        amount: '1,515円',
        quantity: 1,
        total: '1,515円',
    },
    {
        id: '3',
        purchaseDate: '2025年03月10日',
        status: 'shipped',
        shippedDate: '2025年03月11日 発送完了',
        purchaseType: 'normal',
        productName: '天空隊長5袋セット',
        productVariant: '5',
        amount: '1,515円',
        quantity: 1,
        total: '1,515円',
    },
];

export default function PurchaseHistory() {
    return (
        <EcommerceLayout>
            <Head>
                <title>購入履歴 | 天空隊長</title>
            </Head>
            <div className="bg-white">
                <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-8 md:py-12">
                    <h1 className="text-dark text-xl md:text-2xl font-bold mb-6">購入履歴</h1>

                    <div className="space-y-6">
                        {MOCK_ORDERS.map((order) => (
                            <section
                                key={order.id}
                                className="border border-border rounded-lg p-4 md:p-6 relative"
                            >
                                <div className="absolute top-4 right-4 text-dark font-semibold">
                                    合計 {order.total}
                                </div>
                                <p className="text-dark text-sm mb-1">{order.purchaseDate}</p>
                                <p className="text-dark text-sm mb-4">
                                    {order.status === 'preparing'
                                        ? '発送準備中'
                                        : order.shippedDate}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href={`/product/${order.productVariant}`}
                                        className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 rounded border border-border overflow-hidden bg-white"
                                    >
                                        <img
                                            src="/images/天空隊長.png"
                                            alt={order.productName}
                                            className="w-full h-full object-contain"
                                        />
                                    </Link>
                                    <div className="flex-1 min-w-0">
                                        <span
                                            className={`inline-block px-2 py-0.5 text-sm font-medium rounded mb-2 ${
                                                order.purchaseType === 'subscription'
                                                    ? 'bg-gold text-dark'
                                                    : 'bg-[#ED0000] text-white'
                                            }`}
                                        >
                                            {order.purchaseType === 'subscription'
                                                ? '6ヶ月定期購入'
                                                : '通常購入'}
                                        </span>
                                        <p className="text-dark font-medium">
                                            商品: {order.productName}
                                        </p>
                                        <p className="text-dark text-sm">金額: {order.amount}</p>
                                        <p className="text-dark text-sm">数量: {order.quantity}</p>
                                        <div className="flex flex-wrap items-center gap-3 mt-3">
                                            <Link
                                                href={`/product/${order.productVariant}`}
                                                className="inline-flex items-center gap-1.5 bg-neutral-200 text-dark font-medium py-2 px-4 rounded-full hover:bg-neutral-300"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="9" cy="21" r="1" />
                                                    <circle cx="20" cy="21" r="1" />
                                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                                </svg>
                                                もう一度購入する
                                            </Link>
                                            {order.status === 'preparing' && order.purchaseType === 'subscription' && (
                                                <button
                                                    type="button"
                                                    className="text-[#ED0000] text-sm font-medium hover:underline"
                                                >
                                                    購入をキャンセルする
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ))}
                    </div>

                    <div className="mt-8">
                        <Link href="/" className="text-purple font-medium hover:underline">
                            ← トップへ戻る
                        </Link>
                    </div>
                </div>
            </div>
        </EcommerceLayout>
    );
}
