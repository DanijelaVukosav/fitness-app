import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useUserGoalApi } from '@/pages/Goals/services/useUserGoalApi.ts';
import { USER_ID } from '@/pages/Goals/services/goal.ts';

export const userGoalKeys = {
    all: ['userGoal'] as const,
    goal: () => [...userGoalKeys.all, 'goal'] as const
};

export const useUserGoal = (userId: string = USER_ID) => {
    const { getUserGoal } = useUserGoalApi();

    return useQuery({
        queryKey: userGoalKeys.goal(),
        queryFn: () => getUserGoal(userId),
        staleTime: 10 * 60 * 1000,
        placeholderData: (prev) => prev
    });
};

export const useCreateUserGoal = () => {
    const queryClient = useQueryClient();
    const { createUserGoal } = useUserGoalApi();

    return useMutation({
        mutationFn: createUserGoal,
        onSuccess: (updatedGoal) => {
            queryClient.setQueryData(userGoalKeys.goal(), updatedGoal);
        },
        onError: (error) => console.error('Failed to create user settings:', error)
    });
};

export const useUpdateUserGoal = () => {
    const queryClient = useQueryClient();
    const { updateUserGoal } = useUserGoalApi();

    return useMutation({
        mutationFn: updateUserGoal,
        onSuccess: (updatedGoal) => {
            queryClient.setQueryData(userGoalKeys.goal(), updatedGoal);
        },
        onError: (error) => console.error('Failed to update user settings:', error)
    });
};

export const useResetUserGoal = () => {
    const queryClient = useQueryClient();
    const { resetUserGoal } = useUserGoalApi();

    return useMutation({
        mutationFn: resetUserGoal,
        onSuccess: (resetGoal) => {
            queryClient.setQueryData(userGoalKeys.goal(), resetGoal);
        },
        onError: (error) => console.error('Failed to reset user settings:', error)
    });
};
