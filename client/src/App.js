import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import SignupPage from './pages/signupPage/signupPage';
import LoginPage from './pages/loginPage/loginPage';
import HomePage from './pages/homePage/homePage';
import PatientProfileCreation from './pages/PatientProfileCreation/PatientProfileCreation';
import DoctorProfileCreation from './pages/DoctorProfileCreation/DoctorProfileCreation';
import PatientDashboard from './pages/PatientDashboard/PatientDashboard';
import EditPatientProfile from './pages/EditPatientProfile/EditPatientProfile';
import Appointments from './pages/appointments/appointments';
import DoctorAvailability from './pages/doctorAvailability/doctorAvailability';
import DoctorAppointments from './pages/doctorAppointments/doctorAppointments'

function App() {


  

  return (
    <Router>
          <div className="app ">
            <Routes>
              <Route path="/signup" element={<SignupPage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/patientprofilecreation" element={<PatientProfileCreation/>}/>
              <Route path="/doctorprofilecreation" element={<DoctorProfileCreation/>}/>
              <Route path="/patientdashboard" element={<PatientDashboard/>}/>
              <Route path="/editpatientprofile" element={<EditPatientProfile/>}/>
              <Route path="/appointments" element={<Appointments/>}/>
              <Route path="/doctoravailability" element={<DoctorAvailability/>}/>
              <Route path="/doctorappointments" element={<DoctorAppointments/>}/>
              <Route path="/" element={<HomePage/>}/>
              </Routes>
          </div>
        </Router>
  );
}

export default App;