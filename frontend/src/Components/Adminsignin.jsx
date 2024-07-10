//AdminsignIn.jsx

import React, { useState } from 'react';
import { AdminSignInContainer, Title, Logo, FormContainer, Topic, InputField, SubmitButton, Regs } from '../Styles/AdminSignInStyles';
import ruh1 from '../../src/Assets/Ruhunalogo.png';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

const Adminsignin = () => {

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
      const res = await fetch("http://localhost:4000/api/auth/signinAdmin", {
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
        navigate('/admin/dashboard');
      }

    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (

    <AdminSignInContainer>
      <Title>DEIE UGP Management System</Title> <br />
      <Logo src={ruh1} alt="Logo" />
      <FormContainer>
        <Topic>Login as Admin</Topic>
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

        <Regs to="/components/admin-register" type='button'  >Register</Regs>
      </FormContainer>

      {errorMessage && (
        <Alert sx={{ mt: 5 }} severity="error" icon={<ErrorIcon />}>
          {errorMessage}
        </Alert>
      )}

    </AdminSignInContainer>
  )
}

export default Adminsignin;


