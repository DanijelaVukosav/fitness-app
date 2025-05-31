// components/ActivitiesGrid.tsx (Updated)
import { Box, Typography } from '@mui/material';
import { useActivities } from '@/pages/Activities/hooks/useActivities.ts';
import { useActivitiesContext } from '@/pages/Activities/services/ActivitiesContext.tsx';

interface ActivitiesGridProps {
    itemsPerPage?: number;
    currentPage?: number;
    showAddCard: boolean;
}

export const ActivitiesGridHeader: React.FC<ActivitiesGridProps> = ({
    itemsPerPage = 8,
    currentPage = 1,
    showAddCard = true
}) => {
    const { filters } = useActivitiesContext();

    const { data } = useActivities(filters);

    // Calculate items per page accounting for add card
    const effectiveItemsPerPage = showAddCard ? itemsPerPage - 1 : itemsPerPage;

    const totalPages = Math.ceil((data?.activities?.length ?? 0) / effectiveItemsPerPage);

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
                gap: 2,
                py: 3
            }}>
            <Typography
                variant="body2"
                sx={{
                    color: 'rgba(0, 0, 0, 0.6)',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}>
                <Box
                    component="span"
                    sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: '#10b981',
                        display: 'inline-block'
                    }}
                />
                Page {currentPage} of {totalPages}
            </Typography>
        </Box>
    );
};
