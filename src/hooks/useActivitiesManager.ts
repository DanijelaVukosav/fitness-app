import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { useCreateActivity, useDeleteActivity, useUpdateActivity } from '@/hooks/useActivities';
import type { CreateActivityParams, UpdateActivityParams } from '@/context/ActivitiesContext';
import { useActivitiesContext } from '@/context/ActivitiesContext';
import { useActivitiesUI } from '@/hooks/useActivitiesUI';
import type { Activity } from '@/context/types.ts';

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

    handleActivityClick: (activity: Activity) => void;
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
        console.log('set null', selectedEditActivity);
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

    const handleActivityClick = useCallback((activity: Activity) => {
        console.log('Activity clicked:', activity);
    }, []);

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

        handleActivityClick,
        handleEditActivity,
        handleDeleteActivity,

        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,

        refreshActivities
    };
};
