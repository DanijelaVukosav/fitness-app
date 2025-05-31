// components/ActivitiesGrid.tsx (Updated)
import { useCallback, useMemo, useState } from 'react';
import { Box, Fade, Pagination, Paper, Skeleton } from '@mui/material';
import Grid from '@mui/material/Grid';
import { ActivityCard } from '@/pages/Activities/components/ActivityCard.tsx';
import { AddActivityCard } from '@/pages/Activities/components/AddActivityCard.tsx';
import { useActivities } from '@/pages/Activities/hooks/useActivities.ts';
import { useActivitiesContext } from '@/pages/Activities/services/ActivitiesContext.tsx';
import { useNavigate } from 'react-router-dom';
import { APPLICATION_ROUTES } from '@/common/router/types.ts';
import type { Activity } from '@/pages/Activities/services/types.ts';
import { useActivitiesManager } from '@/pages/Activities/hooks/useActivitiesManager.ts';
import { ActivitiesGridHeader } from '@/pages/Activities/components/ActivitiesGridHeader.tsx';

interface ActivitiesGridProps {
    itemsPerPage?: number;

    showAddCard: boolean;
    onAddActivity: () => void;
}

export const ActivitiesGrid: React.FC<ActivitiesGridProps> = ({
    itemsPerPage = 8,
    onAddActivity,
    showAddCard = true
}) => {
    const navigate = useNavigate();
    const { filters } = useActivitiesContext();
    const { handleEditActivity, handleDeleteActivity } = useActivitiesManager();

    const { data, isLoading } = useActivities(filters);

    const [currentPage, setCurrentPage] = useState(1);

    // Calculate items per page accounting for add card
    const effectiveItemsPerPage = showAddCard ? itemsPerPage - 1 : itemsPerPage;

    const paginatedActivities = useMemo(() => {
        const startIndex = (currentPage - 1) * effectiveItemsPerPage;
        const endIndex = startIndex + effectiveItemsPerPage;
        return data?.activities?.slice(startIndex, endIndex) ?? [];
    }, [data, currentPage, effectiveItemsPerPage]);

    const totalPages = Math.ceil((data?.activities?.length ?? 0) / effectiveItemsPerPage);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
        // Smooth scroll to top of grid
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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

    const renderLoadingSkeleton = () => (
        <Grid container spacing={3}>
            {showAddCard && (
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <Paper
                        sx={{
                            height: 360,
                            borderRadius: '24px',
                            overflow: 'hidden',
                            background: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(10px)'
                        }}>
                        <Box
                            sx={{
                                p: 3,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%'
                            }}>
                            <Skeleton
                                variant="rectangular"
                                height={20}
                                width={80}
                                sx={{ borderRadius: '12px', mb: 2 }}
                            />
                            <Skeleton variant="text" height={32} width="80%" sx={{ mb: 1 }} />
                            <Skeleton variant="text" height={60} width="100%" sx={{ mb: 3 }} />
                            <Skeleton
                                variant="rectangular"
                                height={20}
                                width={120}
                                sx={{ borderRadius: '8px' }}
                            />
                        </Box>
                    </Paper>
                </Grid>
            )}
        </Grid>
    );
    //
    // const renderEmptyState = () => (
    //     <Fade in timeout={800}>
    //         <Box
    //             sx={{
    //                 display: 'flex',
    //                 flexDirection: 'column',
    //                 alignItems: 'center',
    //                 justifyContent: 'center',
    //                 py: 8,
    //                 textAlign: 'center'
    //             }}>
    //             <Box
    //                 sx={{
    //                     width: 120,
    //                     height: 120,
    //                     borderRadius: '50%',
    //                     background:
    //                         'linear-gradient(135deg, rgba(10, 120, 171, 0.1) 0%, rgba(160, 32, 240, 0.1) 100%)',
    //                     display: 'flex',
    //                     alignItems: 'center',
    //                     justifyContent: 'center',
    //                     mb: 3,
    //                     border: '2px solid rgba(10, 120, 171, 0.2)'
    //                 }}>
    //                 <Typography
    //                     variant="h3"
    //                     sx={{
    //                         background: 'linear-gradient(135deg, #0A78AB 0%, #A020F0 100%)',
    //                         backgroundClip: 'text',
    //                         WebkitBackgroundClip: 'text',
    //                         WebkitTextFillColor: 'transparent',
    //                         fontWeight: 800
    //                     }}>
    //                     🏃‍♂️
    //                 </Typography>
    //             </Box>
    //             <Typography
    //                 variant="h5"
    //                 sx={{
    //                     fontWeight: 700,
    //                     color: 'rgba(0, 0, 0, 0.8)',
    //                     mb: 1
    //                 }}>
    //                 No Activities Found
    //             </Typography>
    //             <Typography
    //                 variant="body1"
    //                 sx={{
    //                     color: 'rgba(0, 0, 0, 0.6)',
    //                     maxWidth: 400,
    //                     mb: 3
    //                 }}>
    //                 Try adjusting your filters or search terms to find more activities.
    //             </Typography>
    //             {showAddCard && (
    //                 <Box sx={{ maxWidth: 300 }}>
    //                     <AddActivityCard onClick={onAddActivity} />
    //                 </Box>
    //             )}
    //         </Box>
    //     </Fade>
    // );

    if (isLoading) {
        return renderLoadingSkeleton();
    }

    return (
        <Box>
            <ActivitiesGridHeader
                showAddCard={true}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
            />

            <Fade in timeout={1000}>
                <Grid container spacing={3} sx={{ mb: 6 }}>
                    {/* Add Activity Card - Always first if enabled and on first page */}
                    {showAddCard && currentPage === 1 && (
                        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                            <Fade in timeout={600}>
                                <div>
                                    <AddActivityCard onClick={onAddActivity} />
                                </div>
                            </Fade>
                        </Grid>
                    )}

                    {/* Activity Cards */}
                    {paginatedActivities.map((activity, index) => (
                        <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={activity.id || index}>
                            <Fade
                                in
                                timeout={
                                    800 + (index + (showAddCard && currentPage === 1 ? 1 : 0)) * 100
                                }>
                                <div>
                                    <ActivityCard
                                        activity={activity}
                                        onActivityClick={onActivityClick}
                                        onEditActivity={onEditActivity}
                                        onDeleteActivity={onDeleteActivity}
                                    />
                                </div>
                            </Fade>
                        </Grid>
                    ))}
                </Grid>
            </Fade>

            {totalPages > 1 && (
                <Fade in timeout={1200}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: 6
                        }}>
                        <Paper
                            elevation={0}
                            sx={{
                                borderRadius: '20px',
                                background: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                p: 2
                            }}>
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                                size="large"
                                sx={{
                                    '& .MuiPaginationItem-root': {
                                        borderRadius: '12px',
                                        fontWeight: 600,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            background:
                                                'linear-gradient(135deg, rgba(10, 120, 171, 0.1) 0%, rgba(160, 32, 240, 0.1) 100%)',
                                            transform: 'translateY(-2px)'
                                        },
                                        '&.Mui-selected': {
                                            background:
                                                'linear-gradient(135deg, #0A78AB 0%, #A020F0 100%)',
                                            color: 'white',
                                            boxShadow: '0 4px 15px rgba(10, 120, 171, 0.3)',
                                            '&:hover': {
                                                background:
                                                    'linear-gradient(135deg, #0A78AB 0%, #A020F0 100%)',
                                                boxShadow: '0 6px 20px rgba(10, 120, 171, 0.4)'
                                            }
                                        }
                                    }
                                }}
                            />
                        </Paper>
                    </Box>
                </Fade>
            )}
        </Box>
    );
};
