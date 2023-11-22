import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { publicRequest } from '../../hooks/requestMethods';
import useStore from '../../store';


const DoctorProfileCreation = () => {
    const navigate = useNavigate();
    const userInfo = useStore((state) => state.userInf);
    const [profileData, setProfileData] = useState({
        userId: userInfo._id, // Replace with actual user ID
        specializations: [],
        qualifications: [{ degree: '', institution: '', year: null }],
        experience: 0,
        bio: '',
        languages: [],
        consultationFees: 0,
        consultationTypes: [],
        profilePicture: ''
    });
    const [selectedSpecialization, setSelectedSpecialization] = useState('');
    const consultationTypes = [
        'video', 'audio', 'chat'
    ];
    const specializations = [
        'Cardiology',
        'Dermatology',
        'Endocrinology',
        'Gastroenterology',
        'Neurology',
        'Oncology',
        'Orthopedics',
        'Pediatrics',
        'Psychiatry',
        'Urology'
    ];

    const handleArrayChange = (e, field) => {
        setProfileData({ ...profileData, [field]: e.target.value.split(',').map(item => item.trim()) });
    };

    const handleQualificationsChange = (index, e) => {
        const newQualifications = profileData.qualifications.map((qual, idx) => {
            if (idx === index) {
                return { ...qual, [e.target.name]: e.target.value };
            }
            return qual;
        });

        setProfileData({ ...profileData, qualifications: newQualifications });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        publicRequest().post('doctorprofile/create', profileData)
            .then((response) => {
                console.log(response);
                alert('Doctor profile created successfully');
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
                <h1 className="text-2xl md:text-4xl font-bold">Create Your Doctor Profile</h1>
            </div>
            <div className="grid place-items-center mx-2 my-20 sm:my-auto">
                <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
                    <form onSubmit={handleSubmit}>
                        {/* Specializations Field */}
                        <div className="mb-4">
                            <label htmlFor="specializations" className="block text-gray-700 text-sm font-bold mb-2">Specializations</label>
                            <select
                                id="specializations"
                                name="specializations"
                                onChange={(e) => setSelectedSpecialization(e.target.value)}
                                value={selectedSpecialization}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            >
                                <option value="">Select a specialization</option>
                                {specializations.map((specialization, index) => (
                                    <option key={index} value={specialization}>
                                        {specialization}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Qualifications Field */}
                        {profileData.qualifications.map((qualification, index) => (
                            <div key={index} className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Qualification {index + 1}</label>
                                <input
                                    type="text"
                                    name="degree"
                                    placeholder="Degree"
                                    value={qualification.degree}
                                    onChange={(e) => handleQualificationsChange(index, e)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                                <input
                                    type="text"
                                    name="institution"
                                    placeholder="Institution"
                                    value={qualification.institution}
                                    onChange={(e) => handleQualificationsChange(index, e)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                                <input
                                    type="number"
                                    name="year"
                                    placeholder="Year"
                                    value={qualification.year || ''}
                                    onChange={(e) => handleQualificationsChange(index, e)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                        ))}

                        {/* Experience Field */}
                        <div className="mb-4">
                            <label htmlFor="experience" className="block text-gray-700 text-sm font-bold mb-2">Years of Experience</label>
                            <input
                                type="number"
                                id="experience"
                                name="experience"
                                placeholder="Experience"
                                value={profileData.experience}
                                onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        {/* Bio Field */}
                        <div className="mb-4">
                            <label htmlFor="bio" className="block text-gray-700 text-sm font-bold mb-2">Bio</label>
                            <textarea
                                id="bio"
                                name="bio"
                                placeholder="Bio"
                                value={profileData.bio}
                                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                maxLength="1000"
                                required
                            ></textarea>
                        </div>

                        {/* Languages Field */}
                        <div className="mb-4">
                            <label htmlFor="languages" className="block text-gray-700 text-sm font-bold mb-2">Languages Spoken</label>
                            <input
                                type="text"
                                id="languages"
                                name="languages"
                                placeholder="Languages"
                                onChange={(e) => handleArrayChange(e, 'languages')}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        {/* Consultation Fees Field */}
                        <div className="mb-4">
                            <label htmlFor="consultationFees" className="block text-gray-700 text-sm font-bold mb-2">Consultation Fees</label>
                            <input
                                type="number"
                                id="consultationFees"
                                name="consultationFees"
                                placeholder="Consultation Fees"
                                value={profileData.consultationFees}
                                onChange={(e) => setProfileData({ ...profileData, consultationFees: e.target.value })}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        {/* Consultation Types Field */}
                        <div className="mb-4">
                            <label htmlFor="consultationTypes" className="block text-gray-700 text-sm font-bold mb-2">Consultation Types</label>
                            <select
                                id="consultationTypes"
                                name="consultationTypes"
                                onChange={(e) => setProfileData({ ...profileData, consultationTypes: [e.target.value] })}
                                value={profileData.consultationTypes}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            >
                                <option value="">Select a consultation type</option>
                                {consultationTypes.map((type, index) => (
                                    <option key={index} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Profile Picture Field */}
                        <div className="mb-4">
                            <label htmlFor="profilePicture" className="block text-gray-700 text-sm font-bold mb-2">Profile Picture URL</label>
                            <input
                                type="text"
                                id="profilePicture"
                                name="profilePicture"
                                placeholder="Profile Picture URL"
                                value={profileData.profilePicture}
                                onChange={(e) => setProfileData({ ...profileData, profilePicture: e.target.value })}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Create Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
    };

    export default DoctorProfileCreation;
