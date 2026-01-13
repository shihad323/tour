import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTour } from '../context/TourContext';
import { useAuth } from '../context/AuthContext';
import { bookingAPI } from '../api/client';

interface BookingForm {
  guestCount: number;
  phone: string;
  address: string;
}

const TourDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getTourBySlug } = useTour();
  const { user } = useAuth();
  const [tour, setTour] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    guestCount: 1,
    phone: '',
    address: '',
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTour = async () => {
      try {
        if (slug) {
          const tourData = await getTourBySlug(slug);
          setTour(tourData);
        }
      } catch (error) {
        console.error('Failed to fetch tour');
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [slug, getTourBySlug]);

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: name === 'guestCount' ? parseInt(value) : value,
    }));
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setMessage('Please login to book a tour');
      return;
    }

    setBookingLoading(true);
    setMessage('');

    try {
      const bookingData = {
        user: user._id,
        tour: tour._id,
        ...bookingForm,
      };

      await bookingAPI.createBooking(bookingData);
      setMessage('Booking created successfully!');
      setBookingForm({ guestCount: 1, phone: '', address: '' });
    } catch (error: any) {
      setMessage(error.message || 'Failed to create booking');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen"><p className="text-xl text-gray-600">Loading...</p></div>;
  if (!tour) return <div className="flex items-center justify-center min-h-screen"><p className="text-xl text-red-600">Tour not found</p></div>;

  const totalCost = tour.costFrom * bookingForm.guestCount;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{tour.title}</h1>
          <p className="text-lg text-gray-600 flex items-center gap-2">
            <span>📍</span> {tour.location}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              {tour.images && tour.images.length > 0 ? (
                <img src={tour.images[0]} alt={tour.title} className="w-full h-96 object-cover" />
              ) : (
                <div className="w-full h-96 flex items-center justify-center bg-gray-300 text-gray-600">No image available</div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About this Tour</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">{tour.description}</p>

              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Tour Duration</h3>
                  <p className="text-gray-700">
                    {new Date(tour.startDate).toLocaleDateString()} - {new Date(tour.endDate).toLocaleDateString()}
                  </p>
                </div>

                {tour.included && tour.included.length > 0 && (
                  <div className="border-b pb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Included</h3>
                    <ul className="space-y-2">
                      {tour.included.map((item: string, index: number) => (
                        <li key={index} className="text-gray-700 flex items-center gap-2">✓ {item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {tour.excluded && tour.excluded.length > 0 && (
                  <div className="border-b pb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Excluded</h3>
                    <ul className="space-y-2">
                      {tour.excluded.map((item: string, index: number) => (
                        <li key={index} className="text-gray-700 flex items-center gap-2">✗ {item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {tour.amenities && tour.amenities.length > 0 && (
                  <div className="border-b pb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {tour.amenities.map((amenity: string, index: number) => (
                        <span key={index} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {tour.tourPlan && tour.tourPlan.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Tour Plan</h3>
                    <ol className="space-y-2 list-decimal list-inside">
                      {tour.tourPlan.map((plan: string, index: number) => (
                        <li key={index} className="text-gray-700">{plan}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="mb-6 pb-6 border-b">
                <p className="text-sm text-gray-600 mb-1">Starting from</p>
                <p className="text-4xl font-bold text-primary">${tour.costFrom}</p>
              </div>

              <form onSubmit={handleBooking} className="space-y-4">
                {message && (
                  <div className={`p-3 rounded-lg ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Guests</label>
                  <input
                    type="number"
                    name="guestCount"
                    min="1"
                    value={bookingForm.guestCount}
                    onChange={handleBookingChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingForm.phone}
                    onChange={handleBookingChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={bookingForm.address}
                    onChange={handleBookingChange}
                    className="input-field"
                    required
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">Total Cost:</span>
                    <span className="text-2xl font-bold text-primary">${totalCost}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={bookingLoading || !user}
                  className="btn-primary w-full mt-6"
                >
                  {bookingLoading ? 'Booking...' : user ? 'Book Now' : 'Login to Book'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
