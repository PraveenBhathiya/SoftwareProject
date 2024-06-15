import React, { useState } from 'react';
import { TeacherSignInContainer, Title, Logo, FormContainer, Topic, InputField, SubmitButton, Regs } from '../Styles/TeacherSignInStyles';
import ruh1 from '../../src/Assets/Ruhunalogo.png';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

const Teachersignin = () => {

  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      return setErrorMessage("All fields are required!");
    }
    try {

      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("http://localhost:4000/api/auth/signinTeacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      setLoading(false);

      if (res.ok) {
        navigate('/teacher/dashboard');
      }

    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (

    <TeacherSignInContainer>
      <Title>DEIE UGP Management System</Title> <br />
      <Logo src={ruh1} alt="Logo" />
      <FormContainer>
        <Topic>Login as Teacher</Topic>
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
        <Regs to="/teacher/teacher-register" type='button'  >Register</Regs>
      </FormContainer>
      
      {errorMessage && (
        <Alert sx={{ mt: 5 }} severity="error" icon={<ErrorIcon />}>
          {errorMessage}
        </Alert>
      )}

    </TeacherSignInContainer>
  )
}

export default Teachersignin;



