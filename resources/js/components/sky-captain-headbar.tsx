import {
    dashboard,
    home,
    login,
    logout,
    purchase,
    purchaseHistory,
    register,
} from '@/routes';
import type { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LogIn, LogOut, ShoppingCart, User, UserPlus } from 'lucide-react';

const navItemClass =
    'flex flex-col items-center justify-center gap-0.5 text-[#231C1D] hover:opacity-80 transition-opacity text-[12px] font-medium';

const PURPLE_BAR_TEXT = 'TENKUUYAICHO ';

export function SkyCaptainHeadbar() {
    const page = usePage<SharedData>();
    const user = page.props.auth?.user;

    return (
        <>
            <header className="flex flex-col shrink-0">
                <div className="flex h-16 items-center justify-between border-b border-[#E5E5E5] bg-white px-4 md:px-6">
            {/* Left: logo + title */}
            <Link
                href={home()}
                className="flex items-center gap-3 text-[#ED0000] no-underline"
            >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#ED0000] bg-white">
                    <img
                        src="/images/天空隊長.png"
                        alt="天空隊長"
                        className="h-8 w-8 object-contain"
                    />
                </div>
                <span
                    className="text-sm font-semibold md:text-base"
                    style={{ fontFamily: 'var(--font-mplus2)' }}
                >
                    天空隊長 公式オンラインショップ
                </span>
            </Link>

            {/* Right: nav items (no favourites) */}
            <nav className="flex items-center gap-6 md:gap-8">
                {user ? (
                    <>
                        <Link href={logout()} method="post" as="button" className={navItemClass}>
                            <LogOut className="size-5 text-[#231C1D]" aria-hidden />
                            <span>ログアウト</span>
                        </Link>
                        <Link href={dashboard()} className={navItemClass}>
                            <User className="size-5 text-[#231C1D]" aria-hidden />
                            <span>マイページ</span>
                        </Link>
                        <Link href={purchaseHistory()} className={`${navItemClass} relative`}>
                            <span className="relative inline-block">
                                <ShoppingCart className="size-5 text-[#231C1D]" aria-hidden />
                                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ED0000] px-1 text-[10px] font-bold text-white">
                                    1
                                </span>
                            </span>
                            <span>カート</span>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href={register()} className={navItemClass}>
                            <UserPlus className="size-5 text-[#231C1D]" aria-hidden />
                            <span>新規会員登録</span>
                        </Link>
                        <Link href={login()} className={navItemClass}>
                            <LogIn className="size-5 text-[#231C1D]" aria-hidden />
                            <span>ログイン</span>
                        </Link>
                        <Link href={login()} className={navItemClass}>
                            <User className="size-5 text-[#231C1D]" aria-hidden />
                            <span>マイページ</span>
                        </Link>
                        <Link href={purchase()} className={`${navItemClass} relative`}>
                            <span className="relative inline-block">
                                <ShoppingCart className="size-5 text-[#231C1D]" aria-hidden />
                                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ED0000] px-1 text-[10px] font-bold text-white">
                                    1
                                </span>
                            </span>
                            <span>カート</span>
                        </Link>
                    </>
                )}
            </nav>
                </div>
                {/* Dark purple bar with repeating text - bottom of header */}
                <div
                    className="flex h-10 w-full items-center overflow-hidden bg-[#5e225e]"
                    aria-hidden
                >
                    <div className="flex min-w-full flex-nowrap items-center whitespace-nowrap text-white text-xs font-medium tracking-[0.35em]">
                        {Array.from({ length: 40 }).map((_, i) => (
                            <span key={i}>{PURPLE_BAR_TEXT}</span>
                        ))}
                    </div>
                </div>
            </header>
        </>
    );
}
