import { useEffect, useState, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Maximize, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { useGames } from '../hooks/useGames';
import { useRecent } from '../hooks/useRecent';
import MobileControls from '../components/MobileControls';

const PlayGame = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { getGameById, loading } = useGames();
  const game = gameId ? getGameById(gameId) : undefined;
  const { addRecentGame } = useRecent();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (game) {
      addRecentGame(game.id);
      // Simulate loading time
      const timer = setTimeout(() => setIsPlaying(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [game, addRecentGame]);

  if (loading) {
    return <div className="min-h-[50vh] flex items-center justify-center font-press-start text-retro-cyan animate-pulse">LOADING...</div>;
  }

  if (!game) {
    return <Navigate to="/games" replace />;
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-6">
        <Link to={`/games/${game.slug}`} className="inline-flex items-center gap-2 font-vt323 text-2xl text-retro-cyan hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          EXIT GAME
        </Link>
        <h1 className="font-press-start text-xl md:text-2xl text-white text-center flex-grow mx-4 truncate">
          {game.title}
        </h1>
      </div>

      {/* Arcade Cabinet Container */}
      <div 
        ref={containerRef}
        className="w-full max-w-4xl bg-retro-dark border-8 border-gray-800 rounded-lg p-2 md:p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative"
      >
        {/* Screen Bezel */}
        <div className="bg-black border-4 border-gray-900 rounded-lg p-2 sm:p-4 relative aspect-video w-full flex items-center justify-center overflow-hidden">
          {/* CRT Effects */}
          <div className="absolute inset-0 pointer-events-none crt z-20"></div>
          
          {!isPlaying ? (
            <div className="text-center z-10 animate-pulse">
              <p className="font-press-start text-xl sm:text-2xl text-white mb-4">LOADING...</p>
              <p className="font-vt323 text-2xl text-retro-cyan">PLEASE WAIT</p>
            </div>
          ) : (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#111] text-white">
              {/* Placeholder for Emulator/Canvas */}
              <div className="text-center p-4">
                <p className="font-press-start text-lg sm:text-xl text-retro-yellow mb-6">
                  DEMO SCREEN
                </p>
                <img 
                  src={game.thumbnail} 
                  alt="Gameplay Demo" 
                  className="w-full max-w-sm mx-auto object-cover opacity-50 pixel-corners border-2 border-gray-700" 
                />
                <p className="font-vt323 text-2xl mt-6 text-gray-400">
                  Emulator integration placeholder.<br />
                  Add your game ROM or HTML5 canvas here.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Cabinet Controls (Desktop) */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 hidden sm:flex bg-gray-900 p-4 rounded-b-lg border-t-2 border-gray-800">
          <button 
            onClick={toggleFullscreen}
            className="p-3 bg-gray-800 hover:bg-gray-700 text-white rounded shadow-[inset_0_-4px_0_rgba(0,0,0,0.5)] active:shadow-[inset_0_0_0_rgba(0,0,0,0)] active:translate-y-1 transition-all"
            title="Fullscreen"
          >
            <Maximize className="w-6 h-6" />
          </button>
          <button 
            className="p-3 bg-gray-800 hover:bg-gray-700 text-white rounded shadow-[inset_0_-4px_0_rgba(0,0,0,0.5)] active:shadow-[inset_0_0_0_rgba(0,0,0,0)] active:translate-y-1 transition-all"
            title="Pause/Play"
          >
            <Pause className="w-6 h-6" />
          </button>
          <button 
            className="p-3 bg-gray-800 hover:bg-gray-700 text-white rounded shadow-[inset_0_-4px_0_rgba(0,0,0,0.5)] active:shadow-[inset_0_0_0_rgba(0,0,0,0)] active:translate-y-1 transition-all"
            title="Restart"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-3 bg-gray-800 hover:bg-gray-700 text-white rounded shadow-[inset_0_-4px_0_rgba(0,0,0,0.5)] active:shadow-[inset_0_0_0_rgba(0,0,0,0)] active:translate-y-1 transition-all"
            title="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </button>
          <div className="ml-auto flex gap-4">
            <Link 
              to={`/games/${game.slug}`}
              className="p-3 bg-red-900 hover:bg-red-800 text-white rounded shadow-[inset_0_-4px_0_rgba(0,0,0,0.5)] active:shadow-[inset_0_0_0_rgba(0,0,0,0)] active:translate-y-1 transition-all font-vt323 text-xl uppercase px-6"
            >
              Exit
            </Link>
          </div>
        </div>

        {/* Mobile On-Screen Controls */}
        <div className="sm:hidden mt-4">
          <MobileControls />
        </div>
      </div>
    </div>
  );
};

export default PlayGame;
