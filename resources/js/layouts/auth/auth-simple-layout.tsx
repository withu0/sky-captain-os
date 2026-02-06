import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';
import { Link } from '@inertiajs/react';

export default function AuthSimpleLayout({
    children,
    title,
    description,
    branding,
    withHeaderBar,
}: AuthLayoutProps) {
    const isSkyCaptain = branding === 'sky-captain';

    return (
        <div
            className={
                withHeaderBar
                    ? 'flex min-h-0 flex-1 flex-col items-center justify-center gap-6 bg-background p-6 md:p-10'
                    : 'flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10'
            }
        >
            <div
                className={
                    withHeaderBar
                        ? 'w-full max-w-2xl'
                        : 'w-full max-w-sm'
                }
            >
                <div className="flex flex-col gap-10 md:gap-12">
                    <div className="flex flex-col items-center gap-6">
                        {isSkyCaptain ? (
                            <Link
                                href={home()}
                                className="flex w-[12rem] flex-col items-center gap-2 text-[#682E53] md:w-[14rem]"
                            >
                                <h1
                                    className="w-full text-center text-4xl font-bold leading-none md:text-5xl"
                                    style={{ fontFamily: 'var(--font-mplus2)' }}
                                >
                                    天空隊長
                                </h1>
                                <div
                                    className="w-full text-[9px] font-normal md:text-[11px]"
                                    style={{ letterSpacing: '0.35em' }}
                                >
                                    <div className="w-full border-b-2 border-t border-[#682E53] py-1 text-center">
                                        てんくうたいちょー
                                    </div>
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
