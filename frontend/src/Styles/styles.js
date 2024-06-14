// styles.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: rgb(226, 242, 250);
  color: black;
  font-family: Arial, sans-serif;
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
  gap:20px;

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
  display: flex;
  align-items: center;
  margin-right: 35px;

  @media screen and (max-width: 768px) {
    margin-top: 10px;
    margin-right: 0;
  }
`;

export const LoginButton = styled.button`
  background-color: #2648c3;
  color: white;
  border-radius:5px;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  @media screen and (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;

export const GuestButton = styled.button`
  color: #2648c3;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  border: 2px solid blue;
  border-radius: 5px;
  background-color: transparent;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: white;
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
  background: linear-gradient(-360deg, white, rgb(226, 242, 250));
  background-size: cover;
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
  border-radius:6px;
  justify-content:center;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: black;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

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
  
 
  left:50%;
  align-text:center;

  &:hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;
