import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

interface AddActivityCardProps {
    onClick: () => void;
}

export const AddActivityCard: React.FC<AddActivityCardProps> = ({ onClick }) => {
    return (
        <Card
            onClick={onClick}
            sx={{
                position: 'relative',
                height: 360,
                borderRadius: '24px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                background:
                    'linear-gradient(135deg, rgba(10, 120, 171, 0.05) 0%, rgba(160, 32, 240, 0.05) 100%)',
                border: '2px dashed rgba(10, 120, 171, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(10, 120, 171, 0.1)',
                '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    background:
                        'linear-gradient(135deg, rgba(10, 120, 171, 0.1) 0%, rgba(160, 32, 240, 0.1) 100%)',
                    border: '2px dashed rgba(10, 120, 171, 0.6)',
                    boxShadow: '0 20px 40px rgba(10, 120, 171, 0.2)',
                    '& .add-icon': {
                        transform: 'scale(1.2) rotate(90deg)',
                        background: 'linear-gradient(135deg, #0A78AB 0%, #A020F0 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    },
                    '& .add-text': {
                        background: 'linear-gradient(135deg, #0A78AB 0%, #A020F0 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    },
                    '& .glow-effect': {
                        opacity: 1,
                        transform: 'scale(1.1)'
                    }
                }
            }}>
            <Box
                className="glow-effect"
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '80%',
                    height: '80%',
                    borderRadius: '50%',
                    background:
                        'radial-gradient(circle, rgba(10, 120, 171, 0.1) 0%, transparent 70%)',
                    transform: 'translate(-50%, -50%)',
                    opacity: 0,
                    transition: 'all 0.4s ease',
                    zIndex: 0
                }}
            />

            <Box
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    mb: 2
                }}>
                <Add
                    className="add-icon"
                    sx={{
                        fontSize: 64,
                        color: 'rgba(10, 120, 171, 0.7)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        filter: 'drop-shadow(0 4px 8px rgba(10, 120, 171, 0.2))'
                    }}
                />
            </Box>

            <Box
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    textAlign: 'center'
                }}>
                <Typography
                    className="add-text"
                    variant="h6"
                    sx={{
                        fontWeight: 800,
                        fontSize: '1.3rem',
                        color: 'rgba(10, 120, 171, 0.8)',
                        mb: 1,
                        transition: 'all 0.3s ease'
                    }}>
                    Add New Activity
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'rgba(0, 0, 0, 0.6)',
                        fontSize: '0.9rem',
                        lineHeight: 1.4,
                        px: 2
                    }}>
                    Create a new workout or activity to track your fitness journey
                </Typography>
            </Box>

            {[...Array(6)].map((_, i) => (
                <Box
                    key={i}
                    sx={{
                        position: 'absolute',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #0A78AB 0%, #A020F0 100%)',
                        opacity: 0.3,
                        animation: `float${i} ${3 + i * 0.5}s ease-in-out infinite`,
                        top: `${20 + i * 10}%`,
                        left: `${10 + i * 12}%`,
                        '@keyframes float0': {
                            '0%, 100%': { transform: 'translateY(0) scale(1)' },
                            '50%': { transform: 'translateY(-10px) scale(1.2)' }
                        },
                        '@keyframes float1': {
                            '0%, 100%': { transform: 'translateY(0) scale(1)' },
                            '50%': { transform: 'translateY(-15px) scale(1.1)' }
                        },
                        '@keyframes float2': {
                            '0%, 100%': { transform: 'translateY(0) scale(1)' },
                            '50%': { transform: 'translateY(-8px) scale(1.3)' }
                        },
                        '@keyframes float3': {
                            '0%, 100%': { transform: 'translateY(0) scale(1)' },
                            '50%': { transform: 'translateY(-12px) scale(1.1)' }
                        },
                        '@keyframes float4': {
                            '0%, 100%': { transform: 'translateY(0) scale(1)' },
                            '50%': { transform: 'translateY(-18px) scale(1.2)' }
                        },
                        '@keyframes float5': {
                            '0%, 100%': { transform: 'translateY(0) scale(1)' },
                            '50%': { transform: 'translateY(-6px) scale(1.4)' }
                        }
                    }}
                />
            ))}
        </Card>
    );
};
