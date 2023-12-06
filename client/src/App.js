import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import SignupPage from './pages/signupPage/signupPage';
import LoginPage from './pages/loginPage/loginPage';
import HomePage from './pages/homePage/homePage';
import PatientProfileCreation from './pages/PatientProfileCreation/PatientProfileCreation';
import DoctorProfileCreation from './pages/DoctorProfileCreation/DoctorProfileCreation';
import PatientDashboard from './pages/PatientDashboard/PatientDashboard';
import EditPatientProfile from './pages/EditPatientProfile/EditPatientProfile';

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
              <Route path="/" element={<HomePage/>}/>
              </Routes>
          </div>
        </Router>
  );
}

export default App;