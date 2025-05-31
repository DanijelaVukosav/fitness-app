// api/activitiesApi.ts

import type { Activity } from '@/api/types/activities.ts';
import type {
    CreateActivityParams,
    GetActivitiesParams,
    GetActivitiesResponse,
    UpdateActivityParams
} from '@/context/ActivitiesContext.tsx';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

class ActivitiesApiError extends Error {
    constructor(
        message: string,
        public status?: number,
        public code?: string
    ) {
        super(message);
        this.name = 'ActivitiesApiError';
    }
}

async function handleApiResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ActivitiesApiError(
            errorData.message || `HTTP ${response.status}: ${response.statusText}`,
            response.status,
            errorData.code
        );
    }

    return response.json();
}

function buildQueryParams(params: GetActivitiesParams): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            if (value instanceof Date) {
                searchParams.append(key, value.toISOString());
            } else {
                searchParams.append(key, String(value));
            }
        }
    });

    return searchParams.toString();
}

export const activitiesApi = {
    async getActivities(params: GetActivitiesParams = {}): Promise<GetActivitiesResponse> {
        const queryString = buildQueryParams(params);
        const url = `${API_BASE_URL}/activities${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return handleApiResponse<GetActivitiesResponse>(response);
    },

    // Get single activity by ID
    async getActivity(id: string): Promise<Activity> {
        const response = await fetch(`${API_BASE_URL}/activities/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return handleApiResponse<Activity>(response);
    },

    // Create new activity
    async createActivity(params: CreateActivityParams): Promise<Activity> {
        const response = await fetch(`${API_BASE_URL}/activities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...params,
                date: params.date.toISOString()
            })
        });

        return handleApiResponse<Activity>(response);
    },

    // Update existing activity
    async updateActivity(params: UpdateActivityParams): Promise<Activity> {
        const { id, ...updateData } = params;

        const response = await fetch(`${API_BASE_URL}/activities/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...updateData,
                ...(updateData.date && { date: updateData.date.toISOString() })
            })
        });

        return handleApiResponse<Activity>(response);
    },

    // Partial update activity
    async patchActivity(params: UpdateActivityParams): Promise<Activity> {
        const { id, ...updateData } = params;

        const response = await fetch(`${API_BASE_URL}/activities/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...updateData,
                ...(updateData.date && { date: updateData.date.toISOString() })
            })
        });

        return handleApiResponse<Activity>(response);
    },

    // Delete activity
    async deleteActivity(id: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/activities/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new ActivitiesApiError(
                errorData.message || `Failed to delete activity: ${response.statusText}`,
                response.status,
                errorData.code
            );
        }
    },

    // Bulk operations (bonus)
    async bulkDeleteActivities(ids: string[]): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/activities/bulk-delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new ActivitiesApiError(
                errorData.message || `Failed to bulk delete activities: ${response.statusText}`,
                response.status,
                errorData.code
            );
        }
    },

    // Get activities statistics (bonus)
    async getActivitiesStats(params?: GetActivitiesParams): Promise<{
        totalActivities: number;
        totalDuration: number;
        averageDuration: number;
        activitiesByType: Record<string, number>;
        activitiesByDate: Record<string, number>;
    }> {
        const queryString = params ? `?${buildQueryParams(params)}` : '';
        const response = await fetch(`${API_BASE_URL}/activities/stats${queryString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return handleApiResponse(response);
    }
};
export function isActivitiesApiError(error: Error): error is ActivitiesApiError {
    return error instanceof ActivitiesApiError;
}

// Export the error class
export { ActivitiesApiError };
