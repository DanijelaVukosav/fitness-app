import { Box, Fade, Typography } from '@mui/material';
import { useActivitiesStats } from '@/hooks/useActivities.ts';

export const ActivitiesStats = () => {
    const { data: stats, isLoading } = useActivitiesStats();

    const statsData = [
        {
            label: 'Total Activities',
            value: isLoading ? '—' : (stats?.totalActivities ?? 0),
            unit: '',
            gradient: 'linear-gradient(135deg, #0029e3 0%, #740ae1 100%)',
            accentColor: '#667eea',
            icon: '🎯'
        },
        {
            label: 'Hours Trained',
            value: isLoading ? '—' : Math.round(((stats?.totalDuration ?? 0) / 60) * 10) / 10,
            unit: 'hrs',
            gradient: 'linear-gradient(135deg, #e400ff 0%, #ff0022 100%)',
            accentColor: '#f093fb',
            icon: '⚡'
        },
        {
            label: 'Avg Duration',
            value: isLoading ? '—' : (stats?.averageDuration ?? 0),
            unit: 'min',
            gradient: 'linear-gradient(135deg, #007fee 0%, #00a3fe 100%)',
            accentColor: '#4facfe',
            icon: '⏰'
        },
        {
            label: 'Activity Types',
            value: isLoading ? '—' : Object.keys(stats?.activitiesByType ?? {}).length,
            unit: '',
            gradient: 'linear-gradient(135deg, #00c826 0%, #00bb78 100%)',
            accentColor: '#197c3a',
            icon: '🏃'
        }
    ];

    return (
        <Box
            sx={{
                mb: { xs: 3, md: 6 },
                position: 'relative',
                px: { xs: 2, sm: 0 }
            }}>
            {/* Desktop background glow */}
            <Box
                sx={{
                    display: { xs: 'none', md: 'block' },
                    position: 'absolute',
                    top: '-30px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '150px',
                    height: '150px',
                    background:
                        'radial-gradient(circle, rgba(102, 126, 234, 0.08) 0%, transparent 70%)',
                    borderRadius: '50%',
                    animation: 'gentlePulse 6s ease-in-out infinite',
                    '@keyframes gentlePulse': {
                        '0%, 100%': { transform: 'translateX(-50%) scale(1)', opacity: 0.4 },
                        '50%': { transform: 'translateX(-50%) scale(1.1)', opacity: 0.6 }
                    }
                }}
            />

            <Fade in timeout={600}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(2, 1fr)', // Mobile: 2x2 grid
                            sm: 'repeat(2, 1fr)', // Small: 2x2 grid
                            md: 'repeat(4, 1fr)' // Desktop: 1x4 grid
                        },
                        gap: { xs: 1.5, sm: 2, md: 3 },
                        position: 'relative',
                        zIndex: 1
                    }}>
                    {statsData.map((stat, idx) => (
                        <Fade key={stat.label} in timeout={800 + idx * 100}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    height: { xs: '120px', sm: '140px', md: '160px' },
                                    cursor: { xs: 'default', md: 'pointer' },
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    // Desktop hover effects
                                    '@media (hover: hover)': {
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            '& .stat-card': {
                                                background: 'rgba(255, 255, 255, 0.12)',
                                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                                boxShadow: `0 8px 12px ${stat.accentColor}20`
                                            },
                                            '& .accent-glow': {
                                                opacity: 0.8,
                                                transform: 'scale(1.01)'
                                            },
                                            '& .value-text': {
                                                transform: 'scale(1.02)'
                                            },
                                            '& .floating-icon': {
                                                transform: 'translateY(-2px) scale(1.1)'
                                            }
                                        }
                                    },
                                    // Mobile tap effect with highlight
                                    '@media (hover: none)': {
                                        '&:active': {
                                            transform: 'scale(0.98)',
                                            '& .stat-card': {
                                                background: 'rgba(255, 255, 255, 0.12)',
                                                borderColor: `${stat.accentColor}40`,
                                                boxShadow: `0 4px 16px ${stat.accentColor}15`
                                            },
                                            '& .mobile-highlight': {
                                                opacity: 0.6
                                            },
                                            '& .value-text': {
                                                transform: 'scale(1.05)'
                                            }
                                        }
                                    }
                                }}>
                                {/* Mobile highlight glow */}
                                <Box
                                    className="mobile-highlight"
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                        position: 'absolute',
                                        inset: '-1px',
                                        borderRadius: '12px',
                                        background: stat.gradient,
                                        opacity: 0.5,
                                        filter: 'blur(4px)',
                                        transition: 'all 0.2s ease',
                                        zIndex: -1
                                    }}
                                />

                                {/* Subtle accent glow - only on desktop */}
                                <Box
                                    className="accent-glow"
                                    sx={{
                                        display: { xs: 'none', md: 'block' },
                                        position: 'absolute',
                                        inset: '-1px',
                                        borderRadius: '16px',
                                        background: stat.gradient,
                                        opacity: 0.4,
                                        filter: 'blur(6px)',
                                        transition: 'all 0.3s ease',
                                        zIndex: -1
                                    }}
                                />

                                {/* Main card */}
                                <Box
                                    className="stat-card"
                                    sx={{
                                        height: '100%',
                                        borderRadius: { xs: '12px', md: '16px' },
                                        background: 'rgba(255, 255, 255, 0.06)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.08)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease',
                                        // Shimmer effect only on desktop hover
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: '-100%',
                                            width: '100%',
                                            height: '100%',
                                            background:
                                                'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
                                            transition: 'left 0.6s ease',
                                            display: { xs: 'none', md: 'block' }
                                        },
                                        '@media (hover: hover)': {
                                            '&:hover::before': {
                                                left: '100%'
                                            }
                                        }
                                    }}>
                                    {/* Icon with subtle animation */}
                                    <Box
                                        className="floating-icon"
                                        sx={{
                                            fontSize: { xs: '18px', sm: '20px', md: '24px' },
                                            mb: { xs: 0.5, md: 1 },
                                            opacity: 0.9,
                                            transition: 'all 0.3s ease',
                                            animation: {
                                                md: 'gentleFloat 4s ease-in-out infinite'
                                            },
                                            '@keyframes gentleFloat': {
                                                '0%, 100%': { transform: 'translateY(0px)' },
                                                '50%': { transform: 'translateY(-2px)' }
                                            }
                                        }}>
                                        {stat.icon}
                                    </Box>

                                    {/* Value with responsive sizing */}
                                    <Typography
                                        className="value-text"
                                        sx={{
                                            fontSize: {
                                                xs: '1.4rem',
                                                sm: '1.8rem',
                                                md: '2.2rem'
                                            },
                                            fontWeight: 800,
                                            background: stat.gradient,
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            textAlign: 'center',
                                            lineHeight: 1,
                                            mb: { xs: 0.25, md: 0.5 },
                                            transition: 'transform 0.3s ease',
                                            display: 'flex',
                                            alignItems: 'baseline',
                                            gap: 0.5
                                        }}>
                                        {stat.value}
                                        {stat.unit && (
                                            <Typography
                                                component="span"
                                                sx={{
                                                    fontSize: {
                                                        xs: '0.5rem',
                                                        sm: '0.6rem',
                                                        md: '0.7rem'
                                                    },
                                                    opacity: 0.8,
                                                    fontWeight: 600,
                                                    color: 'rgba(255, 255, 255, 0.7)'
                                                }}>
                                                {stat.unit}
                                            </Typography>
                                        )}
                                    </Typography>

                                    {/* Label with responsive typography */}
                                    <Typography
                                        sx={{
                                            fontSize: {
                                                xs: '0.7rem',
                                                sm: '0.75rem',
                                                md: '0.85rem'
                                            },
                                            fontWeight: 600,
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            textAlign: 'center',
                                            letterSpacing: '0.3px',
                                            textTransform: 'uppercase',
                                            lineHeight: 1.2,
                                            px: 1
                                        }}>
                                        {stat.label}
                                    </Typography>

                                    {/* Mobile-friendly accent line */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: { xs: '40%', md: '60%' },
                                            height: { xs: '1.5px', md: '2px' },
                                            background: stat.gradient,
                                            borderRadius: '2px',
                                            opacity: 0.7
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Fade>
                    ))}
                </Box>
            </Fade>

            {/* Desktop decorative element */}
            <Box
                sx={{
                    display: { xs: 'none', lg: 'block' },
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '60px',
                    height: '60px',
                    background:
                        'radial-gradient(circle, rgba(67, 233, 123, 0.06) 0%, transparent 70%)',
                    borderRadius: '50%',
                    animation: 'slowRotate 30s linear infinite',
                    '@keyframes slowRotate': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' }
                    }
                }}
            />
        </Box>
    );
};
