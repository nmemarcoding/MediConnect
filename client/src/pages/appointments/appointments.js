import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/navbar'; // Adjust the path as needed

const Appointments = () => {
    const [appointmentData, setAppointmentData] = useState({
        doctor: '',
        date: '',
        time: '',
        notes: ''
    });
    const [bookedAppointments, setBookedAppointments] = useState([{ doctor: 'Doctor 1', date: '2021-01-01', time: '10:00', notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod.'}, { doctor: 'Doctor 2', date: '2021-01-02', time: '11:00', notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod.'}, { doctor: 'Doctor 3', date: '2021-01-03', time: '12:00', notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod.'}]);

    useEffect(() => {
        // Fetch booked appointments from the backend
        // Example: fetchBookedAppointments().then(data => setBookedAppointments(data));
        // Replace with your actual API call
    }, []);

    const handleChange = (e) => {
        setAppointmentData({ ...appointmentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle the appointment booking logic here
        console.log(appointmentData);
        // After booking, update the bookedAppointments state or re-fetch appointments
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-xl md:text-2xl font-bold text-center mb-6">Book an Appointment</h1>
                
                {/* Booking Form */}
                <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow mb-6">
                    {/* Doctor Selection */}
                    <div className="mb-4">
                        <label htmlFor="doctor" className="block text-gray-700 text-sm font-bold mb-2">Select Doctor</label>
                        <select id="doctor" name="doctor" value={appointmentData.doctor} onChange={handleChange} className="block w-full border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-gray-500">
                            <option value="">Select a Doctor</option>
                            <option value="doctor1">Doctor 1</option>
                            <option value="doctor2">Doctor 2</option>
                        </select>
                    </div>

                    {/* Date Selection */}
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Date</label>
                        <input type="date" id="date" name="date" value={appointmentData.date} onChange={handleChange} className="block w-full border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-gray-500" />
                    </div>

                    {/* Time Selection */}
                    <div className="mb-4">
                        <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">Time</label>
                        <input type="time" id="time" name="time" value={appointmentData.time} onChange={handleChange} className="block w-full border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-gray-500" />
                    </div>

                    {/* Additional Notes */}
                    <div className="mb-6">
                        <label htmlFor="notes" className="block text-gray-700 text-sm font-bold mb-2">Additional Notes (Optional)</label>
                        <textarea id="notes" name="notes" value={appointmentData.notes} onChange={handleChange} className="block w-full border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-gray-500" rows="3"></textarea>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Book Appointment</button>
                </form>

                {/* Booked Appointments */}
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Your Booked Appointments</h2>
                    {bookedAppointments.length === 0 ? (
                        <p>No appointments booked yet.</p>
                    ) : (
                        bookedAppointments.map((appointment, index) => (
                            <div key={index} className="mb-4 p-4 border border-gray-200 rounded">
                                <p><strong>Doctor:</strong> {appointment.doctor}</p>
                                <p><strong>Date:</strong> {appointment.date}</p>
                                <p><strong>Time:</strong> {appointment.time}</p>
                                {appointment.notes && <p><strong>Notes:</strong> {appointment.notes}</p>}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Appointments;
