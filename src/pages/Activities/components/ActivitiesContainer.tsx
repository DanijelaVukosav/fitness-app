import React from 'react';
import { FilterContainer } from '@/pages/Activities/components/ActivitiesFilterContainer.tsx';
import { ActivitiesGrid } from '@/pages/Activities/components/ActivitiesGrid.tsx';
import { ActivitiesHero } from '@/pages/Activities/components/ActivitiesHero.tsx';
import { ActivitiesStats } from '@/pages/Activities/components/ActivitiesStats.tsx';
import { ActivityModals } from '@/pages/Activities/components/ActivityModals.tsx';
import { PageContainer } from '@/common/components/PageContainer.tsx';

export const ActivitiesContainer: React.FC = () => {
    return (
        <PageContainer>
            <React.Fragment>
                <ActivitiesHero />

                <ActivitiesStats />
                <FilterContainer />

                <ActivitiesGrid />

                <ActivityModals />
            </React.Fragment>
        </PageContainer>
    );
};
