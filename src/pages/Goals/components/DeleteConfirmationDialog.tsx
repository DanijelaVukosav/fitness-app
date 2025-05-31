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

interface DeleteConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isDeleting?: boolean;
}

export const GoalDeleteModal: React.FC<DeleteConfirmationDialogProps> = ({
    open,
    onClose,
    onConfirm,
    isDeleting = false
}) => {
    const handleConfirm = () => {
        onConfirm();
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
                    Are you sure you want to delete your goal? This action cannot be undone.
                </Typography>
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
