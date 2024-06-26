import React, { useState, useEffect } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  useToast,
  HStack,
  useColorModeValue,
  Divider,
  Heading,
  Alert,
  AlertIcon,
  Link,
  Text,
  Select
} from "@chakra-ui/react";
import { LoggedinHeader } from "./AdminHome.page";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';

interface Faculty {
  _id: string;
  name: string;
  marketing_coordinator_id: string;
}
interface EntryFormData {
  name: string;
  dateline1: string;
  dateline2: string;
  facultyId: string;
  [key: string]: string;
}

const CreateTopic: React.FC = () => {

  const toast = useToast();
  const url = 'http://localhost:3001/'

  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [formData, setFormData] = useState<EntryFormData>({
    name: "",
    dateline1: "",
    dateline2: "",
    facultyId: "",
  });

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setStartDate(date);
  };
  
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setEndDate(date);
  };

  const fetchFaculties = async () => {
    try {
      const response = await axios.get(
        url + "api/faculty/get-all"
      );
      console.log("Faculty API Response:", response.data);
      setFaculties(response.data.data);
    } catch (error) {
      setErrorMessage("Error fetching faculties");
      setShowError(true);
      setTimeout(() => setShowError(false), 10000);
    }
  };

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    try {
      await axios.post(url + "api/entry/create", {
        name: formData.name,
        dateline1: startDate,
        dateline2: endDate,
        faculty_id: formData.facultyId,
      });

      navigate('/admin/viewtopics')
    } catch (error: any) {
      console.error("error adding topic", error.res.data);
      toast({
        title: "Error adding topic.",
        description: error.res.data,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    toast({
      title: "Topic created.",
      description: "We've created your topic for you.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    // After submission clear the form
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const formBackground = useColorModeValue("white", "white.500.700");
  return (
    <Box
      bgGradient="linear(to-t, #e1f5dd, rgba(44, 44, 44, 0.1))"
      minH="100vh"
      px={6}
    >
      <LoggedinHeader />
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
      <VStack spacing={8} mx="auto" maxW="xl" px={6} mt={200} mb={200}>
        <Box
          borderRadius="lg"
          boxShadow="lg"
          bg={formBackground}
          p={8}
          width={{ base: "90%", md: "768px" }}
        >
          <Heading
            as="h2"
            size="lg"
            mb={4}
            textColor="#426B1F"
            textAlign="center"
          >
            Create a Topic
          </Heading>

          <Divider my={4} borderColor="#426B1F" width="100%" />

          <VStack as="form" onSubmit={handleSubmit} spacing={6}>
            <FormControl id="topic-title" isRequired>
              <FormLabel>Topic title</FormLabel>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Boxed water is better!!!!"
                required
                value={formData.name}
                onChange={handleChange}
                maxLength={50}
              />
            </FormControl>

            <FormControl id="facultyId" isRequired>
              <FormLabel>Select Faculty</FormLabel>
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
            <FormControl id="SDate">
              <FormLabel>Start date</FormLabel>
              <input
                type="date"
                value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
                onChange={handleStartDateChange}
              />
            </FormControl>
            <FormControl id="EDate">
              <FormLabel>End date</FormLabel>
              <input
                type="date"
                value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
                onChange={handleEndDateChange}
              />
            </FormControl>
            <HStack width="full" justifyContent="space-between">
              <Button
                width="full"
                mr={2}
                onClick={handleBack}
                colorScheme="#f7f7f7"
                color="#2d4b12"
                variant="ghost"
              >
                Back
              </Button>
              <Button
                onClick={(e) => handleSubmit(e)}
                width="full"
                ml={2}
                colorScheme="green"
                bg="#2d4b12"
                color="white"
                variant="ghost"
                _hover={{
                  bg: "grey",
                  color: "#2d4b12",
                  transform: "translateY(-2px)",
                }}
                _focus={{ boxShadow: "none" }}
                transition="background-color 0.2s, box-shadow 0.2s, transform 0.2s"
              >
                Accept
              </Button>
            </HStack>
          </VStack>
        </Box>
      </VStack>
      </>
      )}
    </Box>
  );
};

export default CreateTopic;
