import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import EcommerceLayout from '@/layouts/ecommerce-layout';

export type Address = {
    id: string;
    surname: string;
    givenName: string;
    phone: string;
    postal1: string;
    postal2: string;
    prefecture: string;
    city: string;
    street: string;
    building: string;
};

const PREFECTURES = [
    '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県', '栃木県', '群馬県',
    '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県',
    '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
    '鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県',
    '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
];

const MOCK_ADDRESSES: Address[] = [
    {
        id: '1',
        surname: '山田',
        givenName: '太郎',
        phone: '0900000000',
        postal1: '980',
        postal2: '1234',
        prefecture: '東京都',
        city: '○○区△△',
        street: '1-23-4',
        building: '',
    },
    {
        id: '2',
        surname: '山田',
        givenName: '太郎',
        phone: '0900000000',
        postal1: '000',
        postal2: '1234',
        prefecture: '沖縄県',
        city: '那覇市あらまさ',
        street: '1-23-4',
        building: 'あらまさマンション1304',
    },
];

const emptyForm: Omit<Address, 'id'> = {
    surname: '',
    givenName: '',
    phone: '',
    postal1: '',
    postal2: '',
    prefecture: '',
    city: '',
    street: '',
    building: '',
};

type AddressesProps = {
    fromCheckout?: boolean;
    checkoutReturnUrl?: string;
};

