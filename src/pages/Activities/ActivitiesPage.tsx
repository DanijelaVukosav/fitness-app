// pages/ActivitiesPage.tsx
import React from 'react';
import { ActivitiesProvider } from '@/pages/Activities/services/ActivitiesContext.tsx';
import { ActivitiesContainer } from '@/pages/Activities/components/ActivitiesContainer.tsx';

const ActivitiesPage: React.FC = () => {
    return (
        <ActivitiesProvider>
            <ActivitiesContainer />
        </ActivitiesProvider>
    );
};

export default ActivitiesPage;
