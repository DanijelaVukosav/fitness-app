import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { useUserGoalUI } from '@/hooks/useUserGoalUI';
import { useUserGoalContext } from '@/context/GoalContext.tsx';
import { useCreateUserGoal, useResetUserGoal, useUpdateUserGoal } from '@/hooks/useUserSettings.ts';
import {
    type CreateGoalParams,
    type Goal,
    type UpdateGoalParams,
    USER_ID
} from '@/api/types/goal.ts';

export interface UseUserGoalManagerReturn {
    goal?: Goal;
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    submitGoal: (data: CreateGoalParams | UpdateGoalParams) => Promise<void>;

    deleteGoal: () => void;
    isDeleteModalOpen: boolean;
    openDeleteModal: () => void;
    closeDeleteModal: () => void;

    isCreating: boolean;
    isUpdating: boolean;
    isDeleting: boolean;

    refreshUserGoal: () => void;
}

export const useUserGoalManager = (): UseUserGoalManagerReturn => {
    const { enqueueSnackbar } = useSnackbar();
    const { goal, invalidateGoal } = useUserGoalContext();

    const {
        isModalOpen,
        openModal,
        closeModal,

        isDeleteModalOpen,
        openDeleteModal,
        closeDeleteModal
    } = useUserGoalUI();

    const createMutation = useCreateUserGoal();
    const updateMutation = useUpdateUserGoal();
    const deleteMutation = useResetUserGoal();

    const submitGoal = useCallback(
        async (data: CreateGoalParams | UpdateGoalParams) => {
            try {
                if (goal) {
                    await updateMutation.mutateAsync({ ...(data as UpdateGoalParams) });
                    enqueueSnackbar('Goal updated successfully!', { variant: 'success' });
                } else {
                    await createMutation.mutateAsync(data as CreateGoalParams);
                    enqueueSnackbar('Goal created successfully!', { variant: 'success' });
                }
                closeModal();
            } catch (error) {
                enqueueSnackbar(goal ? 'Failed to update activity' : 'Failed to create activity', {
                    variant: 'error'
                });
                throw error;
            }
        },
        [goal, updateMutation, createMutation, enqueueSnackbar, closeModal]
    );

    const deleteGoal = useCallback(async () => {
        try {
            await deleteMutation.mutateAsync(USER_ID);
            enqueueSnackbar('Activity deleted successfully!', { variant: 'success' });
            closeDeleteModal();
        } catch (error) {
            enqueueSnackbar('Failed to delete activity', { variant: 'error' });
            throw error;
        }
    }, [deleteMutation, enqueueSnackbar, closeDeleteModal]);

    const refreshUserGoal = useCallback(() => {
        invalidateGoal();
    }, [invalidateGoal]);

    return {
        goal,
        isModalOpen,
        openModal,
        closeModal,
        submitGoal,

        isDeleteModalOpen,
        closeDeleteModal,
        openDeleteModal,
        deleteGoal,

        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,

        refreshUserGoal
    };
};
