// pages/ActivitiesPage.tsx
import React, { useCallback } from 'react';
import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { FitnessCenter, Menu as MenuIcon, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { APPLICATION_ROUTES } from '@/router/types.ts';

export const AppHeader: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const onSettingsClick = useCallback(() => {
        navigate(APPLICATION_ROUTES.SETTINGS);
    }, [navigate]);

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                zIndex: theme.zIndex.appBar
            }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {isMobile && (
                        <IconButton edge="start" sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <FitnessCenter
                        sx={{
                            fontSize: 32,
                            background: 'linear-gradient(135deg, #00FF88 0%, #A020F0 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            mr: 2
                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #00FF88 0%, #A020F0 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            letterSpacing: '-0.5px'
                        }}>
                        FitTracker Pro
                    </Typography>
                </Box>
                <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    onClick={onSettingsClick}>
                    <IconButton
                        sx={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            '&:hover': {
                                color: '#A020F0',
                                background: 'rgba(160, 32, 240, 0.1)'
                            }
                        }}>
                        <Settings />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
