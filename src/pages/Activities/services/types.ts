// types/index.ts

import type { GetActivitiesParams } from '@/pages/Activities/services/ActivitiesContext.tsx';

export const defaultActivitiesFilters: GetActivitiesParams = {
    page: 1,
    limit: 8,
    sortBy: 'date',
    sortOrder: 'desc'
};
export const ActivityTypes = {
    RUN: 'RUN',
    WALK: 'WALK',
    HIKE: 'HIKE',
    RIDE: 'RIDE',
    SWIM: 'SWIM',
    WORKOUT: 'WORKOUT',
    HIIT: 'HIIT',
    OTHER: 'OTHER'
} as const;

export type ActivityType = (typeof ActivityTypes)[keyof typeof ActivityTypes];

export interface Activity {
    id?: string;
    title: string;
    description: string;
    date: Date | string;
    time?: string;
    type: ActivityType;
    duration: number;
}

export interface FilterState {
    type?: ActivityType;
    searchTerm?: string;
    dateRange?: {
        start: Date;
        end: Date;
    };
}

export interface PaginationState {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
}

export interface ActivityStats {
    totalActivities: number;
    thisWeek: number;
    totalHours: number;
    averageDuration: number;
    mostPopularType: ActivityType;
}

// Component Props Types
export interface ActivityCardProps {
    activity: Activity;
    onActivityClick?: (activity: Activity) => void;
    className?: string;
}

export interface FilterContainerProps {
    onFilterChange?: (type?: ActivityType, searchTerm?: string) => void;
    initialFilters?: FilterState;
}

export interface ActivitiesGridProps {
    itemsPerPage?: number;
    onActivityClick?: (activity: Activity) => void;
    showStats?: boolean;
}

// Context Types
export interface ActivitiesContextType {
    activities: Activity[];
    filteredActivities: Activity[];
    setActivities: (activities: Activity[]) => void;
    addActivity: (activity: Omit<Activity, 'id'>) => void;
    updateActivity: (id: string, activity: Partial<Activity>) => void;
    deleteActivity: (id: string) => void;
    filterActivities: (filters?: FilterState) => void;
    getActivityStats: () => ActivityStats;
    isLoading: boolean;
    error: string | null;
}

// API Response Types
export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
    error?: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
}

// Theme Extensions
declare module '@mui/material/styles' {
    interface Palette {
        gradient: {
            primary: string;
            secondary: string;
            tertiary: string;
        };
    }

    interface PaletteOptions {
        gradient?: {
            primary?: string;
            secondary?: string;
            tertiary?: string;
        };
    }
}
