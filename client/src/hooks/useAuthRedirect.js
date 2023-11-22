import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  
import store from '../store.js';

function useAuthRedirect() {
    const navigate = useNavigate();
  useEffect(() => {
    const userInfo = store.getState().userInf;
    

    if (Object.keys(userInfo).length === 0) {
      navigate('/login');
      return;
    }else if(!userInfo.profileCreated && userInfo.userType === 'patient' ){
      navigate('/patientprofilecreation');
      return;
    }
  }, []);
}

export default useAuthRedirect;