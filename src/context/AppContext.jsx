import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const MOCK_PRIVACY_DECK = [
  {
    id: 1,
    topic: 'Digital Privacy',
    title: 'Emergency Account Verification',
    fact: 'Your bank sends an urgent email warning of unauthorized access and asks you to click a link to verify your password immediately. It is safe to click the link.',
    isSafe: false,
    explanation: 'Banks will never ask you to verify passwords via links in emails. Clicking links in urgent warnings is a classic trap for phishing credential theft.'
  },
  {
    id: 2,
    topic: 'Password Safety',
    title: 'Reusable High-Strength Passwords',
    fact: 'Reusing a highly secure, complex 16-character password (with numbers, letters, and symbols) across your bank and email accounts is safe.',
    isSafe: false,
    explanation: 'Never reuse passwords. If any single service experiences a breach, attackers will immediately attempt credential stuffing to access your banking and email portals.'
  },
  {
    id: 3,
    topic: 'Authentication Security',
    title: 'SMS vs. Authenticator Apps',
    fact: 'Authenticator Apps (like Google Authenticator) are safer than SMS 2FA codes because SMS codes can be intercepted by hackers through SIM-swapping.',
    isSafe: true,
    explanation: 'SIM-swapping allows attackers to hijack your mobile number. Authenticator apps generate codes locally on your physical device, completely bypassing SMS interception risks.'
  },
  {
    id: 4,
    topic: 'Public Wireless Risks',
    title: 'Public Wi-Fi Banking Checks',
    fact: 'Connecting to public airport Wi-Fi and checking your online banking is perfectly safe as long as the bank URL begins with "https://".',
    isSafe: false,
    explanation: 'HTTPS encrypts transaction details, but public networks are vulnerable to Man-in-the-Middle spoofing attacks. Always use a VPN or cell data hotspot on public networks.'
  },
  {
    id: 5,
    topic: 'App Permissions',
    title: 'Flashlight Contact Access',
    fact: 'A basic flashlight mobile utility app requesting access to your phone contacts and microphone should be denied.',
    isSafe: true,
    explanation: 'Utility apps have no functional need for contacts or audio. Denying these requests prevents massive, silent data profiling and privacy violations.'
  }
];

export const MOCK_FINANCE_DECK = [
  {
    id: 6,
    topic: 'Personal Finance',
    title: 'Emergency Fund Storage',
    fact: 'Storing your entire emergency savings fund in a regular checking account yields the highest return and is the best financial practice.',
    isSafe: false,
    explanation: 'Regular checking accounts yield close to 0% interest. Storing it in a High-Yield Savings Account (HYSA) yields much more (typically 4-5%) while keeping funds liquid.'
  },
  {
    id: 7,
    topic: 'Credit Score',
    title: 'Maxing Out Credit Limits',
    fact: 'Maxing out your credit cards every month is fine as long as you pay off the full balance before the monthly payment due date.',
    isSafe: false,
    explanation: 'Even if paid off, high credit utilization (above 30%) is reported to credit bureaus, which negatively impacts your credit score. Try to keep it under 30% throughout the month.'
  },
  {
    id: 8,
    topic: 'Investing',
    title: 'Compound Interest Over Time',
    fact: 'Starting to invest small amounts ($50/month) in low-cost index funds in your early 20s yields more compound interest than starting with $500/month in your 40s.',
    isSafe: true,
    explanation: 'Compound interest is highly dependent on time. 20 extra years of compounding, even with smaller contributions, can result in a much larger retirement nest egg.'
  },
  {
    id: 9,
    topic: 'Debt Responsibility',
    title: 'Co-signing A Friend\'s Loan',
    fact: 'Co-signing a loan for a close friend carries no financial risk to you since the lender is obligated to collect from the primary borrower first.',
    isSafe: false,
    explanation: 'Co-signing makes you 100% legally responsible for the debt. If the borrower misses payments, it damages your credit score and the lender can sue you directly for collection.'
  },
  {
    id: 10,
    topic: 'Budgeting',
    title: 'Impulse Spending Rule',
    fact: 'Implementing a "24-Hour Rule" (waiting 24 hours before completing any non-essential purchase) helps reduce impulse buying and aligns spending with your actual budget.',
    isSafe: true,
    explanation: 'A brief cooling-off period lets emotional impulses subside, allowing logical reasoning to assess whether the purchase is a need or just a temporary want.'
  }
];

