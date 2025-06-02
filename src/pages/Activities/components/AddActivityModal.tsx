import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    FormControl,
    FormHelperText,
    IconButton,
    InputLabel,
    LinearProgress,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import {
    AccessTime,
    CalendarToday,
    Close,
    Description,
    FitnessCenter,
    Save,
    Schedule
} from '@mui/icons-material';
import {
    type Activity,
    type ActivityType,
    ActivityTypes
} from '@/pages/Activities/services/types.ts';

import runImage from '@/assets/activities/run.png';
import walkImage from '@/assets/activities/walk.png';
import hikeImage from '@/assets/activities/hike.png';
import rideImage from '@/assets/activities/ride.png';
import swimImage from '@/assets/activities/swim.jpeg';
import workoutImage from '@/assets/activities/workout.png';
import hiitImage from '@/assets/activities/hiit.jpeg';
import otherImage from '@/assets/activities/other.png';
import { ModalHeader } from '@/common/components/ModalHeader.tsx';

const activityImages: Record<ActivityType, string> = {
    [ActivityTypes.RUN]: runImage,
    [ActivityTypes.WALK]: walkImage,
    [ActivityTypes.HIKE]: hikeImage,
    [ActivityTypes.RIDE]: rideImage,
    [ActivityTypes.SWIM]: swimImage,
    [ActivityTypes.WORKOUT]: workoutImage,
    [ActivityTypes.HIIT]: hiitImage,
    [ActivityTypes.OTHER]: otherImage
};

interface AddActivityModalProps {
    activity?: Activity | null;
    open: boolean;
    onClose: () => void;
    onSubmit: (activity: Activity) => void;
}

const getCurrentDate = (): string => {
    return new Date().toISOString().split('T')[0];
};

const getCurrentTime = (): string => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
};

const defaultActivityValues: Activity = {
    title: '',
    description: '',
    type: ActivityTypes.RUN,
    date: getCurrentDate(),
    time: getCurrentTime(),
    duration: 0
};

