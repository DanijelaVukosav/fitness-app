import { useCallback } from 'react';
import { useActivitiesContext } from '@/context/ActivitiesContext.tsx';

export const useActivitiesSelection = () => {
    const {
        selectedActivities,
        setSelectedActivities,
        toggleActivitySelection,
        selectAllActivities,
        clearSelection
    } = useActivitiesContext();

    const hasSelection = selectedActivities.length > 0;
    const selectionCount = selectedActivities.length;

    const isSelected = useCallback(
        (id: string) => {
            return selectedActivities.includes(id);
        },
        [selectedActivities]
    );

    const isAllSelected = useCallback(
        (activityIds: string[]) => {
            return (
                activityIds.length > 0 && activityIds.every((id) => selectedActivities.includes(id))
            );
        },
        [selectedActivities]
    );

    const isPartiallySelected = useCallback(
        (activityIds: string[]) => {
            const selectedCount = activityIds.filter((id) =>
                selectedActivities.includes(id)
            ).length;
            return selectedCount > 0 && selectedCount < activityIds.length;
        },
        [selectedActivities]
    );

    return {
        selectedActivities,
        setSelectedActivities,
        toggleActivitySelection,
        selectAllActivities,
        clearSelection,
        hasSelection,
        selectionCount,
        isSelected,
        isAllSelected,
        isPartiallySelected
    };
};