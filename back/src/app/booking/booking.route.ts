import { Router } from 'express';
import * as bookingController from './booking.controller';

const router = Router();

// Booking routes
router.post('/', async (req, res) => {
  try {
    const booking = await bookingController.createBooking(req.body);
    res.status(201).json({ success: true, data: booking });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { skip = 0, limit = 10 } = req.query;
    const result = await bookingController.getAllBookings(Number(skip), Number(limit));
    res.status(200).json({ success: true, ...result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const { skip = 0, limit = 10 } = req.query;
    const result = await bookingController.getBookingsByUser(req.params.userId, Number(skip), Number(limit));
    res.status(200).json({ success: true, ...result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const booking = await bookingController.getBookingById(req.params.id);
    res.status(200).json({ success: true, data: booking });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const booking = await bookingController.updateBooking(req.params.id, req.body);
    res.status(200).json({ success: true, data: booking });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.post('/:id/cancel', async (req, res) => {
  try {
    const booking = await bookingController.cancelBooking(req.params.id);
    res.status(200).json({ success: true, data: booking });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Payment routes
router.post('/payment', async (req, res) => {
  try {
    const payment = await bookingController.createPayment(req.body);
    res.status(201).json({ success: true, data: payment });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.get('/payment/:id', async (req, res) => {
  try {
    const payment = await bookingController.getPaymentById(req.params.id);
    res.status(200).json({ success: true, data: payment });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
});

router.put('/payment/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const payment = await bookingController.updatePaymentStatus(req.params.id, status);
    res.status(200).json({ success: true, data: payment });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
