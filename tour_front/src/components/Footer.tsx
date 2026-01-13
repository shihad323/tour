import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 bg-white">
      <div className="w-full bg-gradient-to-r from-blue-600 to-blue-500 py-6">
        <div className="max-w-7xl mx-auto px-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold">🧳 TourHub</div>
            <div className="text-sm opacity-90">Discover curated tours — travel easy</div>
          </div>
          <div className="text-sm opacity-90">Santibag, Dhaka</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold text-lg mb-3">About</h4>
          <p className="text-sm">TourHub brings you handpicked trips across Bangladesh and beyond. Friendly support and simple booking.</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold text-lg mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/tours" className="text-blue-600 hover:text-blue-700">All Tours</Link></li>
            <li><Link to="/about" className="text-blue-600 hover:text-blue-700">About Us</Link></li>
            <li><Link to="/contact" className="text-blue-600 hover:text-blue-700">Contact</Link></li>
            <li><Link to="/register" className="text-blue-600 hover:text-blue-700">Sign Up</Link></li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold text-lg mb-3">Contact</h4>
          <div className="text-sm space-y-2">
            <div>Santibag, Dhaka</div>
            <div>Phone: +880 1XX-XXX-XXXX</div>
            <div>Email: hello@tourhub.example</div>
            <div className="pt-2 flex items-center gap-3">
              <a className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100" href="#">FB</a>
              <a className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100" href="#">TW</a>
              <a className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100" href="#">IG</a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-sm">
          <div>© {new Date().getFullYear()} TourHub. All rights reserved.</div>
          <div className="mt-3 md:mt-0">Made with ♥ in Dhaka</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
