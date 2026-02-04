import InputError from '@/components/input-error';
import { SkyCaptainAuthCard } from '@/components/sky-captain-auth-card';
import TextLink from '@/components/text-link';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';

export default function Register() {
    return (
        <SkyCaptainAuthCard>
            <Head title="新規登録 | 天空隊長" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <>
                        <div>
                            <label htmlFor="name" className="block text-dark text-sm font-medium mb-1">
                                お名前
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                required
                                autoFocus
                                autoComplete="name"
                                className="w-full border border-border rounded px-3 py-2 bg-white text-dark"
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-dark text-sm font-medium mb-1">
                                メールアドレス
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                required
                                autoComplete="email"
                                className="w-full border border-border rounded px-3 py-2 bg-white text-dark"
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-dark text-sm font-medium mb-1">
                                パスワード
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                required
                                autoComplete="new-password"
                                className="w-full border border-border rounded px-3 py-2 bg-white text-dark"
                            />
                            <InputError message={errors.password} />
                        </div>
                        <div>
                            <label htmlFor="password_confirmation" className="block text-dark text-sm font-medium mb-1">
                                パスワード（確認）
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                required
                                autoComplete="new-password"
                                className="w-full border border-border rounded px-3 py-2 bg-white text-dark"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#ED0000] text-white font-semibold py-3 px-6 rounded hover:opacity-90 disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {processing && <Spinner />}
                            新規登録
                        </button>
                        <p className="text-center text-sm text-muted-foreground">
                            すでにアカウントをお持ちの方は{' '}
                            <TextLink href={login()} className="text-purple">
                                ログイン
                            </TextLink>
                        </p>
                    </>
                )}
            </Form>
        </SkyCaptainAuthCard>
    );
}
