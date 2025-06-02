import { alpha, Avatar, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Psychology } from '@mui/icons-material';
import { type FC } from 'react';

export const GoalEmptyState: FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center'
            }}>
            <Box>
                <Avatar
                    sx={{
                        width: isMobile ? 80 : isTablet ? 100 : 120,
                        height: isMobile ? 80 : isTablet ? 100 : 120,
                        margin: '0 auto 2rem auto',
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        boxShadow: `0 16px 48px ${alpha('#6366f1', 0.2)}`
                    }}>
                    <Psychology sx={{ fontSize: isMobile ? 40 : isTablet ? 50 : 60 }} />
                </Avatar>

                <Typography
                    variant={isMobile ? 'h4' : isTablet ? 'h3' : 'h3'}
                    sx={{
                        fontWeight: 700,
                        color: '#1e293b',
                        mb: 2
                    }}>
                    Ready to Begin?
                </Typography>

                <Typography
                    variant={isMobile ? 'body1' : 'h6'}
                    sx={{
                        color: alpha('#1e293b', 0.7),
                        maxWidth: isMobile ? 300 : 500,
                        mx: 'auto',
                        lineHeight: 1.6,
                        px: isMobile ? 2 : 0
                    }}>
                    {isMobile
                        ? 'Start your journey by creating your first goal. Track progress and achieve excellence.'
                        : 'Start your transformation journey by creating your first goal. Track progress, build streaks, and achieve excellence.'}
                </Typography>
            </Box>
        </Box>
    );
};
