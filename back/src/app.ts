import express ,{Request,Response} from "express";
import path from 'path';
import cors from "cors";
import userRoutes from "./app/user/user.route";
import tourRoutes from "./app/tour/tour.route";
import bookingRoutes from "./app/booking/booking.route";
import { PaymentRoutes } from "./app/payment/payment.route";
import { ChatRoutes } from "./app/suggestion/suggestion.route";


const app = express();
app.use(express.json());
app.use(cors());

// serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '..', '..', 'uploads')));

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tours", tourRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/payments", PaymentRoutes);
app.use("/api/chat", ChatRoutes);
// Health check route
app.get("/", (req, res) => {
  res.send("Welcome to Tour Management API");
});

export default app;
