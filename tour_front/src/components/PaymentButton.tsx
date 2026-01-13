import { useState } from "react";
import { initPayment } from "../api/payment";

interface Props {
  amount: number;
  userId: string;
  tourId: string;
}

export default function PaymentButton({ amount, userId, tourId }: Props) {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    try {
      setLoading(true);
      const data = await initPayment({ amount, userId, tourId });

      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert("Payment initiation failed!");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePay}
      disabled={loading}
      style={{
        padding: "12px 20px",
        background: "#4f46e5",
        color: "#fff",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
      }}
    >
      {loading ? "Processing..." : "Pay Now"}
    </button>
  );
}
