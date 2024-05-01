import {
    Box,
    Flex,
    Text,
    VStack,
    Heading,
    SimpleGrid,
    IconButton,
    Circle,
    List,
    ListItem,
    Tag,
    Button,
    Tooltip,
    Link,
    HStack,
    Alert,
    AlertIcon
  } from '@chakra-ui/react';
import { AddIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { LoggedinHeader } from '../admin/AdminHome.page';
import { Quote } from '../guest/Home.page';
import { DiscussionPage } from '../guest/Home.page';
import { Footer } from '../guest/Home.page';
import React, { useEffect, useState } from 'react';
import { addMonths, subMonths, format, startOfWeek, startOfMonth, endOfMonth, endOfWeek, eachDayOfInterval, differenceInDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Schema } from 'mongoose';


interface Topic {
  name: string,
  dateline1: Date,
  dateline2: Date,
  faculty_id: Schema.Types.ObjectId
}
interface Faculty {
  _id: string;
  name: string;
  marketing_coordinator_id: string;
}

export function Topics() {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  type StatusType = 'In progress' | 'Expired' | 'Upcoming';

  // Status button component
  const StatusButton : React.FC<{ status: StatusType }> = ({ status }) => {
    let color = 'gray';
    if (status === 'In progress') color = '#426B1F';
    if (status === 'Expired') color = '#6B1F1F';
    if (status === 'Upcoming') color = '#BEC05B';
    
    return <Tag fontSize="lg" fontWeight='bold' width='140px' height='50px' display='flex' alignItems='center' justifyContent='center' borderRadius="full" variant="solid" bg={color} color='white'>{status}</Tag>;
  };

  const [topics, setTopics] = useState<Topic[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const url = 'http://localhost:3001/'

  const fetchFaculties = async () => {
    try {
      const response = await axios.get(
        url + "api/faculty/get-all"
      );
      setFaculties(response.data.data);
    } catch (error) {
      setErrorMessage("Error fetching faculties");
      setShowError(true);
      setTimeout(() => setShowError(false), 10000);
    }
  };

  const fetchTopics = async () => {
    try {
      const response = await axios.get(url + "api/entry/get-all");

      const currentDate = new Date();
      const updatedTopics = response.data.data.map((topic: Topic) => {
        const { dateline1, dateline2 } = topic;
        const parsedDate1 = new Date(dateline1);
        const parsedDate2 = new Date(dateline2);

        let status: 'In progress' | 'Expired' | 'Upcoming' | 'Unknown' = 'Unknown';
        if (currentDate > parsedDate2) {
          status = 'Expired';
        } else if (currentDate >= parsedDate1 && currentDate <= parsedDate2) {
          status = 'In progress';
        } else if (currentDate < parsedDate1) {
          status = 'Upcoming';
        }
        return { ...topic, status };
      });

      setTopics(updatedTopics);
    } catch (error) {
      console.error("Error fetching topics:", error);
      setErrorMessage("Error fetching topics");
      setShowError(true);
    }
  };  
  
  useEffect(() => {
    fetchFaculties();
    fetchTopics();
  }, []);

  // Function to find faculty name by faculty id
  const findFacultyName = (facultyId: string): string => {
    const faculty = faculties.find((f) => f._id === facultyId);
    return faculty ? faculty.name : 'Unknown Faculty';
  };

 // Function to calculate the difference between dates and format the message
 const formatDatelineMessage = (status: StatusType, dateline1: Date, dateline2: Date): string => {
  const currentDate = new Date();
  let difference = 0;

  if (status === 'In progress') {
    difference = differenceInDays(dateline2, currentDate);
    return `Ends in ${difference} day${difference !== 1 ? 's' : ''}`;
  } else if (status === 'Upcoming') {
    difference = differenceInDays(dateline1, currentDate);
    return `Starts in ${difference} day${difference !== 1 ? 's' : ''}`;
  } else if (status === 'Expired') {
    difference = differenceInDays(currentDate, dateline2);
    return `Ended ${difference} day${difference !== 1 ? 's' : ''} ago`;
  }

  return '';
};

return (
  <VStack spacing={4} alignItems="center" p={5} bg='white' flex={1}>
    {showError && (
      <Alert status="error" mt={4}>
        <AlertIcon />
        {errorMessage}
      </Alert>
    )}
    <Heading fontSize="4xl" mb={4} color='#426B1F'>Topics</Heading>
    <List spacing={6} width="100%" minH={200} h={500} overflowY='auto' minW={700}>
      {topics.map((topic: any) => (
        <ListItem key={topic._id}>
          <Flex align="center" bg="white" p={4} borderRadius="lg" boxShadow="base" _hover={{ transform: "translateY(-4px)", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }} transition="background-color 0.2s, box-shadow 0.2s transform 0.4s">
            <Box flex="1">
              <Text fontWeight="bold" fontSize='3xl' color='#426b1f'>{topic.name}</Text>
              <Text fontSize="md" fontStyle='italic'>{formatDatelineMessage(topic.status, topic.dateline1, topic.dateline2)}</Text>
              <Text fontSize="md" color="gray.600">Faculty: {findFacultyName(topic.faculty_id)}</Text>            
            </Box>
            <StatusButton status={topic.status} />
          </Flex>
        </ListItem>
      ))}
    </List>
    
  </VStack>  
)

}

function Dashboard() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Functions to handle month navigation
  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Calculate the start and end of the month and week
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  // Get all days in the month interval
  const dateFormat = "d";
  const daysOfWeek = eachDayOfInterval({ start: startDate, end: endDate });

  // Get today's date for highlighting
  const today = new Date();


  return (
    <Flex direction={['column', 'row']} width="100%">
      <Flex direction={['column', 'row']} p={6} bg='#BBC8B0' flex={2} justifyContent='center'>
        {/* Left side: Weather section */}
          <VStack bg="#869876" p={5} borderRadius="lg" boxShadow="lg" spacing={5} align="flex-start" minW="400px">
            <Heading fontSize="7xl" color="#fff">Good <br/>morning!</Heading>
            <Text fontSize="xl" color="#575757">{`Hanoi, ${format(new Date(), 'dd MMMM, yyyy')}`}</Text>
            <Flex align="center">
              <Text fontSize="8xl" color="#fff" mr={4}>☁️🌞</Text> {/* Weather icon */}
              <VStack align="start">
                <Text fontSize="6xl" color="#fff">30°/86°</Text> {/* Temperature */}
                <Text fontSize="4xl" color="#fff">Cloudy</Text> {/* Condition */}
              </VStack>
            </Flex>
          </VStack>
        {/* Right side: Calendar section */}
        <Box bg="white" p={5} borderRadius="lg" boxShadow="lg" ml={[0, 5]} mt={[5, 0]} flex="1" maxW="600px">
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <IconButton aria-label="Previous month" icon={<ChevronLeftIcon />} onClick={previousMonth} />
            <Heading as="h3" size="lg">
              {format(currentMonth, 'MMMM yyyy')}
            </Heading>
            <IconButton aria-label="Next month" icon={<ChevronRightIcon />} onClick={nextMonth} />
          </Flex>

          <SimpleGrid columns={7} spacing={1} width="full">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
              <Text key={day} textAlign="center" fontSize="md" fontWeight="bold">{day}</Text>
            ))}
            {daysOfWeek.map(day => {
              let inCurrentMonth = monthStart <= day && day <= monthEnd;
              let isToday = format(today, dateFormat) === format(day, dateFormat) && inCurrentMonth;
              return (
                <Box key={day.toString()} p={2} textAlign="center">
                  <Circle size="40px" bg={isToday ? "#426B1F" : undefined} color="black">
                    {inCurrentMonth ? format(day, dateFormat) : ''}
                  </Circle>
                </Box>
              );
            })}
          </SimpleGrid>
        </Box>
      </Flex>
      <VStack>
        <Topics />
        <HStack spacing={4}>
          <Link href='/Student/CreateArticle' width='50%'>
            <Button size="lg" width='220px' bg="#426B1F" mt={5}  color='white' _hover={{ bg:"#fff", color:'#2d4b12'}}>
              Make a post now!
            </Button>
          </Link>
          <Link href='/Student/MyArticles' width='50%'>
            <Button size="lg" width='220px' bg="#426B1F" mt={5}  color='white' _hover={{ bg:"#fff", color:'#2d4b12'}}>
              My articles
            </Button>
          </Link>
        </HStack>

      </VStack>
        
    </Flex>
    
  );
}

  function StudentHome() {
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const handleAddButtonClick = () => {
      navigate('/Student/CreateArticle');
      // Additional logic when the plus button is clicked
    };
    const url = 'http://localhost:3001/'

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
          setShowError(true)
          setErrorMessage('Unauthorized Access')

          // If token is invalid or expired, attempt to refresh it
          try {
            const refreshResponse = await axios.post(url + "api/user/refresh", {
              user: localStorage.getItem('user'),
            });

            // If refresh is successful, update the access token and continue rendering the student homepage
            console.log(refreshResponse.data.message);
            localStorage.setItem('access_token', refreshResponse.data.access_token);
            setUserRole(refreshResponse.data.user.roles);

            // setShowError(false)
            
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            // If refresh fails, redirect the user to the login page
            setShowError(true)
            setErrorMessage('Unauthorized Access')

          }
        }
      }
      checkTokenValidity();

    }, []);

    
    return (
      <Box>
          {showError && (
            <Alert status="error" mt={4}>
              <AlertIcon />
              {errorMessage}
              <Link href='/login' ml={10}>
                <Text fontStyle='italic'>Go to the Login Page</Text>
              </Link>
            </Alert>
          )}
        {userRole.includes('student') && (
        <>
          <LoggedinHeader />
          <Quote></Quote>
          <Dashboard/>
          <DiscussionPage></DiscussionPage>
          <Footer></Footer>
          <Tooltip label="Make a post" fontSize="md" placement="left" hasArrow>
          <IconButton
            aria-label="Make a post"
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
  
  export default StudentHome