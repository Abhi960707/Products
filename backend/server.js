const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const cartRoutes = require('./routes/cart')
const orderRoutes = require('./routes/orders')
const productRoutes = require('./routes/products')

const app = express()
// middleware
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)     // register, login, profile, change-password
app.use('/api/cart', cartRoutes)     // cart CRUD
app.use('/api/orders', orderRoutes)  // place & fetch orders
app.use('/api/products', productRoutes)  // products CRUD oprerations

const auth = require('./middleware/authMiddleware')
app.get('/api/profile', auth, async (req, res) => {

    try {
        const User = mongoose.model('User')
        const user = await User.findById(req.user.id).select('-password')

        if (!user) {
            return res.status(404).json({ message: 'User Not Found' })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }

})

//DataBase connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/productdb'

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch((err) => console.error('❌ MongoDB Error:', err))

//StartthisServer
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})