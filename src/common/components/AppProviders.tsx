import React, { useEffect, useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/common/lib/queryClient.ts';
import { ActivitiesProvider } from '@/pages/Activities/services/ActivitiesContext.tsx';
import { isMockingEnabled, startMocking } from '@/mocks/browser.ts';
import { SnackbarProvider } from 'notistack';

interface AppProvidersProps {
    children: React.ReactNode;
}

const MSWProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isMswReady, setIsMswReady] = useState(!isMockingEnabled());

    useEffect(() => {
        if (isMockingEnabled()) {
            startMocking()
                .then(() => {
                    setIsMswReady(true);
                })
                .catch((error) => {
                    console.error('Failed to start MSW:', error);
                    setIsMswReady(true);
                });
        }
    }, []);

    if (!isMswReady) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    fontSize: '18px',
                    color: '#666'
                }}>
                🔄 Setting up mock API...
            </div>
        );
    }

    return <>{children}</>;
};

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
