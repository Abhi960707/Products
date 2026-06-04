const mongoose = require('mongoose')

// Schema for particular cart item
const cartItemSchema = new mongoose.Schema({

    productId: {
type: String,
required: true
},
    title: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        default: ''
    },

    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    }

})

// One cart document per user — upserted, never duplicated
const cartSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true // one cart per user
    },

    items: [cartItemSchema]

}, { timestamps: true })

module.exports = mongoose.model('Cart', cartSchema)
