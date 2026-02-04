import { Head, useForm } from '@inertiajs/react';

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
            <div className="min-h-screen bg-[#E8E8E8] flex items-center justify-center p-4">
                <p className="text-muted-foreground text-sm absolute top-4 left-4">Admin_ログイン</p>
                <div className="w-full max-w-md border border-[#B8D4E8] rounded-lg bg-[#F5F5F5] p-8 shadow-sm">
                    <div className="text-center mb-8">
                        <div className="inline-block border border-[#C4A574] rounded px-4 py-2 mb-1">
                            <span className="text-dark text-2xl font-bold" style={{ fontFamily: 'var(--font-mplus2)' }}>
                                天空隊長
                            </span>
                        </div>
                        <p className="text-[#C4A574] text-sm border-b border-[#C4A574] pb-0.5 w-fit mx-auto">
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
                            className="w-full bg-[#C4A574] text-white font-semibold py-3 px-6 rounded hover:opacity-90 disabled:opacity-70"
                        >
                            ログイン
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
