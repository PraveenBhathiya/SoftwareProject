import React, { useState } from 'react';
import logo from '../../Assets/Ruhunalogo.png'
import logo1 from '../../Assets/dashboard.png';
import logo2 from '../../Assets/marks.png';
import logo3 from '../../Assets/uploads.png';
import logo4 from '../../Assets/notices.png';
import logo5 from '../../Assets/settings.png';
import { Link } from 'react-router-dom';
import '../../CSS/Sidebar.css';


export const TeacherSidebar = ({children}) => {
  
  const[menu,setMenu] = useState("Dashboard");

  return (
    <div className='sidebar'>
      <div className="ruhuna-logo">
        <img src={logo} alt="Ruhuna Logo" />
      </div>
      <div className="panel">
        <ul className='nav-menu'>
          <li onClick={()=>{setMenu("Dashboard")}}><img src={logo1} alt="Dashboard Icon" /><Link style={{textDecoration:'none'}} to='/teacher/dashboard'>Dashboard</Link>{menu==="Dashboard"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("Marks")}}><img src={logo2} alt="Marks Icon" /><Link style={{textDecoration:'none'}} to='/Marks'>Marks</Link>{menu==="Marks"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("Uploads")}}><img src={logo3} alt="Uploads Icon" /><Link style={{textDecoration:'none'}} to='/Uploads'>Uploads</Link>{menu==="Uploads"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("Notices")}}><img src={logo4} alt="Notices Icon" /><Link style={{textDecoration:'none'}} to='/Notices'>Notices</Link>{menu==="Notices"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("Settings")}}><img src={logo5} alt="Settings Icon" /><Link style={{textDecoration:'none'}} to='/Settings'>Settings</Link>{menu==="Settings"?<hr/>:<></>}</li>
        </ul>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default TeacherSidebar;