import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Divider,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { useApp } from '../context/AppContext';

export default function LandingLayout() {
  const navigate = useNavigate();
  const { initiateDemo } = useApp();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id) => {
    if (window.location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  const handleTryDeck = () => {
    handleScrollTo('decks');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Floating Pill Navbar */}
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          top: scrolled ? 12 : 20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)',
          maxWidth: 'lg',
          borderRadius: scrolled ? '20px' : '28px',
          border: '1.5px solid',
          borderColor: scrolled ? 'divider' : 'rgba(255, 255, 255, 0.12)',
          bgcolor: scrolled ? 'rgba(17, 24, 39, 0.85)' : 'rgba(11, 15, 25, 0.5)',
          backdropFilter: 'blur(16px)',
          boxShadow: scrolled ? '0px 8px 32px rgba(0, 0, 0, 0.25)' : 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 1100,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'inherit' }} component={RouterLink} to="/">
              <SchoolIcon color="primary" sx={{ fontSize: 32 }} />
              <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.5px', fontFamily: '"Outfit", sans-serif' }}>
                Axiom
              </Typography>
            </Box>

            {/* Nav Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              <Button onClick={() => handleScrollTo('about')} color="inherit" sx={{ fontWeight: 600, px: 2, py: 1, borderRadius: 20 }}>About</Button>
              <Button onClick={() => handleScrollTo('features')} color="inherit" sx={{ fontWeight: 600, px: 2, py: 1, borderRadius: 20 }}>Features</Button>
            </Box>

            {/* Auth Buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button variant="outlined" color="primary" onClick={() => navigate('/login')} sx={{ borderRadius: 20, px: 3 }}>
                Login
              </Button>
              <Button variant="contained" color="primary" onClick={handleTryDeck} sx={{ borderRadius: 20, px: 3 }}>
                Try a Deck
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Spacer to push hero content below fixed navbar */}
      <Box sx={{ height: 104 }} />

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6, borderTop: '1px solid', borderColor: 'divider', mt: 'auto' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <SchoolIcon color="primary" sx={{ fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: '"Outfit", sans-serif' }}>
                  Axiom
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
                Empowering individuals with essential, real-world life skills. Bridging the gap in structured traditional education.
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, md: 4 }}>
              <Typography variant="subtitle2" color="text.primary" sx={{ fontWeight: 700, mb: 2 }}>
                Platform
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button variant="text" size="small" component={RouterLink} to="/" sx={{ justifyContent: 'flex-start', color: 'text.secondary', p: 0 }}>Home</Button>
                <Button variant="text" size="small" onClick={handleTryDeck} sx={{ justifyContent: 'flex-start', color: 'text.secondary', p: 0 }}>Try a Deck</Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, md: 4 }}>
              <Typography variant="subtitle2" color="text.primary" sx={{ fontWeight: 700, mb: 2 }}>
                Our Focus
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Axiom provides bite-sized lessons designed to help you navigate modern life, from finance basics to digital safety.
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>

            <Typography variant="body2" color="text.primary" sx={{ fontWeight: 600 }}>
              Developed by Ayush Raman. WebD Final Project Lenovo
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
