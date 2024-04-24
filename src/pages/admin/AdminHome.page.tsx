import {
  Avatar,
  Box, Button, Divider, Flex, Heading, Icon, Link, Select, SimpleGrid, Spacer, Stat, StatLabel, StatNumber, VStack, Image, IconButton, Tooltip,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { Footer, Quote, DiscussionPage } from '../guest/Home.page' 
import { FaUser, FaNewspaper, FaBell, FaCalendarDay, FaCog, FaEnvelopeOpenText, FaAnchor, FaAtlas } from 'react-icons/fa';
import { AddIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { differenceInDays, format } from 'date-fns';
export function LoggedinHeader() {
  const userDataString = localStorage.getItem('user');
  const userData = userDataString ? JSON.parse(userDataString) : null; // Parse user data
  const studentId = userData ? userData._id : ''; // Extract ID from user data
  const [href, setHref] = useState('/');

  useEffect(() => {
    const currentPath = window.location.pathname.toLowerCase();
    if (currentPath.includes('/mm')) {
      setHref('/mm');
    } else if (currentPath.includes('/admin')) {
      setHref('/admin');
    } else if (currentPath.includes('/mc')) {
      setHref('/mc');
    } else if (currentPath.includes('/')) {
      setHref('/');
    } else if (currentPath.includes('/student')) {
      setHref('/student');
    } else {
      setHref('/');
    }
  }, []);

  return (
    <Flex as="header" align="center" padding="1rem" bg="transparent" boxShadow="sm" width="100%">
      <Link href={href}>
        <Box p="2">
          <Image src={logo} alt="Website logo" boxSize="70px" ml="4" />
        </Box>
      </Link>

      <Spacer /> {/* This pushes all elements to the right and left sides of the header */}

      <Flex alignItems="center" ml="auto" mr="auto">
        <Box display="flex" alignItems="center">
          {/* This container will group the navigation links, language selector, and avatar */}
          <Link href={href} px="3" py="1" rounded="md" _hover={{ textDecoration: 'none', bg: 'gray.100' }} mr={20}>
            Home
          </Link>
          
          <Link href="/Newsfeed" px="3" py="1" rounded="md" _hover={{ textDecoration: 'none', bg: 'gray.100' }} mr={20}>
            Newsfeed
          </Link>

          <Link href="/Login" px="3" py="1" rounded="md" _hover={{ textDecoration: 'none', bg: 'gray.100' }} mr={20}>
            <Button>
              Logout              
            </Button>
          </Link>

          {/* Avatar for logged in account */}
          <Link href={`/MyAccount/${studentId}`}>
            <Avatar name="My Account" src="path-to-admin-avatar.jpg" size="md" />
          </Link>
          
        </Box>
      </Flex>
    </Flex>
  );
}

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  roles: string;
  faculty_id: string;
  username: string;
  createdAt: string
}

interface Article {
  _id: string;
  text: string;
  files: string;
  images: string;
  entryId: string;
  school_yearId: string;
  studentId: string;
  term_condition: string;
}

export function Overview() {

  const [users, setUsers] = useState<User[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [endTime, setEndTime] = useState(Number);
  const [schoolYears, setSchoolYears] = useState(Number);
  const accessToken = localStorage.getItem('access_token');

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/user/get-all",{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }          
        }
      );
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/article/get-all",{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }          
        }
      );

      setArticles(response.data.data);
      
    } catch (error) {
      console.error("Error fetching Articles:", error);
    }
  };

  const fetchSchoolYear = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/school-year/get-all",{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }          
        }
      );
      if (response.data.data.length > 0) {
        const endTerm = response.data.data[0].end_time 
        const daysUntilEndTerm = differenceInDays(new Date(endTerm), new Date());
        setEndTime(daysUntilEndTerm);
        setSchoolYears(endTerm)
      }
      

    } catch (error) {
      console.error("Error fetching School Years:", error);
    }
  };


  useEffect(() => {
    fetchSchoolYear()
    fetchUsers()
    fetchArticles()
  }, [])

  return (
    <Box bg="#d9e6d3" p={6} borderRadius="lg" boxShadow="xl">
      <Heading as="h3" size="lg" textAlign="center" mb={6} color="#1d4732">
        Statistics overview
      </Heading>
      <Divider mb={6} />
      <SimpleGrid columns={2} spacing={10}>
        {/* Statistics column */}
        <VStack spacing={4} align="stretch">
          <Stat >
            <StatLabel fontSize='3xl'><Icon as={FaUser} mr={2} />Total accounts</StatLabel>
            <Link href='/Admin/Members'>
              <StatNumber textDecoration='underline'>{users.length}</StatNumber>
            </Link>

          </Stat>
          <Stat>
            <StatLabel fontSize='3xl'><Icon as={FaNewspaper} mr={2} />Total articles</StatLabel>
            <Link href='/Newsfeed'>
              <StatNumber textDecoration='underline'>{articles.length}</StatNumber>
            </Link>
          </Stat>
          <Stat>
            <StatLabel fontSize='3xl'><Icon as={FaBell} mr={2} />Days until the end of Academic Year</StatLabel>
            <StatNumber>{endTime}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel fontSize='3xl'><Icon as={FaCalendarDay} mr={2} />Term end date</StatLabel>
            <StatNumber>{format(schoolYears, 'MMMM dd yyyy')}</StatNumber>
          </Stat>
        </VStack>

        {/* Buttons column */}
        <VStack spacing={8} align="stretch">
          <Link href='/Admin/Members'>
            <Button leftIcon={<FaCog />} bg="#869876" color='#fff' variant="ghost" colorScheme='green' _hover={{ bg: "#fff", color: '#2d4b12' }} _focus={{ boxShadow: "none" }} h={50} w={250} mb={5} borderRadius={12} fontSize='xl'>
              Manage accounts
            </Button>
          </Link>
          <Link href='/Admin/ViewTopics'>
            <Button leftIcon={<FaAnchor />} bg="#869876" color='#fff' variant="ghost" colorScheme='green' _hover={{ bg: "#fff", color: '#2d4b12' }} _focus={{ boxShadow: "none" }} h={50} w={250} mb={5} borderRadius={12} fontSize='xl'>
              View topics
            </Button>
          </Link>

          <Link href='/Admin/Add'>
            <Button leftIcon={<FaAtlas />} bg="#869876" color='#fff' variant="ghost" colorScheme='green' _hover={{ bg: "#fff", color: '#2d4b12' }} _focus={{ boxShadow: "none" }} h={50} w={250} mb={5} borderRadius={12} fontSize='xl'>
              Add an Account
            </Button>
          </Link>
          <Link href='/MyAccount/'>
            <Button leftIcon={<FaUser />} bg="#869876" color='#fff' variant="ghost" colorScheme='green' _hover={{ bg: "#fff", color: '#2d4b12' }} _focus={{ boxShadow: "none" }} h={50} w={250} mb={5} borderRadius={12} fontSize='xl'>
              My account
            </Button>
          </Link>

        </VStack>
      </SimpleGrid>
    </Box>
  );
}



