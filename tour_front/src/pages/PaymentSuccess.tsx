import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Optionally: call backend to verify payment and update booking
    // Then redirect to MyBookings page after 2 seconds
    setTimeout(() => {
      navigate("/bookings");
    }, 2000);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Payment Successful!</h1>
    </div>
  );
};

export default PaymentSuccess;
