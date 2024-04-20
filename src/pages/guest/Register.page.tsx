import React, { useEffect, useState } from "react";
import {
  LoginPageContainer,
  RegImageContainer,
  LoginFormContainer,
  Logo,
  Label,
  Input,
  SubmitButton,
  FooterLinksContainer,
  FooterLink,
  SignUpLink,
  SignUpText,
} from "../../components/Login.styles";
import { Alert, AlertIcon } from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface UserFormData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  facultyId: string;
  [key: string]: string;
}

interface Faculty {
  _id: string;
  name: string;
}

enum UserRole {
  Student = "student",
  MarketingManager = "marketingManager",
  MarketingCoordinator = "marketingCoordinator",
  Admin = "admin",
  Guest = "guest",
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    role: UserRole.Student,
    facultyId: "",
  });
  const navigate = useNavigate();

  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchFaculties();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "facultyId" ? value : prevState[name],
    }));
  };

  const fetchFaculties = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/faculty/get-all");
      if (response.data && response.data.faculties) {
        console.log("Faculty API Response:", response.data);
        setFaculties(response.data.faculties);
      } else {
        console.error("No faculties data found in the response:", response.data);
        setErrorMessage("No faculties data found");
        setShowError(true);
        setTimeout(() => setShowError(false), 5000);
      }} catch (error) {
      setErrorMessage("Error fetching faculties");
      setShowError(true);
      setTimeout(() => setShowError(false), 10000);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/user/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        username: formData.username,
        role: formData.role,
        facultyId: formData.facultyId,
      });

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
          type="text"
          id="name"
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <Label htmlFor="email">Email address</Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Email Address"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          required
          value={formData.username}
          onChange={handleChange}
        />
        <Label htmlFor="role">Role</Label>
        <Input
          type="text"
          id="role"
          name="role"
          placeholder=""
          required
          value={UserRole.Student}
          disabled
        />  
        <Label htmlFor="facultyId">Faculty</Label>
        {faculties && (
          <select
            id="facultyId"
            name="facultyId"
            value={formData.facultyId}
            onChange={handleChange}
          >
            <option value="">Select Faculty</option>
            {faculties.map((faculty) => (
              <option key={faculty._id} value={faculty._id}>
                {faculty.name}
              </option>
            ))}
          </select>
        )}
        <SubmitButton type="submit">Register</SubmitButton>
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
