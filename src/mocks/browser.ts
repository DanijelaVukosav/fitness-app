// mocks/browser.ts
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Create the worker instance
export const worker = setupWorker(...handlers);

// Check if mocking should be enabled
export const isMockingEnabled = (): boolean => {
    // Enable mocking in development or when explicitly requested
    return (
        import.meta.env.VITE_ENABLE_MOCKING === 'true' ||
        import.meta.env.VITE_API_URL === 'mock' ||
        import.meta.env.DEV === true
    );
};

// Start the worker with proper configuration
export const startMocking = async (): Promise<void> => {
    if (typeof window === 'undefined') {
        // Skip in SSR environments
        return;
    }

    try {
        await worker.start({
            // Only show warnings in development
            onUnhandledRequest: import.meta.env.DEV ? 'warn' : 'bypass',

            // Service worker configuration
            serviceWorker: {
                // Use the default service worker URL
                url: '/mockServiceWorker.js',

                // Service worker options
                options: {
                    scope: '/'
                }
            },

            // Wait until the service worker is ready
            waitUntilReady: true,

            // Don't log successful requests in production
            quiet: !import.meta.env.DEV
        });

        if (import.meta.env.DEV) {
            console.log('🔧 MSW: Mock Service Worker started successfully');
            console.log('📡 MSW: Intercepting API calls to /api/*');
        }
    } catch (error) {
        console.error('❌ MSW: Failed to start Mock Service Worker:', error);
        throw error;
    }
};

// Stop mocking (useful for testing or when switching to real API)
export const stopMocking = (): void => {
    worker.stop();

    if (import.meta.env.DEV) {
        console.log('🛑 MSW: Mock Service Worker stopped');
    }
};

// Reset all handlers to their initial state
export const resetMocks = (): void => {
    worker.resetHandlers();

    if (import.meta.env.DEV) {
        console.log('🔄 MSW: Handlers reset to initial state');
    }
};

// Add runtime handlers (useful for testing specific scenarios)
export const addMockHandlers = (...newHandlers: Parameters<typeof worker.use>) => {
    worker.use(...newHandlers);

    if (import.meta.env.DEV) {
        console.log(`➕ MSW: Added ${newHandlers.length} runtime handler(s)`);
    }
};

// Restore original handlers (remove runtime handlers)
export const restoreHandlers = (): void => {
    worker.restoreHandlers();

    if (import.meta.env.DEV) {
        console.log('↩️ MSW: Restored original handlers');
    }
};

// Development utilities
if (import.meta.env.DEV) {
    // Make MSW utilities available in the global scope for debugging
    (window as any).msw = {
        worker,
        stop: stopMocking,
        start: startMocking,
        reset: resetMocks,
        addHandlers: addMockHandlers,
        restoreHandlers
    };
}

// Export everything for convenience
export { handlers };
export default worker;
