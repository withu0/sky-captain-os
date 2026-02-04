import { SkyCaptainAuthCard } from '@/components/sky-captain-auth-card';
import { Head, Link, useForm } from '@inertiajs/react';

export default function AdminLogin() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <>
            <Head>
                <title>管理画面ログイン | 天空隊長</title>
            </Head>
            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <p className="text-muted-foreground text-sm absolute top-4 left-4">Admin_ログイン</p>
                <div className="w-full max-w-md border border-[#B8D4E8] rounded-lg bg-white p-8 shadow-sm">
                    <div className="text-center mb-8">
                        <h1
                            className="text-purple text-2xl font-bold mb-1"
                            style={{ fontFamily: 'var(--font-mplus2)' }}
                        >
                            天空隊長
                        </h1>
                        <p className="text-purple text-sm border-b border-purple pb-0.5 w-fit mx-auto">
                            てんくうたいちょう
                        </p>
                    </div>
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-dark text-sm font-medium mb-1">
                                メールアドレス
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full border border-border rounded px-3 py-2 bg-white text-dark"
                                autoComplete="email"
                            />
                            {errors.email && (
                                <p className="text-destructive text-sm mt-1">{errors.email}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-dark text-sm font-medium mb-1">
                                パスワード
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full border border-border rounded px-3 py-2 bg-white text-dark"
                                autoComplete="current-password"
                            />
                            {errors.password && (
                                <p className="text-destructive text-sm mt-1">{errors.password}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#ED0000] text-white font-semibold py-3 px-6 rounded hover:opacity-90 disabled:opacity-70"
                        >
                            ログイン
                        </button>
                        <p className="text-center text-sm text-muted-foreground">
                            <Link href="/register" className="text-purple hover:underline">
                                新規登録はこちら
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}
