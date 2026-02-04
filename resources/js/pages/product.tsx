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

    return (
        <>
            <Head>
                <title>購入画面 | 天空隊長</title>
                <meta name="description" content="天空隊長のご購入はこちら。6ヶ月サブスク購入で20%OFF。" />
            </Head>
            <div className="min-h-screen bg-white">
                <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-8 md:py-12">
                    <p className="text-dark text-sm mb-2">購入画面_サブスク購入</p>
                    <h1 className="text-dark text-xl md:text-2xl font-semibold mb-1">
                        明日も美しく空を馳せる「お酒好きのおとも」！
                    </h1>
                    <h2 className="text-purple text-2xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-mplus2)' }}>
                        天空隊長
                    </h2>
                    <p className="text-dark text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
                        飲む前のケアに。必須アミノ酸を含む9種類のアミノ酸とNMN（美容成分）をバランスよく配合。さっぱりラムネ味で水にサッと溶ける顆粒タイプです。
                    </p>

                    <div className="flex flex-col md:flex-row gap-8 mb-8">
                        <div className="flex-shrink-0">
                            <img
                                src="/images/天空隊長.png"
                                alt="天空隊長"
                                className="w-full max-w-[280px] h-auto object-contain"
                            />
                        </div>
                        <div className="text-dark text-sm">
                            <p><span className="font-medium">名称：</span>○○食品</p>
                            <p><span className="font-medium">内容量：</span>3g × {bags}袋</p>
                        </div>
                    </div>

                    <div className="border border-purple/30 rounded-lg overflow-hidden mb-6">
                        <div className="flex">
                            <button
                                type="button"
                                onClick={() => setMethod('subscription')}
                                className={`flex-1 py-3 px-4 text-center font-semibold transition-colors ${
                                    method === 'subscription'
                                        ? 'bg-gold text-dark'
                                        : 'bg-purple text-white'
                                }`}
                            >
                                6ヶ月サブスク購入
                            </button>
                            <button
                                type="button"
                                onClick={() => setMethod('normal')}
                                className={`flex-1 py-3 px-4 text-center font-semibold transition-colors ${
                                    method === 'normal'
                                        ? 'bg-gold text-dark'
                                        : 'bg-purple text-white'
                                }`}
                            >
                                通常購入
                            </button>
                        </div>

                        <div className="bg-white p-6 md:p-8 border-t border-purple/20">
                            <div className="bg-[#F5F0E6] border border-gold/50 rounded px-4 py-2 mb-6 inline-block">
                                <span className="text-dark text-sm md:text-base">
                                    6ヶ月のサブスク購入で通常価格より20%OFF
                                </span>
                            </div>
                            <p className="text-dark font-medium mb-4">天空隊長 {bags}袋セット</p>

                            {method === 'subscription' ? (
                                <>
                                    <p className="text-dark text-sm mb-1">6ヶ月定期購入</p>
                                    <p className="text-[#ED0000] text-2xl md:text-3xl font-bold">
                                        {prices.subTotal.toLocaleString()}円 <span className="text-base font-normal">(税抜)</span>
                                    </p>
                                    <p className="text-dark text-sm mt-1">1袋あたり {prices.subPerBag}円</p>
                                    <div className="mt-6">
                                        <Link
                                            href={`/checkout?variant=${bags}&type=subscription`}
                                            className="w-full max-w-md bg-[#ED0000] text-white font-semibold py-3 px-6 rounded-full inline-flex items-center justify-center gap-2 hover:opacity-90"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="9" cy="21" r="1" />
                                                <circle cx="20" cy="21" r="1" />
                                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                            </svg>
                                            サブスク購入する
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="text-dark text-sm mb-1">通常購入</p>
                                    <p className="text-[#ED0000] text-2xl md:text-3xl font-bold">
                                        {prices.normalTotal.toLocaleString()}円 <span className="text-base font-normal">(税抜)</span>
                                    </p>
                                    <p className="text-dark text-sm mt-1">1袋あたり {prices.normalPerBag}円</p>
                                    <div className="flex items-center gap-2 mt-4">
                                        <label htmlFor="quantity" className="text-dark font-medium">数量</label>
                                        <input
                                            id="quantity"
                                            type="number"
                                            min={1}
                                            max={99}
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, Math.min(99, Number(e.target.value) || 1)))}
                                            className="w-20 border border-border rounded px-2 py-1 text-center"
                                        />
                                    </div>
                                    <div className="mt-6">
                                        <Link
                                            href={`/checkout?variant=${bags}&type=normal`}
                                            className="w-full max-w-md bg-[#ED0000] text-white font-semibold py-3 px-6 rounded-full inline-flex items-center justify-center gap-2 hover:opacity-90"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="9" cy="21" r="1" />
                                                <circle cx="20" cy="21" r="1" />
                                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                            </svg>
                                            通常購入する
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <p className="text-dark text-sm leading-relaxed">
                        注文完了日から1~3営業日以内に郵送いたします。オリジナル封筒にてお届けしますので、到着まで少々お待ちいただけますと幸いです。
                    </p>

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
