import { SkyCaptainHeadbar } from '@/components/sky-captain-headbar';
import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

export default function AuthLayout({
    children,
    title,
    description,
    branding,
    showHeaderBar,
    ...props
}: {
    children: React.ReactNode;
    title: string;
    description: string;
    branding?: 'sky-captain';
    showHeaderBar?: boolean;
}) {
    if (showHeaderBar && branding === 'sky-captain') {
        return (
            <div className="flex min-h-svh flex-col">
                <SkyCaptainHeadbar />
                <AuthLayoutTemplate
                    title={title}
                    description={description}
                    branding={branding}
                    withHeaderBar
                    {...props}
                >
                    {children}
                </AuthLayoutTemplate>
            </div>
        );
    }
    return (
        <AuthLayoutTemplate
            title={title}
            description={description}
            branding={branding}
            {...props}
        >
            {children}
        </AuthLayoutTemplate>
    );
}
