const mongoose = require('mongoose')

const productSchema =
    new mongoose.Schema({

 
        title: String,
        price: Number,
        description: String,
        category: String,
        image: String,
        stock: Number,
        sold: Number,
 rating:{
        rate:Number,

        count:Number
 },
        sellerId: {
            type:
                mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    })

module.exports = mongoose.model('Product', productSchema)