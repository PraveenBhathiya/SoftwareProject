import React, { useState } from 'react';
import {StudentSignInContainer, Title, Logo, FormContainer, Topic, InputField , SubmitButton , Regs} from '../Styles/AdminRegisterStyles';


const AdminRegister = () => {

 const [username, setUsername] = useState('');

 const [password, setPassword] = useState('');

 const [registrationNo, setRegNo] = useState('');

 const [studentemail, setUniEmail] = useState('');

 

 const handleSignIn = () => {

 }
 

 
  return (

    <StudentSignInContainer>
      <Title>DEIE UGP Management System</Title> <br/>
    
      <FormContainer>
        <Topic>Register</Topic>
        <InputField 
           type='text'
           placeholder='Username'
           value={username}
           onChange={(e)=> setUsername(e.target.value)}
           required
        />
        
        <InputField 
           type='email'
           placeholder='University Email'
           value={studentemail}
           onChange={(e)=> setUniEmail(e.target.value)}
           required
        />
        
        
         <InputField 
           type='password'
           placeholder='Password'
           value={password}
           onChange={(e)=> setPassword(e.target.value)}
           required
        />
        <SubmitButton to="/admin-signIn" type='button' onClick={handleSignIn}>Register</SubmitButton>
        
      </FormContainer>
    </StudentSignInContainer>
  )
}

export default AdminRegister;