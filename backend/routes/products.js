const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const auth = require('../middleware/authMiddleware')
const isSeller = require('../middleware/isSeller')

// GET PRODUCTS
router.get('/', async (req, res) => {
    try {
        const products =
            await Product.find()
        res.json(products)
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

// GET SELLER PRODUCTS (Protected)
router.get('/seller', auth, isSeller, async (req, res) => {
    try {
        const products = await Product.find({ sellerId: req.user.id })
        res.json(products)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

//Put Products
router.put('/:id', auth, isSeller, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        // Enforce ownership: only the creator of the product (or admin) can edit it
        if (req.user.role !== 'admin' && String(product.sellerId) !== req.user.id) {
            return res.status(403).json({ message: 'Access Denied: Product ownership mismatch' })
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                price: Number(req.body.price),
                description: req.body.description,
                category: req.body.category,
                image: req.body.image,
                stock: Number(req.body.stock)
            },
            { new: true }
        )
        res.json(updatedProduct)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

// ADD PRODUCTS
router.post('/', auth, isSeller, async (req, res) => {
    try {
        const product = await Product.create({
            title: req.body.title,
            price: Number(req.body.price),
            description: req.body.description,
            category: req.body.category,
            image: req.body.image,
            stock: Number(req.body.stock),
            sold: 0,
            rating: {
                rate: 4.5,
                count: 0
            },
            sellerId: req.user.id // Extract verified seller ID from token
        })
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

// DeleteProducrt
router.delete('/:id', auth, isSeller, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        // Enforce ownership: only the creator of the product (or admin) can delete it
        if (req.user.role !== 'admin' && String(product.sellerId) !== req.user.id) {
            return res.status(403).json({ message: 'Access Denied: Product ownership mismatch' })
        }
        await Product.findByIdAndDelete(req.params.id)
        res.json({
            message: 'Product Deleted'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

module.exports = router