export default function Addresses({ fromCheckout, checkoutReturnUrl = '/checkout' }: AddressesProps) {
    const [addresses, setAddresses] = useState<Address[]>(MOCK_ADDRESSES);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<Omit<Address, 'id'> & { id?: string }>({ ...emptyForm });

    const handleAddNew = () => {
        setEditingId(null);
        setForm({ ...emptyForm });
    };

    const handleEdit = (address: Address) => {
        setEditingId(address.id);
        setForm({
            surname: address.surname,
            givenName: address.givenName,
            phone: address.phone,
            postal1: address.postal1,
            postal2: address.postal2,
            prefecture: address.prefecture,
            city: address.city,
            street: address.street,
            building: address.building,
        });
    };

    const handleUseAddress = () => {
        const newAddress: Address = {
            id: editingId ?? String(Date.now()),
            surname: form.surname,
            givenName: form.givenName,
            phone: form.phone,
            postal1: form.postal1,
            postal2: form.postal2,
            prefecture: form.prefecture,
            city: form.city,
            street: form.street,
            building: form.building,
        };
        if (editingId) {
            setAddresses((prev) => prev.map((a) => (a.id === editingId ? newAddress : a)));
        } else {
            setAddresses((prev) => [...prev, newAddress]);
        }
        if (fromCheckout) {
            const sep = checkoutReturnUrl.includes('?') ? '&' : '?';
            router.visit(`${checkoutReturnUrl}${sep}address=${newAddress.id}`);
        } else {
            setForm({ ...emptyForm });
            setEditingId(null);
        }
    };

    const formatAddressLine = (a: Address) => {
        const base = `${a.prefecture}${a.city}${a.street}`;
        return a.building ? `${base} ${a.building}` : base;
    };

    return (
        <EcommerceLayout>
            <Head>
                <title>お届け先住所 | 天空隊長</title>
            </Head>
            <div className="min-h-screen bg-[#F8F8F8]">
                <div className="max-w-[800px] mx-auto px-4 py-8">
                    {/* Main Card Container */}
                    <div className="bg-white rounded-[3px] shadow-[0px_0px_4px_rgba(0,0,0,0.12)] p-5">
                        <div className="flex flex-col gap-3">
                            <h2 className="text-[#231C1D] text-xl font-normal">
                                お届け先住所を編集
                            </h2>

                            {/* Address List Section */}
                            <div className="flex flex-col justify-center items-start py-2 gap-5">

                                {/* Form Section */}
                                <div className="w-full">
                                    <div className="flex flex-col gap-2">
                                        {/* Name Fields */}
                                        <div className="flex flex-col gap-2">
                                            <div className="flex gap-2">
                                                <div className="flex flex-col justify-center items-start gap-2 flex-1">
                                                    <label className="text-[#231C1D] text-sm">
                                                        氏名（性）
                                                    </label>
                                                    <div className="flex items-center p-1 gap-2.5 border-2 border-[#D9D9D9] rounded-[3px] bg-white w-full">
                                                        <input
                                                            type="text"
                                                            value={form.surname}
                                                            onChange={(e) => setForm((f) => ({ ...f, surname: e.target.value }))}
                                                            className="w-full p-1 text-[#231C1D] bg-transparent outline-none"
                                                            placeholder=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col justify-center items-start gap-2 flex-1">
                                                    <label className="text-[#231C1D] text-sm">
                                                        氏名（名）
                                                    </label>
                                                    <div className="flex items-center p-1 gap-2.5 border-2 border-[#D9D9D9] rounded-[3px] bg-white w-full">
                                                        <input
                                                            type="text"
                                                            value={form.givenName}
                                                            onChange={(e) => setForm((f) => ({ ...f, givenName: e.target.value }))}
                                                            className="w-full p-1 text-[#231C1D] bg-transparent outline-none"
                                                            placeholder=""
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Phone */}
                                            <div className="flex flex-col justify-center items-start gap-2">
                                                <label className="text-[#231C1D] text-sm">
                                                    電話番号
                                                </label>
                                                <div className="flex items-center p-1 gap-2.5 border-2 border-[#D9D9D9] rounded-[3px] bg-white w-full">
                                                    <input
                                                        type="tel"
                                                        value={form.phone}
                                                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                                                        className="w-full p-1 text-[#231C1D] bg-transparent outline-none"
                                                        placeholder="例：00-0000-0000"
                                                    />
                                                </div>
                                            </div>

                                            {/* Postal Code */}
                                            <div className="flex flex-col justify-center items-start gap-2">
                                                <label className="text-[#231C1D] text-sm">
                                                    郵便番号
                                                </label>
                                                <div className="flex items-start gap-2">
                                                    <div className="flex items-center p-1 gap-2.5 border-2 border-[#D9D9D9] rounded-[3px] bg-white w-40">
                                                        <input
                                                            type="text"
                                                            value={form.postal1}
                                                            onChange={(e) => setForm((f) => ({ ...f, postal1: e.target.value }))}
                                                            className="w-full p-1 text-[#231C1D] bg-transparent outline-none"
                                                            placeholder="例：000"
                                                        />
                                                    </div>
                                                    <div className="flex items-center p-1 gap-2.5 border-2 border-[#D9D9D9] rounded-[3px] bg-white w-40">
                                                        <input
                                                            type="text"
                                                            value={form.postal2}
                                                            onChange={(e) => setForm((f) => ({ ...f, postal2: e.target.value }))}
                                                            className="w-full p-1 text-[#231C1D] bg-transparent outline-none"
                                                            placeholder="例：0000"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Prefecture */}
                                            <div className="flex flex-col justify-center items-start gap-2">
                                                <label className="text-[#231C1D] text-sm">
                                                    都道府県
                                                </label>
                                                <div className="flex justify-between items-center p-1 gap-2.5 border-2 border-[#D9D9D9] rounded-[3px] bg-white w-full">
                                                    <select
                                                        value={form.prefecture}
                                                        onChange={(e) => setForm((f) => ({ ...f, prefecture: e.target.value }))}
                                                        className="w-full p-1 text-[#231C1D] bg-transparent outline-none appearance-none"
                                                    >
                                                        <option value="" className="font-light">都道府県を選択する</option>
                                                        {PREFECTURES.map((p) => (
                                                            <option key={p} value={p}>{p}</option>
                                                        ))}
                                                    </select>
                                                    <svg className="w-4 h-4 text-[#8E8E8E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* City */}
                                            <div className="flex flex-col justify-center items-start gap-2">
                                                <label className="text-[#231C1D] text-sm">
                                                    市区町村
                                                </label>
                                                <div className="flex items-center p-1 gap-2.5 border-2 border-[#D9D9D9] rounded-[3px] bg-white w-full">
                                                    <input
                                                        type="text"
                                                        value={form.city}
                                                        onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                                                        className="w-full p-1 text-[#231C1D] bg-transparent outline-none"
                                                        placeholder="例：〇〇市〇〇町"
                                                    />
                                                </div>
                                            </div>

                                            {/* Street Address */}
                                            <div className="flex flex-col justify-center items-start gap-2">
                                                <label className="text-[#231C1D] text-sm">
                                                    丁目・番地・号（数字は半角数字）
                                                </label>
                                                <div className="flex items-center p-1 gap-2.5 border-2 border-[#D9D9D9] rounded-[3px] bg-white w-full">
                                                    <input
                                                        type="text"
                                                        value={form.street}
                                                        onChange={(e) => setForm((f) => ({ ...f, street: e.target.value }))}
                                                        className="w-full p-1 text-[#231C1D] bg-transparent outline-none"
                                                        placeholder="例：1-2-3"
                                                    />
                                                </div>
                                            </div>

                                            {/* Building */}
                                            <div className="flex flex-col justify-center items-start gap-2">
                                                <label className="text-[#231C1D] text-sm">
                                                    建物名／部屋番号
                                                </label>
                                                <div className="flex items-center p-1 gap-2.5 border-2 border-[#D9D9D9] rounded-[3px] bg-white w-full">
                                                    <input
                                                        type="text"
                                                        value={form.building}
                                                        onChange={(e) => setForm((f) => ({ ...f, building: e.target.value }))}
                                                        className="w-full p-1 text-[#231C1D] bg-transparent outline-none"
                                                        placeholder="例：〇〇マンション"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="button"
                                            onClick={handleUseAddress}
                                            className="flex justify-center items-center py-2 px-10 gap-2.5 bg-[#DCC364] rounded-[4px] hover:opacity-90 transition-opacity w-full mt-4"
                                        >
                                            <span className="text-white font-normal text-base">
                                                この住所を使用
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back Link */}
                    {fromCheckout && (
                        <div className="mt-6">
                            <Link href={checkoutReturnUrl} className="text-[#006AFF] font-medium hover:underline">
                                ← 購入手続きへ戻る
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </EcommerceLayout>
    );
}