import './Navbar.css';
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Navbar, Logo, NavigationLinks, NavLink, ButtonsContainer ,LoginButton , GuestButton , HomeContainer, UniInfo, Title, AdminRegisterLink, Logo1  } from '../../Styles/styles';
const Navbar1 = () => {

  const navigate = useNavigate();

  const handleLoginClick = () =>{
         navigate('/choose-user');
  };
  const handleGuestClick = () =>{
   navigate('/guest-user');
 };
 

  return (

   
    <div className='nav'>
      
      <ul className="navbarli">
        <li><a href="#">Home</a></li>
        <li><a href="/about-us">About Us</a></li>
        <li><a href="/contact-us">Contact Us</a></li>
      </ul>
      <Navbar>
            <ButtonsContainer>
              <LoginButton onClick={handleLoginClick}>Sign In</LoginButton>
              <GuestButton onClick={handleGuestClick}>Guest Mode </GuestButton>
            </ButtonsContainer>
         </Navbar>

      
      <div className="nav-logo">UnderGraduate Project Mangement System<br/>DEIE</div>
    </div>
  )
}

export default Navbar1;