import {
  Avatar,
  Box, Button, Divider, Flex, Heading, Icon, Link, Select, SimpleGrid, Spacer, Stat, StatLabel, StatNumber, VStack, Image, IconButton, Menu, MenuButton, MenuItem, MenuList, Tooltip,
} from '@chakra-ui/react';
import { Footer, Quote, DiscussionPage } from '../guest/Home.page' 
import { FaUser, FaNewspaper, FaBell, FaCalendarDay, FaCog, FaDatabase, FaEnvelopeOpenText, FaAnchor } from 'react-icons/fa';
import { AddIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
export function LoggedinHeader() {
  const notifications = [
    { id: 1, title:'', message: 'New topic registered' },
    { id: 2, title:'', message: 'System update available' },
    { id: 3, title:'', message: 'New contact message received' },
    // ... more notifications
  ];

  return (
    <Flex as="header" align="center" padding="1rem" bg="transparent" boxShadow="sm" width="100%">
      <Link href='/'>
        <Box p="2">
          <Image src={logo} alt="Website logo" boxSize="70px" ml="4" />
        </Box>
      </Link>

      <Spacer /> {/* This pushes all elements to the right and left sides of the header */}

      <Flex alignItems="center" ml="auto" mr="auto">
        <Box display="flex" alignItems="center">
          {/* This container will group the navigation links, language selector, and avatar */}
          <Link href="/" px="3" py="1" rounded="md" _hover={{ textDecoration: 'none', bg: 'gray.100' }} mr={20}>
            Home
          </Link>
          
          <Link href="#" px="3" py="1" rounded="md" _hover={{ textDecoration: 'none', bg: 'gray.100' }} mr={20}>
            Newsfeed
          </Link>

          <Select placeholder="Language" width="auto" mr="20">
            <option value="en">English</option>
            <option value="es">Español</option>
            {/* More languages */}
          </Select>

          {/* Notification bell and dropdown list */}
          <Menu>
            <MenuButton as={IconButton} icon={<FaBell />} variant="ghost" position="relative" mr="4" width={10}>
              {/* If you have a notification count you want to display, you can add a Badge component here */}
            </MenuButton>

            <MenuList>
              {notifications.map(notification => (
                <MenuItem key={notification.id}>{notification.message}</MenuItem>
              ))}
            </MenuList>
          </Menu>

          {/* Avatar for logged in account */}
          <Link href='/MyAccount/1'>
            <Avatar name="My Account" src="path-to-admin-avatar.jpg" size="md" />
          </Link>
          
        </Box>
      </Flex>
    </Flex>
  );
}

export const Overview = () => {
  return (
    <Box bg="#d9e6d3" p={6} borderRadius="lg" boxShadow="xl">
      <Heading as="h3" size="lg" textAlign="center" mb={6} color="#1d4732">
        Statistics overview
      </Heading>
      <Divider mb={6} />
      <SimpleGrid columns={2} spacing={10}>
        {/* Statistics column */}
        <VStack spacing={4} align="stretch">
          <Stat>
            <StatLabel><Icon as={FaUser} mr={2} />Total accounts</StatLabel>
            <Link href='/Admin/Members'>
              <StatNumber textDecoration='underline'>1,024</StatNumber>
            </Link>
            
          </Stat>
          <Stat>
            <StatLabel><Icon as={FaNewspaper} mr={2} />Total articles</StatLabel>
            <Link href='/Newsfeed'>
              <StatNumber textDecoration='underline'>1,024</StatNumber>
            </Link>
          </Stat>
          <Stat>
            <StatLabel><Icon as={FaBell} mr={2} />Days until the end of the academic year</StatLabel>
            <StatNumber>1,024</StatNumber>
          </Stat>
          <Stat>
            <StatLabel><Icon as={FaCalendarDay} mr={2} />Term end date</StatLabel>
            <StatNumber>May 4th, 2024</StatNumber>
          </Stat>
        </VStack>

        {/* Buttons column */}
        <VStack spacing={4} align="stretch">
          <Link href='/Admin/Members'> 
            <Button leftIcon={<FaCog />} bg="#869876" color='#fff' variant="ghost" colorScheme='green' _hover={{ bg:"#fff", color:'#2d4b12'}} _focus={{ boxShadow: "none" }} h={50} w={250} mb={5} borderRadius={12}>
              Manage accounts
            </Button>
          </Link>
          <Link href='/Admin/ViewTopics'>
            <Button leftIcon={<FaAnchor />} bg="#869876" color='#fff' variant="ghost" colorScheme='green' _hover={{ bg:"#fff", color:'#2d4b12'}} _focus={{ boxShadow: "none" }} h={50} w={250} mb={5} borderRadius={12}>
              View topics
            </Button>
          </Link>
          
          <Link href='/Admin/SendNotif'>
            <Button leftIcon={<FaEnvelopeOpenText />} bg="#869876" color='#fff' variant="ghost" colorScheme='green' _hover={{ bg:"#fff", color:'#2d4b12'}} _focus={{ boxShadow: "none" }} h={50} w={250} mb={5} borderRadius={12}>
              Send notifications
            </Button>
          </Link>
          <Link href='/MyAccount/1'>
            <Button leftIcon={<FaUser />} bg="#869876" color='#fff' variant="ghost" colorScheme='green' _hover={{ bg:"#fff", color:'#2d4b12'}} _focus={{ boxShadow: "none" }} h={50} w={250} mb={5} borderRadius={12}>
              My account
            </Button>
          </Link>
          
        </VStack>
      </SimpleGrid>
    </Box>
  );
};



function Homepage() {
  const navigate = useNavigate();
  const handleAddButtonClick = () => {
    navigate('/Admin/CreateTopic');
    // Additional logic when the plus button is clicked
  };
  return (
    <Box>
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
    </Box>

  );
}

export default Homepage