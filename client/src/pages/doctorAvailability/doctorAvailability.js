import React from 'react'
import Navbar from '../../components/navbar/navbar';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import useCheckDoctorAuthorization from '../../hooks/useCheckDoctorAuthorization';


const DoctorAvailability = () => {
    useAuthRedirect()
    useCheckDoctorAuthorization()
    return (
        <div>
            doctor availability
        </div>
    )
}

export default DoctorAvailability