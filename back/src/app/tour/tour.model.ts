import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema(
  {
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
      type: mongoose.Schema.Types.ObjectId,
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
  },
  { timestamps: true }
);

export default mongoose.model('Tour', tourSchema);
