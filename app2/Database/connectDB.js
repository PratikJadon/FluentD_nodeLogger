import mongoose from "mongoose";
import logger from "../utils/logger.js";

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Database connected..");
    logger.info("Database connected successfully.");
  } catch (error) {
    logger.info("Database cannot be connected, due to " + error);
    console.log(error);
  }
};

export default connectDB;