export const MOCK_CIVIC_DECK = [
  {
    id: 11,
    topic: 'Civic Rights',
    title: 'Consent for Car Trunk Search',
    fact: 'If a police officer pulls you over and asks to search your car trunk without a warrant, you have the legal right to politely say, "I do not consent to searches."',
    isSafe: true,
    explanation: 'The 4th Amendment protects you against unreasonable searches. Politely asserting your non-consent preserves your legal rights and keeps the search subject to warrant requirements.'
  },
  {
    id: 12,
    topic: 'Civic Rights',
    title: 'Recording Officers in Public',
    fact: 'Recording video of police officers performing their duties in a public space is illegal and can lead to immediate arrest for obstruction.',
    isSafe: false,
    explanation: 'In public spaces where you are lawfully present, you have a constitutional right to record law enforcement officers as long as you do not physically interfere with their operations.'
  },
  {
    id: 13,
    topic: 'Civic Rights',
    title: 'Answering Officer Inquiries',
    fact: 'If detaining officers question you, it is safest to answer all casual questions (like where you are going or what you are doing) immediately to avoid raising suspicion.',
    isSafe: false,
    explanation: 'You have a right to remain silent. Casual answers can inadvertently incriminate you or be misinterpreted. Asserting your right to remain silent and requesting an attorney is legally safer.'
  },
  {
    id: 14,
    topic: 'Civic Rights',
    title: 'Detained vs. Free to Go',
    fact: 'When stopped by a police officer, asking "Am I free to go, or am I being detained?" is a valid and crucial way to clarify your legal status.',
    isSafe: true,
    explanation: 'If you are not being detained, you are legally free to walk away. If you are detained, they must have reasonable suspicion of a crime, which narrows the scope of the interaction.'
  },
  {
    id: 15,
    topic: 'Traffic Stops',
    title: 'Refusing Ticket Signatures',
    fact: 'Refusing to sign a traffic ticket issued by an officer is a safe way to protest the charge and avoids admitting guilt on the spot.',
    isSafe: false,
    explanation: 'Signing a ticket is NOT an admission of guilt; it is only a promise to appear in court or pay. Refusing to sign can lead to immediate arrest in many jurisdictions. Argue the ticket in court, not on the road.'
  }
];

export const MOCK_HEALTH_DECK = [
  {
    id: 16,
    topic: 'Health & Wellness',
    title: 'Antibiotics for Cold and Flu',
    fact: 'Taking left-over antibiotics from a previous prescription is a safe and effective way to cure a severe common cold or flu quickly.',
    isSafe: false,
    explanation: 'Colds and flu are viral infections. Antibiotics only kill bacteria, not viruses. Taking unused antibiotics breeds drug-resistant superbugs and can cause harmful side effects.'
  },
  {
    id: 17,
    topic: 'Skin Health',
    title: 'Sunscreen on Cloudy Days',
    fact: 'Applying sunscreen is only necessary during hot summer days, as UV rays are too weak in the winter or on cloudy days to cause skin damage.',
    isSafe: false,
    explanation: 'Up to 80% of UV rays penetrate clouds. Snow also reflects UV light, doubling your exposure. Daily sunscreen prevents premature aging and skin cancer year-round.'
  },
  {
    id: 18,
    topic: 'Active Working',
    title: 'Prolonged Sedentary Desks',
    fact: 'Remaining seated at a desk for 8 hours without standing up is safe for your back as long as you maintain perfect ergonomic posture.',
    isSafe: false,
    explanation: 'Sedentary behavior is harmful regardless of posture. Regular movement (standing or walking for 2 minutes every hour) is vital for spinal decompression and blood circulation.'
  },
  {
    id: 19,
    topic: 'Sleep Hygiene',
    title: 'Paying Off Sleep Debt',
    fact: 'Sleeping for 10 hours on weekends completely resolves the physiological and mental deficits caused by sleeping only 5 hours per night during the workweek.',
    isSafe: false,
    explanation: 'Sleep debt cannot be repaid in a single weekend. Consistent sleep patterns are crucial; chronic sleep deprivation alters hormone levels, immunity, and cognitive functions.'
  },
  {
    id: 20,
    topic: 'Hydration',
    title: 'Urine Color Hydration Check',
    fact: 'Using your urine color (pale straw or clear vs. dark yellow) is a reliable, daily bio-indicator to check if you are properly hydrated.',
    isSafe: true,
    explanation: 'Hydration levels directly affect kidney function and urine concentration. Pale straw indicates good hydration, whereas dark yellow indicates a need to drink water immediately.'
  }
];

