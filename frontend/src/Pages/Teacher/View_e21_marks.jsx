import React from 'react'
import TeacherSidebar from './Sidebar';
import '../../CSS/ViewMarks.css';

const Teacher_View_e21_marks= () => {
  return (
    <div className='marks'>
      <TeacherSidebar/>
         <div className="viewmarks">
          <h1>e22-Marks</h1>
          <div className="view-mark-container">
            <div className="marks1">
              <div className="1mark">1st Marks</div>
              <div className="1view">View Marks</div>
            </div>
            <div className="marks2">
              <div className="2mark">2nd Marks</div>
              <div className="2view">View Marks</div>
            </div>
            <div className="upmarks">
              <div className="up">Upload Marks</div>
              <div className="1up">Upload Marks</div>
            </div>
          </div>
         </div>
    </div>
  )
}

export default Teacher_View_e21_marks;