import type { ReactNode } from 'react';
import type { BreadcrumbItem } from './navigation';

export type AppLayoutProps = {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    /** When false, renders full-width content without the left sidebar. Default true. */
    sidebar?: boolean;
    /** Optional title shown in content-only header (sidebar=false). */
    headerTitle?: string;
};

export type AuthLayoutProps = {
    children?: ReactNode;
    name?: string;
    title?: string;
    description?: string;
    branding?: 'sky-captain';
};
