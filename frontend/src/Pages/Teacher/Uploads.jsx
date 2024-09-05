import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TeacherSidebar from './Sidebar';
import '../../CSS/Marks.css';
import prof from '../../Assets/profile.png';

const Teacher_Uploads = () => {

    const [menu, setMenu] = useState("Dashboard");

  return (
    <div className='teacher-marks'>
    <TeacherSidebar />

    <div className="marks-container">
        <div className="title">Uploads</div>
        

        <div className="courses">
            <div className="e22">
                <Link to='/e22-uploads'><button className="e22-btn">e22</button></Link>
                <p>Final Year Undergraduate Project</p>
            </div>
            <div className="e21">
                <Link to='/e21-uploads'><button className="e21-btn">e21</button></Link>
                <p>Final Year Undergraduate Project</p>
            </div>
            <div className="e20">
                <Link to='/e20-uploads'><button className="e20-btn">e20</button></Link>
                <p>Final Year Undergraduate Project</p>
            </div>
            <div className="e19">
                <Link to='/e19-uploads'><button className="e19-btn">e19</button></Link>
                <p>Final Year Undergraduate Project</p>
            </div>
        </div>
    </div>
</div>
  )
}

export default Teacher_Uploads;