import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

const PRICE_MAP: Record<string, { subTotal: number; subPerBag: number; normalTotal: number; normalPerBag: number }> = {
    '5': { subTotal: 1212, subPerBag: 242, normalTotal: 1515, normalPerBag: 305 },
    '10': { subTotal: 2424, subPerBag: 242, normalTotal: 3800, normalPerBag: 380 },
    '20': { subTotal: 4480, subPerBag: 224, normalTotal: 6400, normalPerBag: 320 },
};

type PurchaseMethod = 'subscription' | 'normal';

export default function Product({ variant = '5' }: { variant: string }) {
    const [method, setMethod] = useState<PurchaseMethod>('subscription');
    const [quantity, setQuantity] = useState(1);
    const prices = PRICE_MAP[variant] ?? PRICE_MAP['5'];
    const bags = variant;

    const CartIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
    );

    return (
        <>
            <Head>
                <title>購入画面 | 天空隊長</title>
                <meta name="description" content="天空隊長のご購入はこちら。6ヶ月サブスク購入で20%OFF。" />
            </Head>
            <div className="min-h-screen bg-white">
                <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-8 md:py-12">

                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8 border border-[#e0e0e0] rounded-lg p-4 md:p-5">
                        <div className="w-full md:w-[45%] flex-shrink-0 border border-[#e0e0e0] bg-[#f8f8f8] flex items-center justify-center overflow-hidden rounded aspect-square md:aspect-auto md:min-h-[200px]">
                            <img
                                src="/images/5.png"
                                alt="天空隊長"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="w-full md:w-[55%] min-w-0 flex flex-col justify-center">
                            <p className="text-[#333333] text-sm md:text-base mb-1.5">
                                明日も美しく空を馳せる「お酒好きのおとも」!
                            </p>
                            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: '#541F7B' }}>
                                天空隊長
                            </h2>
                            <p className="text-[#333333] text-sm md:text-base leading-relaxed mb-4">
                                お酒を飲む前にしっかりケアしたい方のために、必須アミノ酸を含む9種類のアミノ酸とNMN(美容成分)をバランスよく配合しました。クセのない爽やかなラムネ風味で飲みやすく、水にサッと溶ける顆粒タイプなので気軽に飲めます。
                            </p>
                            <div className="text-[#333333] text-sm md:text-base space-y-0.5">
                                <p><span className="font-medium">名称</span> ○○食品</p>
                                <p><span className="font-medium">内容量</span> ○g</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-2 border-[#DDC888] rounded-t-lg overflow-hidden mb-6">
                        <div className="flex -mb-px">
                            <button
                                type="button"
                                onClick={() => setMethod('subscription')}
                                className={`flex-1 py-3 px-4 text-center font-semibold transition-colors rounded-tl-lg ${method === 'subscription'
                                    ? 'bg-[#6D3D7D] text-white'
                                    : 'bg-[#DDC888] text-[#333333]'
                                    }`}
                            >
                                6ヶ月サブスク購入
                            </button>
                            <button
                                type="button"
                                onClick={() => setMethod('normal')}
                                className={`flex-1 py-3 px-4 text-center font-semibold transition-colors rounded-tr-lg ${method === 'normal'
                                    ? 'bg-[#6D3D7D] text-white'
                                    : 'bg-[#DDC888] text-[#333333]'
                                    }`}
                            >
                                通常購入
                            </button>
                        </div>

                        <div className="bg-white border-2 border-[#DDC888] border-t-0 rounded-b-lg">
                            <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-[45%] flex-shrink-0 border border-[#e0e0e0] bg-[#f8f8f8] flex items-center justify-center overflow-hidden m-4 md:m-6 aspect-square md:aspect-auto md:min-h-[180px] rounded">
                                    <img
                                        src="/images/5.png"
                                        alt="天空隊長"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="w-full md:w-[55%] p-4 md:p-6 flex flex-col min-w-0">
                                    <h2 className="text-[#000000] font-bold text-[28px] md:text-[32px] mb-4">天空隊長 {bags} 袋セット</h2>
                                    <div className="bg-[#FDF5E6] rounded px-4 py-3 mb-5 inline-block max-w-full border-0">
                                        <span className="text-[#000000] text-[14px] md:text-[15px]">
                                            6ヶ月のサブスク購入で通常価格より20%OFF
                                        </span>
                                    </div>

                                    {method === 'subscription' ? (
                                        <>
                                            <div className="flex flex-nowrap items-baseline gap-4 mb-2">
                                                <div className="flex-shrink-0 bg-[#FDF5E6] border border-[#EEDC82] rounded px-3 py-2 text-center">
                                                    <span className="text-[#000000] text-[14px] block leading-tight">6ヶ月</span>
                                                    <span className="text-[#000000] text-[14px] block leading-tight">定期購入</span>
                                                </div>
                                                <div className="flex flex-wrap items-baseline gap-1.5 min-w-0">
                                                    <span className="text-[#E50000] text-[32px] md:text-[40px] font-bold leading-none">
                                                        {prices.subTotal.toLocaleString()}
                                                    </span>
                                                    <span className="text-[#E50000] text-[20px] md:text-[24px] font-normal align-top">円</span>
                                                    <span className="text-[#555555] text-[12px] md:text-[13px] align-top">(税抜)</span>
                                                </div>
                                                <div className="ml-auto text-right flex-shrink-0">
                                                    <span className="text-[#E50000] text-[12px] md:text-[13px] block">1袋あたり</span>
                                                    <span className="text-[#E50000] text-[12px] md:text-[13px] block font-medium">{prices.subPerBag}円</span>
                                                </div>
                                            </div>
                                            <Link
                                                href={`/checkout?variant=${bags}&type=subscription`}
                                                className="inline-flex items-center justify-center gap-2 bg-[#E50000] text-white font-bold text-[16px] md:text-[18px] py-3.5 px-6 rounded hover:opacity-90 w-full mt-8"
                                            >
                                                <CartIcon />
                                                サブスク購入する
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex flex-nowrap items-baseline gap-4 mb-2">
                                                <span className="flex-shrink-0 bg-white border border-[#E72F2F] text-[#E72F2F] rounded px-3 py-1.5 text-[14px] font-medium">
                                                    通常購入
                                                </span>
                                                <div className="flex flex-wrap items-baseline gap-1.5 min-w-0">
                                                    <span className="text-[#E72F2F] text-[32px] md:text-[40px] font-bold leading-none">
                                                        {prices.normalTotal.toLocaleString()}
                                                    </span>
                                                    <span className="text-[#E72F2F] text-[20px] md:text-[24px] font-normal align-top">円</span>
                                                    <span className="text-[#333333] text-[12px] md:text-[13px] align-top">(税抜)</span>
                                                </div>
                                                <div className="ml-auto text-right flex-shrink-0">
                                                    <span className="text-[#E72F2F] text-[12px] md:text-[13px] block">1袋あたり</span>
                                                    <span className="text-[#E72F2F] text-[12px] md:text-[13px] block font-medium">{prices.normalPerBag}円</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-3 mt-6 mb-0">
                                                <label htmlFor="quantity" className="text-[#333333] font-normal text-[16px]">数量</label>
                                                <input
                                                    id="quantity"
                                                    type="number"
                                                    min={1}
                                                    max={99}
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(Math.max(1, Math.min(99, Number(e.target.value) || 1)))}
                                                    className="w-16 border border-[#CCCCCC] rounded px-2 py-2 text-center text-[16px] text-[#333333]"
                                                />
                                                <Link
                                                    href={`/checkout?variant=${bags}&type=normal`}
                                                    className="inline-flex items-center justify-center gap-2 bg-[#E72F2F] text-white font-bold text-[16px] py-3 px-6 rounded hover:opacity-90"
                                                >
                                                    <CartIcon />
                                                    通常購入する
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                    <hr className="border-0 h-px bg-[#E0E0E0] my-6 w-full" />
                                    <p className="text-[#333333] text-[14px] md:text-[15px] leading-relaxed mt-0">
                                        注文完了日から1~3営業日以内に郵送いたします。オリジナル封筒にてお届けしますので、到着まで少々お待ちいただけますと幸いです。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link href="/" className="text-purple font-medium hover:underline">
                            ← トップへ戻る
                        </Link>
                        <Link href="/cart" className="text-purple font-medium hover:underline">
                            カート
                        </Link>
                        <Link href="/purchase-history" className="text-purple font-medium hover:underline">
                            購入履歴
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
