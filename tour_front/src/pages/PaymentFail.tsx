import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentFail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: call backend to mark payment as failed
    // Redirect back to bookings page after 2 seconds
    const timer = setTimeout(() => {
      navigate("/bookings");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="mb-4 text-3xl font-bold text-red-600">Payment Failed</h1>
        <p className="mb-6 text-gray-700">Your payment could not be completed.</p>
        <a
          href="/bookings"
          className="px-6 py-2 font-semibold text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
        >
          Go Back to Bookings
        </a>
      </div>
    </div>
  );
};

export default PaymentFail;
