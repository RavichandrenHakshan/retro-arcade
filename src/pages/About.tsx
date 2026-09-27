import { Gamepad2, Code, Shield, HelpCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <Gamepad2 className="w-20 h-20 text-retro-cyan mx-auto mb-6" />
        <h1 className="font-press-start text-4xl text-white">ABOUT RETRO ARCADE</h1>
        <p className="font-vt323 text-2xl text-retro-magenta uppercase tracking-widest">
          Preserving the classics for a new generation
        </p>
      </div>

      <div className="bg-retro-dark p-8 border-4 border-retro-gray pixel-corners space-y-8">
        
        <section className="space-y-4">
          <div className="flex items-center gap-3 border-b-2 border-gray-700 pb-2">
            <HelpCircle className="w-6 h-6 text-retro-yellow" />
            <h2 className="font-press-start text-xl text-white">WHAT IS IT?</h2>
          </div>
          <p className="font-vt323 text-2xl text-gray-300 leading-relaxed">
            Retro Arcade is a browser-based gaming project created to preserve and enjoy the feel of classic games through a modern web experience. Designed with nostalgia in mind, this platform aims to bring the atmosphere of 80s and 90s arcades straight to your modern devices, whether you're playing on a desktop PC or a mobile phone.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 border-b-2 border-gray-700 pb-2">
            <Code className="w-6 h-6 text-retro-cyan" />
            <h2 className="font-press-start text-xl text-white">THE TECH</h2>
          </div>
          <p className="font-vt323 text-2xl text-gray-300 leading-relaxed">
            Built with modern web technologies including React, Vite, and Tailwind CSS. The architecture is designed to be fully static, allowing for seamless hosting on platforms like Vercel or GitHub Pages. The design utilizes custom CSS for CRT effects, pixel-perfect borders, and responsive layouts that adapt to any screen size.
          </p>
        </section>

        <section className="space-y-4 bg-red-950/30 p-6 border-l-4 border-red-500 rounded-r">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-6 h-6 text-red-500" />
            <h2 className="font-press-start text-lg text-white">LEGAL DISCLAIMER</h2>
          </div>
          <p className="font-vt323 text-xl text-red-200 leading-relaxed">
            This platform is intended for educational purposes, homebrew games, public domain titles, and legally owned backups. Users should only play games they have the legal right to access. The demo games listed are placeholders to demonstrate the UI capabilities. No copyrighted ROM files are distributed with this software.
          </p>
        </section>

      </div>

      <div className="text-center font-vt323 text-2xl text-gray-500">
        <p>Developed with passion.</p>
        <p>INSERT COIN TO CONTINUE...</p>
      </div>
    </div>
  );
};

export default About;
