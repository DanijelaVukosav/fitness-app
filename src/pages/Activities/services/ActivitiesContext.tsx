import React, { createContext, type ReactNode, useCallback, useContext, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { activitiesKeys, usePrefetchActivity } from '@/pages/Activities/hooks/useActivities.ts';
import {
    type Activity,
    type ActivityType,
    defaultActivitiesFilters
} from '@/pages/Activities/services/types.ts';
import type { ParamType, QueryParams } from '@/common/api/types.ts';

export interface GetActivitiesParams extends QueryParams {
    page?: number;
    limit?: number;
    types?: string;
    completed?: boolean;
    startDate?: Date;
    endDate?: Date;
    search?: string;
    sortBy?: keyof Activity;
    sortOrder?: 'asc' | 'desc';
}

export interface GetActivitiesResponse {
    activities: Activity[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface CreateActivityParams {
    title: string;
    description: string;
    type: ActivityType;
    duration: number;
    date: Date | string;
}

export interface UpdateActivityParams {
    id: string;
    title?: string;
    description?: string;
    type?: ActivityType;
    duration?: number;
    date?: Date;
    completed?: boolean;
}

interface ActivitiesContextState {
    filters: GetActivitiesParams;
    setFilters: (filters: GetActivitiesParams) => void;
    updateFilter: (key: keyof GetActivitiesParams, value: ParamType) => void;
    clearFilters: () => void;

    selectedActivities: string[];
    setSelectedActivities: (ids: string[]) => void;
    toggleActivitySelection: (id: string) => void;
    selectAllActivities: (activityIds: string[]) => void;
    clearSelection: () => void;

    viewMode: 'list' | 'grid' | 'calendar';
    setViewMode: (mode: 'list' | 'grid' | 'calendar') => void;

    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;

    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (open: boolean) => void;
    editingActivity: Activity | null;
    setEditingActivity: (activity: Activity | null) => void;
    deletingActivity: Activity | null;
    setDeletingActivity: (activity: Activity | null) => void;

    invalidateActivities: () => void;
    resetActivitiesCache: () => void;
    prefetchActivity: (id: string) => void;
}

const ActivitiesContext = createContext<ActivitiesContextState | undefined>(undefined);

export const ActivitiesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const queryClient = useQueryClient();

    const [filters, setFilters] = useState<GetActivitiesParams>(defaultActivitiesFilters);
    const updateFilter = useCallback(
        (key: keyof GetActivitiesParams, value: ParamType) =>
            setFilters((prev) => ({
                ...prev,
                [key]: value,
                ...(key !== 'page' && { page: 1 })
            })),
        []
    );
    const clearFilters = useCallback(() => setFilters(defaultActivitiesFilters), []);

    const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
    const toggleActivitySelection = useCallback(
        (id: string) =>
            setSelectedActivities((prev) =>
                prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
            ),
        []
    );
    const selectAllActivities = useCallback((ids: string[]) => setSelectedActivities(ids), []);
    const clearSelection = useCallback(() => setSelectedActivities([]), []);

    const [viewMode, setViewMode] = useState<'list' | 'grid' | 'calendar'>('list');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [deletingActivity, setDeletingActivity] = useState<Activity | null>(null);
    const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

    const invalidateActivities = useCallback(
        () => queryClient.invalidateQueries({ queryKey: activitiesKeys.all }),
        [queryClient]
    );
    const resetActivitiesCache = useCallback(
        () => queryClient.resetQueries({ queryKey: activitiesKeys.all }),
        [queryClient]
    );

    const prefetchActivity = usePrefetchActivity();

    const value: ActivitiesContextState = {
        filters,
        setFilters,
        updateFilter,
        clearFilters,

        selectedActivities,
        setSelectedActivities,
        toggleActivitySelection,
        selectAllActivities,
        clearSelection,

        viewMode,
        setViewMode,
        isModalOpen,
        setIsModalOpen,
        editingActivity,
        setEditingActivity,

        isDeleteModalOpen,
        setIsDeleteModalOpen,
        deletingActivity,
        setDeletingActivity,

        invalidateActivities,
        resetActivitiesCache,
        prefetchActivity
    };

    return <ActivitiesContext.Provider value={value}>{children}</ActivitiesContext.Provider>;
};

export const useActivitiesContext = (): ActivitiesContextState => {
    const context = useContext(ActivitiesContext);

    if (context === undefined) {
        throw new Error('useActivitiesContext must be used within an ActivitiesProvider');
    }

    return context;
};
