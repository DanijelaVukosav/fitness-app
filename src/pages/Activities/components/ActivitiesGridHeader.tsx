// components/ActivitiesGrid.tsx (Updated)
import { Box, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useActivities } from '@/pages/Activities/hooks/useActivities.ts';
import { useActivitiesContext } from '@/pages/Activities/services/ActivitiesContext.tsx';
import { PrimaryButton } from '@/common/components/PrimaryButton.tsx';

interface ActivitiesGridProps {
    currentPage?: number;
    onAddActivity?: () => void; // New prop for handling add activity click
}

export const ActivitiesGridHeader: React.FC<ActivitiesGridProps> = ({
    currentPage = 1,
    onAddActivity
}) => {
    const { filters } = useActivitiesContext();
    const { data } = useActivities(filters);

    const handleAddActivity = () => {
        if (onAddActivity) {
            onAddActivity();
        } else {
            // Default behavior - you can customize this
            console.log('Add new fitness activity');
        }
    };

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
            {/* Add Activity Button - Left Side */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PrimaryButton
                    onClick={handleAddActivity}
                    label="Add Activity"
                    icon={<AddIcon />}
                />
            </Box>

            {/* Pagination Info - Right Side */}
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
