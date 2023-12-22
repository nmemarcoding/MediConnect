import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  
import store from '../store.js';

const DoctorAvailability = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const userInfo = store.getState().userInf;

        // check if user is doctor or not if not then redirect to homepage
        if (userInfo.userType !== 'doctor') {
            navigate('/');
        }
        
    }, []);
}

export default DoctorAvailability