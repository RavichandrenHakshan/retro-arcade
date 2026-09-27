import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { games } from '../data/games';
import GameCard from '../components/GameCard';
import { useRecent } from '../hooks/useRecent';

const Home = () => {
  const { recentGames } = useRecent();
  const recentGameData = recentGames.map(id => games.find(g => g.id === id)).filter(Boolean) as typeof games;
  const featuredGames = games.slice(0, 6);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 flex flex-col items-center justify-center text-center border-4 border-retro-cyan bg-retro-dark overflow-hidden pixel-corners shadow-neon-cyan">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-retro-dark to-transparent"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <h1 className="font-press-start text-4xl md:text-6xl text-white mb-4 animate-pulse">
            INSERT COIN
          </h1>
          <p className="font-vt323 text-2xl md:text-4xl text-retro-cyan mb-8 uppercase tracking-widest">
            Relive the classics. Play retro games directly in your browser.
          </p>
          <Link 
            to="/games"
            className="inline-flex items-center gap-4 bg-retro-magenta hover:bg-retro-magenta/80 text-white font-press-start text-xl md:text-2xl py-4 px-8 border-4 border-white hover:border-retro-cyan transition-all shadow-neon-magenta hover:scale-105 active:scale-95"
          >
            <Play className="w-8 h-8 fill-current" />
            START PLAYING
          </Link>
        </div>
      </section>

      {/* Recently Played */}
      {recentGameData.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-press-start text-2xl text-retro-yellow border-b-4 border-retro-yellow pb-2 inline-block shadow-[0_4px_0_0_rgba(255,255,0,0.3)]">
              CONTINUE PLAYING
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recentGameData.slice(0, 4).map(game => (
              <GameCard key={`recent-${game.id}`} game={game} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Games */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-press-start text-2xl text-retro-cyan border-b-4 border-retro-cyan pb-2 inline-block shadow-[0_4px_0_0_rgba(0,255,255,0.3)]">
            FEATURED GAMES
          </h2>
          <Link to="/games" className="font-vt323 text-2xl text-retro-magenta hover:text-white transition-colors">
            VIEW ALL &gt;&gt;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
