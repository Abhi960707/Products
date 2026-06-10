const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const auth = require('../middleware/authMiddleware')
const isAdmin = require('../middleware/isAdmin')

const router = express.Router()

router.post('/register', async (req, res) => {

    try {
        const { name, email, password, secretkey, role } = req.body
        const existingUser =
            await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            })
        }
        const hashedPassword =
            await bcrypt.hash(password, 10)
        const finalRole = (role === 'admin') ? 'admin' : 'customer'
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            secretkey,
            role: finalRole
        })

        await newUser.save()
        res.status(201).json({
            message: 'Registration Successful'
        })
    }

    catch (error) {
        res.status(500).json({
            message: 'Server Error'
        })
    }

})

//Create Shopkeeper
router.post(
    '/create-shopkeeper',
    auth,
    isAdmin,
    async (req, res) => {

        try {

            const {
                name,
                email,
                password,
                secretkey
            } = req.body

            const existingUser =
                await User.findOne({ email })
            if (existingUser) {
                return res.status(400).json({
                    message: 'User already exists'
                })
            }

            const hashedPassword =
                await bcrypt.hash(password, 10)
            const shopkeeper = new User({
                name,
                email,
                password: hashedPassword,
                secretkey,
                role: 'shopkeeper'
            })

            await shopkeeper.save()
            res.status(201).json({
                message: 'Shopkeeper Created Successfully'
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'Shopkeeper Not Created'
            })
        }
    }
)



router.post('/login', async (req, res) => {

    try {

        const { email, password } = req.body

        const user = await User.findOne({ email })

       {/* console.log("EMAIL =", email)
        console.log("USER =", user)  */}

        if (!user) {

            return res.status(400).json({
                message: 'User not found'
            })

        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        )

       {/* console.log("MATCH =", isMatch) */}

        if (!isMatch) {

            return res.status(400).json({
                message: 'Invalid Password'
            })

        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.status(200).json({
            message: 'Login Successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: 'Server Error'
        })

    }

})





router.put('/change-password', auth, async (req, res) => {

    try {

        const { currentPassword, newPassword } = req.body

        const user = await User.findById(req.user.id)

        if (!user) {

            return res.status(404).json({
                message: 'User Not Found'
            })

        }

        const isMatch =
            await bcrypt.compare(
                currentPassword,
                user.password
            )

        if (!isMatch) {

            return res.status(400).json({
                message: 'Current Password Wrong'
            })

        }

        const hashedPassword =
            await bcrypt.hash(newPassword, 10)

        user.password = hashedPassword

        await user.save()

        res.json({
            message: 'Password Changed Successfully'
        })

    }

    catch (error) {

        res.status(500).json({
            message: 'Server Error'
        })

    }

})

router.get('/profile', auth, async (req, res) => {

    try {
        const userId = req.user.id
        const user = await User.findById(userId)
            .select('-password')
        if (!user) {

            return res.status(404).json({
                message: 'User Not Found'
            })
        }
        res.status(200).json(user)
    }

    catch (error) {
        res.status(500).json({
            message: 'Server Error'
        })
    }
})


//
router.post('/forget-passkey',async (req,res)=>{
    try {
        const {email}=req.body
        const user = await User.findOne({email})
res.status(200).json({
    message:'User Not Founded why are this '
})
        } catch (error) {
        res.status(500).json({
            message:'server error'
        })
    }
})

//routes


router.post('/forget-password', async (req, res) => {

    try {

        const {
            email,
            secretkey
        } = req.body

        const user = await User.findOne({ email })

        if (!user) {

            return res.status(404).json({
                message:'User Not Found'
            })
        }

        // Secret key check
        if (user.secretkey !== secretkey) {

            return res.status(400).json({
                message: 'Invalid Secret Key'
            })

        }

        // SUCCESS
        res.status(200).json({
            message: 'Secret Key Verified'
        })

    }

    catch (error) {

        res.status(500).json({
            message: 'Server Error'
        })

    }

})


//Update passwordxrs
router.put('/reset-password', async (req, res) => {

    try {

        const {
            email,
            secretkey,
            newPassword
        } = req.body

        const user = await User.findOne({ email })

        if (!user) {

            return res.status(404).json({
                message: 'User Not Found'
            })

        }

        if (user.secretkey !== secretkey) {

            return res.status(400).json({
                message: 'Invalid Secret Key'
            })

        }

        const hashedPassword =
            await bcrypt.hash(newPassword, 10)

        user.password = hashedPassword

        await user.save()

        res.json({
            message: 'Password Reset Successfully'
        })

    }

    catch (error) {

        res.status(500).json({
            message: 'Server Error'
        })

    }

})

// Get Admin Stats
router.get('/admin-stats', auth, isAdmin, async (req, res) => {
    try {
        const totalCustomers = await User.countDocuments({ role: 'customer' })
        const totalShopkeepers = await User.countDocuments({ role: 'shopkeeper' })

        const Product = require('../models/Product')
        const Order = require('../models/Order')

        const totalProducts = await Product.countDocuments()
        const totalOrders = await Order.countDocuments()

        const recentShopkeepers = await User.find({ role: 'shopkeeper' })
            .select('-password -secretkey')
            .sort({ _id: -1 })
            .limit(5)

        res.status(200).json({
            stats: {
                totalCustomers,
                totalShopkeepers,
                totalProducts,
                totalOrders
            },
            recentShopkeepers
        })
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
})

module.exports = router