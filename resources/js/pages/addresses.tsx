import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

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
        city: '那覇市おもろまち',
        street: '1-23-4',
        building: 'おもろまちマンション1304',
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
        <>
            <Head>
                <title>お届け先住所 | 天空隊長</title>
            </Head>
            <div className="min-h-screen bg-white">
                <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-8 md:py-12">
                    <button
                        type="button"
                        onClick={handleAddNew}
                        className="text-purple font-semibold mb-6 inline-flex items-center gap-1 hover:underline"
                    >
                        + 新しい住所
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {addresses.map((addr) => (
                            <div
                                key={addr.id}
                                className="border border-border rounded-lg p-4 flex flex-col justify-between"
                            >
                                <div className="text-dark text-sm space-y-1">
                                    <p>{addr.surname} {addr.givenName}</p>
                                    <p>{addr.phone}</p>
                                    <p>{addr.postal1}-{addr.postal2}</p>
                                    <p>{formatAddressLine(addr)}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleEdit(addr)}
                                    className="mt-3 text-purple text-sm font-medium hover:underline self-start"
                                >
                                    編集
                                </button>
                            </div>
                        ))}
                    </div>

                    <section className="border border-border rounded-lg p-6 md:p-8">
                        <h2 className="text-dark text-lg font-bold mb-6">お届け先住所を編集</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-dark text-sm font-medium mb-1">氏名 (性)</label>
                                <input
                                    type="text"
                                    value={form.surname}
                                    onChange={(e) => setForm((f) => ({ ...f, surname: e.target.value }))}
                                    className="w-full border border-border rounded px-3 py-2 text-dark"
                                />
                            </div>
                            <div>
                                <label className="block text-dark text-sm font-medium mb-1">氏名 (名)</label>
                                <input
                                    type="text"
                                    value={form.givenName}
                                    onChange={(e) => setForm((f) => ({ ...f, givenName: e.target.value }))}
                                    className="w-full border border-border rounded px-3 py-2 text-dark"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-dark text-sm font-medium mb-1">電話番号</label>
                            <input
                                type="tel"
                                value={form.phone}
                                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                                placeholder="例: 00-0000-0000"
                                className="w-full border border-border rounded px-3 py-2 text-dark"
                            />
                        </div>
                        <div className="flex gap-2 mb-4">
                            <div>
                                <label className="block text-dark text-sm font-medium mb-1">郵便番号</label>
                                <input
                                    type="text"
                                    value={form.postal1}
                                    onChange={(e) => setForm((f) => ({ ...f, postal1: e.target.value }))}
                                    placeholder="例: 000"
                                    className="w-20 border border-border rounded px-3 py-2 text-dark"
                                />
                            </div>
                            <span className="self-end pb-2">-</span>
                            <div>
                                <label className="block text-dark text-sm font-medium mb-1">&nbsp;</label>
                                <input
                                    type="text"
                                    value={form.postal2}
                                    onChange={(e) => setForm((f) => ({ ...f, postal2: e.target.value }))}
                                    placeholder="例: 0000"
                                    className="w-24 border border-border rounded px-3 py-2 text-dark"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-dark text-sm font-medium mb-1">都道府県</label>
                            <select
                                value={form.prefecture}
                                onChange={(e) => setForm((f) => ({ ...f, prefecture: e.target.value }))}
                                className="w-full border border-border rounded px-3 py-2 text-dark bg-white"
                            >
                                <option value="">都道府県を選択する</option>
                                {PREFECTURES.map((p) => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-dark text-sm font-medium mb-1">市区町村</label>
                            <input
                                type="text"
                                value={form.city}
                                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                                placeholder="例: ○○市○○町"
                                className="w-full border border-border rounded px-3 py-2 text-dark"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-dark text-sm font-medium mb-1">丁目・番地・号 (数字は半角数字)</label>
                            <input
                                type="text"
                                value={form.street}
                                onChange={(e) => setForm((f) => ({ ...f, street: e.target.value }))}
                                placeholder="例: 1-2-3"
                                className="w-full border border-border rounded px-3 py-2 text-dark"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-dark text-sm font-medium mb-1">建物名/部屋番号</label>
                            <input
                                type="text"
                                value={form.building}
                                onChange={(e) => setForm((f) => ({ ...f, building: e.target.value }))}
                                placeholder="例: ○○マンション"
                                className="w-full border border-border rounded px-3 py-2 text-dark"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleUseAddress}
                            className="w-full max-w-md bg-[#C4A574] text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90"
                        >
                            この住所を使用
                        </button>
                    </section>

                    {fromCheckout && (
                        <div className="mt-6">
                            <Link href={checkoutReturnUrl} className="text-purple font-medium hover:underline">
                                ← 購入手続きへ戻る
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
