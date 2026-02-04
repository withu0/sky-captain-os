import { Head, Link } from '@inertiajs/react';

type OrderRow = {
    orderNo: string;
    productName: string;
    orderDate: string;
    status: string | null;
};

type Props = {
    orders: OrderRow[];
};

export default function AdminOrderList({ orders = [] }: Props) {
    return (
        <>
            <Head>
                <title>受注一覧 | 管理画面</title>
            </Head>
            <div className="min-h-screen bg-[#E8E8E8] p-4 md:p-8">
                <p className="text-muted-foreground text-sm mb-2">受注一覧</p>
                <div className="max-w-4xl border border-[#B8D4E8] rounded-lg bg-white p-6 shadow-sm">
                    <h1 className="text-dark text-xl font-bold mb-6">受注一覧</h1>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="py-3 px-2 text-dark font-semibold">受注No</th>
                                    <th className="py-3 px-2 text-dark font-semibold">商品名</th>
                                    <th className="py-3 px-2 text-dark font-semibold">受注日</th>
                                    <th className="py-3 px-2 text-dark font-semibold">ステータス</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, i) => (
                                    <tr key={i} className="border-b border-border">
                                        <td className="py-3 px-2 text-dark">{order.orderNo}</td>
                                        <td className="py-3 px-2 text-dark">{order.productName}</td>
                                        <td className="py-3 px-2 text-dark">{order.orderDate}</td>
                                        <td className="py-3 px-2">
                                            {order.status ? (
                                                <span className="inline-block px-2 py-0.5 border border-amber-400 rounded bg-amber-50 text-dark text-sm">
                                                    {order.status}
                                                </span>
                                            ) : (
                                                <span className="text-muted-foreground">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-4">
                        <Link href="/admin/users" className="text-purple font-medium hover:underline">
                            ユーザー一覧
                        </Link>
                        <Link href="/admin/logout" method="post" as="button" className="text-purple font-medium hover:underline">
                            ログアウト
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
