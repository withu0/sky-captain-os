import AppLayout from '@/layouts/app-layout';
import { purchaseHistory } from '@/routes';
import { Head, Link } from '@inertiajs/react';
import { Check } from 'lucide-react';

export default function PurchaseComplete() {
    return (
        <AppLayout sidebar={false}>
            <Head title="ご注文完了 | 天空隊長" />
            <div className="mx-auto w-full max-w-[980px] px-4 pt-4 pb-8">
                {/* Title - same style as purchase procedure page */}
                <h1 className="text-[20px] font-bold text-[#231C1D]">
                    ご注文完了
                </h1>
                <hr className="mt-3 border-t border-[#D9D9D9]" />

                {/* Main confirmation area - centered */}
                <div className="mt-14 flex flex-col items-center text-center">
                    <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-[#5e225e] text-white md:h-32 md:w-32">
                        <Check className="size-14 stroke-[3] md:size-16" aria-hidden />
                    </div>
                    <p className="mt-8 text-[22px] font-bold text-[#5e225e]">
                        ご注文ありがとうございました!
                    </p>
                    <p className="mt-12 text-[14px] text-[#231C1D]">
                        注文番号 : 00000000
                    </p>
                    <div className="mt-12 flex max-w-[560px] flex-col gap-3 text-[14px] leading-relaxed text-[#231C1D]">
                        ご注文ありがとうございます!<br/>
                        注文内容が記載された確認メールを送信しました。<br/>
                        商品が発送されるまでしばらくお待ちください。<br/>
                    </div>
                    <Link
                        href={purchaseHistory()}
                        className="mt-14 inline-flex w-full max-w-[200px] items-center justify-center rounded-[4px] bg-[#D4AC4C] px-8 py-2.5 text-base font-medium text-[#231C1D] hover:bg-[#D4AC4C]/90"
                    >
                        トップページへ
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
