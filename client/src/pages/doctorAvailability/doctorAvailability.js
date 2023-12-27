import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import store from '../../store.js';
import { publicRequest } from '../../hooks/requestMethods';
import useAuthRedirect from '../../hooks/useAuthRedirect.js';
import useCheckDoctorAuthorization from '../../hooks/useCheckDoctorAuthorization.js';

const DoctorAvailabilityForm = () => {
    useAuthRedirect();
    useCheckDoctorAuthorization();
    const navigate = useNavigate();
    const userInfo = store.getState().userInf;
    const [availability, setAvailability] = useState({
        doctorId: userInfo._id, 
        weeklyAvailability: Array(7).fill({ day: '', start: '', end: '' }),
        visitDuration: '', // Added visitDuration field
        error: '' // To store error messages
    });

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const handleInputChange = (index, field, value) => {
        const newAvailability = [...availability.weeklyAvailability];
        newAvailability[index] = { ...newAvailability[index], [field]: value, day: daysOfWeek[index] };
        setAvailability({ ...availability, weeklyAvailability: newAvailability, error: '' });
    };

    const isValidTimeRange = (start, end) => {
        const [startHours, startMinutes] = start.split(':').map(Number);
        const [endHours, endMinutes] = end.split(':').map(Number);
        return (endHours > startHours) || (endHours === startHours && endMinutes > startMinutes);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate and filter availability
        const filteredAvailability = [];
        for (const day of availability.weeklyAvailability) {
            if (day.start && day.end) {
                if (!isValidTimeRange(day.start, day.end)) {
                    setAvailability(prevState => ({ ...prevState, error: 'End time must be after start time' }));
                    return;
                }
                filteredAvailability.push(day);
            }
        }

        const submissionData = {
            doctorId: availability.doctorId,
            weeklyAvailability: filteredAvailability,
            visitDuration: availability.visitDuration // Added visitDuration field
        };

        // Perform submission logic here
        console.log(submissionData);
        publicRequest().post('/doctorAvailability/create', submissionData)
            .then(res => {
                window.alert('Availability submitted successfully');
                navigate('/');
            })
            .catch(err => {
                console.log(err.response.data);
                window.alert('An error occurred');
                setAvailability(prevState => ({ ...prevState, error: err.response.data }));
            });
        // navigate('/some-route-on-success');
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-xl font-bold mb-4">Upload Availability</h1>
                {availability.error && <div className="text-red-500 mb-2">{availability.error}</div>}
                <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
                    {daysOfWeek.map((day, index) => (
                        <div key={day} className="mb-4">
                            <h2 className="font-semibold mb-2">{day}</h2>
                            <input
                                type="time"
                                className="border rounded p-2 mr-2"
                                onChange={(e) => handleInputChange(index, 'start', e.target.value)}
                            />
                            <input
                                type="time"
                                className="border rounded p-2"
                                onChange={(e) => handleInputChange(index, 'end', e.target.value)}
                            />
                        </div>
                    ))}
                    <div className="mb-4"> {/* Added input field for visitDuration */}
                        <label htmlFor="visitDuration" className="font-semibold">Visit Duration:</label>
                        <input
                            type="text"
                            id="visitDuration"
                            className="border rounded p-2 ml-2"
                            value={availability.visitDuration}
                            onChange={(e) => setAvailability({ ...availability, visitDuration: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default DoctorAvailabilityForm;
