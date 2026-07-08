import mongoose from "mongoose";

import { env_Constant } from "../../constant/env.constant";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(env_Constant.MONGO_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectToMongoDB;
