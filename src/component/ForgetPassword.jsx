import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ForgetPassword = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        secretkey: '',
        newPassword: '',
        confirmPassword: ''
    })

    const [showPopup, setShowPopup] = useState(false)

    const [error, setError] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    // Handle Input Change
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

        setError('')

    }

    // Final Submit
  const handleSubmit = async (e) => {

    e.preventDefault()

    setIsLoading(true)

    try {

        const res = await axios.post(

            'http://localhost:5000/api/auth/forget-password',

            {
                email: formData.email,
                secretkey: formData.secretkey
            }

        )

        alert(res.data.message)

        // Popup opens ONLY if verified
        setShowPopup(true)

    }

    catch (err) {

        setError(
            err.response?.data?.message ||
            'Something went wrong'
        )

    }

    finally {

        setIsLoading(false)

    }

}

//Reset PAsswor
const handleResetPassword = async () => {

    try {

        if (
            formData.newPassword !==
            formData.confirmPassword
        ) {

            setError('Passwords do not match')
            return

        }

        const res = await axios.put(

            'http://localhost:5000/api/auth/reset-password',

            {
                email: formData.email,
                secretkey: formData.secretkey,
                newPassword: formData.newPassword
            }

        )

        alert(res.data.message)

        navigate('/login')

    }

    catch (err) {

        setError(
            err.response?.data?.message ||
            'Something went wrong'
        )

    }

}

    return (

        <div className='min-h-screen flex justify-center items-center bg-gray-200'>

            <form
                onSubmit={handleSubmit}
                className='bg-white p-8 rounded-2xl shadow-xl w-[90%] sm:w-96 flex flex-col gap-5'
            >

                <h1 className='text-3xl font-bold text-center text-blue-400'>
                    Forget Password
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
                    type='text'
                    name='secretkey'
                    placeholder='Enter Secret Key'
                    value={formData.secretkey}
                    onChange={handleChange}
                    required
                    className='border px-4 py-3 rounded-xl outline-none'
                />


                <button

                    type='submit'

                    disabled={isLoading}

                    className='bg-blue-400 text-white py-3 rounded-xl font-bold hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed'
                >

                    Reset Password

                </button>

                {

                    showPopup && (

                        <div className='fixed inset-0 flex justify-center items-center z-50 bg-black/60 backdrop-blur-sm'>

                            <div className='bg-white p-6 rounded-2xl w-[90%] max-w-md space-y-5 shadow-2xl flex flex-col'>

                                <h1 className='text-2xl font-bold text-center text-blue-400'>
                                    Reset Your Password
                                </h1>

                                <input
                                    type='password'
                                    name='newPassword'
                                    placeholder='Enter New Password'
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className='border px-4 py-3 rounded-xl outline-none'
                                />


                                <input
                                    type='password'
                                    name='confirmPassword'
                                    placeholder='Confirm New Password'
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className='border px-4 py-3 rounded-xl outline-none'
                                />


                                <div className='flex gap-3 justify-evenly' >

                                    <button
                                        type='button'
                                        onClick={() => setShowPopup(false)}
                                        className='bg-gray-300 text-black py-2 rounded-xl font-bold p-3'
                                    >
                                        Cancel
                                    </button>

<button
    type='submit'
    onClick={handleResetPassword}
    disabled={isLoading}
    className='bg-blue-400 text-white py-1 p-3 rounded-xl font-bold hover:scale-105 transition-all duration-300'
>
    {isLoading ? 'Checking...' : 'Reset Password'}
</button>
                                </div>

                            </div>

                        </div>

                    )

                }

                <p className='text-center'>

                    I Remembered My Password?

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

export default ForgetPassword