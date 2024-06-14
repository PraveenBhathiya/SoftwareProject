import React, { useState } from 'react';
import { StudentSignInContainer, Title, Logo, FormContainer, Topic, InputField, SubmitButton, Regs } from '../Styles/AdminRegisterStyles';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {

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

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("All fields are required!");
    }
    try {

      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("http://localhost:4000/api/auth/signupAdmin", {
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
        navigate('/admin-signIn');
      }

    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (

    <StudentSignInContainer>
      <Title>DEIE UGP Management System</Title> <br />

      <FormContainer>
        <Topic>Register</Topic>
        <InputField
          type='text'
          placeholder='Username'
          id="username"
          onChange={handleChange}
          required
        />
        <InputField
          type='email'
          placeholder='email'
          id='email'
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
        <SubmitButton type='button' onClick={handleSubmit}>Register</SubmitButton>

      </FormContainer>
    </StudentSignInContainer>
  )
}

export default AdminRegister;