import React, { useState } from "react";
import styled from "styled-components";
import { CheckboxContainer, Divider, FooterLink, FooterLinksContainer, ForgotPasswordLink, LoginImageContainer, Input, Label, LoginFormContainer, LoginPageContainer, Logo, Checkbox, SocialIconsContainer, SubmitButton, CheckboxLabel } from "../components/Login.styles"
import { Link } from "react-router-dom";

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
`;

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        // Insert login logic here

    };

    return (
        <LoginPageContainer>
            <LoginImageContainer />
            <LoginFormContainer>
                <Logo src="../logo.jpg" alt="Logo" /> {/* Replace with your logo path */}
                    <form>
                        <Label htmlFor="email">Email address</Label>
                        <Input type="email" id="email" name="email" placeholder="Enter your email" required />

                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" name="password" placeholder="Enter your password" required />

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
                            <img src="/path-to-facebook-icon.png" alt="Facebook" />
                            <img src="/path-to-google-icon.png" alt="Google" />
                            <img src="/path-to-twitter-icon.png" alt="Twitter" />
                        </SocialIconsContainer>
                    </form>

            <FooterLinksContainer>
                <FooterLink as={Link} to="../register">Sign up</FooterLink>
                <FooterLink href="#">Contact</FooterLink>
            </FooterLinksContainer>
            </LoginFormContainer>
        </LoginPageContainer>
    )
}

export default Login