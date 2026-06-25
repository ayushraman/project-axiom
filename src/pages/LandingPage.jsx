import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { Container, Typography, Button, Box, Grid, Card, CardContent, useTheme, Avatar, Paper, Chip } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import StarIcon from '@mui/icons-material/Star';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import SchoolIcon from '@mui/icons-material/School';
import ShieldIcon from '@mui/icons-material/Shield';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GavelIcon from '@mui/icons-material/Gavel';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useApp, ALL_DECKS } from '../context/AppContext';

const iconMap = {
  Shield: ShieldIcon,
  AccountBalance: AccountBalanceIcon,
  Gavel: GavelIcon,
  Favorite: FavoriteIcon,
};

const HERO_PREVIEW_DECK = [
  {
    id: 'hero-1',
    topic: 'Digital Privacy',
    title: 'Phishing Checks',
    fact: 'Always check the actual sender email domain, not just the display name. Attackers spoof names to look legitimate.'
  },
  {
    id: 'hero-2',
    topic: 'Basic Finance',
    title: 'Emergency Fund',
    fact: 'Aim to save 3-6 months of expenses. Keep it in a High-Yield Savings Account (HYSA) for liquidity and yields.'
  },
  {
    id: 'hero-3',
    topic: 'Civic Rights',
    title: 'Right to Silence',
    fact: 'You have the right to remain silent when questioned by law enforcement in many democracies. Assert it politely.'
  }
];

