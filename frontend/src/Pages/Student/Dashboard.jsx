import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import dep from '../../Assets/department.png';
import prof from '../../Assets/profile.png';
import '../../CSS/Dashboard.css';
import adminlogo from '../../Assets/rm-dash.png';
import logo4 from '../../Assets/imessages.png';

import StudentSidebar from './Sidebar.jsx';


const StudentDashBoard = () => {
    const [menu, setMenu] = useState("Dashboard");

    return (
        <div className="admin-main">
        <StudentSidebar/>
        <div className="profile-container">
                    <div className='profile' onClick={() => { setMenu("Dashboard") }}>
                        <img src={prof} alt="" />
                        <Link className='Profi' to='/profile' style={{ textDecoration: 'none' }}>Profile</Link>
                        {menu === "Profile" ? <hr /> : null}
                    </div>
        </div>
        <div className="Notification-container">
                    <div className='Notification' onClick={() => { setMenu("Dashboard") }}>
                        <img src={logo4} alt="" />
                        <Link className='Noti' to='/Notices'  style={{ textDecoration: 'none' }}>Notifications</Link>
                        {menu === "Notices" ? <hr /> : null}
                    </div>
        </div>
        
            <div className="topic-section">
                <div className='admin-hi'>Hi, Good Morning!</div>
                <div className='admin-welcome'>Welcome to DEIE UGP Management <br/>System</div>
            </div>

            <div className="admin-content">
                <div className="admin-module">
                    
                        <div className='admin-title1'>View your marks</div>
                        <div className="frame1">
                            <button className="btn-1">e22</button>
                            <p>Final Year Undergraduate Projects</p>
                        </div>

                        <div className='admin-title2'>Upload Your Progress</div>
                        <div className="frame2">
                            <button className="btn-2">e22</button>
                            <p>Final Year Undergraduate Projects</p>
                        </div>
                    
                </div>
                <div className="admin-img">
                    <img src={adminlogo} alt="" />
                </div>
            </div>

       </div>
    );
};

export default StudentDashBoard;
