import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import { FaBox, FaCartPlus, FaSearch, FaStar, FaUser } from 'react-icons/fa'
import logo from '../assets/logo.png'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {addToCart as addToCartRedux} from '../redux/slices/cartSlice'

const ProductApi = () => {

    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('all')
    const [openSidebar, setOpenSidebar] = useState(false)

    const navigate = useNavigate()
    const dispatch =useDispatch()
    
    const location = useLocation()
    const { cartCount, addToCart:addToCartContext } = useCart()
    const { user } = useAuth()

    useEffect(() => {

        const fetchData = async () => {
            const jsonResponse =
                await fetch('/product.json')

            const jsonData =
                await jsonResponse.json()


            const mongoResponse =
                await axios.get(

                    'http://localhost:5000/api/products'

                )
// dispatch(addToCartRedux(product))
// dispatch(setProducts(data))
            const mongoData =
                mongoResponse.data


            const allProducts = [

                ...jsonData,

                ...mongoData

            ]


            setProducts(allProducts)

            const params = new URLSearchParams(location.search)
            const initialSearch = params.get('search') || ''
            const initialCategory = params.get('category') || 'all'

            setSearch(initialSearch)
            setFilter(initialCategory)

            const updatedProducts = allProducts.filter((product) => {
                const matchesSearch = product.title.toLowerCase().includes(initialSearch.toLowerCase())
                const matchesCategory = initialCategory === 'all' || product.category === initialCategory
                return matchesSearch && matchesCategory
            })

            setFilteredProducts(updatedProducts)
            setLoading(false)

        }

        fetchData()

    }, [])

    const handleSubmit = () => {

        const updatedProducts = products.filter((product) => {

            const matchesSearch =
                product.title
                    .toLowerCase()
                    .includes(search.toLowerCase())

            const matchesCategory =
                filter === 'all' ||
                product.category === filter

            return matchesSearch && matchesCategory

        })

        setFilteredProducts(updatedProducts)

    }

    // Add to cart to caling  backend Api
    const handleAddToCart = async (e, product) => {

        e.stopPropagation()
        dispatch(addToCartRedux(product))
        await addToCartContext(product, 1)

    }

    return (

        <div
            onClick={() =>
                openSidebar && setOpenSidebar(false)
            }
            className={`transition-all duration-300
${openSidebar ? 'ml-[75%] sm:ml-64' : 'ml-0'}`}
        >

            <nav
                className={`bg-gradient-to-r from-slate-300 to-slate-600 text-white p-3.5 flex flex-col lg:flex-row justify-between lg:items-center gap-4 fixed top-0 z-50 shadow-lg transition-all duration-300
${openSidebar
                        ? 'left-64 w-[calc(100%-16rem)]'
                        : 'left-0 w-full'
                    }
`}
            >
                <div className='flex items-center'>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setOpenSidebar(!openSidebar)
                        }}
                        className='text-3xl font-bold text-gray-700 cursor-pointer mb-1 ml-2'
                    >
                        ☰
                    </button>

                    <div className='flex items-center gap-2'>
                        <img
                            src={logo}
                            alt='logo'
                            className='w-52 sm:w-40 lg:w-52 h-10 object-contain scale-250 pointer-events-none'
                        />
                    </div>

                </div>

                <div className='flex flex-wrap justify-center items-center gap-2'>
                    <select
                        value={filter}
                        onChange={(e) => {
                            setFilter(e.target.value)
                            const updatedProducts = products.filter((product) => {

                                const matchesSearch =
                                    product.title
                                        .toLowerCase()
                                        .includes(search.toLowerCase())

                                const matchesCategory =
                                    e.target.value === 'all' ||
                                    product.category === e.target.value

                                return matchesSearch && matchesCategory

                            })
                            setFilteredProducts(updatedProducts)
                        }}
                        // className='text-black px-4 py-2 border rounded-xl bg-gray w-48'
                        className='text-black px-3 py-2 border rounded-xl bg-white w-56 max-h-12 overflow-y-auto text-sm' >
                        <option value="all">All</option>
                        <option value="electronics">Electronics</option>
                        <option value="gaming">Gaming</option>
                        <option value="shoes">Shoes</option>
                        <option value="bags">Bags</option>
                        <option value="watches">Watches</option>
                        <option value="photography">Photography</option>
                        <option value="women clothing">Women Clothing</option>
                        <option value="men clothing">Men Clothing</option>
                        <option value="jewelry">Jewelry</option>
                        <option value="kitchen">Kitchen</option>
                        <option value="books">Books</option>
                        <option value="fitness">Fitness</option>
                        <option value="sports">Sports</option>
                        <option value="furniture">Furniture</option>
                        <option value="mobile accessories">Mobile Accessories</option>
                        <option value="fashion accessories">Fashion Accessories</option>
                        <option value="beauty">Beauty</option>
                        <option value="kids">Kids</option>
                        <option value="home decor">Home Decor</option>
                        <option value="office essentials">Office Essentials</option>
                    </select>

                    <div className='relative w-full sm:w-96'>

                        <FaSearch
                            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-md mt-0.5'
                        />

                        <input
                            type='text'
                            placeholder='Search products'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === 'Enter' && handleSubmit()
                            }
                            className='w-full pl-10 pr-4 py-2 rounded-xl text-black border bg-white outline-none'
                        />

                    </div>

                    {user?.role === 'customer' && (
                        <>
                            <div className='bg-green-600 px-3 py-1 rounded-full flex justify-center items-center '>
                                <button
                                    onClick={() => navigate('/buyorders')}
                                    className='text-white font-extrabold cursor-pointer ' >
                                    <FaBox className='inline m-1' />
                                </button>

                            </div>

                            <div className=' bg-sky-400 px-3 py-1 rounded-full flex justify-center items-center'>
                                <button
                                    onClick={() => navigate('/cart')}
                                    className='text-white font-extrabold cursor-pointer' >
                                    <FaCartPlus className='inline m-1' />
                                    {cartCount}
                                </button>
                            </div>
                        </>
                    )}
                    <div className='bg-slate-400 px-3 py-1 rounded-full flex justify-center items-center'>
                        <button
                            onClick={() => navigate('/profile')}
                            className='text-white font-extrabold cursor-pointer'>
                            <FaUser className="inline m-1" />
                        </button>

                    </div>
                </div>
            </nav>

            <Sidebar
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
            />

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 p-3 mt-15 gap-4 '>

                {
                    loading ? (
                        <h1 className='text-3xl font-bold text-blue-500 text-center col-span-full mt-40 whitespace-nowrap'>
                            Loading Products...
                        </h1>
                    ) : filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (

                            <div

                                key={product._id || product.id}

                                onClick={() =>
                                    navigate(

                                        `/product/${product._id || product.id}`,

                                        {
                                            state: {
                                                product
                                            }
                                        })
                                }
                                className='bg-white flex flex-col justify-between rounded-2xl shadow-lg p-3 sm:p-4 cursor-pointer hover:scale-105 transition-all duration-300 min-h-[350px]'
                            >
                                <div className='flex justify-center w-full h-40'>
                                    <img
                                        src={product.image}
                                        alt="product"
                                        className='w-full h-32 sm:h-40 object-contain'
                                    />
                                </div>

                                <h1 className='text-lg font-bold line-clamp-2'>
                                    {product.title}
                                </h1>

                                <h1 className=''>
                                    Price : ₹ {product.price}
                                </h1>

                                    {user?.role === 'customer' && (
                                        <div className='flex flex-col sm:flex-row gap-6 justify-center items-center w-full'>
                                            <button
                                                onClick={(e) => handleAddToCart(e, product)}
                                                className='bg-blue-400 text-white px-3 py-2 rounded-md w-full mt-2' >
                                                <FaCartPlus className='inline mb-1 m-1 ' />Add Cart
                                            </button>
                                        </div>
                                    )}
                            </div>

                        ))
                    ) : (

                        <h1 className='text-2xl text-red-500'>
                            No Products Found
                        </h1>
                    )
                }
            </div>
        </div>
    )
}

export default ProductApi

