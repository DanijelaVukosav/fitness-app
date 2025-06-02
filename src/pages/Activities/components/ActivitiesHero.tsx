import React, { useCallback } from 'react';
import { PageHero } from '@/common/components/PageHero.tsx';
import { Box } from '@mui/material';
import { Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { APPLICATION_ROUTES } from '@/common/router/types.ts';
import { PrimaryButton } from '@/common/components/PrimaryButton.tsx';

export const ActivitiesHero: React.FC = () => {
    const navigate = useNavigate();

    const handleGoalsRedirect = useCallback(() => {
        navigate(APPLICATION_ROUTES.GOALS);
    }, [navigate]);

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
                    width: '100%',
                    textAlign: { xs: 'center', lg: 'right' },
                    flexShrink: 0,
                    display: { xs: 'flex', md: 'block' },
                    justifyContent: { xs: 'center', md: 'flex-end' }
                }}>
                <PrimaryButton
                    onClick={handleGoalsRedirect}
                    startIcon={<Target size={18} />}
                    sx={{ paddingY: 1, paddingX: 3 }}>
                    Performance Goals
                </PrimaryButton>
            </Box>
        </PageHero>
    );
};
