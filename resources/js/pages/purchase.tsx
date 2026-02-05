import AppLayout from '@/layouts/app-layout';
import { purchase, purchaseHistory } from '@/routes';
import { Head, Link } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

type TabType = 'subscription' | 'normal';

export default function Purchase() {
    const [activeTab, setActiveTab] = useState<TabType>('subscription');

    return (
        <AppLayout sidebar={false}>
            <Head title="購入 | 天空隊長" />
            <div className="flex flex-col gap-8 p-4 md:p-8 max-w-[1280px] mx-auto">
                {/* Top Section: Product Information */}
                <section className="flex flex-col md:flex-row gap-18 md:gap-24">
                    {/* Outermost: border only, no fill; equal padding; inner content centered */}
                    <div className="flex flex-shrink-0 items-center justify-center border-2 border-border bg-transparent px-2 py-6">
                        <div className="relative w-full max-w-full md:w-[460px] aspect-[2/1] overflow-hidden">
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

                {/* Bottom Section: design = gold frame around all; bold gold line under tabs (full width); tabs touch, white text */}
                <section className="bg-card overflow-hidden">
                    {/* Tabs: selected=gold+white+bigger, inactive=purple+white; bold gold line spans full width below */}
                    <div className="flex gap-1 ">
                        <button
                            type="button"
                            onClick={() => setActiveTab('subscription')}
                            className={`flex-1 min-w-0 py-[5px] px-4 font-medium text-white transition-colors flex items-center justify-center ${
                                activeTab === 'subscription'
                                    ? 'bg-[#D4AC4C] text-[24px]'
                                    : 'bg-[#6A2E6A] hover:bg-[#5a2860] text-[20px] mb-[2px]'
                            }`}
                        >
                            6ヶ月サブスク購入
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('normal')}
                            className={`flex-1 min-w-0 py-[5px] px-4 font-medium text-white transition-colors flex items-center justify-center ${
                                activeTab === 'normal'
                                    ? 'bg-[#D4AC4C] text-[24px]'
                                    : 'bg-[#6A2E6A] hover:bg-[#5a2860] text-[20px] mb-[2px]'
                            }`}
                        >
                            通常購入
                        </button>
                    </div>

                    {/* Content: white area directly below bold gold line */}
                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-32 md:gap-48 md:justify-between bg-white border-4 border-[#D4AC4C]">
                        {/* Outermost: border only, no fill; equal padding; inner content centered */}
                        <div className="flex flex-shrink-0 items-center justify-center border-2 border-border bg-transparent px-12 py-10">
                            <div className="relative w-full max-w-full md:w-[340px] aspect-[2/1] overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <img
                                        src="/images/スクリーンショット.png"
                                        alt="天空隊長 5袋セット"
                                        className="h-full w-auto max-w-full object-contain"
                                    />
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
                                    <div className="h-full w-full bg-[#D9D9D9]/60" />
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
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
                        <div className="flex-1 flex flex-col gap-3 bg-white md:ml-auto md:max-w-[640px]">
                            {activeTab === 'subscription' ? (
                                <>
                                    <h2 className="text-[34px] font-bold text-[#231C1D]">
                                        天空隊長 5袋セット
                                    </h2>
                                    <p className="text-[16px] text-[#231C1D] py-2 px-3 bg-[#F8F2E2] w-full">
                                        6ヶ月のサブスク購入で通常価格より20%OFF
                                    </p>
                                    <div className="mt-2 grid grid-cols-[auto_1fr_auto] items-start gap-x-3">
                                        <span className="inline-flex items-center justify-center px-2 py-[3px] text-center leading-[1.1] text-[13px] font-medium text-[#D4AC4C] bg-white border border-[#D4AC4C]">
                                            6ヶ月
                                            <br />
                                            定期購入
                                        </span>
                                        <div className="flex items-baseline gap-1 whitespace-nowrap">
                                            <span className="text-[36px] font-bold text-[#E00000] leading-none">
                                                1,212
                                            </span>
                                            <span className="text-[34px] font-bold text-[#E00000] leading-none">
                                                円
                                            </span>
                                            <span className="text-[15px] text-[#666666] leading-none ml-1">
                                                （税抜）
                                            </span>
                                        </div>
                                        <span className="text-[14px] text-[#E00000] justify-self-end text-right leading-[1.1] mt-[6px]">
                                            1袋あたり
                                            <br />
                                            242円
                                        </span>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between gap-4">
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
                                        <Link
                                            href={purchaseHistory()}
                                            className="grid grid-cols-[20px_1fr] items-center w-[240px] px-10 py-3 text-base font-medium bg-[#E00000] text-white hover:bg-[#E00000]/90 transition-colors"
                                        >
                                            <ShoppingCart className="size-5 justify-self-start" />
                                            <span className="text-center">サブスク購入する</span>
                                        </Link>
                                    </div>
                                    <hr className="mt-4 border-t border-[#D9D9D9]" />
                                </>
                            ) : (
                                <>
                                    <h2 className="text-[34px] font-bold text-[#231C1D]">
                                        天空隊長 5袋セット
                                    </h2>
                                    <p className="text-[16px] text-[#231C1D] py-2 px-3 bg-[#F8F2E2] w-full">
                                        6ヶ月のサブスク購入で通常価格より20%OFF
                                    </p>
                                    <div className="mt-2 grid grid-cols-[auto_1fr_auto] items-start gap-x-3">
                                        <span className="mt-2 inline-flex items-center justify-center px-2 py-[3px] text-center leading-[1.1] text-[13px] font-medium text-[#E00000] bg-white border border-[#E00000]">
                                            通常購入
                                        </span>
                                        <div className="flex items-baseline gap-1 whitespace-nowrap">
                                            <span className="text-[36px] font-bold text-[#E00000] leading-none">
                                                1,515
                                            </span>
                                            <span className="text-[34px] font-bold text-[#E00000] leading-none">
                                                円
                                            </span>
                                            <span className="text-[15px] text-[#666666] leading-none ml-1">
                                                （税抜）
                                            </span>
                                        </div>
                                        <span className="text-[14px] text-[#E00000] justify-self-end text-right leading-[1.1] mt-[6px]">
                                            1袋あたり
                                            <br />
                                            305円
                                        </span>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-5">
                                            <span className="text-[16px] font-medium text-[#231C1D]">
                                                数量
                                            </span>
                                            <input
                                                type="number"
                                                min={1}
                                                defaultValue={1}
                                                className="h-10 w-24 rounded-sm border border-[#D9D9D9] px-3 text-[16px] text-[#231C1D] focus:outline-none focus:ring-2 focus:ring-[#D4AC4C]/40"
                                            />
                                        </div>
                                        <Link
                                            href={purchaseHistory()}
                                            className="grid grid-cols-[20px_1fr] items-center w-[240px] px-10 py-3 text-base font-medium bg-[#E00000] text-white hover:bg-[#E00000]/90 transition-colors"
                                        >
                                            <ShoppingCart className="size-5 justify-self-start" />
                                            <span className="text-center">通常購入する</span>
                                        </Link>
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
