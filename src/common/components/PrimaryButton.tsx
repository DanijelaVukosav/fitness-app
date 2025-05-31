import { Button } from '@mui/material';
import { type FC, type ReactElement } from 'react';

interface PrimaryButtonProps {
    onClick: () => void;
    label: string | ReactElement;
    icon?: ReactElement;
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({ onClick, label, icon }) => {
    return (
        <Button
            onClick={onClick}
            size="large"
            sx={{
                px: 3,
                py: 1.2,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '50px',
                background: 'linear-gradient(135deg, #0A78AB 0%, #A020F0 100%)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                textTransform: 'none',
                boxShadow: '0 6px 24px rgba(10, 120, 171, 0.25)',
                transition: 'all 0.3s ease',
                minWidth: { xs: '140px', md: '160px' },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background:
                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    transition: 'left 0.5s'
                },
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 32px rgba(10, 120, 171, 0.35)',
                    '&::before': {
                        left: '100%'
                    }
                }
            }}
            startIcon={icon}>
            {label}
        </Button>
    );
};
