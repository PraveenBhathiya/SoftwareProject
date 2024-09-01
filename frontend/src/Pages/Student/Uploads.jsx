import React from 'react';
import '../../CSS/Uploads.css';
import StudentSidebar from './Sidebar';

const Student_Uploads = () => {
  return (
    <div className='upload-home'>
        <StudentSidebar/>
      <h1>Uploads</h1>
      <div className="upload-content">
        <div className="upl">
            <div className="plus">+</div>
            <div  className="up-btn">Upload</div>
        </div>
        <div className="up3">
           <div className="upl3">
              <span className="upload-text">Upload 3</span>
               <p>Comments</p>
               <p>Group 10</p>
            </div>
            <div className="viup3">View Uploads</div>
        </div>
        <div className="up3">
            <div className="upl3">
            <span className="upload-text">Upload 2</span>
            <p>Comments</p>
            <p>Group 10</p>
            </div>
            
            <div className="viup3">View Uploads</div>
        </div>
        <div className="up3">
            <div className="upl3">
            <span className="upload-text">Upload 1</span>
            <p>Comments</p>
            <p>Group 10</p>
            </div>
           
            <div className="viup3">View Uploads</div>
        </div>
      </div>
    </div>
  )
}

export default Student_Uploads;