import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { useGames } from '../hooks/useGames';
import GameCard from '../components/GameCard';

const Favorites = () => {
  const { games, loading } = useGames();
  const { favorites } = useFavorites();
  const favoriteGames = favorites.map(id => games.find(g => g.id === id)).filter(Boolean) as typeof games;

  if (loading) {
    return <div className="min-h-[50vh] flex items-center justify-center font-press-start text-retro-cyan animate-pulse">LOADING...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="border-b-2 border-retro-gray pb-8">
        <h1 className="font-press-start text-3xl md:text-4xl text-retro-magenta mb-2 flex items-center gap-4">
          <Heart className="w-8 h-8 fill-current" />
          MY FAVORITES
        </h1>
        <p className="font-vt323 text-2xl text-gray-400 uppercase">Your saved classic collection</p>
      </div>

      {favoriteGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteGames.map(game => (
            <GameCard key={`fav-${game.id}`} game={game} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-retro-dark border-2 border-dashed border-gray-600 pixel-corners max-w-2xl mx-auto">
          <Heart className="w-16 h-16 text-gray-600 mx-auto mb-6" />
          <p className="font-press-start text-xl text-gray-400 mb-4">NO FAVORITES YET</p>
          <p className="font-vt323 text-2xl text-gray-500 mb-8">
            You haven't added any games to your favorites list.<br/>
            Browse the library and click the heart icon to save games here.
          </p>
          <Link 
            to="/games"
            className="inline-block px-6 py-3 bg-retro-magenta hover:bg-retro-magenta/80 text-white font-vt323 text-2xl uppercase transition-colors"
          >
            Browse Games
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;
