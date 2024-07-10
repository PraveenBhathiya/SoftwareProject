/* styles.js */
import styled,{ createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';


export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #EFF4FF; 
  }
`;


export const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: transparent;
  color: black;
  font-family: 'Poppins', sans-serif;
  z-index: 1000;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

export const Logo = styled.img`
  width: 70px;
  height: 60px;
  align-item: left;

  @media screen and (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

export const NavigationLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media screen and (max-width: 768px) {
    margin-top: 10px;
  }
`;

export const NavLink = styled.a`
  margin-right: 20px;
  color: black;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 768px) {
    margin: 0 10px;
    font-size: 16px;
  }
`;

export const ButtonsContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 40px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    top: 10px;
    right: 10px;
  }
`;

export const LoginButton = styled.button`
  background-color: #2563EB;
  color: white;
  border: none;                
  padding: 10px 20px;  /* Adjusted padding for better look */
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  margin-right: 10px;  /* Added margin-right to create space */
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1E4BAF;
  }
  
  @media screen and (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;

export const GuestButton = styled.button`
  background-color: #2563EB;
  color: white;
  border: none;                
  padding: 10px 20px;  /* Adjusted padding for better look */
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1E4BAF;
  }

  @media screen and (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;
export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-size: cover;
  background-color: #ffffff;
  background-position: center;
  min-height: 100vh;
  padding-top: 80px;

  @media screen and (max-width: 768px) {
    padding-top: 60px;
  }
`;

export const UniInfo = styled.div`
  margin-top: 20px;
`;

export const Logo1 = styled.img`
  width: 90%;
  max-height: 100vh;
  object-fit: cover;
  margin-top: 20px;
  border-radius: 6px;
  justify-content: center;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 36px;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  color: #525252;

  @media screen and (max-width: 768px) {
    font-size: 28px;
  }
`;

export const AdminRegisterLink = styled(Link)`
  color: black;
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;
  margin-top: 30px;
  align-text: center;

  &:hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;
