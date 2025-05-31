// mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import { type Activity, type ActivityType, ActivityTypes } from '@/api/types/activities.ts';
import type {
    CreateActivityParams,
    GetActivitiesParams,
    GetActivitiesResponse
} from '@/context/ActivitiesContext';
import type { CreateGoalParams, Goal, UpdateGoalParams } from '@/api/types/goal.ts';

// User Settings Types
export interface UserSettings {
    id: string;
    goalType: 'count' | 'duration';
    goalValue: number;
    goalFrequency: 'daily' | 'weekly';
    weeklyTarget: number;
    notifications: boolean;
    reminderTime: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateUserSettingsParams {
    goalType: 'count' | 'duration';
    goalValue: number;
    goalFrequency: 'daily' | 'weekly';
    weeklyTarget?: number;
    notifications?: boolean;
    reminderTime?: string;
}

export type UpdateUserSettingsParams = Partial<CreateUserSettingsParams>;

export interface GoalProgress {
    date: string;
    achieved: boolean;
    activityCount: number;
    totalDuration: number;
    targetValue: number;
    targetType: 'count' | 'duration';
}

export interface WeeklyProgress {
    weekStart: string;
    weekEnd: string;
    achieved: boolean;
    totalCount: number;
    totalDuration: number;
    targetValue: number;
    targetType: 'count' | 'duration';
    dailyProgress: GoalProgress[];
}

// Mock data storage
let activities: Activity[] = [
    {
        id: '1',
        title: 'Morning Run',
        description: 'Daily cardio exercise',
        type: ActivityTypes.HIIT,
        duration: 30,
        date: new Date('2024-05-29T06:00:00Z'),
        time: '09:00'
    },
    {
        id: '2',
        title: 'Team Meeting',
        description: 'Weekly sync with development team',
        type: ActivityTypes.RUN,
        duration: 60,
        date: new Date('2024-05-29T09:00:00Z'),
        time: '09:00'
    },
    {
        id: '3',
        title: 'Grocery Shopping',
        description: 'Weekly grocery run',
        type: ActivityTypes.WALK,
        duration: 45,
        date: new Date('2024-05-29T15:00:00Z'),
        time: '09:00'
    }
];

// Default user settings
let userGoal: Goal = {
    userId: 'user_1',
    type: 'count',
    target: 3,
    frequency: 'daily',
    weeklyTarget: 21
};

// Utility functions
const generateId = () => Math.random().toString(36).substr(2, 9);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const filterActivities = (activities: Activity[], params: GetActivitiesParams) => {
    let filtered = [...activities];

    // Filter by type
    if (params.type) {
        filtered = filtered.filter((activity) => activity.type === params.type);
    }

    // Filter by date range
    if (params.startDate) {
        const startDate = new Date(params.startDate);
        filtered = filtered.filter((activity) => new Date(activity.date) >= startDate);
    }

    if (params.endDate) {
        const endDate = new Date(params.endDate);
        filtered = filtered.filter((activity) => new Date(activity.date) <= endDate);
    }

    // Search in title and description
    if (params.search) {
        const searchLower = params.search.toLowerCase();
        filtered = filtered.filter(
            (activity) =>
                activity.title.toLowerCase().includes(searchLower) ||
                activity.description?.toLowerCase().includes(searchLower)
        );
    }

    return filtered;
};

const paginateResults = (items: Activity[], page = 1, limit = 10) => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = items.slice(startIndex, endIndex);

    return {
        items: paginatedItems,
        total: items.length,
        page,
        limit,
        totalPages: Math.ceil(items.length / limit)
    };
};

