import User from './user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from './user.interface';

export const registerUser = async (userData: IUser) => {
  const { name, email, password, phone, address } = userData;
  const normalizedEmail = (email || '').toString().trim().toLowerCase();

  const userExists = await User.findOne({ email: normalizedEmail });
  if (userExists) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email: normalizedEmail,
    password: hashedPassword,
    phone,
    address,
    role: 'User',
    isActive: 'Active',
    isVerified: false,
  });

  // return user without password field
  const userSafe = await User.findById(user._id).select('-password');
  return userSafe;
};

export const loginUser = async (email: string, password: string) => {
  const normalizedEmail = (email || '').toString().trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail }).select('+password');
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '7d',
  });

  // return user without password field
  const userSafe = await User.findById(user._id).select('-password');
  return { user: userSafe, token };
};

export const getAllUsers = async (skip: number = 0, limit: number = 10) => {
  const users = await User.find({ isDeleted: false })
    .skip(skip)
    .limit(limit)
    .select('-password');

  const total = await User.countDocuments({ isDeleted: false });

  return { users, total };
};

export const getUserById = async (userId: string) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const updateUser = async (userId: string, userData: Partial<IUser>) => {
  const user = await User.findByIdAndUpdate(userId, userData, {
    new: true,
    runValidators: true,
  }).select('-password');

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

export const deleteUser = async (userId: string) => {
  // Permanently remove the user document from the database
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return { message: 'User permanently deleted' };
};
