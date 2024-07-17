import React, { useState } from 'react';
import { StudentSignInContainer, Title, Logo, FormContainer, Topic, SubmitButton, Regs } from '../Styles/StudentSignInStyles';
import LoginImage from '../Assets/Login-rm.png';
import { useNavigate } from 'react-router-dom';
import { Alert} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import '../CSS/Login.css';

const Studentsignin = () => {

  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user); 

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      return dispatch(signInFailure("Please fill in all fields!"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:4000/api/auth/signinStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data)); 
        navigate('/student/dashboard');
      }

    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  // Styled components
  const SignInContainer = styled.div`
    display: flex;
    height: 100vh;
  `;

  const ImageContainer = styled.div`
    flex: 1;
    
  `;

  const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `;

  const LoginFormContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    
  `;

  return (
    <div className="sign-body">
      <SignInContainer>
      <ImageContainer>
        <StyledImage src={LoginImage} alt="Sign In" />
      </ImageContainer>
      <LoginFormContainer>
        <Title>DEIE UGP Management System</Title>
        <FormContainer>
          <Topic>Login as Student</Topic>
          <input className='input1'
            type='text'
            placeholder='Username'
            id='password'
            onChange={handleChange}
            required
          />
          <input className='input2'
            type='password'
            placeholder='Password'
            id='password'
            onChange={handleChange}
            required
          />
          <SubmitButton
            type='button'
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </SubmitButton>
          <Regs to="/student/student-register" type='button'>Register</Regs>
        </FormContainer>
        {errorMessage && (
          <Alert sx={{ mt: 5 }} severity="error" icon={<ErrorIcon />}>
            {errorMessage}
          </Alert>
        )}
      </LoginFormContainer>
    </SignInContainer>
    </div>
    
  );
};

export default Studentsignin;
