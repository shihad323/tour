import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { resolveImageSrc } from '../utils/image';

const Navbar: React.FC = () => {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white hover:opacity-95 transition-colors">
          🧳 TourHub
        </Link>

        <div className={`flex-1 flex items-center gap-6 ml-8 max-md:hidden`}>
          <Link to="/" className="text-white hover:opacity-95 transition-colors font-medium">
            Home
          </Link>
          <Link to="/tours" className="text-white hover:opacity-95 transition-colors font-medium">
            Tours
          </Link>
          <Link to="/about" className="text-white hover:opacity-95 transition-colors font-medium">
            About
          </Link>
          <Link to="/contact" className="text-white hover:opacity-95 transition-colors font-medium">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4 max-md:hidden">
          {token && user ? (
            <>
              <Link to="/bookings" className="text-white hover:opacity-95 transition-colors font-medium">
                My Bookings
              </Link>
              <div className="flex items-center gap-3 border-l-2 border-white/25 pl-4">
                <Link to="/profile" className="flex items-center gap-2">
                  <img
                    src={resolveImageSrc({ img: user.picture, title: user.name })}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-white"
                  />
                  <span className="text-white font-medium">{user.name}</span>
                </Link>
                <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-white border-2 border-white/40 rounded-lg hover:bg-white/10 transition-colors">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:shadow-lg transition-shadow">
                Register
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 px-4 space-y-3 shadow-lg">
          <Link to="/" className="block text-white hover:opacity-95 transition-colors font-medium" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/tours" className="block text-white hover:opacity-95 transition-colors font-medium" onClick={() => setMenuOpen(false)}>
            Tours
          </Link>
          <Link to="/about" className="block text-white hover:opacity-95 transition-colors font-medium" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" className="block text-white hover:opacity-95 transition-colors font-medium" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <div className="pt-3 mt-3 border-t border-white/20">
            {token && user ? (
              <>
                <Link to="/bookings" className="block text-white hover:opacity-95 transition-colors font-medium mb-3" onClick={() => setMenuOpen(false)}>
                  My Bookings
                </Link>
                <button onClick={handleLogout} className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-2 text-white border-2 border-white/40 rounded-lg text-center mb-2" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="block px-4 py-2 bg-white text-blue-600 rounded-lg text-center" onClick={() => setMenuOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
