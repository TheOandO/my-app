import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Input,
  Divider,
  Flex,
  Tag,
  InputGroup,
  InputLeftElement,
  Icon,
  Link,
  Alert,
  AlertIcon,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, SearchIcon, EditIcon } from "@chakra-ui/icons";
import { LoggedinHeader } from "./AdminHome.page";
import { AdminSidebar } from "./Members.page";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Schema } from "mongoose";
import { differenceInDays, format } from "date-fns";

interface Topic {
  _id: string
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
  const [value, setValue] = useState("");
  const url = 'http://localhost:3001/'

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
    fetchTopics();
  }, []);

  // Function to find  name by faculty id
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

const toast = useToast();

function TopicModal({ topicId }: { topicId: string }) {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

  const [formData, setFormData] = useState({
    name: "",
    dateline1: "",
    dateline2: "",
    facultyId: "",
  });
  const fetchTopicById = async () => {
    try {
      const response = await axios.get<Topic>(url + `api/entry/get-by-id/${topicId}`);

      setTopic(response.data);
      setIsOpen(true);
    } catch (error) {
      console.error("Error fetching topic:", error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTopic(null);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(url + `api/entry/edit/${topicId}`, {
        name: formData.name,
        dateline1: startDate,
        dateline2: endDate,
        faculty_id: formData.facultyId,
      });
      toast({
        title: "Topic created.",
        description: "We've created your topic for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      window.location.reload();
    } catch (error: any) {
      console.error("Error adding topic", error.res.data);
      toast({
        title: "Error adding topic.",
        description: error.res.data,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    try {
      await axios.delete(url + `api/entry/delete/${topicId}`);
      toast({
        title: "Topic deleted.",
        description: "The topic has been successfully deleted.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setIsOpen(false); 
      window.location.reload();
      } catch (error) {
      console.error("Error deleting topic:", error);
      toast({
        title: "Error deleting topic.",
        description: "An error occurred while deleting the topic.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Button leftIcon={<EditIcon />} onClick={fetchTopicById}>View</Button>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={handleClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Topic</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Display topic information here */}
              {topic && (
          <VStack as="form" onSubmit={handleEdit} spacing={6}>
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
            />
          </FormControl>

          <FormControl id="facultyId" isRequired>
            <FormLabel>Select Faculty</FormLabel>
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
        </VStack>
              )}
            </ModalBody>
            <ModalFooter>
              <Button bg="#426b1f" colorScheme="green" color='#fff' m={3} onClick={handleEdit}>
                Save Changes
              </Button>
              <Button onClick={handleClose} m={3}>Close</Button>
              <Button bg="#6B1F1F" color='#fff' onClick={handleDelete} m={3} variant='solid'>Delete this Topic</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

return (
  <VStack spacing={4} alignItems="center" p={5} bg='white' flex={1}>
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
          <Box p={5} shadow="md" w="100%">
            <InputGroup size="lg" mb={5}>
              <InputLeftElement pointerEvents="none">
                <Icon as={SearchIcon} color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Search a topic"
                _placeholder={{ color: "gray.500" }}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </InputGroup>
          </Box>
          <List spacing={6} width="100%" minH={200} h={900} overflowY='auto' minW={700}>
            {topics
              .filter((topic) =>
                topic.name.toLowerCase().includes(value.toLowerCase())
              )
              .map((topic: any) => (
                <ListItem key={topic._id}>
                  <Flex align="center" bg="white" p={4} borderRadius="lg" boxShadow="base" _hover={{ transform: "translateY(-4px)", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }} transition="background-color 0.2s, box-shadow 0.2s transform 0.4s">
                    <Box flex="1">
                      <Text fontWeight="bold" fontSize='3xl' color='#426b1f'>{topic.name}</Text>
                      <Text fontSize="md" fontStyle='italic'>{formatDatelineMessage(topic.status, topic.dateline1, topic.dateline2)}</Text>
                      <Text fontSize="md" fontStyle='italic'>From {format(new Date(topic.dateline1), 'MMMM dd, yyyy')} to {format(new Date(topic.dateline2), 'MMMM dd, yyyy')}</Text>
                      <Text fontSize="md" color="gray.600">Faculty: {findFacultyName(topic.faculty_id)}</Text>     
                    </Box>
                    <VStack>  
                      <StatusButton status={topic.status} />
                      <TopicModal topicId={topic._id}/>
                    </VStack>
                    
                  </Flex>
                </ListItem>
              ))}
          </List>
        </>
      )}
  </VStack>
  )
}



function TopicsList() {

  return (
    <Flex direction="column" align="stretch" w="full">
      <Box bg="#2d4b12" p={5}>
        <Flex justifyContent="space-between" align="center">
          <Heading as="h2" size="xl" color="white">
            My topics
          </Heading>
          <Link href="/Admin/CreateTopic">
            <Button
              leftIcon={<AddIcon />}
              bg="whitesmoke"
              color="#426B1F"
              variant="solid"
            >
              Add a topic
            </Button>
          </Link>
        </Flex>
      </Box>

      <VStack divider={<Divider />} spacing={4} align="stretch" p={5}>
        <Topics />
      </VStack>
    </Flex>
  );
}

function ViewTopics() {
  return (
    <Box>
      <LoggedinHeader />
      <Flex>
        <AdminSidebar />
        <TopicsList />
      </Flex>
    </Box>
  );
}

export default ViewTopics;
