import { Link } from 'react-router-dom';
import { Heart, Play } from 'lucide-react';
import { Game } from '../data/games';
import { useFavorites } from '../hooks/useFavorites';
import { cn } from './Navbar';

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(game.id);

  return (
    <div className="bg-retro-gray pixel-corners p-1 border-2 border-retro-gray hover:border-retro-cyan hover:shadow-neon-cyan transition-all duration-300 group">
      <div className="relative overflow-hidden aspect-video bg-black">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(game.id);
            }}
            className="p-2 bg-black/60 rounded-full hover:bg-black/90 transition-colors"
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={cn("w-5 h-5", favorite ? "fill-retro-magenta text-retro-magenta" : "text-white")} />
          </button>
        </div>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <Play className="w-16 h-16 text-retro-cyan opacity-80" />
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-press-start text-sm truncate pr-2 text-white group-hover:text-retro-cyan transition-colors" title={game.title}>
            {game.title}
          </h3>
          <span className="font-vt323 text-retro-magenta text-xl shrink-0">{game.year}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs font-vt323 bg-retro-dark px-2 py-1 rounded text-gray-300 uppercase border border-gray-700">
            {game.genre}
          </span>
          <span className="text-xs font-vt323 bg-retro-dark px-2 py-1 rounded text-retro-cyan uppercase border border-retro-cyan/30">
            {game.platform}
          </span>
        </div>
        
        <div className="flex gap-2 mt-4">
          <Link 
            to={`/games/${game.slug}`}
            className="flex-1 text-center py-2 bg-retro-dark border-2 border-gray-600 hover:border-white font-vt323 text-xl uppercase transition-colors"
          >
            Details
          </Link>
          <Link 
            to={`/play/${game.slug}`}
            className="flex-1 text-center py-2 bg-retro-magenta/20 border-2 border-retro-magenta hover:bg-retro-magenta text-white font-vt323 text-xl uppercase transition-all shadow-[0_0_10px_rgba(255,0,255,0.3)] hover:shadow-neon-magenta"
          >
            Play
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
