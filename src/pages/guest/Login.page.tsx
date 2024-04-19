import React, { useState } from "react";
import { CheckboxContainer, Divider, FooterLink, FooterLinksContainer, ForgotPasswordLink, LoginImageContainer, Input, Label, LoginFormContainer, LoginPageContainer, Logo, Checkbox, SocialIconsContainer, SubmitButton, CheckboxLabel, SignUpLink, SignUpText, SocialIcons, SocialIconsLink } from "../../components/Login.styles"
import { Alert, AlertIcon } from '@chakra-ui/react';
import logo from '../../assets/logo.png'
import axios from "axios";


const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    
    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
    
        try {
            // Make a POST request to your backend API
            const response = await axios.post('http://localhost:3001/login', {
                username: email,
                password: password
            });
    
            // Handle the response
            console.log(response.data); // Log the response data
            // You can perform additional actions here, such as storing tokens in local storage or redirecting the user
    
        } catch (error) {
            console.error('Error logging in:', error);
            setShowError(true);
            setTimeout(() => setShowError(false), 5000);
        }
    };

    return (
        <LoginPageContainer>
            <LoginImageContainer />
            <LoginFormContainer>
                <Logo src={logo} alt="Logo" />
                    <form onSubmit={handleLogin}>
                        {showError && (
                            <Alert status="error" mt={4}>
                                <AlertIcon />
                                Login failed. Please check your username and password.
                            </Alert>
                        )}
                        <Label htmlFor="email">Enter your school email</Label>
                        <Input type="email" id="email" name="email" placeholder="" required onChange={(e) => setEmail(e.target.value)}/>

                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" name="password" placeholder="" required onChange={(e) => setPassword(e.target.value)}/>

                        <CheckboxContainer>
                            <div>
                                <Checkbox type="checkbox" id="remember-me" value="Remember Me"/>
                                    <CheckboxLabel htmlFor="remember-me">Remember me</CheckboxLabel>
                            </div>
                            <ForgotPasswordLink href="#">Forgot password?</ForgotPasswordLink>
                        </CheckboxContainer>

                        <SubmitButton type="submit">Sign in</SubmitButton>


                        <Divider>Or sign in with</Divider>

                        <SocialIconsContainer>
                            <SocialIconsLink href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <SocialIcons src="../FB.png" alt="Facebook" />
                            </SocialIconsLink>
                            <SocialIconsLink href="https://www.google.com" target="_blank" rel="noopener noreferrer">
                                <SocialIcons src="../mail.png" alt="Google" />
                            </SocialIconsLink>
                        </SocialIconsContainer>
                    </form>
                        <SignUpText>Don't have an account?</SignUpText>
                        <SignUpLink href="/register">Sign up</SignUpLink>
            <FooterLinksContainer>
                <FooterLink href="#">Contact</FooterLink>
            </FooterLinksContainer>
            </LoginFormContainer>

        </LoginPageContainer>
        
    )
}

export default Login