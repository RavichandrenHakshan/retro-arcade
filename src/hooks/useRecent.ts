import { useState, useEffect } from 'react';
import { getStoredItem, setStoredItem } from '../utils/storage';

const RECENT_KEY = 'retro_arcade_recent';
const MAX_RECENT = 10;

export const useRecent = () => {
  const [recentGames, setRecentGames] = useState<string[]>([]);

  useEffect(() => {
    setRecentGames(getStoredItem<string[]>(RECENT_KEY, []));
  }, []);

  const addRecentGame = (gameId: string) => {
    setRecentGames(prev => {
      const newRecent = [gameId, ...prev.filter(id => id !== gameId)].slice(0, MAX_RECENT);
      setStoredItem(RECENT_KEY, newRecent);
      return newRecent;
    });
  };

  return { recentGames, addRecentGame };
};
