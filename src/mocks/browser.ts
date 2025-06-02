// mocks/browser.ts
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

export const isMockingEnabled = (): boolean => {
    return (
        import.meta.env.VITE_ENABLE_MOCKING === 'true' ||
        import.meta.env.VITE_API_URL === 'mock' ||
        import.meta.env.DEV
    );
};

export const startMocking = async (): Promise<void> => {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        await worker.start({
            onUnhandledRequest: import.meta.env.DEV ? 'warn' : 'bypass',

            serviceWorker: {
                url: '/mockServiceWorker.js',

                options: {
                    scope: '/'
                }
            },

            waitUntilReady: true,

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

export const stopMocking = (): void => {
    worker.stop();

    if (import.meta.env.DEV) {
        console.log('🛑 MSW: Mock Service Worker stopped');
    }
};

export const resetMocks = (): void => {
    worker.resetHandlers();

    if (import.meta.env.DEV) {
        console.log('🔄 MSW: Handlers reset to initial state');
    }
};

export const addMockHandlers = (...newHandlers: Parameters<typeof worker.use>) => {
    worker.use(...newHandlers);

    if (import.meta.env.DEV) {
        console.log(`➕ MSW: Added ${newHandlers.length} runtime handler(s)`);
    }
};

export const restoreHandlers = (): void => {
    worker.restoreHandlers();

    if (import.meta.env.DEV) {
        console.log('↩️ MSW: Restored original handlers');
    }
};

declare global {
    interface Window {
        msw?: {
            worker: typeof worker;
            stop: typeof stopMocking;
            start: typeof startMocking;
            reset: typeof resetMocks;
            addHandlers: typeof addMockHandlers;
            restoreHandlers: typeof restoreHandlers;
        };
    }
}

if (import.meta.env.DEV) {
    window.msw = {
        worker,
        stop: stopMocking,
        start: startMocking,
        reset: resetMocks,
        addHandlers: addMockHandlers,
        restoreHandlers
    };
}

export { handlers };
export default worker;
