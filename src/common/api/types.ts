export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: number;
}

export interface PaginationParams {
    page?: number;
    limit?: number;
    offset?: number;
}

export type ParamType = string | number | boolean | Date | undefined | null;

export interface QueryParams extends Record<string, ParamType> {
    [key: string]: ParamType;
}
