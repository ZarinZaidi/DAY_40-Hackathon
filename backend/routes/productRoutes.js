import express from 'express';
import Product from '../models/productModel.js';

const productRouter = express.Router();

// Get all products - home
productRouter.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

// Get product by slug
productRouter.get('/slug/:slug', async (req, res) => {
    const product = await Product.findOne({ slug: { $eq: req.params.slug } });
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

// Get product by ID
productRouter.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

// Get products by category
productRouter.get('/category/:category', async (req, res) => {
    const category = req.params.category;
    try {
        const products = await Product.find({ category: category });
        res.send(products);
    } catch (err) {
        console.error('Error fetching products by category:', err);
        res.status(500).send({ message: err.message });
    }
});

// Get all categories
productRouter.get('/categories', async (req, res) => {
    const products = await Product.find();
    const categories = [...new Set(products.map(product => product.category))];
    res.send(categories);
});

// Get all products for 'all' categories
productRouter.get('/categories/all-products', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

export default productRouter;