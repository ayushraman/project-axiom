import React from 'react';
import { Outlet, useNavigate, Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Box, Container } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SchoolIcon from '@mui/icons-material/School';
import { useApp } from '../context/AppContext';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { currentIndex, deck, isCompleted } = useApp();

  const handleClose = () => {
    navigate('/#decks');
  };

  const getProgressText = () => {
    if (!deck || deck.length === 0) return 'Demo Mode';
    if (isCompleted) return 'Deck Complete';
    return `Card ${currentIndex + 1} of ${deck.length}`;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Minimalist Top Bar */}
      <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Container maxWidth="md">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: 64 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'inherit' }} component={RouterLink} to="/">
              <SchoolIcon color="primary" sx={{ fontSize: 24 }} />
              <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: '"Outfit", sans-serif' }}>
                Axiom
              </Typography>
            </Box>

            {/* Dynamic Progress indicator container */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography id="deck-progress-text" variant="subtitle2" color="text.secondary" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.75rem' }}>
                {deck && deck[0]?.topic ? deck[0].topic : 'Axiom Deck'}
              </Typography>
              <Typography variant="caption" color="text.disabled" sx={{ fontWeight: 600 }}>
                {getProgressText()}
              </Typography>
            </Box>

            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Focused Canvas */}
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4, position: 'relative', overflow: 'hidden' }}>
        <Container maxWidth="md" sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
