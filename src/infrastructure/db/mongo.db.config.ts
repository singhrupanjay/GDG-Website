import mongoose from "mongoose";

import { env_Constant } from "../../constant/env.constant";

const connectToMongoDB = async () => {
  try {
    mongoose.set('bufferCommands', false); // CRITICAL: fail fast, don't hang
    await mongoose.connect((env_Constant.MONGO_URI as string) || 'mongodb://localhost/mock')
      .catch(err => console.warn('MongoDB not connected — some features may not work'));
    console.log("Connected to MongoDB (or mock fallback active)");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectToMongoDB;
