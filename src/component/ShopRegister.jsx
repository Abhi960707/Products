import React, { useState } from 'react'
import api from '../api/axiosInstance'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ShopRegister = () => {

    const navigate = useNavigate()
    const { token } = useAuth()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        secretkey: '',
        role: 'shopkeeper'
    })

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        const { name, email, password, confirmPassword, secretkey } = formData;

        if (
            !name ||
            !email ||
            !password ||
            !confirmPassword ||
            !secretkey
        ) {
            alert('All Fields are Required')
            return
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return
        }

        try {

            const res = await api.post(
                '/auth/create-shopkeeper',
                {
                    name,
                    email,
                    password,
                    secretkey
                }
            )

            alert(res.data.message)
            navigate('/Dashboard')
        }

        catch (error) {
            alert(
                error.response?.data?.message ||
                'Registration Failed'
            )
        }

    }

    return (

        <div className='min-h-screen flex justify-center items-center bg-gray-100'>

            <form
                onSubmit={handleSubmit}
                className='bg-white p-8 rounded-2xl shadow-xl w-[90%] sm:w-96 flex flex-col gap-5'
            >

                <h1 className='text-3xl font-bold text-center text-sky-400'>
                    Shopkeeper Register
                </h1>

                <input
                    type='text'
                    name='name'
                    placeholder='Enter Shopkeeper Name'
                    value={formData.name}
                    onChange={handleChange}
                    className='border px-4 py-3 rounded-xl outline-none'
                />

                <input
                    type='email'
                    name='email'
                    placeholder='Enter Email'
                    value={formData.email}
                    onChange={handleChange}
                    className='border px-4 py-3 rounded-xl outline-none'
                />

                <input
                    type='password'
                    name='password'
                    placeholder='Enter Password'
                    value={formData.password}
                    onChange={handleChange}
                    className='border px-4 py-3 rounded-xl outline-none'
                />

                <input
                    type='password'
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className='border px-4 py-3 rounded-xl outline-none'
                />

                <input
                type='text'
                name='secretkey'
                placeholder='Enter secret key'
                value={formData.secretkey}
                onChange={handleChange}
                className='border px-4 py-3 rounded-xl outline-none'

/>

                <select
                type='text'
                    name='role'
                    placeholder='Select Role'
                    value={formData.role}
                    onChange={handleChange}
                    className='border p-3 rounded-xl outline-none'
                >

                    <option value='shopkeeper'>
                        Shopkeeper
                    </option>

                    {/* <option value='customer'>
                        Customer
                    </option> */}
                </select>



                <button
                    type='submit'
                    className='bg-sky-400 text-white py-3 rounded-xl font-bold hover:scale-105 transition-all duration-300'
                >
                    Register
                </button>

                <p className='text-center'>
                    Already have account?

                    <Link
                        to='/login'
                        className='text-blue-500 font-bold ml-1'
                    >
                        Login
                    </Link>

                </p>

            </form>

        </div>

    )

}

export default ShopRegister