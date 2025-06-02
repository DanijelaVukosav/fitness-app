export const USER_ID = 'user_1';

export interface Goal {
    id?: string;
    type: 'count' | 'duration';
    target: number;
    userId?: string;
}

export interface CreateGoalParams {
    userId: string;
    type: 'count' | 'duration';
    target: number;
}

export type UpdateGoalParams = Partial<CreateGoalParams>;
