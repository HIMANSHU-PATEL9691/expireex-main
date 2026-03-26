const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const existingAdmin = await Admin.findOne({ email: 'admin@expireex.com' });
    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    const hashedPass = await bcrypt.hash('admin123', 10);

    const admin = new Admin({
      email: 'admin@expireex.com',
      password: hashedPass
    });

    await admin.save();

    console.log('✅ Default admin seeded: admin@expireex.com / admin123');

  } catch (err) {
    console.error('🔥 Error seeding admin:', err);
  } finally {
    mongoose.connection.close();
  }
}

seedAdmin();