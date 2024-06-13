import React, { useState } from 'react';
import {StudentSignInContainer, Title, Logo, FormContainer, Topic, InputField , SubmitButton , Regs} from '../../Styles/TeacherRegister';
import ruh1 from '../../Assets/Ruhunalogo.png';

const TeacherRegister = () => {

 const [username, setUsername] = useState('');

 const [password, setPassword] = useState('');

 const [registrationNo, setRegNo] = useState('');

 const [studentemail, setUniEmail] = useState('');

 

 const handleSignIn = () => {

 }
 

 console.log(ruh1);
  return (

    <StudentSignInContainer>
      <Title>DEIE UGP Management System</Title> <br/>
      <Logo src={ruh1} alt="Logo" />
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
        <SubmitButton to="/teacher-signIn" type='button' onClick={handleSignIn}>Register</SubmitButton>
        
      </FormContainer>
    </StudentSignInContainer>
  )
}







export default TeacherRegister;