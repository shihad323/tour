import React, { useEffect } from 'react';
import { useTour } from '../context/TourContext';
import TourCard from '../components/TourCard';

const Tours: React.FC = () => {
  const { tours, isLoading, error, fetchTours, totalTours } = useTour();

  useEffect(() => {
    // fetch a large page to show all tours serially
    fetchTours(0, 1000);
  }, [fetchTours]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-8 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">All Tours</h1>
        <p className="text-lg text-gray-600">Browse all available tours</p>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl">
        <h2 className="mb-8 text-2xl font-semibold text-gray-800">Total: {totalTours || tours.length}</h2>
        {error && <div className="error-message">{error}</div>}
        {isLoading ? (
          <div className="py-12 text-center">
            <p className="text-xl text-gray-600">Loading tours...</p>
          </div>
        ) : tours.length > 0 ? (
          <div className="space-y-6">
            {tours.map((tour, idx) => (
              <div key={tour._id} className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-gray-500 w-12 text-center">{idx + 1}.</div>
                <div className="flex-1">
                  <TourCard tour={tour} />
                </div>
              </div>
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

export default Tours;
