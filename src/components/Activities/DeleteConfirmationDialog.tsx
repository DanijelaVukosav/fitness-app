// components/Activities/DeleteConfirmationDialog.tsx
import React from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography
} from '@mui/material';
import { Close, Warning } from '@mui/icons-material';
import type { Activity } from '@/context/types';

interface DeleteConfirmationDialogProps {
    open: boolean;
    activity: Activity | null;
    onClose: () => void;
    onConfirm: (activityId: string) => void;
    isDeleting?: boolean;
}

export const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
    open,
    activity,
    onClose,
    onConfirm,
    isDeleting = false
}) => {
    const handleConfirm = () => {
        if (activity?.id) {
            onConfirm(activity.id);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: '20px',
                    padding: 2
                }
            }}>
            <DialogTitle
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    pb: 1
                }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Warning
                        sx={{
                            color: '#FF6B6B',
                            fontSize: 28
                        }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Delete Activity
                    </Typography>
                </Box>
                <IconButton onClick={onClose} size="small" disabled={isDeleting}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 2 }}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    Are you sure you want to delete this activity? This action cannot be undone.
                </Typography>

                {activity && (
                    <Box
                        sx={{
                            backgroundColor: '#f5f5f5',
                            borderRadius: '12px',
                            p: 2,
                            border: '2px solid #e0e0e0'
                        }}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 600,
                                mb: 0.5,
                                color: '#333'
                            }}>
                            {activity.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'rgba(0, 0, 0, 0.7)',
                                mb: 1
                            }}>
                            {activity.description}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'rgba(0, 0, 0, 0.6)',
                                textTransform: 'uppercase',
                                fontWeight: 600
                            }}>
                            {activity.type} • {activity.duration} min
                        </Typography>
                    </Box>
                )}
            </DialogContent>

            <DialogActions sx={{ pt: 2, px: 3, pb: 2 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    disabled={isDeleting}
                    sx={{
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 3,
                        py: 1
                    }}>
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirm}
                    variant="contained"
                    disabled={isDeleting}
                    sx={{
                        backgroundColor: '#FF6B6B',
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 3,
                        py: 1,
                        '&:hover': {
                            backgroundColor: '#FF5252'
                        },
                        '&:disabled': {
                            backgroundColor: 'rgba(255, 107, 107, 0.5)'
                        }
                    }}>
                    {isDeleting ? 'Deleting...' : 'Delete Activity'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
