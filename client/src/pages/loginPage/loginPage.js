import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { publicRequest } from '../../hooks/requestMethods';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store';

export default function LoginPage() {
  const addUserInfo = useStore((state) => state.addUserInfo);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    publicRequest().post('auth/login', formData)
      .then((response) => {
        alert('Logged in successfully');
        addUserInfo(response.data);
        if(response.data.isAdmin === true){
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-0 pt-12 pb-12">
      <h2 className="text-3xl sm:text-4xl font-semibold mb-2 tracking-wide text-blue-600 uppercase">Medi Connect</h2>
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Log In</h1>
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="text-gray-700 font-bold mb-2 block">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="appearance-none border shadow-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue transition duration-150"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="text-gray-700 font-bold mb-2 block">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="appearance-none border shadow-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue transition duration-150"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center justify-center mt-6 sm:mt-8 mb-4 sm:mb-8">
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ${isLoading ? 'cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
               
              </>
            ) : (
              'Log In'
            )}
          </button>
        </div>

        <div className="text-gray-700 font-bold mb-2 block">
          Don't have an account? <Link to="/signup" className="text-blue-600 hover:text-blue-800">Sign up</Link>
        </div>
      </form>
    </div>
  )
}
