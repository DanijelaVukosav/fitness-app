// pages/ActivitiesPage.tsx
import React from 'react';
import { Container } from '@mui/material';
import { FilterContainer } from '@/components/Activities/ActivitiesFilterContainer.tsx';
import { ActivitiesGrid } from '@/components/Activities/ActivitiesGrid.tsx';
import { ActivitiesHero } from '@/components/Activities/ActivitiesHero.tsx';
import { ActivitiesStats } from '@/components/Activities/ActivitiesStats.tsx';
import { ActivityModals } from '@/components/Activities/ActivityModals.tsx';
import { useActivitiesManager } from '@/hooks/useActivitiesManager.ts';

export const ActivitiesContainer: React.FC = () => {
    const { openModal } = useActivitiesManager();

    return (
        <Container
            sx={{
                pt: { xs: 10, md: 12 },
                pb: 8,
                width: { xs: '100%', md: '90vw', xl: '90vw' },
                maxWidth: { xs: '100%', md: '90vw', xl: '2000px' }
            }}>
            <ActivitiesHero />

            <ActivitiesStats />
            <FilterContainer />

            <ActivitiesGrid itemsPerPage={8} onAddActivity={openModal} showAddCard={true} />

            <ActivityModals />
        </Container>
    );
};
