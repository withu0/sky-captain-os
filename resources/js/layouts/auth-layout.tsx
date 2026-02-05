import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

export default function AuthLayout({
    children,
    title,
    description,
    branding,
    ...props
}: {
    children: React.ReactNode;
    title: string;
    description: string;
    branding?: 'sky-captain';
}) {
    return (
        <AuthLayoutTemplate title={title} description={description} branding={branding} {...props}>
            {children}
        </AuthLayoutTemplate>
    );
}
