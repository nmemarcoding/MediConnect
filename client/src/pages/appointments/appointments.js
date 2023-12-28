import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/navbar'; // Adjust the path as needed
import { publicRequest } from '../../hooks/requestMethods';
import store from '../../store.js';

const Appointments = () => {
    const userInfo = store.getState().userInf;
    const [appointmentData, setAppointmentData] = useState({
        doctor: '',
        date: '',
        time: '',
        notes: '',
        day:''
    });
    const [bookedAppointments, setBookedAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [availableDays, setAvailableDays] = useState([]);
    
   
    function getAvailableDates(dayNames) {
        const dayMap = { 'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6 };
        const daysAvailable = dayNames?.map(dayName => dayMap[dayName]);
    
        const result = [];
        const today = new Date();
        const thirtyDaysLater = new Date(today);
        thirtyDaysLater.setDate(today.getDate() + 30);
    
        for (let date = today; date <= thirtyDaysLater; date.setDate(date.getDate() + 1)) {
            const dayOfWeek = date.getDay();
            if (daysAvailable.includes(dayOfWeek)) {
                result.push(new Date(date).toLocaleDateString());
            }
        }
        return result;
    }
    
    
    
    
    useEffect(() => {
        publicRequest().get('/doctorAvailability/getall')
            .then(response => {
      
                setDoctors(response.data.map(doc => ({
                    id: `${doc.doctorId.userId.firstName} ${doc.doctorId.userId.lastName}`,
                    availability: doc.weeklyAvailability,
                    visitDuration: doc.visitDuration,
                    doctorId: doc.doctorId._id
                })));
            })
            .catch(error => {
                window.alert(error.response.data);
            });
    }, []);

    useEffect(() => {
        if (!userInfo.patientId) return; 
        publicRequest().get(`/appointment/getpatientappointment/${userInfo.patientId}`)
            .then(response => {
                console.log(response.data);
                setBookedAppointments(response.data.map(appointment => ({
                    doctor: `${appointment.doctor.userId.firstName} ${appointment.doctor.userId.lastName}`,
                    date: appointment.appointmentDay,
                    time: appointment.appointmentTime,
                    notes: appointment.notes,
                    day:appointment.appointmentDate
                })).reverse());
            })
            .catch(error => {
                window.alert(error.response.data);
            });
    }, []);


    const createTimeSlots = (start, end,visitDuration) => {
        const slots = [];
        let current = new Date(`2021-01-01T${start}`);
        const endTime = new Date(`2021-01-01T${end}`);

        while (current < endTime) {
            slots.push(current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            current.setMinutes(current.getMinutes() + visitDuration); // Adjust the duration per slot here
        }

        return slots;
    };

    const handleDoctorChange = (e) => {
        const selectedDoctorId = e.target.value;
        const selectedDoctor = doctors.find(doc => doc.id === selectedDoctorId);
        if (selectedDoctor) {
            const dates = selectedDoctor.availability.map(a => a.day);
            setAvailableDates([...new Set(dates)]); // Remove duplicates
            setAvailableTimes([]);
            setAppointmentData({ ...appointmentData, doctor: selectedDoctorId, date: '', time: '', doctorId: selectedDoctor.doctorId });
        } else {
            setAvailableDates([]);
            setAvailableTimes([]);
            setAppointmentData({ ...appointmentData, doctor: '', date: '', time: '' });
        }
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        const selectedDoctor = doctors.find(doc => doc.id === appointmentData.doctor);
        const timesForDate = selectedDoctor.availability
                            .filter(a => a.day === selectedDate)
                            .flatMap(a => createTimeSlots(a.start, a.end,selectedDoctor.visitDuration));
        setAvailableTimes(timesForDate);
        setAppointmentData({ ...appointmentData, date: selectedDate, time: '' });
        const availableDays = getAvailableDates([selectedDate]);
        setAvailableDays(availableDays);
       
    };

    const handleChange = (e) => {
        setAppointmentData({ ...appointmentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const request = {
            appointmentDate: appointmentData.day,
            appointmentTime: appointmentData.time,
            doctor: appointmentData.doctorId,
            patient: userInfo.patientId,
            notes: appointmentData.notes,
            appointmentDay: appointmentData.date

        };
        
        
        publicRequest().post('/appointment/create', request)
            .then(res => {
                window.alert('Appointment booked successfully');
                window.location.reload();
                // Update the bookedAppointments state or re-fetch appointments
            }
            )
            .catch(err => {
             
                window.alert(err.response.data);
            });
            

          };
   
          

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-xl md:text-2xl font-bold text-center mb-6">Book an Appointment</h1>
                
                <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow mb-6">
                    {/* Doctor Selection */}
                    <div className="mb-4">
                        <label htmlFor="doctor" className="block text-gray-700 text-sm font-bold mb-2">Select Doctor</label>
                        <select id="doctor" name="doctor" value={appointmentData.doctor} onChange={handleDoctorChange} className="block w-full border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-gray-500">
                            <option value="">Select a Doctor</option>
                            {doctors.map(doc => (
                                <option key={doc.id} value={doc.id}>Doctor {doc.id}</option>
                            ))}
                        </select>
                    </div>

                    {/* Date Selection */}
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Date</label>
                        <select id="date" name="date" value={appointmentData.date} onChange={handleDateChange} className="block w-full border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-gray-500">
                            <option value="">Select a Date</option>
                            {availableDates.map(date => (
                                <option key={date} value={date}>{date}</option>
                            ))}
                        </select>
                    </div>
                    {/* day selection  */}
                    <div className='mb-4'>
                        <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Date</label>
                        <select id="date" name="date" value={appointmentData.date} onChange={(e)=>setAppointmentData({...appointmentData,day:e.target.value})} className="block w-full border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-gray-500">
                            <option value="">Select a day</option>
                            {availableDays.map(date => (
                                <option key={date} value={date}>{date}</option>
                            ))}
                        </select>
                    </div>
                    {/* Time Selection */}
                    <div className="mb-4">
                        <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">Time</label>
                        <select id="time" name="time" value={appointmentData.time} onChange={handleChange} className="block w-full border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-gray-500">
                            <option value="">Select a Time</option>
                            {availableTimes.map((time, index) => (
                                <option key={index} value={time}>{time}</option>
                            ))}
                        </select>
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
                                <p><strong>Day:</strong> {appointment.day}</p>
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