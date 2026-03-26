const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};

const adminAuth = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: "Access denied" });
    }
    next();
  });
};

const sellerAuth = (req, res, next) => {
  console.log("🔐 sellerAuth middleware called");
  auth(req, res, async () => {
    console.log("User role:", req.user?.role);
    if (req.user.role !== 'seller') {
      console.log("❌ Access denied - not a seller");
      return res.status(403).json({ msg: "Access denied - Seller only" });
    }
    // Check seller status - allow pending for add/update/delete, require approved for order-related
    try {
      const User = require('../models/User');
      const user = await User.findById(req.user.id).select('status');
      if (!user) {
        console.log("❌ Seller not found");
        return res.status(404).json({ msg: "Seller not found" });
      }
      console.log("✅ Seller status:", user.status);
      req.user.status = user.status; // Pass status to route
    } catch (err) {
      console.error("🔥 Seller status check error:", err);
      return res.status(500).json({ msg: "Server error" });
    }
    next();
  });
};

module.exports = { auth, adminAuth, sellerAuth };