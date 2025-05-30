// pages/ActivitiesPage.tsx
import React from 'react';
import { Box, Fade, Typography } from '@mui/material';

export const ActivitiesHero: React.FC = () => {
    return (
        <Fade in timeout={600}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 900,
                        fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                        lineHeight: 0.9,
                        mb: 3,
                        background:
                            'linear-gradient(135deg, #00FF88 0%, #A020F0 50%, #00FF88 100%)',
                        backgroundSize: '200% 100%',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'gradientShift 4s ease-in-out infinite',
                        letterSpacing: '-2px',
                        '@keyframes gradientShift': {
                            '0%': { backgroundPosition: '0% 50%' },
                            '50%': { backgroundPosition: '100% 50%' },
                            '100%': { backgroundPosition: '0% 50%' }
                        }
                    }}>
                    Your Fitness Journey
                </Typography>
            </Box>
        </Fade>
    );
};
