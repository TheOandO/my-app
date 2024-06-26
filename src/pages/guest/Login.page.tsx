import React, { useState } from "react";
import {
  FooterLink,
  FooterLinksContainer,
  LoginImageContainer,
  Input,
  Label,
  LoginFormContainer,
  LoginPageContainer,
  Logo,
  SubmitButton,
  SignUpLink,
  SignUpText,
} from "../../components/Login.styles";
import { Alert, AlertIcon, useToast } from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const url = 'http://localhost:3001/'

  const toast = useToast()
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Make a POST request to your backend API
      const response = await axios.post(url + "api/user/login", {
        username: username,
        password: password,
      });


  
      // Store the access token in local storage
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      // Navigate to the appropriate page based on the user's role
      switch (true) {
        case response.data.user.roles.includes("student"):
          navigate("/student");
          break;
        case response.data.user.roles.includes("marketingManager"):
          navigate("/MM");
          break;
        case response.data.user.roles.includes("marketingCoordinator"):
          navigate("/MC");
          break;
        case response.data.user.roles.includes("admin"):
          navigate("/admin");
          break;
        default:
          toast({
            title: "Unhandled Role",
            description: "Your role is not recognized. Please contact support.",
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
          break;
      }
    } catch (error) {
      console.error("Error logging in:", error);
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
          <Label htmlFor="username">Enter your school username</Label>
          <Input
            type="username"
            id="username"
            name="username"
            placeholder=""
            required
            onChange={(e) => setUsername(e.target.value)} />

          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder=""
            required
            onChange={(e) => setPassword(e.target.value)} />

          <SubmitButton type="submit">Sign in</SubmitButton>

        </form>
        <SignUpText>Don't have an account?</SignUpText>
        <SignUpLink href="/register">Sign up</SignUpLink>
        <FooterLinksContainer>
          <FooterLink href="#">Contact</FooterLink>
        </FooterLinksContainer>
      </LoginFormContainer>
    </LoginPageContainer>
  );
}

export default Login;
