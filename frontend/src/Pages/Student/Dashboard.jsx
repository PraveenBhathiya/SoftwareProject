import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import dep from '../../Assets/department.png';
import prof from '../../Assets/profile.png';
import '../../CSS/Dashboard.css';
import StuNoticePanel from '../Student/StuNoticePanel.jsx';
import StudentSidebar from './Sidebar.jsx';


const StudentDashBoard = () => {
    const [menu, setMenu] = useState("Dashboard");

    return (
        <div className='dashContainer'>
            
                
            
            <div className='mainContent'>
            <StudentSidebar/>
                <div className='leftPanel'>
                    <div className="verticalLine"></div> {/* Thin vertical line */}

                    <StuNoticePanel>
                    <div className="right-aligned-container">
                        <div className="text-right">
                            This text is aligned to the right.
                        </div>
                    </div>   
                    </StuNoticePanel>  {/* Notice panel component */}
                </div>
                <div className='profile' onClick={() => { setMenu("Dashboard") }}>
                    <img src={prof} alt="" />
                    <Link style={{ textDecoration: 'none' }} to='/profile'>Profile</Link>
                    {menu === "Profile" ? <hr /> : null}
                </div>
                <div className="hi">Hi, Good Morning!</div>
                <div className="title">
                    <h2>Welcome to DEIE UGP Management System</h2>
                </div>
                <div className="dep">
                    <img src={dep} alt="" className="depart" />
                </div>
                <div className="p">Available Courses</div>
                <div className="courses">
                    <div className="e22">
                        <button className="e22-btn">e22</button>
                        <p>Final Year Undergraduate Project</p>
                    </div>
                    <div className="e21">
                        <button className="e21-btn">e21</button>
                        <p>Final Year Undergraduate Project</p>
                    </div>
                    <div className="e20">
                        <button className="e20-btn">e20</button>
                        <p>Final Year Undergraduate Project</p>
                    </div>
                    <div className="e19">
                        <button className="e19-btn">e19</button>
                        <p>Final Year Undergraduate Project</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashBoard;
