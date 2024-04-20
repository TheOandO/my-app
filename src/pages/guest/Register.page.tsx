import React, { useState } from "react";
import {
  LoginPageContainer,
  RegImageContainer,
  LoginFormContainer,
  Logo,
  Label,
  Input,
  SubmitButton,
  Divider,
  SocialIconsContainer,
  FooterLinksContainer,
  FooterLink,
  SignUpLink,
  SignUpText,
} from "../../components/Login.styles";
import { Alert, AlertIcon } from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      console.log(response.data); // Log the response data
      navigate("/login");
    } catch (error: any) {
      console.error("Error signing up:", error.response.data);
      // Handle errors, such as displaying an error message to the user
      setErrorMessage("Error Registering");
      setShowError(true);
      setTimeout(() => setShowError(false), 5000); // Hide error notification after 5 seconds
    }
  };

  return (
    <LoginPageContainer>
      <RegImageContainer />
      <LoginFormContainer>
        <a href="/">
          <Logo src={logo} alt="Logo" />
        </a>
        {/* Replace with your logo path */}
        <form onSubmit={handleSubmit}>
          {showError && (
            <Alert status="error" mt={4}>
              <AlertIcon />
              {errorMessage}
            </Alert>
          )}
          <Label htmlFor="name">Full Name</Label>
          <Input
            type="name"
            id="name"
            name="name"
            placeholder=""
            required
            value={formData.name}
            onChange={handleChange}
          />
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder=""
            required
            value={formData.email}
            onChange={handleChange}
          />

          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder=""
            required
            value={formData.password}
            onChange={handleChange}
          />
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder=""
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <SubmitButton type="submit">Create Account</SubmitButton>
        </form>
        <SignUpText>Have an account?</SignUpText>
        <SignUpLink href="/login">Sign in</SignUpLink>
        <FooterLinksContainer>
          <FooterLink href="#">Contact</FooterLink>
        </FooterLinksContainer>
      </LoginFormContainer>
    </LoginPageContainer>
  );
};

export default Register;
