import { SkyCaptainAuthCard } from '@/components/sky-captain-auth-card';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { logout } from '@/routes';
import { send } from '@/routes/verification';
import { Form, Head } from '@inertiajs/react';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <SkyCaptainAuthCard>
            <Head title="認証メール送信 | 天空隊長" />
            <div className="space-y-6 text-center">
                <p className="text-dark text-sm leading-relaxed">
                    ご登録いただいたメールアドレス宛に認証メールを送信いたしました。
                </p>
                <p className="text-dark text-sm leading-relaxed">
                    ご確認いただき、認証のお手続きをよろしくお願いいたします。
                </p>
                {status === 'verification-link-sent' && (
                    <p className="text-sm font-medium text-green-600">
                        認証メールを再送信しました。
                    </p>
                )}
                <Form {...send.form()} className="space-y-4">
                    {({ processing }) => (
                        <>
                            <Button
                                type="submit"
                                variant="secondary"
                                disabled={processing}
                                className="w-full"
                            >
                                {processing && <Spinner />}
                                認証メールを再送信
                            </Button>
                            <TextLink href={logout()} className="block text-sm text-purple">
                                ログアウト
                            </TextLink>
                        </>
                    )}
                </Form>
            </div>
        </SkyCaptainAuthCard>
    );
}
