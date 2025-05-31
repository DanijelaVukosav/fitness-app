import {
    type GetActivitiesParams,
    useActivitiesContext
} from '@/pages/Activities/services/ActivitiesContext.tsx';
import { defaultActivitiesFilters } from '@/pages/Activities/services/types.ts';

export const useActivitiesFilters = () => {
    const { filters, updateFilter, clearFilters } = useActivitiesContext();

    // Derived state
    const hasActiveFilters = Object.keys(filters).some((key) => {
        const value = filters[key as keyof GetActivitiesParams];
        const defaultValue = defaultActivitiesFilters[key as keyof GetActivitiesParams];
        return value !== defaultValue && value !== undefined && value !== null && value !== '';
    });

    return {
        filters,
        updateFilter,
        clearFilters,
        hasActiveFilters
    };
};
