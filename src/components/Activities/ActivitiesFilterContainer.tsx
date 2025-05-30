// components/FilterContainer.tsx
import React, { useCallback, useState } from 'react';
import {
    Badge,
    Box,
    Chip,
    Collapse,
    Divider,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import {
    CalendarToday,
    ClearAll,
    Close,
    DirectionsBike,
    DirectionsRun,
    DirectionsWalk,
    ExpandMore,
    FilterAlt,
    FitnessCenter,
    FlashOn,
    Hiking,
    MoreHoriz,
    Pool,
    Search
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { type ActivityType, ActivityTypes } from '@/context/types.ts';
import { useActivitiesFilters } from '@/hooks/useActivitiesFilters.ts';
import type { ParamType } from '@/api/types.ts';

const filterIcons: Record<ActivityType, React.ReactElement> = {
    [ActivityTypes.RUN]: <DirectionsRun />,
    [ActivityTypes.WALK]: <DirectionsWalk />,
    [ActivityTypes.HIKE]: <Hiking />,
    [ActivityTypes.RIDE]: <DirectionsBike />,
    [ActivityTypes.SWIM]: <Pool />,
    [ActivityTypes.WORKOUT]: <FitnessCenter />,
    [ActivityTypes.HIIT]: <FlashOn />,
    [ActivityTypes.OTHER]: <MoreHoriz />
};

const filterLabels: Record<ActivityType, string> = {
    [ActivityTypes.RUN]: 'Running',
    [ActivityTypes.WALK]: 'Walking',
    [ActivityTypes.HIKE]: 'Hiking',
    [ActivityTypes.RIDE]: 'Cycling',
    [ActivityTypes.SWIM]: 'Swimming',
    [ActivityTypes.WORKOUT]: 'Workout',
    [ActivityTypes.HIIT]: 'HIIT',
    [ActivityTypes.OTHER]: 'Other'
};

interface FilterContainerProps {
    onFilterChange?: (filters: Record<string, ParamType>) => void;
}

export const FilterContainer: React.FC<FilterContainerProps> = ({ onFilterChange }) => {
    const { filters, updateFilter, clearFilters, hasActiveFilters } = useActivitiesFilters();
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    // Count active filters for badge
    const activeFiltersCount = [
        filters.search,
        filters.type,
        filters.startDate,
        filters.endDate
    ].filter(Boolean).length;

    const handleToggleExpand = useCallback(() => {
        setIsExpanded((prev) => !prev);
    }, []);

    const handleTypeFilter = useCallback(
        (type: ActivityType) => {
            const newType = filters.type === type ? undefined : type;
            updateFilter('type', newType);
            onFilterChange?.({ ...filters, type: newType });
        },
        [filters, updateFilter, onFilterChange]
    );

    const handleSearchChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const newSearchTerm = event.target.value;
            setSearchTerm(newSearchTerm);
            updateFilter('search', newSearchTerm);
            onFilterChange?.({ ...filters, search: newSearchTerm });
        },
        [filters, updateFilter, onFilterChange]
    );

    const handleStartDateChange = useCallback(
        (date: Date | null) => {
            updateFilter('startDate', date);
            onFilterChange?.({ ...filters, startDate: date });
        },
        [filters, updateFilter, onFilterChange]
    );

    const handleEndDateChange = useCallback(
        (date: Date | null) => {
            updateFilter('endDate', date);
            onFilterChange?.({ ...filters, endDate: date });
        },
        [filters, updateFilter, onFilterChange]
    );

    const handleClearAllFilters = useCallback(() => {
        setSearchTerm('');
        clearFilters();
        onFilterChange?.({});
    }, [clearFilters, onFilterChange]);

    const handleRemoveFilter = useCallback(
        (filterKey: string) => {
            if (filterKey === 'search') {
                setSearchTerm('');
            }
            updateFilter(filterKey as keyof typeof filters, undefined);
            onFilterChange?.({ ...filters, [filterKey]: undefined });
        },
        [filters, updateFilter, onFilterChange]
    );

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Paper
                elevation={0}
                sx={{
                    background:
                        'linear-gradient(135deg, rgba(0, 255, 136, 0.05) 0%, rgba(160, 32, 240, 0.05) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0, 255, 136, 0.2)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        boxShadow: '0 8px 32px rgba(0, 255, 136, 0.15)',
                        transform: 'translateY(-2px)'
                    }
                }}>
                {/* Header - Always Visible */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 2,
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 255, 136, 0.05)'
                        }
                    }}
                    onClick={handleToggleExpand}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Badge
                            badgeContent={activeFiltersCount}
                            color="primary"
                            sx={{
                                '& .MuiBadge-badge': {
                                    background: 'linear-gradient(45deg, #00FF88, #A020F0)',
                                    color: 'white',
                                    fontWeight: 'bold'
                                }
                            }}>
                            <FilterAlt
                                sx={{
                                    color: hasActiveFilters ? '#00FF88' : 'rgba(0, 0, 0, 0.6)',
                                    transition: 'color 0.3s ease'
                                }}
                            />
                        </Badge>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                background: hasActiveFilters
                                    ? 'linear-gradient(45deg, #00FF88, #A020F0)'
                                    : 'rgba(0, 0, 0, 0.8)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: hasActiveFilters ? 'transparent' : 'inherit',
                                transition: 'all 0.3s ease'
                            }}>
                            Filter Activities
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {hasActiveFilters && (
                            <Tooltip title="Clear All Filters">
                                <IconButton
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClearAllFilters();
                                    }}
                                    sx={{
                                        color: '#ff4444',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 68, 68, 0.1)',
                                            transform: 'scale(1.1)'
                                        }
                                    }}>
                                    <ClearAll fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        )}
                        <IconButton
                            sx={{
                                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease',
                                color: '#00FF88'
                            }}>
                            <ExpandMore />
                        </IconButton>
                    </Box>
                </Box>

                {/* Active Filters Summary - Always Visible */}
                {hasActiveFilters && !isExpanded && (
                    <Box sx={{ px: 2, pb: 2 }}>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {filters.search && (
                                <Chip
                                    size="small"
                                    label={`Search: "${filters.search}"`}
                                    onDelete={() => handleRemoveFilter('search')}
                                    sx={{
                                        background: 'linear-gradient(45deg, #00FF88, #A020F0)',
                                        color: 'white',
                                        '& .MuiChip-deleteIcon': { color: 'white' }
                                    }}
                                />
                            )}
                            {filters.type && (
                                <Chip
                                    size="small"
                                    icon={filterIcons[filters.type] ?? ''}
                                    label={filterLabels[filters.type] ?? ''}
                                    onDelete={() => handleRemoveFilter('type')}
                                    sx={{
                                        background: 'linear-gradient(45deg, #00FF88, #A020F0)',
                                        color: 'white',
                                        '& .MuiChip-icon': { color: 'white' },
                                        '& .MuiChip-deleteIcon': { color: 'white' }
                                    }}
                                />
                            )}
                            {filters.startDate && (
                                <Chip
                                    size="small"
                                    icon={<CalendarToday />}
                                    label={`From: ${filters.startDate.toLocaleDateString()}`}
                                    onDelete={() => handleRemoveFilter('startDate')}
                                    sx={{
                                        background: 'linear-gradient(45deg, #00FF88, #A020F0)',
                                        color: 'white',
                                        '& .MuiChip-icon': { color: 'white' },
                                        '& .MuiChip-deleteIcon': { color: 'white' }
                                    }}
                                />
                            )}
                            {filters.endDate && (
                                <Chip
                                    size="small"
                                    icon={<CalendarToday />}
                                    label={`To: ${filters.endDate.toLocaleDateString()}`}
                                    onDelete={() => handleRemoveFilter('endDate')}
                                    sx={{
                                        background: 'linear-gradient(45deg, #00FF88, #A020F0)',
                                        color: 'white',
                                        '& .MuiChip-icon': { color: 'white' },
                                        '& .MuiChip-deleteIcon': { color: 'white' }
                                    }}
                                />
                            )}
                        </Stack>
                    </Box>
                )}

                {/* Expandable Content */}
                <Collapse in={isExpanded} timeout={400}>
                    <Divider sx={{ backgroundColor: 'rgba(0, 255, 136, 0.1)' }} />
                    <Box sx={{ p: 3, pt: 2 }}>
                        <Stack spacing={3}>
                            {/* Search Field */}
                            <Box>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        mb: 1,
                                        fontWeight: 600,
                                        color: 'rgba(0, 0, 0, 0.8)',
                                        textTransform: 'uppercase',
                                        letterSpacing: 1
                                    }}>
                                    Search Activities
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Search by title or description..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search sx={{ color: '#00FF88' }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: searchTerm && (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => {
                                                        setSearchTerm('');
                                                        handleRemoveFilter('search');
                                                    }}>
                                                    <Close fontSize="small" />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '16px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                            backdropFilter: 'blur(10px)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                transform: 'translateY(-1px)',
                                                boxShadow: '0 4px 20px rgba(0, 255, 136, 0.1)'
                                            },
                                            '&.Mui-focused': {
                                                backgroundColor: 'rgba(255, 255, 255, 1)',
                                                boxShadow: '0 0 0 2px rgba(0, 255, 136, 0.3)',
                                                '& fieldset': {
                                                    borderColor: '#00FF88'
                                                }
                                            }
                                        }
                                    }}
                                />
                            </Box>

                            {/* Activity Types */}
                            <Box>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        mb: 2,
                                        fontWeight: 600,
                                        color: 'rgba(0, 0, 0, 0.8)',
                                        textTransform: 'uppercase',
                                        letterSpacing: 1
                                    }}>
                                    Activity Types
                                </Typography>
                                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                    {Object.values(ActivityTypes).map((type) => (
                                        <Chip
                                            key={type}
                                            icon={filterIcons[type]}
                                            label={filterLabels[type]}
                                            onClick={() => handleTypeFilter(type)}
                                            variant={filters.type === type ? 'filled' : 'outlined'}
                                            sx={{
                                                borderRadius: '12px',
                                                px: 1,
                                                py: 0.5,
                                                height: 'auto',
                                                fontSize: '0.875rem',
                                                fontWeight: 600,
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                cursor: 'pointer',
                                                ...(filters.type === type
                                                    ? {
                                                          background:
                                                              'linear-gradient(135deg, #00FF88 0%, #A020F0 100%)',
                                                          color: 'white',
                                                          boxShadow:
                                                              '0 4px 15px rgba(0, 255, 136, 0.4)',
                                                          transform: 'translateY(-2px) scale(1.05)',
                                                          '& .MuiChip-icon': {
                                                              color: 'white'
                                                          }
                                                      }
                                                    : {
                                                          backgroundColor:
                                                              'rgba(255, 255, 255, 0.8)',
                                                          borderColor: 'rgba(0, 255, 136, 0.3)',
                                                          color: 'rgba(0, 0, 0, 0.8)',
                                                          '&:hover': {
                                                              backgroundColor:
                                                                  'rgba(0, 255, 136, 0.1)',
                                                              borderColor: '#00FF88',
                                                              transform: 'translateY(-2px)',
                                                              boxShadow:
                                                                  '0 4px 15px rgba(0, 255, 136, 0.2)'
                                                          }
                                                      })
                                            }}
                                        />
                                    ))}
                                </Stack>
                            </Box>

                            {/* Date Range */}
                            <Box>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        mb: 2,
                                        fontWeight: 600,
                                        color: 'rgba(0, 0, 0, 0.8)',
                                        textTransform: 'uppercase',
                                        letterSpacing: 1
                                    }}>
                                    Date Range
                                </Typography>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                    <DatePicker
                                        label="Start Date"
                                        value={filters.startDate || null}
                                        onChange={handleStartDateChange}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                sx: {
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '12px',
                                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                                        transition: 'all 0.3s ease',
                                                        '&:hover': {
                                                            backgroundColor:
                                                                'rgba(255, 255, 255, 0.9)',
                                                            transform: 'translateY(-1px)'
                                                        },
                                                        '&.Mui-focused': {
                                                            backgroundColor:
                                                                'rgba(255, 255, 255, 1)',
                                                            boxShadow:
                                                                '0 0 0 2px rgba(0, 255, 136, 0.3)',
                                                            '& fieldset': {
                                                                borderColor: '#00FF88'
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                    <DatePicker
                                        label="End Date"
                                        value={filters.endDate || null}
                                        onChange={handleEndDateChange}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                sx: {
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '12px',
                                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                                        transition: 'all 0.3s ease',
                                                        '&:hover': {
                                                            backgroundColor:
                                                                'rgba(255, 255, 255, 0.9)',
                                                            transform: 'translateY(-1px)'
                                                        },
                                                        '&.Mui-focused': {
                                                            backgroundColor:
                                                                'rgba(255, 255, 255, 1)',
                                                            boxShadow:
                                                                '0 0 0 2px rgba(0, 255, 136, 0.3)',
                                                            '& fieldset': {
                                                                borderColor: '#00FF88'
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                </Stack>
                            </Box>
                        </Stack>
                    </Box>
                </Collapse>
            </Paper>
        </LocalizationProvider>
    );
};
