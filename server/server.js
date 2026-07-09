import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'axiom_super_secret_token_key_123!';
const DB_FILE = path.join(process.cwd(), 'data', 'db.json');

app.use(cors());
app.use(express.json());

// Helper function to read database file
async function loadDb() {
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    // If database file doesn't exist, create initial structure
    const initialDb = { users: [], scores: [] };
    await fs.mkdir(path.dirname(DB_FILE), { recursive: true });
    await fs.writeFile(DB_FILE, JSON.stringify(initialDb, null, 2));
    return initialDb;
  }
}

// Helper function to write to database file
async function saveDb(data) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

// Middleware to verify JWT Token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access token missing' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token expired or invalid' });
    req.user = user;
    next();
  });
}

// 1. User Registration / Signup
app.post('/api/auth/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  try {
    const db = await loadDb();
    const existing = db.users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (existing) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now().toString(),
      username,
      password: hashedPassword,
      streak: 0,
      lastActive: null
    };

    db.users.push(newUser);
    await saveDb(db);

    const token = jwt.sign({ username: newUser.username, id: newUser.id }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      user: { username: newUser.username, streak: 0 },
      token
    });
  } catch (err) {
    res.status(500).json({ error: 'Server registration error' });
  }
});

// 2. User Login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  try {
    const db = await loadDb();
    const user = db.users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ username: user.username, id: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      user: { username: user.username, streak: user.streak || 0 },
      token
    });
  } catch (err) {
    res.status(500).json({ error: 'Server login error' });
  }
});

// 3. Save Score / Update Streak
app.post('/api/scores', authenticateToken, async (req, res) => {
  const { deckId, score, total } = req.body;
  const username = req.user.username;

  try {
    const db = await loadDb();
    const user = db.users.find(u => u.username === username);

    // Save score entry
    const newEntry = {
      id: Date.now().toString(),
      username,
      deckId,
      score,
      total,
      percentage: Math.round((score / total) * 100),
      timestamp: new Date().toISOString()
    };
    db.scores.push(newEntry);

    // Calculate streak update
    if (user) {
      const today = new Date().toDateString();
      if (user.lastActive !== today) {
        // Increment streak if last active day was yesterday, or reset if missed.
        const lastDate = user.lastActive ? new Date(user.lastActive) : null;
        const diffTime = lastDate ? Math.abs(new Date(today) - lastDate) : null;
        const diffDays = diffTime ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : null;

        if (diffDays === 1) {
          user.streak = (user.streak || 0) + 1;
        } else if (!lastDate || diffDays > 1) {
          user.streak = 1;
        }
        user.lastActive = today;
      }
    }

    await saveDb(db);
    res.json({
      success: true,
      user: { username, streak: user ? user.streak : 0 }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record score' });
  }
});

// 4. Get Global Leaderboard (Top 10 High Scores)
app.get('/api/leaderboard', async (req, res) => {
  try {
    const db = await loadDb();
    // Sort scores by percentage correct, then absolute score
    const sorted = [...db.scores].sort((a, b) => b.percentage - a.percentage || b.score - a.score);
    // Limit to top 10
    const top10 = sorted.slice(0, 10);
    res.json(top10);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve leaderboard' });
  }
});

// 5. Generate AI custom deck using Gemini API
app.post('/api/ai/generate', async (req, res) => {
  const { topic } = req.body;
  if (!topic) {
    return res.status(400).json({ error: 'AI topic prompt is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log('No Gemini API Key found in env. Serving high-fidelity fallback deck.');
    const fallbackDeck = getFallbackDeck(topic);
    return res.json(fallbackDeck);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' }
    });

    const prompt = `Generate a list of exactly 5 interactive scenario-cards for a learning swiping game on the topic: "${topic}".
The JSON output must be a strict array of objects, where each object has these exact keys:
- "id" (number, unique starting from 1)
- "topic" (string, the category name)
- "title" (string, a short catchy title of the scenario)
- "fact" (string, the scenario description detailing an action or event)
- "isSafe" (boolean, true if the action described is safe/good practice, false if it is unsafe/bad practice)
- "explanation" (string, a 1-2 sentence explanation of why the action is safe or unsafe)

Ensure the scenario content is highly informative and directly related to the topic. Do not wrap in a markdown block, just output the raw JSON array.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = JSON.parse(text);

    res.json(parsed);
  } catch (err) {
    console.error('Gemini call failed or JSON parsing error. Serving fallback deck:', err);
    res.json(getFallbackDeck(topic));
  }
});

// Helper fallback generator for offline testing
function getFallbackDeck(topic) {
  const sanitizedTopic = topic.trim().substring(0, 30);
  return [
    {
      id: 1,
      topic: sanitizedTopic,
      title: 'Suspicious Software Request',
      fact: `You download a document utility on ${sanitizedTopic} and it prompts you to install an extra web browser extension to read the file. You choose to accept it.`,
      isSafe: false,
      explanation: 'Malicious software packages frequently prompt users to install extra browser attachments or helper tools. Only install software from official sources.'
    },
    {
      id: 2,
      topic: sanitizedTopic,
      title: 'Verifying Official Guidelines',
      fact: `Before using any tools related to ${sanitizedTopic}, you double check the official web domain matches the company documentation to avoid spoofing sites.`,
      isSafe: true,
      explanation: 'Verifying domain names prevents you from falling for clone websites designed to harvest passwords or private developer details.'
    },
    {
      id: 3,
      topic: sanitizedTopic,
      title: 'Sharing API Access Keys',
      fact: `A developer assistant website prompts you to input your private API keys or login credentials to automate actions for ${sanitizedTopic}. You decide to paste them.`,
      isSafe: false,
      explanation: 'Never share private API keys or auth tokens. Attackers can hijack your accounts and cause major financial losses or system breaches.'
    },
    {
      id: 4,
      topic: sanitizedTopic,
      title: 'Implementing Local Security',
      fact: `You run a locally isolated environment (like a sandbox container) to test unverified software packages on ${sanitizedTopic}.`,
      isSafe: true,
      explanation: 'Running unverified tools inside local containers prevents them from accessing your host machine files or registry settings.'
    },
    {
      id: 5,
      topic: sanitizedTopic,
      title: 'Urgent System Support Call',
      fact: `A support agent contacts you claiming an urgent security leak was detected in your files regarding ${sanitizedTopic} and requests remote access. You refuse.`,
      isSafe: true,
      explanation: 'Support services will never call unsolicited requesting remote desktop access. Refusing prevents attackers from placing backdoor trojans.'
    }
  ];
}

app.listen(PORT, () => {
  console.log(`Axiom Backend Server running on http://localhost:${PORT}`);
});
