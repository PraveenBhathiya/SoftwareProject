import React from 'react';
import AdminSidebar from '../Admin/Sidebar.jsx';
import '../../CSS/AdminTools.css';


const ManageUserbyAdding = () => {
  return (
    <div className='ManageUserbyAddingContainer'>
        <AdminSidebar/>
     <div className="main1">
     <div className="topic1">Manage Users</div>
     <div className="inputForm">
        <input className="ip" type="text"
               placeholder="First Name"
        />
        <input type="text"
               placeholder="Full Name with initials"
        />
        <input type="text"
               placeholder="Registration Number"
        />
        <input type="text"
               placeholder="Batch"
        />
        <input type="text"
               placeholder="Designation"
        />
        <button>Add Users</button>
     </div>
     </div>
     

    </div>
  )
};

export default ManageUserbyAdding;
