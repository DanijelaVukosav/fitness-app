// mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import {
    type Activity,
    type ActivityType,
    ActivityTypes
} from '@/pages/Activities/services/types.ts';
import type {
    CreateActivityParams,
    GetActivitiesParams,
    GetActivitiesResponse
} from '@/pages/Activities/services/ActivitiesContext.tsx';
import type { CreateGoalParams, Goal, UpdateGoalParams } from '@/pages/Goals/services/goal.ts';

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
let activities: Activity[] = [
    {
        id: '1',
        title: 'Morning Trail Run',
        description: 'Early morning 5K run through the forest trail',
        type: ActivityTypes.RUN,
        duration: 35,
        date: new Date('2025-05-01T06:00:00Z'),
        time: '06:00'
    },
    {
        id: '2',
        title: 'City Walk & Coffee',
        description: 'Leisurely walk downtown with coffee stop',
        type: ActivityTypes.WALK,
        duration: 50,
        date: new Date('2025-05-02T09:30:00Z'),
        time: '09:30'
    },
    {
        id: '3',
        title: 'Mountain Hike',
        description: 'Challenging hike up Eagle Peak with scenic views',
        type: ActivityTypes.HIKE,
        duration: 120,
        date: new Date('2025-05-03T07:00:00Z'),
        time: '07:00'
    },
    {
        id: '4',
        title: 'Evening Bike Ride',
        description: 'Peaceful bike ride along the lakefront path',
        type: ActivityTypes.RIDE,
        duration: 45,
        date: new Date('2025-05-04T18:00:00Z'),
        time: '18:00'
    },
    {
        id: '5',
        title: 'Pool Swimming',
        description: 'Lap swimming session at the community pool',
        type: ActivityTypes.SWIM,
        duration: 40,
        date: new Date('2025-05-05T17:30:00Z'),
        time: '17:30'
    },
    {
        id: '6',
        title: 'Full Body Workout',
        description: 'Strength training session focusing on compound movements',
        type: ActivityTypes.WORKOUT,
        duration: 60,
        date: new Date('2025-05-06T16:00:00Z'),
        time: '16:00'
    },
    {
        id: '7',
        title: 'HIIT Cardio Blast',
        description: 'High-intensity interval training with burpees and sprints',
        type: ActivityTypes.HIIT,
        duration: 25,
        date: new Date('2025-05-07T07:15:00Z'),
        time: '07:15'
    },
    {
        id: '8',
        title: 'Yoga & Meditation',
        description: 'Relaxing yoga session followed by mindfulness meditation',
        type: ActivityTypes.OTHER,
        duration: 75,
        date: new Date('2025-05-08T19:00:00Z'),
        time: '19:00'
    },
    {
        id: '9',
        title: 'Interval Running',
        description: 'Speed work with 400m intervals at the track',
        type: ActivityTypes.RUN,
        duration: 45,
        date: new Date('2025-05-09T06:30:00Z'),
        time: '06:30'
    },
    {
        id: '10',
        title: 'Nature Walk',
        description: 'Mindful walk through the botanical gardens',
        type: ActivityTypes.WALK,
        duration: 35,
        date: new Date('2025-05-10T15:00:00Z'),
        time: '15:00'
    },
    {
        id: '11',
        title: 'Coastal Hike',
        description: 'Scenic cliff-side hike with ocean views',
        type: ActivityTypes.HIKE,
        duration: 90,
        date: new Date('2025-05-11T08:00:00Z'),
        time: '08:00'
    },
    {
        id: '12',
        title: 'Mountain Biking',
        description: 'Technical trail riding through pine forests',
        type: ActivityTypes.RIDE,
        duration: 75,
        date: new Date('2025-05-12T14:00:00Z'),
        time: '14:00'
    },
    {
        id: '13',
        title: 'Open Water Swimming',
        description: 'Swimming session at the lake with breathwork',
        type: ActivityTypes.SWIM,
        duration: 50,
        date: new Date('2025-05-13T16:30:00Z'),
        time: '16:30'
    },
    {
        id: '14',
        title: 'Upper Body Focus',
        description: 'Gym session targeting chest, shoulders, and arms',
        type: ActivityTypes.WORKOUT,
        duration: 55,
        date: new Date('2025-05-14T17:00:00Z'),
        time: '17:00'
    },
    {
        id: '15',
        title: 'Tabata Training',
        description: '20-second max effort intervals with 10-second rest',
        type: ActivityTypes.HIIT,
        duration: 20,
        date: new Date('2025-05-15T12:00:00Z'),
        time: '12:00'
    },
    {
        id: '16',
        title: 'Rock Climbing',
        description: 'Indoor bouldering session at the climbing gym',
        type: ActivityTypes.OTHER,
        duration: 90,
        date: new Date('2025-05-16T18:30:00Z'),
        time: '18:30'
    },
    {
        id: '17',
        title: 'Long Distance Run',
        description: '10K training run preparing for upcoming race',
        type: ActivityTypes.RUN,
        duration: 55,
        date: new Date('2025-05-17T06:00:00Z'),
        time: '06:00'
    },
    {
        id: '18',
        title: 'Dog Park Walk',
        description: 'Relaxed walk with the dog at the local park',
        type: ActivityTypes.WALK,
        duration: 40,
        date: new Date('2025-05-18T10:00:00Z'),
        time: '10:00'
    },
    {
        id: '19',
        title: 'Waterfall Hike',
        description: 'Adventure hike to hidden waterfall with photography',
        type: ActivityTypes.HIKE,
        duration: 110,
        date: new Date('2025-05-19T07:30:00Z'),
        time: '07:30'
    },
    {
        id: '20',
        title: 'City Bike Tour',
        description: 'Exploring downtown neighborhoods on two wheels',
        type: ActivityTypes.RIDE,
        duration: 65,
        date: new Date('2025-05-20T16:00:00Z'),
        time: '16:00'
    },
    {
        id: '21',
        title: 'Aqua Aerobics',
        description: 'Water-based fitness class with resistance exercises',
        type: ActivityTypes.SWIM,
        duration: 45,
        date: new Date('2025-05-21T11:00:00Z'),
        time: '11:00'
    },
    {
        id: '22',
        title: 'Leg Day Workout',
        description: 'Intense lower body training with squats and deadlifts',
        type: ActivityTypes.WORKOUT,
        duration: 70,
        date: new Date('2025-05-22T17:30:00Z'),
        time: '17:30'
    },
    {
        id: '23',
        title: 'Sprint Intervals',
        description: 'High-intensity sprint training for speed development',
        type: ActivityTypes.HIIT,
        duration: 30,
        date: new Date('2025-05-23T07:00:00Z'),
        time: '07:00'
    },
    {
        id: '24',
        title: 'Paddleboard Session',
        description: 'Stand-up paddleboarding on calm lake waters',
        type: ActivityTypes.OTHER,
        duration: 80,
        date: new Date('2025-05-24T14:30:00Z'),
        time: '14:30'
    },
    {
        id: '25',
        title: 'Recovery Run',
        description: 'Easy-paced recovery run focusing on form',
        type: ActivityTypes.RUN,
        duration: 30,
        date: new Date('2025-05-25T08:00:00Z'),
        time: '08:00'
    },
    {
        id: '26',
        title: 'Neighborhood Stroll',
        description: 'Casual evening walk around the neighborhood',
        type: ActivityTypes.WALK,
        duration: 25,
        date: new Date('2025-05-26T19:30:00Z'),
        time: '19:30'
    },
    {
        id: '27',
        title: 'Sunrise Hike',
        description: 'Early morning hike to catch the sunrise from the summit',
        type: ActivityTypes.HIKE,
        duration: 100,
        date: new Date('2025-05-27T05:30:00Z'),
        time: '05:30'
    },
    {
        id: '28',
        title: 'Gravel Bike Adventure',
        description: 'Off-road cycling adventure on gravel paths',
        type: ActivityTypes.RIDE,
        duration: 85,
        date: new Date('2025-05-28T13:00:00Z'),
        time: '13:00'
    },
    {
        id: '29',
        title: 'Beach Swimming',
        description: 'Open water swimming session at the beach',
        type: ActivityTypes.SWIM,
        duration: 35,
        date: new Date('2025-05-29T16:00:00Z'),
        time: '16:00'
    },
    {
        id: '30',
        title: 'Core & Flexibility',
        description: 'Focused workout on core strength and flexibility',
        type: ActivityTypes.WORKOUT,
        duration: 45,
        date: new Date('2025-05-30T18:00:00Z'),
        time: '18:00'
    },
    {
        id: '31',
        title: 'Memorial Day HIIT',
        description: 'Holiday weekend high-intensity circuit training',
        type: ActivityTypes.HIIT,
        duration: 35,
        date: new Date('2025-05-31T10:00:00Z'),
        time: '10:00'
    }
];

