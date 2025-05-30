export interface ErrorData {
    [key: string]: unknown;
}

export interface ApiErrorDetails {
    timestamp?: string;
    path?: string;
    method?: string;
    requestId?: string;
    validationErrors?: ValidationError[];
    stack?: string;
}

export interface ValidationError {
    field: string;
    message: string;
    code?: string;
    value?: unknown;
}

export class ApiError<TData extends ErrorData = ErrorData> extends Error {
    public readonly name = 'ApiError';
    public readonly timestamp: string;

    constructor(
        message: string,
        public readonly status?: number,
        public readonly code?: string,
        public readonly data?: TData & ApiErrorDetails
    ) {
        super(message);
        this.timestamp = new Date().toISOString();

        Object.setPrototypeOf(this, ApiError.prototype);
    }

    get isClientError(): boolean {
        return this.status ? this.status >= 400 && this.status < 500 : false;
    }

    get isServerError(): boolean {
        return this.status ? this.status >= 500 : false;
    }

    get isNetworkError(): boolean {
        return this.status === 0 || this.code === 'NETWORK_ERROR';
    }

    get validationErrors(): ValidationError[] {
        return this.data?.validationErrors || [];
    }

    toJSON(): Record<string, unknown> {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
            data: this.data,
            timestamp: this.timestamp,
            stack: this.stack
        };
    }
}

export class ValidationApiError extends ApiError<{
    validationErrors: ValidationError[];
    [key: string]: unknown;
}> {
    constructor(message: string, validationErrors: ValidationError[], status: number = 400) {
        super(message, status, 'VALIDATION_ERROR', { validationErrors });
    }
}

export class NotFoundApiError extends ApiError {
    constructor(message: string = 'Resource not found', resourceId?: string) {
        super(message, 404, 'NOT_FOUND', { resourceId });
    }
}

export class UnauthorizedApiError extends ApiError {
    constructor(message: string = 'Unauthorized access') {
        super(message, 401, 'UNAUTHORIZED');
    }
}

export class ForbiddenApiError extends ApiError {
    constructor(message: string = 'Access forbidden') {
        super(message, 403, 'FORBIDDEN');
    }
}

export class NetworkApiError extends ApiError {
    constructor(message: string = 'Network error occurred') {
        super(message, 0, 'NETWORK_ERROR');
    }
}

// Type guards with better typing
export function isApiError<TData extends ErrorData = ErrorData>(
    error: unknown
): error is ApiError<TData> {
    return error instanceof ApiError;
}

export function isValidationApiError(error: unknown): error is ValidationApiError {
    return error instanceof ValidationApiError;
}

export function isNotFoundApiError(error: unknown): error is NotFoundApiError {
    return error instanceof NotFoundApiError;
}

export function isUnauthorizedApiError(error: unknown): error is UnauthorizedApiError {
    return error instanceof UnauthorizedApiError;
}

export function isForbiddenApiError(error: unknown): error is ForbiddenApiError {
    return error instanceof ForbiddenApiError;
}

export function isNetworkApiError(error: unknown): error is NetworkApiError {
    return error instanceof NetworkApiError;
}
