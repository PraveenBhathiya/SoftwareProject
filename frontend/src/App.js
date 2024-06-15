import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './Components/Home.jsx';
import './index.css';

import StudentDashboard from './Pages/Student/Dashboard.jsx';
import TeacherDashBoard from './Pages/Teacher/Dashboard.jsx';
import AdminDashBoard from './Pages/Admin/Dashboard.jsx';

import GuestUser from './Pages/GuestPage.jsx';
import ChooseUser from './Components/ChooseUser.jsx';
import Adminsignin from './Components/Adminsignin.jsx';
import Studentsignin from './Components/Studentsignin.jsx';
import Teachersignin from './Components/Teachersignin.jsx';
import StudentRegister from './Pages/Student/StudentRegister.jsx';
import TeacherRegister from './Pages/Teacher/TeacherRegister.jsx';
import AdminRegister from './Components/AdminRegister.jsx';
import Aboutus from './Components/Aboutus.jsx';
import Contactus from './Components/Contactus.jsx';



function App() {
  return (
    
     
      <Router>
        <div className="web-container">
        
          <div className="web-content">
         
          <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/choose-user' element={<ChooseUser/>} />
          <Route path='/guest-user' element={<GuestUser/>} />

          <Route path='/about-us' element={<Aboutus/>} />
          <Route path='/contact-us' element={<Contactus/>} />

          <Route exact path='/admin-signIn' element={< Adminsignin/>} />
          <Route exact path='/teacher-signIn' element={< Teachersignin/>} />
          <Route exact path='/student-signIn' element={< Studentsignin/>} />

          <Route exact path='/student/student-register' element={< StudentRegister/>} />
          <Route exact path='/teacher/teacher-register' element={< TeacherRegister/>} />
          <Route exact path='/components/admin-register' element={< AdminRegister/>} />

          <Route exact path='/student/dashboard' element={< StudentDashboard />} />
          <Route exact path='/teacher/dashboard' element={< TeacherDashBoard />} /> 
          <Route exact path='/admin/dashboard' element={< AdminDashBoard />} /> 
        </Routes>
          </div>
        
        </div>   
        
        
        </Router>
     
      
    
  );
}

export default App;
