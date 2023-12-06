import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  
import store from '../store.js';

function useAuthRedirect() {
    const navigate = useNavigate();
    
    useEffect(() => {
        const userInfo = store.getState().userInf;

        if (Object.keys(userInfo).length === 0) {
            navigate('/login');
        } else if (!userInfo.profileCreated && userInfo.userType === 'patient') {
            navigate('/patientprofilecreation');
        } else if (!userInfo.profileCreated && userInfo.userType === 'doctor') {
            navigate('/doctorprofilecreation');
        }
    }, [navigate]); 
}
//  function if user is not patient dont let him come to this page



export default useAuthRedirect;
