import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
    GetActivitiesParams,
    GetActivitiesResponse
} from '@/pages/Activities/services/ActivitiesContext.tsx';
import { useActivitiesApi } from '@/pages/Activities/services/useActivitiesApi.ts';

export const activitiesKeys = {
    all: ['activities'] as const,
    lists: () => [...activitiesKeys.all, 'list'] as const,
    list: (params: GetActivitiesParams) => [...activitiesKeys.lists(), params] as const,
    details: () => [...activitiesKeys.all, 'detail'] as const,
    detail: (id: string) => [...activitiesKeys.details(), id] as const,
    stats: (params?: GetActivitiesParams) => [...activitiesKeys.all, 'stats', params || {}] as const
};

export const useActivities = (params: GetActivitiesParams = {}) => {
    const { getActivities } = useActivitiesApi();

    return useQuery({
        queryKey: activitiesKeys.list(params),
        queryFn: () => getActivities(params),
        staleTime: 5 * 60 * 1000,
        placeholderData: (prev) => prev
    });
};

export const useActivitiesStats = (params?: GetActivitiesParams) => {
    const { getActivitiesStats } = useActivitiesApi();

    return useQuery({
        queryKey: activitiesKeys.stats(params),
        queryFn: () => getActivitiesStats(params),
        staleTime: 2 * 60 * 1000
    });
};

export const useCreateActivity = () => {
    const queryClient = useQueryClient();
    const { createActivity } = useActivitiesApi();

    return useMutation({
        mutationFn: createActivity,
        onSuccess: (newActivity) => {
            queryClient.invalidateQueries({ queryKey: activitiesKeys.lists() });
            queryClient.invalidateQueries({ queryKey: activitiesKeys.stats() });

            queryClient.setQueryData<GetActivitiesResponse>(activitiesKeys.list({}), (old) =>
                old
                    ? {
                          ...old,
                          activities: [newActivity, ...old.activities],
                          total: old.total + 1
                      }
                    : undefined
            );
        },
        onError: (error) => console.error('Failed to create activity:', error)
    });
};

export const useUpdateActivity = () => {
    const queryClient = useQueryClient();
    const { updateActivity } = useActivitiesApi();

    return useMutation({
        mutationFn: updateActivity,
        onSuccess: (updatedActivity) => {
            queryClient.setQueryData(activitiesKeys.detail(updatedActivity.id!), updatedActivity);
            queryClient.setQueriesData<GetActivitiesResponse>(
                { queryKey: activitiesKeys.lists() },
                (old) =>
                    old
                        ? {
                              ...old,
                              activities: old.activities.map((activity) =>
                                  activity.id === updatedActivity.id ? updatedActivity : activity
                              )
                          }
                        : old
            );
            queryClient.invalidateQueries({ queryKey: activitiesKeys.stats() });
        },
        onError: (error) => console.error('Failed to update activity:', error)
    });
};

export const useDeleteActivity = () => {
    const queryClient = useQueryClient();
    const { deleteActivity } = useActivitiesApi();

    return useMutation({
        mutationFn: deleteActivity,
        onSuccess: (_, deletedId) => {
            queryClient.setQueriesData<GetActivitiesResponse>(
                { queryKey: activitiesKeys.lists() },
                (old) =>
                    old
                        ? {
                              ...old,
                              activities: old.activities.filter((a) => a.id !== deletedId),
                              total: old.total - 1
                          }
                        : old
            );
            queryClient.invalidateQueries({ queryKey: activitiesKeys.lists() });
            queryClient.invalidateQueries({ queryKey: activitiesKeys.stats() });
        },
        onError: (error) => console.error('Failed to delete activity:', error)
    });
};

export const usePrefetchActivity = () => {
    const queryClient = useQueryClient();
    const { getActivity } = useActivitiesApi();

    return (id: string) =>
        queryClient.prefetchQuery({
            queryKey: activitiesKeys.detail(id),
            queryFn: () => getActivity(id),
            staleTime: 10 * 60 * 1000
        });
};
