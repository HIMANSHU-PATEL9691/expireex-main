const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("❌ Mongo URI missing in .env");
    }

    const conn = await mongoose.connect(uri);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ DB Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;