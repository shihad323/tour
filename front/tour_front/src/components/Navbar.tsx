import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
    <nav className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary hover:text-secondary transition-colors">
          🧳 TourHub
        </Link>

        <div className={`flex-1 flex items-center gap-8 ml-8 max-md:hidden`}>
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <a href="#tours" className="text-gray-700 hover:text-primary transition-colors font-medium">
            Tours
          </a>
          <a href="#about" className="text-gray-700 hover:text-primary transition-colors font-medium">
            About
          </a>
          <a href="#contact" className="text-gray-700 hover:text-primary transition-colors font-medium">
            Contact
          </a>
        </div>

        <div className="flex items-center gap-4 max-md:hidden">
          {token && user ? (
            <>
              <Link to="/bookings" className="text-gray-700 hover:text-primary transition-colors font-medium">
                My Bookings
              </Link>
              <div className="flex items-center gap-3 border-l-2 border-gray-300 pl-4">
                <span className="text-gray-700 font-medium">{user.name}</span>
                <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transition-shadow">
                Register
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-50 border-t-2 border-gray-200 py-4 px-4 space-y-3">
          <Link to="/" className="block text-gray-700 hover:text-primary transition-colors font-medium" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <a href="#tours" className="block text-gray-700 hover:text-primary transition-colors font-medium">
            Tours
          </a>
          <a href="#about" className="block text-gray-700 hover:text-primary transition-colors font-medium">
            About
          </a>
          <a href="#contact" className="block text-gray-700 hover:text-primary transition-colors font-medium">
            Contact
          </a>
          <div className="border-t-2 border-gray-200 pt-3 mt-3">
            {token && user ? (
              <>
                <Link to="/bookings" className="block text-gray-700 hover:text-primary transition-colors font-medium mb-3" onClick={() => setMenuOpen(false)}>
                  My Bookings
                </Link>
                <button onClick={handleLogout} className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-2 text-primary border-2 border-primary rounded-lg text-center mb-2" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="block px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg text-center" onClick={() => setMenuOpen(false)}>
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
