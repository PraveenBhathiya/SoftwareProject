import React, { useState } from 'react';
import {
    SignInContainer, ImageContainer, StyledImage, LoginFormContainer,
    Title, FormContainer, Topic, InputField, SubmitButton, Regs
} from '../Styles/AdminSignInStyles';
import ruh1 from '../../src/Assets/Ruhunalogo.png';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import LoginImage from '../Assets/Login-rm.png';
import '../CSS/Login.css';


const UnifiedSignIn = () => {

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

        if (!formData.username || !formData.password) {
            return setErrorMessage("All fields are required!");
        }
        try {

            setLoading(true);
            setErrorMessage(null);
            const res = await fetch("http://localhost:4000/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log(data);

            if (!res.ok) {
                return setErrorMessage(data.message);
            }

            setLoading(false);

            // Navigate based on the user role
            switch (data.role) {
                case 'student':
                    navigate('/student/dashboard', {replace: true});
                    break;
                case 'teacher':
                    navigate('/teacher/dashboard', {replace: true});
                    break;
                case 'admin':
                    navigate('/admin/dashboard', {replace: true});
                    break;
                default:
                    setErrorMessage("Invalid role!");
            }

        } catch (error) {
            setErrorMessage(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="sign-body">
            <SignInContainer>
                <ImageContainer>
                    <StyledImage src={LoginImage} alt="Sign In" />
                </ImageContainer>
                <LoginFormContainer>
                    <Title>DEIE UGP Management System</Title>
                    <FormContainer>
                        <Topic>Login</Topic>
                        <input className='userN'
                            type='text'
                            placeholder='Username'
                            id='username'
                            onChange={handleChange}
                            required
                        />
                        <input className='passW'
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
                        >
                            {loading ? "Loading..." : "Login"}
                        </SubmitButton>
                        <Regs to="/Register" type='button'>Register</Regs>
                    </FormContainer>
                    {errorMessage && (
                        <Alert sx={{ mt: 5 }} severity="error" icon={<ErrorIcon />}>
                            {errorMessage}
                        </Alert>
                    )}
                </LoginFormContainer>
            </SignInContainer>
        </div>
    )
}

export default UnifiedSignIn;

