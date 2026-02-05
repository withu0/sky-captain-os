import { Head, Link } from '@inertiajs/react';
import EcommerceLayout from '@/layouts/ecommerce-layout';

export default function OrderComplete({ orderNumber = '00000000' }: { orderNumber?: string }) {
    return (
        <EcommerceLayout>
            <Head>
                <title>購入完了 | 天空隊長</title>
            </Head>
            <div className="bg-white min-h-screen">
                {/* Header Section */}
                <div className="max-w-[1000px] mx-auto px-4 md:px-8 pt-10 pb-4 border-b border-border">
                    <h1 className="text-dark text-2xl font-medium opacity-80">ご注文完了</h1>
                </div>

                {/* Main Content */}
                <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-10 md:py-20">
                    <div className="flex flex-col items-center gap-10 md:gap-20">
                        <div className="flex flex-col items-center gap-5 w-full max-w-[300px]">
                            {/* Check Icon */}
                            <div className="w-40 h-40 md:w-44 md:h-44 rounded-full bg-[#6B2759] flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="120"
                                    height="120"
                                    viewBox="0 0 24 24"
                                    fill="white"
                                >
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                            </div>

                            {/* Thank You Message */}
                            <p className="text-[#6B2759] text-xl font-bold text-center w-full">
                                ご注文ありがとうございました！
                            </p>

                            {/* Order Number */}
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-dark text-xl opacity-80">注文番号：</span>
                                <span className="text-dark text-xl font-mono opacity-80">{orderNumber}</span>
                            </div>
                        </div>

                        {/* Order Confirmation Message */}
                        <div className="w-full max-w-[1000px]">
                            <p className="text-dark text-sm md:text-base leading-relaxed text-center opacity-80">
                                ご注文ありがとうございます！<br className="hidden md:block" />
                                注文内容が記載された確認メールを送信しました。<br className="hidden md:block" />
                                商品が発送されるまでしばらくお待ちください。
                            </p>
                        </div>

                        {/* Button */}
                        <div className="flex justify-center">
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center bg-[#DCC364] text-white font-medium py-3 px-10 rounded hover:opacity-90 text-base"
                            >
                                トップページへ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </EcommerceLayout>
    );
}