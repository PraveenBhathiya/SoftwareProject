// AdminSignInStyles.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const TeacherSignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #EFF4FF; 
  min-height: 100vh; 
`;
export const Title = styled.div`
  Font-size: 40px;
  color: #fff;
  margin-top: 50px;
  margin-bottom: 80px;
  font-weight: bold; 
  

`;
export const Logo = styled.div`
  flex: 1;
  
  
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  width: 100%;
  max-width: 500px; 
  height: 500px;
  padding: 20px;
  border: 1px solid #1952fc;
  border-radius: 8px;
  
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
export const Topic = styled.div`
  Font-size: 30px;
  font-weight:800;
  color: #fff;
  margin-top: 50px;
  

`;


export const InputField = styled.input`
  width: 90%;
  padding: 10px;
  gap:50px;
  margin-bottom:2px;
  margin-top:50px;
  border: 1px solid #fff;
  background-color: transparent;
  border-radius: 10px;
  color: #fff;
  outline: none;
  
  &::placeholder {
    color: #fff; /* Placeholder text color */
  }

`;

export const SubmitButton = styled(Link)`
  width: 15%;
  padding: 12px;
  margin-top: 80px;
  border: none;
  border-radius: 18px;
  background-color:#0764f0;
  color: white;
  font-weight:600;
  font-size: 18px;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #08affc;
  }
  
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;
export const Regs = styled(Link)`
  Font-size: 15px;
  font-weight:500;
  color:white ;
  margin-top: 10px;
  text-decoration:none;

  
`;




export const SignInContainer = styled.div`
display: flex;
height: 100vh;
`;

export const ImageContainer = styled.div`
flex: 1;
`;

export const StyledImage = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`;

export const LoginFormContainer = styled.div`
flex: 1;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 20px;
`;
