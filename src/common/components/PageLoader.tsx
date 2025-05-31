import React from 'react';
import { Box, keyframes, Typography } from '@mui/material';
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

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
`;

const ripple = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(2.4);
    opacity: 0;
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
    background: 'linear-gradient(135deg, #0A78AB 0%, #A020F0 100%)',
    backgroundSize: '400% 400%',
    animation: `${gradientShift} 6s ease-in-out infinite`,
    zIndex: 9999,
    overflow: 'hidden'
});

const LoaderContainer = styled(Box)({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '40px'
});

const OuterRing = styled(Box)({
    width: '120px',
    height: '120px',
    border: '3px solid rgba(255, 255, 255, 0.2)',
    borderTop: '3px solid rgba(255, 255, 255, 0.8)',
    borderRadius: '50%',
    animation: `${spin} 2s linear infinite`,
    position: 'absolute'
});

const MiddleRing = styled(Box)({
    width: '90px',
    height: '90px',
    border: '2px solid rgba(255, 255, 255, 0.1)',
    borderRight: '2px solid rgba(255, 255, 255, 0.6)',
    borderRadius: '50%',
    animation: `${spin} 1.5s linear infinite reverse`,
    position: 'absolute'
});

const InnerCore = styled(Box)({
    width: '60px',
    height: '60px',
    background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6))',
    borderRadius: '50%',
    animation: `${pulse} 2s ease-in-out infinite`,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 30px rgba(255, 255, 255, 0.5), inset 0 0 20px rgba(10, 120, 171, 0.3)'
});

const RippleEffect = styled(Box)({
    position: 'absolute',
    width: '120px',
    height: '120px',
    border: '2px solid rgba(255, 255, 255, 0.4)',
    borderRadius: '50%',
    animation: `${ripple} 2s ease-out infinite`,
    '&:nth-of-type(2)': {
        animationDelay: '0.5s'
    },
    '&:nth-of-type(3)': {
        animationDelay: '1s'
    }
});

const FloatingDots = styled(Box)({
    position: 'absolute',
    width: '8px',
    height: '8px',
    background: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '50%',
    animation: `${float} 3s ease-in-out infinite`,
    '&:nth-of-type(1)': {
        top: '20%',
        left: '15%',
        animationDelay: '0s'
    },
    '&:nth-of-type(2)': {
        top: '30%',
        right: '20%',
        animationDelay: '1s'
    },
    '&:nth-of-type(3)': {
        bottom: '25%',
        left: '25%',
        animationDelay: '2s'
    },
    '&:nth-of-type(4)': {
        bottom: '35%',
        right: '15%',
        animationDelay: '1.5s'
    }
});

const LoadingText = styled(Typography)({
    color: 'white',
    fontWeight: 600,
    textShadow: '0 4px 8px rgba(0,0,0,0.3)',
    textAlign: 'center',
    animation: `${pulse} 2s ease-in-out infinite`,
    letterSpacing: '2px',
    textTransform: 'uppercase'
});

const SubText = styled(Typography)({
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: 300,
    textAlign: 'center',
    marginTop: '12px',
    animation: `${float} 4s ease-in-out infinite`,
    letterSpacing: '1px'
});

interface PageLoaderProps {
    message?: string;
    subMessage?: string;
    size?: number;
}

export const PageLoader: React.FC<PageLoaderProps> = ({
    message = 'Loading',
    subMessage = 'Please wait while we prepare your experience'
}) => {
    return (
        <GradientContainer>
            <FloatingDots />
            <FloatingDots />
            <FloatingDots />
            <FloatingDots />

            <LoaderContainer>
                <RippleEffect />
                <RippleEffect />
                <RippleEffect />

                <OuterRing />
                <MiddleRing />

                <InnerCore>
                    <Box
                        sx={{
                            width: '20px',
                            height: '20px',
                            background: 'linear-gradient(45deg, #0A78AB, #A020F0)',
                            borderRadius: '50%',
                            animation: `${spin} 1s linear infinite`
                        }}
                    />
                </InnerCore>
            </LoaderContainer>

            <LoadingText variant="h4">{message}</LoadingText>

            <SubText variant="body1">{subMessage}</SubText>
        </GradientContainer>
    );
};
