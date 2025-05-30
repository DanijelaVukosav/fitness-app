// components/ui/ApiStates.tsx
import React from 'react';
import { AlertCircle, RefreshCw, WifiOff } from 'lucide-react';
import { isActivitiesApiError } from '@/api/activitiesApi';

// Loading component
interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    message?: string;
    className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'md',
    message,
    className = ''
}) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    return (
        <div className={`flex items-center justify-center space-x-2 ${className}`}>
            <RefreshCw className={`${sizeClasses[size]} animate-spin text-blue-500`} />
            {message && <span className="text-sm text-gray-600 dark:text-gray-400">{message}</span>}
        </div>
    );
};

// Empty state component
interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: React.ReactNode;
    className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon,
    title,
    description,
    action,
    className = ''
}) => {
    return (
        <div
            className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
            {icon && <div className="mb-4 text-gray-400 dark:text-gray-500">{icon}</div>}
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
            {description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
                    {description}
                </p>
            )}
            {action}
        </div>
    );
};

// Error boundary component
interface ErrorDisplayProps {
    error: Error;
    onRetry?: () => void;
    onReset?: () => void;
    className?: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
    error,
    onRetry,
    onReset,
    className = ''
}) => {
    const getErrorMessage = (error: Error) => {
        if (isActivitiesApiError(error)) {
            switch (error.status) {
                case 400:
                    return 'Bad request. Please check your input and try again.';
                case 401:
                    return 'Authentication required. Please log in.';
                case 403:
                    return "You don't have permission to perform this action.";
                case 404:
                    return 'The requested resource was not found.';
                case 429:
                    return 'Too many requests. Please wait a moment and try again.';
                case 500:
                    return 'Server error. Please try again later.';
                case 503:
                    return 'Service temporarily unavailable. Please try again later.';
                default:
                    return error.message || 'An unexpected error occurred.';
            }
        }
        return error.message || 'An unexpected error occurred.';
    };

    const isNetworkError = !navigator.onLine || error.message.includes('fetch');

    return (
        <div
            className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 ${className}`}>
            <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                    {isNetworkError ? (
                        <WifiOff className="w-5 h-5 text-red-500" />
                    ) : (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                        {isNetworkError ? 'Connection Error' : 'Error'}
                    </h3>
                    <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                        {getErrorMessage(error)}
                    </p>
                    {(onRetry || onReset) && (
                        <div className="mt-4 flex space-x-2">
                            {onRetry && (
                                <button
                                    onClick={onRetry}
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-red-800 dark:text-red-200 dark:hover:bg-red-700">
                                    <RefreshCw className="w-4 h-4 mr-1" />
                                    Try Again
                                </button>
                            )}
                            {onReset && (
                                <button
                                    onClick={onReset}
                                    className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                                    Reset
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Network status indicator
export const NetworkStatus: React.FC = () => {
    const [isOnline, setIsOnline] = React.useState(navigator.onLine);

    React.useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    if (isOnline) return null;

    return (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4">
            <div className="flex items-center">
                <WifiOff className="w-5 h-5 text-yellow-400 mr-2" />
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    You're currently offline. Some features may be limited.
                </p>
            </div>
        </div>
    );
};

// Retry boundary component
interface RetryBoundaryProps {
    children: React.ReactNode;
    fallback?: (error: Error, retry: () => void) => React.ReactNode;
}

export const RetryBoundary: React.FC<RetryBoundaryProps> = ({ children, fallback }) => {
    const [error, setError] = React.useState<Error | null>(null);
    const [retryCount, setRetryCount] = React.useState(0);

    const retry = React.useCallback(() => {
        setError(null);
        setRetryCount((prev) => prev + 1);
    }, []);

    const reset = React.useCallback(() => {
        setError(null);
        setRetryCount(0);
    }, []);

    React.useEffect(() => {
        if (error) {
            console.error('RetryBoundary caught error:', error);
        }
    }, [error]);

    if (error) {
        if (fallback) {
            return <>{fallback(error, retry)}</>;
        }

        return <ErrorDisplay error={error} onRetry={retry} onReset={reset} className="m-4" />;
    }

    return (
        <ErrorBoundary key={retryCount} onError={setError}>
            {children}
        </ErrorBoundary>
    );
};

// Simple error boundary
interface ErrorBoundaryProps {
    children: React.ReactNode;
    onError: (error: Error) => void;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error) {
        this.props.onError(error);
    }

    render() {
        if (this.state.hasError) {
            return null; // Let parent handle the error display
        }

        return this.props.children;
    }
}

// Query state wrapper component
interface QueryStateWrapperProps<T> {
    query: {
        data?: T;
        isLoading: boolean;
        isError: boolean;
        error: Error | null;
        refetch: () => void;
    };
    loadingComponent?: React.ReactNode;
    errorComponent?: (error: Error, retry: () => void) => React.ReactNode;
    emptyComponent?: React.ReactNode;
    isEmpty?: (data: T) => boolean;
    children: (data: T) => React.ReactNode;
}

export function QueryStateWrapper<T>({
    query,
    loadingComponent,
    errorComponent,
    emptyComponent,
    isEmpty,
    children
}: QueryStateWrapperProps<T>) {
    const { data, isLoading, isError, error, refetch } = query;

    if (isLoading) {
        return loadingComponent || <LoadingSpinner message="Loading..." />;
    }

    if (isError && error) {
        return errorComponent ? (
            errorComponent(error, refetch)
        ) : (
            <ErrorDisplay error={error} onRetry={refetch} />
        );
    }

    if (!data || (isEmpty && isEmpty(data))) {
        return emptyComponent || <EmptyState title="No data available" />;
    }

    return <>{children(data)}</>;
}
