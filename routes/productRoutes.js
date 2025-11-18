const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Home page – show products
router.get('/', async (req, res) => {
    const products = await Product.find().limit(10);
    res.render('index', { products });
});

// Single product page
router.get('/product/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('product', { product });
});

module.exports = router;

