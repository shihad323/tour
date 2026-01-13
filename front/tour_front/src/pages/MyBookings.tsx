import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { bookingAPI } from '../api/client';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface Booking {
  _id: string;
  tour: any;
  guestCount: number;
  phone: string;
  address: string;
  status: string;
  payment?: {
    amount: number;
    status: string;
  };
  createdAt: string;
}

const MyBookings: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const response = await bookingAPI.getUserBookings(user._id);
        setBookings(response.data.bookings);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  // Cancel booking
  const handleCancelBooking = async (bookingId: string) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await bookingAPI.cancelBooking(bookingId);
      setBookings(bookings.map(b =>
        b._id === bookingId ? { ...b, status: 'Cancelled' } : b
      ));
    } catch (err: any) {
      alert(err.message || 'Failed to cancel booking');
    }
  };

  // ✅ New backend-initiated payment
  const handlePayment = async (booking: Booking) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/payment/init`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: booking.tour.price,
          userId: user?._id,
          tourId: booking.tour._id,
        }),
      });

      const data = await res.json();

      if (data?.GatewayPageURL) {
        window.location.href = data.GatewayPageURL; // SSLCommerz redirect
      } else {
        alert("Payment initialization failed");
        console.log(data);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong while initializing payment");
    }
  };

  // Not logged in
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="mb-4 text-xl text-gray-600">Please login to view your bookings</p>
          <a href="/login" className="btn-primary">Go to Login</a>
        </div>
      </div>
    );
  }

  // Loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-xl text-gray-600">Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-6xl px-4 mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-gray-800">My Bookings</h1>

        {error && <div className="mb-6 error-message">{error}</div>}

        {bookings.length === 0 ? (
          <div className="p-12 text-center bg-white shadow-md rounded-xl">
            <p className="mb-6 text-xl text-gray-600">You haven't made any bookings yet</p>
            <a href="/" className="btn-primary">Explore Tours</a>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map(booking => (
              <div key={booking._id} className="p-6 transition-shadow bg-white shadow-md rounded-xl hover:shadow-lg">

                <div className="flex flex-col pb-6 mb-6 border-b md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <h3 className="mb-2 text-2xl font-bold text-gray-800">{booking.tour?.title}</h3>
                    <p className="flex items-center gap-2 text-gray-600">
                      <span>📍</span> {booking.tour?.location}
                    </p>
                  </div>

                  <span className={`px-4 py-2 rounded-full font-semibold text-sm ${
                    booking.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    booking.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {booking.status}
                  </span>
                </div>

                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <p className="mb-1 text-sm text-gray-600">Guests</p>
                    <p className="text-lg font-semibold text-gray-800">{booking.guestCount}</p>
                  </div>

                  <div>
                    <p className="mb-1 text-sm text-gray-600">Phone</p>
                    <p className="text-lg font-semibold text-gray-800">{booking.phone}</p>
                  </div>

                  <div>
                    <p className="mb-1 text-sm text-gray-600">Address</p>
                    <p className="text-lg font-semibold text-gray-800">{booking.address}</p>
                  </div>

                  <div>
                    <p className="mb-1 text-sm text-gray-600">Booked on</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {booking.payment && (
                  <div className="flex items-center justify-between p-4 mb-6 rounded-lg bg-gray-50">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      booking.payment.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      Payment: {booking.payment.status}
                    </span>

                    <span className="text-2xl font-bold text-primary">
                      ৳ {booking.payment.amount}
                    </span>
                  </div>
                )}

                {/* Show Pay Now only for unpaid pending bookings */}
                {booking.payment?.status !== 'Completed' && booking.status === 'Pending' && (
                  <button
                    onClick={() => handlePayment(booking)}
                    className="px-6 py-2 mr-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Pay Now
                  </button>
                )}

                {/* Cancel only if booking is still pending */}
                {booking.status === 'Pending' && (
                  <button
                    onClick={() => handleCancelBooking(booking._id)}
                    className="px-6 py-2 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
