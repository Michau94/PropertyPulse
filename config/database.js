import mongoose from "mongoose";
let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  // if data base connected don't connect again
  if (connected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    // console.log("MongoDB connected");
  } catch (err) {
    // console.log("MongoDB connection error", err);
  }
};

export default connectDB;
