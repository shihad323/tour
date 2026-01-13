"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const tourSchema = new mongoose_1.default.Schema({
    slug: {
        type: String,
        required: [true, 'Please provide a slug'],
        unique: true,
        lowercase: true,
    },
    title: {
        type: String,
        required: [true, 'Please provide a title'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
    },
    images: {
        type: [String],
        default: [],
    },
    location: {
        type: String,
        required: [true, 'Please provide a location'],
    },
    costFrom: {
        type: Number,
        required: [true, 'Please provide a cost'],
        min: 0,
    },
    startDate: {
        type: Date,
        required: [true, 'Please provide a start date'],
    },
    endDate: {
        type: Date,
        required: [true, 'Please provide an end date'],
    },
    tourType: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'TourType',
        required: [true, 'Please provide a tour type'],
    },
    included: {
        type: [String],
        default: [],
    },
    excluded: {
        type: [String],
        default: [],
    },
    amenities: {
        type: [String],
        default: [],
    },
    tourPlan: {
        type: [String],
        default: [],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Tour', tourSchema);
