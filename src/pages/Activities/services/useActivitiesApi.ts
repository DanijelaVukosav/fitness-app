import { useCallback } from 'react';
import { type Activity } from '@/pages/Activities/services/types.ts';
import type {
    CreateActivityParams,
    GetActivitiesParams,
    GetActivitiesResponse,
    UpdateActivityParams
} from '@/pages/Activities/services/ActivitiesContext.tsx';
import { httpClient } from '@/common/api/httpClinet.ts';

export interface ActivityStats {
    totalActivities: number;
    totalDuration: number;
    averageDuration: number;
    activitiesByType: Record<string, number>;
    activitiesByDate: Record<string, number>;
}

const BASE_URL = '/activities';

export const useActivitiesApi = () => {
    const getActivities = useCallback(
        (params?: GetActivitiesParams): Promise<GetActivitiesResponse> =>
            httpClient.get<GetActivitiesResponse>(BASE_URL, params),
        []
    );

    const getActivity = useCallback(
        (id: string): Promise<Activity> => httpClient.get<Activity>(`${BASE_URL}/${id}`),
        []
    );

    const createActivity = useCallback(
        (params: CreateActivityParams): Promise<Activity> =>
            httpClient.post<CreateActivityParams, Activity>(BASE_URL, params),
        []
    );

    const updateActivity = useCallback((params: UpdateActivityParams): Promise<Activity> => {
        return httpClient.put<UpdateActivityParams, Activity>(`${BASE_URL}/${params.id}`, params);
    }, []);

    const patchActivity = useCallback((params: UpdateActivityParams): Promise<Activity> => {
        return httpClient.patch<UpdateActivityParams, Activity>(`${BASE_URL}/${params.id}`, params);
    }, []);

    const deleteActivity = useCallback(
        (id: string): Promise<void> => httpClient.delete<void>(`${BASE_URL}/${id}`),
        []
    );

    const bulkDeleteActivities = useCallback(
        (ids: string[]): Promise<void> =>
            httpClient.post<{ ids: string[] }, void>(`${BASE_URL}/bulk-delete`, { ids }),
        []
    );

    const getActivitiesStats = useCallback(
        (params?: GetActivitiesParams): Promise<ActivityStats> =>
            httpClient.get<ActivityStats>(`${BASE_URL}-stats`, params),
        []
    );

    return {
        getActivities,
        getActivity,
        createActivity,
        updateActivity,
        patchActivity,
        deleteActivity,
        bulkDeleteActivities,
        getActivitiesStats
    };
};
