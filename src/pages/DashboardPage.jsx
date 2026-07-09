import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { Box, Card, CardContent, Typography, Button, IconButton, Chip, Grid, Paper, Avatar, Divider, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import ReplayIcon from '@mui/icons-material/Replay';
import HomeIcon from '@mui/icons-material/Home';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

// Child component to isolate motion values per card
function SwipeCard({ card, swipeTrigger, onSwipeComplete, parentX, currentIndex, deckLength }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0.6, 1, 1, 1, 0.6]);

  // Sync local drag offset to parentX for background color transitions
  useEffect(() => {
    const unsubscribe = x.on('change', (latest) => {
      parentX.set(latest);
    });
    return () => {
      unsubscribe();
      // Smoothly animate parentX back to 0 when card unmounts
      animate(parentX, 0, { duration: 0.2 });
    };
  }, [x, parentX]);

  // Listen to parent swipe triggers (from action buttons)
  useEffect(() => {
    if (swipeTrigger === 'left') {
      animate(x, -400, { duration: 0.25 }).then(() => {
        onSwipeComplete(false); // Choice: false (Unsafe)
      });
    } else if (swipeTrigger === 'right') {
      animate(x, 400, { duration: 0.25 }).then(() => {
        onSwipeComplete(true); // Choice: true (Safe)
      });
    }
  }, [swipeTrigger, x, onSwipeComplete]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 120) {
      animate(x, 400, { duration: 0.2 }).then(() => {
        onSwipeComplete(true); // Dragged right = Safe
      });
    } else if (info.offset.x < -120) {
      animate(x, -400, { duration: 0.2 }).then(() => {
        onSwipeComplete(false); // Dragged left = Unsafe
      });
    } else {
      // Snap back to center smoothly
      animate(x, 0, { type: 'spring', stiffness: 300, damping: 22 });
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -600, right: 600 }} // Wide constraints to allow natural, loose drag physics
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
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, transition: { duration: 0.2 } }}
      exit={{
        x: x.get() >= 0 ? 400 : -400,
        opacity: 0,
        rotate: x.get() >= 0 ? 25 : -25,
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
          bgcolor: 'background.paper',
          border: '2px solid',
          borderColor: 'divider',
          userSelect: 'none',
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Chip
              label={card.topic}
              color="primary"
              size="small"
              sx={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.7rem', px: 1, borderRadius: 2 }}
            />
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(79, 70, 229, 0.08)', color: 'primary.main' }}>
              <InfoIcon sx={{ fontSize: 18 }} />
            </Avatar>
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 950, mb: 2, fontFamily: '"Outfit", sans-serif', letterSpacing: '-0.5px', lineHeight: 1.25 }}>
            {card.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.05rem', lineHeight: 1.6 }}>
            {card.fact}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 800, letterSpacing: '0.5px' }}>
            LEFT (UNSAFE) • RIGHT (SAFE)
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {Array.from({ length: deckLength }).map((_, idx) => (
              <Box
                key={idx}
                sx={{
                  width: idx === currentIndex ? 16 : 8,
                  height: 8,
                  borderRadius: 4,
                  bgcolor: idx === currentIndex ? 'primary.main' : idx < currentIndex ? '#E2E8F0' : 'divider',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </Box>
        </Box>
      </Card>
    </motion.div>
  );
}

export default function DashboardPage() {
  const {
    deck,
    currentIndex,
    swipeCard,
    resetDeck,
    isCompleted,
    score,
    swipeHistory,
    activeDeckId
  } = useApp();
  
  const navigate = useNavigate();
  const [swipeTrigger, setSwipeTrigger] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);

  // Fetch leaderboard when deck is completed
  useEffect(() => {
    if (isCompleted) {
      setLoadingLeaderboard(true);
      fetch('http://localhost:5000/api/leaderboard')
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch leaderboard');
          return res.json();
        })
        .then(data => {
          setLeaderboard(data);
          setLoadingLeaderboard(false);
        })
        .catch(err => {
          console.error(err);
          setLoadingLeaderboard(false);
        });
    }
  }, [isCompleted]);

  // Shared parent motion value for color shifting
  const parentX = useMotionValue(0);

  // Screen background color transformation based on active drag
  const backgroundColor = useTransform(
    parentX,
    [-150, 0, 150],
    ['rgba(255, 107, 107, 0.15)', 'rgba(255, 255, 255, 0)', 'rgba(74, 222, 128, 0.15)']
  );

  // Trigger confetti upon completion
  useEffect(() => {
    if (isCompleted) {
      // Primary splash
      confetti({
        particleCount: 150,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#4F46E5', '#FF6B6B', '#34D399', '#FBBF24']
      });
      // Delay side splashes
      setTimeout(() => {
        confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } });
      }, 250);
      setTimeout(() => {
        confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 } });
      }, 400);
    }
  }, [isCompleted]);

  const handleSwipeComplete = (understood) => {
    swipeCard(understood);
    setSwipeTrigger(null);
  };

  const handleButtonSwipe = (direction) => {
    setSwipeTrigger(direction);
  };

  if (!deck || deck.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', zIndex: 10 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>No Active Deck</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Please select a learning deck to begin swiping.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/decks')} startIcon={<HomeIcon />}>
          Choose a Deck
        </Button>
      </Box>
    );
  }

  // Completion view
  if (isCompleted) {
    const percentage = Math.round((score / deck.length) * 100);
    const correctCount = score;

    return (
      <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto', textAlign: 'center', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <Card sx={{ p: 4, boxShadow: '0px 16px 40px rgba(79, 70, 229, 0.12)' }}>
            <CardContent>
              <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: '2px' }}>
                DECK COMPLETE
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 900, mt: 1, mb: 1, fontFamily: '"Outfit", sans-serif' }}>
                {percentage}% Score
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
                You correctly identified {correctCount} of {deck.length} scenarios.
              </Typography>

              {/* Progress bar */}
              <Box sx={{ width: '100%', height: 12, bgcolor: '#F1F5F9', borderRadius: 6, mb: 4, overflow: 'hidden' }}>
                <Box sx={{ width: `${percentage}%`, height: '100%', bgcolor: percentage >= 60 ? '#22C55E' : 'primary.main', borderRadius: 6, transition: 'width 1s ease' }} />
              </Box>

              {/* Breakdown List */}
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2, textAlign: 'left' }}>
                Scenario Details & Explanations:
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 4, maxHeight: 260, overflowY: 'auto', pr: 0.5 }}>
                {deck.map((card) => {
                  const answered = swipeHistory.find(h => h.cardId === card.id);
                  const isCorrect = answered ? answered.isCorrect : false;

                  return (
                    <Paper
                      key={card.id}
                      elevation={0}
                      sx={{
                        p: 2.5,
                        borderRadius: 3,
                        border: '1px solid',
                        borderColor: isCorrect ? 'success.light' : 'error.light',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5,
                        bgcolor: isCorrect ? 'rgba(34, 197, 94, 0.02)' : 'rgba(239, 68, 68, 0.02)',
                        textAlign: 'left'
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'nowrap', gap: 1.5 }}>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 800, fontSize: '0.95rem' }}>
                            {card.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                            Practice is: <strong style={{ color: card.isSafe ? '#22C55E' : '#EF4444' }}>{card.isSafe ? 'SAFE' : 'UNSAFE'}</strong>
                          </Typography>
                        </Box>
                        <Chip
                          label={isCorrect ? "Correct" : "Incorrect"}
                          color={isCorrect ? "success" : "error"}
                          size="small"
                          sx={{ fontWeight: 800, borderRadius: 2 }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ bgcolor: 'background.paper', p: 1.5, borderRadius: 2, borderLeft: '3px solid', borderColor: isCorrect ? '#22C55E' : '#EF4444', fontSize: '0.85rem', lineHeight: 1.5 }}>
                        <strong>Facts:</strong> {card.explanation}
                      </Typography>
                    </Paper>
                  );
                })}
              </Box>

              {/* Controls */}
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid size={{ xs: 6 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    size="large"
                    startIcon={<ReplayIcon />}
                    onClick={resetDeck}
                    sx={{ py: 1.5 }}
                  >
                    Try Again
                  </Button>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    startIcon={<HomeIcon />}
                    onClick={() => navigate('/')}
                    sx={{ py: 1.5 }}
                  >
                    All Decks
                  </Button>
                </Grid>
              </Grid>

              {/* Leaderboard Widget */}
              <Divider sx={{ my: 3 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2, textAlign: 'left', display: 'flex', alignItems: 'center', gap: 1 }}>
                🏆 Global Leaderboard (Top Scores)
              </Typography>
              {loadingLeaderboard ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                  <CircularProgress size={24} color="primary" />
                </Box>
              ) : leaderboard.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ py: 1, fontStyle: 'italic', textAlign: 'left' }}>
                  No scores submitted yet. Complete this session to rank!
                </Typography>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxHeight: 200, overflowY: 'auto', pr: 0.5 }}>
                  {leaderboard.map((entry, idx) => (
                    <Box
                      key={entry.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 1.2,
                        borderRadius: 2,
                        bgcolor: 'action.hover',
                        border: '1px solid',
                        borderColor: 'divider',
                        textAlign: 'left'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.main', minWidth: 20 }}>
                          #{idx + 1}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {entry.username}
                        </Typography>
                        <Chip
                          label={entry.deckId.replace('ai_', 'AI ').toUpperCase()}
                          size="small"
                          sx={{ height: 18, fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase' }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 800 }}>
                        {entry.score}/{entry.total} ({entry.percentage}%)
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </Box>
    );
  }

  // Active stack view
  const currentCard = deck[currentIndex];
  const nextCard = currentIndex + 1 < deck.length ? deck[currentIndex + 1] : null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', position: 'relative' }}>
      {/* Background color shifting wrapper */}
      <Box sx={{ position: 'absolute', inset: -100, zIndex: 0, pointerEvents: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <motion.div style={{ backgroundColor, width: '200%', height: '200%', filter: 'blur(60px)' }} />
      </Box>

      {/* Cards stack wrapper */}
      <Box sx={{ position: 'relative', width: '100%', maxWidth: 350, height: 420, mb: 4, zIndex: 5 }}>
        <AnimatePresence initial={false}>
          {currentCard && (
            <SwipeCard
              key={currentCard.id}
              card={currentCard}
              swipeTrigger={swipeTrigger}
              onSwipeComplete={handleSwipeComplete}
              parentX={parentX}
              currentIndex={currentIndex}
              deckLength={deck.length}
            />
          )}
        </AnimatePresence>

        {/* Back card stack placeholder */}
        {nextCard && (
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 16,
              transform: 'scale(0.95)',
              opacity: 0.65,
              zIndex: 5,
              pointerEvents: 'none',
              transition: 'all 0.3s ease',
            }}
          >
            <Card
              elevation={1}
              sx={{
                width: '100%',
                height: '100%',
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
              }}
            />
          </Box>
        )}
      </Box>

      {/* Swipe action buttons */}
      <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', zIndex: 10 }}>
        {/* Review Later / Unsafe (Left) */}
        <IconButton
          onClick={() => handleButtonSwipe('left')}
          sx={{
            bgcolor: 'rgba(255, 107, 107, 0.1)',
            color: 'secondary.main',
            border: '1.5px solid rgba(255, 107, 107, 0.2)',
            width: 64,
            height: 64,
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: 'secondary.main',
              color: 'white',
              boxShadow: '0px 6px 18px rgba(255, 107, 107, 0.35)',
            }
          }}
          aria-label="mark unsafe"
        >
          <CloseIcon sx={{ fontSize: 30 }} />
        </IconButton>

        {/* Understood / Safe (Right) */}
        <IconButton
          onClick={() => handleButtonSwipe('right')}
          sx={{
            bgcolor: 'rgba(74, 222, 128, 0.1)',
            color: '#22C55E',
            border: '1.5px solid rgba(74, 222, 128, 0.2)',
            width: 64,
            height: 64,
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: '#22C55E',
              color: 'white',
              boxShadow: '0px 6px 18px rgba(34, 197, 94, 0.35)',
            }
          }}
          aria-label="mark safe"
        >
          <CheckIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Box>
    </Box>
  );
}
