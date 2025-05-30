import React from 'react';
import { Box, CircularProgress, keyframes, Typography } from '@mui/material';
import { styled } from '@mui/system';

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const GradientContainer = styled(Box)({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(-45deg, #FFD700, #8A2BE2, #FF69B4, #9370DB)',
    backgroundSize: '400% 400%',
    animation: `${gradientShift} 4s ease-in-out infinite`,
    zIndex: 9999
});

const StyledCircularProgress = styled(CircularProgress)(() => ({
    '& .MuiCircularProgress-circle': {
        stroke: 'url(#gradient)'
    }
}));

const LoaderGradient = () => (
    <svg width="0" height="0">
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#8A2BE2" />
            </linearGradient>
        </defs>
    </svg>
);

interface PageLoaderProps {
    message?: string;
    size?: number;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ message = 'Loading...', size = 60 }) => {
    return (
        <GradientContainer>
            <LoaderGradient />
            <StyledCircularProgress size={size} thickness={4} sx={{ mb: 3 }} />
            <Typography
                variant="h6"
                component="div"
                sx={{
                    color: 'white',
                    fontWeight: 500,
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    textAlign: 'center'
                }}>
                {message}
            </Typography>
        </GradientContainer>
    );
};
