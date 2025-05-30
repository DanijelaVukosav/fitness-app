import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { buildQueryParams } from '@/api/common/queryBuilder.ts';
import {
    ApiError,
    type ApiErrorDetails,
    type ErrorData,
    ForbiddenApiError,
    NetworkApiError,
    NotFoundApiError,
    UnauthorizedApiError,
    ValidationApiError
} from '@/api/common/apiError.ts';
import { DateTransformer } from '@/api/common/dateTransfers.ts';
import type { QueryParams } from '@/api/types.ts';

// ---- Axios Instance Setup ----

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// ---- Request Interceptor (Date Serialization) ----
axiosInstance.interceptors.request.use((config) => {
    if (config.data) {
        config.data = DateTransformer.serialize(config.data);
    }
    return config;
});

// ---- Response Interceptor (Error Handling) ----
axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const apiError = handleApiError(error);
        return Promise.reject(apiError);
    }
);
// ---- Functional API Methods ----
export const httpClient = {
    get: async <T>(url: string, params?: QueryParams, config?: AxiosRequestConfig): Promise<T> => {
        const query = params ? buildQueryParams(params) : '';
        const fullUrl = query ? `${url}?${query}` : url;
        const res = await axiosInstance.get<T>(fullUrl, config);
        return res.data;
    },

    post: async <T, R>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> => {
        const res = await axiosInstance.post<R>(url, data, config);
        return res.data;
    },

    put: async <T, R>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> => {
        const res = await axiosInstance.put<R>(url, data, config);
        return res.data;
    },

    patch: async <T, R>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> => {
        const res = await axiosInstance.patch<R>(url, data, config);
        return res.data;
    },

    delete: async <R>(url: string, config?: AxiosRequestConfig): Promise<R> => {
        const res = await axiosInstance.delete<R>(url, config);
        return res.data;
    }
};

// ---- Error Handling Function ----
function handleApiError(error: AxiosError): ApiError {
    if (error.response) {
        const { status, data } = error.response;
        const errorData = data as ErrorData & ApiErrorDetails;

        switch (status) {
            case 400:
                if (errorData?.validationErrors) {
                    return new ValidationApiError(
                        JSON.stringify(errorData.message ?? {}) || 'Validation failed',
                        errorData.validationErrors
                    );
                }
                break;
            case 401:
                return new UnauthorizedApiError(
                    JSON.stringify(errorData.message ?? {}) || 'Unauthorized access'
                );
            case 403:
                return new ForbiddenApiError(
                    JSON.stringify(errorData.message ?? {}) || 'Access forbidden'
                );
            case 404:
                return new NotFoundApiError(
                    JSON.stringify(errorData.message ?? {}) || 'Resource not found',
                    errorData?.resourceId as string
                );
        }

        return new ApiError(
            JSON.stringify(errorData.message ?? {}) || `HTTP ${status}: ${error.message}`,
            status,
            'UNKNOWN',
            errorData
        );
    } else if (error.request) {
        return new NetworkApiError('Network error: No response received');
    } else {
        return new ApiError(error.message || 'Unknown error occurred', 0, 'UNKNOWN_ERROR');
    }
}
