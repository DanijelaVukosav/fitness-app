import { Box, DialogTitle } from '@mui/material';
import { type FC, type ReactElement } from 'react';

interface ModalHeaderProps {
    icon?: ReactElement;
    title: string | ReactElement;
    closeIcon?: ReactElement;
}

export const ModalHeader: FC<ModalHeaderProps> = ({ icon, title, closeIcon }) => {
    return (
        <DialogTitle
            sx={{
                position: 'relative',
                p: 4,
                pb: 2,
                background:
                    'linear-gradient(135deg, rgba(10, 120, 171, 0.05) 0%, rgba(160, 32, 240, 0.05) 100%)'
            }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {icon && (
                        <Box
                            sx={{
                                width: 56,
                                height: 56,
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, #0A78AB 0%, #A020F0 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 8px 24px rgba(10, 120, 171, 0.3)'
                            }}>
                            {icon}
                        </Box>
                    )}
                    {title}
                </Box>
                {closeIcon}
            </Box>
        </DialogTitle>
    );
};
