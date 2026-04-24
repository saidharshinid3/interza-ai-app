# Interza AI - Interview Practice Application

A modern, AI-powered interview practice web application built with React, TypeScript, and Tailwind CSS.

## Features

- **Dark Theme with AI Aesthetics**: Modern dark theme with blue gradient backgrounds and glowing effects
- **Interactive Interview Flow**: Complete interview simulation with setup, questions, and feedback
- **Speech Recognition**: Voice input support for answers
- **Text-to-Speech**: AI voice responses with different personalities
- **Progress Tracking**: Visual progress indicators and timers
- **Responsive Design**: Works on desktop and mobile devices
- **Smooth Animations**: Framer Motion animations throughout the app

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion
- **UI Components**: Radix UI primitives with custom styling
- **State Management**: React Context
- **Build Tool**: Vite
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd interza-ai-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, cards, etc.)
│   ├── AnimatedBackground.tsx
│   └── Logo.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   ├── Setup.tsx
│   ├── Interview.tsx
│   ├── Feedback.tsx
│   └── not-found.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utilities and business logic
│   ├── store.tsx       # Global state management
│   ├── questions.ts    # Interview questions data
│   ├── speech.ts       # Speech recognition and synthesis
│   └── utils.ts        # Helper functions
└── main.tsx            # Application entry point
```

## Features Overview

### Landing Page
- Animated logo and title
- Call-to-action button with glow effects
- Smooth entrance animations

### Setup Page
- Role selection (Software Engineer, UI/UX Designer, Business Analyst)
- Mode selection (Practice, Interview)
- Personality selection (Friendly, Neutral, Strict)
- Glassmorphism card design

### Interview Page
- One question at a time display
- Voice input with speech recognition
- Text input fallback
- Progress indicator
- Timer functionality
- Smooth transitions between questions

### Feedback Page
- Performance scoring based on answer length
- Strengths and weaknesses analysis
- Improvement suggestions
- Restart functionality

## Browser Support

- Chrome/Edge (full speech features)
- Firefox (text input only)
- Safari (limited speech support)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.