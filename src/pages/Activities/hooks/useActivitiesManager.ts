import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import {
    useCreateActivity,
    useDeleteActivity,
    useUpdateActivity
} from '@/pages/Activities/hooks/useActivities.ts';
import type {
    CreateActivityParams,
    UpdateActivityParams
} from '@/pages/Activities/services/ActivitiesContext.tsx';
import { useActivitiesContext } from '@/pages/Activities/services/ActivitiesContext.tsx';
import { useActivitiesUI } from '@/pages/Activities/hooks/useActivitiesUI.ts';
import type { Activity } from '@/pages/Activities/services/types.ts';

export interface UseActivitiesManagerReturn {
    selectedEditActivity: Activity | null;
    deletingActivity: Activity | null;

    isModalOpen: boolean;
    openModal: () => void;
    resetAndCloseModal: () => void;
    submitActivity: (data: CreateActivityParams | UpdateActivityParams) => Promise<void>;

    isDeleteModalOpen: boolean;
    resetAndCloseDeleteModal: () => void;
    deleteActivity: (activityId: string) => Promise<void>;

    handleEditActivity: (activity: Activity) => void;
    handleDeleteActivity: (activity: Activity) => void;

    isCreating: boolean;
    isUpdating: boolean;
    isDeleting: boolean;

    refreshActivities: () => void;
}

export const useActivitiesManager = (): UseActivitiesManagerReturn => {
    const { enqueueSnackbar } = useSnackbar();
    const { invalidateActivities } = useActivitiesContext();

    const {
        isModalOpen,
        openModal,
        closeModal,

        editingActivity: selectedEditActivity,
        setEditingActivity,

        isDeleteModalOpen,
        openDeleteModal,
        closeDeleteModal,
        deletingActivity,
        setDeletingActivity
    } = useActivitiesUI();

    const createMutation = useCreateActivity();
    const updateMutation = useUpdateActivity();
    const deleteMutation = useDeleteActivity();

    const submitActivity = useCallback(
        async (data: CreateActivityParams | UpdateActivityParams) => {
            try {
                if (selectedEditActivity) {
                    await updateMutation.mutateAsync({ ...(data as UpdateActivityParams) });
                    enqueueSnackbar('Activity updated successfully!', { variant: 'success' });
                } else {
                    await createMutation.mutateAsync(data as CreateActivityParams);
                    enqueueSnackbar('Activity created successfully!', { variant: 'success' });
                }
                closeModal();
            } catch (error) {
                enqueueSnackbar(
                    selectedEditActivity
                        ? 'Failed to update activity'
                        : 'Failed to create activity',
                    { variant: 'error' }
                );
                throw error;
            }
        },
        [selectedEditActivity, updateMutation, createMutation, enqueueSnackbar, closeModal]
    );

    const resetAndCloseModal = useCallback(() => {
        setEditingActivity(null);
        closeModal();
    }, [closeModal, setEditingActivity]);

    const resetAndCloseDeleteModal = useCallback(() => {
        setDeletingActivity(null);
        closeDeleteModal();
    }, [closeDeleteModal, setDeletingActivity]);

    const deleteActivity = useCallback(
        async (activityId: string) => {
            try {
                await deleteMutation.mutateAsync(activityId);
                enqueueSnackbar('Activity deleted successfully!', { variant: 'success' });
                resetAndCloseDeleteModal();
            } catch (error) {
                enqueueSnackbar('Failed to delete activity', { variant: 'error' });
                throw error;
            }
        },
        [deleteMutation, enqueueSnackbar, resetAndCloseDeleteModal]
    );

    const handleEditActivity = useCallback(
        (activity: Activity) => {
            setEditingActivity(activity);
            openModal();
        },
        [openModal, setEditingActivity]
    );

    const handleDeleteActivity = useCallback(
        (activity: Activity) => {
            setDeletingActivity(activity);
            openDeleteModal();
        },
        [openDeleteModal, setDeletingActivity]
    );

    const refreshActivities = useCallback(() => {
        invalidateActivities();
    }, [invalidateActivities]);

    return {
        selectedEditActivity,
        deletingActivity,

        isModalOpen,
        openModal,
        resetAndCloseModal,
        submitActivity,

        isDeleteModalOpen,
        resetAndCloseDeleteModal,
        deleteActivity,

        handleEditActivity,
        handleDeleteActivity,

        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,

        refreshActivities
    };
};
