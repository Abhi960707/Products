import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import React, { useEffect, useState } from 'react'
import { FaDownload, FaUser } from 'react-icons/fa'
import { FaArrowLeft, FaDownLeftAndUpRightToCenter } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import api from '../api/axiosInstance'
import {useSelector} from 'react-redux'

// import User from '../../backend/models/User'

const BuyOrders = () => {

    const navigate = useNavigate()
    const [openSidebar, setOpenSidebar] = useState(false)
    const [buyOrders, setBuyOrders] = useState([])
    const [loading, setLoading] = useState(true)

//Redux orders store
const orders =useSelector(state => state.order.orders)
console.log('Redux orders fetching :',orders)
    useEffect(() => {

        const fetchOrders = async () => {

            try {

                setLoading(true)
                const res = await api.get('/orders')
                setBuyOrders(res.data || [])

            } catch (error) {

                console.error('fetchOrders error:', error.message)
                setBuyOrders([])

            } finally {

                setLoading(false)
            }
        }

        fetchOrders()
    }, [])

    const downloadPDF = () => {
        const doc = new jsPDF('landscape')
        doc.setFontSize(25)
        doc.text('Order History', 120, 15)

        doc.setFontSize(8)
        const tableColumn = ['Sr.', 'Product Name', 'Price', 'Quantity', 'Total Amount', 'Payment Method', 'Order Id', 'Address', 'Date&Time']
        const tableRows = []
        buyOrders.forEach(order => {
            order.items.forEach(item => {
                const rowData = [
                    // order._id,
                    tableRows.length + 1,
                    item.title,
                    `Rs.${item.price}`,
                    item.quantity,
                    // order.status || 'Delivered',
                    `Rs.${(item.price * item.quantity).toFixed(2)}`,
                    order.paymentMethod,
                    order._id,
                    order.address,
                    `${new Date(order.createdAt).toLocaleDateString('en-In')} ${new Date(order.createdAt).toLocaleTimeString('en-In')}`
                ]
                tableRows.push(rowData)
            })
        })
        // doc.text(`Customer Name: ${customerName}`, 14, 55)
        // doc.text(`Total Amount: ${totalAmount}`, 14, 65)

        autoTable(doc, {

            head: [tableColumn],
            body: tableRows,
            startY: 25,
            styles: {
                fontSize: 8,
                cellPadding: 2,
                overflow: 'linebreak'
            },
            headStyles: {
                fontSize: 9
            }
        })
        doc.save('order-History.pdf')
    }

    return (

        <div className='min-h-screen bg-slate-100 overflow-y-auto scrollbar-hide'>
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

                    <h1 className='text-2xl sm:text-4xl font-bold'>
                        My Orders
                    </h1>

                    <div className='bg-slate-400 text-white font-extrabold cursor-pointer px-4 sm:px-5 py-2 rounded-full font-bold text-sm sm:text-lg shadow-md hover:scale-105 transition-all duration-300'>
                        <button
                            onClick={() => navigate('/profile')}
                            className='text-white font-extrabold cursor-pointer'>
                            <FaUser className="inline " />

                        </button>

                    </div>
                </nav>

                <div className='p-3'>
                    <div className='relative mb-4 '>
                        <div className='flex justify-between items-center '>
                            <button
                                onClick={() => navigate('/home')}
                                className=' cursor-pointer text-blue-500 px-4 py-1 rounded-2xl to-transparent '
                            >

                                <FaArrowLeft className='inline mr-2' />
                                Continue Shopping

                            </button>

                            {/* <button
                                onClick={downloadPDF}

                                className='pr-6 ' >
                                <FaDownload /></button> */}
                        </div>
                        {loading ? (

                            <div className='flex justify-center items-center mt-20'>
                                <h1 className='text-2xl font-bold text-blue-400 animate-pulse'>
                                    Loading Orders...
                                </h1>
                            </div>

                        ) : (
                            <>
                                <div className='flex flex-col sm:flex-row justify-center items-center gap-5'>

                                    <div
                                        className='bg-indigo-400 text-white rounded-2xl shadow-lg p-3 w-full sm:w-96'
                                    >

                                        <h1 className='text-sm font-semibold uppercase tracking-widest'>
                                            Total Orders
                                        </h1>

                                        <h1 className='text-4xl font-bold mt-2'>
                                            {buyOrders.length}
                                        </h1>

                                    </div>
                                    <div
                                        className='bg-white rounded-2xl shadow-lg p-3 w-full sm:w-96'
                                    >

                                        <h1 className='text-sm font-semibold uppercase tracking-widest text-gray-500'>
                                            Total Amount
                                        </h1>

                                        <h1 className='text-4xl font-bold text-indigo-600 mt-2'>
                                            ₹{
                                                buyOrders.reduce(
                                                    (total, order) =>
                                                        total + (order.totalAmount || 0), 0
                                                ).toFixed(2)
                                            }
                                        </h1>

                                    </div>
                                </div>


<div className='flex justify-between items-center '>
                                <h1 className='text-3xl font-bold'>
                                    Order History
                                </h1>

  <button
                                onClick={downloadPDF}

                                className='pr-6 text-xl ' >
                                <FaDownload /></button>
</div>
                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5'>

                                    {
                                        buyOrders.length > 0 ? (
                                            buyOrders.map((order, index) => (

                                                order.items.map((item, i) => (


                                                    <div
                                                        key={`${order._id}-${i}`}
                                                        className='bg-white rounded-2xl shadow-md p-5 flex flex-col sm:flex-row justify-between items-center gap-5 hover:shadow-xl hover:scale-[1.01] transition-all duration-300'
                                                    >

                                                        <div className='flex gap-5'>
                                                            <div className='bg-gray-100 rounded-xl p-3 h-fit m-auto'>

                                                                <img
                                                                    src={item.image}
                                                                    alt='product'
                                                                    className='w-24 h-24 object-contain '
                                                                />

                                                            </div>

                                                            <div className='flex flex-col justify-center'>

                                                                <h1 className='text-2xl font-semibold line-clamp-2'>
                                                                    {item.title}
                                                                </h1>

                                                                <h1 className='text-gray-500 mt-2'>
                                                                    Qty : {item.quantity}
                                                                </h1>

                                                                <h1 className='text-gray-500 mt-1'>
                                                                    Price : ₹{item.price}
                                                                </h1>

                                                                <h1 className='text-sm text-gray-500 mt-1'>
                                                                    Order ID :
                                                                    <span className='font-bold text-indigo-600'>
                                                                        {" "}{order.orderId}
                                                                    </span>
                                                                </h1>

                                                                <h1 className='text-sm text-gray-500 mt-1'>
                                                                    Payment : {order.paymentMethod}
                                                                </h1>

                                                                <h1 className='text-sm text-gray-500 mt-1 line-clamp-2'>
                                                                    Address : {order.address}
                                                                </h1>

                                                                <h1 className='text-sm text-gray-400 mt-2'>
                                                                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                                                        day: 'numeric',
                                                                        month: 'short',
                                                                        year: 'numeric',
                                                                        hour: 'numeric',
                                                                        minute: 'numeric'
                                                                    })}
                                                                </h1>

                                                            </div>

                                                        </div>

                                                        <div className='flex flex-col justify-center items-end'>

                                                            <h1 className='text-3xl font-bold text-indigo-600'>
                                                                ₹{(item.price * item.quantity).toFixed(2)}
                                                            </h1>

                                                        </div>

                                                    </div>

                                                ))

                                            ))

                                        ) : (

                                            <div className='flex flex-col items-center w-full mt-40 ml-95'>

                                                <h1 className='text-4xl font-bold text-gray-400 text-center '>
                                                    No Orders Found
                                                </h1>

                                                <button
                                                    onClick={() => navigate('/home')}
                                                    className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl mt-8 transition-all duration-300'
                                                >
                                                    Start Shopping
                                                </button>

                                            </div>

                                        )
                                    }

                                </div>
                            </>

                        )}

                    </div>

                </div>

            </div>

        </div>

    )

}

export default BuyOrders