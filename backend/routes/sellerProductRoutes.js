const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { sellerAuth } = require('../middleware/authMiddleware');

// GET /api/seller/products - Get all seller's products
router.get('/products', sellerAuth, async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.user.id, status: 'active' })
      .sort({ createdAt: -1 })
      .select('-__v'); // exclude mongoose version

    console.log(`✅ Seller ${req.user.id} fetched ${products.length} products`);

    res.json(products);
  } catch (err) {
    console.error('🔥 Error fetching seller products:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/seller/products - Add new product
router.post('/products', sellerAuth, async (req, res) => {
  try {
    const productData = {
      ...req.body,
      sellerId: req.user.id
    };

    // Calculate discountPercent if not provided
    if (!productData.discountPercent && productData.originalPrice && productData.discountPrice) {
      productData.discountPercent = Math.round(
        ((productData.originalPrice - productData.discountPrice) / productData.originalPrice) * 100
      );
    }

    const product = new Product(productData);
    await product.save();

    console.log(`✅ Seller ${req.user.id} added product: ${product.name}`);

    // Return with populated virtuals (daysLeft, urgency)
    const populatedProduct = await Product.findById(product._id).lean();
    res.status(201).json(populatedProduct);
  } catch (err) {
    console.error('🔥 Error adding product:', err);
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/seller/products/:id - Update product
router.put('/products/:id', sellerAuth, async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, sellerId: req.user.id });
    if (!product) {
      return res.status(404).json({ msg: 'Product not found or access denied' });
    }

    // Update fields
    Object.assign(product, req.body);
    
    // Recalculate discountPercent
    if (req.body.originalPrice && req.body.discountPrice) {
      product.discountPercent = Math.round(
        ((req.body.originalPrice - req.body.discountPrice) / req.body.originalPrice) * 100
      );
    }

    await product.save();

    const populatedProduct = await Product.findById(product._id).lean();
    console.log(`✅ Seller ${req.user.id} updated product: ${product.name}`);

    res.json(populatedProduct);
  } catch (err) {
    console.error('🔥 Error updating product:', err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/seller/products/:id - Delete product
router.delete('/products/:id', sellerAuth, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ 
      _id: req.params.id, 
      sellerId: req.user.id 
    });

    if (!product) {
      return res.status(404).json({ msg: 'Product not found or access denied' });
    }

    console.log(`✅ Seller ${req.user.id} deleted product: ${product.name}`);
    res.json({ msg: 'Product deleted successfully', id: product._id });
  } catch (err) {
    console.error('🔥 Error deleting product:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

