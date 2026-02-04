import { SkyCaptainAuthCard } from '@/components/sky-captain-auth-card';
import { Head, Link } from '@inertiajs/react';

export default function LoggedOut() {
    return (
        <SkyCaptainAuthCard>
            <Head title="ログアウト | 天空隊長" />
            <div className="text-center space-y-6">
                <p className="text-dark">ログアウトしました。</p>
                <Link
                    href="/login"
                    className="inline-flex items-center justify-center gap-2 w-full border border-border rounded px-4 py-3 bg-white text-dark font-medium hover:bg-muted/50"
                >
                    ログイン画面へ
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </SkyCaptainAuthCard>
    );
}
