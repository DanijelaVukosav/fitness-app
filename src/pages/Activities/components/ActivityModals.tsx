// pages/ActivitiesPage.tsx
import React from 'react';
import { AddActivityModal } from '@/pages/Activities/components/AddActivityModal.tsx';
import { DeleteConfirmationDialog } from '@/pages/Activities/components/DeleteConfirmationDialog.tsx';
import { useActivitiesManager } from '@/pages/Activities/hooks/useActivitiesManager.ts';

export const ActivityModals: React.FC = () => {
    const {
        selectedEditActivity,
        isModalOpen,
        resetAndCloseModal,
        isDeleteModalOpen,
        deletingActivity,
        submitActivity,
        resetAndCloseDeleteModal,
        deleteActivity,
        isDeleting
    } = useActivitiesManager();

    return (
        <React.Fragment>
            <AddActivityModal
                activity={selectedEditActivity}
                open={isModalOpen}
                onClose={resetAndCloseModal}
                onSubmit={submitActivity}
            />

            <DeleteConfirmationDialog
                open={isDeleteModalOpen}
                activity={deletingActivity}
                onClose={resetAndCloseDeleteModal}
                onConfirm={deleteActivity}
                isDeleting={isDeleting}
            />
        </React.Fragment>
    );
};
