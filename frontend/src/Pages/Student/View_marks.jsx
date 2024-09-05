import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import StudentSidebar from './Sidebar';
import '../../CSS/Marks.css';
import prof from '../../Assets/profile.png';

const Student_View_marks = () => {

    const [menu, setMenu] = useState("Dashboard");

  return (
    <div className='viewmark'>
        <StudentSidebar/>
         
        <div className="marks-container">
        <div className="title1">View Your Marks</div>
        <div className="profile-container">
                    
                </div>
        <div className="marks-box">
            <div className="prop">
                <p>Proposal Evaluation</p>
                <h1>07</h1>
            </div>
            <div className="prog">
                <p>Progress Evaluation</p>
                <h1>06</h1>
            </div>
            <div className="fin">
                <p>Final Evaluation</p>
                <h1>09</h1>
            </div>
        </div>
        </div>

    </div>
  )
}

export default Student_View_marks;