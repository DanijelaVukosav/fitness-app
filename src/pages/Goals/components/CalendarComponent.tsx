import { type FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useActivitiesContext } from '@/pages/Activities/services/ActivitiesContext.tsx';
import { useActivities } from '@/pages/Activities/hooks/useActivities.ts';
import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    IconButton,
    Paper,
    Tooltip,
    Typography
} from '@mui/material';
import { CalendarToday, ChevronLeft, ChevronRight } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { useUserGoalManager } from '@/pages/Goals/hooks/useUserGoalManager.ts';

const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CalendarComponent: FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const { updateFilter } = useActivitiesContext();
    const { goal } = useUserGoalManager();

    const monthStart = useMemo(
        () => new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
        [currentDate]
    );
    const monthEnd = useMemo(
        () => new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0),
        [currentDate]
    );

    useEffect(() => {
        updateFilter('startDate', monthStart);
        updateFilter('endDate', monthEnd);
        updateFilter('limit', 50);
    }, [monthEnd, monthStart, updateFilter]);

    const { data: activitiesData, isLoading } = useActivities({
        startDate: monthStart,
        endDate: monthEnd,
        limit: 500
    });

    const dailyProgress = useMemo(() => {
        if (!activitiesData?.activities || !goal) return {};

        const progress: Record<string, { count: number; duration: number; achieved?: boolean }> =
            {};
        const activities = activitiesData.activities;

        activities.forEach((activity) => {
            const date = new Date(activity.date).toDateString();
            if (!progress[date]) {
                progress[date] = { count: 0, duration: 0 };
            }
            progress[date].count += 1;
            progress[date].duration += activity.duration;
        });

        Object.keys(progress).forEach((date) => {
            const dayData = progress[date];
            const target = goal.target;
            const current = goal.type === 'count' ? dayData.count : dayData.duration;
            progress[date].achieved = current >= target;
        });

        return progress;
    }, [activitiesData, goal]);

    const getDaysInMonth = useCallback(() => {
        return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    }, [currentDate]);

    const getFirstDayOfMonth = useCallback(() => {
        return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    }, [currentDate]);

    const generateCalendarDays = useCallback(() => {
        const daysInMonth = getDaysInMonth();
        const firstDay = getFirstDayOfMonth();
        const days = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }

        return days;
    }, [getDaysInMonth, getFirstDayOfMonth]);

    const navigateMonth = useCallback((direction: number) => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + direction);
            return newDate;
        });
    }, []);

    const getDayStatus = useCallback(
        (day: number | null) => {
            if (!day) return null;

            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dateString = date.toDateString();
            const dayData = dailyProgress[dateString];

            if (!dayData) return 'none';
            return dayData.achieved ? 'success' : 'partial';
        },
        [currentDate, dailyProgress]
    );

    const getDayTooltip = useCallback(
        (day: number | null) => {
            if (!day || !goal) return '';

            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dateString = date.toDateString();
            const dayData = dailyProgress[dateString];

            if (!dayData) return 'No activities';

            const target = goal.target;
            const current = goal.type === 'count' ? dayData.count : dayData.duration;
            const unit = goal.type === 'count' ? 'activities' : 'minutes';

            return `${current}/${target} ${unit} - ${dayData.achieved ? 'Goal achieved!' : 'Goal not met'}`;
        },
        [currentDate, dailyProgress, goal]
    );

    return (
        <Card
            sx={{
                background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                borderRadius: 3,
                border: '1px solid rgba(255,255,255,0.2)'
            }}>
            <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <CalendarToday sx={{ mr: 2, color: 'primary.main' }} />
                    <Typography variant="h5" fontWeight={700} sx={{ flexGrow: 1 }}>
                        Activity Calendar
                    </Typography>
                    {isLoading && <CircularProgress size={24} />}
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 3
                    }}>
                    <IconButton onClick={() => navigateMonth(-1)} sx={{ color: 'primary.main' }}>
                        <ChevronLeft />
                    </IconButton>
                    <Typography variant="h6" fontWeight={600}>
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </Typography>
                    <IconButton onClick={() => navigateMonth(1)} sx={{ color: 'primary.main' }}>
                        <ChevronRight />
                    </IconButton>
                </Box>

                <Grid container spacing={1} sx={{ mb: 1 }}>
                    {dayNames.map((day) => (
                        <Grid key={day} size={{ xs: 12 / 7 }}>
                            <Typography
                                variant="subtitle2"
                                align="center"
                                sx={{ py: 1, fontWeight: 600, color: 'text.secondary' }}>
                                {day}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={1}>
                    {generateCalendarDays().map((day, index) => {
                        const status = getDayStatus(day);
                        const tooltip = getDayTooltip(day);

                        return (
                            <Grid key={index} size={{ xs: 12 / 7 }}>
                                <Tooltip title={tooltip} arrow>
                                    <Paper
                                        sx={{
                                            minHeight: 48,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: day ? 'pointer' : 'default',
                                            transition: 'all 0.2s ease',
                                            backgroundColor: !day
                                                ? 'transparent'
                                                : status === 'success'
                                                  ? 'success.light'
                                                  : status === 'partial'
                                                    ? 'red'
                                                    : 'grey.100',
                                            color: !day
                                                ? 'transparent'
                                                : status === 'success'
                                                  ? 'success.contrastText'
                                                  : status === 'partial'
                                                    ? 'warning.contrastText'
                                                    : 'text.primary',
                                            border: day ? '2px solid' : 'none',
                                            borderColor: !day
                                                ? 'transparent'
                                                : status === 'success'
                                                  ? 'success.main'
                                                  : status === 'partial'
                                                    ? '#c60b0b'
                                                    : 'grey.300',
                                            '&:hover': day
                                                ? {
                                                      transform: 'scale(1.05)',
                                                      boxShadow: 3
                                                  }
                                                : {}
                                        }}>
                                        {day && (
                                            <Typography variant="body2" fontWeight={600}>
                                                {day}
                                            </Typography>
                                        )}
                                    </Paper>
                                </Tooltip>
                            </Grid>
                        );
                    })}
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                            sx={{
                                width: 16,
                                height: 16,
                                backgroundColor: 'success.light',
                                border: '2px solid',
                                borderColor: 'success.main',
                                borderRadius: 1
                            }}
                        />
                        <Typography variant="caption">Goal Achieved</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                            sx={{
                                width: 16,
                                height: 16,
                                backgroundColor: 'red',
                                border: '2px solid',
                                borderColor: 'red',
                                borderRadius: 1
                            }}
                        />
                        <Typography variant="caption">Partial Progress</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                            sx={{
                                width: 16,
                                height: 16,
                                backgroundColor: 'grey.100',
                                border: '2px solid',
                                borderColor: 'grey.300',
                                borderRadius: 1
                            }}
                        />
                        <Typography variant="caption">No Activity</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};
