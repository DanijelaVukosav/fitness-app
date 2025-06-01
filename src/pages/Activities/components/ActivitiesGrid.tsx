// components/ActivitiesGrid.tsx (Updated)
import { useCallback, useState } from 'react';
import { Box, Fade } from '@mui/material';
import Grid from '@mui/material/Grid';
import { ActivityCard } from '@/pages/Activities/components/ActivityCard.tsx';
import { useActivities } from '@/pages/Activities/hooks/useActivities.ts';
import { useNavigate } from 'react-router-dom';
import { APPLICATION_ROUTES } from '@/common/router/types.ts';
import type { Activity } from '@/pages/Activities/services/types.ts';
import { useActivitiesManager } from '@/pages/Activities/hooks/useActivitiesManager.ts';
import { ActivitiesGridHeader } from '@/pages/Activities/components/ActivitiesGridHeader.tsx';
import { PagePagination } from '@/common/components/PagePagination.tsx';
import { useActivitiesFilters } from '@/pages/Activities/hooks/useActivitiesFilters.ts';
import { GridSkeleton } from '@/common/components/GridSkeleton.tsx';
import { NotFoundActivities } from '@/pages/Activities/components/NotFoundActivities.tsx';

export const ActivitiesGrid: React.FC = () => {
    const navigate = useNavigate();
    const { filters, updateFilter } = useActivitiesFilters();

    const { handleEditActivity, handleDeleteActivity, openModal } = useActivitiesManager();

    const { data, isLoading } = useActivities(filters);

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = useCallback(
        (page: number) => {
            setCurrentPage(page);
            updateFilter('page', page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        [setCurrentPage, updateFilter]
    );

    const onActivityClick = useCallback(() => {
        navigate(APPLICATION_ROUTES.ACTIVITY_DETAILS);
    }, [navigate]);

    const onEditActivity = useCallback(
        (activity: Activity) => {
            handleEditActivity(activity);
        },
        [handleEditActivity]
    );

    const onDeleteActivity = useCallback(
        (activity: Activity) => {
            handleDeleteActivity(activity);
        },
        [handleDeleteActivity]
    );

    if (isLoading) {
        return <GridSkeleton />;
    }

    if (!data?.activities?.length) {
        return <NotFoundActivities />;
    }

    return (
        <Box>
            <ActivitiesGridHeader currentPage={currentPage} onAddActivity={openModal} />

            <Fade in timeout={1000}>
                <Grid container spacing={3} sx={{ mb: 6 }}>
                    {data?.activities?.map((activity, index) => (
                        <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={activity.id || index}>
                            <Fade in timeout={800 + index * 100}>
                                <Box>
                                    <ActivityCard
                                        activity={activity}
                                        onActivityClick={onActivityClick}
                                        onEditActivity={onEditActivity}
                                        onDeleteActivity={onDeleteActivity}
                                    />
                                </Box>
                            </Fade>
                        </Grid>
                    ))}
                </Grid>
            </Fade>

            <PagePagination
                totalPages={data?.totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </Box>
    );
};
