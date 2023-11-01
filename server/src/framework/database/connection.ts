import mongoose from "mongoose";
import ConfigKeys from "../../config";

// database connection
const connectDB = async () => {
  try {
    const dbOptions = {
      dbName: ConfigKeys.DB_NAME, 
    };
    await mongoose.connect(ConfigKeys.MONGO_DB_URL, dbOptions);
    console.log("Database connected...");
  } catch (error) {
    console.error("Database connection error", error);
    // Exiting the process or handle the error later
    process.exit(1);
  }
};

export default connectDB;
