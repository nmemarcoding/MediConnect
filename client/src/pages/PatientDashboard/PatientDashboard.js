import React from 'react';
import Navbar from '../../components/navbar/navbar'; // Adjust the path as needed
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
    // Placeholder for fetching patient-specific data

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Patient Dashboard</h1>
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Upcoming Appointments */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Upcoming Appointments</h2>
                        {/* Loop through appointments and display them */}
                    </div>

                    {/* Medical History */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Medical History</h2>
                        {/* Display medical history */}
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h2>
                        <ul className="list-disc pl-5">
                            <li className="mb-2"><Link to="/book-appointment" className="text-blue-600 hover:text-blue-800">Book an Appointment</Link></li>
                            <li className="mb-2"><Link to="/consultations" className="text-blue-600 hover:text-blue-800">View Consultations</Link></li>
                            {/* Other actions */}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PatientDashboard;
