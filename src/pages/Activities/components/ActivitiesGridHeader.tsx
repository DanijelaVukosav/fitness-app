import { Box, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useActivities } from '@/pages/Activities/hooks/useActivities.ts';
import { useActivitiesContext } from '@/pages/Activities/services/ActivitiesContext.tsx';
import { PrimaryButton } from '@/common/components/PrimaryButton.tsx';
import { type FC } from 'react';

interface ActivitiesGridProps {
    currentPage?: number;
    onAddActivity?: () => void;
}

export const ActivitiesGridHeader: FC<ActivitiesGridProps> = ({
    currentPage = 1,
    onAddActivity
}) => {
    const { filters } = useActivitiesContext();
    const { data } = useActivities(filters);

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 2,
                py: 3
            }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PrimaryButton onClick={onAddActivity} startIcon={<AddIcon />} sx={{ paddingX: 3 }}>
                    Add Activity
                </PrimaryButton>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                    Page {currentPage} of {data?.totalPages}
                </Typography>
            </Box>
        </Box>
    );
};
