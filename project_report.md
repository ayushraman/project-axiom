# Web Development Final Project Report
## Project Title: Axiom — Life Skills Decoded
### UN Sustainable Development Goal Alignment: SDG 4 (Quality Education)

---

## 1. Selected SDG and Reason for Selection

### What is the Selected SDG?
We have selected **United Nations Sustainable Development Goal 4: Quality Education**. 

### What does SDG 4 focus on?
SDG 4 aims to ensure inclusive, fair, and quality education for everyone, while promoting lifelong learning opportunities. It focuses on making sure that all people, regardless of their background, have access to the skills and knowledge they need to succeed in society.

### Why is this issue important?
Traditional schooling systems are excellent at teaching academic subjects like algebra, history, and literature. However, they frequently skip teaching critical everyday survival skills. When young adults enter the real world, they are often unprepared to handle:
*   **Digital Privacy**: Recognizing phishing emails, online scams, and protecting personal data.
*   **Basic Finance**: Understanding interest rates, managing emergency savings, and building credit.
*   **Civic Rights**: Knowing their legal rights during everyday situations, like traffic stops.

Without structured education in these areas, citizens are highly vulnerable to financial debt, identity theft, and legal issues. Bridging this "practical knowledge gap" is essential for building a safe and equitable society.

---

## 2. Problem Statement

### What is the problem?
There is a lack of accessible, structured, and engaging learning resources for essential real-world life skills. Most information available online is either buried in long, boring legal PDFs or is hidden behind paid training programs. Furthermore, passive reading (like reading a long article) has very low retention rates—people forget what they read almost immediately.

### Where does this problem exist?
This problem exists worldwide. It is especially prominent in high schools and colleges, where the curriculum is focused entirely on passing exams rather than preparing students for the daily challenges of adulthood.

### Who is affected?
Young adults, students, senior citizens (who are often targets of online scams), and general internet users who need quick, practical knowledge.

### Why is it serious?
It is serious because the consequences of ignorance in these fields are high:
*   An individual falling for a phishing scam can have their bank account wiped out.
*   A student taking out a bad loan can end up in decades of high-interest debt.
*   A citizen unaware of their rights might accidentally compromise their legal safety during an encounter with law enforcement.

### What could happen if it is not solved?
If not solved, the gap between academic education and practical survival skills will continue to grow. Digital scams will become more successful, personal debt rates will rise, and citizens will remain unempowered when navigating complex legal and financial systems.

---

## 4. Proposed Solution

### What is the project?
**Axiom** is a gamified, mobile-first micro-learning platform. It breaks down complex, boring rules of digital safety, finance, and civic rights into short, bite-sized "scenario cards." 

### How does the system work?
*   **Decks Catalog**: The user selects a topic "deck" (e.g., Digital Privacy 101).
*   **Tactile Swiping gameplay**: The user is presented with a real-life scenario card (e.g., "You receive an email from 'support@paypa1.com' asking to verify your password").
*   **Active Decision Making**: The user decides if the action is **Safe** or **Unsafe** by dragging/swiping the card:
    *   **Swipe Right** to classify it as **Safe**.
    *   **Swipe Left** to classify it as **Unsafe**.
*   **Instant Feedback**: The system tells them immediately if they were right or wrong, presenting a 2-line explanation of the facts behind the correct decision.
*   **Scorecard**: At the end of the deck, the user receives a scorecard evaluating their choices.

### How does it help solve the problem?
Instead of reading a long article, the user has to make active choices. This "active recall" and game-like mechanism significantly increases information retention. Because there is no sign-up or download required (a "Guest Mode" is active immediately), anyone can learn a crucial life skill in under 2 minutes.

### Who will use the application?
High school/college students, young adults starting their careers, and anyone wishing to quickly test and improve their real-world knowledge.

---

## 5. Project Features

### A. Learning Hub (Decks Catalog)
A clean, visual catalog displaying available learning categories (Digital Privacy, Basic Finance, Civic Rights). Each deck shows how many scenarios it contains.

