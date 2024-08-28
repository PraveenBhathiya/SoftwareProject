import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { SignInContainer, ImageContainer, StyledImage, LoginFormContainer, Title, FormContainer, Topic, SubmitButton, Regs } from '../Styles/StudentSignInStyles.js';
import LoginImage from '../Assets/Login-rm.png';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';
import '../CSS/Login.css';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.role) {
      return dispatch(signInFailure("Please fill in all fields!"));
    }

    try {
      dispatch(signInStart());
      const res = await fetch(`http://localhost:4000/api/auth/signin${formData.role}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      if (res.ok) {
        dispatch(signInSuccess(data)); 

        // Redirect based on role
        switch (formData.role) {
          case "Student":
            navigate('/student/dashboard');
            break;
          case "Teacher":
            navigate('/teacher/dashboard');
            break;
          case "Admin":
            navigate('/admin/dashboard');
            break;
          default:
            break;
        }
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="sign-body">
      <SignInContainer>
        <ImageContainer>
          <StyledImage src={LoginImage} alt="Sign In" />
        </ImageContainer>
        <LoginFormContainer>
          <Title>DEIE UGP Management System</Title>
          <FormContainer>
            <Topic>Login</Topic>
            <input className='userN'
              type='text'
              placeholder='Username'
              id='username'
              onChange={handleChange}
              required
            />
            <input className='passW'
              type='password'
              placeholder='Password'
              id='password'
              onChange={handleChange}
              required
            />
            <select id="role" onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Admin">Admin</option>
            </select>
            <SubmitButton
              type='button'
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </SubmitButton>
            <Regs to="/register" type='button'>Register</Regs>
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

export default SignIn;