function Homepage() {
  const [userRole, setUserRole] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        // Make a request to the /validate endpoint to check token validity
        await axios.post("http://localhost:3001/api/user/validate", {
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
          const refreshResponse = await axios.post("http://localhost:3001/api/user/refresh", {
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
  }, [])
  const navigate = useNavigate();
  const handleAddButtonClick = () => {
    navigate('/Admin/CreateTopic');
  };
  return (
    <Box>
      {showError && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
      {userRole.includes('admin') && (
        <>
          <LoggedinHeader></LoggedinHeader>
          <Quote></Quote>
          <Overview></Overview>
          <DiscussionPage></DiscussionPage>
          <Footer></Footer>
          <Tooltip label="Add a topic" fontSize="md" placement="left" hasArrow>
          <IconButton
            aria-label="Add new topic"
            icon={<AddIcon />}
            bg="#426B1F"
            color='#fff'
            variant="solid"
            size="lg"
            colorScheme='green'
            isRound={true}
            position="fixed"
            bottom="1em" // Adjust the distance from the bottom
            right="1em" // Adjust the distance from the right
            zIndex="tooltip" // Ensure the button is above most other items
            onClick={handleAddButtonClick}
            boxShadow="0px 4px 12px rgba(0, 0, 0, 0.15)"
            width="80px" // Set a specific width
            height="80px" // Set a specific height
            fontSize="40px"
          /></Tooltip>
        </>
      )}
    </Box>

  );
}

export default Homepage