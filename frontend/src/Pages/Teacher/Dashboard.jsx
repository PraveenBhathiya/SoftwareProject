import React, { useState } from 'react';
import Heading from '../../Components/Heading.jsx';
import { Link } from 'react-router-dom';
import dep from '../../Assets/department.png';
import prof from '../../Assets/profile.png';
import '../../CSS/Dashboard.css';
import StuNoticePanel from '../Student/StuNoticePanel.jsx';
import TeacherSidebar from '../Teacher/Sidebar.jsx';
import '../../CSS/Dash.css';

const TeacherDashBoard = () => {
    const [menu, setMenu] = useState("Dashboard");

    return (
        <div className='dashContainer'>
            
                <TeacherSidebar/>
                <>
      <section className='hero'>
        <div className='container'>
          <div className='row'>
            <Heading subtitle='WELCOME TO ACADEMIA' title='Best Online Education Expertise' />
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            <div className='button'>
              <button className='primary-btn'>
                GET STARTED NOW <i className='fa fa-long-arrow-alt-right'></i>
              </button>
              <button>
                VIEW COURSE <i className='fa fa-long-arrow-alt-right'></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
           
        </div>
    );
};

export default TeacherDashBoard;
