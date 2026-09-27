import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { useGames } from '../hooks/useGames';
import GameCard from '../components/GameCard';

const Games = () => {
  const { games, categories, platforms, loading } = useGames();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (game.description && game.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || game.genre === selectedCategory;
      const matchesPlatform = selectedPlatform === 'All' || game.platform === selectedPlatform;
      
      return matchesSearch && matchesCategory && matchesPlatform;
    });
  }, [games, searchTerm, selectedCategory, selectedPlatform]);

  if (loading) {
    return <div className="min-h-[50vh] flex items-center justify-center font-press-start text-retro-cyan animate-pulse">LOADING...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 border-b-2 border-retro-gray pb-8">
        <div>
          <h1 className="font-press-start text-3xl md:text-4xl text-white mb-2">GAME LIBRARY</h1>
          <p className="font-vt323 text-2xl text-gray-400 uppercase">Browse our collection of classics</p>
        </div>

        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-retro-cyan" />
            </div>
            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 bg-retro-dark border-2 border-gray-600 focus:border-retro-cyan focus:outline-none font-vt323 text-xl text-white placeholder-gray-500 rounded-none transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-64 shrink-0 space-y-6 bg-retro-gray p-4 pixel-corners border-2 border-gray-700">
          <div className="flex items-center gap-2 mb-4 text-retro-yellow">
            <Filter className="w-5 h-5" />
            <h2 className="font-press-start text-sm">FILTERS</h2>
          </div>
          
          <div>
            <h3 className="font-vt323 text-2xl text-white mb-2 border-b border-gray-600 pb-1">Genre</h3>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`block w-full text-left px-2 py-1 font-vt323 text-xl uppercase ${selectedCategory === 'All' ? 'bg-retro-cyan/20 text-retro-cyan border-l-4 border-retro-cyan' : 'text-gray-400 hover:text-white'}`}
              >
                All Genres
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`block w-full text-left px-2 py-1 font-vt323 text-xl uppercase ${selectedCategory === cat ? 'bg-retro-cyan/20 text-retro-cyan border-l-4 border-retro-cyan' : 'text-gray-400 hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-vt323 text-2xl text-white mb-2 border-b border-gray-600 pb-1 mt-6">Platform</h3>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedPlatform('All')}
                className={`block w-full text-left px-2 py-1 font-vt323 text-xl uppercase ${selectedPlatform === 'All' ? 'bg-retro-magenta/20 text-retro-magenta border-l-4 border-retro-magenta' : 'text-gray-400 hover:text-white'}`}
              >
                All Platforms
              </button>
              {platforms.map(platform => (
                <button
                  key={platform}
                  onClick={() => setSelectedPlatform(platform)}
                  className={`block w-full text-left px-2 py-1 font-vt323 text-xl uppercase ${selectedPlatform === platform ? 'bg-retro-magenta/20 text-retro-magenta border-l-4 border-retro-magenta' : 'text-gray-400 hover:text-white'}`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Game Grid */}
        <div className="flex-grow">
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-retro-dark border-2 border-dashed border-gray-600 pixel-corners">
              <p className="font-press-start text-xl text-gray-400 mb-4">NO GAMES FOUND</p>
              <p className="font-vt323 text-2xl text-gray-500">Try adjusting your search or filters.</p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedPlatform('All'); }}
                className="mt-6 px-4 py-2 bg-retro-gray border-2 border-gray-500 hover:border-white font-vt323 text-xl uppercase"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Games;
