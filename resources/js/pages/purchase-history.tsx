import AppLayout from '@/layouts/app-layout';
import { purchase } from '@/routes';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, ShoppingCart } from 'lucide-react';

type OrderItem = {
    id: string;
    purchasedAt: string;
    statusLine: string;
    badge: { text: string; color: 'gold' | 'red' };
    productName: string;
    amountYen: string;
    quantity: number;
    totalYen: string;
    canCancel?: boolean;
};

const orders: OrderItem[] = [
    {
        id: 'o1',
        purchasedAt: '2025年06月30日',
        statusLine: '発送準備中',
        badge: { text: '6ヶ月定期購入', color: 'gold' },
        productName: '天空隊長10袋セット',
        amountYen: '2,240円',
        quantity: 1,
        totalYen: '1,212円',
        canCancel: true,
    },
    {
        id: 'o2',
        purchasedAt: '2025年04月05日',
        statusLine: '2025年04月07日　発送完了',
        badge: { text: '通常購入', color: 'red' },
        productName: '天空隊長5袋セット',
        amountYen: '1,515円',
        quantity: 1,
        totalYen: '1,212円',
    },
    {
        id: 'o3',
        purchasedAt: '2025年03月10日',
        statusLine: '2025年03月11日　発送完了',
        badge: { text: '通常購入', color: 'red' },
        productName: '天空隊長5袋セット',
        amountYen: '1,515円',
        quantity: 1,
        totalYen: '1,212円',
    },
];

function Badge({ badge }: { badge: OrderItem['badge'] }) {
    const isGold = badge.color === 'gold';
    return (
        <span
            className={`inline-flex items-center justify-center px-2 py-1 text-[12px] font-medium border ${
                isGold
                    ? 'bg-[#F8F2E2] text-[#D4AC4C] border-[#D4AC4C]'
                    : 'bg-white text-[#E00000] border-[#E00000]'
            }`}
        >
            {badge.text}
        </span>
    );
}

function PurchaseHistoryImage() {
    return (
        <div className="flex items-center justify-center border-2 border-border bg-transparent p-3">
            <div className="relative w-full max-w-full aspect-[2/1] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <img
                        src="/images/スクリーンショット.png"
                        alt="商品画像"
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
                        className="font-bold text-[18px]"
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
    );
}

export default function PurchaseHistory() {
    return (
        <AppLayout sidebar={false} headerTitle="購入履歴">
            <Head title="購入履歴 | 天空隊長" />
            <div className="mx-auto w-full max-w-[980px] px-4 pt-4 pb-8">
                <div className="flex items-center gap-3">
                    <Link
                        href={purchase()}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D9D9D9] bg-white text-[#231C1D] hover:bg-[#F5F5F5]"
                        aria-label="戻る"
                    >
                        <ChevronLeft className="size-5" />
                    </Link>
                    <h1 className="text-[20px] font-bold text-[#231C1D]">
                        購入履歴
                    </h1>
                </div>
                <hr className="mt-3 border-t border-[#D9D9D9]" />
                <div className="mt-6 space-y-6">
                    {orders.map((order, idx) => (
                        <div
                            key={order.id}
                            className="border border-[#D9D9D9] bg-white"
                        >
                            <div className="bg-[#F6F6F6] px-5 py-1 border-b border-[#BDBDBD] flex items-start justify-between">
                                <div>
                                    <div className="text-[14px] text-[#231C1D]">
                                        購入日
                                    </div>
                                    <div className="text-[14px] text-[#231C1D] mt-1">
                                        {order.purchasedAt}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[14px] text-[#231C1D]">
                                        合計
                                    </div>
                                    <div className="text-[14px] text-[#231C1D] mt-1">
                                        {order.totalYen}
                                    </div>
                                </div>
                            </div>

                            <div className="px-5 py-4">
                                <div className="text-[12px] text-[#231C1D] mb-3">
                                    {order.statusLine}
                                </div>

                                <div className="grid grid-cols-[180px_1fr_220px] gap-6 items-center">
                                    <PurchaseHistoryImage />

                                    <div className="space-y-2">
                                        <Badge badge={order.badge} />
                                        <div className="text-[13px] text-[#231C1D]">
                                            商品： {order.productName}
                                        </div>
                                        <div className="text-[13px] text-[#231C1D]">
                                            金額： {order.amountYen}
                                        </div>
                                        <div className="text-[13px] text-[#231C1D]">
                                            数量： {order.quantity}
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        <Link
                                            href={purchase()}
                                            className="inline-flex items-center justify-center gap-2 h-10 px-4 text-[13px] font-medium rounded-[3px] bg-[#F2F2F2] text-[#666666] border border-[#CFCFCF] hover:bg-[#EDEDED] transition-colors"
                                        >
                                            <ShoppingCart className="size-4" />
                                            もう一度購入する
                                        </Link>
                                        {order.canCancel ? (
                                            <button
                                                type="button"
                                                className="text-[12px] text-[#E00000] underline underline-offset-2"
                                            >
                                                購入をキャンセルする
                                            </button>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
