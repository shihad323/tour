import React, { useEffect } from 'react';
import { useTour } from '../context/TourContext';
import TourCard from '../components/TourCard';

const Home: React.FC = () => {
  const { tours, isLoading, error, fetchTours } = useTour();

  useEffect(() => {
    fetchTours(0, 12);
  }, [fetchTours]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-20 text-center text-white bg-gradient-to-r from-primary to-secondary">
        <h1 className="mb-4 text-5xl font-bold">Explore Amazing Tours</h1>
        <p className="text-xl text-gray-100">Discover the world's most beautiful destinations</p>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl">
        <h2 className="mb-8 text-4xl font-bold text-gray-800">Feature Tours</h2>
        {error && <div className="error-message">{error}</div>}
        {isLoading ? (
          <div className="py-12 text-center">
            <p className="text-xl text-gray-600">Loading tours...</p>
          </div>
        ) : tours.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tours.map(tour => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-xl text-gray-600">No tours found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
