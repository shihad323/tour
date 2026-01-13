import { Schema, model } from "mongoose";

const PaymentSchema = new Schema(
  {
    tran_id: { type: String, required: true },
    amount: Number,
    status: { type: String, default: "PENDING" },
    userId: String,
    tourId: String,
    gateway_response: Object
  },
  { timestamps: true }
);

export const Payment = model("Payment", PaymentSchema);
