import type { ReactNode } from 'react';
import Header from '@/layouts/app/app-header-layout';

type Props = {
    children: ReactNode;
};

export default function EcommerceLayout({ children }: Props) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
        </div>
    );
}