export const handlers = [
    // GET /api/activities - Get activities with pagination and filters
    http.get('/mock/activities', async ({ request }) => {
        await delay(500); // Simulate network delay

        console.log('request', request);

        const url = new URL(request.url);
        const params: GetActivitiesParams = {
            page: parseInt(url.searchParams.get('page') || '1'),
            limit: parseInt(url.searchParams.get('limit') || '10'),
            type: (url.searchParams.get('type') as ActivityType) || undefined,

            startDate: url.searchParams.get('startDate')
                ? new Date(url.searchParams.get('startDate')!)
                : undefined,
            endDate: url.searchParams.get('endDate')
                ? new Date(url.searchParams.get('endDate')!)
                : undefined,
            search: url.searchParams.get('search') || undefined,
            sortBy: (url.searchParams.get('sortBy') as keyof Activity) || 'date',
            sortOrder: (url.searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
        };

        // Apply filters
        const filtered = filterActivities(activities, params);

        // Apply sorting
        filtered.sort((a, b) => {
            const aValue = a[params.sortBy as keyof Activity];
            const bValue = b[params.sortBy as keyof Activity];

            if (!aValue && !bValue) return 0;

            if (!aValue) return params.sortOrder === 'asc' ? -1 : 1;
            if (!bValue) return params.sortOrder === 'asc' ? 1 : -1;

            if (aValue < bValue) return params.sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return params.sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        // Apply pagination
        const result = paginateResults(filtered, params.page, params.limit);

        const response: GetActivitiesResponse = {
            activities: result.items,
            total: result.total,
            page: result.page,
            limit: result.limit,
            totalPages: result.totalPages
        };

        return HttpResponse.json(response);
    }),

    // GET /api/activities/:id - Get single activity
    http.get('/mock/activities/:id', async ({ params }) => {
        await delay(200);

        const { id } = params;
        const activity = activities.find((a) => a.id === id);

        if (!activity) {
            return new HttpResponse(
                JSON.stringify({ message: 'Activity not found', code: 'ACTIVITY_NOT_FOUND' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return HttpResponse.json(activity);
    }),

    // POST /api/activities - Create new activity
    http.post('/mock/activities', async ({ request }) => {
        await delay(300);

        const body = (await request.json()) as CreateActivityParams;

        // Validate required fields
        if (!body.title || !body.type) {
            return new HttpResponse(
                JSON.stringify({
                    message: 'Title and type are required',
                    code: 'VALIDATION_ERROR'
                }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const newActivity: Activity = {
            id: generateId(),
            title: body.title,
            description: body.description ?? '',
            type: body.type,
            duration: body.duration || 0,
            date: new Date(body.date),
            time: body.time ?? ''
        };

        activities.unshift(newActivity); // Add to beginning
        return HttpResponse.json(newActivity, { status: 201 });
    }),

    // PUT /api/activities/:id - Update activity (full update)
    http.put('/mock/activities/:id', async ({ params, request }) => {
        await delay(300);

        const { id } = params;
        const body = (await request.json()) as Partial<Activity>;

        const activityIndex = activities.findIndex((a) => a.id === id);

        if (activityIndex === -1) {
            return new HttpResponse(
                JSON.stringify({ message: 'Activity not found', code: 'ACTIVITY_NOT_FOUND' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Full update - replace entire activity
        const updatedActivity: Activity = {
            ...activities[activityIndex],
            ...body,
            id: id as string, // Ensure ID doesn't change
            date: body.date ? new Date(body.date) : activities[activityIndex].date
        };

        activities[activityIndex] = updatedActivity;
        return HttpResponse.json(updatedActivity);
    }),

    // PATCH /api/activities/:id - Partial update activity
    http.patch('/mock/activities/:id', async ({ params, request }) => {
        await delay(300);

        const { id } = params;
        const body = (await request.json()) as Partial<Activity>;

        const activityIndex = activities.findIndex((a) => a.id === id);

        if (activityIndex === -1) {
            return new HttpResponse(
                JSON.stringify({ message: 'Activity not found', code: 'ACTIVITY_NOT_FOUND' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Partial update - only update provided fields
        const updatedActivity: Activity = {
            ...activities[activityIndex],
            ...body,
            id: id as string, // Ensure ID doesn't change
            date: body.date ? new Date(body.date) : activities[activityIndex].date
        };

        activities[activityIndex] = updatedActivity;
        return HttpResponse.json(updatedActivity);
    }),

    // DELETE /api/activities/:id - Delete activity
    http.delete('/mock/activities/:id', async ({ params }) => {
        await delay(200);

        const { id } = params;
        const activityIndex = activities.findIndex((a) => a.id === id);

        if (activityIndex === -1) {
            return new HttpResponse(
                JSON.stringify({ message: 'Activity not found', code: 'ACTIVITY_NOT_FOUND' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        activities.splice(activityIndex, 1);
        return new HttpResponse(null, { status: 204 });
    }),

    // POST /api/activities/bulk-delete - Bulk delete activities
    http.post('/mock/activities/bulk-delete', async ({ request }) => {
        await delay(400);

        const { ids } = (await request.json()) as { ids: string[] };

        if (!Array.isArray(ids) || ids.length === 0) {
            return new HttpResponse(
                JSON.stringify({ message: 'IDs array is required', code: 'VALIDATION_ERROR' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Remove activities with matching IDs
        const originalLength = activities.length;
        activities = activities.filter((activity) => !ids.includes(activity.id!));

        const deletedCount = originalLength - activities.length;

        return HttpResponse.json({
            message: `Successfully deleted ${deletedCount} activities`,
            deletedCount
        });
    }),

    // GET /api/activities/stats - Get activities statistics
    http.get('/mock/activities-stats', async ({ request }) => {
        await delay(600);
        console.log('stats', request);

        const url = new URL(request.url);
        const params: GetActivitiesParams = {
            type: (url.searchParams.get('type') as ActivityType) || undefined,
            startDate: url.searchParams.get('startDate')
                ? new Date(url.searchParams.get('startDate')!)
                : undefined,
            endDate: url.searchParams.get('endDate')
                ? new Date(url.searchParams.get('endDate')!)
                : undefined
        };

        // Apply filters for stats
        const filtered = filterActivities(activities, params);

        // Calculate statistics
        const totalActivities = filtered.length;
        const totalDuration = filtered.reduce((sum, activity) => sum + activity.duration, 0);
        const averageDuration = totalActivities > 0 ? totalDuration / totalActivities : 0;

        // Activities by type
        const activitiesByType = filtered.reduce(
            (acc, activity) => {
                acc[activity.type] = (acc[activity.type] || 0) + 1;
                return acc;
            },
            {} as Record<string, number>
        );

        // Activities by date (YYYY-MM-DD format)
        const activitiesByDate = filtered.reduce(
            (acc, activity) => {
                const dateKey = (
                    typeof activity.date === 'string' ? activity.date : activity.date.toISOString()
                ).split('T')[0];
                acc[dateKey] = (acc[dateKey] || 0) + 1;
                return acc;
            },
            {} as Record<string, number>
        );

        return HttpResponse.json({
            totalActivities,
            totalDuration,
            averageDuration,
            activitiesByType,
            activitiesByDate
        });
    }),

    // ============== USER SETTINGS ENDPOINTS ==============

    // GET /api/user-settings - Get user settings
    http.get('/mock/goals/:userId', async () => {
        await delay(300);

        return HttpResponse.json(userGoal);
    }),

    // POST /api/user-settings - Create/Update user settings
    http.post('/mock/user-settings', async ({ request }) => {
        await delay(400);

        const body = (await request.json()) as CreateGoalParams;

        // Validate required fields
        if (!body.type || !body.target || !body.frequency) {
            return new HttpResponse(
                JSON.stringify({
                    message: 'Goal type, value, and frequency are required',
                    code: 'VALIDATION_ERROR'
                }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Validate goal values
        if (body.target <= 0) {
            return new HttpResponse(
                JSON.stringify({
                    message: 'Goal value must be greater than 0',
                    code: 'VALIDATION_ERROR'
                }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Update user settings
        userGoal = {
            ...userGoal,
            type: body.type,
            target: body.target,
            frequency: body.frequency,
            weeklyTarget: body.weeklyTarget ?? userGoal.weeklyTarget
        };

        return HttpResponse.json(userGoal);
    }),

    // PATCH /api/user-settings - Partially update user settings
    http.patch('/mock/goals/:userId', async ({ request }) => {
        await delay(300);

        const body = (await request.json()) as UpdateGoalParams;

        // Validate goal value if provided
        if (body.target !== undefined && body.target <= 0) {
            return new HttpResponse(
                JSON.stringify({
                    message: 'Goal value must be greater than 0',
                    code: 'VALIDATION_ERROR'
                }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Update user settings with only provided fields
        userGoal = {
            ...userGoal,
            ...body
        };

        return HttpResponse.json(userGoal);
    }),

    // Simulate server errors occasionally for testing
    http.get('/mock/activities/error-test', async () => {
        await delay(1000);

        // Randomly return different types of errors
        const errorType = Math.random();

        if (errorType < 0.3) {
            return new HttpResponse(
                JSON.stringify({ message: 'Internal server error', code: 'INTERNAL_ERROR' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        } else if (errorType < 0.6) {
            return new HttpResponse(
                JSON.stringify({
                    message: 'Service temporarily unavailable',
                    code: 'SERVICE_UNAVAILABLE'
                }),
                { status: 503, headers: { 'Content-Type': 'application/json' } }
            );
        } else {
            return new HttpResponse(
                JSON.stringify({ message: 'Rate limit exceeded', code: 'RATE_LIMIT' }),
                { status: 429, headers: { 'Content-Type': 'application/json' } }
            );
        }
    })
];
