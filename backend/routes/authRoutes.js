const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Admin = require('../models/Admin');
const Product = require('../models/Product');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { auth, adminAuth, sellerAuth } = require('../middleware/authMiddleware');


// ================= SIGNUP =================
router.post('/signup', async (req, res) => {
  const { name, email, password, role, shopName, phone, address, city, pincode, shopType, licenseNo, yearsExperience, businessDescription } = req.body;

  console.log("📩 Signup Request:", req.body);

  try {
    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ User already exists");
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    let userData = {
      name,
      email,
      password: hashedPass,
      role,
      shopName
    };

    // generate IDs
    if (role === 'customer') {
      userData.customerId = "CUST-" + uuidv4().slice(0, 6);
    }

    if (role === 'seller') {
      userData.sellerId = "SELL-" + uuidv4().slice(0, 6);
      userData.status = "pending";
      userData.sellerProfile = {
        phone,
        address,
        city,
        pincode,
        shopType,
        licenseNo,
        yearsExperience: parseInt(yearsExperience) || 0,
        businessDescription
      };
    }

    const user = new User(userData);
    await user.save();

    console.log("✅ Signup Success:", user.name);

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

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("✅ Login Success");

    // Add warning if seller is not approved yet
    const response = {
      token,
      user
    };

    if (user.role === "seller" && user.status !== "approved") {
      console.log("⚠️ Seller not approved yet");
      response.warning = "Your seller account is pending admin approval. You can access the dashboard, but some features may be limited.";
    }

    res.json(response);

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

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log("❌ Wrong password");
      return res.status(400).json({ msg: "Wrong password" });
    }

    // generate token
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
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
router.get('/sellers', adminAuth, async (req, res) => {
  try {
    const sellers = await User.find({ role: "seller" });
    res.json(sellers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= APPROVE SELLER =================
router.put('/approve-seller/:id', adminAuth, async (req, res) => {
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
router.put('/reject-seller/:id', adminAuth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      status: "rejected"
    });

    res.json({ message: "Seller rejected" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= ADMIN STATS =================
router.get('/admin-stats', adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalSellers = await User.countDocuments({ role: 'seller' });
    const pendingSellers = await User.countDocuments({ role: 'seller', status: 'pending' });
    // Add more stats as needed
    res.json({
      totalUsers,
      totalSellers,
      pendingSellers,
      totalOrders: 0, // placeholder
      totalRevenue: 0,
      activeProducts: 0,
      wasteSaved: 0,
      avgDiscount: 0
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= GET CURRENT SELLER INFO =================
router.get('/get-seller', sellerAuth, async (req, res) => {
  console.log("🔍 GET-SELLER endpoint called");
  console.log("User from token:", req.user);

  try {
    const seller = await User.findById(req.user.id).select('-password');

    if (!seller) {
      console.log("❌ Seller not found in database");
      return res.status(404).json({ msg: "Seller not found" });
    }

    console.log("✅ Seller info retrieved:", seller.name, "- Status:", seller.status);

    res.json({
      seller
    });

  } catch (err) {
    console.error("🔥 Error fetching seller:", err);
    res.status(500).json({ error: err.message });
  }
});


// ================= SELLER DASHBOARD DATA =================
router.get('/seller-dashboard', sellerAuth, async (req, res) => {
  try {
    const seller = await User.findById(req.user.id).select('-password');

    if (!seller) {
      return res.status(404).json({ msg: "Seller not found" });
    }

    // Real data from database
    const totalProducts = await Product.countDocuments({ sellerId: seller._id, status: 'active' });
    const expiringAlerts = await Product.countDocuments({ 
      sellerId: seller._id, 
      status: 'active',
      expiryDate: { $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) } // 7 days
    });

    const dashboardData = {
      seller: {
        name: seller.name,
        email: seller.email,
        shopName: seller.shopName,
        sellerId: seller.sellerId,
        status: seller.status,
        profile: seller.sellerProfile || {}
      },
      stats: {
        totalProducts,
        activeOrders: 0,
        monthlyRevenue: 0,
        expiringAlerts
      },
      recentProducts: await Product.find({ 
        sellerId: seller._id, 
        status: 'active' 
      }).sort({ createdAt: -1 }).limit(5).select('name image discountPrice urgency daysLeft'),
      orders: [],
      notifications: [
        { type: 'info', msg: `You have ${totalProducts} active products listed` },
        ...(expiringAlerts > 0 ? [{ type: 'alert', msg: `${expiringAlerts} products expiring soon!` }] : [])
      ]
    };

    console.log("✅ Dashboard data fetched for:", seller.name);

    res.json(dashboardData);

  } catch (err) {
    console.error("🔥 Error fetching dashboard:", err);
    res.status(500).json({ error: err.message });
  }
});

// ================= CUSTOMER DASHBOARD DATA =================
router.get('/customer-dashboard', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user || user.role !== 'customer') {
      return res.status(404).json({ msg: "Customer not found" });
    }

    res.json({
      customer: user,
      orders: [], // Future implementation
      wishlist: [] // Future implementation
    });
  } catch (err) {
    console.error("🔥 Error fetching customer dashboard:", err);
    res.status(500).json({ error: err.message });
  }
});

// example dev-only route
router.post('/admin-reset', async (req, res) => {
  const hash = await bcrypt.hash('admin123', 10);
  await Admin.updateOne({ email: 'admin@expireex.com' }, { password: hash }, { upsert: true });
  res.json({ msg: 'reset' });
});

module.exports = router;