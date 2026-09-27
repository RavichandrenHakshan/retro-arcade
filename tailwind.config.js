/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive'],
        'vt323': ['"VT323"', 'monospace'],
        'sans': ['"VT323"', 'monospace'],
      },
      colors: {
        'retro-bg': '#0a0a0c',
        'retro-green': '#39ff14',
        'retro-cyan': '#00ffff',
        'retro-magenta': '#ff00ff',
        'retro-yellow': '#ffff00',
        'retro-dark': '#111116',
        'retro-gray': '#2a2a35'
      },
      boxShadow: {
        'neon-cyan': '0 0 5px theme("colors.retro-cyan"), 0 0 20px theme("colors.retro-cyan")',
        'neon-magenta': '0 0 5px theme("colors.retro-magenta"), 0 0 20px theme("colors.retro-magenta")',
        'neon-green': '0 0 5px theme("colors.retro-green"), 0 0 20px theme("colors.retro-green")',
      }
    },
  },
  plugins: [],
}
