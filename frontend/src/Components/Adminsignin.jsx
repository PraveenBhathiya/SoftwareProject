import React, { useState } from 'react';
import {AdminSignInContainer, Title, Logo, FormContainer, Topic, InputField , SubmitButton, Regs } from '../Styles/AdminSignInStyles';
import ruh1 from '../../src/Assets/Ruhunalogo.png';

const Adminsignin = () => {

 const [username, setUsername] = useState('');

 const [password, setPassword] = useState('');

 const handleSignIn = () => {

 }
 console.log(ruh1);
  return (

    <AdminSignInContainer>
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
        <SubmitButton to="/admin/dashboard" type='button' onClick={handleSignIn}>Login</SubmitButton>
        <Regs to="/components/admin-register" type='button'  >Register</Regs>
      </FormContainer>
    </AdminSignInContainer>
  )
}

export default Adminsignin;



