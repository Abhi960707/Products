import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {

    const navigate = useNavigate()
    const { login } = useAuth()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

        setError('') 

    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {

            const res = await axios.post(
                'http://localhost:5000/api/auth/login',
                formData
            )
            
            login(res.data.token, res.data.user)

            navigate('/Dashboard')

        } catch (error) {

            setError(
                error.response?.data?.message || 'Login failed. Please try again.'
            )

        } finally {
            setIsLoading(false)

        }

    }

   
    return (

        <div className='min-h-screen flex justify-center items-center bg-gray-200'>

            <form
                onSubmit={handleSubmit}
                className='bg-white p-9 rounded-2xl shadow-xl w-[90%] sm:w-110 flex flex-col gap-4'
            >

                <h1 className='text-3xl font-bold text-center text-blue-400'>
                    Login
                </h1>

                {error && (
                    <p className='text-red-500 text-sm text-center bg-red-50 py-2 px-4 rounded-xl'>
                        {error}
                    </p>
                )}

                <input
                    type='email'
                    name='email'
                    placeholder='Enter Email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className='border px-4 py-3 rounded-xl outline-none'
                />

                <input
                    type='password'
                    name='password'
                    placeholder='Enter Password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className='border px-4 py-3 rounded-xl outline-none'
                />
                <button
                    type='submit'
                    disabled={isLoading}
                    className=' justify-center items-center bg-blue-400 text-white py-3 rounded-xl font-bold hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed'
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                <Link
                        to='/forget-password'
                        className='text-blue-500 font-bold flex justify-center' 
                    >
                        Forget Password
                    </Link>

                <p className='text-center'>

                    Don't have account ?

                    <Link
                        to='/register'
                        className='text-blue-500 font-bold ml-1'
                    >
                        Register
                    </Link>
                    

                </p>

            </form>

        </div>

    )

}

export default Login