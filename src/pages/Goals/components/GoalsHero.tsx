// pages/ActivitiesPage.tsx
import React from 'react';
import { Box, Button } from '@mui/material';
import { PageHero } from '@/common/components/PageHero.tsx';
import { useNavigate } from 'react-router-dom';
import { APPLICATION_ROUTES } from '@/common/router/types.ts';

export const GoalHero: React.FC = () => {
    const navigate = useNavigate();
    const handleActivitiesRedirect = () => {
        navigate(APPLICATION_ROUTES.ACTIVITIES);
    };

    return (
        <PageHero
            title={'Transform Your Fitness Story'}
            description={
                <React.Fragment>
                    Track progress, smash goals, and unlock your potential with
                    <Box component="span" sx={{ color: '#0a78ab0', fontWeight: 500 }}>
                        {' '}
                        intelligent{' '}
                    </Box>
                    fitness insights
                </React.Fragment>
            }>
            <Box
                sx={{
                    width: '100%',
                    textAlign: { xs: 'center', lg: 'right' },
                    flexShrink: 0,
                    display: { xs: 'flex', md: 'block' },
                    justifyContent: { xs: 'center', md: 'flex-end' }
                }}>
                <Button
                    onClick={handleActivitiesRedirect}
                    variant="outlined"
                    size="large"
                    sx={{
                        px: 3,
                        py: 1.2,
                        fontSize: '1rem',
                        fontWeight: 500,
                        borderRadius: '50px',
                        borderColor: '#A020F0',
                        color: '#A020F0',
                        textTransform: 'none',
                        minWidth: { xs: '140px', md: '160px' },
                        backdropFilter: 'blur(10px)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            borderColor: '#0a78ab0',
                            color: '#0a78ab0',
                            background: 'rgba(10, 120, 171, 0.08)',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 6px 20px rgba(10, 120, 171, 0.15)'
                        }
                    }}>
                    Explore Activities
                </Button>
            </Box>
        </PageHero>
    );
};
