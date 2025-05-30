/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_ENABLE_MOCKING: string;
    readonly VITE_APP_NAME: string;
    readonly VITE_APP_VERSION: string;
    readonly VITE_SHOW_REACT_QUERY_DEVTOOLS: string;
    readonly VITE_LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
    readonly VITE_ENABLE_BULK_OPERATIONS: string;
    readonly VITE_ENABLE_STATISTICS: string;
    readonly VITE_ENABLE_OFFLINE_SUPPORT: string;
    readonly VITE_API_KEY?: string;
    readonly VITE_AUTH_TOKEN?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
