import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaArrowLeft,
    FaUser
} from 'react-icons/fa'

import api from '../api/axiosInstance'

const MyProduct = () => {

    const navigate = useNavigate()
        const [openSidebar, setOpenSidebar] = useState(false)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
     const userData =
            JSON.parse(localStorage.getItem('user'))
    
        // useEffect(() => {
    
        //     fetchSellerProducts()
    
        // }, [])

    // ───────────────── Fetch Products ─────────────────
    const fetchProducts = async () => {

        try {

            setLoading(true)

            const res = await api.get(
   `/products/my-products?sellerId=${userData._id}`
)

            setProducts(res.data.products || [])

        } catch (error) {

            console.error('Fetch products error:', error)

        } finally {

            setLoading(false)

        }

    }

    useEffect(() => {

        fetchProducts()

    }, [])

    // ───────────────── Delete Product ─────────────────
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this product?'
        )

        if (!confirmDelete) return

        try {

            await api.delete(`/products/${id}`)

            alert('Product deleted successfully')

            fetchProducts()

        } catch (error) {

            console.error('Delete error:', error)

            alert('Failed to delete product')

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
                        My Products
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
        <div className="min-h-screen bg-gray-100 p-5">

            <div className="flex items-center justify-between mb-6">
<h1
                        className='
                        text-3xl
                        font-bold
                        text-gray-800
                        '
                    >
                        Welcome, {' '}
                        {userData?.name}
                    
                    </h1>

                <button
                    onClick={() => navigate('/add-product')}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded"
                >
                    <FaPlus />
                    Add Product
                </button>

            </div>

            {/* Loading */}

            {
                loading ? (

                    <div className="text-center text-lg">
                        Loading...
                    </div>

                ) : products.length === 0 ? (

                     <div className='flex flex-col items-center w-full mt-40 '>

                                                <h1 className='text-4xl font-bold text-gray-400 text-center '>
                                                    No Product Found
                                                </h1>

                                                <button
                                                    onClick={() => navigate('/add-product')}
                                                    className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl mt-8 transition-all duration-300'
                                                >
                                                   Add Products
                                                </button>

                                            </div>

                ) : (

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                        {
                            products.map((product) => (

                                <div
                                    key={product._id}
                                    className="bg-white rounded-xl shadow p-4"
                                >

                                    {/* Product Image */}

                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-52 object-cover rounded"
                                    />

                                    {/* Product Info */}

                                    <div className="mt-4">

                                        <h2 className="text-xl font-semibold">
                                            {product.title}
                                        </h2>

                                        <p className="text-gray-600 mt-1">
                                            {product.category}
                                        </p>

                                        <p className="text-green-600 font-bold mt-2">
                                            ₹ {product.price}
                                        </p>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Stock: {product.stock}
                                        </p>

                                    </div>

                                    {/* Buttons */}

                                    <div className="flex gap-3 mt-4">

                                        {/* Edit */}

                                        <button
                                            onClick={() =>
                                                navigate(`/edit-product/${product._id}`)
                                            }
                                            className="flex-1 bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-2"
                                        >
                                            <FaEdit />
                                            Edit
                                        </button>

                                        {/* Delete */}

                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="flex-1 bg-red-600 text-white py-2 rounded flex items-center justify-center gap-2"
                                        >
                                            <FaTrash />
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                )
            }
</div>
</div>
        </div>

    )

}

export default MyProduct
