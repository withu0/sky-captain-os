import { Head, Link } from '@inertiajs/react';

type PurchaseRow = {
    productName: string;
    amount: string;
    purchaseDate: string;
    purchaseType: string;
};

type UserDetailProps = {
    user: {
        id: string;
        name: string;
        email: string;
        lastPurchaseDate: string;
        phone: string;
        shippingAddress: string;
    };
    purchases: PurchaseRow[];
};

const defaultUser = {
    id: '1',
    name: '天空 太郎',
    email: 'xxx@konnichi.com',
    lastPurchaseDate: '2025年02月10日',
    phone: '090-0000-1234',
    shippingAddress: '大阪府守口市佐太東町3-101-5',
};

const defaultPurchases: PurchaseRow[] = [
    { productName: '天空隊長10袋セット', amount: '2,240円', purchaseDate: '2025年02月10日', purchaseType: '6ヶ月定期購入' },
    { productName: '天空隊長10袋セット', amount: '2,240円', purchaseDate: '2025年02月10日', purchaseType: '通常購入' },
    { productName: '天空隊長10袋セット', amount: '2,240円', purchaseDate: '2025年02月10日', purchaseType: '通常購入' },
    { productName: '天空隊長10袋セット', amount: '2,240円', purchaseDate: '2025年02月10日', purchaseType: '通常購入' },
];

export default function AdminUserShow({ user = defaultUser, purchases = defaultPurchases }: UserDetailProps) {
    return (
        <>
            <Head>
                <title>ユーザ詳細 | 管理画面</title>
            </Head>
            <div className="min-h-screen bg-[#E8E8E8] p-4 md:p-8">
                <p className="text-muted-foreground text-sm mb-2">ユーザ詳細</p>
                <div className="max-w-4xl border border-[#B8D4E8] rounded-lg bg-white p-6 shadow-sm border-b-2 border-b-[#B8D4E8]">
                    <h1 className="text-dark text-xl font-bold mb-6">ユーザ詳細</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section>
                            <div className="w-24 h-24 bg-muted flex items-center justify-center text-muted-foreground text-xs rounded mb-4">
                                NO IMAGE
                            </div>
                            <dl className="space-y-2 text-dark text-sm">
                                <div>
                                    <dt className="font-medium">ユーザ名</dt>
                                    <dd>{user.name}</dd>
                                </div>
                                <div>
                                    <dt className="font-medium">最終購入日</dt>
                                    <dd>{user.lastPurchaseDate}</dd>
                                </div>
                                <div>
                                    <dt className="font-medium">メールアドレス</dt>
                                    <dd>
                                        <a href={`mailto:${user.email}`} className="text-blue-600 underline">
                                            {user.email}
                                        </a>
                                    </dd>
                                </div>
                                <div>
                                    <dt className="font-medium">電話番号</dt>
                                    <dd>{user.phone}</dd>
                                </div>
                                <div>
                                    <dt className="font-medium">配送先</dt>
                                    <dd>{user.shippingAddress}</dd>
                                </div>
                            </dl>
                        </section>
                        <section>
                            <h2 className="text-dark font-bold mb-4">購入履歴</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-sm">
                                    <thead>
                                        <tr className="border-b border-border">
                                            <th className="py-2 px-2 text-dark font-semibold">商品名</th>
                                            <th className="py-2 px-2 text-dark font-semibold">金額</th>
                                            <th className="py-2 px-2 text-dark font-semibold">購入日</th>
                                            <th className="py-2 px-2 text-dark font-semibold"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {purchases.map((row, i) => (
                                            <tr key={i} className="border-b border-border">
                                                <td className="py-2 px-2 text-dark">{row.productName}</td>
                                                <td className="py-2 px-2 text-dark">{row.amount}</td>
                                                <td className="py-2 px-2 text-dark">{row.purchaseDate}</td>
                                                <td className="py-2 px-2">
                                                    {row.purchaseType === '6ヶ月定期購入' ? (
                                                        <span className="inline-block px-2 py-0.5 border border-amber-400 rounded bg-amber-50 text-dark text-xs">
                                                            {row.purchaseType}
                                                        </span>
                                                    ) : (
                                                        <span className="text-dark text-xs">{row.purchaseType}</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>
                    <div className="mt-6">
                        <Link href="/admin/users" className="text-purple font-medium hover:underline">
                            ← ユーザー一覧へ
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
