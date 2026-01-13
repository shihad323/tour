"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const paymentSchema = new mongoose_1.default.Schema({
    booking: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
        type: mongoose_1.default.Schema.Types.Mixed,
        default: {},
    },
    invoiceUrl: {
        type: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Payment', paymentSchema);
