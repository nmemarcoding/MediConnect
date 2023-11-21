import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { publicRequest } from '../../hooks/requestMethods';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store';

const LoginPage = () => {
    const addUserInfo = useStore((state) => state.addUserInfo);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        publicRequest().post('auth/login', formData)
            .then((response) => {
                alert('Logged in successfully');
                addUserInfo(response.data);
                if (response.data.isAdmin) {
                    navigate('/admindashboard');
                } else {
                    navigate('/');
                }
            })
            .catch((error) => {
                alert(error.response.data || 'An error occurred');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex justify-center items-center h-16 bg-green-400 text-white">
                <h1 className="text-2xl md:text-4xl font-bold">MediConnect</h1>
            </div>
            <div className="grid place-items-center mx-2 my-20 sm:my-auto">
                <div className="w-11/12 p-12 sm:w-8/12 md:w-1/2 lg:w-5/12 bg-white rounded-lg shadow-lg">
                    <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">Log In</h2>

                    <form className="mt-6" onSubmit={handleSubmit}>
                        <div className="flex flex-col items-center">
                            <div className="w-full">
                                <label htmlFor="email" className="block text-xs font-semibold text-gray-600 uppercase">E-mail</label>
                                <input id="email" type="email" name="email" placeholder="Email" autoComplete="email" value={formData.email} onChange={handleInputChange} className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:outline-none focus:border-green-400" required />

                                <label htmlFor="password" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password </label>
                                <input id="password" type="password" name="password" placeholder="Password" autoComplete="new-password" value={formData.password} onChange={handleInputChange} className="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:outline-none focus:border-green-400" required />

                                <button type="submit" disabled={isLoading} className={`w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-green-400 shadow-lg focus:outline-none hover:bg-green-500 hover:shadow-none ${isLoading ? 'cursor-not-allowed' : ''}`}>
                                    {isLoading ? 'Loading...' : 'Log In'}
                                </button>

                                <p className="flex justify-between inline-block mt-4 text-xs text-gray-500 cursor-pointer hover:text-black">Don't have an account? <Link to="/signup" className="text-green-500 hover:text-green-600">Sign up</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
