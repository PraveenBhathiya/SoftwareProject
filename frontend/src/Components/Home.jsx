import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Navbar, Logo, NavigationLinks, NavLink, ButtonsContainer ,LoginButton , GuestButton , HomeContainer, UniInfo, Title, AdminRegisterLink, Logo1  } from '../Styles/styles';
import menu from '../../src/Assets/Menu.png';
import dep from '../../src/Assets/department.png';
import rulogo from '../../src/Assets/Ruhunalogo.png';

const Home = () => {

 const navigate = useNavigate();

 const handleLoginClick = () =>{
        navigate('/choose-user');
 };
 const handleGuestClick = () =>{
  navigate('/guest-user');
};

  return (
    <div className='home-content'>
        <div class="sidebar">
          <img src={rulogo} alt="Logo" class="logo"/>
              <ul class="nav-links">
                  <li><a href="#">Home</a></li>
                  <li><a href="#">About us</a></li>
                  <li><a href="#">Contact us</a></li>
               </ul>
        </div>


         <Navbar>
            <ButtonsContainer>
              <LoginButton onClick={handleLoginClick}>Sign In</LoginButton>
              <GuestButton onClick={handleGuestClick}>Guest Mode </GuestButton>
            </ButtonsContainer>
         </Navbar>
         <HomeContainer>
             <UniInfo>
              <Title>Welcome to DEIE UGP Management System</Title>
              <Logo1 src= {dep} alt=''/><br/>
              
              
             </UniInfo>
         </HomeContainer>

    </div>
  )
}

export default Home;