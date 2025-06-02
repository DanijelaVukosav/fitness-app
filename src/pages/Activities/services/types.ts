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
    type: ActivityType;
    duration: number;
}

export interface CreateActivity extends Activity {
    time?: string;
}
