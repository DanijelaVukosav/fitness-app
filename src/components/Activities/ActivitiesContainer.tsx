// pages/ActivitiesPage.tsx
import React from 'react';
import { FilterContainer } from '@/components/Activities/ActivitiesFilterContainer.tsx';
import { ActivitiesGrid } from '@/components/Activities/ActivitiesGrid.tsx';
import { ActivitiesHero } from '@/components/Activities/ActivitiesHero.tsx';
import { ActivitiesStats } from '@/components/Activities/ActivitiesStats.tsx';
import { ActivityModals } from '@/components/Activities/ActivityModals.tsx';
import { useActivitiesManager } from '@/hooks/useActivitiesManager.ts';
import { PageContainer } from '@/components/common/PageContainer.tsx';

export const ActivitiesContainer: React.FC = () => {
    const { openModal } = useActivitiesManager();

    return (
        <PageContainer>
            <React.Fragment>
                <ActivitiesHero />

                <ActivitiesStats />
                <FilterContainer />

                <ActivitiesGrid itemsPerPage={8} onAddActivity={openModal} showAddCard={true} />

                <ActivityModals />
            </React.Fragment>
        </PageContainer>
    );
};
