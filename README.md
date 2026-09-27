# Retro Arcade

A complete, polished retro gaming website built with React, Vite, and Tailwind CSS. It allows users to browse a library of classic games and play them directly in their browser.

## Features

- **Retro Aesthetic:** CRT effects, scanlines, pixel art styles, and neon accents.
- **Responsive Design:** Works flawlessly on desktop, tablet, and mobile.
- **Game Library:** Browse, search, and filter games.
- **Game Player:** An arcade-cabinet styled game player with a placeholder for emulators.
- **Mobile Controls:** Optional on-screen gamepad for mobile users.
- **Favorites & Recent:** Uses `localStorage` to save user preferences without needing a backend.

## Tech Stack

- React 18
- Vite
- React Router DOM
- Tailwind CSS
- Lucide React (Icons)
- TypeScript

## Local Development

Since this project uses Vite, you need Node.js installed.

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Adding a New Game

To add a new game to the library, open `src/data/games.ts` and add a new object to the `games` array:

```javascript
{
  id: "my-new-game",
  title: "My New Game",
  slug: "my-new-game",
  description: "A cool new game I added.",
  thumbnail: "path/to/thumb.jpg",
  cover: "path/to/cover.jpg",
  genre: "Action",
  platform: "Arcade",
  year: 1999,
  developer: "My Studio",
  controls: {
    "Move": "Arrow Keys",
    "Action": "Spacebar"
  }
}
```

## Emulator Integration

The game player is located in `src/pages/PlayGame.tsx`. Currently, it displays a demo placeholder. You can integrate a JavaScript-based emulator (like JS-DOS, or RetroArch web player) by replacing the placeholder div with the emulator's canvas element.

## Deployment to Vercel

This project is fully ready for deployment on Vercel.

1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com) and import the repository.
3. Vercel will automatically detect the Vite project and configure the build settings (`npm run build`, `dist` folder).
4. The included `vercel.json` ensures that client-side routing works correctly.

## Disclaimer

This template uses placeholder game data for demonstration. Do not upload copyrighted ROMs to public repositories or host them without permission.
