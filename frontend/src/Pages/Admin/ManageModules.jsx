import React, { useState } from 'react';
import { StudentSignInContainer, Title, Logo, FormContainer, Topic, InputField, SubmitButton } from '../../Styles/StudentRegister';
import ruh1 from '../../Assets/Ruhunalogo.png';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

const ModuleCreate = () => {

   const [formData, setFormData] = useState({});
   const [errorMessage, setErrorMessage] = useState(null);
   const [loading, setLoading] = useState(false);

   const navigate = useNavigate();

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!formData.moduleName || !formData.moduleCode || !formData.batch) {
         return setErrorMessage("All fields are required!");
      }
      try {

         setLoading(true);
         setErrorMessage(null);
         const res = await fetch("http://localhost:4000/api/admin/createModule", { 
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
         });

         const data = await res.json();

         if (data.success === false) {
            return setErrorMessage(data.message);
         }

         setLoading(false);

         if (res.ok) {
          console.log("Module created.");////edit to send msg

         }

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
            <Topic>Create Module</Topic>
            <InputField
               type='text'
               placeholder='Module Name'
               id="moduleName"
               onChange={handleChange}
               required
            />
            <InputField
               type='text'
               placeholder='Module Code'
               id='moduleCode'
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
                  ) : ("Create Module")
               }
            </SubmitButton>

         </FormContainer>
         {errorMessage && (
            <Alert sx={{ mt: 5 }} severity="error" icon={<ErrorIcon />}>
               {errorMessage}
            </Alert>
         )}

      </StudentSignInContainer>
   )
}

export default ModuleCreate;
