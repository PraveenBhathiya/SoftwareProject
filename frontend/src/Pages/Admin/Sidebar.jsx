import React, { useState } from 'react';
import logo from '../../Assets/rm-ruh.png';
import logo1 from '../../Assets/ihome.png';
import logo2 from '../../Assets/ibook.png';
import logo3 from '../../Assets/iupload.png';
import logo4 from '../../Assets/imessages.png';
import logo5 from '../../Assets/isettings.png';
import logo6 from '../../Assets/iuser.png';
import logo7 from '../../Assets/imodule.png';
import { Link } from 'react-router-dom';
import '../../CSS/Sidebar.css';


export const AdminSidebar = ({children}) => {
  
  const[menu,setMenu] = useState("Dashboard");

  return (
    <div className='sidebar'>
      <div className="ruhuna-logo">
        <img src={logo} alt="Ruhuna Logo" />
      </div>
      <div className="panel">
        <ul className='nav-menu'>
          <li onClick={()=>{setMenu("Dashboard")}}><img src={logo1} alt="Dashboard Icon" /><Link style={{textDecoration:'none',color:'#2563ea'}} to='/admin/dashboard'>Dashboard</Link>{menu==="Dashboard"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("Marks")}}><img src={logo2} alt="Marks Icon" /><Link style={{textDecoration:'none',color:'#2563ea'}} to='/Admin-Marks'>Marks</Link>{menu==="Marks"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("Uploads")}}><img src={logo3} alt="Uploads Icon" /><Link style={{textDecoration:'none',color:'#2563ea'}} to='/Uploads'>Uploads</Link>{menu==="Uploads"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("Notices")}}><img src={logo4} alt="Notices Icon" /><Link style={{textDecoration:'none',color:'#2563ea'}} to='/Notices'>Notices</Link>{menu==="Notices"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("Manage Users")}}><img src={logo6} alt="User Icon" /><Link style={{textDecoration:'none',color:'#2563ea'}} to='/admin/manage-user'>Manage User</Link>{menu==="ManageUser"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("Manage Modules")}}><img src={logo7} alt="Module Icon" /><Link style={{textDecoration:'none',color:'#2563ea'}} to='/ManageModules'>Manage Modules</Link>{menu==="ManageModules"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("Settings")}}><img src={logo5} alt="Settings Icon" /><Link style={{textDecoration:'none',color:'#2563ea'}} to='/Settings'>Settings</Link>{menu==="Settings"?<hr/>:<></>}</li>
        </ul>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default AdminSidebar;