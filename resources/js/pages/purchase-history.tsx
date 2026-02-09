import AppLayout from '@/layouts/app-layout';
import { formatYen, getVariant } from '@/lib/product-variants';
import { toUrl } from '@/lib/utils';
import { purchase } from '@/routes';
import { Head, Link, usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';
import { ChevronLeft, ShoppingCart } from 'lucide-react';

type OrderItemRecord = {
    id: number;
    order_id: number;
    quantity: number;
    count: number;
    mode: 'subscription' | 'normal';
    amount: number;
};

type OrderRecord = {
    id: number;
    order_number: string;
    amount: number;
    quantity: number;
    count: number;
    mode: 'subscription' | 'normal';
    status: 'preparing' | 'shipped';
    shipped_at: string | null;
    created_at: string;
    delivery_postal_code_1?: string | null;
    delivery_postal_code_2?: string | null;
    delivery_prefecture?: string | null;
    delivery_city?: string | null;
    delivery_street?: string | null;
    delivery_building?: string | null;
    order_items?: OrderItemRecord[];
};

function formatOrderDate(iso: string): string {
    const d = new Date(iso);
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const day = d.getDate();
    return `${y}年${m}月${day}日`;
}

function getBadgeForMode(mode: OrderRecord['mode']): { text: string; color: 'gold' | 'red' } {
    return mode === 'subscription'
        ? { text: '6ヶ月定期購入', color: 'gold' }
        : { text: '通常購入', color: 'red' };
}

function getStatusLine(order: OrderRecord): string {
    if (order.status === 'preparing') {
        return '発送準備中';
    }
    if (order.status === 'shipped' && order.shipped_at) {
        return `${formatOrderDate(order.shipped_at)}　発送完了`;
    }
    return '発送準備中';
}

function formatDeliveryAddress(order: OrderRecord): string | null {
    const p1 = order.delivery_postal_code_1 ?? '';
    const p2 = order.delivery_postal_code_2 ?? '';
    const prefecture = order.delivery_prefecture ?? '';
    const city = order.delivery_city ?? '';
    const street = order.delivery_street ?? '';
    const building = order.delivery_building ?? '';
    if (!p1 && !p2 && !prefecture && !city && !street) return null;
    const postal = p1 && p2 ? `〒${p1}-${p2}` : '';
    const line2 = [prefecture, city, street].filter(Boolean).join('') + (building ? ` ${building}` : '');
    return [postal, line2].filter(Boolean).join(' ').trim() || null;
}

function Badge({ text, color }: { text: string; color: 'gold' | 'red' }) {
    const isGold = color === 'gold';
    return (
        <span
            className={`inline-flex items-center justify-center px-2 py-1 text-[12px] font-medium border ${
                isGold
                    ? 'bg-[#F8F2E2] text-[#D4AC4C] border-[#D4AC4C]'
                    : 'bg-white text-[#E00000] border-[#E00000]'
            }`}
        >
            {text}
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
    const orders = (usePage<SharedData>().props.orders as OrderRecord[] | undefined) ?? [];
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
                    {orders.length === 0 ? (
                        <p className="text-[14px] text-[#666]">
                            購入履歴はありません。
                        </p>
                    ) : (
                        orders.map((order) => {
                            const totalYen = `${formatYen(order.amount)}円`;
                            const deliveryAddress = formatDeliveryAddress(order);
                            const hasOrderItems = order.order_items && order.order_items.length > 0;
                            const firstQuantity = hasOrderItems
                                ? Number(order.order_items![0].quantity) || 5
                                : Number(order.quantity) || 5;
                            return (
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
                                                {formatOrderDate(order.created_at)}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[14px] text-[#231C1D]">
                                                合計
                                            </div>
                                            <div className="text-[14px] text-[#231C1D] mt-1">
                                                {totalYen}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-5 py-4">
                                        <div className="text-[12px] text-[#231C1D] mb-3">
                                            {getStatusLine(order)}
                                            {deliveryAddress != null && (
                                                <>
                                                    {'    '}
                                                    <span className="text-[#666]">
                                                        ( お届け先 : {deliveryAddress} )
                                                    </span>
                                                </>
                                            )}
                                        </div>

                                        {hasOrderItems ? (
                                            <div className="flex gap-6 items-stretch">
                                                <div className="flex-1 min-w-0 space-y-4">
                                                    {order.order_items!.map((item) => {
                                                        const itemBadge = getBadgeForMode(item.mode as OrderRecord['mode']);
                                                        const itemQuantity = Number(item.quantity) || 5;
                                                        const itemLabel = getVariant(itemQuantity).label;
                                                        const itemUnitPrice = item.count > 0 ? Math.round(item.amount / item.count) : item.amount;
                                                        return (
                                                            <div
                                                                key={item.id}
                                                                className="grid grid-cols-[180px_1fr] gap-6 items-center"
                                                            >
                                                                <PurchaseHistoryImage />
                                                                <div className="space-y-2">
                                                                    <Badge text={itemBadge.text} color={itemBadge.color} />
                                                                    <div className="text-[13px] text-[#231C1D]">
                                                                        商品： {itemLabel}
                                                                    </div>
                                                                    <div className="text-[13px] text-[#231C1D]">
                                                                        金額： {formatYen(itemUnitPrice)}円
                                                                    </div>
                                                                    <div className="text-[13px] text-[#231C1D]">
                                                                        数量： {item.count}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                <div className="flex flex-col items-center justify-center gap-2 shrink-0 w-[220px]">
                                                    <Link
                                                        href={`${toUrl(purchase())}?quantity=${firstQuantity}`}
                                                        className="inline-flex items-center justify-center gap-2 h-10 px-4 text-[13px] font-medium rounded-[3px] bg-[#F2F2F2] text-[#666666] border border-[#CFCFCF] hover:bg-[#EDEDED] transition-colors"
                                                    >
                                                        <ShoppingCart className="size-4" />
                                                        もう一度購入する
                                                    </Link>
                                                    {order.status === 'preparing' && (
                                                        <Link
                                                            href="#"
                                                            className="text-[12px] text-[#E00000] underline underline-offset-2 hover:opacity-90"
                                                        >
                                                            購入をキャンセルする
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            (() => {
                                                const displayCount = Number(order.count) ?? 1;
                                                const unitPrice = displayCount > 0 ? Math.round(order.amount / displayCount) : order.amount;
                                                const unitPriceYen = `${formatYen(unitPrice)}円`;
                                                const badge = getBadgeForMode(order.mode);
                                                const quantity = Number(order.quantity) || 5;
                                                const productLabel = getVariant(quantity).label;
                                                return (
                                                    <div className="grid grid-cols-[180px_1fr_220px] gap-6 items-center">
                                                        <PurchaseHistoryImage />
                                                        <div className="space-y-2">
                                                            <Badge text={badge.text} color={badge.color} />
                                                            <div className="text-[13px] text-[#231C1D]">
                                                                商品： {productLabel}
                                                            </div>
                                                            <div className="text-[13px] text-[#231C1D]">
                                                                金額： {unitPriceYen}
                                                            </div>
                                                            <div className="text-[13px] text-[#231C1D]">
                                                                数量： {displayCount}
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-end gap-2">
                                                            <Link
                                                                href={`${toUrl(purchase())}?quantity=${quantity}`}
                                                                className="inline-flex items-center justify-center gap-2 h-10 px-4 text-[13px] font-medium rounded-[3px] bg-[#F2F2F2] text-[#666666] border border-[#CFCFCF] hover:bg-[#EDEDED] transition-colors"
                                                            >
                                                                <ShoppingCart className="size-4" />
                                                                もう一度購入する
                                                            </Link>
                                                            {order.status === 'preparing' && (
                                                                <Link
                                                                    href="#"
                                                                    className="text-[12px] text-[#E00000] underline underline-offset-2 hover:opacity-90"
                                                                >
                                                                    購入をキャンセルする
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })()
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
