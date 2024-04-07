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
    Image,
    Tag,
    Button,
    Tooltip,
    Link,
    HStack
  } from '@chakra-ui/react';
import { AddIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { LoggedinHeader } from '../admin/AdminHome.page';
import { Quote } from '../guest/Home.page';
import { DiscussionPage } from '../guest/Home.page';
import { Footer } from '../guest/Home.page';
import React, { useState } from 'react';
import { addMonths, subMonths, format, startOfWeek, startOfMonth, endOfMonth, endOfWeek, eachDayOfInterval } from 'date-fns';
import meat from '../../assets/contains-meat.png'
import vegetable from '../../assets/vegetable.png'
import family from '../../assets/family.png'
import woman from '../../assets/women.png'
import { useNavigate } from 'react-router-dom';


export function Topics() {
  type StatusType = 'In progress' | 'Expired' | 'Upcoming';

  const topics = [
    { id: 1, title: 'Take pics of your meat', status: 'In progress' as StatusType, timeLeft: '2 days remaining', icon: meat },
    { id: 2, title: 'Vegetable day ?!?', status: 'Expired'as StatusType, timeLeft: '4 days ago', icon: vegetable },
    { id: 3, title: 'Where’s your family ?', status: 'Upcoming'as StatusType, timeLeft: 'In 1 week', icon: family },
    { id: 4, title: 'Mother’s day bonanza', status: 'Upcoming'as StatusType, timeLeft: 'In 1 month', icon: woman },
  ];

  // Status button component
  const StatusButton : React.FC<{ status: StatusType }> = ({ status }) => {
    let color = 'gray';
    if (status === 'In progress') color = '#426B1F';
    if (status === 'Expired') color = '#6B1F1F';
    if (status === 'Upcoming') color = '#BEC05B';
    
    return <Tag fontSize="lg" fontWeight='bold' width='140px' height='50px' display='flex' alignItems='center' justifyContent='center' borderRadius="full" variant="solid" bg={color} color='white'>{status}</Tag>;
  };

return (
  <VStack spacing={4} alignItems="center" p={5} bg='white' flex={1}>
    <Heading fontSize="4xl" mb={4} color='#426B1F'>Topics</Heading>
    <List spacing={6} width="100%">
      {topics.map((topic) => (
        <ListItem key={topic.id}>
          <Flex align="center" bg="white" p={4} borderRadius="lg" boxShadow="base" _hover={{transform: "translateY(-4px)", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"}} transition="background-color 0.2s, box-shadow 0.2s transform 0.4s">
            <Box boxSize="50px" mr={4} bg="purple.100" borderRadius="md" >
            <Image src={topic.icon} boxSize="50px" mr={4} borderRadius="md" /> {/* Placeholder for icon */}
            </Box>
            <Box flex="1">
              <Text fontWeight="bold" fontSize='2xl' color='#426b1f'>{topic.title}</Text>
              <Text fontSize="md" fontStyle='italic'>{topic.timeLeft}</Text>
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
    const navigate = useNavigate();
    const handleAddButtonClick = () => {
      navigate('/Student/CreateArticle');
      // Additional logic when the plus button is clicked
    };
    return (
      <Box>
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
      </Box>
  
    );
  }
  
  export default StudentHome