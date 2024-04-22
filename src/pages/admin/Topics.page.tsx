import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Image,
  Input,
  IconButton,
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
} from "@chakra-ui/react";
import { AddIcon, SearchIcon, EditIcon } from "@chakra-ui/icons";
import { LoggedinHeader } from "./AdminHome.page";
import { AdminSidebar } from "./Members.page";
import meat from "../../assets/contains-meat.png";
import vegetable from "../../assets/vegetable.png";
import family from "../../assets/family.png";
import woman from "../../assets/women.png";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Schema } from "mongoose";
import { differenceInDays } from "date-fns";

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
  const onSearch = () => {
    //no API yet
  };
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
        "http://localhost:3001/api/faculty/get-all"
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
      const response = await axios.get("http://localhost:3001/api/entry/get-all");

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
