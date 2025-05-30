// mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import { type Activity, type ActivityType, ActivityTypes } from '@/context/types';
import type {
    CreateActivityParams,
    GetActivitiesParams,
    GetActivitiesResponse
} from '@/context/ActivitiesContext';

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

export interface UpdateUserSettingsParams extends Partial<CreateUserSettingsParams> {}

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
let userSettings: UserSettings = {
    id: 'user-1',
    goalType: 'count',
    goalValue: 3,
    goalFrequency: 'daily',
    weeklyTarget: 21,
    notifications: true,
    reminderTime: '09:00',
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z')
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

// Goal tracking utilities
const getDateString = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

const getWeekStart = (date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
};

const getWeekEnd = (date: Date): Date => {
    const weekStart = getWeekStart(date);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    return weekEnd;
};

const calculateDailyProgress = (date: Date, settings: UserSettings): GoalProgress => {
    const dateStr = getDateString(date);
    const dayActivities = activities.filter(
        (activity) => getDateString(new Date(activity.date)) === dateStr
    );

    const activityCount = dayActivities.length;
    const totalDuration = dayActivities.reduce((sum, activity) => sum + activity.duration, 0);

    const targetValue =
        settings.goalFrequency === 'daily' ? settings.goalValue : settings.weeklyTarget;
    const currentValue = settings.goalType === 'count' ? activityCount : totalDuration;

    return {
        date: dateStr,
        achieved: currentValue >= targetValue,
        activityCount,
        totalDuration,
        targetValue,
        targetType: settings.goalType
    };
};

const calculateWeeklyProgress = (weekStart: Date, settings: UserSettings): WeeklyProgress => {
    const weekEnd = getWeekEnd(weekStart);
    const dailyProgress: GoalProgress[] = [];

    let totalCount = 0;
    let totalDuration = 0;

    // Calculate daily progress for the week
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(weekStart);
        currentDate.setDate(weekStart.getDate() + i);

        const dayProgress = calculateDailyProgress(currentDate, settings);
        dailyProgress.push(dayProgress);

        totalCount += dayProgress.activityCount;
        totalDuration += dayProgress.totalDuration;
    }

    const targetValue =
        settings.goalType === 'count' ? settings.weeklyTarget : settings.weeklyTarget;
    const currentValue = settings.goalType === 'count' ? totalCount : totalDuration;

    return {
        weekStart: getDateString(weekStart),
        weekEnd: getDateString(weekEnd),
        achieved: currentValue >= targetValue,
        totalCount,
        totalDuration,
        targetValue,
        targetType: settings.goalType,
        dailyProgress
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
        console.log('url', url);
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
        console.log('filterd', filtered);

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
                const dateKey = activity.date.toISOString().split('T')[0];
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
    http.get('/mock/user-settings', async () => {
        await delay(300);

        return HttpResponse.json(userSettings);
    }),

    // POST /api/user-settings - Create/Update user settings
    http.post('/mock/user-settings', async ({ request }) => {
        await delay(400);

        const body = (await request.json()) as CreateUserSettingsParams;

        // Validate required fields
        if (!body.goalType || !body.goalValue || !body.goalFrequency) {
            return new HttpResponse(
                JSON.stringify({
                    message: 'Goal type, value, and frequency are required',
                    code: 'VALIDATION_ERROR'
                }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Validate goal values
        if (body.goalValue <= 0) {
            return new HttpResponse(
                JSON.stringify({
                    message: 'Goal value must be greater than 0',
                    code: 'VALIDATION_ERROR'
                }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Update user settings
        userSettings = {
            ...userSettings,
            goalType: body.goalType,
            goalValue: body.goalValue,
            goalFrequency: body.goalFrequency,
            weeklyTarget: body.weeklyTarget ?? userSettings.weeklyTarget,
            notifications: body.notifications ?? userSettings.notifications,
            reminderTime: body.reminderTime ?? userSettings.reminderTime,
            updatedAt: new Date()
        };

        return HttpResponse.json(userSettings);
    }),

    // PATCH /api/user-settings - Partially update user settings
    http.patch('/mock/user-settings', async ({ request }) => {
        await delay(300);

        const body = (await request.json()) as UpdateUserSettingsParams;

        // Validate goal value if provided
        if (body.goalValue !== undefined && body.goalValue <= 0) {
            return new HttpResponse(
                JSON.stringify({
                    message: 'Goal value must be greater than 0',
                    code: 'VALIDATION_ERROR'
                }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Update user settings with only provided fields
        userSettings = {
            ...userSettings,
            ...body,
            updatedAt: new Date()
        };

        return HttpResponse.json(userSettings);
    }),

    // ============== GOAL TRACKING ENDPOINTS ==============

    // GET /api/goal-progress/daily - Get daily goal progress
    http.get('/mock/goal-progress/daily', async ({ request }) => {
        await delay(400);

        const url = new URL(request.url);
        const dateParam = url.searchParams.get('date');
        const date = dateParam ? new Date(dateParam) : new Date();

        const progress = calculateDailyProgress(date, userSettings);

        return HttpResponse.json(progress);
    }),

    // GET /api/goal-progress/weekly - Get weekly goal progress
    http.get('/mock/goal-progress/weekly', async ({ request }) => {
        await delay(500);

        const url = new URL(request.url);
        const dateParam = url.searchParams.get('date');
        const date = dateParam ? new Date(dateParam) : new Date();
        const weekStart = getWeekStart(date);

        const progress = calculateWeeklyProgress(weekStart, userSettings);

        return HttpResponse.json(progress);
    }),

    // GET /api/goal-progress/range - Get goal progress for date range
    http.get('/mock/goal-progress/range', async ({ request }) => {
        await delay(600);

        const url = new URL(request.url);
        const startDateParam = url.searchParams.get('startDate');
        const endDateParam = url.searchParams.get('endDate');

        if (!startDateParam || !endDateParam) {
            return new HttpResponse(
                JSON.stringify({
                    message: 'Start date and end date are required',
                    code: 'VALIDATION_ERROR'
                }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const startDate = new Date(startDateParam);
        const endDate = new Date(endDateParam);
        const progressData: GoalProgress[] = [];

        // Calculate progress for each day in range
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const dayProgress = calculateDailyProgress(currentDate, userSettings);
            progressData.push(dayProgress);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Calculate summary statistics
        const totalDays = progressData.length;
        const achievedDays = progressData.filter((p) => p.achieved).length;
        const achievementRate = totalDays > 0 ? (achievedDays / totalDays) * 100 : 0;

        return HttpResponse.json({
            startDate: getDateString(startDate),
            endDate: getDateString(endDate),
            totalDays,
            achievedDays,
            achievementRate: Math.round(achievementRate * 100) / 100,
            dailyProgress: progressData
        });
    }),

    // DELETE /api/user-settings - Reset user settings to defaults
    http.delete('/mock/user-settings', async () => {
        await delay(300);

        userSettings = {
            id: 'user-1',
            goalType: 'count',
            goalValue: 3,
            goalFrequency: 'daily',
            weeklyTarget: 21,
            notifications: true,
            reminderTime: '09:00',
            createdAt: new Date('2024-01-01T00:00:00Z'),
            updatedAt: new Date()
        };

        return HttpResponse.json(userSettings);
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
