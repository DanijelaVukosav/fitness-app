import React, { useEffect, useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/lib/queryClient';
import { ActivitiesProvider } from '@/context/ActivitiesContext';
import { isMockingEnabled, startMocking } from '@/mocks/browser';
import { SnackbarProvider } from 'notistack';

interface AppProvidersProps {
    children: React.ReactNode;
}

// Component to handle MSW initialization
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
                    setIsMswReady(true); // Continue anyway
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

// Main providers wrapper
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <MSWProvider>
                <ActivitiesProvider>
                    <SnackbarProvider />
                    {children}
                    {/* Show React Query Devtools in development */}
                    {import.meta.env.VITE_API_URL === 'development' && (
                        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
                    )}
                </ActivitiesProvider>
            </MSWProvider>
        </QueryClientProvider>
    );
};
