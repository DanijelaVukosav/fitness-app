import { Box, Fade, Typography } from '@mui/material';
import { useActivitiesStats } from '@/hooks/useActivities.ts';

export const ActivitiesStats = () => {
    const { data: stats, isLoading } = useActivitiesStats();

    const statsData = [
        {
            label: 'Total Activities',
            value: isLoading ? '—' : (stats?.totalActivities ?? 0),
            unit: '',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            glow: '#667eea',
            icon: '🎯'
        },
        {
            label: 'Hours Trained',
            value: isLoading ? '—' : Math.round(((stats?.totalDuration ?? 0) / 60) * 10) / 10,
            unit: 'hrs',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            glow: '#f093fb',
            icon: '⚡'
        },
        {
            label: 'Avg Duration',
            value: isLoading ? '—' : (stats?.averageDuration ?? 0),
            unit: 'min',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            colorGradient: 'linear-gradient(135deg, #295c88 0%, #00f2fe 100%)',
            glow: '#4facfe',
            icon: '⏱️'
        },
        {
            label: 'Activity Types',
            value: isLoading ? '—' : Object.keys(stats?.activitiesByType ?? {}).length,
            unit: '',
            gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            colorGradient: 'linear-gradient(135deg, #1b6735 0%, #38f9d7 100%)',
            glow: '#43e97b',
            icon: '🏃'
        }
    ];

    return (
        <Box sx={{ mb: 6, position: 'relative' }}>
            {/* Background ambient glow */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '-50px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '200px',
                    height: '200px',
                    background:
                        'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    animation: 'pulse 4s ease-in-out infinite',
                    '@keyframes pulse': {
                        '0%, 100%': { transform: 'translateX(-50%) scale(1)', opacity: 0.5 },
                        '50%': { transform: 'translateX(-50%) scale(1.2)', opacity: 0.8 }
                    }
                }}
            />

            <Fade in timeout={800}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            lg: 'repeat(4, 1fr)'
                        },
                        gap: 3,
                        position: 'relative',
                        zIndex: 1
                    }}>
                    {statsData.map((stat, idx) => (
                        <Fade key={stat.label} in timeout={1200 + idx * 150}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    height: '160px',
                                    cursor: 'pointer',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&:hover': {
                                        transform: 'translateY(-2px) scale(1.01)',
                                        '& .glow-effect': {
                                            opacity: 1
                                        },
                                        '& .stat-card': {
                                            backdropFilter: 'blur(20px)',
                                            background: 'rgba(255, 255, 255, 0.15)'
                                        },
                                        '& .value-text': {
                                            transform: 'scale(1.05)'
                                        }
                                    }
                                }}>
                                {/* Holographic glow effect */}
                                <Box
                                    className="glow-effect"
                                    sx={{
                                        position: 'absolute',
                                        inset: '-2px',
                                        borderRadius: '20px',
                                        background: stat.gradient,
                                        opacity: 0.6,
                                        filter: 'blur(8px)',
                                        transition: 'all 0.4s ease',
                                        zIndex: -1
                                    }}
                                />

                                {/* Main card */}
                                <Box
                                    className="stat-card"
                                    sx={{
                                        height: '100%',
                                        borderRadius: '18px',
                                        background: 'rgba(255, 255, 255, 0.08)',
                                        backdropFilter: 'blur(15px)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        transition: 'all 0.4s ease',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: '-100%',
                                            width: '100%',
                                            height: '100%',
                                            background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)`,
                                            transition: 'left 0.8s ease'
                                        },
                                        '&:hover::before': {
                                            left: '100%'
                                        }
                                    }}>
                                    {/* Floating icon */}
                                    <Box
                                        sx={{
                                            fontSize: '24px',
                                            mb: 1,
                                            opacity: 0.8,
                                            animation: 'float 3s ease-in-out infinite',
                                            '@keyframes float': {
                                                '0%, 100%': { transform: 'translateY(0px)' },
                                                '50%': { transform: 'translateY(-4px)' }
                                            }
                                        }}>
                                        {stat.icon}
                                    </Box>

                                    {/* Value */}
                                    <Typography
                                        className="value-text"
                                        variant="h3"
                                        sx={{
                                            fontWeight: 800,
                                            background: stat.colorGradient ?? stat.gradient,
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            textAlign: 'center',
                                            lineHeight: 1,
                                            mb: 0.5,
                                            transition: 'transform 0.3s ease',
                                            textShadow: `0 0 20px ${stat.glow}30`
                                        }}>
                                        {stat.value}
                                        <Typography
                                            component="span"
                                            sx={{
                                                fontSize: '0.4em',
                                                opacity: 0.7,
                                                ml: 0.5,
                                                fontWeight: 600
                                            }}>
                                            {stat.unit}
                                        </Typography>
                                    </Typography>

                                    {/* Label */}
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'rgba(255, 255, 255, 0.8)',
                                            textAlign: 'center',
                                            fontSize: '0.85rem',
                                            letterSpacing: '0.5px',
                                            textTransform: 'uppercase'
                                        }}>
                                        {stat.label}
                                    </Typography>

                                    {/* Bottom accent line */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: '60%',
                                            height: '2px',
                                            background: stat.gradient,
                                            borderRadius: '2px',
                                            opacity: 0.6
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Fade>
                    ))}
                </Box>
            </Fade>

            {/* Decorative elements */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    width: '100px',
                    height: '100px',
                    background:
                        'radial-gradient(circle, rgba(67, 233, 123, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    animation: 'rotate 20s linear infinite',
                    '@keyframes rotate': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' }
                    }
                }}
            />
        </Box>
    );
};
