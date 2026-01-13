import Booking from './booking.model';
import Payment from './payment.model';
import Tour from '../tour/tour.model';
import User from '../user/user.model';
import { IBooking, IPayment } from '../user/user.interface';

export const createBooking = async (bookingData: IBooking) => {
  const { user, tour, guestCount, phone, address } = bookingData;

  // Verify user and tour exist
  const userExists = await User.findById(user);
  if (!userExists) {
    throw new Error('User not found');
  }

  const tourExists = await Tour.findById(tour);
  if (!tourExists) {
    throw new Error('Tour not found');
  }

  const booking = await Booking.create({
    user,
    tour,
    guestCount,
    phone,
    address,
    status: 'Pending',
  });

  return booking.populate(['user', 'tour']);
};

export const getAllBookings = async (skip: number = 0, limit: number = 10) => {
  const bookings = await Booking.find()
    .populate(['user', 'tour', 'payment'])
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Booking.countDocuments();

  return { bookings, total };
};

export const getBookingsByUser = async (userId: string, skip: number = 0, limit: number = 10) => {
  const bookings = await Booking.find({ user: userId })
    .populate(['tour', 'payment'])
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Booking.countDocuments({ user: userId });

  return { bookings, total };
};

export const getBookingById = async (bookingId: string) => {
  const booking = await Booking.findById(bookingId).populate(['user', 'tour', 'payment']);
  if (!booking) {
    throw new Error('Booking not found');
  }
  return booking;
};

export const updateBooking = async (bookingId: string, bookingData: Partial<IBooking>) => {
  const booking = await Booking.findByIdAndUpdate(bookingId, bookingData, {
    new: true,
    runValidators: true,
  }).populate(['user', 'tour', 'payment']);

  if (!booking) {
    throw new Error('Booking not found');
  }

  return booking;
};

export const cancelBooking = async (bookingId: string) => {
  const booking = await Booking.findByIdAndUpdate(
    bookingId,
    { status: 'Cancelled' },
    { new: true }
  ).populate(['user', 'tour', 'payment']);

  if (!booking) {
    throw new Error('Booking not found');
  }

  // Refund payment if exists
  if (booking.payment) {
    await Payment.findByIdAndUpdate(booking.payment, { status: 'Refunded' });
  }

  return booking;
};

export const createPayment = async (paymentData: IPayment) => {
  const { booking, transactionId, amount, paymentGatewayData } = paymentData;

  // Verify booking exists
  const bookingExists = await Booking.findById(booking);
  if (!bookingExists) {
    throw new Error('Booking not found');
  }

  const payment = await Payment.create({
    booking,
    transactionId,
    status: 'Paid',
    amount,
    paymentGatewayData,
  });

  // Update booking with payment
  await Booking.findByIdAndUpdate(booking, { payment: payment._id, status: 'Completed' });

  return payment.populate('booking');
};

export const getPaymentById = async (paymentId: string) => {
  const payment = await Payment.findById(paymentId).populate({
    path: 'booking',
    populate: { path: 'tour user' },
  });

  if (!payment) {
    throw new Error('Payment not found');
  }

  return payment;
};

export const updatePaymentStatus = async (paymentId: string, status: 'Paid' | 'Unpaid' | 'Refunded') => {
  const payment = await Payment.findByIdAndUpdate(paymentId, { status }, { new: true }).populate('booking');

  if (!payment) {
    throw new Error('Payment not found');
  }

  return payment;
};
