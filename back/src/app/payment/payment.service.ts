import { sslConfig } from "../config/ssl"
import SSLCommerzPayment from "sslcommerz-lts";

export const PaymentService = {
  initPayment: async (amount: number, userId: string, tourId: string) => {
    const tran_id = "TXN_" + Date.now();

    const data = {
      total_amount: amount,
      currency: "BDT",
      tran_id,
      success_url: `${sslConfig.backend_url}/api/payment/success`,
      fail_url: `${sslConfig.backend_url}/api/payment/fail`,
      cancel_url: `${sslConfig.backend_url}/api/payment/cancel`,
      product_name: "Tour Booking",
      product_category: "Travel",
      product_profile: "general",
      cus_name: "Customer",
      cus_email: "customer@gmail.com",
      cus_add1: "Dhaka",
      cus_phone: "01700000000",
      value_a: userId,  // extra data
      value_b: tourId
    };

    const sslcz = new SSLCommerzPayment(
      sslConfig.store_id,
      sslConfig.store_pass,
      sslConfig.is_live
    );

    const apiResponse = await sslcz.init(data);

    if (!apiResponse?.GatewayPageURL) {
      throw new Error("SSLCommerz session creation failed");
    }

    return { url: apiResponse.GatewayPageURL };
  },

  success: async (payload: any) => {
    // DB Save if needed
    // await Payment.updateOne({ tran_id: payload.tran_id }, { status: "SUCCESS", gateway_response: payload });
    return true;
  },

  fail: async (payload: any) => {
    // await Payment.updateOne({ tran_id: payload.tran_id }, { status: "FAILED" });
    return false;
  },

  cancel: async (payload: any) => {
    // await Payment.updateOne({ tran_id: payload.tran_id }, { status: "CANCELLED" });
    return false;
  },
};
