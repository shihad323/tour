"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.envVars = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || "5000",
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/tour-management",
    JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret_key_here",
};
