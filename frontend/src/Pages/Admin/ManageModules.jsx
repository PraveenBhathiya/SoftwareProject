import React, { useState } from 'react';
import { StudentSignInContainer, Title, Logo, FormContainer, Topic, InputField, SubmitButton } from '../../Styles/StudentRegister';
import ruh1 from '../../Assets/Ruhunalogo.png';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const BatchCreate = () => {

  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.batchName || !formData.batchCode) {
      return setErrorMessage("All fields are required!");
    }
    try {

      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("http://localhost:4000/api/admin/createBatch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }

      setLoading(false);
      setSuccessMessage("New batch created successfully.");

    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (

    <StudentSignInContainer>
      <Title>DEIE UGP Management System</Title> <br />
      <Logo src={ruh1} alt="Logo" />
      <FormContainer>
        <Topic>Create Batch</Topic>
        <InputField
          type='text'
          placeholder='Batch Name'
          id="batchName"
          onChange={handleChange}
          required
        />
        <InputField
          type='text'
          placeholder='Batch Code'
          id='batchCode'
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
            ) : ("Create Batch")
          }
        </SubmitButton>
      {successMessage && (
        <Alert sx={{ mt: 5 }} severity="success" icon={<CheckCircleIcon />}>
          {successMessage}
        </Alert>
      )}

{errorMessage && (
        <Alert sx={{ mt: 5 }} severity="error" icon={<ErrorIcon />}>
          {errorMessage}
        </Alert>
      )}
      </FormContainer>


    </StudentSignInContainer>
  )
}

export default BatchCreate;
