"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./app/user/user.route"));
const tour_route_1 = __importDefault(require("./app/tour/tour.route"));
const booking_route_1 = __importDefault(require("./app/booking/booking.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use("/api/v1/users", user_route_1.default);
app.use("/api/v1/tours", tour_route_1.default);
app.use("/api/v1/bookings", booking_route_1.default);
// Health check route
app.get("/", (req, res) => {
    res.send("Welcome to Tour Management API");
});
exports.default = app;
