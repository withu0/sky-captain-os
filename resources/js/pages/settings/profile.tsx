import PasswordController from '@/actions/App/Http/Controllers/Settings/PasswordController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { Transition } from '@headlessui/react';
import { Form, Head } from '@inertiajs/react';
import { useRef } from 'react';

export default function Profile() {
    const currentPasswordInput = useRef<HTMLInputElement>(null);
    const newPasswordInput = useRef<HTMLInputElement>(null);

    return (
        <AuthLayout
            title="マイページ"
            description="パスワードを変更できます"
            branding="sky-captain"
        >
            <Head title="マイページ | 天空隊長" />

            <h1 className="sr-only">マイページ</h1>

            <Form
                {...PasswordController.update.form()}
                options={{ preserveScroll: true }}
                resetOnError={[
                    'password',
                    'password_confirmation',
                    'current_password',
                ]}
                resetOnSuccess
                onError={(errors) => {
                    if (errors.password) newPasswordInput.current?.focus();
                    if (errors.current_password)
                        currentPasswordInput.current?.focus();
                }}
                className="flex flex-col gap-8"
            >
                {({ processing, recentlySuccessful, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="current_password">
                                    現在のパスワード
                                </Label>
                                <Input
                                    id="current_password"
                                    ref={currentPasswordInput}
                                    name="current_password"
                                    type="password"
                                    className="block w-full rounded-[2px]"
                                    autoComplete="current-password"
                                    placeholder="現在のパスワード"
                                />
                                <InputError
                                    message={errors.current_password}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">
                                    新しいパスワード
                                </Label>
                                <Input
                                    id="password"
                                    ref={newPasswordInput}
                                    name="password"
                                    type="password"
                                    className="block w-full rounded-[2px]"
                                    autoComplete="new-password"
                                    placeholder="新しいパスワード"
                                />
                                <InputError message={errors.password} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password_confirmation">
                                    パスワード（確認）
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    className="block w-full rounded-[2px]"
                                    autoComplete="new-password"
                                    placeholder="パスワード（確認）"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>
                            <div className="mt-6 flex items-center gap-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-none bg-[#ED0000] text-white hover:bg-[#ED0000]/90"
                                    data-test="update-password-button"
                                >
                                    {processing && <Spinner />}
                                    パスワードを更新
                                </Button>
                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-neutral-600">
                                        パスワードを更新しました
                                    </p>
                                </Transition>
                            </div>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
