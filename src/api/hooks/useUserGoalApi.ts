// hooks/useUserGoalApi.ts
import { useCallback } from 'react';
import { httpClient } from '@/api/common/httpClinet.ts';
import type { CreateGoalParams, Goal, UpdateGoalParams } from '@/api/types/goal.ts';

const BASE_URL = '/goals';

export const useUserGoalApi = () => {
    const getUserGoal = useCallback(
        (userId: string): Promise<Goal> => httpClient.get<Goal>(`${BASE_URL}/${userId}`),
        []
    );

    const createUserGoal = useCallback(
        (params: CreateGoalParams): Promise<Goal> =>
            httpClient.post<CreateGoalParams, Goal>(BASE_URL, params),
        []
    );

    const updateUserGoal = useCallback(
        (params: UpdateGoalParams): Promise<Goal> =>
            httpClient.patch<UpdateGoalParams, Goal>(`${BASE_URL}/${params.userId}`, params),
        []
    );

    const resetUserGoal = useCallback(
        (userId: string): Promise<Goal> => httpClient.delete<Goal>(`${BASE_URL}/${userId}`),
        []
    );

    return {
        getUserGoal,
        createUserGoal,
        updateUserGoal,
        resetUserGoal
    };
};
