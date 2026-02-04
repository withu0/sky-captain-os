import { Head, Link } from '@inertiajs/react';

export default function OrderComplete({ orderNumber = '00000000' }: { orderNumber?: string }) {
    return (
        <>
            <Head>
                <title>購入完了 | 天空隊長</title>
            </Head>
            <div className="min-h-screen bg-white">
                <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-8 md:py-12">
                    <div className="bg-white border border-border rounded-lg shadow-sm p-6 md:p-10 max-w-xl mx-auto">
                        <h1 className="text-dark text-xl md:text-2xl font-bold mb-2">ご注文完了</h1>
                        <div className="h-px bg-border mb-8 w-full max-w-md" />
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-purple flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-center text-xl md:text-2xl font-semibold mb-4" style={{ color: '#9B2D6B' }}>
                            ご注文ありがとうございました!
                        </p>
                        <p className="text-dark text-center mb-6">
                            注文番号: <span className="font-mono">{orderNumber}</span>
                        </p>
                        <p className="text-dark text-sm leading-relaxed text-center mb-8">
                            ご注文ありがとうございます! 注文内容が記載された確認メールを送信しました。商品が発送されるまでしばらくお待ちください。
                        </p>
                        <div className="flex justify-center">
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center bg-gold text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90"
                            >
                                トップページへ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
