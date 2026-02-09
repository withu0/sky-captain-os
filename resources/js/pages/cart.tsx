import AppLayout from '@/layouts/app-layout';
import { removeFromCart, getCart, type CartItemStored } from '@/lib/cart';
import { formatYen, getVariant } from '@/lib/product-variants';
import { toUrl } from '@/lib/utils';
import { purchase } from '@/routes';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, ShoppingCart, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

function CartItemImage() {
    return (
        <div className="flex items-center justify-center border-2 border-border bg-transparent p-3 rounded-[3px]">
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

export default function Cart() {
    const [cartItems, setCartItems] = useState<CartItemStored[]>([]);

    useEffect(() => {
        setCartItems(getCart());
    }, []);

    const handleRemove = (id: string) => {
        removeFromCart(id);
        setCartItems(getCart());
    };

    return (
        <AppLayout sidebar={false} headerTitle="カート">
            <Head title="カート | 天空隊長" />
            <div className="mx-auto w-full max-w-[980px] px-4 pt-4 pb-8">
                <div className="flex items-center gap-3">
                    <Link
                        href={toUrl(purchase())}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D9D9D9] bg-white text-[#231C1D] hover:bg-[#F5F5F5]"
                        aria-label="戻る"
                    >
                        <ChevronLeft className="size-5" />
                    </Link>
                    <h1 className="text-[20px] font-bold text-[#231C1D]">
                        カート
                    </h1>
                </div>
                <hr className="mt-3 border-t border-[#D9D9D9]" />
                <div className="mt-6 space-y-6">
                    {cartItems.length === 0 ? (
                        <div className="rounded-[3px] border border-[#D9D9D9] bg-white p-8 text-center text-[#666]">
                            カートに商品がありません。
                            <Link
                                href={toUrl(purchase())}
                                className="mt-4 inline-block text-[#2563eb] hover:underline"
                            >
                                購入ページへ
                            </Link>
                        </div>
                    ) : (() => {
                        const totalCount = cartItems.reduce((acc, item) => acc + item.count, 0);
                        const totalBagCount = cartItems.reduce(
                            (acc, item) => acc + item.quantity * item.count,
                            0,
                        );
                        const totalAmount = cartItems.reduce((acc, item) => {
                            const variant = getVariant(item.quantity);
                            const unitPrice =
                                item.mode === 'subscription'
                                    ? variant.subscription.total
                                    : variant.normal.total;
                            return acc + unitPrice * item.count;
                        }, 0);
                        return (
                        <div className="rounded-[3px] border border-[#D9D9D9] bg-white overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[640px] text-left text-[13px] sm:text-[14px]">
                                    <thead>
                                        <tr className="border-b border-[#D9D9D9] bg-[#F6F6F6]" style={{ fontWeight: 400 }}>
                                            <th className="py-3 px-3 sm:px-4 text-[#231C1D]" style={{ fontWeight: 400 }}>
                                                商品
                                            </th>
                                            <th className="py-3 px-3 sm:px-4 text-[#231C1D] hidden sm:table-cell" style={{ fontWeight: 400 }}>
                                                購入タイプ
                                            </th>
                                            <th className="py-3 px-3 sm:px-4 text-[#231C1D] text-right" style={{ fontWeight: 400 }}>
                                                単価
                                            </th>
                                            <th className="py-3 px-3 sm:px-4 text-[#231C1D] text-right" style={{ fontWeight: 400 }}>
                                                数量
                                            </th>
                                            <th className="py-3 px-3 sm:px-4 text-[#231C1D] text-right" style={{ fontWeight: 400 }}>
                                                合計数量
                                            </th>
                                            <th className="py-3 px-3 sm:px-4 text-[#231C1D] text-right" style={{ fontWeight: 400 }}>
                                                小計
                                            </th>
                                            <th className="py-3 px-3 sm:px-4 text-[#231C1D] text-right w-[140px] sm:w-[180px]" style={{ fontWeight: 400 }}>
                                                操作
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => {
                                            const variant = getVariant(item.quantity);
                                            const isSubscription = item.mode === 'subscription';
                                            const unitPrice = isSubscription
                                                ? variant.subscription.total
                                                : variant.normal.total;
                                            const totalPrice = unitPrice * item.count;
                                            const badge = isSubscription
                                                ? '6ヶ月定期購入'
                                                : '通常購入';
                                            return (
                                                <tr
                                                    key={item.id}
                                                    className="border-b border-[#E5E5E5] last:border-b-0 hover:bg-[#FAFAFA]"
                                                >
                                                    <td className="py-3 px-3 sm:px-4 align-middle">
                                                        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                                                            <div className="w-[80px] sm:w-[100px] shrink-0 max-w-full">
                                                                <CartItemImage />
                                                            </div>
                                                            <div className="min-w-0">
                                                                <div className="font-medium text-[#231C1D]">
                                                                    {variant.label}
                                                                </div>
                                                                <div className="mt-1 sm:hidden">
                                                                    <span
                                                                        className={`inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-[3px] ${
                                                                            isSubscription
                                                                                ? 'border border-[#D4AC4C] bg-[#F8F2E2] text-[#D4AC4C]'
                                                                                : 'border border-[#E00000] bg-white text-[#E00000]'
                                                                        }`}
                                                                    >
                                                                        {badge}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-3 sm:px-4 hidden sm:table-cell">
                                                        <span
                                                            className={`inline-flex items-center px-2 py-1 text-[11px] sm:text-[12px] font-medium rounded-[3px] ${
                                                                isSubscription
                                                                    ? 'border border-[#D4AC4C] bg-[#F8F2E2] text-[#D4AC4C]'
                                                                    : 'border border-[#E00000] bg-white text-[#E00000]'
                                                            }`}
                                                        >
                                                            {badge}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-3 sm:px-4 text-right text-[#231C1D]">
                                                        {formatYen(unitPrice)}円
                                                    </td>
                                                    <td className="py-3 px-3 sm:px-4 text-right text-[#231C1D]">
                                                        {item.count}
                                                    </td>
                                                    <td className="py-3 px-3 sm:px-4 text-right text-[#231C1D]">
                                                        {item.quantity * item.count}
                                                    </td>
                                                    <td className="py-3 px-3 sm:px-4 text-right font-medium text-[#231C1D]">
                                                        {formatYen(totalPrice)}円
                                                    </td>
                                                    <td className="py-3 px-3 sm:px-4 text-right align-middle">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemove(item.id)}
                                                            className="inline-flex items-center justify-center gap-1.5 h-8 sm:h-9 px-2.5 sm:px-3 text-[11px] sm:text-[12px] font-medium rounded-[3px] border border-[#D9D9D9] bg-white text-[#666] hover:bg-[#F5F5F5] transition-colors"
                                                            aria-label="削除"
                                                        >
                                                            <Trash2 className="size-3 sm:size-3.5" />
                                                            削除
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    <tfoot>
                                        <tr className="border-t-2 border-[#D9D9D9] bg-[#F6F6F6] text-[#231C1D]">
                                            <td className="py-3 px-3 sm:px-4" colSpan={2}>
                                                合計
                                            </td>
                                            <td className="py-3 px-3 sm:px-4" />
                                            <td className="py-3 px-3 sm:px-4 text-right">
                                                {totalCount}
                                            </td>
                                            <td className="py-3 px-3 sm:px-4 text-right">
                                                {totalBagCount}
                                            </td>
                                            <td className="py-3 px-3 sm:px-4 text-right">
                                                {formatYen(totalAmount)}円
                                            </td>
                                            <td className="py-3 px-3 sm:px-4 text-right align-middle">
                                                {cartItems.length > 0 && (
                                                    <form
                                                        method="POST"
                                                        action="/cart/checkout"
                                                        className="inline-block"
                                                    >
                                                        <input
                                                            type="hidden"
                                                            name="_token"
                                                            value={
                                                                typeof document !== 'undefined'
                                                                    ? document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? ''
                                                                    : ''
                                                            }
                                                        />
                                                        <input
                                                            type="hidden"
                                                            name="items"
                                                            value={JSON.stringify(cartItems.map(({ quantity, mode, count }) => ({ quantity, mode, count })))}
                                                        />
                                                        <button
                                                            type="submit"
                                                            className="inline-flex items-center justify-center gap-1.5 h-9 sm:h-10 px-3 sm:px-4 text-[12px] sm:text-[13px] font-medium rounded-[3px] bg-[#E00000] text-white hover:bg-[#E00000]/90 transition-colors"
                                                        >
                                                            <ShoppingCart className="size-3.5 sm:size-4" />
                                                            購入手続きへ
                                                        </button>
                                                    </form>
                                                )}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                        );
                    })()}
                </div>
            </div>
        </AppLayout>
    );
}
