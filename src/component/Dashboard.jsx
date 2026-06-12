import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import {
    FaSearch,
    FaBox,
    FaCartPlus,
    FaUser,
    FaShoppingBag
} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import logo from '../assets/logo.png'
import { useCart } from '../context/CartContext'

const Dashboard = () => {

    const navigate = useNavigate()

    const user = useSelector(
        state => state.auth.user
    )

    const cartItems = useSelector(
        state => state.cart.cartItems
    )

    const products = useSelector(
        state => state.product.products
    )

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    )

    console.log("Redux User Name :", user)

    console.log("Redux Cart Adition :", cartItems)

    console.log("Cart Counted :", cartCount)

    console.log("Redux Products :", products)

    useEffect(() => {
        if (user) {
            if (user.role === 'admin') {
                navigate('/admin-dashboard')
            } else if (user.role === 'shopkeeper') {
                navigate('/seller-dashboard')
            }
        }
    }, [user, navigate])

    useEffect(() => {

        console.log(
            "Redux cart from store in Dashboard :",
            cartItems
        )

    }, [cartItems])

    const UserData = user

    const [current, setCurrent] = useState(0)

    const [openSidebar, setOpenSidebar] =
        useState(false)

    const [search, setSearch] =
        useState('')

    const [filter, setFilter] =
        useState('all')






    //   Sliders imge
    const sliderData = [
        {
            image: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1600&auto=format&fit=crop',
            category: 'electronics'
        },
        {
            image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop',
            category: 'furniture'
        },
        {
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
            category: 'gaming'
        },
        {
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1600&h=600&fit=crop',
            category: 'shoes'
        },
        {
            image: 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=1600&h=600&fit=crop',
            category: 'bags'
        },
        {
            image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1600&h=600&fit=crop',
            category: 'watches'
        },
        {
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1600&h=600&fit=crop',
            category: 'photography'
        },
        {
            image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&h=600&fit=crop',
            category: 'women clothing'
        },
        {
            image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1600&h=600&fit=crop',
            category: 'men clothing'
        },
        {
            image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1600&h=600&fit=crop',
            category: 'jewelry'
        },
        {
            image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1600&h=600&fit=crop',
            category: 'kitchen'
        },
        {
            image: 'https://images-eu.ssl-images-amazon.com/images/G/31/img21/Books/May26/Desktop_tall_Hero_3000x1200_EL_Rec._CB762895918_.jpg',
            category: 'books'
        },
        {
            image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&h=600&fit=crop',
            category: 'fitness'
        },
        {
            image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&h=600&fit=crop',
            category: 'sports'
        },
        {
            image: 'https://images-eu.ssl-images-amazon.com/images/G/31/IMG25/Home/2025/GW/BAU/Dec/Hero/Mega_home_sale_BAU_PC_-_Drying_racks._CB777818991_.jpg',
            category: 'furniture'
        },
        {
            image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=1600&h=600&fit=crop',
            category: 'mobile accessories'
        },
        {
            image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=1600&h=600&fit=crop',
            category: 'fashion accessories'
        },
        {
            image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1600&h=600&fit=crop',
            category: 'beauty'
        },
        {
            image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=1600&h=600&fit=crop',
            category: 'kids'
        },
        {
            image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1600&h=600&fit=crop',
            category: 'home decor'
        }
    ]

    // // ── Category cards ─────────────────────────────────────
    const cards = [
        {
            title: 'Trending Electronics & Smart Gadgets',
            category: 'electronics',
            items: [
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
                'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=400',
                'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400',
                'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400'
            ]
        },
        {
            title: 'Best Smart TVs & Entertainment Devices',
            category: 'electronics',
            items: [
                'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400',
                'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?w=400',
                'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
                'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400'
            ]
        },
        {
            title: 'Stylish Men Fashion & Trending Wear',
            category: 'men clothing',
            items: [
                'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400',
                'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
                'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400',
                'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=400'
            ]
        },
        {
            title: 'Women Fashion & Lifestyle Collection',
            category: 'women clothing',
            items: [
                'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400',
                'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400',
                'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
                'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400'
            ]
        },
        {
            title: 'Luxury Jewelry & Accessories',
            category: 'jewelry',
            items: [
                'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
                'https://images.unsplash.com/photo-1603974372039-adc49044b6bd?w=400',
                'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400',
                'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400'
            ]
        },
        {
            title: 'Top Trending Shoes & Sneakers',
            category: 'shoes',
            items: [
                'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
                'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400',
                'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400',
                'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400'
            ]
        },
        {
            title: 'Premium Watches & Smart Watches',
            category: 'watches',
            items: [
                'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400',
                'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400',
                'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=400',
                'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400'
            ]
        },
        {
            title: 'Gaming Accessories & Computer Setup',
            category: 'gaming',
            items: [
                'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=400',
                'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400',
                'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400',
                'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400'
            ]
        },
        {
            title: 'Travel Bags & Backpack Collection',
            category: 'bags',
            items: [
                'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=400',
                'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=400',
                'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
                'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400'
            ]
        },
        {
            title: 'Home Decor & Kitchen Essentials',
            category: 'kitchen',
            items: [
                'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400',
                'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400',
                'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
                'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400'
            ]
        },
        {
            title: 'Modern Mobile Accessories',
            category: 'mobile accessories',
            items: [
                'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400',
                'https://images.unsplash.com/photo-1580894908361-967195033215?w=400',
                'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=400',
                'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=400'
            ]
        },
        {
            title: 'Fitness & Sports Accessories',
            category: 'fitness',
            items: [
                'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
                'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
                'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400',
                'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=400'
            ]
        }
    ]

    const handleSearch = () => {
        if (search.trim()) {
            navigate(`/home?search=${encodeURIComponent(search)}`)
        }
    }

    const handleFilter = (e) => {
        setFilter(e.target.value)
        navigate(`/home?category=${encodeURIComponent(e.target.value)}`)
    }

    const nextSlide = () => setCurrent((current + 1) % sliderData.length)
    const prevSlide = () => setCurrent((current - 1 + sliderData.length) % sliderData.length)

    useEffect(() => {
        const slider = setInterval(nextSlide, 1800)
        return () => clearInterval(slider)
    }, [current])

    return (

        <div
            onClick={() => openSidebar && setOpenSidebar(false)}
            className={`transition-all duration-300 ${openSidebar ? 'ml-[75%] sm:ml-64' : 'ml-0'}`}
        >

            <nav
                className={`bg-gradient-to-r from-slate-300 to-slate-600 text-white px-4 py-3 flex flex-col lg:flex-row justify-between lg:items-center gap-3 fixed top-0 z-50 shadow-lg transition-all duration-300
                    ${openSidebar ? 'left-64 w-[calc(100%-16rem)]' : 'left-0 w-full'}`}
            >

                <div className='flex items-center gap-2'>
                    <button
                        onClick={(e) => { e.stopPropagation(); setOpenSidebar(!openSidebar) }}
                        className='text-3xl font-bold text-gray-700 cursor-pointer mb-1 ml-2'
                    >
                        ☰
                    </button>
                    <img
                        src={logo}
                        alt='logo'
                        className='w-52 sm:w-40 lg:w-52 h-11 object-contain scale-250 pointer-events-none'
                    />
                </div>

                <div className='flex flex-wrap justify-center items-center gap-3'>
                    <select
                        value={filter}
                        onChange={handleFilter}
                        className='text-black px-3 py-2 border rounded-xl bg-white text-sm w-58'
                    >
                        <option value="all">All Categories</option>
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

                    <div className='relative w-full sm:w-120'>
                        <FaSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-md mt-0.5' />
                        <input
                            type='text'
                            placeholder='Search products...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className='w-full pl-10 pr-4 py-2 rounded-xl text-black border bg-white outline-none text-sm'
                        />
                    </div>

                    {
                        UserData?.role === 'customer'

                        &&

                        [

                            {
                                icon: <FaBox />,
                                label: 'Orders',
                                path: '/buyorders',
                                color: 'bg-green-600'
                            },

                            {
                                icon: <FaCartPlus />,
                                label: `Cart ${cartCount}`,
                                path: '/cart',
                                color: 'bg-sky-400'
                            },

                            {
                                icon: <FaUser />,
                                label: 'Profile',
                                path: '/profile',
                                color: 'bg-slate-400'
                            }

                        ].map(({ icon, label, path, color }) => (

                            <button
                                key={path}
                                onClick={() => navigate(path)}
                                className={`${color} hover:opacity-90 text-white px-4 py-2 rounded-xl flex items-center gap-1 text-sm font-semibold transition-all duration-200`}
                            >

                                {icon}

                                <span className='hidden sm:inline'>
                                    {label}
                                </span>

                            </button>

                        ))

                    }

                    {
                        UserData?.role === 'shopkeeper'

                        &&

                        [

                            {
                                label: 'Seller Dashboard',
                                path: '/seller-dashboard',
                                color: 'bg-purple-500'
                            },
                            // {
                            //     label: 'Add Product',
                            //     path: '/add-product',
                            //     color: 'bg-orange-500'
                            // },

                            // {
                            //     label: 'My Products',
                            //     path: '/my-products',
                            //     color: 'bg-pink-500'
                            // },
                            {
                                icon: <FaUser />,
                                label: 'Profile',
                                path: '/profile',
                                color: 'bg-slate-400'
                                // width:'20px'
                            }

                           

                        ].map(({ icon, label, path, color }) => (

                            <button
                                key={path}
                                onClick={() => navigate(path)}
                                className={`${color} hover:opacity-90 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200`}
                            >

                                {icon}
                                <span className='hidden sm:inline'>
                                    {label}
                                    
                                </span>

                            </button>

                        ))

                    }


                </div>

            </nav>

            <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

            <div className='w-full min-h-screen bg-gray-100' style={{ paddingTop: '75px' }}>

                <div className='relative w-full overflow-hidden bg-gray-200' style={{ height: '380px' }}>

                    {/* Slide images */}
                    {sliderData.map((slide, index) => {
                        let isCurrent = index === current;
                        let isPrev = index === (current - 1 + sliderData.length) % sliderData.length;
                        let isNext = index === (current + 1) % sliderData.length;

                        let positionClass = "opacity-0 scale-75 z-0 left-1/2 -translate-x-1/2 pointer-events-none";

                        if (isCurrent) {
                            positionClass = "opacity-100 scale-100 z-20 left-1/2 -translate-x-1/2 shadow-2xl cursor-pointer";
                        } else if (isPrev) {
                            positionClass = "opacity-60 hover:opacity-100 scale-90 z-10 left-[10%] sm:left-[15%] -translate-x-1/2 shadow-lg cursor-pointer";
                        } else if (isNext) {
                            positionClass = "opacity-60 hover:opacity-100 scale-90 z-10 left-[90%] sm:left-[85%] -translate-x-1/2 shadow-lg cursor-pointer";
                        }

                        return (
                            <div
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/home?category=${encodeURIComponent(slide.category)}`);
                                }}
                                className={`absolute top-6 bottom-12 w-[80%] sm:w-[60%] lg:w-[50%] transition-all duration-700 ease-in-out rounded-2xl overflow-hidden ${positionClass}`}
                            >
                                <img
                                    src={slide.image}
                                    alt={`slide-${index}`}
                                    className="w-full h-full object-cover"
                                />

                                {/* Gradient Overlay and Category Name */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>
                                <div className='absolute bottom-16 sm:bottom-20 left-6 z-10 pointer-events-none'>
                                    <h2 className='text-white text-3xl sm:text-4xl font-extrabold capitalize drop-shadow-md tracking-wide'>
                                        {slide.category}
                                    </h2>
                                </div>

                                {isCurrent && (
                                    <div className='absolute bottom-4 left-6 z-10 hidden sm:block'>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/home?category=${encodeURIComponent(slide.category)}`);
                                            }}
                                            className='bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg transition-transform hover:scale-105'
                                        >
                                            <FaShoppingBag />
                                            Shop Now
                                        </button>
                                    </div>
                                )}
                            </div>
                        )
                    })}

                    {/* Dot indicators */}
                    <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-1 sm:gap-2 w-[90%] z-30'>
                        {sliderData.map((_, index) => (
                            <button
                                key={index}
                                onClick={(e) => { e.stopPropagation(); setCurrent(index) }}
                                className={`rounded-full transition-all duration-300
                                    ${index === current
                                        ? 'bg-gray-800 w-8 h-3'
                                        : 'bg-gray-400 w-3 h-3 hover:bg-gray-600'
                                    }`}
                            />
                        ))}
                    </div>

                </div>
                {/* <SellerDashboard /> */}



                {/* ── CATEGORY CARDS GRID ──────────────────── */}
                <div className='max-w-[1600px] mx-auto px-4 py-6'>

                    <h2 className='text-2xl font-bold text-gray-700 mb-5'>
                        Shop by Category
                    </h2>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>

                        {cards.map((card, index) => (

                            <div
                                key={index}
                                onClick={() => navigate(card.category ? `/home?category=${encodeURIComponent(card.category)}` : '/home')}
                                className='bg-white rounded-2xl shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1 overflow-hidden'
                            >

                                <div className='p-4 border-b border-gray-100'>
                                    <h3 className='text-base font-bold text-gray-800 line-clamp-1'>
                                        {card.title}
                                    </h3>
                                </div>

                                <div className='grid grid-cols-2 gap-0.5 p-2'>
                                    {card.items.map((item, i) => (
                                        <div
                                            key={i}
                                            className='bg-gray-50 rounded-lg flex items-center justify-center p-2 aspect-square overflow-hidden'
                                        >
                                            <img
                                                src={item}
                                                alt='product'
                                                className='w-full h-full object-contain hover:scale-110 transition-transform duration-300'
                                                onError={(e) => { e.target.style.display = 'none' }}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className='px-4 py-3 text-right'>
                                    <span className='text-blue-500 text-sm font-semibold hover:underline'>
                                        See all →
                                    </span>
                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>

    )

}

export default Dashboard

