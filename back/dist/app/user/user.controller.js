"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = async (userData) => {
    const { name, email, password, phone, address } = userData;
    const userExists = await user_model_1.default.findOne({ email });
    if (userExists) {
        throw new Error('User already exists');
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const user = await user_model_1.default.create({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        role: 'User',
        isActive: 'Active',
        isVerified: false,
    });
    return user;
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await user_model_1.default.findOne({ email }).select('+password');
    if (!user) {
        throw new Error('Invalid credentials');
    }
    const isPasswordCorrect = await bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new Error('Invalid credentials');
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '7d',
    });
    return { user, token };
};
exports.loginUser = loginUser;
const getAllUsers = async (skip = 0, limit = 10) => {
    const users = await user_model_1.default.find({ isDeleted: false })
        .skip(skip)
        .limit(limit)
        .select('-password');
    const total = await user_model_1.default.countDocuments({ isDeleted: false });
    return { users, total };
};
exports.getAllUsers = getAllUsers;
const getUserById = async (userId) => {
    const user = await user_model_1.default.findById(userId).select('-password');
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};
exports.getUserById = getUserById;
const updateUser = async (userId, userData) => {
    const user = await user_model_1.default.findByIdAndUpdate(userId, userData, {
        new: true,
        runValidators: true,
    }).select('-password');
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};
exports.updateUser = updateUser;
const deleteUser = async (userId) => {
    const user = await user_model_1.default.findByIdAndUpdate(userId, { isDeleted: true }, { new: true });
    if (!user) {
        throw new Error('User not found');
    }
    return { message: 'User deleted successfully' };
};
exports.deleteUser = deleteUser;
