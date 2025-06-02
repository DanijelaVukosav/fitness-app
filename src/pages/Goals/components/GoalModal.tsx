import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    FormHelperText,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { Close, Repeat, RocketLaunch, Save, Timer, TrendingUp } from '@mui/icons-material';
import { type Goal, USER_ID } from '@/pages/Goals/services/goal.ts';
import Grid from '@mui/material/Grid';
import { ModalHeader } from '@/common/components/ModalHeader.tsx';
import { PrimaryButton } from '@/common/components/PrimaryButton.tsx';
import { SecondaryButton } from '@/common/components/SecondaryButton.tsx';

interface GoalDialogProps {
    open: boolean;
    goal?: Goal | null;
    onClose: () => void;
    onSubmit: (data: Goal) => Promise<void>;
}

const defaultValues: Goal = {
    userId: USER_ID,
    type: 'count',
    frequency: 'daily',
    target: 1
};

export const GoalModal: React.FC<GoalDialogProps> = ({ open, goal, onClose, onSubmit }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<Goal>({
        defaultValues,
        mode: 'onChange'
    });

    const watchedType = watch('type');
    const watchedFrequency = watch('frequency');

    React.useEffect(() => {
        if (open) {
            if (goal) {
                reset({
                    userId: USER_ID,
                    type: goal.type,
                    frequency: goal.frequency,
                    target: goal.target
                });
            } else {
                reset(defaultValues);
            }
        }
    }, [open, goal, reset]);

    const onSave = async (data: Goal) => {
        try {
            await onSubmit(data);
            onClose();
        } catch (error) {
            console.error('Error saving goal:', error);
        }
    };

    const handleClose = () => {
        reset(defaultValues);
        onClose();
    };

    const getFrequencyIcon = () => {
        return <Repeat />;
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            fullScreen={isMobile}
            PaperProps={{
                sx: {
                    borderRadius: isMobile ? 0 : 3,
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: isMobile
                        ? 'none'
                        : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                    minHeight: isMobile ? '100vh' : 'auto'
                }
            }}
            sx={{
                '& .MuiBackdrop-root': {
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(4px)'
                }
            }}>
            <form onSubmit={handleSubmit(onSave)}>
                <ModalHeader
                    icon={<RocketLaunch sx={{ color: 'white', fontSize: 28 }} />}
                    title={
                        <Box>
                            <Box>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 800,
                                        background:
                                            'linear-gradient(135deg, #0A78AB 0%, #A020F0 100%)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}>
                                    Your personal goal
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                {!goal
                                    ? 'Set up your achievement target'
                                    : 'Update your goal settings'}
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

                {/* Content */}
                <DialogContent
                    sx={{
                        pt: isMobile ? 3 : 4,
                        px: isMobile ? 3 : 4,
                        pb: 2
                    }}>
                    <Stack spacing={isMobile ? 3 : 4}>
                        {/* Goal Type & Frequency Row */}
                        <Grid container spacing={isMobile ? 2 : 3} paddingTop={isMobile ? 3 : 4}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Controller
                                    name="type"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl fullWidth error={!!errors.type}>
                                            <InputLabel
                                                sx={{
                                                    '&.Mui-focused': {
                                                        color: '#667eea'
                                                    }
                                                }}>
                                                Goal Type
                                            </InputLabel>
                                            <Select
                                                {...field}
                                                label="Goal Type"
                                                sx={{
                                                    borderRadius: 2,
                                                    '& .MuiOutlinedInput-root': {
                                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                                                            {
                                                                borderColor: '#667eea'
                                                            }
                                                    }
                                                }}>
                                                <MenuItem value="count">
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 1
                                                        }}>
                                                        <TrendingUp fontSize="small" />
                                                        Count Activities
                                                    </Box>
                                                </MenuItem>
                                                <MenuItem value="duration">
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 1
                                                        }}>
                                                        <Timer fontSize="small" />
                                                        Track Duration
                                                    </Box>
                                                </MenuItem>
                                            </Select>
                                            {errors.type && (
                                                <FormHelperText>
                                                    {errors.type.message}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    )}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Controller
                                    name="frequency"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl fullWidth error={!!errors.frequency}>
                                            <InputLabel
                                                sx={{
                                                    '&.Mui-focused': {
                                                        color: '#667eea'
                                                    }
                                                }}>
                                                Frequency
                                            </InputLabel>
                                            <Select
                                                {...field}
                                                label="Frequency"
                                                startAdornment={
                                                    <Box
                                                        sx={{
                                                            mr: 1,
                                                            display: 'flex',
                                                            alignItems: 'center'
                                                        }}>
                                                        {getFrequencyIcon()}
                                                    </Box>
                                                }
                                                sx={{
                                                    borderRadius: 2,
                                                    '& .MuiOutlinedInput-root': {
                                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                                                            {
                                                                borderColor: '#667eea'
                                                            }
                                                    }
                                                }}>
                                                <MenuItem value="daily">Daily</MenuItem>
                                                <MenuItem value="weekly">Weekly</MenuItem>
                                            </Select>
                                            {errors.frequency && (
                                                <FormHelperText>
                                                    {errors.frequency.message}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={isMobile ? 2 : 3}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Controller
                                    name="target"
                                    control={control}
                                    rules={{
                                        required: 'Target value is required',
                                        min: { value: 1, message: 'Target must be at least 1' },
                                        max: {
                                            value: 10000,
                                            message: 'Target cannot exceed 10,000'
                                        }
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label={`Target ${watchedType === 'count' ? 'Count' : 'Duration (minutes)'}`}
                                            type="number"
                                            error={!!errors.target}
                                            helperText={errors.target?.message}
                                            onChange={(e) =>
                                                field.onChange(parseInt(e.target.value) || 0)
                                            }
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                                                        {
                                                            borderColor: '#667eea'
                                                        }
                                                },
                                                '& .MuiInputLabel-root.Mui-focused': {
                                                    color: '#667eea'
                                                }
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>

                        {/* Preview Section */}
                        <Box
                            sx={{
                                p: 3,
                                background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                                borderRadius: 2,
                                border: '1px solid #e2e8f0'
                            }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                Goal Preview:
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                {watchedType === 'count'
                                    ? `Complete ${watch('target') || 0} activities ${watchedFrequency}`
                                    : `Spend ${watch('target') || 0} minutes ${watchedFrequency}`}
                            </Typography>
                        </Box>
                    </Stack>
                </DialogContent>

                {/* Actions */}
                <DialogActions
                    sx={{
                        p: isMobile ? 3 : 4,
                        pt: 2,
                        gap: 2,
                        flexDirection: isMobile ? 'column-reverse' : 'row'
                    }}>
                    <SecondaryButton
                        variant="outlined"
                        onClick={handleClose}
                        disabled={isSubmitting}
                        sx={{
                            flex: 1,
                            py: 1.5,
                            fontWeight: 700
                        }}>
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton
                        type="submit"
                        variant="contained"
                        fullWidth={isMobile}
                        startIcon={<Save />}
                        disabled={isSubmitting}
                        sx={{
                            minWidth: isMobile ? 'auto' : 140,
                            py: 1.5,
                            fontWeight: 600,
                            textTransform: 'none',
                            fontSize: '1rem',
                            width: '100%',
                            maxWidth: '600px',
                            '&:disabled': {
                                background: '#e2e8f0',
                                color: '#94a3b8'
                            },
                            transition: 'all 0.3s ease'
                        }}>
                        {isSubmitting ? 'Saving...' : !goal ? 'Create Goal' : 'Update Goal'}
                    </PrimaryButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
