import React, { type FC } from 'react';
import { useUserGoalManager } from '@/pages/Goals/hooks/useUserGoalManager.ts';
import { GoalDeleteModal } from '@/pages/Goals/components/DeleteConfirmationDialog.tsx';
import { GoalModal } from '@/pages/Goals/components/GoalModal.tsx';

export const GoalModals: FC = () => {
    const {
        goal,
        isModalOpen,
        closeModal,
        isDeleteModalOpen,
        deleteGoal,
        submitGoal,
        closeDeleteModal,

        isDeleting
    } = useUserGoalManager();

    return (
        <React.Fragment>
            <GoalModal goal={goal} open={isModalOpen} onClose={closeModal} onSubmit={submitGoal} />

            <GoalDeleteModal
                open={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={deleteGoal}
                isDeleting={isDeleting}
            />
        </React.Fragment>
    );
};
