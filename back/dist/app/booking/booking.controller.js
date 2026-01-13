"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentStatus = exports.getPaymentById = exports.createPayment = exports.cancelBooking = exports.updateBooking = exports.getBookingById = exports.getBookingsByUser = exports.getAllBookings = exports.createBooking = void 0;
const booking_model_1 = __importDefault(require("./booking.model"));
const payment_model_1 = __importDefault(require("./payment.model"));
const tour_model_1 = __importDefault(require("../tour/tour.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const createBooking = async (bookingData) => {
    const { user, tour, guestCount, phone, address } = bookingData;
    // Verify user and tour exist
    const userExists = await user_model_1.default.findById(user);
    if (!userExists) {
        throw new Error('User not found');
    }
    const tourExists = await tour_model_1.default.findById(tour);
    if (!tourExists) {
        throw new Error('Tour not found');
    }
    const booking = await booking_model_1.default.create({
        user,
        tour,
        guestCount,
        phone,
        address,
        status: 'Pending',
    });
    return booking.populate(['user', 'tour']);
};
exports.createBooking = createBooking;
const getAllBookings = async (skip = 0, limit = 10) => {
    const bookings = await booking_model_1.default.find()
        .populate(['user', 'tour', 'payment'])
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
    const total = await booking_model_1.default.countDocuments();
    return { bookings, total };
};
exports.getAllBookings = getAllBookings;
const getBookingsByUser = async (userId, skip = 0, limit = 10) => {
    const bookings = await booking_model_1.default.find({ user: userId })
        .populate(['tour', 'payment'])
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
    const total = await booking_model_1.default.countDocuments({ user: userId });
    return { bookings, total };
};
exports.getBookingsByUser = getBookingsByUser;
const getBookingById = async (bookingId) => {
    const booking = await booking_model_1.default.findById(bookingId).populate(['user', 'tour', 'payment']);
    if (!booking) {
        throw new Error('Booking not found');
    }
    return booking;
};
exports.getBookingById = getBookingById;
const updateBooking = async (bookingId, bookingData) => {
    const booking = await booking_model_1.default.findByIdAndUpdate(bookingId, bookingData, {
        new: true,
        runValidators: true,
    }).populate(['user', 'tour', 'payment']);
    if (!booking) {
        throw new Error('Booking not found');
    }
    return booking;
};
exports.updateBooking = updateBooking;
const cancelBooking = async (bookingId) => {
    const booking = await booking_model_1.default.findByIdAndUpdate(bookingId, { status: 'Cancelled' }, { new: true }).populate(['user', 'tour', 'payment']);
    if (!booking) {
        throw new Error('Booking not found');
    }
    // Refund payment if exists
    if (booking.payment) {
        await payment_model_1.default.findByIdAndUpdate(booking.payment, { status: 'Refunded' });
    }
    return booking;
};
exports.cancelBooking = cancelBooking;
const createPayment = async (paymentData) => {
    const { booking, transactionId, amount, paymentGatewayData } = paymentData;
    // Verify booking exists
    const bookingExists = await booking_model_1.default.findById(booking);
    if (!bookingExists) {
        throw new Error('Booking not found');
    }
    const payment = await payment_model_1.default.create({
        booking,
        transactionId,
        status: 'Paid',
        amount,
        paymentGatewayData,
    });
    // Update booking with payment
    await booking_model_1.default.findByIdAndUpdate(booking, { payment: payment._id, status: 'Completed' });
    return payment.populate('booking');
};
exports.createPayment = createPayment;
const getPaymentById = async (paymentId) => {
    const payment = await payment_model_1.default.findById(paymentId).populate({
        path: 'booking',
        populate: { path: 'tour user' },
    });
    if (!payment) {
        throw new Error('Payment not found');
    }
    return payment;
};
exports.getPaymentById = getPaymentById;
const updatePaymentStatus = async (paymentId, status) => {
    const payment = await payment_model_1.default.findByIdAndUpdate(paymentId, { status }, { new: true }).populate('booking');
    if (!payment) {
        throw new Error('Payment not found');
    }
    return payment;
};
exports.updatePaymentStatus = updatePaymentStatus;
