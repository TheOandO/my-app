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
  Link
} from '@chakra-ui/react';
import { AddIcon, SearchIcon, EditIcon } from '@chakra-ui/icons';
import { LoggedinHeader } from './AdminHome.page';
import { AdminSidebar } from './Members.page';
import meat from '../../assets/contains-meat.png'
import vegetable from '../../assets/vegetable.png'
import family from '../../assets/family.png'
import woman from '../../assets/women.png'

function TopicsList() {
    type StatusType = 'In progress' | 'Expired' | 'Upcoming';
    const topics = [
        {
            id: 1,
            title: 'Take pics of your meat',
            image: meat,
            timeLeft: '2 days remaining',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
            status: 'In progress' as StatusType,
        },
        {
            id: 2,
            title: 'Vegetable day !?!',
            image: vegetable,
            timeLeft: '4 days ago',
            description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
            status: 'Expired' as StatusType,
        },
        {
            id: 3,
            title: 'Where’s your family ?',
            image: family,
            timeLeft: 'In 1 week',
            description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip...',
            status: 'Upcoming' as StatusType,
        },
        {
            id: 4,
            title: 'Mother’s day bonanza',
            image: woman,
            timeLeft: 'In 1 month',
            description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore...',
            status: 'Upcoming' as StatusType,
        },
    ];

  const StatusButton : React.FC<{ status: StatusType }> = ({ status }) => {
    let color = 'gray';
    if (status === 'In progress') color = '#426B1F';
    if (status === 'Expired') color = '#6B1F1F';
    if (status === 'Upcoming') color = '#BEC05B';
    return <Tag fontSize="lg" fontWeight='bold' width='140px' height='50px' display='flex' alignItems='center' justifyContent='center' borderRadius="full" variant="solid" bg={color} color='white'>{status}</Tag>
  }

  return (
    <Flex direction="column" align="stretch" w="full">
      <Box bg="#2d4b12" p={5}>
        <Flex justifyContent="space-between" align="center">
          <Heading as="h2" size="xl" color="white">
            My topics
          </Heading>
          <Link href='/Admin/CreateTopic'>
                <Button leftIcon={<AddIcon />} bg="whitesmoke" color='#426B1F' variant="solid">
                    Add a topic
                </Button>
          </Link>

        </Flex>
      </Box>

    <Box p={5} shadow="md">
        <InputGroup size="lg" mb={5}>
        <InputLeftElement pointerEvents="none">
            <Icon as={SearchIcon} color="gray.300" />
        </InputLeftElement>
        <Input
            placeholder="Search a topic"
            _placeholder={{ color: 'gray.500' }} // Optional: Style the placeholder text
        />
        </InputGroup>
    </Box>

      <VStack divider={<Divider />} spacing={4} align="stretch" p={5}>
        {topics.map((topic) => (
          <Box
            key={topic.id}
            p={5}
            boxShadow="md"
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
          >
        <Flex justifyContent="space-between" align="center">
          <VStack align="flex-start" spacing={1}>
          <Image
            src={topic.image}
            boxSize="100px" // Set the image size
            borderRadius="md"
            mr={4}
          />
            <Heading as="h3" size="md">
              {topic.title}
            </Heading>
            <Text fontSize="sm" color="gray.500">{topic.description}</Text>
            <Text fontSize="sm" color="gray.500">{topic.timeLeft}</Text>
          </VStack>
          <HStack spacing={4}>
            <StatusButton status={topic.status} />
            <IconButton
              aria-label={`Edit ${topic.title}`}
              icon={<EditIcon />}
              size="sm"
              variant="ghost"
              colorScheme="gray"
            />
          </HStack>
        </Flex>
          </Box>
        ))}
      </VStack>
    </Flex>
  );
}

function ViewTopics(){
    return(
        <Box>
        <LoggedinHeader/>
            <Flex>
                <AdminSidebar />
                <TopicsList />
            </Flex>
        </Box>

    )
}      

export default ViewTopics;