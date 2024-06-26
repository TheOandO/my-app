import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useColorModeValue,
  Heading,
  Alert,
  Link,
  AlertIcon,
  Text
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedinHeader } from "./AdminHome.page";

interface UserFormData {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  facultyId: string;
  [key: string]: string;
}

interface Faculty {
  _id: string;
  name: string;
  marketing_coordinator_id: string;
}

enum UserRole {
  Student = "student",
  MarketingManager = "marketingManager",
  MarketingCoordinator = "marketingCoordinator",
  Admin = "admin",
  Guest = "guest",
}
const AddForm: React.FC = () => {
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    username: "",
    role: "",
    facultyId: "",
  });
  const navigate = useNavigate();
  const url = 'http://localhost:3001/'
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchFaculties = async () => {
    try {
      const response = await axios.get(url + "api/faculty/get-all");
      console.log("Faculty API Response:", response.data);
      setFaculties(response.data.data);
    } catch (error) {
      setErrorMessage("Error fetching faculties");
      setShowError(true);
      setTimeout(() => setShowError(false), 10000);
    }
  };

  const [userRole, setUserRole] = useState('');
  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        // Make a request to the /validate endpoint to check token validity
        await axios.post(url + "api/user/validate", {
          access_token: localStorage.getItem('access_token'),
          user: localStorage.getItem('user'),
          
        },);
        
        const userDataString = localStorage.getItem('user');
        const userData = JSON.parse(userDataString || '');
        const userRole = userData.roles;
        setUserRole(userRole);
  
      } catch (error) {
        console.error("Error validating token:", error);
        // If token is invalid or expired, attempt to refresh it
        try {
          const refreshResponse = await axios.post(url + "api/user/refresh", {
            user: localStorage.getItem('user'),
          });
  
          console.log(refreshResponse.data.message);
          localStorage.setItem('access_token', refreshResponse.data.access_token);
          setUserRole(refreshResponse.data.user.roles);
          
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          // If refresh fails, redirect the user to the login page
          setShowError(true)
          setErrorMessage('Error refreshing token')
  
        }
      }
    }
    checkTokenValidity();
    fetchFaculties();
  }, []);

  // Form submission handler
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post(url + "api/user/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        username: formData.username,
        role: formData.role,
        faculty_id: formData.facultyId,
      });

      navigate("/admin/members");
    } catch (error: any) {
      console.error("Error signing up:", error.response.data);
      // Handle errors, such as displaying an error message to the user
      setErrorMessage("Error Registering");
      setShowError(true);
      setTimeout(() => setShowError(false), 5000); // Hide error notification after 5 seconds
    }
  };

  return (
    
    <form onSubmit={handleFormSubmit}>
      {showError && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          {errorMessage}
          <Link href='/login' ml={10}>
            <Text fontStyle='italic'>Go to the Login Page</Text>
          </Link>
        </Alert>
      )}
      {userRole.includes('admin') && (
        <>
      <VStack spacing={4}>
        <Heading as="h1" size="2xl" color="#2d4b12" my={4}>
          Add an account
        </Heading>
        <FormControl id="fullName">
          <FormLabel>Full name</FormLabel>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="role">
          <FormLabel>Role</FormLabel>
          <Select
            placeholder="Select role"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value={UserRole.Student}>Student</option>
            <option value={UserRole.MarketingManager}>Marketing Manager</option>
            <option value={UserRole.MarketingCoordinator}>
              Marketing Coordinator
            </option>
            <option value={UserRole.Admin}>Administrator</option>
            <option value={UserRole.Guest}>Guest</option>
          </Select>
        </FormControl>

        <FormControl id="faculty">
          <FormLabel>Faculty</FormLabel>
          <Select
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
          </Select>
        </FormControl>
        <Button
          type="submit"
          bg="#2d4b12"
          color="white"
          variant="outline"
          _hover={{
            bg: "#fff",
            color: "#2d4b12",
            transform: "translateY(-2px)",
          }}
          width="full"
          transition="background-color 0.2s, box-shadow 0.2s, transform 0.2s"
          _focus={{ boxShadow: "none" }}
          mt={10}
        >
          Sign up
        </Button>
      </VStack>
      </>
      )}
    </form>
  );
};

function Add() {
  // For gradient background
  const formBackground = useColorModeValue("white", "gray.700");

  return (
    <Box
      bgGradient="linear(to-t, #e1f5dd, rgba(44, 44, 44, 0.1))"
      minH="100vh"
      px={6}
    >
      <LoggedinHeader />
      <VStack spacing={8} mx="auto" maxW="xl" px={6} mt={200}>
        <Box
          borderRadius="lg"
          boxShadow="lg"
          bg={formBackground}
          p={8}
          minW={{ base: "90%", md: "468px" }}
        >
          <AddForm />
        </Box>
      </VStack>
    </Box>
  );
}

export default Add;
