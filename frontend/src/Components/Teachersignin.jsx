import React, { useState } from 'react';
import {TeacherSignInContainer, Title, Logo, FormContainer, Topic, InputField , SubmitButton, Regs} from '../Styles/TeacherSignInStyles';
import ruh1 from '../../src/Assets/Ruhunalogo.png';

const Teachersignin = () => {

 const [username, setUsername] = useState('');

 const [password, setPassword] = useState('');

 const handleSignIn = () => {

 }
 console.log(ruh1);
  return (

    <TeacherSignInContainer>
      <Title>DEIE UGP Management System</Title> <br/>
      <Logo src={ruh1} alt="Logo" />
      <FormContainer>
        <Topic>Login</Topic>
        <InputField 
           type='text'
           placeholder='Username'
           value={username}
           onChange={(e)=> setUsername(e.target.value)}
           required
        />
        
         <InputField 
           type='password'
           placeholder='Password'
           value={password}
           onChange={(e)=> setPassword(e.target.value)}
           required
        />
        <SubmitButton to="/teacher/dashboard" type='button' onClick={handleSignIn}>Login</SubmitButton>
        <Regs to="/teacher/teacher-register" type='button'  >Register</Regs>
      </FormContainer>
    </TeacherSignInContainer>
  )
}

export default Teachersignin;



