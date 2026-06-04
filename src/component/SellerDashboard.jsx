import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'
import {
    FaBox,
    FaRupeeSign,
    FaShoppingCart,
    FaPlus,
    FaEdit,
    FaTrash,
    FaArrowLeft,
    FaUser,
    FaSearch,
    
} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const SellerDashboard = () => {

    const [products, setProducts] = useState([])
    const [openSidebar, setOpenSidebar] = useState(false)

    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const userData =
        JSON.parse(localStorage.getItem('user'))

    useEffect(() => {

        fetchSellerProducts()

    }, [])

    const fetchSellerProducts = async () => {

        try {

            const response = await axios.get(

                'http://localhost:5000/api/products'

            )

            // ONLY SELLER PRODUCTS

            const sellerProducts =
                response.data.filter(

                    (product) =>

                        product.sellerId === userData?.id

                )

            setProducts(sellerProducts)

            setLoading(false)

        }

        catch (error) {

            console.log(error)

            setLoading(false)

        }

    }

    //Edit Product
    const [editingProduct,
        setEditingProduct] = useState(null)

    const handleEdit = (product) => {
        setEditingProduct(product)
        navigate('/add-product', { state: { product } })
    }


    // DELETE PRODUCT

    const handleDelete = async (id) => {

        try {

            await axios.delete(

                `http://localhost:5000/api/products/${id}`

            )

            fetchSellerProducts()

        }

        catch (error) {

            console.log(error)

        }

    }

    // TOTAL SALES

    const totalSales =

        products.reduce(

            (total, product) =>

                total +

                (product.price * product.sold),

            0

        )

    // TOTAL STOCK

    const totalStock =
        products.reduce(

            (acc, product) =>

                acc + product.stock,

            0

        )

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
                        Shopkeeper Dashboard
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

        <div
            className='
            min-h-screen
            bg-gray-100
            p-5
            '
        >

            {/* HEADER */}

            <div
                className='
                flex
                flex-col
                sm:flex-row
                justify-between
                items-center
                gap-4
                mb-6
                '
            >

                <div>

                    <h1
                        className='
                        text-3xl
                        font-bold
                        text-gray-800
                        '
                    >
                        Seller Dashboard
                    </h1>

                    <p className='text-gray-500 mt-1'>
                        Welcome,
                        {' '}
                        {userData?.name}
                    </p>

                </div>

                {/* ADD PRODUCT */}

                <button

                    onClick={() =>
                        navigate('/add-product')
                    }

                    className='
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-5
                    py-3
                    rounded-xl
                    flex
                    items-center
                    gap-2
                    font-semibold
                    shadow-lg
                    transition-all
                    hover:scale-105
                    '
                >

                    <FaPlus />

                    Add Product

                </button>

            </div>

            {/* STATS */}

            <div
                className='
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-5
                mb-8
                '
            >

                {/* PRODUCTS */}

                <div
                    className='
                    bg-white
                    p-5
                    rounded-2xl
                    shadow-md
                    '
                >

                    <div
                        className='
                        flex
                        justify-between
                        items-center
                        '
                    >

                        <div>

                            <p className='text-gray-500'>
                                Total Products
                            </p>

                            <h2
                                className='
                                text-3xl
                                font-bold
                                mt-2
                                '
                            >
                                {products.length}
                            </h2>

                        </div>

                        <FaBox
                            className='
                            text-5xl
                            text-blue-500
                            '
                        />

                    </div>

                </div>

                {/* STOCK */}

                <div
                    className='
                    bg-white
                    p-5
                    rounded-2xl
                    shadow-md
                    '
                >

                    <div
                        className='
                        flex
                        justify-between
                        items-center
                        '
                    >

                        <div>

                            <p className='text-gray-500'>
                                Total Stock
                            </p>

                            <h2
                                className='
                                text-3xl
                                font-bold
                                mt-2
                                '
                            >
                                {totalStock}
                            </h2>

                        </div>

                        <FaShoppingCart
                            className='
                            text-5xl
                            text-green-500
                            '
                        />

                    </div>

                </div>

                {/* SALES */}

                <div
                    className='
                    bg-white
                    p-5
                    rounded-2xl
                    shadow-md
                    '
                >

                    <div
                        className='
                        flex
                        justify-between
                        items-center
                        '
                    >

                        <div>

                            <p className='text-gray-500'>
                                Total Sales
                            </p>

                            <h2
                                className='
                                text-3xl
                                font-bold
                                mt-2
                                '
                            >
                                ₹ {totalSales.toFixed(2)}
                            </h2>

                        </div>

                        <FaRupeeSign
                            className='
                            text-5xl
                            text-purple-500
                            '
                        />

                    </div>

                </div>

            </div>

            {/* PRODUCTS TABLE */}

            <div
                className='
                bg-white
                rounded-2xl
                shadow-md
                overflow-x-auto
                '
            >

                <table className='w-full'>

                    <thead
                        className='
                        bg-gray-200
                        '
                    >

                        <tr>

                            <th className='p-4 text-left'>
                                Product
                            </th>

                            <th className='p-4 text-left'>
                                Price
                            </th>

                            <th className='p-4 text-left'>
                                Stock
                            </th>

                            <th className='p-4 text-left'>
                                Sold
                            </th>

                            <th className='p-4 text-left'>
                                Status
                            </th>

                            <th className='p-4 text-left'>
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            loading ? (

                                <tr>

                                    <td
                                        colSpan='6'
                                        className='
                                        text-center
                                        p-10
                                        text-xl
                                        '
                                    >
                                        Loading...
                                    </td>

                                </tr>

                            ) : products.length > 0 ? (

                                products.map((product) => (

                                    <tr
                                        key={product._id}

                                        className='
                                        border-b
                                        hover:bg-gray-50
                                        '
                                    >

                                        {/* PRODUCT */}

                                        <td className='p-4'>

                                            <div
                                                className='
                                                flex
                                                items-center
                                                gap-3
                                                '
                                            >

                                                <img
                                                    src={product.image}
                                                    alt='product'

                                                    className='
                                                    w-16
                                                    h-16
                                                    object-cover
                                                    rounded-xl
                                                    '
                                                />

                                                <div>

                                                    <h2
                                                        className='
                                                        font-semibold
                                                        '
                                                    >
                                                        {product.title}
                                                    </h2>

                                                    <p
                                                        className='
                                                        text-sm
                                                        text-gray-500
                                                        '
                                                    >
                                                        {product.category}
                                                    </p>

                                                </div>

                                            </div>

                                        </td>

                                        {/* PRICE */}

                                        <td className='p-4'>
                                            ₹ {product.price}
                                        </td>

                                        {/* STOCK */}

                                        <td className='p-4'>
                                            {product.stock}
                                        </td>

                                        {/* SOLD */}

                                        <td className='p-4'>
                                            {product.sold}
                                        </td>

                                        {/* STATUS */}

                                        <td className='p-4'>

                                            {
                                                product.stock === 0 ? (

                                                    <span
                                                        className='
                                                        bg-red-100
                                                        text-red-600
                                                        px-3
                                                        py-1
                                                        rounded-full
                                                        text-sm
                                                        '
                                                    >
                                                        Out Of Stock
                                                    </span>

                                                ) : product.stock <= 5 ? (

                                                    <span
                                                        className='
                                                        bg-yellow-100
                                                        text-yellow-700
                                                        px-3
                                                        py-1
                                                        rounded-full
                                                        text-sm
                                                        '
                                                    >
                                                        Few Left
                                                    </span>

                                                ) : (

                                                    <span
                                                        className='
                                                        bg-green-100
                                                        text-green-700
                                                        px-3
                                                        py-1
                                                        rounded-full
                                                        text-sm
                                                        '
                                                    >
                                                        In Stock
                                                    </span>

                                                )
                                            }

                                        </td>

                                        {/* ACTIONS */}

                                        <td className='p-4'>

                                            <div
                                                className='
                                                flex
                                                gap-3
                                                '
                                            >

                                                {/* EDIT */}

                                                <button
                                                    className='
                                                    bg-blue-400
                                                    hover:bg-blue-500
                                                    text-white
                                                    p-2
                                                    rounded-lg'
                                                    onClick={() =>
                                                        handleEdit(product)
                                                    }
                                                >

                                                    <FaEdit />

                                                </button>

                                                {/* DELETE */}

                                                <button

                                                    onClick={() =>
                                                        handleDelete(
                                                            product._id
                                                        )
                                                    }

                                                    className='
                                                    bg-red-400
                                                    hover:bg-red-500
                                                    text-white
                                                    p-2
                                                    rounded-lg
                                                    '
                                                >

                                                    <FaTrash />

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan='6'
                                        className='
                                        text-center
                                        p-10
                                        text-xl
                                        '
                                    >
                                        No Products Found
                                    </td>

                                </tr>

                            )
                        }

                    </tbody>

                </table>

            </div>

        </div>
        </div>
</div>

    )
}

export default SellerDashboard