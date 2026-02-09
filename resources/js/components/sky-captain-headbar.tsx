import {
    home,
    login,
    logout,
    purchaseHistory,
    register,
} from '@/routes';
import { edit as profileEdit } from '@/routes/profile';
import type { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { History, LogIn, LogOut, ShoppingBag, User, UserPlus } from 'lucide-react';

const navItemClass =
    'flex flex-col items-center justify-center gap-0.5 text-[#231C1D] hover:opacity-80 transition-opacity text-[11px] sm:text-[12px] font-medium shrink-0';

const PURPLE_BAR_TEXT = 'TENKUUYAICHO ';

export function SkyCaptainHeadbar() {
    const page = usePage<SharedData>();
    const user = page.props.auth?.user;

    return (
        <>
            <header className="flex flex-col shrink-0 w-full">
                <div className="flex h-14 sm:h-16 items-center justify-between gap-2 border-b border-[#E5E5E5] bg-white px-4 sm:px-6 md:px-8 lg:px-12 w-full max-w-[1360px] mx-auto">
            <Link
                href={home()}
                className="flex shrink-0 min-w-0 items-center gap-2 sm:gap-3 text-[#ED0000] no-underline mr-2 sm:mr-4 md:mr-12 lg:mr-40"
            >
                <div className="flex shrink-0 items-center justify-center">
                    <img
                        src="/images/天空隊長.png"
                        alt="天空隊長"
                        className="h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 object-contain"
                    />
                </div>
                <span
                    className="text-xs sm:text-sm font-semibold md:text-base whitespace-nowrap"
                    style={{ fontFamily: 'var(--font-mplus2)' }}
                >
                    天空隊長
                    <span className="hidden min-[500px]:inline"> 公式オンラインショップ</span>
                </span>
            </Link>

            <nav className="flex flex-shrink-0 items-center justify-end gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                {user ? (
                    <>
                        <Link href={logout()} method="post" as="button" className={navItemClass}>
                            <LogOut className="size-4 sm:size-5 text-[#231C1D]" aria-hidden />
                            <span>ログアウト</span>
                        </Link>
                        <Link href={profileEdit()} className={navItemClass}>
                            <User className="size-4 sm:size-5 text-[#231C1D]" aria-hidden />
                            <span>マイページ</span>
                        </Link>
                        <Link href={purchaseHistory()} className={navItemClass} aria-label="購入履歴">
                            <History className="size-4 sm:size-5 text-[#231C1D]" aria-hidden />
                            <span>購入履歴</span>
                        </Link>
                        <Link
                            href="/cart"
                            className="flex flex-col items-center justify-center gap-0.5 text-[#231C1D] hover:opacity-80 transition-opacity shrink-0"
                            aria-label="カート"
                        >
                            <ShoppingBag className="size-4 sm:size-5" aria-hidden />
                            <span className="text-[11px] sm:text-[12px] font-medium">カート</span>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href={register()} className={navItemClass}>
                            <UserPlus className="size-4 sm:size-5 text-[#231C1D]" aria-hidden />
                            <span>新規会員登録</span>
                        </Link>
                        <Link href={login()} className={navItemClass}>
                            <LogIn className="size-4 sm:size-5 text-[#231C1D]" aria-hidden />
                            <span>ログイン</span>
                        </Link>
                    </>
                )}
            </nav>
                </div>
                <div
                    className="flex h-8 sm:h-10 w-full items-center overflow-hidden bg-[#5e225e]"
                    aria-hidden
                >
                    <div className="flex min-w-full flex-nowrap items-center whitespace-nowrap text-white text-xs sm:text-sm font-medium tracking-[0.1.5em] sm:tracking-[0.2em] gap-4 sm:gap-6 md:gap-8">
                        {Array.from({ length: 30 }).map((_, i) => (
                            <span key={i}>{PURPLE_BAR_TEXT}</span>
                        ))}
                    </div>
                </div>
            </header>
        </>
    );
}
