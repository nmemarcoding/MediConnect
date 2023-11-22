import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { publicRequest } from '../../hooks/requestMethods';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    repeatEmail: '', // Added repeatEmail field
    password: '',
    repeatPassword: '',
    userType: '' // Added userType field
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.repeatPassword) {
      alert('Passwords do not match');
      return;
    }
    if (formData.email !== formData.repeatEmail) { // Check if emails match
      alert('Emails do not match');
      return;
    }
    // Check if all fields have a value
    const isFormValid = Object.values(formData).every((value) => value !== '');
    if (!isFormValid) {
      alert('Please fill out all fields');
      return;
    }

    // Check if password meets requirements
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      alert('Password must include at least one uppercase letter, one special character, one number, and be at least 8 characters long');
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
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex justify-center items-center h-16 bg-green-400 text-white">
        <h1 className="text-2xl md:text-4xl font-bold">MediConnect</h1>
      </div>
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        {/* Card for Sign Up form */}
        <div className="w-11/12 p-12 sm:w-8/12 md:w-1/2 lg:w-5/12 bg-white rounded-lg shadow-lg">
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">Sign Up</h2>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <div className="w-full">
                {/* First Name */}
                <label htmlFor="firstName" className="block text-xs font-semibold text-gray-600 uppercase">First Name</label>
                <input id="firstName" type="text" name="firstName" placeholder="Nikolai" autoComplete="firstName" value={formData.firstName} onChange={handleChange} className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:outline-none focus:border-green-400" required />

                {/* Last Name */}
                <label htmlFor="lastName" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Last Name</label>
                <input id="lastName" type="text" name="lastName" placeholder="Borisov" autoComplete="lastName" value={formData.lastName} onChange={handleChange} className="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:outline-none focus:border-green-400" required />

                {/* Email */}
                <label htmlFor="email" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">E-mail</label>
                <input id="email" type="email" name="email" placeholder="bonik@example.com" autoComplete="email" value={formData.email} onChange={handleChange} className="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:outline-none focus:border-green-400" required />

                {/* Repeat Email */}
                <label htmlFor="repeatEmail" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Repeat Email</label>
                <input id="repeatEmail" type="email" name="repeatEmail" placeholder="bonik@example.com" autoComplete="email" value={formData.repeatEmail} onChange={handleChange} className="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:outline-none focus:border-green-400" required />

                {/* Password */}
                <label htmlFor="password" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password </label>
                <input id="password" type="password" name="password" placeholder="********" autoComplete="new-password" value={formData.password} onChange={handleChange} className="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:outline-none focus:border-green-400" required />

                {/* Repeat Password */}
                <label htmlFor="repeatPassword" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Repeat password</label>
                <input id="repeatPassword" type="password" name="repeatPassword" placeholder="********" autoComplete="new-password" value={formData.repeatPassword} onChange={handleChange} className="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:outline-none focus:border-green-400" required />

                {/* User Type */}
                <label htmlFor="userType" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">User Type</label>
                <select id="userType" name="userType" value={formData.userType} onChange={handleChange} className="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:outline-none focus:border-green-400" required>
                  <option value="">Select User Type</option>
                  <option value="doctor">Doctor</option>
                  <option value="patient">Patient</option>
                </select>

                {/* Terms and Conditions */}
                <div className="flex items-center mt-4">
                  <input type="checkbox" name="terms" id="terms" className="mr-2" />
                  <label htmlFor="terms" className="text-xs text-gray-600">By signing up I agree with terms and conditions</label>
                </div>

                {/* Sign Up Button */}
                <button type="submit" className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-green-400 shadow-lg focus:outline-none hover:bg-green-500 hover:shadow-none">
                  Sign up
                </button>

                {/* Log In Link */}
                <p className="flex justify-between inline-block mt-4 text-xs text-gray-500 cursor-pointer hover:text-black">Already registered? <a href="/login" className="text-green-500 hover:text-green-600">Log in</a></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
