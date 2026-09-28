import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, LogOut, Plus, Trash2, Save } from 'lucide-react';
import { Game } from '../data/games';
import { logout } from '../utils/auth';
import { supabase } from '../utils/supabase';
import { useGames } from '../hooks/useGames';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { games, loading, refetch } = useGames();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Game>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      await supabase.from('games').delete().eq('id', id);
      refetch();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.id) {
      alert("ID and Title are required");
      return;
    }
    
    setIsSaving(true);
    // Ensure minimum fields are present
    const newGame = {
      ...formData,
      slug: formData.slug || formData.id,
      year: formData.year || new Date().getFullYear(),
      controls: formData.controls || { "Action": "Spacebar" }
    } as Game;

    // Handle File Upload to Supabase Storage
    if (selectedFile) {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${newGame.id}-${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('roms')
        .upload(fileName, selectedFile);
        
      if (uploadError) {
        console.error("Error uploading file:", uploadError);
        alert("Error uploading ROM file. Did you create the 'roms' public bucket in Supabase?");
      } else if (uploadData) {
        const { data: { publicUrl } } = supabase.storage.from('roms').getPublicUrl(fileName);
        newGame.gamepath = publicUrl;
      }
    }

    const { error } = await supabase.from('games').upsert(newGame);
    
    if (error) {
      console.error("Error saving game:", error);
      alert("Failed to save game");
    } else {
      setIsEditing(false);
      setFormData({});
      setSelectedFile(null);
      refetch();
    }
    setIsSaving(false);
  };

  const openEditor = (game?: Game) => {
    if (game) {
      setFormData(game);
    } else {
      setFormData({
        id: '', title: '', description: '', genre: 'Arcade', platform: 'Web',
        thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80',
        cover: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
        developer: 'Unknown',
        controls: { "Move": "Arrows", "Action": "Spacebar" }
      });
    }
    setSelectedFile(null);
    setIsEditing(true);
  };

  if (loading) {
    return <div className="min-h-[50vh] flex items-center justify-center font-press-start text-retro-cyan animate-pulse">LOADING DASHBOARD...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b-2 border-retro-magenta pb-4">
        <div>
          <h1 className="font-press-start text-2xl md:text-3xl text-retro-magenta flex items-center gap-3">
            <ShieldAlert className="w-8 h-8" />
            ADMIN DASHBOARD
          </h1>
          <p className="font-vt323 text-xl text-gray-400 mt-2">Manage website content and game library</p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-vt323 text-xl px-4 py-2 border border-gray-600 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          LOGOUT
        </button>
      </div>

      {!isEditing ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-retro-dark p-4 border border-gray-700 pixel-corners">
            <h2 className="font-vt323 text-2xl text-white">Game Library ({games.length})</h2>
            <button 
              onClick={() => openEditor()}
              className="flex items-center gap-2 bg-retro-cyan hover:bg-retro-cyan/80 text-black font-press-start text-xs px-4 py-2 shadow-neon-cyan transition-all"
            >
              <Plus className="w-4 h-4" />
              ADD NEW GAME
            </button>
          </div>

          <div className="bg-retro-dark border border-gray-700 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-900 border-b-2 border-gray-700 font-vt323 text-xl text-gray-400">
                  <th className="p-4">Game Title</th>
                  <th className="p-4">Platform</th>
                  <th className="p-4">Genre</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {games.map(game => (
                  <tr key={game.id} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                    <td className="p-4 font-vt323 text-2xl text-white">{game.title}</td>
                    <td className="p-4 font-vt323 text-xl text-retro-magenta">{game.platform}</td>
                    <td className="p-4 font-vt323 text-xl text-retro-cyan">{game.genre}</td>
                    <td className="p-4 flex gap-3">
                      <button 
                        onClick={() => openEditor(game)}
                        className="text-gray-400 hover:text-white font-vt323 text-xl px-3 py-1 bg-gray-800 border border-gray-600"
                      >
                        EDIT
                      </button>
                      <button 
                        onClick={() => handleDelete(game.id)}
                        className="text-red-400 hover:text-red-300 font-vt323 text-xl px-3 py-1 bg-red-900/30 border border-red-900 hover:bg-red-900/50"
                      >
                        <Trash2 className="w-5 h-5 inline-block" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-retro-dark border-2 border-gray-700 p-6 pixel-corners">
          <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
            <h2 className="font-press-start text-xl text-retro-cyan">
              {formData.title ? 'EDIT GAME' : 'ADD NEW GAME'}
            </h2>
            <button 
              onClick={() => setIsEditing(false)}
              className="text-gray-400 hover:text-white font-vt323 text-xl"
            >
              [ CANCEL ]
            </button>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block font-vt323 text-xl text-gray-400">ID (URL Slug)</label>
                <input 
                  required
                  type="text" 
                  value={formData.id || ''}
                  onChange={e => setFormData({...formData, id: e.target.value, slug: e.target.value})}
                  className="w-full bg-black border border-gray-600 focus:border-retro-cyan p-2 font-vt323 text-xl text-white outline-none"
                />
              </div>
              <div>
                <label className="block font-vt323 text-xl text-gray-400">Title</label>
                <input 
                  required
                  type="text" 
                  value={formData.title || ''}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-black border border-gray-600 focus:border-retro-cyan p-2 font-vt323 text-xl text-white outline-none"
                />
              </div>
              <div>
                <label className="block font-vt323 text-xl text-gray-400">Description</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.description || ''}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-black border border-gray-600 focus:border-retro-cyan p-2 font-vt323 text-xl text-white outline-none"
                />
              </div>
              <div>
                <label className="block font-vt323 text-xl text-gray-400">Thumbnail URL</label>
                <input 
                  required
                  type="text" 
                  value={formData.thumbnail || ''}
                  onChange={e => setFormData({...formData, thumbnail: e.target.value})}
                  className="w-full bg-black border border-gray-600 focus:border-retro-cyan p-2 font-vt323 text-xl text-white outline-none"
                />
              </div>
              <div>
                <label className="block font-vt323 text-xl text-gray-400">Cover URL</label>
                <input 
                  required
                  type="text" 
                  value={formData.cover || ''}
                  onChange={e => setFormData({...formData, cover: e.target.value})}
                  className="w-full bg-black border border-gray-600 focus:border-retro-cyan p-2 font-vt323 text-xl text-white outline-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-vt323 text-xl text-gray-400">Genre</label>
                <input 
                  required
                  type="text" 
                  value={formData.genre || ''}
                  onChange={e => setFormData({...formData, genre: e.target.value})}
                  className="w-full bg-black border border-gray-600 focus:border-retro-cyan p-2 font-vt323 text-xl text-white outline-none"
                />
              </div>
              <div>
                <label className="block font-vt323 text-xl text-gray-400">Platform</label>
                <input 
                  required
                  type="text" 
                  value={formData.platform || ''}
                  onChange={e => setFormData({...formData, platform: e.target.value})}
                  className="w-full bg-black border border-gray-600 focus:border-retro-cyan p-2 font-vt323 text-xl text-white outline-none"
                />
              </div>
              <div>
                <label className="block font-vt323 text-xl text-gray-400">Release Year</label>
                <input 
                  required
                  type="number" 
                  value={formData.year || ''}
                  onChange={e => setFormData({...formData, year: parseInt(e.target.value)})}
                  className="w-full bg-black border border-gray-600 focus:border-retro-cyan p-2 font-vt323 text-xl text-white outline-none"
                />
              </div>
              <div>
                <label className="block font-vt323 text-xl text-gray-400">Developer</label>
                <input 
                  required
                  type="text" 
                  value={formData.developer || ''}
                  onChange={e => setFormData({...formData, developer: e.target.value})}
                  className="w-full bg-black border border-gray-600 focus:border-retro-cyan p-2 font-vt323 text-xl text-white outline-none"
                />
              </div>

              <div>
                <label className="block font-vt323 text-xl text-retro-yellow">ROM URL (Internet Archive, etc.)</label>
                <input 
                  type="text" 
                  value={formData.gamepath || ''}
                  onChange={e => setFormData({...formData, gamepath: e.target.value})}
                  className="w-full bg-black border border-retro-yellow focus:border-white p-2 font-vt323 text-xl text-white outline-none"
                  placeholder="https://archive.org/download/.../game.nes"
                />
                <p className="text-sm text-gray-400 mt-1 font-vt323">
                  Paste a direct ROM link instead of uploading a file.
                </p>
              </div>

              <div className="bg-gray-900/50 p-4 border border-gray-700">
                <label className="block font-vt323 text-xl text-retro-cyan mb-2">Upload ROM File</label>
                <input 
                  type="file" 
                  accept=".nes,.sfc,.smc,.md,.gb,.gba"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedFile(file);
                    }
                  }}
                  className="w-full bg-black border border-gray-600 focus:border-retro-cyan p-2 font-vt323 text-xl text-white outline-none 
                             file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-press-start file:bg-retro-cyan file:text-black hover:file:bg-retro-cyan/80 cursor-pointer"
                />
                <p className="text-sm text-gray-400 mt-2 font-vt323">
                  Supported formats: .nes, .sfc, .smc, .md, .gb, .gba
                </p>
                {selectedFile && (
                  <p className="text-sm text-retro-green mt-1 font-vt323">
                    Selected: {selectedFile.name}
                  </p>
                )}
                {formData.gamepath && !selectedFile && (
                  <p className="text-sm text-gray-500 mt-1 font-vt323 truncate">
                    Current: {formData.gamepath}
                  </p>
                )}
              </div>
              
              <div className="pt-6">
                <button 
                  type="submit"
                  disabled={isSaving}
                  className="w-full flex items-center justify-center gap-2 bg-retro-green hover:bg-retro-green/80 text-black font-press-start text-sm py-4 border-2 border-transparent transition-all shadow-[0_0_15px_rgba(57,255,20,0.4)] disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  {isSaving ? 'SAVING...' : 'SAVE GAME'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
