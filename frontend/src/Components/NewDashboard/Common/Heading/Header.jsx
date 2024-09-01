import React, { useState } from 'react'
import Head from './Head';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {


  return (
    <>
        <Head/>
        <header>
            <nav className="FlexSB">
                <ul className='FlexSB'>
                    <li><Link to="/">Marks</Link></li>
                    <li><Link to="/">Uploads</Link></li>
                    <li><Link to="/">Notices</Link></li>
                    <li><Link to="/">Settings</Link></li>
                </ul>
                <div className="start">
                    <div className="button">DashBoard</div>
                </div>
                
            </nav>
        </header>
    </>
  )
}

export default Header;