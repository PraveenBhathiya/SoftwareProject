import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TeacherSidebar from './Sidebar';
import '../../CSS/Marks.css';
import prof from '../../Assets/profile.png';

const TeacherMarks = () => {
    const [menu, setMenu] = useState("Dashboard");

    return (
        <div className='teacher-marks'>
            <TeacherSidebar />

            <div className="marks-container">
                <div className="title">Marks</div>
                <div className="profile-container">
                    <div className='profile' onClick={() => { setMenu("Dashboard") }}>
                        <img src={prof} alt="" />
                        <Link to='/profile' style={{ textDecoration: 'none' }}>Profile</Link>
                        {menu === "Profile" ? <hr /> : null}
                    </div>
                </div>

                <div className="courses">
                    <div className="e22">
                        <Link to='/teacher/sidebar/marks/view_e22_marks'><button className="e22-btn">e22</button></Link>
                        <p>Final Year Undergraduate Project</p>
                    </div>
                    <div className="e21">
                        <Link to='/teacher/sidebar/marks/view_e21_marks'><button className="e21-btn">e21</button></Link>
                        <p>Final Year Undergraduate Project</p>
                    </div>
                    <div className="e20">
                        <Link to='/teacher/sidebar/marks/view_e20_marks'><button className="e20-btn">e20</button></Link>
                        <p>Final Year Undergraduate Project</p>
                    </div>
                    <div className="e19">
                        <Link to='/teacher/sidebar/marks/view_e19_marks'><button className="e19-btn">e19</button></Link>
                        <p>Final Year Undergraduate Project</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherMarks;
