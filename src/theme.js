import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8F55FD', // Royal Violet
      light: '#A78BFA',
      dark: '#7C3AED',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF5277', // Vivid Rose
      light: '#FDA4AF',
      dark: '#E11D48',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#06B6D4', // Cyber Cyan / Success
      light: '#67E8F9',
      dark: '#0891B2',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#08050E', // obsidian-obsidian dark
      paper: '#13101E', // Amethyst slate
    },
    text: {
      primary: '#F8FAFC', // Slate 50
      secondary: '#94A3B8', // Slate 400
      disabled: '#64748B', // Slate 500
    },
    divider: 'rgba(255, 255, 255, 0.06)', // Cyber translucent divider
  },
  typography: {
    fontFamily: '"Inter", "Outfit", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 900,
    },
    h2: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 800,
    },
    h3: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 800,
    },
    h4: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 700,
    },
    h5: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 700,
    },
    h6: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 700,
    },
    subtitle1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
    },
    subtitle2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
    },
    body1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    button: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 24, // Identical curves across components
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 24,
          padding: '12px 28px',
          fontWeight: 700,
          boxShadow: 'none',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          '&:hover': {
            boxShadow: '0px 8px 24px rgba(143, 85, 253, 0.25)',
            transform: 'translateY(-1px)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #8F55FD 0%, #7C3AED 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #9F6BFF 0%, #8B5CF6 100%)',
          },
        },
        outlinedPrimary: {
          borderWidth: '1.5px',
          borderColor: 'rgba(143, 85, 253, 0.4)',
          '&:hover': {
            borderWidth: '1.5px',
            borderColor: '#8F55FD',
            backgroundColor: 'rgba(143, 85, 253, 0.06)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: () => ({
          borderRadius: 24,
          boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.45)',
          border: '1.5px solid rgba(255, 255, 255, 0.05)',
          backgroundColor: 'rgba(20, 16, 32, 0.55)',
          backdropFilter: 'blur(20px)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          '&:hover': {
            borderColor: 'rgba(143, 85, 253, 0.2)',
            boxShadow: '0px 20px 48px rgba(143, 85, 253, 0.12)',
            transform: 'translateY(-2px)',
          }
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          border: '1px solid rgba(255, 255, 255, 0.05)',
          backgroundColor: 'rgba(15, 11, 24, 0.65)',
          backdropFilter: 'blur(16px)',
        },
        elevation1: {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
        },
        elevation2: {
          boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.3)',
        },
        elevation3: {
          boxShadow: '0px 12px 40px rgba(0, 0, 0, 0.35)',
        },
      },
    },
  },
});

export default theme;
