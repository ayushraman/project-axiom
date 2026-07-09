import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Divider,
  Alert,
  Container,
  Grid,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SchoolIcon from '@mui/icons-material/School';
import { useApp } from '../context/AppContext';

// Vector Google Icon
const GoogleSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.62-.63-1.07-1.4-1.19-2.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

// Vector Apple Icon
const AppleSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.82M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.5-.64.74-1.2 1.88-1.05 2.99 1.12.09 2.26-.57 3-1.43z"/>
  </svg>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const { initiateDemo, login, signup } = useApp();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleBack = () => {
    navigate('/');
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGuestSignIn = () => {
    initiateDemo();
    navigate('/#decks');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters.');
      return;
    }

    try {
      if (isSignUp) {
        await signup(username, password);
      } else {
        await login(username, password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'background.default',
      position: 'relative',
      overflow: 'hidden',
      py: 6
    }}>
      {/* Background glow blobs */}
      <Box sx={{
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        width: 440,
        height: 440,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79, 70, 229, 0.12) 0%, transparent 70%)',
        filter: 'blur(60px)',
        zIndex: 0
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: '-10%',
        left: '-10%',
        width: 440,
        height: 440,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 107, 107, 0.12) 0%, transparent 70%)',
        filter: 'blur(60px)',
        zIndex: 0
      }} />

      {/* Standalone Navigation Exit */}
      <IconButton
        onClick={handleBack}
        sx={{
          position: 'absolute',
          top: 24,
          left: 24,
          bgcolor: 'background.paper',
          border: '1.5px solid',
          borderColor: 'divider',
          boxShadow: '0px 4px 12px rgba(15, 23, 42, 0.03)',
          zIndex: 10,
          '&:hover': {
            bgcolor: 'background.default',
          }
        }}
        aria-label="back to home"
      >
        <ArrowBackIcon />
      </IconButton>

      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 5 }}>
        {/* Brand Header */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, mb: 4 }}>
          <SchoolIcon color="primary" sx={{ fontSize: 44 }} />
          <Typography variant="h4" sx={{ fontWeight: 900, fontFamily: '"Outfit", sans-serif', letterSpacing: '-0.5px' }}>
            Axiom
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
            Master the essentials they didn't teach you
          </Typography>
        </Box>

        <Card sx={{ boxShadow: '0px 16px 40px rgba(15, 23, 42, 0.05)', border: '1.5px solid', borderColor: 'divider' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, fontFamily: '"Outfit", sans-serif', textAlign: 'center' }}>
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 3, fontWeight: 500 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                  }
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                  }
                }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ py: 1.5, mb: 2, fontWeight: 700 }}
              >
                {isSignUp ? 'Register' : 'Sign In'}
              </Button>
            </form>

            <Button
              variant="outlined"
              color="primary"
              fullWidth
              size="large"
              onClick={handleGuestSignIn}
              sx={{ py: 1.5, mb: 2, fontWeight: 700, borderWidth: '2px', '&:hover': { borderWidth: '2px' } }}
            >
              Sign In as Guest
            </Button>

            <Button
              variant="text"
              color="primary"
              fullWidth
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              sx={{ py: 1, mb: 3, fontWeight: 700, textTransform: 'none' }}
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </Button>

            <Divider sx={{ mb: 3, color: 'text.disabled', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Or Continue With
            </Divider>

            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleGuestSignIn}
                  startIcon={<GoogleSvg />}
                  sx={{
                    py: 1.2,
                    borderColor: 'divider',
                    color: 'text.primary',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': { borderColor: 'text.primary', bgcolor: 'transparent' }
                  }}
                >
                  Google
                </Button>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleGuestSignIn}
                  startIcon={<AppleSvg />}
                  sx={{
                    py: 1.2,
                    borderColor: 'divider',
                    color: 'text.primary',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': { borderColor: 'text.primary', bgcolor: 'transparent' }
                  }}
                >
                  Apple
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
