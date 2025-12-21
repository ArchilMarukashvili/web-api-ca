import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_DB);
  console.log(`database connected to ${mongoose.connection.name} on ${mongoose.connection.host}`);
};

export default connectDB;
