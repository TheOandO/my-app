import { Avatar, Box, Button, Flex, HStack, VStack, Text, InputGroup, Input, InputRightElement, useToast } from "@chakra-ui/react";
import { LoggedinHeader } from "./admin/AdminHome.page";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
  
interface User{
  name: string,
  username: string,
  email: string,
  password: string,
  faculty_id: string,
  roles: string
}
interface Faculty {
  _id: string;
  name: string;
  marketing_coordinator_id: string;
}

function ProfileCard() {
  const [user, setUser] = useState<User>({
    name: '',
    username: '',
    email: '',
    password: '',
    faculty_id: '',
    roles: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const toast = useToast();
  const userDataString = localStorage.getItem('user');
  const userData = userDataString ? JSON.parse(userDataString) : null; // Parse user data
  const userId = userData ? userData._id : ''; // Extract ID from user data

  const accessToken = localStorage.getItem('access_token');

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/user/get-by-id/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      console.log(response.data);
      setUser(response.data.user);

    } catch (error) {
      console.error("Error fetching User:", error);
      toast({
        title: "User non-existance",
        description: "Cannot find user",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

  };

  useEffect(() => {
    fetchUser();
    fetchFaculties();
  }, []);

  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const fetchFaculties = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/faculty/get-all"
      );
      setFaculties(response.data.data);
    } catch (error) {
      console.log("Error fetching faculties");
    }
  };
  const findFacultyName = (facultyId: string): string => {
    const faculty = faculties.find((f) => f._id === facultyId);
    return faculty ? faculty.name : 'Unknown Faculty';
  };

  return (
    <VStack spacing={4} align="flex-start" w="100%" bg="#fff" m='10'>
      <Box bg='#869876' p={4} borderRadius="lg" w="100%">
        <HStack spacing={4} align="center">
          <Avatar name={user.name} src={user.name} size="xl" />
          <VStack spacing={0} align="flex-start">
            <Text fontWeight="bold" fontSize="2xl" color="#fff">
              {user.name}
            </Text>
            <Text fontSize="md" color="#fff">
              Student of {findFacultyName(user.faculty_id)}
            </Text>
          </VStack>
        </HStack>
      </Box>

      <Box bg='#869876' p={4} borderRadius="lg" w="100%">
        <VStack spacing={4} align="flex-start">
          <Text fontSize="4xl" fontWeight="bold" color="#fff" mb={2}>
            Personal information
          </Text>
          <HStack justifyContent="space-between" w="full" fontSize="xl">
            <Text color="#fff">Name</Text>
            <Text color="#fff">{user.name}</Text>
          </HStack>
          <HStack justifyContent="space-between" w="full" fontSize="xl">
            <Text color="#fff">Username</Text>
            <Text color="#fff">{user.username}</Text>
          </HStack>
          <HStack justifyContent="space-between" w="full" fontSize="xl">
            <Text color="#fff">Email</Text>
            <Text color="#fff">{user.email}</Text>
          </HStack>
          <HStack justifyContent="space-between" w="full" fontSize="xl">
            <Text color="#fff">Role</Text>
            <Text color="#fff">{user.roles}</Text>
          </HStack>
          <HStack justifyContent="space-between" w="full" fontSize="xl">
            <Text color="#fff">Faculty</Text>
            <Text color="#fff">{findFacultyName(user.faculty_id)}</Text>
          </HStack>
          <VStack justifyContent="space-between" w="full" alignItems="flex-start" fontSize="xl">
            <Text color="#fff">Password</Text>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={showPassword ? 'text' : 'password'}
                value={user.password}
                isReadOnly
                color="#fff" />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={toggleShowPassword} colorScheme="green">
                  {showPassword ? <ViewOffIcon color="#fff" /> : <ViewIcon color="#fff" />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </VStack>
        </VStack>

      </Box>
    </VStack>
  );
}
  

function MyAccount() {

    return(
        <Box>
            <LoggedinHeader />
            <Flex>
                <ProfileCard/>
            </Flex>
        </Box>
    )
}

export default MyAccount