### B. Glassmorphic Smartphone Simulator
A custom, high-fidelity visual phone frame rendered in the web browser. This mockup simulates a mobile application layout, providing a focused, tactile dashboard for learning.

### C. Tinder-Style Draggable Card Interface
Draggable scenario cards that react to mouse drag or touch gestures. As the card is dragged left or right, Tinder-style glows and stamp overlays (**SAFE** or **UNSAFE**) fade in dynamically to guide the user.

### D. Micro-Feedback Loop & Explanations
When a swipe choice is made, the game pauses to show a detailed card breakdown, locking key facts into memory before the user moves to the next scenario.

### E. User Authentication (Optional Accounts)
A clean Login layout allowing users to register or login to save their progress, or continue instantly using Guest Mode.

---

## 6. Technology Stack (Technical Terms Explained)

We built the application using the following modern web technologies:

### 1. React (Frontend Library)
*   **What it does**: Builds the user interface.
*   **Simple explanation**: React is a library that allows developers to build websites like a Lego set. The website is split into reusable blocks called **Components** (like buttons, navigation bars, and cards). When data changes, React updates only the specific component on the screen without reloading the entire web page.

### 2. Material-UI / MUI (Design System)
*   **What it does**: Provides pre-built styling, inputs, grids, and cards.
*   **Simple explanation**: Material-UI is a style library. Instead of writing CSS styles from scratch for every single element, MUI provides beautiful, pre-designed structural building blocks (like Buttons, Grids, and Cards) that follow modern design standards. We customized the global theme to build a sleek **Glassmorphic** design system (semi-transparent obsidian glass elements with glowing borders).

### 3. Framer Motion (Animations Library)
*   **What it does**: Handles card dragging physics, swiping coordinates, and stamp fades.
*   **Simple explanation**: Framer Motion is an animation tool. It translates physical gestures (like dragging a card with your mouse or finger) into smooth movements. It calculates how far the user has dragged and dynamically scales and fades in the stamps (**SAFE** / **UNSAFE**) based on the card's position.

### 5. React Router (Navigation)
*   **What it does**: Manages paths and page transitions.
*   **Simple explanation**: In standard websites, clicking a link loads a brand new HTML file. React Router lets users jump between pages (like `/` to `/deck` or `/login`) instantly without any screen flickering, creating a smooth mobile-app-like experience.

---

## 7. Project Screenshots (Proof of Work)

> [!TIP]
> **Instructions for submission**: You can insert your captured screenshot PNG files under the placeholders below.

### Feature 1: Asymmetrical Landing Page & Glass Smartphone Mockup
*[Insert screenshot showing the homepage layout, left text columns, and the right mockup phone here]*

### Feature 2: Active Card Swiping & Stamp Overlays
*[Insert screenshot of dragging a card showing the UNSAFE (Rose Red) or SAFE (Cyber Cyan) stamp overlay here]*

### Feature 3: Interactive Learning Decks Hub
*[Insert screenshot of the Learning Decks grid showcase here]*

### Feature 4: Login & Authentication Page
*[Insert screenshot of the Login interface here]*

---

## 8. Open Source Repository

### GitHub Repository Link
`[Insert your GitHub repository link here]`

*Note: The repository contains clean, organized React code under `/src` along with setup instructions in `README.md`.*

---

## 9. Future Scope

The project can be expanded in the following ways:
1.  **AI-Generated Scenarios**: Integrating a lightweight AI API (like Google Gemini) to dynamically generate new, trending scenarios based on latest news (e.g. current phishing trends).
2.  **Global Leaderboard & Achievements**: Adding a backend database (like Node.js + MongoDB) to track user scores globally, introducing daily streaks, levels, and learning achievements.
3.  **Progressive Web App (PWA)**: Packaging the app as a PWA so users can install it directly onto their Android or iOS home screens and learn offline.
