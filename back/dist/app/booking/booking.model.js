"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user'],
    },
    tour: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Payment',
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Booking', bookingSchema);
