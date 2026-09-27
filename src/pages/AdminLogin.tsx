import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock } from 'lucide-react';
import { login } from '../utils/auth';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/admin');
    } else {
      setError('ACCESS DENIED. INVALID CREDENTIALS.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md bg-retro-dark border-4 border-retro-magenta p-8 pixel-corners shadow-neon-magenta">
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-retro-magenta mx-auto mb-4" />
          <h1 className="font-press-start text-2xl text-white">SYSTEM ADMIN</h1>
          <p className="font-vt323 text-xl text-retro-magenta mt-2">RESTRICTED AREA</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block font-vt323 text-xl text-gray-400 mb-2">USERNAME</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black border-2 border-gray-600 focus:border-retro-cyan px-4 py-2 font-vt323 text-xl text-white outline-none"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block font-vt323 text-xl text-gray-400 mb-2">PASSWORD</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border-2 border-gray-600 focus:border-retro-cyan px-4 py-2 font-vt323 text-xl text-white outline-none"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-500 font-vt323 text-xl p-2 text-center animate-pulse">
              {error}
            </div>
          )}

          <button 
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-retro-magenta hover:bg-retro-magenta/80 text-white font-press-start text-sm py-4 border-2 border-transparent hover:border-white transition-all shadow-[0_0_15px_rgba(255,0,255,0.5)]"
          >
            <Lock className="w-4 h-4" />
            LOGIN TO SYSTEM
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
