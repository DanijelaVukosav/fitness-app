import { Box, Paper, Skeleton } from '@mui/material';
import Grid from '@mui/material/Grid';
import type { FC } from 'react';

export const GridSkeleton: FC = () => {
    return (
        <Grid container spacing={3}>
            {Array.from({ length: 4 }).map((_, index) => (
                <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={`skeleton-${index}`}>
                    <Paper
                        sx={{
                            height: 360,
                            borderRadius: '24px',
                            overflow: 'hidden',
                            background: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            position: 'relative'
                        }}>
                        {/* Card Header with Image Skeleton */}
                        <Box sx={{ position: 'relative', height: '160px' }}>
                            <Skeleton
                                variant="rectangular"
                                width="100%"
                                height="100%"
                                sx={{
                                    borderRadius: '0',
                                    background:
                                        'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                                    backgroundSize: '200% 100%',
                                    animation: 'shimmer 1.5s infinite'
                                }}
                            />
                            {/* Activity Type Badge Skeleton */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 16,
                                    left: 16
                                }}>
                                <Skeleton
                                    variant="rectangular"
                                    width={80}
                                    height={24}
                                    sx={{
                                        borderRadius: '12px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)'
                                    }}
                                />
                            </Box>
                            {/* Favorite Icon Skeleton */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 16,
                                    right: 16
                                }}>
                                <Skeleton
                                    variant="circular"
                                    width={32}
                                    height={32}
                                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                                />
                            </Box>
                        </Box>

                        {/* Card Content */}
                        <Box sx={{ p: 3 }}>
                            {/* Title Skeleton */}
                            <Skeleton
                                variant="text"
                                height={28}
                                width="85%"
                                sx={{
                                    mb: 1,
                                    borderRadius: '8px',
                                    fontSize: '1.25rem'
                                }}
                            />

                            {/* Description Skeleton */}
                            <Box sx={{ mb: 3 }}>
                                <Skeleton
                                    variant="text"
                                    height={16}
                                    width="100%"
                                    sx={{ mb: 0.5, borderRadius: '6px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    height={16}
                                    width="70%"
                                    sx={{ borderRadius: '6px' }}
                                />
                            </Box>

                            {/* Stats Row Skeleton */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: 2
                                }}>
                                {/* Duration Stat */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Skeleton variant="circular" width={20} height={20} />
                                    <Skeleton
                                        variant="text"
                                        width={40}
                                        height={16}
                                        sx={{ borderRadius: '6px' }}
                                    />
                                </Box>

                                {/* Calories Stat */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Skeleton variant="circular" width={20} height={20} />
                                    <Skeleton
                                        variant="text"
                                        width={50}
                                        height={16}
                                        sx={{ borderRadius: '6px' }}
                                    />
                                </Box>

                                {/* Difficulty Stat */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Skeleton variant="circular" width={20} height={20} />
                                    <Skeleton
                                        variant="text"
                                        width={35}
                                        height={16}
                                        sx={{ borderRadius: '6px' }}
                                    />
                                </Box>
                            </Box>

                            {/* Action Button Skeleton */}
                            <Skeleton
                                variant="rectangular"
                                width="100%"
                                height={40}
                                sx={{
                                    borderRadius: '20px',
                                    mt: 'auto'
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};
