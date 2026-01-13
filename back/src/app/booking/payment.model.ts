import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: [true, 'Please provide a booking'],
    },
    transactionId: {
      type: String,
      required: [true, 'Please provide a transaction ID'],
      unique: true,
    },
    status: {
      type: String,
      enum: ['Paid', 'Unpaid', 'Refunded'],
      default: 'Unpaid',
    },
    amount: {
      type: Number,
      required: [true, 'Please provide an amount'],
      min: 0,
    },
    paymentGatewayData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    invoiceUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Payment', paymentSchema);
