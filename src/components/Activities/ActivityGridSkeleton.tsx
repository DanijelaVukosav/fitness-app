import Grid from '@mui/material/Grid';
import { Box, Card, CardContent, Skeleton } from '@mui/material';

export const ActivityGridSkeleton = () => (
    <Grid container spacing={3}>
        {[...Array(6)].map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
                <Card
                    sx={{
                        height: 360,
                        borderRadius: '24px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Skeleton
                                variant="rounded"
                                width={60}
                                height={24}
                                sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                            />
                            <Skeleton
                                variant="text"
                                width={50}
                                sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                            />
                        </Box>
                        <Skeleton
                            variant="text"
                            width="80%"
                            height={32}
                            sx={{ mb: 2, bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                        />
                        <Skeleton
                            variant="text"
                            width="100%"
                            height={60}
                            sx={{ mb: 3, bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                        />
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <Skeleton
                                variant="text"
                                width={80}
                                sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                            />
                            <Skeleton
                                variant="text"
                                width={60}
                                sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                            />
                        </Box>
                        <Skeleton
                            variant="circular"
                            width={56}
                            height={56}
                            sx={{
                                position: 'absolute',
                                bottom: 20,
                                right: 20,
                                bgcolor: 'rgba(255, 255, 255, 0.1)'
                            }}
                        />
                    </CardContent>
                </Card>
            </Grid>
        ))}
    </Grid>
);