// lib/queryClient.ts
import { type DefaultOptions, QueryClient } from '@tanstack/react-query';
import { isActivitiesApiError } from '@/api/activitiesApi';

// Default options for React Query
const defaultOptions: DefaultOptions = {
    queries: {
        // Stale time: how long data stays fresh (5 minutes)
        staleTime: 5 * 60 * 1000,
        // Cache time: how long data stays in cache when not used (10 minutes)
        gcTime: 10 * 60 * 1000,
        // Retry failed requests 3 times with exponential backoff
        retry: (failureCount, error) => {
            // Don't retry on 4xx errors (client errors)
            if (
                isActivitiesApiError(error) &&
                error.status &&
                error.status >= 400 &&
                error.status < 500
            ) {
                return false;
            }
            // Retry up to 3 times for other errors
            return failureCount < 3;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        // Refetch on window focus in production only
        refetchOnWindowFocus: process.env.NODE_ENV === 'production',
        // Refetch on reconnect
        refetchOnReconnect: true,
        // Don't refetch on mount if data is fresh
        refetchOnMount: 'always'
    },
    mutations: {
        // Retry mutations once
        retry: 1,
        retryDelay: 1000
    }
};

// Create the query client
export const queryClient = new QueryClient({
    defaultOptions
});

// Error handler for global error handling
queryClient.setMutationDefaults(['activities'], {
    onError: (error) => {
        console.error('Mutation error:', error);
        // You can add global error handling here
        // For example, show a toast notification
    }
});

// Optional: Add global query error handler
queryClient.setQueryDefaults(['activities'], {});

// Utility function to invalidate all activities queries
export const invalidateActivitiesQueries = () => {
    queryClient.invalidateQueries({ queryKey: ['activities'] });
};

// Utility function to reset all activities queries
export const resetActivitiesQueries = () => {
    queryClient.resetQueries({ queryKey: ['activities'] });
};
