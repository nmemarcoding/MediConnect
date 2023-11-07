import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import SignupPage from './pages/signupPage/signupPage';
import LoginPage from './pages/loginPage/loginPage';
import HomePage from './pages/homePage/homePage';

function App() {


  

  return (
    <Router>
          <div className="app ">
            <Routes>
              
          
              
              <Route path="/signup" element={<SignupPage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/" element={<HomePage/>}/>
              </Routes>
          </div>
        </Router>
  );
}

export default App;