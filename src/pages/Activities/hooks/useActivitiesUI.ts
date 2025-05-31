import { useCallback } from 'react';
import { useActivitiesContext } from '@/pages/Activities/services/ActivitiesContext.tsx';

export const useActivitiesUI = () => {
    const {
        viewMode,
        setViewMode,
        isModalOpen,
        setIsModalOpen,
        editingActivity,
        setEditingActivity,

        isDeleteModalOpen,
        setIsDeleteModalOpen,
        deletingActivity,
        setDeletingActivity
    } = useActivitiesContext();

    const openModal = useCallback(() => {
        setIsModalOpen(true);
    }, [setIsModalOpen]);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, [setIsModalOpen]);

    const openDeleteModal = useCallback(() => {
        setIsDeleteModalOpen(true);
    }, [setIsDeleteModalOpen]);

    const closeDeleteModal = useCallback(() => {
        setIsDeleteModalOpen(false);
    }, [setIsDeleteModalOpen]);

    return {
        viewMode,
        setViewMode,
        isModalOpen,
        openModal,
        closeModal,
        editingActivity,
        setEditingActivity,

        isDeleteModalOpen,
        openDeleteModal,
        closeDeleteModal,
        deletingActivity,
        setDeletingActivity
    };
};
