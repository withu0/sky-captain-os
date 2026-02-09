import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes';
import { email } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <AuthLayout
            title="パスワードをお忘れの方"
            description="メールアドレスを入力するとリセット用のリンクをお送りします"
            branding="sky-captain"
        >
            <Head title="パスワードリセット | 天空隊長" />

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <Form
                {...email.form()}
                className="flex flex-col gap-8"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">メールアドレス</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    placeholder=""
                                    className="rounded-[2px]"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <Button
                                type="submit"
                                className="mt-6 w-full rounded-none bg-[#ED0000] text-white hover:bg-[#ED0000]/90"
                                disabled={processing}
                                data-test="email-password-reset-link-button"
                            >
                                {processing ? (
                                    <Spinner />
                                ) : (
                                    'リセット用リンクを送信'
                                )}
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            ログインに戻る{' '}
                            <TextLink href={login()}>ログイン</TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
