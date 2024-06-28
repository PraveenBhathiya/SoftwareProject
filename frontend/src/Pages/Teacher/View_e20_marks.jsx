import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import TeacherSidebar from './Sidebar';
import '../../CSS/ViewMarks.css';
import '../../CSS/Marks.css';
import prof from '../../Assets/profile.png';

const Teacher_View_e20_marks = () => {

  const [menu, setMenu] = useState("Dashboard");

  return (
    <div className='marks'>
      <TeacherSidebar/>
         <div className="viewmarks">
          <h1>e20-Marks</h1>
          <div className="profile-container">
                    <div className='profile' onClick={() => { setMenu("Dashboard") }}>
                        <img src={prof} alt="" />
                        <Link to='/profile' style={{ textDecoration: 'none' }}>Profile</Link>
                        {menu === "Profile" ? <hr /> : null}
                    </div>
          </div>
          <div className="view-mark-container">
            <div className="marks1">
              <div className="mark1">1st Marks</div>
              <div className="view1">View Marks</div>
            </div>
            <div className="marks2">
              <div className="mark2">2nd Marks</div>
              <div className="view2">View Marks</div>
            </div>
            <div className="upmarks">
              <div className="up">Upload Marks</div>
              <div className="up1">Upload Marks</div>
            </div>
          </div>
         </div>
    </div>
  )
}

export default Teacher_View_e20_marks;