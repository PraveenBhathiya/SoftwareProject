import React, { useState } from 'react';
import { StudentSignInContainer, Title, Logo, FormContainer, Topic, InputField, SubmitButton, Regs } from '../Styles/StudentSignInStyles';
import ruh1 from '../../src/Assets/Ruhunalogo.png';
import { useNavigate } from 'react-router-dom';
import { Alert} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';
import {useDispatch, useSelector} from 'react-redux';


const Studentsignin = () => {

  const [formData, setFormData] = useState({});
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);   //we are using reducers to do this using redux
  const dispatch = useDispatch();
  const{loading, error: errorMessage} = useSelector((state) => state.user); //here user from userSlice.js

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      // return setErrorMessage("All fields are required!");
      return dispatch(signInFailure("Please fill in all fields!"));
    }
    try {

      // setLoading(true);
      // setErrorMessage(null);
      dispatch(signInStart());
      const res = await fetch("http://localhost:4000/api/auth/signinStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        // setLoading(false);
        // return setErrorMessage(data.message);
        dispatch(signInFailure(data.message));
      }

      //setLoading(false);

      if (res.ok) {
        dispatch(signInSuccess(data)); 
        navigate('/student/dashboard');
      }

    } catch (error) {
      // setErrorMessage(error.message);
      // setLoading(false);
      dispatch(signInFailure(error.message));
    }
  };

  return (

    <StudentSignInContainer>
      <Title>DEIE UGP Management System</Title> <br />
      <Logo src={ruh1} alt="Logo" />
      <FormContainer>
        <Topic>Login as Student</Topic>
        <InputField
          type='text'
          placeholder='Username'
          id="username"
          onChange={handleChange}
          required
        />

        <InputField
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
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {
            loading ? (
              <>
                <span className="p1-3">Loading...</span>
              </>
            ) : ("Login")
          }
        </SubmitButton>
        <Regs to="/student/student-register" type='button'  >Register</Regs>


      </FormContainer>

      {errorMessage && (
        <Alert sx={{ mt: 5 }} severity="error" icon={<ErrorIcon />}>
          {errorMessage}
        </Alert>
      )}

    </StudentSignInContainer>


  )
}

export default Studentsignin;



