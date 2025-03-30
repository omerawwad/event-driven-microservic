import mongoose from "mongoose";
import { logger } from "../../../shared/utils/logger";

export async function connectMongoDB(uri: string): Promise<void> {
  try {
    await mongoose.connect(uri);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    process.exit(1);
  }
}