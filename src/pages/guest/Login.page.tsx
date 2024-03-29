import React, { useState } from "react";
import { CheckboxContainer, Divider, FooterLink, FooterLinksContainer, ForgotPasswordLink, LoginImageContainer, Input, Label, LoginFormContainer, LoginPageContainer, Logo, Checkbox, SocialIconsContainer, SubmitButton, CheckboxLabel, SignUpLink, SignUpText, SocialIcons, SocialIconsLink } from "../../components/Login.styles"
import logo from '../../assets/logo.png'


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
                <Logo src={logo} alt="Logo" />
                    <form>
                        <Label htmlFor="email">Enter your school email</Label>
                        <Input type="email" id="email" name="email" placeholder="" required />

                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" name="password" placeholder="" required />

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