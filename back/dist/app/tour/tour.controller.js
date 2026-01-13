"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchTours = exports.deleteTour = exports.updateTour = exports.getTourBySlug = exports.getTourById = exports.getAllTours = exports.createTour = exports.getAllTourTypes = exports.createTourType = void 0;
const tour_model_1 = __importDefault(require("./tour.model"));
const tour_type_model_1 = __importDefault(require("./tour-type.model"));
const createTourType = async (tourTypeData) => {
    const tourType = await tour_type_model_1.default.create(tourTypeData);
    return tourType;
};
exports.createTourType = createTourType;
const getAllTourTypes = async () => {
    const tourTypes = await tour_type_model_1.default.find();
    return tourTypes;
};
exports.getAllTourTypes = getAllTourTypes;
const createTour = async (tourData) => {
    const tour = await tour_model_1.default.create(tourData);
    return tour.populate('tourType');
};
exports.createTour = createTour;
const getAllTours = async (skip = 0, limit = 10, filter) => {
    const query = { isDeleted: false, ...filter };
    const tours = await tour_model_1.default.find(query)
        .populate('tourType')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
    const total = await tour_model_1.default.countDocuments(query);
    return { tours, total };
};
exports.getAllTours = getAllTours;
const getTourById = async (tourId) => {
    const tour = await tour_model_1.default.findById(tourId).populate('tourType');
    if (!tour) {
        throw new Error('Tour not found');
    }
    return tour;
};
exports.getTourById = getTourById;
const getTourBySlug = async (slug) => {
    const tour = await tour_model_1.default.findOne({ slug, isDeleted: false }).populate('tourType');
    if (!tour) {
        throw new Error('Tour not found');
    }
    return tour;
};
exports.getTourBySlug = getTourBySlug;
const updateTour = async (tourId, tourData) => {
    const tour = await tour_model_1.default.findByIdAndUpdate(tourId, tourData, {
        new: true,
        runValidators: true,
    }).populate('tourType');
    if (!tour) {
        throw new Error('Tour not found');
    }
    return tour;
};
exports.updateTour = updateTour;
const deleteTour = async (tourId) => {
    const tour = await tour_model_1.default.findByIdAndUpdate(tourId, { isDeleted: true }, { new: true });
    if (!tour) {
        throw new Error('Tour not found');
    }
    return { message: 'Tour deleted successfully' };
};
exports.deleteTour = deleteTour;
const searchTours = async (searchTerm, skip = 0, limit = 10) => {
    const query = {
        isDeleted: false,
        $or: [
            { title: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } },
            { location: { $regex: searchTerm, $options: 'i' } },
        ],
    };
    const tours = await tour_model_1.default.find(query)
        .populate('tourType')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
    const total = await tour_model_1.default.countDocuments(query);
    return { tours, total };
};
exports.searchTours = searchTours;
