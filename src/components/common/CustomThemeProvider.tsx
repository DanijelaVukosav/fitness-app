import { createTheme, ThemeProvider } from '@mui/system';
import type { FC, ReactElement } from 'react';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0A78AB',
            dark: '#00CC6A',
            light: '#4DFFAA'
        },
        secondary: {
            main: '#A020F0',
            dark: '#7B1BB8',
            light: '#B946F3'
        },
        background: {
            default: '#FAFBFC',
            paper: '#FFFFFF'
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.6)'
        }
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 800,
            letterSpacing: '-0.025em'
        },
        h2: {
            fontWeight: 700,
            letterSpacing: '-0.025em'
        },
        h3: {
            fontWeight: 700,
            letterSpacing: '-0.025em'
        },
        h4: {
            fontWeight: 600,
            letterSpacing: '-0.025em'
        },
        h5: {
            fontWeight: 600,
            letterSpacing: '-0.025em'
        },
        h6: {
            fontWeight: 600,
            letterSpacing: '-0.025em'
        },
        button: {
            fontWeight: 600,
            textTransform: 'none'
        }
    },
    shape: {
        borderRadius: 16
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#0A78AB #F1F1F1',
                    '&::-webkit-scrollbar': {
                        width: '8px'
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#F1F1F1',
                        borderRadius: '8px'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'linear-gradient(135deg, #0A78AB 0%, #A020F0 100%)',
                        borderRadius: '8px',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #00CC6A 0%, #7B1BB8 100%)'
                        }
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    padding: '10px 24px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '20px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '12px'
                    }
                }
            }
        }
    }
});

interface CustomThemeProviderProps {
    children: ReactElement;
}

export const CustomThemeProvider: FC<CustomThemeProviderProps> = ({ children }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
