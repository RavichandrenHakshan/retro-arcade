import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Gamepad2, Heart, Home, Info, Search, Menu, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Games', path: '/games', icon: Gamepad2 },
    { name: 'Favorites', path: '/favorites', icon: Heart },
    { name: 'About', path: '/about', icon: Info },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-retro-dark border-b-4 border-retro-cyan sticky top-0 z-50 shadow-neon-cyan">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
            <Gamepad2 className="w-8 h-8 text-retro-cyan group-hover:text-retro-magenta transition-colors" />
            <span className="font-press-start text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-retro-cyan to-retro-magenta">
              RETRO ARCADE
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center gap-2 font-vt323 text-2xl uppercase hover:text-retro-cyan transition-colors",
                    isActive ? "text-retro-cyan shadow-[0_2px_0_0_currentColor]" : "text-gray-400"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {link.name}
                </Link>
              );
            })}
            <Link to="/games" className="text-gray-400 hover:text-retro-magenta transition-colors">
              <Search className="w-6 h-6" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-retro-cyan hover:text-retro-magenta focus:outline-none"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-retro-dark border-b-4 border-retro-magenta shadow-neon-magenta absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={cn(
                    "flex items-center gap-3 px-3 py-4 rounded-md font-vt323 text-3xl uppercase",
                    isActive ? "bg-retro-gray text-retro-cyan" : "text-gray-400 hover:bg-retro-gray hover:text-white"
                  )}
                >
                  <Icon className="w-6 h-6" />
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
