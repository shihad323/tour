import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['Admin', 'User'],
      default: 'User',
    },
    phone: {
      type: String,
    },
    picture: {
      type: String,
      default: 'https://via.placeholder.com/150',
    },
    address: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    auths: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
