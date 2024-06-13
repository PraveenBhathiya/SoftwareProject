import React, { useState } from 'react';
import {StudentSignInContainer, Title, Logo, FormContainer, Topic, InputField , SubmitButton , Regs} from '../Styles/StudentSignInStyles';
import ruh1 from '../../src/Assets/Ruhunalogo.png';

const Studentsignin = () => {

 const [username, setUsername] = useState('');

 const [password, setPassword] = useState('');

 const handleSignIn = () => {

 }
 const handleRegister = () => {

 }

 console.log(ruh1);
  return (

    <StudentSignInContainer>
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
        <SubmitButton to="/student/dashboard" type='button' onClick={handleSignIn}>Login</SubmitButton>
        <Regs to="/student/student-register" type='button'  >Register</Regs>
      </FormContainer>
    </StudentSignInContainer>
  )
}

export default Studentsignin;



