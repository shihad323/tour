import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTour } from '../context/TourContext';
import { useAuth } from '../context/AuthContext';
import { bookingAPI } from '../api/client';
import AISearch from '../components/AISearch';
import { resolveImageSrc } from '../utils/image';

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
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

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

  const resolveSrc = (img?: string, idx?: number) => resolveImageSrc({ img, slug: tour?.slug, title: tour?.title, index: idx });

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-800">{tour.title}</h1>
          <p className="flex items-center gap-2 text-lg text-gray-600">
            <span>📍</span> {tour.location}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6 overflow-hidden bg-white shadow-md rounded-xl">
              {/* Main image */}
              {(() => {
                const firstImg = tour.images && tour.images.length > 0 ? tour.images[currentImageIndex] : undefined;
                const src = resolveSrc(firstImg, currentImageIndex);
                return (
                  <img src={src} alt={`${tour.title} - ${currentImageIndex + 1}`} className="object-cover w-full h-96" />
                );
              })()}

              {/* Thumbnails / options (1..5) */}
              <div className="mt-3 px-3 py-2 flex items-center gap-3 overflow-x-auto">
                {Array.from({ length: 5 }).map((_, idx) => {
                  const imgForIdx = tour.images && tour.images.length > idx ? tour.images[idx] : undefined;
                  const thumb = resolveSrc(imgForIdx, idx);
                  const active = currentImageIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-none rounded-lg overflow-hidden border-2 ${active ? 'border-primary' : 'border-transparent'} focus:outline-none`}
                      aria-label={`Image ${idx + 1}`}
                    >
                      <img src={thumb} alt={`thumb-${idx + 1}`} className="w-24 h-16 object-cover" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-8 bg-white shadow-md rounded-xl">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">About this Tour</h2>
              <p className="mb-6 leading-relaxed text-gray-700">{tour.description}</p>

              <div className="space-y-6">
                <div className="pb-4 border-b">
                  <h3 className="mb-2 text-xl font-bold text-gray-800">Tour Duration</h3>
                  <p className="text-gray-700">
                    {new Date(tour.startDate).toLocaleDateString()} - {new Date(tour.endDate).toLocaleDateString()}
                  </p>
                </div>

                {tour.included && tour.included.length > 0 && (
                  <div className="pb-4 border-b">
                    <h3 className="mb-3 text-xl font-bold text-gray-800">Included</h3>
                    <ul className="space-y-2">
                      {tour.included.map((item: string, index: number) => (
                        <li key={index} className="flex items-center gap-2 text-gray-700">✓ {item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {tour.excluded && tour.excluded.length > 0 && (
                  <div className="pb-4 border-b">
                    <h3 className="mb-3 text-xl font-bold text-gray-800">Excluded</h3>
                    <ul className="space-y-2">
                      {tour.excluded.map((item: string, index: number) => (
                        <li key={index} className="flex items-center gap-2 text-gray-700">✗ {item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {tour.amenities && tour.amenities.length > 0 && (
                  <div className="pb-4 border-b">
                    <h3 className="mb-3 text-xl font-bold text-gray-800">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {tour.amenities.map((amenity: string, index: number) => (
                        <span key={index} className="px-4 py-2 text-sm font-semibold rounded-full bg-primary/10 text-primary">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {tour.tourPlan && tour.tourPlan.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-xl font-bold text-gray-800">Tour Plan</h3>
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
            <div className="sticky p-6 bg-white shadow-md rounded-xl top-24">
              <div className="pb-6 mb-6 border-b">
                <p className="mb-1 text-sm text-gray-600">Starting from</p>
                <p className="text-4xl font-bold text-primary">${tour.costFrom}</p>
              </div>

              <form onSubmit={handleBooking} className="space-y-4">
                {message && (
                  <div className={`p-3 rounded-lg ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                  </div>
                )}

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">Number of Guests</label>
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
                  <label className="block mb-2 text-sm font-semibold text-gray-700">Phone Number</label>
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
                  <label className="block mb-2 text-sm font-semibold text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={bookingForm.address}
                    onChange={handleBookingChange}
                    className="input-field"
                    required
                  />
                </div>

                <div className="p-4 rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-700">Total Cost:</span>
                    <span className="text-2xl font-bold text-primary">${totalCost}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={bookingLoading || !user}
                  className="w-full mt-6 btn-primary"
                >
                  {bookingLoading ? 'Booking...' : user ? 'Book Now' : 'Login to Book'}
                </button>
              </form>
            </div>
             
          </div>
          <AISearch />
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
