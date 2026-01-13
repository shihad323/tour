import mongoose from "mongoose";
import { envVars } from "./env";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(envVars.MONGODB_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};
