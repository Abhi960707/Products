const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

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



//Put Products

router.put('/:id',
async(req,res)=>{

try{

const updatedProduct =

await Product.findByIdAndUpdate(

req.params.id,

req.body,

{ new:true }

)

res.json(updatedProduct)

}

catch(error){

res.status(500).json({

message:error.message

})

}

})


// ADD PRODUCTS

router.post('/',

async (req, res) => {

    try {

        console.log(req.body)

        const product =
        await Product.create({

            title:req.body.title,

            price:Number(req.body.price),

            description:req.body.description,

            category:req.body.category,

            image:req.body.image,

            stock:Number(req.body.stock),

            sold:0,

            rating:{
                rate:4.5,
                count:0
            },

            sellerId:req.body.sellerId

        })

        res.status(201).json(product)

    }

    catch (error) {

        console.log(error)

        res.status(500).json({

            message:error.message

        })

    }

})

// DeleteProducrt

router.delete('/:id', async (req, res) => {

    try {
        await Product.findByIdAndDelete(
            req.params.id
        )
        res.json({
            message: 'Product Deleted'
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

module.exports = router