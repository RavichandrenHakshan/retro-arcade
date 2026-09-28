import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-retro-dark border-t-2 border-retro-gray py-6 mt-12 relative z-10">
      <div className="container mx-auto px-4 text-center">
        <p className="font-vt323 text-xl text-gray-500 mb-2">
          &copy; {new Date().getFullYear()} RETRO ARCADE. ALL RIGHTS RESERVED.
        </p>
        <p className="font-vt323 text-lg text-gray-600 mb-4">
          INSERT COIN TO CONTINUE...
        </p>
      </div>
    </footer>
  );
};

export default Footer;