// Interactive Preview Card for the Hero Section
function HeroPreviewCard({ card, onSwipe, parentX }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 150], [-12, 12]);
  const opacity = useTransform(x, [-150, -100, 0, 100, 150], [0.6, 1, 1, 1, 0.6]);

  // Sync drag offset to hero container background transform
  useEffect(() => {
    const unsubscribe = x.on('change', (latest) => {
      parentX.set(latest);
    });
    return () => {
      unsubscribe();
      parentX.set(0);
    };
  }, [x, parentX]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      animate(x, 300, { duration: 0.2 }).then(() => onSwipe(true));
    } else if (info.offset.x < -100) {
      animate(x, -300, { duration: 0.2 }).then(() => onSwipe(false));
    } else {
      animate(x, 0, { type: 'spring', stiffness: 300, damping: 20 });
    }
  };

  // Tinder stamps transforms
  const stampUnsafeOpacity = useTransform(x, [-80, -25, 0], [1, 0, 0]);
  const stampSafeOpacity = useTransform(x, [0, 25, 100], [0, 0, 1]);
  const stampScale = useTransform(x, [-100, 0, 100], [1.15, 0.9, 1.15]);

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -300, right: 300 }}
      style={{
        x,
        rotate,
        opacity,
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 10,
        cursor: 'grab'
      }}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
      initial={{ scale: 0.9, opacity: 0, rotate: -5 }}
      animate={{ scale: 1, opacity: 1, rotate: 0, transition: { duration: 0.3 } }}
      exit={{
        x: x.get() >= 0 ? 300 : -300,
        opacity: 0,
        rotate: x.get() >= 0 ? 15 : -15,
        transition: { duration: 0.2 }
      }}
    >
      <Card
        elevation={4}
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 4,
          bgcolor: 'rgba(25, 20, 38, 0.92)',
          border: '1.5px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          userSelect: 'none',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Unsafe Swipe Stamp Overlay */}
        <Box
          component={motion.div}
          style={{ opacity: stampUnsafeOpacity, scale: stampScale }}
          sx={{
            position: 'absolute',
            top: 24,
            right: 24,
            border: '3px solid #FF5277',
            borderRadius: 2,
            color: '#FF5277',
            px: 2,
            py: 0.5,
            fontWeight: 900,
            fontSize: '0.95rem',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            transform: 'rotate(15deg)',
            pointerEvents: 'none',
            zIndex: 100,
            boxShadow: '0 0 15px rgba(255, 82, 119, 0.4)',
            textShadow: '0 0 5px rgba(255, 82, 119, 0.3)',
          }}
        >
          Unsafe
        </Box>

        {/* Safe Swipe Stamp Overlay */}
        <Box
          component={motion.div}
          style={{ opacity: stampSafeOpacity, scale: stampScale }}
          sx={{
            position: 'absolute',
            top: 24,
            left: 24,
            border: '3px solid #06B6D4',
            borderRadius: 2,
            color: '#06B6D4',
            px: 2,
            py: 0.5,
            fontWeight: 900,
            fontSize: '0.95rem',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            transform: 'rotate(-15deg)',
            pointerEvents: 'none',
            zIndex: 100,
            boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)',
            textShadow: '0 0 5px rgba(6, 182, 212, 0.3)',
          }}
        >
          Safe
        </Box>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Chip
              label={card.topic}
              color="primary"
              size="small"
              sx={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.65rem', px: 1, borderRadius: 2 }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.5px' }}>
              DRAG TO SWIPE
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 900, mt: 1, color: 'text.primary', fontFamily: '"Outfit", sans-serif', letterSpacing: '-0.5px' }}>
            {card.title}
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary', fontSize: '0.95rem', lineHeight: 1.5 }}>
            {card.fact}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700 }}>
            SWIPE TO NEXT PREVIEW
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main' }} />
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'divider' }} />
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'divider' }} />
          </Box>
        </Box>
      </Card>
    </motion.div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { initiateDemo, selectDeck } = useApp();

  // Hero Card Carousel State
  const [heroIndex, setHeroIndex] = useState(0);
  const heroCard = HERO_PREVIEW_DECK[heroIndex];

  // Motion value for hero background updates based on drag
  const heroX = useMotionValue(0);
  const heroBg = useTransform(
    heroX,
    [-100, 0, 100],
    ['rgba(255, 82, 119, 0.16)', 'rgba(255, 255, 255, 0)', 'rgba(6, 182, 212, 0.16)']
  );

  // Handle smooth scroll to hash on load/hash change
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, []);

  const handleHeroSwipe = (understood) => {
    setHeroIndex((prev) => (prev + 1) % HERO_PREVIEW_DECK.length);
  };

  const handleStartDemo = () => {
    const element = document.getElementById('decks');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ overflowX: 'hidden', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box sx={{
        background: 'radial-gradient(rgba(143, 85, 253, 0.08) 1.5px, transparent 0), linear-gradient(145deg, #0C071C 0%, #050308 100%)',
        backgroundSize: '24px 24px, 100% 100%',
        color: '#FFFFFF',
        pt: { xs: 12, md: 18 },
        pb: { xs: 14, md: 22 },
        position: 'relative',
        overflow: 'hidden',
        borderBottomLeftRadius: { xs: 40, md: 80 },
        borderBottomRightRadius: { xs: 40, md: 80 },
      }}>
        {/* Ambient Glowing Blobs */}
        <Box sx={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(143, 85, 253, 0.16) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          animation: 'floatGlow 8s infinite alternate',
          '@keyframes floatGlow': {
            '0%': { transform: 'translate(0, 0) scale(1)' },
            '100%': { transform: 'translate(-30px, 30px) scale(1.08)' }
          }
        }} />
        <Box sx={{
          position: 'absolute',
          bottom: '-20%',
          left: '-15%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
          filter: 'blur(120px)',
          pointerEvents: 'none',
        }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
          <Grid container spacing={{ xs: 8, md: 6 }} sx={{ alignItems: 'center' }}>
            {/* Left Column: Heading and Details */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1.5,
                  px: 2.5,
                  py: 1,
                  borderRadius: '100px',
                  bgcolor: 'rgba(143, 85, 253, 0.08)',
                  border: '1.5px solid rgba(143, 85, 253, 0.15)',
                  mb: 4,
                  boxShadow: '0px 4px 20px rgba(143, 85, 253, 0.05)',
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    boxShadow: '0px 0px 10px #8F55FD',
                    animation: 'pulseGlow 2s infinite',
                    '@keyframes pulseGlow': {
                      '0%': { opacity: 0.4, transform: 'scale(0.9)' },
                      '50%': { opacity: 1, transform: 'scale(1.2)' },
                      '100%': { opacity: 0.4, transform: 'scale(0.9)' },
                    }
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: '#A78BFA',
                    fontWeight: 800,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    fontSize: '0.7rem',
                  }}
                >
                  Interactive Life Skills
                </Typography>
              </Box>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Typography variant="h1" sx={{
                  fontSize: { xs: '2.8rem', sm: '3.8rem', md: '4.8rem' },
                  lineHeight: 1.05,
                  mb: 3,
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: 900,
                  letterSpacing: '-2px',
                  background: 'linear-gradient(135deg, #FFFFFF 10%, #E2E8F0 50%, #8F55FD 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textAlign: 'left'
                }}>
                  Life skills,<br />decoded.
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Typography variant="body1" sx={{
                  mb: 4.5,
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: 'rgba(255, 255, 255, 0.75)',
                  maxWidth: '560px',
                  fontSize: { xs: '1.05rem', md: '1.15rem' },
                  textAlign: 'left'
                }}>
                  Master the essentials traditional schooling skipped. Axiom delivers bite-sized, gamified knowledge decks on digital safety, finance, and legal rights.
                </Typography>
              </motion.div>

              {/* Highlights Feature Cards */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                sx={{ mb: 5 }}
              >
                <Grid container spacing={2}>
                  {[
                    { icon: <FlashOnIcon sx={{ color: '#FF5277' }} />, label: 'Gamified Learning', desc: 'Swipe left / right cards' },
                    { icon: <SchoolIcon sx={{ color: '#8F55FD' }} />, label: 'Bite-Sized Decks', desc: 'Under 2 mins each' },
                    { icon: <ShieldIcon sx={{ color: '#06B6D4' }} />, label: 'UN SDG 4 Aligned', desc: 'Equitable learning access' }
                  ].map((item, idx) => (
                    <Grid size={{ xs: 12, sm: 4 }} key={idx}>
                      <Box sx={{
                        p: 2,
                        borderRadius: '16px',
                        bgcolor: 'rgba(20, 16, 32, 0.45)',
                        border: '1.5px solid rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.8,
                        height: '100%',
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {item.icon}
                          <Typography variant="subtitle2" sx={{ fontWeight: 800, fontSize: '0.85rem' }}>
                            {item.label}
                          </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.4 }}>
                          {item.desc}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleStartDemo}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    px: 4.5,
                    py: 1.8,
                    fontSize: '1.05rem',
                    borderRadius: '24px',
                    boxShadow: '0px 10px 30px rgba(143, 85, 253, 0.35)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #9F6BFF 0%, #8B5CF6 100%)',
                      boxShadow: '0px 15px 35px rgba(143, 85, 253, 0.5)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  Try a Deck (Guest Mode)
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  href="#about"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.18)',
                    color: 'white',
                    px: 3.5,
                    py: 1.8,
                    fontSize: '1.05rem',
                    borderRadius: '24px',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.06)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  Learn More
                </Button>
              </motion.div>
            </Grid>

            {/* Right Column: Device Simulator & Glowing overlays */}
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              
              {/* Top-Left Floating Badge */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: -30, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                sx={{
                  position: 'absolute',
                  top: '50px',
                  left: '-40px',
                  width: '180px',
                  p: 2,
                  borderRadius: 4,
                  bgcolor: 'rgba(143, 85, 253, 0.15)',
                  border: '1.5px solid rgba(143, 85, 253, 0.25)',
                  backdropFilter: 'blur(24px)',
                  boxShadow: '0px 12px 36px rgba(0, 0, 0, 0.4)',
                  zIndex: 10,
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                  <ShieldIcon sx={{ fontSize: 16 }} />
                </Avatar>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#A78BFA', display: 'block' }}>
                    Privacy Alert
                  </Typography>
                  <Typography sx={{ fontSize: '0.68rem', color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}>
                    Phishing up +14%
                  </Typography>
                </Box>
              </Box>

              {/* Bottom-Right Floating Progress Card */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: 30, y: -30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.75 }}
                sx={{
                  position: 'absolute',
                  bottom: '40px',
                  right: '-40px',
                  width: '200px',
                  p: 2,
                  borderRadius: 4,
                  bgcolor: 'rgba(6, 182, 212, 0.12)',
                  border: '1.5px solid rgba(6, 182, 212, 0.25)',
                  backdropFilter: 'blur(24px)',
                  boxShadow: '0px 15px 35px rgba(0, 0, 0, 0.45)',
                  zIndex: 10,
                  display: { xs: 'none', md: 'flex' },
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '0.72rem', fontWeight: 800, color: '#22D3EE' }}>
                    Streak Active
                  </Typography>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 900 }}>🔥 5 Days</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <Box sx={{ flexGrow: 1, height: 5, bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2, overflow: 'hidden' }}>
                    <Box sx={{ width: '80%', height: '100%', bgcolor: '#06B6D4' }} />
                  </Box>
                  <Typography sx={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 800 }}>80%</Typography>
                </Box>
              </Box>

              {/* Dynamic Glow Shift Behind Card Stack */}
              <Box sx={{
                position: 'absolute',
                inset: -30,
                zIndex: 0,
                pointerEvents: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <motion.div style={{ background: heroBg, width: '120%', height: '120%', borderRadius: '50%', filter: 'blur(50px)' }} />
              </Box>

              {/* Glass Smartphone Mockup Frame */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                sx={{
                  position: 'relative',
                  width: '320px',
                  height: '520px',
                  borderRadius: '44px',
                  border: '3px solid rgba(255, 255, 255, 0.12)',
                  bgcolor: 'rgba(10, 7, 20, 0.65)',
                  backdropFilter: 'blur(24px)',
                  boxShadow: '0px 35px 80px rgba(0, 0, 0, 0.55)',
                  p: '16px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  zIndex: 5,
                  '&::before': { // Dynamic Island speaker pill
                    content: '""',
                    position: 'absolute',
                    top: 12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '90px',
                    height: '22px',
                    borderRadius: '11px',
                    bgcolor: '#08050E',
                    zIndex: 20,
                  }
                }}
              >
                {/* Status Bar */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2.5, pt: 0.5, pb: 1.5, zIndex: 18, color: 'rgba(255, 255, 255, 0.6)', userSelect: 'none' }}>
                  <Typography sx={{ fontSize: '0.72rem', fontWeight: 800, fontFamily: '"Inter", sans-serif' }}>9:41</Typography>
                  <Box sx={{ display: 'flex', gap: 0.8, alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem' }}>📶</span>
                    <span style={{ fontSize: '0.75rem' }}>🛜</span>
                    <span style={{ fontSize: '0.75rem' }}>🔋</span>
                  </Box>
                </Box>

                {/* Inner Phone Screen Content */}
                <Box sx={{ position: 'relative', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  
                  {/* Central Card Stack */}
                  <Box sx={{
                    position: 'relative',
                    width: '100%',
                    height: '350px',
                    mt: 2,
                    perspective: '1000px',
                    zIndex: 5,
                  }}>
                    {/* Visual Stack Card Underneath */}
                    <Card sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      top: 12,
                      left: 0,
                      transform: 'scale(0.95) rotate(-3deg)',
                      opacity: 0.25,
                      bgcolor: 'rgba(255, 255, 255, 0.08)',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      boxShadow: 'none',
                      pointerEvents: 'none',
                      zIndex: 1,
                      borderRadius: '24px',
                    }} />

                    {/* Top Swiping Card */}
                    <AnimatePresence initial={false}>
                      <HeroPreviewCard
                        key={heroCard.id}
                        card={heroCard}
                        onSwipe={handleHeroSwipe}
                        parentX={heroX}
                      />
                    </AnimatePresence>
                  </Box>

                  {/* Swipe Help/Footer */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, alignItems: 'center', mb: 1, zIndex: 10, userSelect: 'none' }}>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.35)', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '1px' }}>
                      SWIPE SAFE OR UNSAFE
                    </Typography>
                    {/* Home Indicator */}
                    <Box sx={{ width: 100, height: 4, bgcolor: 'rgba(255, 255, 255, 0.18)', borderRadius: 2, mt: 1 }} />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: 14, bgcolor: 'background.default', borderBottom: '1px solid', borderColor: 'divider', position: 'relative' }}>
        {/* Subtle grid background */}
        <Box sx={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(rgba(143, 85, 253, 0.03) 1px, transparent 0)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none',
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 5 }}>
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: '2px', fontSize: '0.9rem' }}>
              How It Works
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 900, mt: 1, mb: 2, fontFamily: '"Outfit", sans-serif', letterSpacing: '-1.5px', fontSize: { xs: '2.2rem', md: '3.2rem' } }}>
              Learn In 4 Simple Steps
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Our swiping mechanism provides micro-feedback that locks details into memory far better than passive reading.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {/* Step 1 */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{
                height: '100%',
                p: 3.5,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                bgcolor: 'rgba(20, 16, 32, 0.45)',
                borderBottom: '4px solid #8F55FD',
                '&:hover': {
                  borderColor: '#8F55FD',
                  boxShadow: '0px 16px 36px rgba(143, 85, 253, 0.1)',
                }
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: 'rgba(143, 85, 253, 0.08)', color: 'primary.light', width: 36, height: 36, fontWeight: 900, fontSize: '0.95rem', border: '1px solid rgba(143, 85, 253, 0.2)' }}>01</Avatar>
                  <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 800 }}>DECK</Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 850, fontFamily: '"Outfit", sans-serif', letterSpacing: '-0.3px' }}>
                  Choose a Deck
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
                  Select from curated subjects like Digital Privacy, Personal Finance, or Civic Rights.
                </Typography>
              </Card>
            </Grid>

            {/* Step 2 */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{
                height: '100%',
                p: 3.5,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                bgcolor: 'rgba(20, 16, 32, 0.45)',
                borderBottom: '4px solid #FF5277',
                '&:hover': {
                  borderColor: '#FF5277',
                  boxShadow: '0px 16px 36px rgba(255, 82, 119, 0.1)',
                }
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: 'rgba(255, 82, 119, 0.08)', color: 'secondary.light', width: 36, height: 36, fontWeight: 900, fontSize: '0.95rem', border: '1px solid rgba(255, 82, 119, 0.2)' }}>02</Avatar>
                  <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 800 }}>READ</Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 850, fontFamily: '"Outfit", sans-serif', letterSpacing: '-0.3px' }}>
                  Read Scenario
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
                  Evaluate short, direct scenario prompts detailing everyday security or financial actions.
                </Typography>
              </Card>
            </Grid>

            {/* Step 3 */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{
                height: '100%',
                p: 3.5,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                bgcolor: 'rgba(20, 16, 32, 0.45)',
                borderBottom: '4px solid #06B6D4',
                '&:hover': {
                  borderColor: '#06B6D4',
                  boxShadow: '0px 16px 36px rgba(6, 182, 212, 0.1)',
                }
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: 'rgba(6, 182, 212, 0.08)', color: 'success.light', width: 36, height: 36, fontWeight: 900, fontSize: '0.95rem', border: '1px solid rgba(6, 182, 212, 0.2)' }}>03</Avatar>
                  <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 800 }}>SWIPE</Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 850, fontFamily: '"Outfit", sans-serif', letterSpacing: '-0.3px' }}>
                  Swipe to Decide
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
                  Swipe Left for Unsafe practices or Right for Safe. Active decisions locks details into memory.
                </Typography>
              </Card>
            </Grid>

            {/* Step 4 */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{
                height: '100%',
                p: 3.5,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                bgcolor: 'rgba(20, 16, 32, 0.45)',
                borderBottom: '4px solid #A78BFA',
                '&:hover': {
                  borderColor: '#A78BFA',
                  boxShadow: '0px 16px 36px rgba(167, 139, 250, 0.1)',
                }
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: 'rgba(167, 139, 250, 0.08)', color: 'primary.light', width: 36, height: 36, fontWeight: 900, fontSize: '0.95rem', border: '1px solid rgba(167, 139, 250, 0.2)' }}>04</Avatar>
                  <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 800 }}>LEARN</Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 850, fontFamily: '"Outfit", sans-serif', letterSpacing: '-0.3px' }}>
                  Master the Facts
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
                  Analyze scorecard detailed breakdowns. Learn the logic behind correct decisions instantly.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Choose Your Knowledge Deck Section */}
      <Box id="decks" sx={{ py: 14, bgcolor: 'background.default', borderBottom: '1px solid', borderColor: 'divider', position: 'relative' }}>
        {/* Glow Sphere behind Decks */}
        <Box sx={{
          position: 'absolute',
          top: '30%',
          left: '25%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(143, 85, 253, 0.06) 0%, transparent 60%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 5 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: '2px', fontSize: '0.9rem' }}>
              Learning Hub
            </Typography>
            <Typography variant="h2" sx={{
              fontWeight: 900,
              mt: 1,
              mb: 3,
              fontFamily: '"Outfit", sans-serif',
              letterSpacing: '-1.5px',
              fontSize: { xs: '2.2rem', md: '3.2rem' }
            }}>
              Choose Your Knowledge Deck
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Select a curated topic below. Each deck contains interactive scenarios designed to build practical life skills in under two minutes.
            </Typography>
          </Box>

          <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
            {ALL_DECKS.map((deckItem, index) => {
              const IconComponent = iconMap[deckItem.icon] || ShieldIcon;
              return (
                <Grid size={{ xs: 12, sm: 6 }} key={deckItem.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      border: '1.5px solid rgba(255, 255, 255, 0.04)',
                      boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.35)',
                      bgcolor: 'rgba(20, 16, 32, 0.45)',
                      p: 3,
                      gap: 2,
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: `0px 20px 48px ${deckItem.color}22`,
                        borderColor: deckItem.color,
                      }
                    }}
                  >
                    <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                      {/* Avatar & Scenarios Chip */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                        <Avatar
                          sx={{
                            bgcolor: `${deckItem.color}15`,
                            color: deckItem.color,
                            width: 48,
                            height: 48,
                            borderRadius: 3,
                            border: `1px solid ${deckItem.color}33`,
                          }}
                        >
                          <IconComponent sx={{ fontSize: 24 }} />
                        </Avatar>
                        <Typography
                          variant="caption"
                          sx={{
                            color: deckItem.color,
                            fontWeight: 800,
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase',
                            bgcolor: `${deckItem.color}12`,
                            border: `1.5px solid ${deckItem.color}25`,
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
                    <Box sx={{ mt: 1 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        size="medium"
                        onClick={() => {
                          selectDeck(deckItem.id);
                          navigate('/deck');
                        }}
                        endIcon={<PlayArrowIcon />}
                        sx={{
                          bgcolor: deckItem.color,
                          color: '#FFFFFF',
                          py: 1.4,
                          fontSize: '0.9rem',
                          fontWeight: 750,
                          borderRadius: '24px',
                          '&:hover': {
                            bgcolor: deckItem.color,
                            opacity: 0.9,
                            boxShadow: `0px 8px 24px ${deckItem.color}50`,
                          },
                          transition: 'all 0.2s ease',
                        }}
                      >
                        Start Swiping
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* About & UN SDG 4 Impact Section */}
      <Box id="about" sx={{ py: 14, bgcolor: 'background.default', position: 'relative' }}>
        <Box sx={{
          position: 'absolute',
          top: '-10%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, transparent 60%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 5 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Grid container spacing={6} sx={{ alignItems: 'stretch' }}>
              {/* Left Column: Mission Description */}
              <Grid size={{ xs: 12, md: 7 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: '2px', fontSize: '0.9rem' }}>
                  Our Mission
                </Typography>
                <Typography variant="h2" sx={{ fontWeight: 900, mt: 1, mb: 3, fontFamily: '"Outfit", sans-serif', letterSpacing: '-1px', fontSize: { xs: '2.2rem', md: '3.2rem' } }}>
                  Bridging the Knowledge Gap
                </Typography>
                <Typography variant="body1" sx={{
                  fontSize: '1.15rem',
                  lineHeight: 1.8,
                  color: 'text.secondary',
                  mb: 4,
                }}>
                  We believe that quality education extends beyond standard academic borders. Axiom is designed to empower individuals with the practical life knowledge required to thrive in the modern world. Our platform proudly supports the United Nations Sustainable Development Goal 4 (Quality Education) by ensuring equitable access to lifelong learning opportunities.
                </Typography>
                <Box sx={{ display: 'flex', gap: 4, mt: 2, flexWrap: 'wrap' }}>
                  <Paper elevation={0} sx={{ p: 2.5, bgcolor: 'rgba(143, 85, 253, 0.04)', border: '1px dashed', borderColor: 'primary.light', display: 'flex', alignItems: 'center', gap: 1.5, borderRadius: '24px' }}>
                    <Avatar sx={{ bgcolor: 'primary.main', color: 'white', width: 40, height: 40 }}>
                      <StarIcon />
                    </Avatar>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>UN SDG 4 Aligned</Typography>
                  </Paper>
                  <Paper elevation={0} sx={{ p: 2.5, bgcolor: 'rgba(255, 82, 119, 0.04)', border: '1px dashed', borderColor: 'secondary.light', display: 'flex', alignItems: 'center', gap: 1.5, borderRadius: '24px' }}>
                    <Avatar sx={{ bgcolor: 'secondary.main', color: 'white', width: 40, height: 40 }}>
                      <FlashOnIcon />
                    </Avatar>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>No Sign-Up Required</Typography>
                  </Paper>
                </Box>
              </Grid>

              {/* Right Column: Available Decks Showcase Card */}
              <Grid size={{ xs: 12, md: 5 }}>
                <Card sx={{
                  height: '100%',
                  bgcolor: 'rgba(20, 16, 32, 0.45)',
                  border: '1.5px solid rgba(255, 255, 255, 0.04)',
                  p: 4,
                  boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.35)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                  <Typography variant="h5" sx={{ fontWeight: 900, mb: 3.5, fontFamily: '"Outfit", sans-serif', letterSpacing: '-0.5px' }}>
                    Available Learning Decks
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Deck 1 */}
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2.5,
                      p: 2,
                      borderRadius: 4,
                      borderLeft: '4px solid #8F55FD',
                      bgcolor: 'rgba(143, 85, 253, 0.03)',
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'translateX(4px)' }
                    }}>
                      <Avatar sx={{ bgcolor: 'rgba(143, 85, 253, 0.08)', color: '#8F55FD', width: 44, height: 44, border: '1px solid rgba(143, 85, 253, 0.2)' }}>
                        <ShieldIcon sx={{ fontSize: 22 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Digital Privacy 101</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', lineHeight: 1.4 }}>Recognize phishing traps, app trackers, and safe verification habits.</Typography>
                      </Box>
                    </Box>

                    {/* Deck 2 */}
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2.5,
                      p: 2,
                      borderRadius: 4,
                      borderLeft: '4px solid #06B6D4',
                      bgcolor: 'rgba(6, 182, 212, 0.03)',
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'translateX(4px)' }
                    }}>
                      <Avatar sx={{ bgcolor: 'rgba(6, 182, 212, 0.08)', color: '#06B6D4', width: 44, height: 44, border: '1px solid rgba(6, 182, 212, 0.2)' }}>
                        <AccountBalanceIcon sx={{ fontSize: 22 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Basic Finance 101</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', lineHeight: 1.4 }}>Master emergency savings limits, interest, and credit scores.</Typography>
                      </Box>
                    </Box>

                    {/* Deck 3 */}
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2.5,
                      p: 2,
                      borderRadius: 4,
                      borderLeft: '4px solid #A78BFA',
                      bgcolor: 'rgba(167, 139, 250, 0.03)',
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'translateX(4px)' }
                    }}>
                      <Avatar sx={{ bgcolor: 'rgba(167, 139, 250, 0.08)', color: '#A78BFA', width: 44, height: 44, border: '1px solid rgba(167, 139, 250, 0.2)' }}>
                        <GavelIcon sx={{ fontSize: 22 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Civic Rights 101</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', lineHeight: 1.4 }}>Learn citizen protection laws and rights during traffic stops.</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Features Grid Section */}
      <Box id="features" sx={{ py: 14, bgcolor: 'background.default', position: 'relative' }}>
        <Box sx={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(143, 85, 253, 0.05) 0%, transparent 60%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 5 }}>
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: '2px', fontSize: '0.9rem' }}>
              Features
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 900, mt: 1, fontFamily: '"Outfit", sans-serif', letterSpacing: '-1px' }}>
              Designed for Retention
            </Typography>
          </Box>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
              {/* Feature 1 */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderTop: '4px solid #8F55FD',
                  bgcolor: 'rgba(20, 16, 32, 0.45)',
                  borderLeft: '1.5px solid rgba(255, 255, 255, 0.04)',
                  borderRight: '1.5px solid rgba(255, 255, 255, 0.04)',
                  borderBottom: '1.5px solid rgba(255, 255, 255, 0.04)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0px 16px 40px rgba(143, 85, 253, 0.15)',
                    borderColor: 'rgba(143, 85, 253, 0.3)',
                  },
                }}>
                  <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Avatar sx={{ bgcolor: 'rgba(143, 85, 253, 0.08)', mb: 3, width: 56, height: 56, color: '#8F55FD', border: '1px solid rgba(143, 85, 253, 0.2)' }}>
                      <FlashOnIcon sx={{ fontSize: 30 }} />
                    </Avatar>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 800, mb: 2, fontFamily: '"Outfit", sans-serif', letterSpacing: '-0.5px' }}>
                      Frictionless Learning
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                      Ditch the long videos. Our swipeable knowledge decks let you master complex life topics in under two minutes.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Feature 2 */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderTop: '4px solid #FF5277',
                  bgcolor: 'rgba(20, 16, 32, 0.45)',
                  borderLeft: '1.5px solid rgba(255, 255, 255, 0.04)',
                  borderRight: '1.5px solid rgba(255, 255, 255, 0.04)',
                  borderBottom: '1.5px solid rgba(255, 255, 255, 0.04)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0px 16px 40px rgba(255, 82, 119, 0.15)',
                    borderColor: 'rgba(255, 82, 119, 0.3)',
                  },
                }}>
                  <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Avatar sx={{ bgcolor: 'rgba(255, 82, 119, 0.08)', mb: 3, width: 56, height: 56, color: '#FF5277', border: '1px solid rgba(255, 82, 119, 0.2)' }}>
                      <AutorenewIcon sx={{ fontSize: 30 }} />
                    </Avatar>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 800, mb: 2, fontFamily: '"Outfit", sans-serif', letterSpacing: '-0.5px' }}>
                      Interactive Retention
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                      Swipe left for unsafe and right for safe. Active testing reinforces information retention far better than passive reading.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Feature 3 */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderTop: '4px solid #06B6D4',
                  bgcolor: 'rgba(20, 16, 32, 0.45)',
                  borderLeft: '1.5px solid rgba(255, 255, 255, 0.04)',
                  borderRight: '1.5px solid rgba(255, 255, 255, 0.04)',
                  borderBottom: '1.5px solid rgba(255, 255, 255, 0.04)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0px 16px 40px rgba(6, 182, 212, 0.15)',
                    borderColor: 'rgba(6, 182, 212, 0.3)',
                  },
                }}>
                  <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Avatar sx={{ bgcolor: 'rgba(6, 182, 212, 0.08)', mb: 3, width: 56, height: 56, color: '#06B6D4', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
                      <CloudOffIcon sx={{ fontSize: 30 }} />
                    </Avatar>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 800, mb: 2, fontFamily: '"Outfit", sans-serif', letterSpacing: '-0.5px' }}>
                      Offline Access
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                      Learn on the go. Local device caching ensures your active learning decks are accessible even when offline or on low bandwidth.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Feature 4 */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderTop: '4px solid #A78BFA',
                  bgcolor: 'rgba(20, 16, 32, 0.45)',
                  borderLeft: '1.5px solid rgba(255, 255, 255, 0.04)',
                  borderRight: '1.5px solid rgba(255, 255, 255, 0.04)',
                  borderBottom: '1.5px solid rgba(255, 255, 255, 0.04)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0px 16px 40px rgba(167, 139, 250, 0.15)',
                    borderColor: 'rgba(167, 139, 250, 0.3)',
                  },
                }}>
                  <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Avatar sx={{ bgcolor: 'rgba(167, 139, 250, 0.06)', mb: 3, width: 56, height: 56, color: '#A78BFA', border: '1px solid rgba(167, 139, 250, 0.2)' }}>
                      <StorageIcon sx={{ fontSize: 30 }} />
                    </Avatar>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 800, mb: 2, fontFamily: '"Outfit", sans-serif', letterSpacing: '-0.5px' }}>
                      Zero Barriers
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                      Learning should be open. Jump straight into our Guest Mode and start swiping immediately—no accounts required.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}
