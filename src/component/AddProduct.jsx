import React,
{ useState } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    FaArrowLeft,
    FaUser
} from 'react-icons/fa'
const AddProduct = () => {
    const location = useLocation()
        const [openSidebar, setOpenSidebar] = useState(false)
    
    const editProduct = location.state?.product
    const navigate = useNavigate()

    const [formData, setFormData] =
        useState({

            // id: editProduct?.id || '',
            title: editProduct?.title || '',
            price: editProduct?.price || '',
            description: editProduct?.description || '',
            category: editProduct?.category || '',
            image: editProduct?.image || '',
            stock: editProduct?.stock || '',
            sold: editProduct?.sold || 0,
            rating: editProduct?.rating || {
                rate: 4.5,
                count: 0
            }
        })



    const userData =
        JSON.parse(
            localStorage.getItem('user')
        )

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value

        })

    }

    // const [filter, setFilter] = useState('all')


    // const handleSubmit =
    //     async (e) => {

    //         e.preventDefault()

    //         try {

    //             await axios.post(

    //                 'http://localhost:5000/api/products',

    //                 {

    //                     ...formData,

    //                     sold: 0,

    //                     sellerId: userData.id

    //                 }

    //             )

    //             alert('Product Published')

    //         }

    //         catch (error) {

    //             console.log(error)

    //         }

    //     }

    const handleSubmit =
        async (e) => {

            e.preventDefault()

            try {
                if (editProduct) {
                    // UPDATE PRODUCT

                    await axios.put(
                        `http://localhost:5000/api/products/${editProduct._id}`,
                        {
                            title: formData.title,
                            price: Number(formData.price),
                            description: formData.description,
                            category: formData.category,
                            image: formData.image,
                            stock: Number(formData.stock),
                            sold: formData.sold,
                            rating: formData.rating,
                            sellerId: userData.id
                        }
                    )

                    alert('Product Updated Successfully')

                }

                else {

                    // ADD PRODUCT

                    await axios.post(

                        'http://localhost:5000/api/products',

                        {

                            title: formData.title,

                            price: Number(formData.price),

                            description: formData.description,

                            category: formData.category,

                            image: formData.image,

                            stock: Number(formData.stock),

                            sold: 0,

                            rating: {
                                rate: 4.5,
                                count: 0
                            },

                            sellerId: userData.id

                        }

                    )

                    alert('Product Published')

                }

            }

            catch (error) {

                console.log(error)

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
                        Add & Publish Product
                    </h1>
                    <div className='bg-slate-400 text-white font-extrabold cursor-pointer px-4 sm:px-5 py-2 rounded-full font-bold text-sm sm:text-lg shadow-md hover:scale-105 transition-all duration-300'>
                        <button
                            onClick={() => navigate('/profile')}
                            className='text-white font-extrabold cursor-pointer'>
                            <FaUser className="inline " />

                        </button>

                    </div>


                </nav>
                {/* <button
                    onClick={() => navigate('/home')}
                    className=' cursor-pointer text-blue-500 px-4 py-1 rounded-xl to-transparent '
                >
                    <FaArrowLeft className='inline mr-2 ' />
                    Back to Home

                </button> */}
        
        

        <div className=' bg-gray-200'>
  <button
                    onClick={() => navigate('/home')}
                    className=' cursor-pointer text-blue-500 px-4 py-1 rounded-xl to-transparent '
                >
                    <FaArrowLeft className='inline mr-2 ' />
                    Back to Home

                </button>
            <form

                onSubmit={handleSubmit}

                className='
max-w-3xl
mx-auto
bg-white
p-5
rounded-2xl
shadow-lg
flex
flex-col
gap-4
'>

                <h1
                    className='
text-3xl
font-bold
justify-center flex
'>
                    Add Product
                </h1>

                <input
                    type='text'
                    name='title'
                    value={formData.title}
                    placeholder='Title'
                    onChange={handleChange}
                    className='border p-3 rounded-xl'
                />

                <input
                    type='number'
                    name='price'
                    value={formData.price}
                    placeholder='Price'
                    onChange={handleChange}
                    className='border p-3 rounded-xl'
                />

                <textarea
                    name='description'
                    placeholder='Description'
                    value={formData.description}
                    onChange={handleChange}
                    className='border p-3 rounded-xl'
                />

                {/* <input
                    type='text'
                    name='category'
                    placeholder='Category'
                    value={formData.category}
                    onChange={handleChange}
                    className='border p-3 rounded-xl'
                /> */}
                <select

                    name='category'

                    value={formData.category}

                    onChange={handleChange}

                    className='
text-black
p-3
border
rounded-xl
bg-white
text-md
'

                >

                    <option value="">
                        Select Category
                    </option>

                    <option value="electronics">
                        Electronics
                    </option>

                    <option value="gaming">
                        Gaming
                    </option>

                    <option value="shoes">
                        Shoes
                    </option>

                    <option value="bags">
                        Bags
                    </option>

                    <option value="watches">
                        Watches
                    </option>

                    <option value="photography">
                        Photography
                    </option>

                    <option value="women clothing">
                        Women Clothing
                    </option>

                    <option value="men clothing">
                        Men Clothing
                    </option>

                    <option value="jewelry">
                        Jewelry
                    </option>

                    <option value="kitchen">
                        Kitchen
                    </option>

                    <option value="books">
                        Books
                    </option>

                    <option value="fitness">
                        Fitness
                    </option>

                    <option value="sports">
                        Sports
                    </option>

                    <option value="furniture">
                        Furniture
                    </option>

                    <option value="mobile accessories">
                        Mobile Accessories
                    </option>

                    <option value="fashion accessories">
                        Fashion Accessories
                    </option>

                    <option value="beauty">
                        Beauty
                    </option>

                    <option value="kids">
                        Kids
                    </option>

                    <option value="home decor">
                        Home Decor
                    </option>

                    <option value="office essentials">
                        Office Essentials
                    </option>

                </select>

                <input
                    type='text'
                    name='image'
                    value={formData.image}
                    placeholder='Image URL'
                    onChange={handleChange}
                    className='border p-3 rounded-xl'
                />

                <input
                    type='number'
                    name='stock'
                    value={formData.stock}
                    placeholder='Stock'
                    onChange={handleChange}
                    className='border p-3 rounded-xl'
                />
            

                <button
                    type='submit'
                    className='
bg-blue-600
hover:bg-blue-700
text-white
py-3
rounded-xl
w-30
justify-center
'>

                    Publish Product

                </button>

            </form>

        </div>
        </div>
        </div>

    )

}

export default AddProduct