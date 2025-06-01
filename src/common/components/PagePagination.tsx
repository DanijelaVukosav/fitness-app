import { type ChangeEvent, type FC, useCallback } from 'react';
import { Box, Fade, Pagination, Paper } from '@mui/material';

interface PagePaginationProps {
    totalPages?: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export const PagePagination: FC<PagePaginationProps> = ({
    totalPages,
    currentPage,
    onPageChange
}) => {
    const handlePageChange = useCallback(
        (_event: ChangeEvent<unknown>, page: number) => {
            onPageChange(page);
        },
        [onPageChange]
    );

    if (!totalPages || totalPages <= 1) {
        return null;
    }

    return (
        <Fade in timeout={1200}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 6
                }}>
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: '20px',
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        p: 2
                    }}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                        sx={{
                            '& .MuiPaginationItem-root': {
                                borderRadius: '12px',
                                fontWeight: 600,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    background:
                                        'linear-gradient(135deg, rgba(10, 120, 171, 0.1) 0%, rgba(160, 32, 240, 0.1) 100%)',
                                    transform: 'translateY(-2px)'
                                },
                                '&.Mui-selected': {
                                    background: 'linear-gradient(135deg, #0A78AB 0%, #A020F0 100%)',
                                    color: 'white',
                                    boxShadow: '0 4px 15px rgba(10, 120, 171, 0.3)',
                                    '&:hover': {
                                        background:
                                            'linear-gradient(135deg, #0A78AB 0%, #A020F0 100%)',
                                        boxShadow: '0 6px 20px rgba(10, 120, 171, 0.4)'
                                    }
                                }
                            }
                        }}
                    />
                </Paper>
            </Box>
        </Fade>
    );
};
