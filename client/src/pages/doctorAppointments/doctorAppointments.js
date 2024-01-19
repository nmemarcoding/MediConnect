import React, {useEffect, useState} from 'react';
import Navbar from '../../components/navbar/navbar';
import {publicRequest} from '../../hooks/requestMethods';
import store from '../../store.js';

function DoctorAppointments() {
    const userInfo = store.getState().userInf;
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        publicRequest()
            .get('/appointment/getdoctorappointment/' + userInfo.patientId)
            .then((res) => {
                setAppointments(res.data);
         })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Doctor Appointments</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {appointments.map((appointment) => (
                        <div
                            key={appointment._id}
                            className="bg-white rounded shadow p-4 flex flex-col"
                        >
                            <h2 className="text-lg font-bold mb-2">{appointment.patient.user.firstName} {appointment.patient.user.lastName}</h2>
                            <p className="text-gray-500 mb-2">
                                Date: {appointment.appointmentDate} | Time: {appointment.appointmentTime}
                            </p>
                            <p className="text-gray-500">Status: {appointment.appointmentStatus}</p>
                            <p className="text-gray-500">Consultation Type: {appointment.consultationType}</p>
                            <p className="text-gray-500">Notes: {appointment.notes}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default DoctorAppointments;
