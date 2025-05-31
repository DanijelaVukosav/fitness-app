import { useCallback } from 'react';
import { useUserGoalContext } from '@/pages/Goals/services/GoalContext.tsx';

export const useUserGoalUI = () => {
    const {
        isModalOpen,
        setIsModalOpen,

        isDeleteModalOpen,
        setIsDeleteModalOpen
    } = useUserGoalContext();

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
        isModalOpen,
        openModal,
        closeModal,

        isDeleteModalOpen,
        openDeleteModal,
        closeDeleteModal
    };
};
