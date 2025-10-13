import { createTheme } from '@mui/material/styles';
import { defaultTheme } from 'react-admin';

export const customTheme = createTheme({
    ...defaultTheme,
    palette: {
        mode: 'light',
        primary: {
            main: '#2E7D8B',
            light: '#5EAAB7',
            dark: '#1F5761',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#F4A261',
            light: '#F6B485',
            dark: '#E76F51',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f8fafc',
            paper: '#ffffff',
        },
        text: {
            primary: '#1e293b',
            secondary: '#64748b',
        },
        success: {
            main: '#10b981',
        },
        warning: {
            main: '#f59e0b',
        },
        error: {
            main: '#ef4444',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
        },
        h2: {
            fontWeight: 600,
            fontSize: '2rem',
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.5rem',
        },
        h4: {
            fontWeight: 500,
            fontSize: '1.25rem',
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                    borderRadius: 12,
                    border: '1px solid #e2e8f0',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 500,
                },
            },
        },
        RaMenuItemLink: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    margin: '4px 8px',
                    '&.RaMenuItemLink-active': {
                        backgroundColor: '#2E7D8B',
                        color: '#ffffff',
                        '& .MuiListItemIcon-root': {
                            color: '#ffffff',
                        },
                    },
                },
            },
        },
    },
});

export const customDarkTheme = createTheme({
    ...customTheme,
    palette: {
        ...customTheme.palette,
        mode: 'dark',
        primary: {
            main: '#5EAAB7',
            light: '#8BCDD6',
            dark: '#2E7D8B',
            contrastText: '#ffffff',
        },
        background: {
            default: '#0f172a',
            paper: '#1e293b',
        },
        text: {
            primary: '#f1f5f9',
            secondary: '#cbd5e1',
        },
    },
});
