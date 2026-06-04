const express = require('express')
const Cart = require('../models/Cart')
const auth = require('../middleware/authMiddleware')
const Product = require('../models/Product')

const router = express.Router()

// ─────────────────────────────────────────────────────────
// GET /api/cart
// ─────────────────────────────────────────────────────────

router.get('/', auth, async (req, res) => {

    try {

        const cart =
            await Cart.findOne({

                user: req.user.id

            })

        if (!cart) {

            return res.status(200).json({

                items: []

            })

        }

        res.status(200).json(cart)

    }

    catch (error) {

        console.error(
            'GET /cart error:',
            error
        )

        res.status(500).json({

            message: 'Server Error'

        })

    }

})

// ─────────────────────────────────────────────────────────
// POST /api/cart
// ─────────────────────────────────────────────────────────

router.post('/', auth, async (req, res) => {

    try {

        const {

            productId,
            title,
            image,
            price,
            category,
            quantity = 1

        } = req.body

        // VALIDATION

        if (

            !productId ||

            !title ||

            !image ||

            !price

        ) {

            return res.status(400).json({

                message:
                    'Missing required product fields'

            })

        }

        // FIND PRODUCT

        let product = null

        // SHOPKEEPER PRODUCT ID long

        if (productId.length > 10) {

            product =
                await Product.findById(productId)

        }

        // JSON PRODUCT Id Short 

        else {

            product = {

                stock: 100

            }

        }

        if (!product) {

            return res.status(404).json({

                message:
                    'Product not found'

            })

        }

        // STOCK CHECK

        if (quantity > product.stock) {

            return res.status(400).json({

                message:
                    `Only ${product.stock} items available`

            })

        }

        let cart =
            await Cart.findOne({
                user: req.user.id
            })

        // CREATE NEW CART

        if (!cart) {

            cart = new Cart({

                user: req.user.id,

                items: [

                    {

                        productId,
                        title,
                        image,
                        price,
                        category,
                        quantity

                    }

                ]

            })

        }

        else {

            // FIND EXISTING ITEM

            const existingItem =
                cart.items.find(

                    item =>

                        String(item.productId) ===
                        String(productId)

                )

            // EXISTING QUANTITY

            const existingQty =
                existingItem
                    ? existingItem.quantity
                    : 0

            // STOCK LIMIT CHECK

            if (

                existingQty + quantity >

                product.stock

            ) {

                return res.status(400).json({

                    message:
                        `Only ${product.stock} items available`

                })

            }

            // UPDATE QUANTITY

            if (existingItem) {

                existingItem.quantity += quantity

            }

            // PUSH NEW ITEM

            else {

                cart.items.push({

                    productId,
                    title,
                    image,
                    price,
                    category,
                    quantity

                })

            }

        }

        await cart.save()

        res.status(200).json({

            message: 'Cart updated',

            cart

        })

    }

    catch (error) {

        console.error(
            'POST /cart error:',
            error
        )

        res.status(500).json({

            message: 'Server Error'

        })

    }

})

// ─────────────────────────────────────────────────────────
// PUT /api/cart/:productId
// ─────────────────────────────────────────────────────────

router.put('/:productId', auth, async (req, res) => {

    try {

        const productId =
            req.params.productId

        const { quantity } =
            req.body

        if (quantity < 1) {

            return res.status(400).json({

                message:
                    'Quantity must be at least 1'

            })

        }

        const cart =
            await Cart.findOne({

                user: req.user.id

            })

        if (!cart) {

            return res.status(404).json({

                message:
                    'Cart not found'

            })

        }

        const item =
            cart.items.find(

                i =>
                    String(i.productId) ===
                    String(productId)

            )

        if (!item) {

            return res.status(404).json({

                message:
                    'Item not found in cart'

            })

        }

        // Find Product
        let product = null

        // SHOPKEEPER PRODUCT id long

        if (productId.length > 10) {

            product =
                await Product.findById(productId)

        }

        // JSON PRODUCT id short

        else {

            product = {

                stock: 9999

            }

        }

        if (!product) {

            return res.status(404).json({

                message:
                    'Product not found'

            })

        }

        // STOCK VALIDATION

        if (quantity > product.stock) {

            return res.status(400).json({

                message:
                    `Only ${product.stock} items available`

            })

        }

        item.quantity = quantity

        await cart.save()

        res.status(200).json({

            message:
                'Quantity updated',

            cart

        })

    }

    catch (error) {

        console.error(
            'PUT /cart/:productId error:',
            error
        )

        res.status(500).json({

            message: 'Server Error'

        })

    }

})

// ─────────────────────────────────────────────────────────
// DELETE /api/cart/:productId
// ─────────────────────────────────────────────────────────

router.delete('/:productId', auth, async (req, res) => {

    try {

        const productId =
            req.params.productId

        const cart =
            await Cart.findOne({

                user: req.user.id

            })

        if (!cart) {

            return res.status(404).json({

                message:
                    'Cart not found'

            })

        }

        cart.items =
            cart.items.filter(

                i =>

                    String(i.productId) !==
                    String(productId)

            )

        await cart.save()

        res.status(200).json({

            message:
                'Item removed',

            cart

        })

    }

    catch (error) {

        console.error(
            'DELETE /cart/:productId error:',
            error
        )

        res.status(500).json({

            message: 'Server Error'

        })

    }

})

// ─────────────────────────────────────────────────────────
// DELETE /api/cart
// ─────────────────────────────────────────────────────────

router.delete('/', auth, async (req, res) => {

    try {

        const cart =
            await Cart.findOne({

                user: req.user.id

            })

        if (cart) {

            cart.items = []

            await cart.save()

        }

        res.status(200).json({

            message:
                'Cart cleared'

        })

    }

    catch (error) {

        console.error(
            'DELETE /cart error:',
            error
        )

        res.status(500).json({

            message: 'Server Error'

        })

    }

})

module.exports = router