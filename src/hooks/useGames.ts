import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { Game } from '../data/games';

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGames = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .order('year', { ascending: false });
      
    if (error) {
      console.error("Error fetching games:", error);
    } else if (data) {
      setGames(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const getGameById = (id: string) => {
    return games.find(g => g.slug === id || g.id === id);
  };

  const categories = Array.from(new Set(games.map(g => g.genre))).sort();
  const platforms = Array.from(new Set(games.map(g => g.platform))).sort();

  return { games, loading, refetch: fetchGames, getGameById, categories, platforms };
};
