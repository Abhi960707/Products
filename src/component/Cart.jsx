import React, { useState, useEffect } from 'react'
import { FaArrowLeft, FaUser } from 'react-icons/fa'
import { FaDeleteLeft } from 'react-icons/fa6'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useCart } from '../context/CartContext'
import api from '../api/axiosInstance'
// import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux'
import { placeOrder } from '../redux/slices/orderSlice'

const Cart = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [openSidebar, setOpenSidebar] = useState(false)
    const [addressInput, setAddressInput] = useState('')
    const [showPopup, setShowPopup] = useState(false)
    const [selectedBuyItems, setSelectedBuyItems] = useState([])
    const [placingOrder, setPlacingOrder] = useState(false)

    const { cart, removeFromCart, updateQuantity, fetchCart } = useCart()

    // Pre-select all cart items by default when cart loads
    useEffect(() => {

        setSelectedBuyItems(cart.map(item => ({ ...item })))

    }, [cart])

    // ── Toggle item selection for order summary ───────────
    const toggleSelect = (productId) => {

        const isSelected = selectedBuyItems.some(i => i.productId === productId)

        if (isSelected) {
            setSelectedBuyItems(prev => prev.filter(i => i.productId !== productId))
        } else {
            const item = cart.find(i => i.productId === productId)
            if (item) setSelectedBuyItems(prev => [...prev, { ...item }])
        }

    }

    // ── Place order via backend API ────────────────────────
    const handleSubmit = async () => {

        if (!addressInput.trim()) {
            alert('Please Enter Address')
            return
        }

        if (selectedBuyItems.length === 0) {
            alert('Please select at least one product')
            return
        }

        setPlacingOrder(true)

        try {

            // Map cart items to order items format
            const orderItems = selectedBuyItems.map(item => ({
                productId: item.productId,
                title: item.title,
                image: item.image,
                price: item.price,
                category: item.category || '',
                quantity: item.quantity
            }))

            const res = await api.post('/orders', {
                items: orderItems,
                address: addressInput.trim()
            })
            dispatch(placeOrder(res.data.order))

            alert('You have Successfully Bought These Products!')

            // Refresh cart from DB (ordered items removed server-side)
            await fetchCart()

            setSelectedBuyItems([])
            setShowPopup(false)
            setAddressInput('')

            navigate('/buyorders')

        } catch (error) {

            alert(
                error.response?.data?.message || 'Failed to place order. Please try again.'
            )

        } finally {

            setPlacingOrder(false)

        }

    }

    // const cartItems = useSelector(state => state.cart.cartItems)

    const removeItem = (productId) => {
        removeFromCart(productId)
    }

    const increaseQuantity = (productId) => {
        const item = cart.find(i => i.productId === productId)
        if (item) updateQuantity(productId, item.quantity + 1)
    }

    const decreaseQuantity = (productId) => {
        const item = cart.find(i => i.productId === productId)
        if (item && item.quantity > 1) {
            updateQuantity(productId, item.quantity - 1)
        } else if (item) {
            removeFromCart(productId)
        }
    }



    return (

        <div className='min-h-screen bg-gray-100 overflow-y-auto scrollbar-hide'>
            <div
                onClick={() =>
                    openSidebar && setOpenSidebar(false)
                }
                className={`transition-all duration-300
${openSidebar ? 'ml-[75%] sm:ml-64' : 'ml-0'}`}
            >
                <nav className='bg-gradient-to-r from-slate-300 to-slate-600 text-white px-4 sm:px-8 py-3 sm:py-4 flex justify-between items-center shadow-lg sticky top-0 z-50'>

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

                    <h1 className='text-xl sm:text-3xl font-bold'>
                        Cart Details
                    </h1>
                    <div className='bg-slate-400 text-white font-extrabold cursor-pointer px-4 sm:px-5 py-2 rounded-full font-bold text-sm sm:text-lg shadow-md hover:scale-105 transition-all duration-300'>
                        <button
                            onClick={() => navigate('/profile')}
                            className='text-white font-extrabold cursor-pointer'>
                            <FaUser className="inline " />

                        </button>

                    </div>


                </nav>
                <button
                    onClick={() => navigate('/home')}
                    className=' cursor-pointer text-blue-500 px-4 py-1 rounded-xl to-transparent '
                >
                    <FaArrowLeft className='inline mr-2 ' />
                    Back to Home

                </button>
                <div className='flex gap-5 p-1 flex-col lg:flex-row h-[90vh]'>

                    <div className='w-full lg:w-[80%] space-y-5 overflow-y-auto pr-2 scrollbar-hide'>

                        {
                            cart.length > 0 ? (

                                <>

                                    {
                                        cart.map((item, index) => (

                                            <div
                                                // key={item.productId}
                                                key={`${item.productId}-${index}`}
                                                className='flex flex-col md:flex-row justify-between items-center bg-white rounded-2xl shadow-md p-5'
                                            >

                                                <div className='flex flex-col sm:flex-row items-center gap-5 w-full'>

                                                    <div className='bg-gray-100 rounded-2xl p-4'>
                                                        <img
                                                            src={item.image}
                                                            alt='product'
                                                            className='w-28 h-28 object-contain rounded-xl'
                                                        />
                                                    </div>

                                                    <div className='flex flex-col justify-center'>

                                                        <h1 className='text-2xl font-bold'>
                                                            {item.title}
                                                        </h1>

                                                        <p className='text-gray-500 mt-1'>
                                                            Category : {item.category}
                                                        </p>

                                                        <h1 className='text-lg font-semibold mt-2 text-blue-600'>
                                                            ₹{item.price}
                                                        </h1>

                                                        <div className='flex items-center gap-6 bg-gray-100 rounded-full px-5 py-2 mt-5 w-fit'>

                                                            <button
                                                                onClick={() => decreaseQuantity(item.productId)}
                                                                className='text-2xl font-bold'
                                                            >
                                                                -
                                                            </button>

                                                            <span className='text-lg font-bold'>
                                                                {item.quantity}
                                                            </span>

                                                            <button
                                                                onClick={() => increaseQuantity(item.productId)}
                                                                className='text-2xl text-blue-500 font-bold'
                                                            >
                                                                +
                                                            </button>

                                                        </div>

                                                    </div>

                                                </div>

                                                <div className='flex flex-col items-end gap-2 mt-5 md:mt-0'>

                                                    <h1 className='text-2xl font-bold text-green-600'>
                                                        ₹{(item.price * item.quantity).toFixed(2)}
                                                    </h1>

                                                    <button
                                                        onClick={() => removeItem(item.productId)}
                                                        className='flex items-center gap-1 text-red-500 font-bold tracking-wide hover:text-red-600 mt-3'
                                                    >
                                                        <MdDelete className='text-xl' />
                                                        <span>REMOVE</span>
                                                    </button>

                                                </div>

                                            </div>

                                        ))
                                    }

                                </>
                            ) : (
                                <div>

                                    <div className='flex flex-col justify-center items-center h-full mt-45 ml-5'>
                                        <h1 className='text-4xl font-bold text-gray-400'>
                                            No Product In Cart
                                        </h1>

                                        <button
                                            onClick={() => navigate('/home')}
                                            className='bg-blue-500 text-white px-6 py-3 rounded-2xl mt-8'
                                        >
                                            Start Shopping
                                        </button>

                                    </div>
                                </div>
                            )
                        }

                    </div>

                    <div className='w-full lg:w-[20%] bg-white rounded-2xl shadow-lg p-5 h-fit sticky top-24'>

                        <h1 className='text-2xl font-bold justify-center fle'>
                            Order Summary
                        </h1>

                        <div className='overflow-y-auto mt-5 space-y-4 scrollbar-hide max-h-[55vh]'>

                            {
                                selectedBuyItems.length > 0 ? (
                                    selectedBuyItems.map((item, index) => (

                                        <div
                                            key={item.productId}
                                            className='flex gap-3 shadow-xl  pb-3'
                                        >

                                            <div className='bg-gray-100 rounded-xl p-2 h-fit'>

                                                <img
                                                    src={item.image}
                                                    alt='product'
                                                    className='w-14 h-14 object-contain'
                                                />

                                            </div>

                                            <div className='flex-1'>

                                                <h1 className='font-bold text-sm line-clamp-2'>
                                                    {item.title}
                                                </h1>

                                                <div className='flex justify-between mt-3 text-sm text-gray-600'>

                                                    <h1>
                                                        Qty : {item.quantity}
                                                    </h1>

                                                    <h1 className='font-bold text-indigo-600'>
                                                        ₹{(item.price * item.quantity).toFixed(2)}
                                                    </h1>

                                                </div>

                                            </div>

                                        </div>

                                    ))
                                ) : (

                                    <div className='flex justify-center items-center h-full'>

                                        <h1 className='text-gray-500 text-lg text-center'>
                                            No Products Selected
                                        </h1>

                                    </div>

                                )
                            }
                        </div>

                        <div className='flex justify-between text-xl font-bold'>
                            <h1>
                                Total({
                                    selectedBuyItems.reduce(
                                        (total, item) =>
                                            total + item.quantity, 0
                                    )}items):
                            </h1>

                            <h1 className='text-indigo-700'>
                                ₹{
                                    selectedBuyItems.reduce(
                                        (total, item) =>
                                            total + (item.price * item.quantity), 0
                                    ).toFixed(2)
                                }
                            </h1>
                        </div>

                        <button
                            onClick={() => {
                                if (selectedBuyItems.length === 0) {
                                    alert('Please Select Product')
                                    return
                                }
                                setShowPopup(true)
                            }}
                            className='bg-indigo-500 hover:bg-indigo-700 text-white w-full py-3 rounded-xl mt-5 text-lg font-semibold'
                        >
                            Proceed To Buy
                        </button>
                        {
                            showPopup && (
                                <div className='fixed inset-0 flex justify-center items-center z-50 bg-black/60 backdrop-blur-sm'>
                                    <div className='bg-white p-6 rounded-2xl w-[90%] max-w-md space-y-5 shadow-2xl'>
                                        <h1 className='text-2xl font-bold text-center'>
                                            Enter Your Address
                                        </h1>
                                        <input
                                            type='text'
                                            placeholder='Enter Your Address'
                                            value={addressInput}
                                            onChange={(e) => setAddressInput(e.target.value)}
                                            onKeyDown={(e) =>
                                                e.key === 'Enter' && handleSubmit()
                                            }
                                            className='border w-full px-4 py-3 rounded-xl outline-none focus:border-green-500 text-black'
                                        />
                                        <button
                                            onClick={handleSubmit}
                                            disabled={placingOrder}
                                            className='bg-green-300 text-black px-5 py-3 rounded-xl w-full disabled:opacity-60 disabled:cursor-not-allowed'
                                        >
                                            {placingOrder ? 'Placing Order...' : 'Confirm Address'}
                                        </button>

                                        <button
                                            onClick={() => setShowPopup(false)}
                                            className='bg-red-300 text-black px-5 py-3 rounded-xl w-full'
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Cart
