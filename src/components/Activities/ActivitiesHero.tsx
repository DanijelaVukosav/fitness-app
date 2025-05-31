// pages/ActivitiesPage.tsx
import React from 'react';
import { PageHero } from '@/components/common/PageHero.tsx';
import { Box, Button } from '@mui/material';
import { Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { APPLICATION_ROUTES } from '@/router/types.ts';

export const ActivitiesHero: React.FC = () => {
    const navigate = useNavigate();
    const handleGoalsRedirect = () => {
        navigate(APPLICATION_ROUTES.SETTINGS);
    };

    return (
        <PageHero
            title={'Transform Your Fitness Story'}
            description={
                <React.Fragment>
                    Track progress, smash goals, and unlock your potential with
                    <Box component="span" sx={{ color: '#0A78AB', fontWeight: 500 }}>
                        {' '}
                        intelligent{' '}
                    </Box>
                    fitness insights
                </React.Fragment>
            }>
            <Box
                sx={{
                    flexShrink: 0,
                    display: { xs: 'flex', md: 'block' },
                    justifyContent: { xs: 'center', md: 'flex-end' }
                }}>
                <Button
                    onClick={handleGoalsRedirect}
                    size="large"
                    sx={{
                        px: 3,
                        py: 1.2,
                        fontSize: '1rem',
                        fontWeight: 600,
                        borderRadius: '50px',
                        background: 'linear-gradient(135deg, #0A78AB 0%, #A020F0 100%)',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                        textTransform: 'none',
                        boxShadow: '0 6px 24px rgba(10, 120, 171, 0.25)',
                        transition: 'all 0.3s ease',
                        minWidth: { xs: '140px', md: '160px' },
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: '-100%',
                            width: '100%',
                            height: '100%',
                            background:
                                'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                            transition: 'left 0.5s'
                        },
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 32px rgba(10, 120, 171, 0.35)',
                            '&::before': {
                                left: '100%'
                            }
                        }
                    }}
                    startIcon={<Target size={18} />}>
                    Set Goals
                </Button>
            </Box>
        </PageHero>
    );
};
