import React, { type ReactElement } from 'react';
import { Box, Fade, Stack, Typography } from '@mui/material';
import { TrendingUp, Zap } from 'lucide-react';

interface PageHeroProps {
    title: string;
    description: string | React.ReactNode;
    children?: ReactElement;
}

export const PageHero: React.FC<PageHeroProps> = ({ title, description, children }) => {
    return (
        <Box
            sx={{
                position: 'relative',
                py: { xs: 3, md: 8 },
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                        'radial-gradient(ellipse at center, rgba(160, 32, 240, 0.08) 0%, rgba(10, 120, 171, 0.03) 50%, transparent 100%)',
                    animation: 'pulse 6s ease-in-out infinite',
                    '@keyframes pulse': {
                        '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
                        '50%': { opacity: 0.8, transform: 'scale(1.05)' }
                    }
                }
            }}>
            <Fade in timeout={800}>
                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 2,
                        mx: 'auto',
                        px: { xs: 2, md: 3 }
                    }}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: { xs: -10, md: -20 },
                            left: { xs: 10, md: 50 },
                            animation: 'float 3s ease-in-out infinite',
                            '@keyframes float': {
                                '0%, 100%': { transform: 'translateY(0px)' },
                                '50%': { transform: 'translateY(-8px)' }
                            }
                        }}>
                        <TrendingUp size={24} color="#0A78AB" opacity={0.6} />
                    </Box>

                    <Box
                        sx={{
                            position: 'absolute',
                            top: { xs: 5 },
                            right: { xs: 10, md: 80 },
                            animation: 'float 3s ease-in-out infinite 1s'
                        }}>
                        <Zap size={20} color="#A020F0" opacity={0.6} />
                    </Box>

                    <Stack
                        direction={{ xs: 'column' }}
                        spacing={{ xs: 3, md: 4 }}
                        alignItems="center"
                        justifyContent="space-between">
                        <Box sx={{ flex: 1, textAlign: 'center' }}>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontWeight: 800,
                                    fontSize: {
                                        xs: '2.2rem',
                                        sm: '2.8rem',
                                        md: '3.5rem',
                                        lg: '4rem'
                                    },
                                    lineHeight: 1,
                                    mb: 1,
                                    background:
                                        'linear-gradient(135deg, #FFFFFF 0%, #0A78AB 25%, #A020F0 75%, #FFFFFF 100%)',
                                    backgroundSize: '300% 100%',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    animation: 'gradientFlow 8s ease-in-out infinite',
                                    letterSpacing: '-2px',
                                    textShadow: '0 0 30px rgba(160, 32, 240, 0.2)',
                                    '@keyframes gradientFlow': {
                                        '0%': { backgroundPosition: '0% 50%' },
                                        '50%': { backgroundPosition: '100% 50%' },
                                        '100%': { backgroundPosition: '0% 50%' }
                                    }
                                }}>
                                {title}
                            </Typography>

                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 300,
                                    fontSize: { xs: '1rem', md: '1.2rem' },
                                    color: '#a020f063',
                                    lineHeight: 1.5,
                                    letterSpacing: '0.3px'
                                }}>
                                {description}
                            </Typography>
                        </Box>

                        {children}
                    </Stack>
                </Box>
            </Fade>
        </Box>
    );
};
