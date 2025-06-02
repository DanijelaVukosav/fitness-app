import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const SecondaryButton = styled(Button)(({ theme }) => ({
    px: 3,
    py: 1.2,
    fontSize: '1rem',
    fontWeight: 600,
    borderRadius: '50px',
    border: 'none',
    background: 'linear-gradient(135deg, #aeaeae 0%, #e8e8e8 100%)',
    color: 'rgba(0, 0, 0, 0.7)',
    textTransform: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    minWidth: '140px',
    maxWidth: '300px',
    height: '48px',
    [theme.breakpoints.down('md')]: {
        minWidth: '120px',
        fontSize: '0.875rem',
        px: 2.5,
        py: 1,
        height: '44px'
    },
    [theme.breakpoints.down('sm')]: {
        minWidth: '100px',
        fontSize: '0.8rem',
        px: 2,
        height: '40px'
    },
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        transition: 'left 0.5s'
    },
    '&:hover': {
        transform: 'translateY(-2px)',
        '&::before': {
            left: '100%'
        }
    }
}));
