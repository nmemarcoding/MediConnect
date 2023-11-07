import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { publicRequest } from '../../hooks/requestMethods';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Check if all fields have a value
    const isFormValid = Object.values(formData).every((value) => value !== '');
    if (!isFormValid) {
      alert('Please fill out all fields');
      return;
    }
    publicRequest().post('auth/register', formData)
      .then((response) => {
        console.log(response);
        alert('Account created successfully');
        
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data || 'An error occurred');
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-0 pt-12 pb-12">
      <h2 className="text-3xl sm:text-4xl font-semibold mb-2 tracking-wide text-blue-600 uppercase">Medi Connect</h2>
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Sign Up</h1>
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        
        <div className="mb-4">
          <label htmlFor="firstName" className="text-gray-700 font-bold mb-2 block">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="appearance-none border shadow-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue transition duration-150"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="lastName" className="text-gray-700 font-bold mb-2 block">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="appearance-none border shadow-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue transition duration-150"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>

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
          <label htmlFor="phoneNumber" className="text-gray-700 font-bold mb-2 block">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            className="appearance-none border shadow-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue transition duration-150"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
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
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
            title="Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="text-gray-700 font-bold mb-2 block">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="appearance-none border shadow-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue transition duration-150"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center justify-center mt-6 sm:mt-8 mb-4 sm:mb-8">
          <button
            type="submit"
            
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150"
          >
            Sign Up
          </button>
        </div>

        <div className="text-gray-700 font-bold mb-2 block">
          Already have an account? <Link to="/login" className="text-blue-600 hover:text-blue-800">Log in</Link>
        </div>

      </form>
    </div>
  )
}
