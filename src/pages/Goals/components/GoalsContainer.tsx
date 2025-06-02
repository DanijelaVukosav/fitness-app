import React, { type FC } from 'react';
import { alpha, Box, useMediaQuery, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useUserGoalManager } from '@/pages/Goals/hooks/useUserGoalManager.ts';
import { GoalModals } from '@/pages/Goals/components/GoalModals.tsx';
import { CalendarComponent } from '@/pages/Goals/components/CalendarComponent.tsx';
import { PageContainer } from '@/common/components/PageContainer.tsx';
import { GoalHero } from '@/pages/Goals/components/GoalsHero.tsx';
import { GoalEmptyState } from '@/pages/Goals/components/GoalEmptyState.tsx';
import { GoalSidebar } from '@/pages/Goals/components/GoalSidebar.tsx';

export const GoalsContainer: FC = () => {
    const { goal } = useUserGoalManager();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));

    return (
        <PageContainer>
            <React.Fragment>
                <GoalHero />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile || isTablet ? 'column' : 'row',
                        marginTop: isMobile ? 2 : 0,
                        background: '#f8fafc',
                        borderRadius: '20px'
                    }}>
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `
                        radial-gradient(circle at 25% 25%, ${alpha('#6366f1', 0.05)} 0%, transparent 50%),
                        radial-gradient(circle at 75% 75%, ${alpha('#8b5cf6', 0.05)} 0%, transparent 50%),
                        radial-gradient(circle at 50% 50%, ${alpha('#06b6d4', 0.03)} 0%, transparent 50%)
                    `,
                            zIndex: -1
                        }}
                    />

                    <GoalSidebar />

                    <Box
                        sx={{
                            flex: 1,
                            p: isMobile ? 2 : isTablet ? 3 : 4,
                            minHeight: isMobile || isTablet ? '60vh' : 'auto'
                        }}>
                        {!goal ? (
                            <GoalEmptyState />
                        ) : (
                            <Grid size={{ xs: 12, lg: 6 }} style={{ alignContent: 'center' }}>
                                <CalendarComponent />
                            </Grid>
                        )}
                    </Box>

                    <GoalModals />
                </Box>
            </React.Fragment>
        </PageContainer>
    );
};
