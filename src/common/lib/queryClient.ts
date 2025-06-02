// lib/queryClient.ts
import { type DefaultOptions, QueryClient } from '@tanstack/react-query';
import { isApiError } from '@/common/api/apiError.ts';

const defaultOptions: DefaultOptions = {
    queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: (failureCount, error) => {
            if (isApiError(error) && error.status && error.status >= 400 && error.status < 500) {
                return false;
            }
            return failureCount < 3;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: process.env.NODE_ENV === 'production',
        refetchOnReconnect: true,
        refetchOnMount: 'always'
    },
    mutations: {
        retry: 1,
        retryDelay: 1000
    }
};

export const queryClient = new QueryClient({
    defaultOptions
});

queryClient.setMutationDefaults(['activities'], {
    onError: (error) => {
        console.error('Mutation error:', error);
    }
});

queryClient.setQueryDefaults(['activities'], {});
