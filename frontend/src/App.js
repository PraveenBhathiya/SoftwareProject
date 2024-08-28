import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './Components/Home.jsx';
import './index.css';
import {GlobalStyle} from './Styles/styles.js';

import StudentDashboard from './Pages/Student/Dashboard.jsx';
import TeacherDashBoard from './Pages/Teacher/Dashboard.jsx';
import AdminDashBoard from './Pages/Admin/Dashboard.jsx';

import GuestUser from './Pages/GuestPage.jsx';
import ChooseUser from './Components/ChooseUser.jsx';
import SignIn from './Components/Signin.jsx';
import Adminsignin from './Components/Adminsignin.jsx';
import Studentsignin from './Components/Studentsignin.jsx';
import Teachersignin from './Components/Teachersignin.jsx';
import StudentRegister from './Pages/Student/StudentRegister.jsx';
import TeacherRegister from './Pages/Teacher/TeacherRegister.jsx';
import AdminRegister from './Components/AdminRegister.jsx';
import Aboutus from './Components/Aboutus.jsx';
import Contactus from './Components/Contactus.jsx';

import ManageUser from './Pages/Admin/ManageUser.jsx';

import TeacherMarks from './Pages/Teacher/Marks.jsx';
import Teacher_Uploads from './Pages/Teacher/Uploads.jsx';

import Teacher_View_e22_marks from './Pages/Teacher/View_e22_marks.jsx';
import Teacher_View_e21_marks from './Pages/Teacher/View_e21_marks.jsx';
import Teacher_View_e20_marks from './Pages/Teacher/View_e20_marks.jsx';
import Teacher_View_e19_marks from './Pages/Teacher/View_e19_marks.jsx';

import E22_uploads from './Pages/Teacher/E22_uploads.jsx';
import E21_uploads from './Pages/Teacher/E21_uploads.jsx';
import E20_uploads from './Pages/Teacher/E20_uploads.jsx';
import E19_uploads from './Pages/Teacher/E19_uploads.jsx';

import Student_View_marks from './Pages/Student/View_marks.jsx';
import Admin_Marks from './Pages/Admin/Marks.jsx';
import ManageUserbyAdding from './Pages/Admin/ManageUserbyAdding.jsx';

import Student_Uploads from './Pages/Student/Uploads.jsx';






function App() {
  return (
    
     
      <Router>
       <GlobalStyle />
        <div className="web-container">
        
          <div className="web-content">
         
          <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signin' element={<SignIn/>} />
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

          <Route exact path='/admin/manage-user' element={< ManageUserbyAdding />} /> 


          <Route exact path='/teacher/sidebar/marks' element={< TeacherMarks />} />
          <Route exact path='/Teacher-Uploads' element={< Teacher_Uploads />} />
          
          <Route exact path='/teacher/sidebar/marks/view_e22_marks' element={< Teacher_View_e22_marks />} />
          <Route exact path='/teacher/sidebar/marks/view_e21_marks' element={< Teacher_View_e21_marks />} />
          <Route exact path='/teacher/sidebar/marks/view_e20_marks' element={< Teacher_View_e20_marks />} />
          <Route exact path='/teacher/sidebar/marks/view_e19_marks' element={< Teacher_View_e19_marks />} />

          <Route exact path='/e22-uploads' element={< E22_uploads />} />
          <Route exact path='/e21-uploads' element={< E21_uploads/>} />
          <Route exact path='/e20-uploads' element={< E20_uploads />} />
          <Route exact path='/e19-uploads' element={< E19_uploads />} />

          <Route exact path='/student_view_Marks' element={< Student_View_marks />} />
          <Route exact path='/Admin-Marks' element={< Admin_Marks />} />

          <Route exact path='/Student_Uploads' element={< Student_Uploads />} />
          

        </Routes>
          </div>
        
        </div>   
        
        
        </Router>
     
      
    
  );
}

export default App;
