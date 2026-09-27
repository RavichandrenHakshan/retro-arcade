import { useState, useEffect } from 'react';
import { getStoredItem, setStoredItem } from '../utils/storage';

const FAVORITES_KEY = 'retro_arcade_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getStoredItem<string[]>(FAVORITES_KEY, []));
  }, []);

  const toggleFavorite = (gameId: string) => {
    setFavorites(prev => {
      const newFavs = prev.includes(gameId) 
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId];
      
      setStoredItem(FAVORITES_KEY, newFavs);
      return newFavs;
    });
  };

  const isFavorite = (gameId: string) => favorites.includes(gameId);

  return { favorites, toggleFavorite, isFavorite };
};
