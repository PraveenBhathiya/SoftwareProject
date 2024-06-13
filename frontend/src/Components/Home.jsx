import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Navbar, Logo, NavigationLinks, NavLink, ButtonsContainer ,LoginButton , GuestButton , HomeContainer, UniInfo, Title, AdminRegisterLink, Logo1  } from '../Styles/styles';
import menu from '../../src/Assets/Menu.png';
import dep from '../../src/Assets/department.png';

const Home = () => {

 const navigate = useNavigate();

 const handleLoginClick = () =>{
        navigate('/choose-user');
 };

  return (
    <div className='home-content'>
         <Navbar>
          <Logo src={menu} alt='Logo'/>
          
          <NavigationLinks>
            <NavLink href='#'>About Us</NavLink>
            <NavLink href='#'>Contact Us</NavLink>
            <NavLink href='#'>Get Social</NavLink>
          </NavigationLinks>
          <ButtonsContainer>
            <LoginButton onClick={handleLoginClick}>Sign In</LoginButton>
            <GuestButton onClick={handleLoginClick}>Guest Mode </GuestButton>
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