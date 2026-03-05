const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');


// ================= SIGNUP =================
router.post('/signup', async (req, res) => {
  const { name, email, password, role, shopName } = req.body;

  console.log("📩 Signup Request:", req.body);

  try {
    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ User already exists");
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    let user = new User({
      name,
      email,
      password: hashedPass,
      role,
      shopName
    });

    // generate IDs
    if (role === 'customer') {
      user.customerId = "CUST-" + uuidv4().slice(0, 6);
    }

    if (role === 'seller') {
      user.sellerId = "SELL-" + uuidv4().slice(0, 6);
      user.status = "pending"; // 🔥 for admin approval
    }

    await user.save();

    console.log("✅ Signup Success");

    res.json({
      message: "Signup successful",
      user
    });

  } catch (err) {
    console.error("🔥 Signup Error:", err);
    res.status(500).json({ error: err.message });
  }
});


// ================= LOGIN =================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log("📩 Login Request:", email);

  try {
    const user = await User.findOne({ email });

    console.log("🔍 User Found:", user);

    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("❌ Wrong password");
      return res.status(400).json({ msg: "Wrong password" });
    }

    // seller approval check
    if (user.role === "seller" && user.status !== "approved") {
      console.log("⛔ Seller not approved");
      return res.status(403).json({ msg: "Seller not approved yet" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("✅ Login Success");

    res.json({
      token,
      user
    });

  } catch (err) {
    console.error("🔥 Login Error:", err);
    res.status(500).json({ error: err.message });
  }
});


// ================= ADMIN LOGIN =================
router.post('/admin-login', async (req, res) => {
  const { email, password } = req.body;

  console.log("📩 Admin Login Request:", email);

  try {
    const admin = await Admin.findOne({ email });

    console.log("🔍 Admin from DB:", admin);

    if (!admin) {
      console.log("❌ Admin not found");
      return res.status(400).json({ msg: "Admin not found" });
    }

    // ⚠️ currently plain password check
    if (password !== admin.password) {
      console.log("❌ Wrong password");
      return res.status(400).json({ msg: "Wrong password" });
    }

    // generate token (optional but recommended)
    const token = jwt.sign(
      { role: "admin", email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("✅ Admin login success");

    res.json({
      message: "Admin login success",
      token
    });

  } catch (err) {
    console.error("🔥 Admin Login Error:", err);
    res.status(500).json({ error: err.message });
  }
});


// ================= GET ALL SELLERS (FOR ADMIN 🔥) =================
router.get('/sellers', async (req, res) => {
  try {
    const sellers = await User.find({ role: "seller" });
    res.json(sellers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= APPROVE SELLER =================
router.put('/approve-seller/:id', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      status: "approved"
    });

    res.json({ message: "Seller approved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= REJECT SELLER =================
router.put('/reject-seller/:id', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      status: "rejected"
    });

    res.json({ message: "Seller rejected" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;