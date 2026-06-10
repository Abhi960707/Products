const express = require('express')
const Order = require('../models/Order')
const Cart = require('../models/Cart')
const auth = require('../middleware/authMiddleware')
const Product = require('../models/Product')
const router = express.Router()

// ─────────────────────────────────────────────────────────
// GET /api/orders
// Fetch all orders for the authenticated user (newest first)
// ─────────────────────────────────────────────────────────
router.get('/', auth, async (req, res) => {

    try {

        const orders = await Order.find({ user: req.user.id })
            .sort({ createdAt: -1 })

        res.status(200).json(orders)

    } catch (error) {

        console.error('GET /orders error:', error)
        res.status(500).json({ message: 'Server Error' })

    }

})

// ─────────────────────────────────────────────────────────
// POST /api/orders
// Place an order from selected cart items
// Body: { items: [...], address: "..." }
// After placing: removes those items from the user's cart
// ─────────────────────────────────────────────────────────
router.post('/', auth, async (req, res) => {

    try {

        const { items, address } = req.body

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No items to order' })
        }

        if (!address || !address.trim()) {
            return res.status(400).json({ message: 'Delivery address is required' })
        }

        // Calculate total amount
        const totalAmount = items.reduce(
            (sum, item) => sum + (item.price * item.quantity), 0
        )

        // Create the order document
        const newOrder = new Order({
            user: req.user.id,
            items,
            address: address.trim(),
            totalAmount: parseFloat(totalAmount.toFixed(2)),
            status: 'Placed',
            paymentMethod: 'Cash On Delivery'
        })

        await newOrder.save()
        for (const item of items) {

            let product = null

            // SHOPKEEPER PRODUCT

            if (

                String(item.productId).length > 10

            ) {

                product =
                    await Product.findById(
                        item.productId
                    )

            }

            // UPDATE STOCK & SOLD

            if (product) {
                product.stock =
                    Number(product.stock || 0)
                    - Number(item.quantity)

                product.sold =
                    Number(product.sold || 0)
                    + Number(item.quantity)
                await product.save()

            }

        }
        // Remove ordered items from the user's cart
        const orderedProductIds = items.map(i => i.productId)

        const cart = await Cart.findOne({ user: req.user.id })

        if (cart) {
            cart.items = cart.items.filter(
                cartItem => !orderedProductIds.includes(cartItem.productId)
            )
            await cart.save()
        }

        res.status(201).json({
            message: 'Order placed successfully',
            order: newOrder
        })

    } catch (error) {

        console.error('POST /orders error:', error)
        res.status(500).json({ message: 'Server Error' })

    }

})


router.get('/:id', auth, async (req, res) => {

    try {

        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user.id
        })

        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }

        res.status(200).json(order)

    } catch (error) {

        console.error('GET /orders/:id error:', error)
        res.status(500).json({ message: 'Server Error' })

    }

})

// Payment Gateway
// 



module.exports = router