// Default user settings
let userGoal: Goal | null = {
    userId: 'user_1',
    type: 'count',
    target: 3,
    frequency: 'daily',
    weeklyTarget: 21
};

const generateId = () => Math.random().toString(36).substr(2, 9);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const filterActivities = (activities: Activity[], params: GetActivitiesParams) => {
    let filtered = [...activities];

    if (params.types) {
        const parsedTypes = params.types.split(',');
        filtered = filtered.filter((activity) => parsedTypes.includes(activity.type));
    }

    if (params.startDate) {
        const startDate = new Date(params.startDate);
        filtered = filtered.filter((activity) => new Date(activity.date) >= startDate);
    }

    if (params.endDate) {
        const endDate = new Date(params.endDate);
        filtered = filtered.filter((activity) => new Date(activity.date) <= endDate);
    }

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
    http.get('/mock/activities', async ({ request }) => {
        await delay(500);

        const url = new URL(request.url);

        const params: GetActivitiesParams = {
            page: parseInt(url.searchParams.get('page') || '1'),
            limit: parseInt(url.searchParams.get('limit') || '10'),
            types: url.searchParams.get('types') || undefined,

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

        const filtered = filterActivities(activities, params);

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

    http.post('/mock/activities', async ({ request }) => {
        await delay(300);

        const body = (await request.json()) as CreateActivityParams;

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
            duration: +body.duration || 0,
            date: new Date(body.date),
            time: body.time ?? ''
        };

        activities.unshift(newActivity); // Add to beginning
        return HttpResponse.json(newActivity, { status: 201 });
    }),

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

    http.get('/mock/activities-stats', async ({ request }) => {
        await delay(600);

        const url = new URL(request.url);
        const params: GetActivitiesParams = {
            types: (url.searchParams.get('type') as ActivityType) || undefined,
            startDate: url.searchParams.get('startDate')
                ? new Date(url.searchParams.get('startDate')!)
                : undefined,
            endDate: url.searchParams.get('endDate')
                ? new Date(url.searchParams.get('endDate')!)
                : undefined
        };

        const filtered = filterActivities(activities, params);

        const totalActivities = filtered.length;
        const totalDuration = filtered.reduce((sum, activity) => sum + +activity.duration, 0);
        const averageDuration = (totalActivities > 0 ? totalDuration / totalActivities : 0).toFixed(
            2
        );

        const activitiesByType = filtered.reduce(
            (acc, activity) => {
                acc[activity.type] = (acc[activity.type] || 0) + 1;
                return acc;
            },
            {} as Record<string, number>
        );

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

    http.get('/mock/goals/:userId', async () => {
        await delay(300);

        if (!userGoal) {
            return new HttpResponse(
                JSON.stringify({ message: 'Goal not found', code: 'GOAL_NOT_FOUND' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return HttpResponse.json(userGoal);
    }),

    http.post('/mock/goals', async ({ request }) => {
        await delay(400);

        const body = (await request.json()) as CreateGoalParams;

        if (!body.type || !body.target || !body.frequency) {
            return new HttpResponse(
                JSON.stringify({
                    message: 'Goal type, value, and frequency are required',
                    code: 'VALIDATION_ERROR'
                }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        if (body.target <= 0) {
            return new HttpResponse(
                JSON.stringify({
                    message: 'Goal value must be greater than 0',
                    code: 'VALIDATION_ERROR'
                }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        userGoal = {
            type: body.type,
            target: body.target,
            frequency: body.frequency,
            weeklyTarget: body.weeklyTarget
        };

        return HttpResponse.json(userGoal);
    }),

    http.patch('/mock/goals/:userId', async ({ request }) => {
        await delay(300);

        const body = (await request.json()) as UpdateGoalParams;

        if (body.target !== undefined && body.target <= 0) {
            return new HttpResponse(
                JSON.stringify({
                    message: 'Goal value must be greater than 0',
                    code: 'VALIDATION_ERROR'
                }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        userGoal = {
            ...body,
            type: body.type ?? userGoal?.type ?? 'duration',
            target: body.target ?? userGoal?.target ?? 0,
            frequency: body.frequency ?? userGoal?.frequency ?? 'daily'
        };

        return HttpResponse.json(userGoal);
    }),

    http.delete('/mock/goals/:id', async ({ params }) => {
        await delay(200);

        const { id } = params;
        if (userGoal?.id === id) {
            userGoal = null;
        }
        return new HttpResponse(null, { status: 204 });
    })
];
