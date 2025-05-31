import type { QueryParams } from '@/common/api/types.ts';

export function buildQueryParams(params: QueryParams): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            if (value instanceof Date) {
                searchParams.append(key, value.toISOString());
            } else if (Array.isArray(value)) {
                value.forEach((item) => searchParams.append(key, String(item)));
            } else {
                searchParams.append(key, String(value));
            }
        }
    });

    return searchParams.toString();
}
