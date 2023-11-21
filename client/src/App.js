import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import SignupPage from './pages/signupPage/signupPage';
import LoginPage from './pages/loginPage/loginPage';
import HomePage from './pages/homePage/homePage';
import PatientProfileCreation from './pages/PatientProfileCreation/PatientProfileCreation';

function App() {


  

  return (
    <Router>
          <div className="app ">
            <Routes>
              
          
              
              <Route path="/signup" element={<SignupPage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/patientprofilecreation" element={<PatientProfileCreation/>}/>
              <Route path="/" element={<HomePage/>}/>
              </Routes>
          </div>
        </Router>
  );
}

export default App;