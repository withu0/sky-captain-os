import AppContentOnlyLayout from '@/layouts/app/app-content-only-layout';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps } from '@/types';

export default ({
    children,
    breadcrumbs = [],
    sidebar = true,
    ...props
}: AppLayoutProps) => {
    if (!sidebar) {
        return (
            <AppContentOnlyLayout {...props}>
                {children}
            </AppContentOnlyLayout>
        );
    }
    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs} {...props}>
            {children}
        </AppSidebarLayout>
    );
};
