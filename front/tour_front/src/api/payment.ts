const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const initPayment = async ({ amount, userId, tourId }: { amount: number; userId: string; tourId: string; }) => {
  const res = await fetch(`${BACKEND_URL}/api/payment/init`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, userId, tourId }),
  });

  return await res.json();
};
