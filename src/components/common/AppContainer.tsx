// pages/ActivitiesPage.tsx
import React, { type ReactNode } from 'react';
import { Box } from '@mui/material';

interface AppContainerProps {
    children?: ReactNode;
}

export const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
    return (
        <Box
            sx={{
                minHeight: '100vh',

                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `
                        radial-gradient(600px at 50% 200px, rgba(10, 120, 171, 0.1) 0%, transparent 70%),
                        radial-gradient(800px at 70% 300px, rgba(160, 32, 240, 0.08) 0%, transparent 70%)
                    `,
                    pointerEvents: 'none',
                    zIndex: 0
                }
            }}>
            {children}
        </Box>
    );
};
