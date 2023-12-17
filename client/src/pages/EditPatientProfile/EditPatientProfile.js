import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar'; // Adjust the path as needed
import useStore from '../../store';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import { publicRequest } from '../../hooks/requestMethods';

const EditPatientProfile = () => {
    useAuthRedirect();
    const navigate = useNavigate();
    const userId = useStore((state) => state.userInf._id);
    const [userInfo, setUserInfo] = useState({}); 
    useEffect(() => {
        publicRequest().get(`patientProfile/${userId}`)
            .then((response) => {
                setUserInfo(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.data || 'An error occurred');
            });
    }, [userId]);
  
    const [profileData, setProfileData] = useState({
       
    });

    

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        publicRequest().put(`patientProfile/${userId}`, profileData)
            .then((response) => {;
                alert('Profile updated successfully');
                navigate('/patientdashboard');
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.data || 'An error occurred');
            });
         };

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Edit Patient Profile</h1>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
                    {/* Profile Edit Form Fields */}
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                        <input type="text" id="firstName" name="firstName" placeholder={userInfo?.user?.firstName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                        <input type="text" id="lastName" name="lastName" placeholder={userInfo?.user?.lastName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input type="email" id="email" name="email" placeholder={userInfo?.user?.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="dateOfBirth" className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
                        <input type="date" id="dateOfBirth" name="dateOfBirth" placeholder={userInfo?.dateOfBirth} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                        <select id="gender" name="gender" placeholder={userInfo?.gender} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="contactNumber" className="block text-gray-700 text-sm font-bold mb-2">Contact Number</label>
                        <input type="text" id="contactNumber" name="contactNumber" placeholder={userInfo?.contactNumber} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                        <textarea id="address" name="address" placeholder={userInfo?.address} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="profilePicture" className="block text-gray-700 text-sm font-bold mb-2">Profile Picture</label>
                        <input type="file" id="profilePicture" name="profilePicture" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    {/* Add other fields such as medicalHistory, etc. */}
                    
                    {/* Submit Button */}
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update Profile</button>
                </form>
            </div>
        </>
    );
};

export default EditPatientProfile;
