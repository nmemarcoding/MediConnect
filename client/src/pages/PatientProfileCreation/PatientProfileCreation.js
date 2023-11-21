import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientProfileCreation = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    dateOfBirth: '',
    gender: 'other',
    contactNumber: '',
    address: '',
    medicalHistory: '',
    currentMedications: '',
    allergies: '',
    emergencyContact: { name: '', relation: '', contactNumber: '' },
    profilePicture: ''
  });

  const handleChange = (e) => {
    if (e.target.name === 'emergencyContact') {
      setProfileData({
        ...profileData,
        emergencyContact: { ...profileData.emergencyContact, [e.target.dataset.field]: e.target.value }
      });
    } else {
      setProfileData({ ...profileData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(profileData);
    navigate('/dashboard'); // Navigate to the dashboard or relevant page after profile creation
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex justify-center items-center h-16 bg-green-400 text-white">
        <h1 className="text-2xl md:text-4xl font-bold">Create Your Patient Profile</h1>
      </div>
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            {/* Date of Birth Field */}
            <div className="mb-4">
              <label htmlFor="dateOfBirth" className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
              <input type="date" id="dateOfBirth" name="dateOfBirth" value={profileData.dateOfBirth} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>

            {/* Gender Field */}
            <div className="mb-4">
              <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
              <select id="gender" name="gender" value={profileData.gender} onChange={handleChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Contact Number Field */}
            <div className="mb-4">
              <label htmlFor="contactNumber" className="block text-gray-700 text-sm font-bold mb-2">Contact Number</label>
              <input type="tel" id="contactNumber" name="contactNumber" placeholder="123-456-7890" value={profileData.contactNumber} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>

            {/* Address Field */}
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
              <input type="text" id="address" name="address" placeholder="123 Main St" value={profileData.address} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>

            {/* Medical History Field */}
            <div className="mb-4">
              <label htmlFor="medicalHistory" className="block text-gray-700 text-sm font-bold mb-2">Medical History</label>
              <textarea id="medicalHistory" name="medicalHistory" placeholder="Describe your medical history" value={profileData.medicalHistory} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            {/* Current Medications Field */}
            <div className="mb-4">
              <label htmlFor="currentMedications" className="block text-gray-700 text-sm font-bold mb-2">Current Medications</label>
              <textarea id="currentMedications" name="currentMedications" placeholder="List your current medications" value={profileData.currentMedications} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            {/* Allergies Field */}
            <div className="mb-4">
              <label htmlFor="allergies" className="block text-gray-700 text-sm font-bold mb-2">Allergies</label>
              <textarea id="allergies" name="allergies" placeholder="List any allergies" value={profileData.allergies} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            {/* Emergency Contact Field */}
            <div className="mb-4">
              <label htmlFor="emergencyContact" className="block text-gray-700 text-sm font-bold mb-2">Emergency Contact</label>
              <input type="text" placeholder="Contact Name" data-field="name" value={profileData.emergencyContact.name} onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'emergencyContact' } })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <input type="text" placeholder="Relation" data-field="relation" value={profileData.emergencyContact.relation} onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'emergencyContact' } })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <input type="tel" placeholder="Contact Number" data-field="contactNumber" value={profileData.emergencyContact.contactNumber} onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'emergencyContact' } })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            {/* Profile Picture Field */}
            <div className="mb-4">
              <label htmlFor="profilePicture" className="block text-gray-700 text-sm font-bold mb-2">Profile Picture</label>
              <input type="text" id="profilePicture" name="profilePicture" placeholder="Profile Picture URL" value={profileData.profilePicture} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Create Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientProfileCreation;
