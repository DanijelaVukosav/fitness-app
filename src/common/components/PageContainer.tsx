import React, { type ReactElement } from 'react';
import { Container } from '@mui/material';

interface PageContainerProps {
    children?: ReactElement;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
    return (
        <Container
            sx={{
                pb: 8,
                width: { xs: '100%', md: '90vw', xl: '90vw' },
                maxWidth: { xs: '100%', md: '90vw', xl: '2000px' }
            }}>
            {children}
        </Container>
    );
};
