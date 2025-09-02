import mongoose from "mongoose";
import { env } from "./env";

export const connectDb = async (cb: () => void): Promise<void> => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("Successfully connected to MongoDB");
    if (cb) cb();
  } catch (error: any) {
    console.error("MongoDB connection error:", error.message);
  }
};
