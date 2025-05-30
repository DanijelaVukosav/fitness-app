// pages/ActivitiesPage.tsx
import React from 'react';
import { ActivitiesProvider } from '@/context/ActivitiesContext.tsx';
import { ActivitiesContainer } from '@/components/Activities/ActivitiesContainer.tsx';

const ActivitiesPage: React.FC = () => {
    return (
        <ActivitiesProvider>
            <ActivitiesContainer />
        </ActivitiesProvider>
    );
};

export default ActivitiesPage;
