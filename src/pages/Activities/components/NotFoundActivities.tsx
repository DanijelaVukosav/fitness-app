import { Box, Fade, Typography } from '@mui/material';
import { AddActivityCard } from '@/pages/Activities/components/AddActivityCard.tsx';
import type { FC } from 'react';
import { useActivitiesManager } from '@/pages/Activities/hooks/useActivitiesManager.ts';

export const NotFoundActivities: FC = () => {
    const { openModal } = useActivitiesManager();
    return (
        <Fade in timeout={800}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 8,
                    textAlign: 'center'
                }}>
                <Box
                    sx={{
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        background:
                            'linear-gradient(135deg, rgba(10, 120, 171, 0.1) 0%, rgba(160, 32, 240, 0.1) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        border: '2px solid rgba(10, 120, 171, 0.2)'
                    }}>
                    <Typography
                        variant="h3"
                        sx={{
                            background: 'linear-gradient(135deg, #0A78AB 0%, #A020F0 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 800
                        }}>
                        🏃‍♂️
                    </Typography>
                </Box>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        color: 'rgba(0, 0, 0, 0.8)',
                        mb: 1
                    }}>
                    No Activities Found
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: 'rgba(0, 0, 0, 0.6)',
                        maxWidth: 400,
                        mb: 3
                    }}>
                    Try adjusting your filters or search terms to find more activities.
                </Typography>
                <Box sx={{ maxWidth: 300 }}>
                    <AddActivityCard onClick={openModal} />
                </Box>
            </Box>
        </Fade>
    );
};
