const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI;

    if (!connStr) {
      throw new Error("MONGO_URI is not defined");
    }

    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;