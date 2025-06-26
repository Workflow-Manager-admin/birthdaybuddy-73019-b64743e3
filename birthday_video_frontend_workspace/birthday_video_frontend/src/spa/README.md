# Birthday Video SPA

This directory contains the source code for the Single Page Application frontend for the birthday video app.

## Pages & Features

- **Landing Page**: Input friend’s name, festive theme
- **Video Page**: Remotion Player rendering an animated birthday video personalized with the name, confetti, balloons, and background music
- **SPA routing**: React Router
- **Modern UI**: Responsive, festive, minimal; styled with Tailwind and custom CSS

## How to use

1. Place a creative-commons "happy birthday" MP3 at `src/assets/audio/happy-birthday-tune.mp3`.
2. Install dependencies and run the dev server.

## SPA Entrypoint

- src/main.tsx (bootstraps React + Router)
- src/spa/App.tsx (Router & page layout)
- src/spa/LandingPage.tsx (Name input form)
- src/spa/VideoPage.tsx (Remotion Player)
- src/spa/remotion/ (Remotion compositions, etc.)

## Styling

Relies on Tailwind CSS (if configured), festive Google Fonts (Quicksand), and fallback CSS.
