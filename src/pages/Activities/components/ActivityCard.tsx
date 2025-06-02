import React, { useCallback, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Chip,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Typography
} from '@mui/material';
import { Delete, Edit, MoreVert, Schedule } from '@mui/icons-material';
import { type Activity, ActivityTypes } from '@/pages/Activities/services/types.ts';

import runImage from '@/assets/activities/run.png';
import walkImage from '@/assets/activities/walk.png';
import hikeImage from '@/assets/activities/hike.png';
import rideImage from '@/assets/activities/ride.png';
import swimImage from '@/assets/activities/swim.jpeg';
import workoutImage from '@/assets/activities/workout.png';
import hiitImage from '@/assets/activities/hiit.jpeg';
import otherImage from '@/assets/activities/other.png';

const activityImages: Record<string, string> = {
    [ActivityTypes.RUN]: runImage,
    [ActivityTypes.WALK]: walkImage,
    [ActivityTypes.HIKE]: hikeImage,
    [ActivityTypes.RIDE]: rideImage,
    [ActivityTypes.SWIM]: swimImage,
    [ActivityTypes.WORKOUT]: workoutImage,
    [ActivityTypes.HIIT]: hiitImage,
    [ActivityTypes.OTHER]: otherImage
};

const activityGradients: Record<string, string> = {
    [ActivityTypes.RUN]: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
    [ActivityTypes.WALK]: 'linear-gradient(135deg, #A8E6CF 0%, #88D8A3 100%)',
    [ActivityTypes.HIKE]: 'linear-gradient(135deg, #8D6E63 0%, #BCAAA4 100%)',
    [ActivityTypes.RIDE]: 'linear-gradient(135deg, #42A5F5 0%, #1976D2 100%)',
    [ActivityTypes.SWIM]: 'linear-gradient(135deg, #26C6DA 0%, #00ACC1 100%)',
    [ActivityTypes.WORKOUT]: 'linear-gradient(135deg, #FF7043 0%, #FF5722 100%)',
    [ActivityTypes.HIIT]: 'linear-gradient(135deg, #EC407A 0%, #E91E63 100%)',
    [ActivityTypes.OTHER]: 'linear-gradient(135deg, #AB47BC 0%, #9C27B0 100%)'
};

