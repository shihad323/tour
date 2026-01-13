import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-8 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">About TourHub</h1>
        <p className="text-lg text-gray-600">Who we are and what we believe in</p>
      </div>

      <div className="px-4 py-12 mx-auto max-w-4xl space-y-8">
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700">
            TourHub started with a simple idea: make meaningful travel accessible to everyone. We partner with
            local operators to design immersive experiences that respect communities and the environment.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700">
            We aim to simplify travel planning by providing transparent pricing, verified reviews, and 24/7 support.
            Our platform helps travelers discover unique tours while supporting responsible local businesses.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Curated tours with verified operators</li>
            <li>Transparent pricing and clear inclusions</li>
            <li>Easy, secure booking and customer support</li>
          </ul>
          <Link to="/tours" className="inline-block mt-4 px-5 py-3 bg-primary text-white rounded-lg hover:shadow-lg">
            Browse Tours
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
