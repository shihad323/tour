import mongoose from 'mongoose';

const tourTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a tour type name'],
      enum: ['Adventure', 'Leisure', 'Cultural', 'Wildlife', 'Beach', 'Mountain', 'City', 'Historical'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('TourType', tourTypeSchema);
