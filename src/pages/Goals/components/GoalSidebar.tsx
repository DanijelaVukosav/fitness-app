import { type FC } from 'react';
import {
    alpha,
    Box,
    Divider,
    Paper,
    Stack,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import {
    AutoAwesome,
    Delete,
    Edit,
    EmojiEvents,
    Psychology,
    TrendingUp
} from '@mui/icons-material';
import { useUserGoalManager } from '@/pages/Goals/hooks/useUserGoalManager.ts';
import { PrimaryButton } from '@/common/components/PrimaryButton.tsx';
import { SecondaryButton } from '@/common/components/SecondaryButton.tsx';

export const GoalSidebar: FC = () => {
    const { goal, openModal, openDeleteModal } = useUserGoalManager();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));

    return (
        <Box
            sx={{
                width: isMobile || isTablet ? '100%' : 320,
                minHeight: isMobile || isTablet ? 'auto' : '50vh',
                background: `
                        linear-gradient(${isMobile || isTablet ? '90deg' : '180deg'}, 
                            ${alpha('#ffffff', 0.95)} 0%, 
                            ${alpha('#f1f5f9', 0.95)} 100%
                        )
                    `,
                backdropFilter: 'blur(20px)',
                borderRight: isMobile || isTablet ? 'none' : `1px solid ${alpha('#6366f1', 0.1)}`,
                borderBottom: isMobile || isTablet ? `1px solid ${alpha('#6366f1', 0.1)}` : 'none',
                borderRadius: '20px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow:
                    isMobile || isTablet
                        ? `0 2px 8px ${alpha('#000', 0.05)}`
                        : `2px 0 8px ${alpha('#000', 0.05)}`,
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: isMobile || isTablet ? 'auto' : 0,
                    bottom: isMobile || isTablet ? 0 : 'auto',
                    left: 0,
                    width: isMobile || isTablet ? '100%' : 2,
                    height: isMobile || isTablet ? 2 : '100%',
                    background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)'
                }
            }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: isMobile || isTablet ? 'row' : 'column',
                    alignItems: isMobile || isTablet ? 'center' : 'stretch',
                    height: '100%'
                }}>
                {!isMobile && !isTablet && (
                    <Divider sx={{ borderColor: alpha('#6366f1', 0.1), mx: 2 }} />
                )}

                {/* Stats Section */}
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: isMobile || isTablet ? 'row' : 'column',
                        alignItems: isMobile || isTablet ? 'center' : 'stretch',
                        gap: isMobile || isTablet ? 2 : 0
                    }}>
                    {goal ? (
                        <Box
                            sx={{
                                p: isMobile ? 2 : isTablet ? 3 : 4,
                                flex: isMobile || isTablet ? 1 : 'none'
                            }}>
                            {!isMobile && !isTablet && (
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: '#1e293b',
                                        fontWeight: 700,
                                        mb: 3,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}>
                                    <TrendingUp sx={{ color: '#6366f1' }} />
                                    Increase Performance
                                </Typography>
                            )}

                            <Stack
                                spacing={isMobile ? 1 : 2}
                                direction={isMobile || isTablet ? 'row' : 'column'}
                                sx={{ width: '100%' }}>
                                {!isMobile && !isTablet && (
                                    <Paper
                                        sx={{
                                            p: 3,
                                            background: alpha('#06b6d4', 0.05),
                                            border: `1px solid ${alpha('#06b6d4', 0.1)}`,
                                            borderRadius: 3
                                        }}>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: alpha('#1e293b', 0.7),
                                                mb: 1,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.1em'
                                            }}>
                                            Stay consistent with your daily routine. Every small
                                            step contributes to your long-term success.
                                        </Typography>
                                    </Paper>
                                )}

                                <Paper
                                    sx={{
                                        p: isMobile ? 2 : 3,
                                        background: `
                                                linear-gradient(135deg, 
                                                    ${alpha('#6366f1', 0.05)} 0%, 
                                                    ${alpha('#8b5cf6', 0.05)} 100%
                                                )
                                            `,
                                        border: `1px solid ${alpha('#6366f1', 0.1)}`,
                                        borderRadius: 3,
                                        textAlign: 'center',
                                        flex: isMobile || isTablet ? 1 : 'none'
                                    }}>
                                    <EmojiEvents
                                        sx={{
                                            fontSize: isMobile ? 24 : 32,
                                            color: '#f59e0b',
                                            mb: 1
                                        }}
                                    />
                                    <Typography
                                        variant={isMobile ? 'h4' : 'h3'}
                                        sx={{
                                            fontWeight: 800,
                                            color: '#1e293b',
                                            mb: 0.5
                                        }}>
                                        {goal.target}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: alpha('#1e293b', 0.7),
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.1em'
                                        }}>
                                        {goal.type === 'count' ? 'activities' : 'minutes'}
                                        &nbsp; daily
                                    </Typography>
                                </Paper>
                            </Stack>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                p: isMobile ? 2 : isTablet ? 3 : 4,
                                textAlign: 'center',
                                flex: isMobile || isTablet ? 1 : 'none'
                            }}>
                            <Psychology
                                sx={{
                                    fontSize: isMobile ? 32 : 48,
                                    color: alpha('#1e293b', 0.3),
                                    mb: isMobile ? 1 : 2
                                }}
                            />
                            <Typography
                                variant={isMobile ? 'body2' : 'body1'}
                                sx={{
                                    color: alpha('#1e293b', 0.6),
                                    lineHeight: 1.6
                                }}>
                                {isMobile
                                    ? 'Create your first goal to start tracking progress.'
                                    : 'Create your first goal to start tracking your progress and building streaks.'}
                            </Typography>
                        </Box>
                    )}

                    <Box
                        sx={{
                            p: { xs: 2, sm: 3, md: 4 },
                            display: 'flex',
                            flexDirection: 'column',
                            gap: { xs: 2, md: 3 },
                            alignItems: { xs: 'stretch', md: 'center' },
                            justifyContent: 'center'
                        }}>
                        <PrimaryButton
                            onClick={() => openModal()}
                            startIcon={goal ? <Edit /> : <AutoAwesome />}
                            sx={{ paddingY: 1, paddingX: 3 }}>
                            {goal ? 'Edit Goal' : 'Create Goal'}
                        </PrimaryButton>

                        {goal && (
                            <SecondaryButton
                                startIcon={<Delete />}
                                onClick={() => openDeleteModal()}>
                                Reset Goal
                            </SecondaryButton>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
