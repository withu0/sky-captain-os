import InputError from '@/components/input-error';
import { SkyCaptainAuthCard } from '@/components/sky-captain-auth-card';
import TextLink from '@/components/text-link';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    return (
        <SkyCaptainAuthCard>
            <Head title="ログイン | 天空隊長" />
            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <>
                        {status && (
                            <div className="text-center text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}
                        <div>
                            <label htmlFor="email" className="block text-dark text-sm font-medium mb-1">
                                メールアドレス
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                required
                                autoFocus
                                autoComplete="email"
                                className="w-full border border-border rounded px-3 py-2 bg-white text-dark"
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label htmlFor="password" className="block text-dark text-sm font-medium">
                                    パスワード
                                </label>
                                {canResetPassword && (
                                    <TextLink href={request()} className="text-sm text-purple">
                                        パスワードを忘れた場合
                                    </TextLink>
                                )}
                            </div>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                required
                                autoComplete="current-password"
                                className="w-full border border-border rounded px-3 py-2 bg-white text-dark"
                            />
                            <InputError message={errors.password} />
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#ED0000] text-white font-semibold py-3 px-6 rounded hover:opacity-90 disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {processing && <Spinner />}
                            ログイン
                        </button>
                        {canRegister && (
                            <p className="text-center text-sm text-muted-foreground">
                                <TextLink href={register()} className="text-purple">
                                    新規登録はこちら
                                </TextLink>
                            </p>
                        )}
                    </>
                )}
            </Form>
        </SkyCaptainAuthCard>
    );
}
