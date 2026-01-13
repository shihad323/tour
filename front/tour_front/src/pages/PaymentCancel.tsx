import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: call backend to mark payment as canceled
    // Redirect back to bookings page after 2 seconds
    const timer = setTimeout(() => {
      navigate("/bookings");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="mb-4 text-3xl font-bold text-yellow-600">Payment Canceled</h1>
        <p className="mb-6 text-gray-700">You canceled the payment process.</p>
        <a
          href="/bookings"
          className="px-6 py-2 font-semibold text-white transition-colors bg-yellow-500 rounded-lg hover:bg-yellow-600"
        >
          Go Back to Bookings
        </a>
      </div>
    </div>
  );
};

export default PaymentCancel;
