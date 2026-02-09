import AppLayout from '@/layouts/app-layout';
import { addToCart } from '@/lib/cart';
import { formatYen, getVariant } from '@/lib/product-variants';
import { toUrl } from '@/lib/utils';
import { checkout, purchase } from '@/routes';
import { Head, Link, router, usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';
import { ShoppingBag, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

type TabType = 'subscription' | 'normal';

export default function Purchase() {
    const [activeTab, setActiveTab] = useState<TabType>('subscription');
    const [normalCount, setNormalCount] = useState(1);
    const quantity = (usePage<SharedData>().props.quantity as number | undefined) ?? 5;
    const variant = getVariant(quantity);

    return (
        <AppLayout sidebar={false}>
            <Head title="購入 | 天空隊長" />
            <div className="flex flex-col gap-8 p-4 md:p-8 max-w-[1280px] mx-auto">
                <section className="flex flex-col lg:flex-row gap-8 lg:gap-24">
                    <div className="flex flex-shrink-0 items-center justify-center border-2 border-border bg-transparent px-2 py-6">
                        <div className="relative w-full max-w-full lg:w-[460px] aspect-[2/1] overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img
                                    src="/images/スクリーンショット.png"
                                    alt="天空隊長"
                                    className="h-[75%] w-auto max-w-[75%] object-contain"
                                />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
                                <div className="h-[75%] w-[75%] bg-[#D9D9D9]/60" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span
                                    className="font-bold text-3xl md:text-5xl"
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
                    <div className="flex-1 flex flex-col gap-3">
                        <p
                            className="text-foreground"
                            style={{
                                fontFamily: 'Noto Sans JP, sans-serif',
                                fontWeight: 400,
                                fontStyle: 'normal',
                                fontSize: '16px',
                                lineHeight: '100%',
                                letterSpacing: '0.04em',
                            }}
                        >
                            明日も美しく 空を馳せる「お酒好きのおとも」！
                        </p>
                        <h1
                            className="text-2xl md:text-4xl text-[#231C1D]"
                            style={{ fontFamily: 'var(--font-mplus2)' }}
                        >
                            天空隊長
                        </h1>
                        <p className="text-xs md:text-sm text-[#231C1D] leading-relaxed mt-2">
                            お酒を飲む前にしっかりケアしたい方のために、必須アミノ酸を含む9種類のアミノ酸とNMN（美容成分）をバランスよく配合しました。<br/>
                            クセのない爽やかなラムネ風味で飲みやすく、水にサッと溶ける顆粒タイプなので気軽に飲めます。お酒の前の新習慣としておすすめです。
                        </p>
                        <div className="mt-3 space-y-3 text-xs">
                            <div className="flex gap-6 items-baseline">
                                <span className="text-[#231C1D] min-w-[4.5rem]">名称:</span>
                                <span className="text-[#231C1D99]">〇〇食品</span>
                            </div>
                            <div className="flex gap-6 items-baseline">
                                <span className="text-[#231C1D] min-w-[4.5rem]">内容量:</span>
                                <span className="text-[#231C1D99]">〇g</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-card overflow-hidden">
                    <div className="flex gap-1 ">
                        <button
                            type="button"
                            onClick={() => setActiveTab('subscription')}
                            className={`flex-1 min-w-0 py-[6px] px-2 sm:px-4 font-medium text-white transition-colors flex items-center justify-center ${
                                activeTab === 'subscription'
                                    ? 'bg-[#D4AC4C] text-[16px] sm:text-[20px] md:text-[24px]'
                                    : 'bg-[#6A2E6A] hover:bg-[#5a2860] text-[14px] sm:text-[18px] md:text-[20px] mb-[2px]'
                            }`}
                        >
                            6ヶ月サブスク購入
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('normal')}
                            className={`flex-1 min-w-0 py-[6px] px-2 sm:px-4 font-medium text-white transition-colors flex items-center justify-center ${
                                activeTab === 'normal'
                                    ? 'bg-[#D4AC4C] text-[16px] sm:text-[20px] md:text-[24px]'
                                    : 'bg-[#6A2E6A] hover:bg-[#5a2860] text-[14px] sm:text-[18px] md:text-[20px] mb-[2px]'
                            }`}
                        >
                            通常購入
                        </button>
                    </div>

                    <div className="p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-8 lg:gap-24 lg:justify-between bg-white border-4 border-[#D4AC4C]">
                        <div className="flex flex-shrink-0 items-center justify-center border-2 border-border bg-transparent px-6 py-6 sm:px-10 sm:py-8 lg:px-12 lg:py-10 w-full max-w-full lg:min-w-0 lg:w-[364px]">
                            <div className="relative w-full max-w-[340px] aspect-[2/1] overflow-hidden mx-auto lg:mx-0 lg:w-[340px] lg:max-w-none">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <img
                                        src="/images/スクリーンショット.png"
                                        alt={variant.label}
                                        className="h-full w-auto max-w-full object-contain"
                                    />
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
                                    <div className="h-full w-full bg-[#D9D9D9]/60" />
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <span
                                        className="font-bold text-2xl md:text-4xl"
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
                        <div className="flex-1 flex flex-col gap-3 bg-white min-w-0 lg:ml-auto lg:max-w-[640px]">
                            {activeTab === 'subscription' ? (
                                <>
                                    <h2 className="text-[22px] sm:text-[28px] md:text-[34px] font-bold text-[#231C1D]">
                                        {variant.label}
                                    </h2>
                                    <p className="text-[14px] sm:text-[16px] text-[#231C1D] py-2 px-3 bg-[#F8F2E2] w-full">
                                        6ヶ月のサブスク購入で通常価格より20%OFF
                                    </p>
                                    <div className="mt-2 grid grid-cols-[auto_1fr_auto] items-start gap-x-2 sm:gap-x-3 gap-y-2 min-w-0">
                                        <span className="inline-flex items-center justify-center px-2 py-[3px] text-center leading-[1.1] text-[12px] sm:text-[13px] font-medium text-[#D4AC4C] bg-white border border-[#D4AC4C]">
                                            6ヶ月
                                            <br />
                                            定期購入
                                        </span>
                                        <div className="flex items-baseline gap-1 whitespace-nowrap min-w-0 overflow-hidden">
                                            <span className="text-[24px] sm:text-[32px] md:text-[36px] font-bold text-[#E00000] leading-none">
                                                {formatYen(variant.subscription.total)}
                                            </span>
                                            <span className="text-[22px] sm:text-[30px] md:text-[34px] font-bold text-[#E00000] leading-none">
                                                円
                                            </span>
                                            <span className="text-[13px] sm:text-[15px] text-[#666666] leading-none ml-1 shrink-0">
                                                （税抜）
                                            </span>
                                        </div>
                                        <span className="text-[12px] sm:text-[14px] text-[#E00000] justify-self-end text-right leading-[1.1] mt-[6px]">
                                            1袋あたり
                                            <br />
                                            {variant.subscription.perBag}円
                                        </span>
                                    </div>
                                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                                        <div className="flex items-center gap-3 invisible" aria-hidden>
                                            <span className="text-[16px] font-medium text-[#231C1D]">
                                                数量
                                            </span>
                                            <input
                                                type="number"
                                                min={1}
                                                defaultValue={1}
                                                disabled
                                                className="h-10 w-16 border border-[#D9D9D9] px-3 text-[16px] text-[#231C1D]"
                                                tabIndex={-1}
                                            />
                                        </div>
                                        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 flex-1 min-w-0 sm:justify-end">
                                            <Link
                                                href={`${toUrl(checkout())}?quantity=${quantity}&mode=subscription`}
                                                className="grid grid-cols-[20px_1fr] items-center justify-center w-full sm:w-[200px] sm:min-w-[200px] px-6 py-3 text-base font-medium bg-[#E00000] text-white hover:bg-[#E00000]/90 transition-colors rounded-[4px]"
                                            >
                                                <ShoppingCart className="size-5 justify-self-start shrink-0" />
                                                <span className="text-center">サブスク購入する</span>
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    addToCart({
                                                        quantity: quantity as 5 | 10 | 20,
                                                        mode: 'subscription',
                                                        count: 1,
                                                    });
                                                    router.visit('/cart');
                                                }}
                                                className="grid grid-cols-[20px_1fr] items-center justify-center w-full sm:w-[200px] sm:min-w-[200px] px-6 py-3 text-base font-medium rounded-[4px] border-0 text-[#ffffff] bg-[#d4af37] hover:bg-[#d4af37]/90 transition-colors cursor-pointer"
                                            >
                                                <ShoppingBag className="size-5 justify-self-start shrink-0" aria-hidden />
                                                <span className="text-center">カートに追加</span>
                                            </button>
                                        </div>
                                    </div>
                                    <hr className="mt-4 border-t border-[#D9D9D9]" />
                                </>
                            ) : (
                                <>
                                    <h2 className="text-[22px] sm:text-[28px] md:text-[34px] font-bold text-[#231C1D]">
                                        {variant.label}
                                    </h2>
                                    <p className="text-[14px] sm:text-[16px] text-[#231C1D] py-2 px-3 bg-[#F8F2E2] w-full">
                                        6ヶ月のサブスク購入で通常価格より20%OFF
                                    </p>
                                    <div className="mt-2 grid grid-cols-[auto_1fr_auto] items-start gap-x-2 sm:gap-x-3 gap-y-2 min-w-0">
                                        <span className="mt-2 inline-flex items-center justify-center px-2 py-[3px] text-center leading-[1.1] text-[12px] sm:text-[13px] font-medium text-[#E00000] bg-white border border-[#E00000]">
                                            通常購入
                                        </span>
                                        <div className="flex items-baseline gap-1 whitespace-nowrap min-w-0 overflow-hidden">
                                            <span className="text-[24px] sm:text-[32px] md:text-[36px] font-bold text-[#E00000] leading-none">
                                                {formatYen(variant.normal.total)}
                                            </span>
                                            <span className="text-[22px] sm:text-[30px] md:text-[34px] font-bold text-[#E00000] leading-none">
                                                円
                                            </span>
                                            <span className="text-[13px] sm:text-[15px] text-[#666666] leading-none ml-1 shrink-0">
                                                （税抜）
                                            </span>
                                        </div>
                                        <span className="text-[12px] sm:text-[14px] text-[#E00000] justify-self-end text-right leading-[1.1] mt-[6px]">
                                            1袋あたり
                                            <br />
                                            {variant.normal.perBag}円
                                        </span>
                                    </div>
                                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                                        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
                                            <span className="text-[14px] sm:text-[16px] font-medium text-[#231C1D]">
                                                数量
                                            </span>
                                            <input
                                                type="number"
                                                min={1}
                                                value={normalCount}
                                                onChange={(e) => setNormalCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
                                                className="h-10 w-16 sm:w-18 rounded-sm border border-[#D9D9D9] px-3 text-[16px] text-[#231C1D] focus:outline-none focus:ring-2 focus:ring-[#D4AC4C]/40"
                                            />
                                        </div>
                                        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 flex-1 min-w-0 sm:justify-end">
                                            <Link
                                                href={`${toUrl(checkout())}?quantity=${quantity}&mode=normal&count=${normalCount}`}
                                                className="grid grid-cols-[20px_1fr] items-center justify-center w-full sm:w-[200px] sm:min-w-[200px] px-6 py-3 text-base font-medium bg-[#E00000] text-white hover:bg-[#E00000]/90 transition-colors rounded-[4px]"
                                            >
                                                <ShoppingCart className="size-5 justify-self-start shrink-0" />
                                                <span className="text-center">通常購入する</span>
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    addToCart({
                                                        quantity: quantity as 5 | 10 | 20,
                                                        mode: 'normal',
                                                        count: normalCount,
                                                    });
                                                    router.visit('/cart');
                                                }}
                                                className="grid grid-cols-[20px_1fr] items-center justify-center w-full sm:w-[200px] sm:min-w-[200px] px-6 py-3 text-base font-medium rounded-[4px] border-0 text-[#ffffff] bg-[#d4af37] hover:bg-[#d4af37]/90 transition-colors cursor-pointer"
                                            >
                                                <ShoppingBag className="size-5 justify-self-start shrink-0" aria-hidden />
                                                <span className="text-center">カートに追加</span>
                                            </button>
                                        </div>
                                    </div>
                                    <hr className="mt-4 border-t border-[#D9D9D9]" />
                                </>
                            )}
                            <p className="mt-4 text-[13px] text-[#231C1D] leading-relaxed">
                                注文完了日から1~3営業日以内に郵送いたします。オリジナル封筒にてお届けますので、到着まで少々お待ちいただけますと幸いです。
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
