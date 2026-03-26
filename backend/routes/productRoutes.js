const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');

// GET /api/products - Get all active products (for Browse page)
router.get('/products', async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Filters (optional)
    const category = req.query.category;
    const urgency = req.query.urgency;
    const search = req.query.search;

    const filter = { 
      status: 'active',
      stock: { $gt: 0 },
      expiryDate: { $gt: new Date() }
    };

    if (category) filter.category = category;
    if (urgency) filter.urgency = urgency;

    let productsQuery = Product.find(filter);

    // Search by name
    if (search) {
      productsQuery = productsQuery.find({
        $text: { $search: search }
      });
    }

    const products = await productsQuery
      .populate('sellerId', 'name shopName sellerId')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Total count for pagination
    const total = await Product.countDocuments(filter);

    console.log(`✅ Fetched ${products.length} products (page ${page})`);

    res.json({
      products,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (err) {
    console.error('🔥 Error fetching products:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id - Get single product (for ProductDetail)
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ 
      _id: req.params.id, 
      status: 'active',
      stock: { $gt: 0 },
      expiryDate: { $gt: new Date() }
    })
      .populate('sellerId', 'name shopName sellerId status')
      .lean();

    if (!product) {
      return res.status(404).json({ msg: 'Product not found or inactive' });
    }

    console.log(`✅ Fetched product: ${product.name}`);

    res.json(product);
  } catch (err) {
    console.error('🔥 Error fetching product:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
