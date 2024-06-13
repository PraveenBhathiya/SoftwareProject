import React, { useState } from 'react';
import {StudentSignInContainer, Title, Logo, FormContainer, Topic, InputField , SubmitButton , Regs} from '../../Styles/StudentRegister';
import ruh1 from '../../Assets/Ruhunalogo.png';

const StudentRegister = () => {

 const [username, setUsername] = useState('');

 const [password, setPassword] = useState('');

 const [registrationNo, setRegNo] = useState('');

 const [studentemail, setStuEmail] = useState('');

 const [batch, setBatch] = useState('');

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
        <Topic>Register</Topic>
        <InputField 
           type='text'
           placeholder='Username'
           value={username}
           onChange={(e)=> setUsername(e.target.value)}
           required
        />
        <InputField 
           type='text'
           placeholder='Registration Number'
           value={registrationNo}
           onChange={(e)=> setRegNo(e.target.value)}
           required
        />
        <InputField 
           type='email'
           placeholder='Student Email'
           value={studentemail}
           onChange={(e)=> setStuEmail(e.target.value)}
           required
        />
        <InputField 
           type='text'
           placeholder='Batch'
           value={batch}
           onChange={(e)=>setBatch(e.target.value)}
           required
        />
        
         <InputField 
           type='password'
           placeholder='Password'
           value={password}
           onChange={(e)=> setPassword(e.target.value)}
           required
        />
        <SubmitButton to="/student-signIn" type='button' onClick={handleSignIn}>Register</SubmitButton>
        
      </FormContainer>
    </StudentSignInContainer>
  )
}







export default StudentRegister;