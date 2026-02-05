import { SkyCaptainHeadbar } from '@/components/sky-captain-headbar';
import type { AppLayoutProps } from '@/types';

export default function AppContentOnlyLayout({
    children,
}: AppLayoutProps) {
    return (
        <div className="flex min-h-svh w-full flex-col bg-background">
            <SkyCaptainHeadbar />
            <main className="flex-1 overflow-x-hidden">
                {children}
            </main>
        </div>
    );
}
