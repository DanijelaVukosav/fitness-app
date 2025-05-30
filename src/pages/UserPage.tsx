import { useState } from 'react';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField,
    Typography
} from '@mui/material';
import { RestartAlt, Save, Settings } from '@mui/icons-material';
import { Target } from 'lucide-react';

const UserSettingsPage = () => {
    const [settings, setSettings] = useState({
        goalType: 'count', // 'count' or 'duration'
        goalValue: 3,
        goalFrequency: 'daily', // 'daily' or 'weekly'
        notifications: true,
        weeklyTarget: 21, // for weekly goals
        reminderTime: '09:00'
    });

    const [showSuccess, setShowSuccess] = useState(false);

    const handleSaveSettings = () => {
        // Save settings logic here
        setShowSuccess(true);
    };

    const handleResetSettings = () => {
        setSettings({
            goalType: 'count',
            goalValue: 3,
            goalFrequency: 'daily',
            notifications: true,
            weeklyTarget: 21,
            reminderTime: '09:00'
        });
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                        sx={{
                            bgcolor: 'primary.main',
                            mr: 2,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        }}>
                        <Settings />
                    </Avatar>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                        Goal Settings
                    </Typography>
                </Box>
                <Typography variant="subtitle1" color="text.secondary">
                    Configure your activity goals and track your progress
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {/* Settings Panel */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card
                        sx={{
                            height: 'fit-content',
                            background:
                                'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <Target style={{ marginRight: 1, color: 'primary.main' }} />
                                <Typography variant="h6" component="h2" fontWeight={600}>
                                    Goal Configuration
                                </Typography>
                            </Box>

                            {/* Goal Type */}
                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <InputLabel>Goal Type</InputLabel>
                                <Select
                                    value={settings.goalType}
                                    label="Goal Type"
                                    onChange={(e) =>
                                        setSettings({ ...settings, goalType: e.target.value })
                                    }
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2
                                        }
                                    }}>
                                    <MenuItem value="count">Number of Activities</MenuItem>
                                    <MenuItem value="duration">Total Duration (minutes)</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Goal Frequency */}
                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <InputLabel>Goal Frequency</InputLabel>
                                <Select
                                    value={settings.goalFrequency}
                                    label="Goal Frequency"
                                    onChange={(e) =>
                                        setSettings({ ...settings, goalFrequency: e.target.value })
                                    }
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2
                                        }
                                    }}>
                                    <MenuItem value="daily">Daily</MenuItem>
                                    <MenuItem value="weekly">Weekly</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Goal Value */}
                            <TextField
                                fullWidth
                                label={`Target ${settings.goalType === 'count' ? 'Activities' : 'Minutes'} ${settings.goalFrequency === 'daily' ? 'per Day' : 'per Week'}`}
                                type="number"
                                value={
                                    settings.goalFrequency === 'daily'
                                        ? settings.goalValue
                                        : settings.weeklyTarget
                                }
                                onChange={(e) =>
                                    settings.goalFrequency === 'daily'
                                        ? setSettings({
                                              ...settings,
                                              goalValue: parseInt(e.target.value)
                                          })
                                        : setSettings({
                                              ...settings,
                                              weeklyTarget: parseInt(e.target.value)
                                          })
                                }
                                sx={{
                                    mb: 3,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <Chip
                                            label={
                                                settings.goalType === 'count' ? 'activities' : 'min'
                                            }
                                            size="small"
                                            color="primary"
                                            variant="outlined"
                                        />
                                    )
                                }}
                            />

                            <Divider sx={{ my: 3 }} />

                            {/* Action Buttons */}
                            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                                <Button
                                    variant="contained"
                                    startIcon={<Save />}
                                    onClick={handleSaveSettings}
                                    sx={{
                                        flex: 1,
                                        borderRadius: 2,
                                        background:
                                            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        '&:hover': {
                                            background:
                                                'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)'
                                        }
                                    }}>
                                    Save Settings
                                </Button>
                                <Button
                                    variant="outlined"
                                    startIcon={<RestartAlt />}
                                    onClick={handleResetSettings}
                                    sx={{
                                        borderRadius: 2,
                                        borderColor: 'primary.main',
                                        color: 'primary.main'
                                    }}>
                                    Reset
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Success Snackbar */}
            <Snackbar
                open={showSuccess}
                autoHideDuration={3000}
                onClose={() => setShowSuccess(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert
                    onClose={() => setShowSuccess(false)}
                    severity="success"
                    sx={{
                        width: '100%',
                        borderRadius: 2
                    }}>
                    Settings saved successfully!
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default UserSettingsPage;
