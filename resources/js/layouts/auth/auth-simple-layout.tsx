import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';
import { Link } from '@inertiajs/react';

export default function AuthSimpleLayout({
    children,
    title,
    description,
    branding,
}: AuthLayoutProps) {
    const isSkyCaptain = branding === 'sky-captain';

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        {isSkyCaptain ? (
                            <Link
                                href={home()}
                                className="flex flex-col items-center gap-2 text-[#682E53]"
                            >
                                <h1
                                    className="text-3xl font-bold leading-none"
                                    style={{ fontFamily: 'var(--font-mplus2)' }}
                                >
                                    天空隊長
                                </h1>
                                <div
                                    className="text-[10px] md:text-[13px] font-normal border-b-2 border-t border-[#682E53] py-1 text-center"
                                    style={{ letterSpacing: '1.2em' }}
                                >
                                    てんくうたいちょー
                                </div>
                                <span className="sr-only">{title}</span>
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={home()}
                                    className="flex flex-col items-center gap-2 font-medium"
                                >
                                    <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
                                        <AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" />
                                    </div>
                                    <span className="sr-only">{title}</span>
                                </Link>

                                <div className="space-y-2 text-center">
                                    <h1 className="text-xl font-medium">{title}</h1>
                                    <p className="text-center text-sm text-muted-foreground">
                                        {description}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
