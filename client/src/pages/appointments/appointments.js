import React, { useState, useEffect } from 'react';
import { publicRequest } from '../../hooks/requestMethods';
import Navbar from '../../components/navbar/navbar';

const Appointments = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState("");
    const [selectedDateTime, setSelectedDateTime] = useState({ day: "", date: "", time: "" });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [appointmentResult, setAppointmentResult] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await publicRequest().get('/doctorAvailability/getall');
                setDoctors(response.data);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    const handleDoctorChange = (e) => {
        setSelectedDoctorId(e.target.value);
        setSelectedDateTime({ day: "", date: "", time: "" });
    };

    const handleDateTimeChange = (field, value) => {
        setSelectedDateTime(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleBookAppointment = () => {
        // Perform the booking logic here
        // You can use the selectedDoctorId, selectedDateTime, and any other necessary data
        // Update the appointmentResult state with the result of the booking
        window.alert(appointmentResult);
       
    };

    const selectedDoctor = doctors.find(doctor => doctor._id === selectedDoctorId);
    const availableDays = selectedDoctor ? selectedDoctor.weeklyAvailability.map(availability => availability.day) : [];
    const selectedDayInfo = selectedDoctor ? selectedDoctor.weeklyAvailability.find(day => day.day === selectedDateTime.day) : null;
    const availableDates = selectedDayInfo ? selectedDayInfo.timeSlots.map(slot => slot.day) : [];
    const selectedDateInfo = selectedDayInfo ? selectedDayInfo.timeSlots.filter(slot => slot.day === selectedDateTime.date) : [];

    if (isLoading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-red-500 text-center py-4">Error: {error}</div>;

    return (
        <>
            <Navbar />
  
        <div className="container mx-auto p-4 max-w-md pt-20">
            
            <h2 className="text-3xl font-bold text-center mb-6">Book an Appointment</h2>

            <div className="mb-4">
                <label htmlFor="doctor-select" className="block text-sm font-medium text-gray-700">Select Doctor</label>
                <select id="doctor-select" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" onChange={handleDoctorChange} value={selectedDoctorId}>
                    <option value="">Select a Doctor</option>
                    {doctors.map((doctor) => (
                        <option key={doctor._id} value={doctor._id}>
                            Dr. {doctor.doctorId.userId.firstName} {doctor.doctorId.userId.lastName}
                        </option>
                    ))}
                </select>
            </div>

            {selectedDoctor && (
                <div className="mb-4">
                    <label htmlFor="day-select" className="block text-sm font-medium text-gray-700">Date</label>
                    <select id="day-select" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" onChange={(e) => handleDateTimeChange("day", e.target.value)} value={selectedDateTime.day}>
                        <option value="">Select a day</option>
                        {availableDays.map((day, index) => (
                            <option key={index} value={day}>{day}</option>
                        ))}
                    </select>
                </div>
            )}

            {selectedDayInfo && (
                <div className="mb-4">
                    <label htmlFor="date-select" className="block text-sm font-medium text-gray-700">Date</label>
                    <select id="date-select" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" onChange={(e) => handleDateTimeChange("date", e.target.value)} value={selectedDateTime.date}>
                        <option value="">Select a Date</option>
                        {[...new Set(availableDates)].map((date, index) => (
                            <option key={index} value={date}>{date}</option>
                        ))}
                    </select>
                </div>
            )}

            {selectedDateInfo.length > 0 && (
                <div className="mb-4">
                    <label htmlFor="time-select" className="block text-sm font-medium text-gray-700">Time</label>
                    <select id="time-select" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" onChange={(e) => handleDateTimeChange("time", e.target.value)} value={selectedDateTime.time}>
                        <option value="">Select a Time</option>
                        {selectedDateInfo.map((slot, slotIndex) => (
                            <option key={slotIndex} value={slot.time}>{slot.time}</option>
                        ))}
                    </select>
                </div>
            )}

            <div className="mb-4">
                <label htmlFor="additional-notes" className="block text-sm font-medium text-gray-700">Additional Notes (Optional)</label>
                <textarea id="additional-notes" rows="4" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleBookAppointment}>
                Book Appointment
            </button>

            {appointmentResult && (
                <div className="text-green-500 text-center py-4">{appointmentResult}</div>
            )}

            {/* Display selected information */}
            {selectedDoctor && selectedDateTime.day && selectedDateTime.date && selectedDateTime.time && (
                <div className="mt-4">
                    <h3 className="text-lg font-bold">Selected Information:</h3>
                    <p>Doctor: Dr. {selectedDoctor.doctorId.userId.firstName} {selectedDoctor.doctorId.userId.lastName}</p>
                    <p>Day: {selectedDateTime.day}</p>
                    <p>Date: {selectedDateTime.date}</p>
                    <p>Time: {selectedDateTime.time}</p>
                </div>
            )}
        </div>
        </>
    );
};

export default Appointments;