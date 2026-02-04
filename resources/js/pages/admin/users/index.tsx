import { Head, Link } from '@inertiajs/react';

type UserRow = {
    id: string;
    name: string;
    email: string;
    lastPurchaseDate: string;
    status: string | null;
};

type Props = {
    users: UserRow[];
};

export default function AdminUserList({ users = [] }: Props) {
    return (
        <>
            <Head>
                <title>ユーザー一覧 | 管理画面</title>
            </Head>
            <div className="min-h-screen bg-[#E8E8E8] p-4 md:p-8">
                <p className="text-muted-foreground text-sm mb-2">ユーザー一覧</p>
                <div className="max-w-4xl border border-[#B8D4E8] rounded-lg bg-white p-6 shadow-sm">
                    <h1 className="text-dark text-xl font-bold mb-6">ユーザー一覧</h1>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="py-3 px-2 text-dark font-semibold">ユーザー名</th>
                                    <th className="py-3 px-2 text-dark font-semibold">メールアドレス</th>
                                    <th className="py-3 px-2 text-dark font-semibold">最終購入日</th>
                                    <th className="py-3 px-2 text-dark font-semibold">ステータス</th>
                                    <th className="py-3 px-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-b border-border">
                                        <td className="py-3 px-2 text-dark">{user.name}</td>
                                        <td className="py-3 px-2">
                                            <a href={`mailto:${user.email}`} className="text-blue-600 underline">
                                                {user.email}
                                            </a>
                                        </td>
                                        <td className="py-3 px-2 text-dark">{user.lastPurchaseDate}</td>
                                        <td className="py-3 px-2">
                                            {user.status ? (
                                                <span className="inline-block px-2 py-0.5 border border-amber-400 rounded bg-amber-50 text-dark text-sm">
                                                    {user.status}
                                                </span>
                                            ) : (
                                                <span className="text-muted-foreground">—</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-2">
                                            <Link
                                                href={`/admin/users/${user.id}`}
                                                className="inline-block px-4 py-2 bg-neutral-200 text-dark text-sm font-medium rounded hover:bg-neutral-300"
                                            >
                                                ユーザ詳細
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4">
                        <Link href="/admin/orders" className="text-purple font-medium hover:underline">
                            受注一覧
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