export const AddActivityModal: React.FC<AddActivityModalProps> = ({
    activity,
    open,
    onClose,
    onSubmit
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [progress, setProgress] = useState(0);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm<Activity>({
        defaultValues: activity ?? defaultActivityValues,
        mode: 'onChange'
    });

    useEffect(() => {
        if (activity && open) {
            const activityDate =
                typeof activity.date === 'string' ? new Date(activity.date) : activity.date;

            reset({
                id: activity.id,
                title: activity.title,
                description: activity.description,
                type: activity.type,
                duration: activity.duration,
                date: activityDate.toISOString().split('T')[0],
                time: activity.time || ''
            });
        } else if (open && activity === null) {
            reset(defaultActivityValues);
        }
    }, [activity, open, reset]);

    const onFormSubmit = async (data: Activity): Promise<void> => {
        setIsSubmitting(true);
        setProgress(0);

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 10;
            });
        }, 100);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const activityDateTime = new Date(`${data.date}T${data.time}`);

            const newActivity = {
                id: data.id,
                title: data.title,
                description: data.description,
                type: data.type,
                duration: data.duration,
                date: activityDateTime,
                time: data.time
            };

            onSubmit(newActivity);

            reset({
                title: '',
                description: '',
                type: ActivityTypes.RUN,
                date: getCurrentDate(),
                time: getCurrentTime(),
                duration: 0
            });

            setProgress(100);
            setTimeout(() => {
                setIsSubmitting(false);
                setProgress(0);
                onClose();
            }, 500);
        } catch (error) {
            console.error('Error submitting activity:', error);
            setIsSubmitting(false);
            setProgress(0);
        }
    };

    const handleClose = useCallback((): void => {
        if (!isSubmitting) {
            reset();
            onClose();
        }
    }, [isSubmitting, onClose, reset]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '24px',
                    background:
                        'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 24px 48px rgba(0, 0, 0, 0.15)',
                    overflow: 'hidden'
                }
            }}>
            {isSubmitting && (
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        height: 4,
                        background: 'rgba(10, 120, 171, 0.1)',
                        '& .MuiLinearProgress-bar': {
                            background: 'linear-gradient(90deg, #0A78AB 0%, #A020F0 100%)'
                        }
                    }}
                />
            )}

            <ModalHeader
                icon={<FitnessCenter sx={{ color: 'white', fontSize: 28 }} />}
                title={
                    <Box>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 800,
                                background: 'linear-gradient(135deg, #0A78AB 0%, #A020F0 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                            Add New Activity
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.6)', mt: 0.5 }}>
                            {activity ? 'Edit' : 'Create'} a new workout session
                        </Typography>
                    </Box>
                }
                closeIcon={
                    <IconButton
                        onClick={handleClose}
                        disabled={isSubmitting}
                        sx={{
                            borderRadius: '12px',
                            background: 'rgba(0, 0, 0, 0.05)',
                            '&:hover': {
                                background: 'rgba(255, 0, 0, 0.1)',
                                transform: 'scale(1.1)'
                            }
                        }}>
                        <Close />
                    </IconButton>
                }
            />

            <DialogContent sx={{ p: 4 }}>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 5 }}>
                        <Controller
                            name="title"
                            control={control}
                            rules={{
                                required: 'Activity title is required',
                                minLength: {
                                    value: 3,
                                    message: 'Title must be at least 3 characters'
                                }
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Activity Title"
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                    disabled={isSubmitting}
                                    InputProps={{
                                        startAdornment: (
                                            <FitnessCenter
                                                sx={{ mr: 1, color: 'rgba(0, 0, 0, 0.5)' }}
                                            />
                                        )
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '16px',
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            '&:hover fieldset': {
                                                borderColor: '#0A78AB'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#0A78AB',
                                                borderWidth: 2
                                            }
                                        }
                                    }}
                                />
                            )}
                        />

                        <Controller
                            name="type"
                            control={control}
                            rules={{ required: 'Activity type is required' }}
                            render={({ field }) => (
                                <FormControl
                                    error={!!errors.type}
                                    disabled={isSubmitting}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '16px',
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            '&:hover fieldset': {
                                                borderColor: '#0A78AB'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#0A78AB',
                                                borderWidth: 2
                                            }
                                        }
                                    }}>
                                    <InputLabel>Activity Type</InputLabel>
                                    <Select {...field} label="Activity Type">
                                        {Object.values(ActivityTypes).map((type) => (
                                            <MenuItem key={type} value={type}>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 2
                                                    }}>
                                                    <Box
                                                        sx={{
                                                            width: 32,
                                                            height: 32,
                                                            borderRadius: '8px',
                                                            backgroundImage: `url(${activityImages[type]})`,
                                                            backgroundSize: 'cover',
                                                            backgroundPosition: 'center'
                                                        }}
                                                    />
                                                    <Typography
                                                        sx={{ textTransform: 'capitalize' }}>
                                                        {type.toLowerCase()}
                                                    </Typography>
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.type && (
                                        <FormHelperText>{errors.type.message}</FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />

                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                            <Controller
                                name="date"
                                control={control}
                                rules={{ required: 'Date is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Date"
                                        type="date"
                                        error={!!errors.date}
                                        helperText={errors.date?.message}
                                        disabled={isSubmitting}
                                        InputProps={{
                                            startAdornment: (
                                                <CalendarToday
                                                    sx={{ mr: 1, color: 'rgba(0, 0, 0, 0.5)' }}
                                                />
                                            )
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '16px',
                                                background: 'rgba(255, 255, 255, 0.8)',
                                                '&:hover fieldset': {
                                                    borderColor: '#0A78AB'
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#0A78AB',
                                                    borderWidth: 2
                                                }
                                            }
                                        }}
                                    />
                                )}
                            />

                            <Controller
                                name="time"
                                control={control}
                                rules={{ required: 'Time is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Time"
                                        type="time"
                                        error={!!errors.time}
                                        helperText={errors.time?.message}
                                        disabled={isSubmitting}
                                        InputProps={{
                                            startAdornment: (
                                                <AccessTime
                                                    sx={{ mr: 1, color: 'rgba(0, 0, 0, 0.5)' }}
                                                />
                                            )
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '16px',
                                                background: 'rgba(255, 255, 255, 0.8)',
                                                '&:hover fieldset': {
                                                    borderColor: '#0A78AB'
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#0A78AB',
                                                    borderWidth: 2
                                                }
                                            }
                                        }}
                                    />
                                )}
                            />
                        </Box>

                        <Controller
                            name="duration"
                            control={control}
                            rules={{
                                required: 'Duration is required',
                                min: { value: 1, message: 'Duration must be at least 1 minute' },
                                max: { value: 1440, message: 'Duration cannot exceed 24 hours' }
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Duration (minutes)"
                                    type="number"
                                    error={!!errors.duration}
                                    helperText={errors.duration?.message}
                                    disabled={isSubmitting}
                                    InputProps={{
                                        startAdornment: (
                                            <Schedule sx={{ mr: 1, color: 'rgba(0, 0, 0, 0.5)' }} />
                                        )
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '16px',
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            '&:hover fieldset': {
                                                borderColor: '#0A78AB'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#0A78AB',
                                                borderWidth: 2
                                            }
                                        }
                                    }}
                                />
                            )}
                        />

                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Description (optional)"
                                    multiline
                                    rows={3}
                                    disabled={isSubmitting}
                                    InputProps={{
                                        startAdornment: (
                                            <Description
                                                sx={{
                                                    mr: 1,
                                                    color: 'rgba(0, 0, 0, 0.5)',
                                                    alignSelf: 'flex-start',
                                                    mt: 1
                                                }}
                                            />
                                        )
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '16px',
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            '&:hover fieldset': {
                                                borderColor: '#0A78AB'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#0A78AB',
                                                borderWidth: 2
                                            }
                                        }
                                    }}
                                />
                            )}
                        />

                        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={handleClose}
                                disabled={isSubmitting}
                                sx={{
                                    flex: 1,
                                    borderRadius: '50px',
                                    py: 1.5,
                                    fontWeight: 700,
                                    border: '2px solid rgba(0, 0, 0, 0.1)',
                                    color: 'rgba(0, 0, 0, 0.7)',
                                    '&:hover': {
                                        border: '2px solid rgba(255, 0, 0, 0.3)',
                                        background: 'rgba(255, 0, 0, 0.05)'
                                    }
                                }}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={!isValid || isSubmitting}
                                startIcon={<Save />}
                                sx={{
                                    flex: 2,
                                    borderRadius: '50px',
                                    py: 1.5,
                                    fontWeight: 800,
                                    fontSize: '1rem',
                                    background: 'linear-gradient(135deg, #0A78AB 0%, #A020F0 100%)',
                                    boxShadow: '0 8px 24px rgba(10, 120, 171, 0.3)',
                                    '&:hover': {
                                        background:
                                            'linear-gradient(135deg, #0A78AB 0%, #A020F0 100%)',
                                        boxShadow: '0 12px 32px rgba(10, 120, 171, 0.4)',
                                        transform: 'translateY(-2px)'
                                    },
                                    '&:disabled': {
                                        background: 'rgba(0, 0, 0, 0.1)',
                                        color: 'rgba(0, 0, 0, 0.3)'
                                    }
                                }}>
                                {isSubmitting ? 'Saving Activity...' : 'Save Activity'}
                            </Button>
                        </Box>
                    </Box>
                </form>
            </DialogContent>
        </Dialog>
    );
};
