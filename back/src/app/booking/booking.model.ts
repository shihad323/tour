import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a user'],
    },
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
      required: [true, 'Please provide a tour'],
    },
    guestCount: {
      type: Number,
      required: [true, 'Please provide guest count'],
      min: 1,
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number'],
    },
    address: {
      type: String,
      required: [true, 'Please provide an address'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
