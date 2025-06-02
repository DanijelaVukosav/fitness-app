import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/common/lib/queryClient.ts';
import { ActivitiesProvider } from '@/pages/Activities/services/ActivitiesContext.tsx';
import { SnackbarProvider } from 'notistack';
import { MSWProvider } from '@/common/components/MSWProvider.tsx';

interface AppProvidersProps {
    children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <MSWProvider>
                <ActivitiesProvider>
                    <SnackbarProvider />
                    {children}
                    {import.meta.env.VITE_API_URL === 'development' && (
                        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
                    )}
                </ActivitiesProvider>
            </MSWProvider>
        </QueryClientProvider>
    );
};
