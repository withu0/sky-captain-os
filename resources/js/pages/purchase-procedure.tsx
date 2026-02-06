import AppLayout from '@/layouts/app-layout';
import { purchase, purchaseComplete } from '@/routes';
import { Head, Link, router } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';

const MOCK_ADDRESSES = [
    { value: '980-1234', label: '980-1234   東京都〇〇区△△1-23-4' },
    {
        value: '000-1234',
        label: '000-1234   沖縄県那覇市おもろまち1-23-4 おもろまちマンション1304',
    },
] as const;

export default function PurchaseProcedure() {
    const [address, setAddress] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [addressError, setAddressError] = useState<string>('');
    const [paymentError, setPaymentError] = useState<string>('');

    const handleNext = () => {
        let hasError = false;
        if (!address.trim()) {
            setAddressError('住所を選択してください。');
            hasError = true;
        } else {
            setAddressError('');
        }
        if (paymentMethod !== 'credit') {
            setPaymentError('お支払い方法を選択してください。');
            hasError = true;
        } else {
            setPaymentError('');
        }
        if (!hasError) {
            router.visit(purchaseComplete());
        }
    };

    return (
        <AppLayout sidebar={false}>
            <Head title="購入手続き | 天空隊長" />
            <div className="mx-auto w-full max-w-[980px] px-4 sm:px-6 pt-4 pb-8 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3">
                    <Link
                        href={purchase()}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D9D9D9] bg-white text-[#231C1D] hover:bg-[#F5F5F5]"
                        aria-label="戻る"
                    >
                        <ChevronLeft className="size-5" />
                    </Link>
                    <h1 className="text-[18px] sm:text-[20px] font-bold text-[#231C1D] truncate min-w-0">
                        購入手続き
                    </h1>
                </div>
                <hr className="mt-3 border-t border-[#D9D9D9]" />

                <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
                    <section className="rounded-[3px] border border-[#D9D9D9] bg-white p-4 sm:p-6 shadow-sm">
                        <h2 className="text-sm sm:text-base font-bold text-[#231C1D]">
                            1. お届け先
                        </h2>
                        <p className="mt-2 text-[13px] sm:text-[14px] text-[#231C1D]">
                            商品をお届けする住所を入力してください。
                        </p>
                        <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                            <select
                                name="address"
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                    setAddressError('');
                                }}
                                className={`min-w-0 flex-1 rounded-[3px] border bg-white px-3 py-2.5 text-[13px] sm:text-[14px] text-[#231C1D] focus:outline-none focus:ring-2 focus:ring-[#D4AC4C]/40 ${
                                    addressError ? 'border-[#E00000]' : 'border-[#D9D9D9]'
                                }`}
                            >
                                <option value="">選択してください</option>
                                {MOCK_ADDRESSES.map((addr) => (
                                    <option key={addr.value} value={addr.value}>
                                        {addr.label}
                                    </option>
                                ))}
                            </select>
                            <Link
                                href="/purchase-procedure/addresses"
                                className="shrink-0 text-[13px] sm:text-[14px] font-medium text-[#2563eb] hover:underline"
                            >
                                変更
                            </Link>
                        </div>
                        {addressError && (
                            <p className="mt-2 text-[12px] sm:text-[13px] text-[#E00000]">
                                {addressError}
                            </p>
                        )}
                    </section>

                    <section className="rounded-[3px] border border-[#D9D9D9] bg-white p-4 sm:p-6 shadow-sm">
                        <h2 className="text-sm sm:text-base font-bold text-[#231C1D]">
                            2. お支払い方法
                        </h2>
                        <p className="mt-2 text-[13px] sm:text-[14px] text-[#231C1D]">
                            お支払方法を下記より選択してください。
                        </p>
                        <label
                            className={`mt-3 flex cursor-pointer items-center gap-2 sm:gap-3 rounded-[3px] border bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#D4AC4C]/40 ${
                                paymentError
                                    ? 'border-[#E00000]'
                                    : paymentMethod === 'credit'
                                      ? 'border-[#93C5FD]'
                                      : 'border-[#D9D9D9]'
                            }`}
                        >
                            <input
                                type="radio"
                                name="payment"
                                value="credit"
                                checked={paymentMethod === 'credit'}
                                onChange={() => {
                                    setPaymentMethod('credit');
                                    setPaymentError('');
                                }}
                                className="size-4 shrink-0 border-[#D9D9D9] text-[#2563eb] focus:ring-0 focus:ring-offset-0"
                            />
                            <span className="text-[13px] sm:text-[14px] text-[#231C1D]">
                                クレジットカード
                            </span>
                        </label>
                        {paymentMethod === 'credit' && (
                            <div className="mt-3 rounded-[3px] border border-[#D9D9D9] bg-white px-3 sm:px-4 py-3">
                                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start sm:justify-between gap-3 sm:gap-4">
                                    <div className="min-w-0">
                                        <p className="text-[13px] sm:text-[14px] font-medium text-[#231C1D]">
                                            VISA 末尾 0000
                                        </p>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[11px] sm:text-[12px] text-[#666666]">
                                            クレジットカード名義人
                                        </p>
                                        <p className="text-[13px] sm:text-[14px] font-medium text-[#231C1D]">
                                            TARO YAMADA
                                        </p>
                                    </div>
                                    <div className="sm:text-right min-w-0">
                                        <p className="text-[11px] sm:text-[12px] text-[#666666]">
                                            有効期限
                                        </p>
                                        <p className="text-[13px] sm:text-[14px] font-medium text-[#231C1D]">
                                            01/2027
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {paymentError && (
                            <p className="mt-2 text-[12px] sm:text-[13px] text-[#E00000]">
                                {paymentError}
                            </p>
                        )}
                    </section>

                    <section className="rounded-[3px] border border-[#D9D9D9] bg-white p-4 sm:p-6 shadow-sm">
                        <h2 className="text-sm sm:text-base font-bold text-[#231C1D]">
                            3. 商品詳細
                        </h2>
                        <div className="mt-4 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                            <div className="flex w-full max-w-[200px] sm:max-w-[240px] lg:w-[260px] lg:max-w-none shrink-0 items-center justify-center border-2 border-border bg-transparent p-2 sm:p-3 mx-auto lg:mx-0">
                                <div className="relative w-full aspect-[2/1] overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <img
                                            src="/images/スクリーンショット.png"
                                            alt="天空隊長10袋セット"
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
                                            className="font-bold text-[10px] sm:text-[12px]"
                                            style={{
                                                color: '#DCC364',
                                                WebkitTextStroke: '1px #000000',
                                                paintOrder: 'stroke fill',
                                            }}
                                        >
                                            商品画像
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5 min-w-0 lg:ml-8">
                                <span className="text-[13px] sm:text-[14px] font-medium text-[#231C1D]">
                                    天空隊長10袋セット
                                </span>
                                <span className="text-[13px] sm:text-[14px] font-medium text-[#231C1D]">
                                    2,240円
                                </span>
                                <span className="inline-flex w-fit items-center rounded border border-[#D4AC4C] bg-[#F8F2E2] px-2 py-1 text-[11px] sm:text-[12px] font-medium text-[#D4AC4C]">
                                    6ヶ月定期購入
                                </span>
                            </div>
                        </div>
                    </section>

                    <div className="pt-1">
                        <button
                            type="button"
                            onClick={handleNext}
                            className="w-full rounded-[4px] bg-[#D4AC4C] px-6 sm:px-8 py-2.5 text-[14px] sm:text-base font-medium text-white hover:bg-[#D4AC4C]/90"
                        >
                            次へ
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
