import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { FaArrowLeft, FaCartPlus, FaStar } from 'react-icons/fa'
import { useCart } from '../context/CartContext'

const ProductDetails = () => {

    const navigate = useNavigate()
    const [openSidebar, setOpenSidebar] = useState(false)
    const [showPopup, setShowPopup] = useState(false)

    const location = useLocation()
    const { cart, cartCount, addToCart, removeFromCart, updateQuantity } = useCart()

    if (!location.state) {
        return (
            <h1 className='text-3xl p-10'>
                No Product Found
            </h1>
        )
    }

    const { product } = location.state

    // Get current quantity of this product in cart
    const productId = product._id || product.id
    const cartItem = cart.find(item => item.productId === productId)
    const currentQty = cartItem?.quantity || 0

    const handleAddToCart = () => {
        addToCart({ ...product, productId }, 1)
    }

    const handleIncrease = () => {
        if (cartItem) {
            updateQuantity(productId, cartItem.quantity + 1
            )
        } else {
            addToCart(

                {

                    ...product,

                    productId

                },

                1

            )
        }
    }

    const handleDecrease = () => {
        if (cartItem && cartItem.quantity > 1) {
            updateQuantity(productId, cartItem.quantity - 1)
        } else if (cartItem) {
            removeFromCart(productId)
        }
    }

    const handleRemove = () => {
        removeFromCart(productId)
    }

    return (

        <div className='min-h-screen bg-gray-100'>
            <div
                onClick={() =>
                    openSidebar && setOpenSidebar(false)
                }
                className={`transition-all duration-300
${openSidebar ? 'ml-[75%] sm:ml-64' : 'ml-0'}`}
            >
                <nav className='bg-gradient-to-r from-slate-400 to-slate-600 text-white px-4 py-3 flex justify-between items-center shadow-lg sticky top-0 z-50'>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setOpenSidebar(!openSidebar)
                        }}
                        className='text-3xl font-bold text-gray-700 cursor-pointer mb-1 ml-2'
                    >
                        ☰
                    </button>

                    <Sidebar
                        openSidebar={openSidebar}
                        setOpenSidebar={setOpenSidebar}
                    />
                    <div className='flex justify-between gap-6'>

                        <h1 className='text-xl sm:text-3xl font-bold tracking-wide mb-1'>
                            Product Details
                        </h1>

                    </div>

                    {/* Live cart count from CartContext */}
                    <button
                        onClick={() => navigate('/cart')}
                        className='bg-slate-400 text-white font-extrabold cursor-pointer px-4 sm:px-5 py-2 rounded-full font-bold text-sm sm:text-lg shadow-md hover:scale-105 transition-all duration-300' >
                        <FaCartPlus className='inline m-1 ' />
                        {cartCount}
                    </button>

                </nav>

                <button
                    onClick={() => navigate('/home')}
                    className=' cursor-pointer text-blue-500 px-4 py-1 rounded-2xl to-transparent mt-1'
                >

                    <FaArrowLeft className='inline mr-2 ' />
                    Back to Home

                </button>
                <div className='flex justify-center p-4 sm:p-8'>


                    <div className='w-full max-w-7xl bg-white rounded-3xl shadow-xl p-6 sm:p-10'>

                        <div className='flex flex-col lg:flex-row gap-10 items-start'>

                            <div className='w-full lg:w-[40%] flex justify-center lg:sticky lg:top-25'>

                                <img
                                    src={product.image}
                                    alt='product'
                                    className='w-64 h-64 sm:w-80 sm:h-80 object-contain hover:scale-105 transition-all duration-300'
                                />

                            </div>

                            <div className='w-full lg:w-[60%]'>

                                <h1 className='text-2xl sm:text-4xl font-bold leading-tight'>
                                    {product.title}
                                </h1>

                                <h1 className='text-2xl text-green-600 font-bold mt-5'>
                                    ₹{product.price}
                                </h1>

                                <h1 className='mt-6 text-gray-700 leading-relaxed text-sm sm:text-base'>
                                    {product.description}
                                </h1>

                                <h1 className='mt-5 text-lg'>

                                    <span className='font-bold'>
                                        Category :
                                    </span>
                                    {" "}
                                    {product.category}
                                </h1>

                                <div className='mt-5 flex items-center gap-3 flex-wrap'>

                                    <span className='font-bold text-lg'>
                                        Rating :
                                    </span>

                                    <div className='flex items-center gap-1 text-yellow-300 text-xl'>

                                        {
                                            [...Array(Math.round(product.rating?.rate))].map((_, index) => (
                                                <FaStar key={index} />
                                            ))
                                        }

                                    </div>
                                    <span className='text-gray-600 text-base'>
                                        {product.rating?.rate}
                                        ({product.rating?.count} reviews)
                                    </span>

                                </div>

                                <div className='grid grid-cols-2 lg:flex flex-wrap gap-4 mt-8'>

                                    <button
                                        onClick={handleDecrease}
                                        className='bg-red-300 text-white px-4 py-3 rounded-xl text-xl font-bold'
                                    >
                                        -
                                    </button>

                                    <h1 className='text-2xl font-bold flex items-center justify-center'>
                                        {currentQty}
                                    </h1>

                                    <button
                                        onClick={handleIncrease}
                                        className='bg-green-300 text-white px-4 py-3 rounded-xl text-xl font-bold'
                                    >
                                        +
                                    </button>

                                    <button
                                        onClick={handleAddToCart}
                                        className='bg-blue-400 text-white py-3 px-6 rounded-xl font-bold shadow-md hover:scale-105 transition-all duration-300'
                                    >
                                        Add To Cart
                                    </button>

                                    <button
                                        onClick={handleRemove}
                                        className='bg-gray-500 text-white py-3 px-6 rounded-xl font-bold shadow-md hover:scale-105 transition-all duration-300'
                                    >
                                        Remove
                                    </button>

                                    <button
                                        onClick={() => setShowPopup(true)}
                                        className='bg-green-400 text-white py-3 px-6 rounded-xl font-bold shadow-md hover:scale-105 transition-all duration-300 col-span-2'
                                    >
                                        Proceed To Buy
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {
                    showPopup && (

                        <div className='fixed inset-0 flex justify-center items-center z-50 bg-black/70 backdrop-blur-sm'>

                            <div className='bg-white p-5 sm:p-8 rounded-2xl w-[92%] sm:w-96 shadow-2xl'>

                                <h1 className='text-2xl sm:text-3xl font-bold text-center'>
                                    Order Summary
                                </h1>

                                <h1 className='mt-6'>
                                    Product : {product.title}
                                </h1>

                                <h1 className='mt-3'>

                                    Quantity :

                                    {currentQty || 1}

                                </h1>

                                <h1 className='mt-3 text-2xl font-bold text-green-600'>

                                    Total Price :₹

                                    {
                                        (
                                            product.price *
                                            (currentQty || 1)
                                        ).toFixed(2)
                                    }

                                </h1>

                                <div className='flex flex-col sm:flex-row gap-3 mt-8'>

                                    <button
                                        onClick={() => setShowPopup(false)}
                                        className='bg-red-400 hover:scale-105 text-white px-3 py-3 rounded-xl font-bold w-full'
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={() => {
                                            setShowPopup(false)
                                            navigate('/cart')
                                        }}
                                        className='bg-green-300 hover:scale-105 text-white px-3 py-3 rounded-xl font-bold w-full'
                                    >
                                        Proceed To Buy
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )

}

export default ProductDetails