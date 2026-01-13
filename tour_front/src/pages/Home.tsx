import React from 'react';
import AISearch from '../components/AISearch';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-8 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">Explore Amazing Tours</h1>
        <p className="text-lg text-gray-600">Discover the world's most beautiful destinations</p>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl grid gap-12 lg:grid-cols-2">
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">About TourHub</h2>
          <p className="text-gray-700 mb-4">
            TourHub is a curated travel marketplace connecting travelers with trusted local operators.
            We focus on sustainable, affordable, and unforgettable experiences across the globe.
          </p>
          <p className="text-gray-700 mb-4">
            Our mission is to make travel planning simple by offering transparent pricing, verified reviews,
            and 24/7 customer support.
          </p>
          <Link to="/tours" className="inline-block mt-2 px-5 py-3 bg-primary text-white rounded-lg hover:shadow-lg">
            Browse All Tours
          </Link>
        </div>

        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Our Packages</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Best Price Guarantee:</strong> Competitive pricing with clear inclusions.</li>
            <li><strong>Verified Operators:</strong> We vet partners for safety and quality.</li>
            <li><strong>Flexible Booking:</strong> Easy cancellations and date changes.</li>
            <li><strong>Local Experiences:</strong> Authentic itineraries led by local guides.</li>
            <li><strong>Customer Support:</strong> 24/7 multilingual support for travelers.</li>
          </ul>
        </div>

        <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">1</div>
              <p className="text-gray-700">Search & Discover tours that match your interests.</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">2</div>
              <p className="text-gray-700">Compare prices, dates, and inclusions easily.</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">3</div>
              <p className="text-gray-700">Book securely and receive confirmation instantly.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Quick Search</h2>
          <AISearch />
        </div>
      </div>
    </div>
  );
};

export default Home;
