const mongoose = require('mongoose')

// Schema for particular ordered item 
const orderItemSchema = new mongoose.Schema({

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
        min: 1
    }

})


const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    items: [orderItemSchema],
    
    address: {
        type: String,
        required: true
    },

    totalAmount: {
        type: Number,
        required: true
    },

    // Simple Order id
    orderId: {
        type: String,
        unique: true
    },

    status: {
        type: String,
        enum: ['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Placed'
    },

    paymentMethod: {
        type: String,
        default: 'Cash On Delivery'
    }

}, { timestamps: true })

// Auto-generate a friendly orderId before saving
// NOTE: With async pre-hooks in Mongoose, do NOT use next() — also return promise signals
orderSchema.pre('save', async function () {

    if (!this.orderId) {

        const count = await mongoose.model('Order').countDocuments()

        this.orderId = `ORD${1000 + count + 1}`

    }

})

module.exports = mongoose.model('Order', orderSchema)
