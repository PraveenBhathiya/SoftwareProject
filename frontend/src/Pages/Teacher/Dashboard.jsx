import React, { useState } from 'react';
import { Link, Router } from 'react-router-dom';
import '../../CSS/Dashboard.css';
import TeacherSidebar from '../Teacher/Sidebar.jsx';
import '../../CSS/Dash.css';

import Header from '../../Components/NewDashboard/Common/Heading/Header.jsx';
import Dashhomemain from '../../Components/NewDashboard/DashHome/Dashhomemain.jsx';

const TeacherDashBoard = () => {
    const [menu, setMenu] = useState("Dashboard");

    return (
        <>
         
         <Header/>
         <Dashhomemain/>
         
        
        </>
    );
};

export default TeacherDashBoard;