interface ActivityCardProps {
    activity: Activity;
    onActivityClick?: (activity: Activity) => void;
    onEditActivity?: (activity: Activity) => void;
    onDeleteActivity?: (activity: Activity) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
    activity,
    onActivityClick,
    onEditActivity,
    onDeleteActivity
}) => {
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

    const imageUrl = activityImages[activity.type];
    const gradient = activityGradients[activity.type];
    const hasActions = onEditActivity || onDeleteActivity;

    const handleCardClick = useCallback(() => {
        if (!menuAnchor) {
            onActivityClick?.(activity);
        }
    }, [activity, menuAnchor, onActivityClick]);

    const handleMenuClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setMenuAnchor(e.currentTarget);
    }, []);

    const handleMenuClose = useCallback(() => {
        setMenuAnchor(null);
    }, []);

    const handleEditClick = useCallback(
        (e?: React.MouseEvent) => {
            e?.stopPropagation();
            onEditActivity?.(activity);
            handleMenuClose();
        },
        [activity, handleMenuClose, onEditActivity]
    );

    const handleDeleteClick = useCallback(
        (e?: React.MouseEvent) => {
            e?.stopPropagation();
            onDeleteActivity?.(activity);
            handleMenuClose();
        },
        [activity, handleMenuClose, onDeleteActivity]
    );

    const formatDate = useCallback((date: Date | string) => {
        let activityDate: Date;

        if (typeof date === 'string') {
            activityDate = new Date(date);
        } else {
            activityDate = date;
        }

        return activityDate.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: false
        });
    }, []);

    return (
        <>
            <Card
                onClick={handleCardClick}
                sx={{
                    position: 'relative',
                    height: 360,
                    borderRadius: '24px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                    background: 'white',
                    transform: 'translateY(0px)',
                    '&:hover': {
                        transform: 'translateY(-8px) scale(1.02)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                        '& .desktop-action-buttons': {
                            opacity: 1
                        },
                        '& .image-overlay': {
                            opacity: 0.6
                        }
                    },
                    '&:active': {
                        transform: 'scale(0.98)',
                        transition: 'transform 0.1s ease'
                    }
                }}>
                <Box
                    sx={{
                        position: 'relative',
                        height: '50%',
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        p: 2
                    }}>
                    <Box
                        className="image-overlay"
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background:
                                'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
                            opacity: 0.4,
                            transition: 'opacity 0.3s ease',
                            zIndex: 1
                        }}
                    />

                    <Chip
                        label={activity.type}
                        size="small"
                        sx={{
                            position: 'relative',
                            zIndex: 2,
                            background: gradient,
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                            '& .MuiChip-label': { px: 1.5, py: 0.5 }
                        }}
                    />

                    {hasActions && (
                        <Box
                            sx={{
                                position: 'relative',
                                zIndex: 2,
                                display: 'flex',
                                gap: 0.5
                            }}>
                            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                                <IconButton
                                    onClick={handleMenuClick}
                                    size="small"
                                    sx={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                        backdropFilter: 'blur(10px)',
                                        color: '#333',
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                                        '&:hover': {
                                            backgroundColor: 'white',
                                            transform: 'scale(1.05)'
                                        },
                                        transition: 'all 0.2s ease'
                                    }}>
                                    <MoreVert fontSize="small" />
                                </IconButton>
                            </Box>

                            <Box
                                className="desktop-action-buttons"
                                sx={{
                                    display: { xs: 'none', md: 'flex' },
                                    gap: 0.5,
                                    opacity: 0,
                                    transition: 'opacity 0.3s ease'
                                }}>
                                {onEditActivity && (
                                    <IconButton
                                        onClick={handleEditClick}
                                        size="small"
                                        sx={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                            backdropFilter: 'blur(10px)',
                                            color: '#42A5F5',
                                            '&:hover': {
                                                backgroundColor: 'white',
                                                transform: 'scale(1.1)'
                                            },
                                            transition: 'all 0.2s ease'
                                        }}>
                                        <Edit fontSize="small" />
                                    </IconButton>
                                )}

                                {onDeleteActivity && (
                                    <IconButton
                                        onClick={handleDeleteClick}
                                        size="small"
                                        sx={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                            backdropFilter: 'blur(10px)',
                                            color: '#FF6B6B',
                                            '&:hover': {
                                                backgroundColor: 'white',
                                                transform: 'scale(1.1)'
                                            },
                                            transition: 'all 0.2s ease'
                                        }}>
                                        <Delete fontSize="small" />
                                    </IconButton>
                                )}
                            </Box>
                        </Box>
                    )}
                </Box>

                <CardContent
                    sx={{
                        height: '50%',
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 800,
                                fontSize: '1.3rem',
                                lineHeight: 1.2,
                                mb: 1,
                                color: '#333',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>
                            {activity.title}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                color: 'rgba(0, 0, 0, 0.7)',
                                lineHeight: 1.4,
                                fontSize: '0.9rem',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                mb: 2
                            }}>
                            {activity.description}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Schedule
                                sx={{
                                    fontSize: 18,
                                    color: gradient.includes('FF6B6B') ? '#FF6B6B' : '#42A5F5'
                                }}
                            />
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 700,
                                    color: '#333',
                                    fontSize: '0.9rem'
                                }}>
                                {activity.duration} min
                            </Typography>
                        </Box>

                        <Typography
                            variant="body2"
                            sx={{
                                color: 'rgba(0, 0, 0, 0.6)',
                                fontSize: '0.85rem',
                                fontWeight: 600
                            }}>
                            {formatDate(activity.date)}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>

            <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                sx={{
                    '& .MuiPaper-root': {
                        borderRadius: '12px',
                        minWidth: 140,
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                        border: '1px solid rgba(0, 0, 0, 0.05)'
                    }
                }}>
                {onEditActivity && (
                    <MenuItem onClick={handleEditClick} sx={{ py: 1.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                            <Edit fontSize="small" sx={{ color: '#42A5F5' }} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Edit"
                            primaryTypographyProps={{
                                fontSize: '0.9rem',
                                fontWeight: 500
                            }}
                        />
                    </MenuItem>
                )}
                {onDeleteActivity && (
                    <MenuItem onClick={handleDeleteClick} sx={{ py: 1.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                            <Delete fontSize="small" sx={{ color: '#FF6B6B' }} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Delete"
                            primaryTypographyProps={{
                                fontSize: '0.9rem',
                                fontWeight: 500
                            }}
                        />
                    </MenuItem>
                )}
            </Menu>
        </>
    );
};

export const MemoizedActivityCard = React.memo(ActivityCard);