export const ALL_DECKS = [
  {
    id: 'privacy',
    title: 'Digital Privacy 101',
    topic: 'Digital Privacy',
    icon: 'Shield',
    color: '#4F46E5', // Indigo
    bgLight: 'rgba(79, 70, 229, 0.06)',
    description: 'Recognize phishing traps, trackers, and safe authentication practices to guard your digital footprint.',
    cards: MOCK_PRIVACY_DECK
  },
  {
    id: 'finance',
    title: 'Personal Finance 101',
    topic: 'Personal Finance',
    icon: 'AccountBalance',
    color: '#10B981', // Emerald Green
    bgLight: 'rgba(16, 185, 129, 0.06)',
    description: 'Master compound interest, emergency savings, credit cards, and avoiding common debt pitfalls.',
    cards: MOCK_FINANCE_DECK
  },
  {
    id: 'civic',
    title: 'Civic Rights 101',
    topic: 'Civic Rights',
    icon: 'Gavel',
    color: '#8B5CF6', // Purple
    bgLight: 'rgba(139, 92, 246, 0.06)',
    description: 'Learn your legal rights during routine police stops, recording rules, and key citizen protection laws.',
    cards: MOCK_CIVIC_DECK
  },
  {
    id: 'health',
    title: 'Health & Wellness 101',
    topic: 'Health & Wellness',
    icon: 'Favorite',
    color: '#FF6B6B', // Coral
    bgLight: 'rgba(255, 107, 107, 0.06)',
    description: 'Decipher common hydration signals, sleep hygiene facts, and avoiding viral vs bacterial misuse.',
    cards: MOCK_HEALTH_DECK
  }
];

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [deck, setDeck] = useState([]);
  const [activeDeckId, setActiveDeckId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeHistory, setSwipeHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const initiateDemo = () => {
    setUser({ name: 'Guest User', isDemo: true });
    setDeck(MOCK_PRIVACY_DECK);
    setActiveDeckId('privacy');
    setCurrentIndex(0);
    setSwipeHistory([]);
    setScore(0);
    setIsCompleted(false);
  };

  const selectDeck = (deckId) => {
    const selected = ALL_DECKS.find(d => d.id === deckId);
    if (selected) {
      setUser(prev => prev || { name: 'Guest User', isDemo: true });
      setDeck(selected.cards);
      setActiveDeckId(deckId);
      setCurrentIndex(0);
      setSwipeHistory([]);
      setScore(0);
      setIsCompleted(false);
    }
  };

  const resetDeck = () => {
    setCurrentIndex(0);
    setSwipeHistory([]);
    setScore(0);
    setIsCompleted(false);
  };

  const swipeCard = (swipedSafe) => {
    if (currentIndex >= deck.length) return;

    const currentCard = deck[currentIndex];
    // Choice is correct if swiped direction matches the true safety status
    const isCorrect = swipedSafe === currentCard.isSafe;
    const newHistory = [...swipeHistory, { cardId: currentCard.id, choice: swipedSafe, isCorrect }];
    setSwipeHistory(newHistory);

    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);

    const nextIndex = currentIndex + 1;
    if (nextIndex >= deck.length) {
      setIsCompleted(true);
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        deck,
        activeDeckId,
        currentIndex,
        swipeHistory,
        score,
        isCompleted,
        initiateDemo,
        selectDeck,
        resetDeck,
        swipeCard
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

