export interface Game {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  cover: string;
  genre: string;
  platform: string;
  year: number;
  developer: string;
  controls: {
    [key: string]: string;
  };
  gamePath?: string; // Path to ROM or HTML5 game entry point
}

// Using placeholder images from Unsplash or plain colors for demo purposes
const coverBaseUrl = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80&auto=format&fit=crop';
const thumbBaseUrl = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80&auto=format&fit=crop';

const defaultGames: Game[] = [
  {
    id: "super-mario-bros",
    title: "Super Mario Bros.",
    slug: "super-mario-bros",
    description: "Join Mario and Luigi on their quest to save Princess Toadstool from the evil Bowser.",
    thumbnail: thumbBaseUrl + "&sig=1",
    cover: coverBaseUrl + "&sig=1",
    genre: "Platformer",
    platform: "NES",
    year: 1985,
    developer: "Nintendo",
    controls: {
      "Move": "Arrow Keys / D-Pad",
      "Jump": "Z / Button A",
      "Dash/Fireball": "X / Button B",
      "Start": "Enter / Start",
      "Select": "Shift / Select"
    }
  },
  {
    id: "sonic-the-hedgehog",
    title: "Sonic the Hedgehog",
    slug: "sonic-the-hedgehog",
    description: "Speed through loops and collect rings as Sonic the Hedgehog to stop Dr. Robotnik.",
    thumbnail: thumbBaseUrl + "&sig=2",
    cover: coverBaseUrl + "&sig=2",
    genre: "Platformer",
    platform: "Genesis",
    year: 1991,
    developer: "Sega",
    controls: {
      "Move": "Arrow Keys / D-Pad",
      "Jump": "Z / Button A",
      "Start": "Enter / Start"
    }
  },
  {
    id: "pac-man",
    title: "Pac-Man",
    slug: "pac-man",
    description: "Navigate a maze, eat pellets, and avoid ghosts in this arcade classic.",
    thumbnail: thumbBaseUrl + "&sig=3",
    cover: coverBaseUrl + "&sig=3",
    genre: "Arcade",
    platform: "Arcade",
    year: 1980,
    developer: "Namco",
    controls: {
      "Move": "Arrow Keys / D-Pad",
      "Insert Coin": "Shift / Select",
      "Start": "Enter / Start"
    }
  },
  {
    id: "tetris",
    title: "Tetris",
    slug: "tetris",
    description: "Rotate and arrange falling blocks to clear lines in this iconic puzzle game.",
    thumbnail: thumbBaseUrl + "&sig=4",
    cover: coverBaseUrl + "&sig=4",
    genre: "Puzzle",
    platform: "Game Boy",
    year: 1989,
    developer: "Alexey Pajitnov",
    controls: {
      "Move": "Left/Right Arrows / D-Pad Left/Right",
      "Rotate": "Up Arrow / Button A",
      "Soft Drop": "Down Arrow / D-Pad Down",
      "Start": "Enter / Start"
    }
  },
  {
    id: "street-fighter-ii",
    title: "Street Fighter II",
    slug: "street-fighter-ii",
    description: "Choose your fighter and battle opponents in this genre-defining fighting game.",
    thumbnail: thumbBaseUrl + "&sig=5",
    cover: coverBaseUrl + "&sig=5",
    genre: "Fighting",
    platform: "Arcade",
    year: 1991,
    developer: "Capcom",
    controls: {
      "Move/Jump/Crouch": "Arrow Keys / D-Pad",
      "Punches": "Q, W, E / X, Y, L",
      "Kicks": "A, S, D / A, B, R",
      "Start": "Enter / Start"
    }
  },
  {
    id: "contra",
    title: "Contra",
    slug: "contra",
    description: "Run and gun action against alien forces. Remember the Konami Code?",
    thumbnail: thumbBaseUrl + "&sig=6",
    cover: coverBaseUrl + "&sig=6",
    genre: "Shooter",
    platform: "NES",
    year: 1987,
    developer: "Konami",
    controls: {
      "Move/Aim": "Arrow Keys / D-Pad",
      "Jump": "Z / Button A",
      "Shoot": "X / Button B",
      "Start": "Enter / Start"
    }
  }
];

// Initialize games from localStorage or default
const storedGames = window.localStorage.getItem('retro_arcade_games_db');
export const games: Game[] = storedGames ? JSON.parse(storedGames) : defaultGames;

export const updateGamesDb = (newGames: Game[]) => {
  window.localStorage.setItem('retro_arcade_games_db', JSON.stringify(newGames));
  // Force a reload to apply changes everywhere since it's a static site
  window.location.reload();
};

export const getGameById = (id: string): Game | undefined => {
  return games.find(g => g.slug === id || g.id === id);
};

export const categories = Array.from(new Set(games.map(g => g.genre))).sort();
