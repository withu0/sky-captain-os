import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import EcommerceLayout from '@/layouts/ecommerce-layout';

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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.32 8.33H24L21.6 18.66C21.6 19.08 21.44 19.48 21.15 19.78C20.86 20.08 20.46 20.25 20.04 20.25H9.96C9.54 20.25 9.14 20.08 8.85 19.78C8.56 19.48 8.4 19.08 8.4 18.66L6 6H0" fill="white" />
        </svg>
    );

    const UpArrowIcon = () => (
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-180">
            <path d="M4 1L7 7H1L4 1Z" fill="#2D3842" />
        </svg>
    );

    const DownArrowIcon = () => (
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 1L7 7H1L4 1Z" fill="#2D3842" />
        </svg>
    );

    return (
        <EcommerceLayout>
            <Head>
                <title>購入画面 | 天空隊長</title>
                <meta name="description" content="天空隊長のご購入はこちら。6ヶ月サブスク購入で20%OFF。" />
            </Head>

            <div className="bg-white box-border relative max-w-[1200px] mx-auto font-noto">
                {/* Top Section - Product Info */}
                <div className="flex flex-row justify-between items-start gap-[42px] w-[999px] h-[315px] mx-auto mt-[60px]">
                    {/* Product Image */}
                    <div className="box-border flex flex-col justify-center items-center p-[40px] gap-[10px] w-[440px] h-[315px] bg-white">
                        <div className="w-[322.37px] h-[151.7px] relative">
                            <div
                                className="absolute w-[322.37px] h-[151.7px] bg-cover bg-center"
                                style={{ backgroundImage: 'url(/images/5.png)' }}
                            />
                            {/* Rectangle 37 - Figma: 321.54×151.7, rgba(217,217,217,0.6), border 1px #000 */}
                            <div
                                className="absolute w-[160px] h-[48px] top-1/2 -translate-y-1/2 font-[Inter] font-semibold text-[40px] leading-[48px] text-[#DCC364] flex items-center justify-center"
                                style={{ left: 'calc(50% - 160px/2 - 0.5px)' }}
                            >
                                商品画像
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col items-start gap-[43px] w-[480px] h-[235px]">
                        <div className="flex flex-col items-start gap-[20px] w-[480px] h-[146px]">
                            <div className="flex flex-col items-start gap-[10px] w-[480px] h-[58px]">
                                <p className="w-[480px] h-[16px] font-normal text-[16px] leading-[100%] tracking-[0.04em] text-[#231C1D] m-0">
                                    明日も美しく 空を馳せる「お酒好きのおとも」！
                                </p>
                                <h1 className="w-[480px] h-[32px] font-normal text-[32px] leading-[100%] text-[#231C1D] m-0">
                                    天空隊長
                                </h1>
                            </div>
                            <p className="w-[480px] h-[68px] font-normal text-[14px] leading-[17px] text-[#231C1D] m-0">
                                お酒を飲む前にしっかりケアしたい方のために、必須アミノ酸を含む９種類のアミノ酸とNMN（美容成分）をバランスよく配合しました。 クセのない爽やかなラムネ風味で飲みやすく、水にサッと溶ける顆粒タイプなので気軽に飲めます。
                            </p>
                        </div>

                        <div className="flex flex-col items-start gap-[12px] w-[135px] h-[46px]">
                            <div className="flex flex-row items-center gap-[40px] w-[138px] h-[17px]">
                                <span className="w-[42px] h-[17px] font-normal text-[14px] leading-[17px] text-[#231C1D]">
                                    名称
                                </span>
                                <span className="w-[56px] h-[17px] font-normal text-[14px] leading-[17px] text-[rgba(35,28,29,0.6)]">
                                    〇〇食品
                                </span>
                            </div>
                            <div className="flex flex-row items-center gap-[40px] w-[135px] h-[17px]">
                                <span className="w-[42px] h-[17px] font-normal text-[14px] leading-[17px] text-[#231C1D]">
                                    内容量
                                </span>
                                <span className="w-[22px] h-[17px] font-normal text-[14px] leading-[17px] text-[rgba(35,28,29,0.6)]">
                                    ○g
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Purchase Options */}
                <div className="flex flex-col items-start w-[999px] h-[406px] mx-auto mt-[55px] relative">
                    {/* Tabs */}
                    <div className="flex flex-row items-center gap-[3px] w-[999px] h-[42px]">
                        {method === 'subscription' ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setMethod('subscription')}
                                    className="box-border flex flex-row justify-center items-center p-[8px] gap-[10px] w-[498px] h-[42px] bg-[#DCC364] border border-[#DCC364] cursor-pointer"
                                >
                                    <span className="w-[172px] h-[24px] font-medium text-[20px] leading-[24px] text-white">
                                        6ヶ月サブスク購入
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMethod('normal')}
                                    className="box-border flex flex-row justify-center items-center p-[8px_8px_10px] gap-[10px] w-[498px] h-[42px] bg-[#6B2759] border-b-[3px] border-b-white cursor-pointer"
                                >
                                    <span className="w-[80px] h-[24px] font-medium text-[20px] leading-[24px] text-white">
                                        通常購入
                                    </span>
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setMethod('subscription')}
                                    className="box-border flex flex-row justify-center items-center p-[8px_8px_10px] gap-[10px] w-[498px] h-[40px] bg-[#6B2759] border-b-[3px] border-b-white cursor-pointer"
                                >
                                    <span className="w-[155px] h-[22px] font-medium text-[18px] leading-[22px] text-white">
                                        6ヶ月サブスク購入
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMethod('normal')}
                                    className="box-border flex flex-row justify-center items-center p-[8px] gap-[10px] w-[498px] h-[40px] bg-[#DCC364] border border-[#DCC364] cursor-pointer"
                                >
                                    <span className="w-[80px] h-[24px] font-medium text-[20px] leading-[24px] text-white">
                                        通常購入
                                    </span>
                                </button>
                            </>
                        )}
                    </div>

                    {/* Content Box */}
                    <div className="box-border flex flex-row justify-between items-center p-[40px] gap-[125px] w-[999px] h-[366px] border-4 border-[#DCC364]">
                        {/* Product Image */}
                        <div className="box-border flex flex-col justify-center items-center p-[40px] gap-[10px] w-[398px] h-[286px] bg-white border border-[#E1E1E1]">
                            <div className="w-[322.37px] h-[151.7px] relative">
                                <div
                                    className="absolute w-[322.37px] h-[151.7px] bg-cover bg-center"
                                    style={{ backgroundImage: 'url(/images/5.png)' }}
                                />
                                <div
                                    className="absolute w-[160px] h-[48px] top-1/2 -translate-y-1/2 font-[Inter] font-semibold text-[40px] leading-[48px] text-[#DCC364] flex items-center justify-center"
                                    style={{ left: 'calc(50% - 160px/2 - 0.5px)' }}
                                >
                                    商品画像
                                </div>
                            </div>
                        </div>

                        {/* Purchase Details */}
                        <div className="flex flex-col justify-center items-end gap-[20px] w-[400px] h-[286px]">
                            <div className="flex flex-col items-end gap-[20px] w-[400px] h-[195px]">
                                <div className="flex flex-col items-start gap-[8px] w-[400px] h-[135px]">
                                    <div className="flex flex-col items-start gap-[8px] w-[400px] h-[79px]">
                                        <div className="flex flex-row justify-center items-end gap-[10px] w-[300px] h-[40px]">
                                            <span className="w-[300px] h-[36px] font-normal text-[30px] leading-[36px] text-[#231C1D]">
                                                天空隊長 {bags}  袋セット
                                            </span>
                                        </div>

                                        <div className="flex flex-row items-center p-[6px_10px] gap-[10px] w-[400px] h-[31px] bg-[rgba(220,195,100,0.3)]">
                                            <span className="w-[327px] h-[19px] font-normal text-[16px] leading-[19px] text-[rgba(35,28,29,0.8)]">
                                                6ヶ月のサブスク購入で通常価格より20%OFF
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-row justify-between items-center gap-[20px] w-[400px] h-[48px]">
                                        {method === 'subscription' ? (
                                            <>
                                                <div className="flex flex-row items-center gap-[10px] w-[276px] h-[48px]">
                                                    <div className="box-border flex flex-row justify-center items-center p-[8px] gap-[10px] w-[68px] h-[48px] bg-[rgba(220,195,100,0.08)] border border-[#DCC364]">
                                                        <span className="w-[52px] h-[32px] font-bold text-[13px] leading-[16px] text-[#DCC364] flex flex-col items-center justify-center">
                                                            6ヶ月 定期購入
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-row items-end gap-[4px] w-[198px] h-[48px]">
                                                        <span className="w-[104px] h-[48px] font-medium text-[40px] leading-[48px] text-center text-[#FF0024]">
                                                            {prices.subTotal.toLocaleString()}
                                                        </span>
                                                        <span className="w-[32px] h-[38px] font-normal text-[32px] leading-[38px] text-center text-[#FF0024]">
                                                            円
                                                        </span>
                                                        <span className="w-[54px] h-[31px] font-normal text-[20px] leading-[24px] text-[rgba(35,28,29,0.8)]">
                                                            (税抜)
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col justify-center items-center gap-[2px] w-[73px] h-[48px]">
                                                    <span className="w-[73px] h-[19px] font-normal text-[16px] leading-[19px] text-center text-[#FF0024]">
                                                        1袋あたり
                                                    </span>
                                                    <span className="w-[73px] h-[19px] font-normal text-[16px] leading-[19px] text-center text-[#FF0024]">
                                                        {prices.subPerBag}円
                                                    </span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex flex-row items-center gap-[10px] w-[276px] h-[48px]">
                                                    <div className="box-border flex flex-row justify-center items-center p-[6px] gap-[10px] w-[68px] h-[32px] border border-[#FF0024]">
                                                        <span className="w-[52px] h-[16px] font-medium text-[13px] leading-[16px] text-[#FF0024]">
                                                            通常購入
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-row items-end gap-[4px] w-[198px] h-[48px]">
                                                        <span className="w-[104px] h-[48px] font-medium text-[40px] leading-[48px] text-center text-[#FF0024]">
                                                            {prices.normalTotal.toLocaleString()}
                                                        </span>
                                                        <span className="w-[32px] h-[38px] font-normal text-[32px] leading-[38px] text-center text-[#FF0024]">
                                                            円
                                                        </span>
                                                        <span className="w-[54px] h-[31px] font-normal text-[20px] leading-[24px] text-[rgba(35,28,29,0.8)]">
                                                            (税抜)
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col justify-center items-center gap-[2px] w-[73px] h-[48px]">
                                                    <span className="w-[73px] h-[19px] font-normal text-[16px] leading-[19px] text-center text-[#FF0024]">
                                                        1袋あたり
                                                    </span>
                                                    <span className="w-[73px] h-[19px] font-normal text-[16px] leading-[19px] text-center text-[#FF0024]">
                                                        {prices.normalPerBag}円
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-row justify-between items-center gap-[20px] w-[400px] h-[40px]">
                                    {method === 'normal' && (
                                        <div className="flex flex-row items-center gap-[16px] w-[112px] h-[36px]">
                                            <span className="w-[32px] h-[16px] font-normal text-[16px] leading-[100%] text-[#231C1D]">
                                                数量
                                            </span>
                                            <div className="flex flex-row items-center gap-[8px] w-[64px] h-[36px]">
                                                <div className="flex flex-row justify-between items-center p-[6px_10px] gap-[10px] w-[64px] h-[36px] bg-white">
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        max={99}
                                                        value={quantity}
                                                        onChange={(e) => setQuantity(Math.max(1, Math.min(99, Number(e.target.value) || 1)))}
                                                        className="w-16 border border-[#CCCCCC] rounded px-2 py-2 text-center text-[16px] text-[#333333]"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <Link
                                        href={method === 'subscription'
                                            ? `/checkout?variant=${bags}&type=subscription`
                                            : `/checkout?variant=${bags}&type=normal&quantity=${quantity}`
                                        }
                                        className={`flex flex-row items-center ${method === 'subscription' ? 'p-[8px_16px] gap-[16px]' : 'p-[8px_16px] gap-[24px]'} w-[200px] h-[40px] bg-[#ED0000] no-underline`}
                                    >
                                        <div className="w-[24px] h-[24px] relative">
                                            <CartIcon />
                                        </div>
                                        <span className={`font-bold text-[16px] leading-[19px] text-center text-white ${method === 'subscription' ? 'w-[128px]' : 'w-[96px]'} h-[19px]`}>
                                            {method === 'subscription' ? 'サブスク購入する' : '通常購入する'}
                                        </span>
                                    </Link>
                                </div>
                            </div>

                            <div className="w-[400px] h-[0px] border border-[#E8E8E8]" />

                            <p className="w-[400px] h-[51px] font-normal text-[14px] leading-[17px] text-[#231C1D] m-0">
                                注文完了日から１～３営業日以内に郵送いたします。オリジナル封筒にてお届けますので、到着まで少々お待ちいただけますと幸いです。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </EcommerceLayout>
    );
}