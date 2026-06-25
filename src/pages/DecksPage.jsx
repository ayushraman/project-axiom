import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Typography, Grid, Card, CardContent, Button, Box, Avatar, useTheme } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GavelIcon from '@mui/icons-material/Gavel';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useApp, ALL_DECKS } from '../context/AppContext';

const iconMap = {
  Shield: ShieldIcon,
  AccountBalance: AccountBalanceIcon,
  Gavel: GavelIcon,
  Favorite: FavoriteIcon,
};

export default function DecksPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { selectDeck } = useApp();

  const handleStartDeck = (deckId) => {
    selectDeck(deckId);
    navigate('/deck');
  };

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default', minHeight: '80vh' }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: '2px', fontSize: '0.9rem' }}>
              Learning Hub
            </Typography>
            <Typography variant="h2" sx={{
              fontWeight: 900,
              mt: 1,
              mb: 3,
              fontFamily: '"Outfit", sans-serif',
              letterSpacing: '-1.5px',
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}>
              Choose Your Knowledge Deck
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto', fontSize: '1.1rem', lineHeight: 1.6 }}>
              Select a curated topic below. Each deck contains interactive scenarios designed to build practical life skills in under two minutes.
            </Typography>
          </motion.div>
        </Box>

        {/* Decks Grid */}
        <Grid container spacing={3}>
          {ALL_DECKS.map((deckItem, index) => {
            const IconComponent = iconMap[deckItem.icon] || ShieldIcon;
            return (
              <Grid size={{ xs: 12, sm: 6 }} key={deckItem.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      border: '1.5px solid',
                      borderColor: 'divider',
                      boxShadow: '0px 8px 24px rgba(15, 23, 42, 0.02)',
                      p: 3,
                      gap: 2,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: `0px 16px 36px ${deckItem.color}15`,
                        borderColor: deckItem.color,
                      }
                    }}
                  >
                    <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                      {/* Avatar & Scenarios Chip */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                        <Avatar
                          sx={{
                            bgcolor: deckItem.bgLight,
                            color: deckItem.color,
                            width: 48,
                            height: 48,
                            borderRadius: 3
                          }}
                        >
                          <IconComponent sx={{ fontSize: 24 }} />
                        </Avatar>
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'text.secondary',
                            fontWeight: 800,
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase',
                            bgcolor: 'action.hover',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 2,
                            fontSize: '0.7rem'
                          }}
                        >
                          {deckItem.cards.length} Scenarios
                        </Typography>
                      </Box>

                      {/* Header and description */}
                      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, fontFamily: '"Outfit", sans-serif', letterSpacing: '-0.5px' }}>
                        {deckItem.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                        {deckItem.description}
                      </Typography>
                    </CardContent>

                    {/* Action Button */}
                    <Box>
                      <Button
                        variant="contained"
                        fullWidth
                        size="medium"
                        onClick={() => handleStartDeck(deckItem.id)}
                        endIcon={<PlayArrowIcon />}
                        sx={{
                          bgcolor: deckItem.color,
                          color: '#FFFFFF',
                          py: 1.2,
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          '&:hover': {
                            bgcolor: deckItem.color,
                            opacity: 0.9,
                            boxShadow: `0px 6px 20px ${deckItem.color}35`,
                          },
                          transition: 'all 0.2s ease',
                        }}
                      >
                        Start Swiping
                      </Button>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
