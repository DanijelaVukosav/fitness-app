import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { Activity } from '@/api/types/activities.ts';
import type { GetActivitiesParams, GetActivitiesResponse } from '@/context/ActivitiesContext';
import { useActivitiesApi } from '@/api/hooks/useActivitiesApi.ts';

// Query keys
export const activitiesKeys = {
    all: ['activities'] as const,
    lists: () => [...activitiesKeys.all, 'list'] as const,
    list: (params: GetActivitiesParams) => [...activitiesKeys.lists(), params] as const,
    details: () => [...activitiesKeys.all, 'detail'] as const,
    detail: (id: string) => [...activitiesKeys.details(), id] as const,
    stats: (params?: GetActivitiesParams) => [...activitiesKeys.all, 'stats', params || {}] as const
};

// 🔍 Get activities list
export const useActivities = (params: GetActivitiesParams = {}) => {
    const { getActivities } = useActivitiesApi();

    return useQuery({
        queryKey: activitiesKeys.list(params),
        queryFn: () => getActivities(params),
        staleTime: 5 * 60 * 1000,
        placeholderData: (prev) => prev
    });
};

// 🔍 Get single activity
export const useActivity = (id: string, options?: { enabled?: boolean }) => {
    const { getActivity } = useActivitiesApi();

    return useQuery({
        queryKey: activitiesKeys.detail(id),
        queryFn: () => getActivity(id),
        enabled: !!id && options?.enabled !== false,
        staleTime: 10 * 60 * 1000
    });
};

// 📊 Get activity stats
export const useActivitiesStats = (params?: GetActivitiesParams) => {
    const { getActivitiesStats } = useActivitiesApi();

    return useQuery({
        queryKey: activitiesKeys.stats(params),
        queryFn: () => getActivitiesStats(params),
        staleTime: 2 * 60 * 1000
    });
};

// ➕ Create activity
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

// ✏️ Update activity
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

// ✂️ Patch activity
export const usePatchActivity = () => {
    const queryClient = useQueryClient();
    const { patchActivity } = useActivitiesApi();

    return useMutation({
        mutationFn: patchActivity,
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
        onError: (error) => console.error('Failed to patch activity:', error)
    });
};

// 🗑️ Delete activity
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
            queryClient.removeQueries({ queryKey: activitiesKeys.detail(deletedId) });
            queryClient.invalidateQueries({ queryKey: activitiesKeys.stats() });
        },
        onError: (error) => console.error('Failed to delete activity:', error)
    });
};

// 🧹 Bulk delete
export const useBulkDeleteActivities = () => {
    const queryClient = useQueryClient();
    const { bulkDeleteActivities } = useActivitiesApi();

    return useMutation({
        mutationFn: bulkDeleteActivities,
        onSuccess: (_, deletedIds) => {
            queryClient.setQueriesData<GetActivitiesResponse>(
                { queryKey: activitiesKeys.lists() },
                (old) =>
                    old
                        ? {
                              ...old,
                              activities: old.activities.filter(
                                  (activity) => !deletedIds.includes(activity.id!)
                              ),
                              total: old.total - deletedIds.length
                          }
                        : old
            );

            deletedIds.forEach((id) =>
                queryClient.removeQueries({ queryKey: activitiesKeys.detail(id) })
            );

            queryClient.invalidateQueries({ queryKey: activitiesKeys.stats() });
        },
        onError: (error) => console.error('Failed to bulk delete activities:', error)
    });
};

// ⚡ Optimistic update
export const useOptimisticActivityUpdate = () => {
    const queryClient = useQueryClient();

    const optimisticUpdate = (id: string, updates: Partial<Activity>) => {
        queryClient.setQueryData<Activity>(activitiesKeys.detail(id), (old) =>
            old ? { ...old, ...updates, updatedAt: new Date() } : undefined
        );
        queryClient.setQueriesData<GetActivitiesResponse>(
            { queryKey: activitiesKeys.lists() },
            (old) =>
                old
                    ? {
                          ...old,
                          activities: old.activities.map((a) =>
                              a.id === id ? { ...a, ...updates, updatedAt: new Date() } : a
                          )
                      }
                    : old
        );
    };

    const rollbackUpdate = (id: string) => {
        queryClient.invalidateQueries({ queryKey: activitiesKeys.detail(id) });
        queryClient.invalidateQueries({ queryKey: activitiesKeys.lists() });
    };

    return { optimisticUpdate, rollbackUpdate };
};

// 📦 Prefetch single
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

// 📦 Prefetch list
export const usePrefetchActivities = () => {
    const queryClient = useQueryClient();
    const { getActivities } = useActivitiesApi();

    return (params: GetActivitiesParams = {}) =>
        queryClient.prefetchQuery({
            queryKey: activitiesKeys.list(params),
            queryFn: () => getActivities(params),
            staleTime: 5 * 60 * 1000
        });
};

// 🔄 Background sync
export const useActivitiesSync = () => {
    const queryClient = useQueryClient();

    const syncActivities = () => {
        queryClient.invalidateQueries({ queryKey: activitiesKeys.all });
    };

    const syncActivity = (id: string) => {
        queryClient.invalidateQueries({ queryKey: activitiesKeys.detail(id) });
    };

    return { syncActivities, syncActivity };
};
