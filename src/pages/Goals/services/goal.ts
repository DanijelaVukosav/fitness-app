export const USER_ID = 'user_1';

export interface Goal {
    id?: string;
    type: 'count' | 'duration';
    target: number;
    frequency: 'daily' | 'weekly';
    weeklyTarget?: number;
    userId?: string;
}

export interface CreateGoalParams {
    userId: string;
    type: 'count' | 'duration';
    target: number;
    frequency: 'daily' | 'weekly';
    weeklyTarget?: number;
}

export type UpdateGoalParams = Partial<CreateGoalParams>;
