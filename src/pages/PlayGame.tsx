import { useEffect, useState, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Maximize } from 'lucide-react';
import { useGames } from '../hooks/useGames';
import { useRecent } from '../hooks/useRecent';
import MobileControls from '../components/MobileControls';
import { Nostalgist } from 'nostalgist';

const PlayGame = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { getGameById, loading } = useGames();
  const game = gameId ? getGameById(gameId) : undefined;
  const { addRecentGame } = useRecent();
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const emulatorContainerRef = useRef<HTMLCanvasElement>(null);
  const nostalgistRef = useRef<any>(null);

  useEffect(() => {
    if (game) {
      addRecentGame(game.id);
    }
  }, [game, addRecentGame]);

  const launchEmulator = async () => {
    if (!game?.gamepath) {
      setError("No ROM file was found for this game.");
      return;
    }
    
    setIsPlaying(true);
    setError('');

    try {
      let core = 'fceumm'; // default NES
      const path = game.gamepath.toLowerCase();
      if (path.includes('.sfc') || path.includes('.smc')) core = 'snes9x';
      else if (path.includes('.md') || path.includes('.gen')) core = 'genesis_plus_gx';
      else if (path.includes('.gba')) core = 'mgba';
      else if (path.includes('.gb') || path.includes('.gbc')) core = 'gambatte';

      nostalgistRef.current = await Nostalgist.launch({
        core,
        rom: game.gamepath,
        element: emulatorContainerRef.current!,
        resolveCoreJs: () => `https://unpkg.com/nostalgist/dist/nostalgist.js`,
      });
    } catch (err: any) {
      console.error(err);
      setError("Failed to launch emulator. " + err.message);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup emulator on unmount
      if (nostalgistRef.current) {
        nostalgistRef.current.exit();
      }
    };
  }, []);

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
          <div className="absolute inset-0 pointer-events-none crt z-30"></div>
          
          {/* Permanent Canvas for Emulator */}
          <canvas 
            ref={emulatorContainerRef} 
            className={`absolute inset-0 z-10 w-full h-full object-contain bg-black ${!isPlaying ? 'invisible' : ''}`} 
          />

          {!isPlaying && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#111] text-white overflow-hidden">
              <div className="text-center p-4 z-30">
                <img 
                  src={game.thumbnail} 
                  alt="Gameplay Demo" 
                  className="w-full max-w-sm mx-auto object-cover opacity-60 pixel-corners border-2 border-gray-700 mb-6" 
                />
                {error ? (
                  <p className="font-vt323 text-2xl text-red-500 mb-6">{error}</p>
                ) : (
                  <button 
                    onClick={launchEmulator}
                    className="font-press-start text-xl text-black bg-retro-cyan hover:bg-white px-6 py-4 border-4 border-retro-cyan transition-colors"
                  >
                    INSERT COIN TO PLAY
                  </button>
                )}
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
