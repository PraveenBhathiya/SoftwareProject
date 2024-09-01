import React, { useState } from 'react';
import { StudentSignInContainer, Title, FormContainer, Topic, InputField, SubmitButton } from '../Styles/AdminRegisterStyles';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

const Register = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('student'); // Default role is 'student'

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setFormData({}); // Reset form data when role changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate common fields
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("All required fields must be filled!");
    }

    // Additional validation for students
    if (role === 'student' && (!formData.regNo || !formData.batch)) {
      return setErrorMessage("Registration number and batch are required for students!");
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, role }),
      });

      const data = await res.json();

      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      setLoading(false);

      if (res.ok) {
        navigate('/signin'); // Redirect to sign-in page after successful registration
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

        <label>
          Select Role:
          <select onChange={handleRoleChange} value={role}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <InputField
          type='text'
          placeholder='Username'
          id="username"
          onChange={handleChange}
          required
        />

        <InputField
          type='email'
          placeholder='Email'
          id='email'
          onChange={handleChange}
          required
        />

        {role === 'student' && (
          <>
            <InputField
              type='text'
              placeholder='Registration Number'
              id='regNo'
              onChange={handleChange}
              required
            />

            <InputField
              type='text'
              placeholder='Batch'
              id='batch'
              onChange={handleChange}
              required
            />
          </>
        )}

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
          {loading ? "Loading..." : "Register"}
        </SubmitButton>
      </FormContainer>

      {errorMessage && (
        <Alert sx={{ mt: 5 }} severity="error" icon={<ErrorIcon />}>
          {errorMessage}
        </Alert>
      )}
    </StudentSignInContainer>
  );
};

export default Register;
