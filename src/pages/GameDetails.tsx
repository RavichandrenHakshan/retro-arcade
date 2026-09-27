import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Play, Heart, Calendar, Monitor, Gamepad, Code } from 'lucide-react';
import { getGameById } from '../data/games';
import { useFavorites } from '../hooks/useFavorites';
import { cn } from '../components/Navbar';

const GameDetails = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const game = gameId ? getGameById(gameId) : undefined;
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!game) {
    return <Navigate to="/games" replace />;
  }

  const favorite = isFavorite(game.id);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <Link to="/games" className="inline-flex items-center gap-2 font-vt323 text-2xl text-retro-cyan hover:text-white transition-colors">
        <ArrowLeft className="w-5 h-5" />
        BACK TO LIBRARY
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cover Art */}
        <div className="md:col-span-1 space-y-4">
          <div className="border-4 border-retro-gray p-2 bg-retro-dark relative pixel-corners group">
            <img 
              src={game.cover} 
              alt={`${game.title} cover`} 
              className="w-full aspect-[3/4] object-cover"
            />
            <button 
              onClick={() => toggleFavorite(game.id)}
              className="absolute top-4 right-4 p-3 bg-black/80 rounded-full hover:bg-black transition-colors border-2 border-transparent hover:border-retro-magenta"
            >
              <Heart className={cn("w-6 h-6", favorite ? "fill-retro-magenta text-retro-magenta" : "text-white")} />
            </button>
          </div>
          
          <Link 
            to={`/play/${game.slug}`}
            className="w-full flex items-center justify-center gap-3 bg-retro-magenta hover:bg-retro-magenta/80 text-white font-press-start text-xl py-4 border-4 border-white hover:border-retro-cyan transition-all shadow-neon-magenta hover:scale-105 active:scale-95"
          >
            <Play className="w-6 h-6 fill-current" />
            PLAY GAME
          </Link>
        </div>

        {/* Info */}
        <div className="md:col-span-2 space-y-8 bg-retro-dark p-6 sm:p-8 border-2 border-gray-700 pixel-corners">
          <div>
            <h1 className="font-press-start text-3xl sm:text-4xl text-white mb-4 leading-tight">
              {game.title}
            </h1>
            <p className="font-vt323 text-2xl text-gray-300 leading-relaxed">
              {game.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-6 border-t-2 border-gray-700">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-500">
                <Gamepad className="w-5 h-5" />
                <span className="font-press-start text-xs uppercase">Genre</span>
              </div>
              <p className="font-vt323 text-2xl text-retro-cyan">{game.genre}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-500">
                <Monitor className="w-5 h-5" />
                <span className="font-press-start text-xs uppercase">Platform</span>
              </div>
              <p className="font-vt323 text-2xl text-retro-magenta">{game.platform}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar className="w-5 h-5" />
                <span className="font-press-start text-xs uppercase">Release Year</span>
              </div>
              <p className="font-vt323 text-2xl text-retro-yellow">{game.year}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-500">
                <Code className="w-5 h-5" />
                <span className="font-press-start text-xs uppercase">Developer</span>
              </div>
              <p className="font-vt323 text-2xl text-white">{game.developer}</p>
            </div>
          </div>

          <div className="pt-6 border-t-2 border-gray-700">
            <h2 className="font-press-start text-xl text-white mb-4">CONTROLS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(game.controls).map(([action, keyBinding]) => (
                <div key={action} className="bg-retro-gray p-3 border border-gray-600 flex justify-between items-center">
                  <span className="font-vt323 text-xl text-gray-400 uppercase">{action}</span>
                  <span className="font-press-start text-xs text-white bg-black px-2 py-1 rounded shadow-[inset_0_0_5px_rgba(255,255,255,0.2)]">
                    {keyBinding}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
