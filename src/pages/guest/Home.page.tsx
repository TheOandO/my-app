import {
  Box,
  Flex,
  Image,
  Link,
  Button,
  Select,
  Text,
  Spacer,
  Center,
  Grid,
  Divider,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Heading,
  SimpleGrid,
  Avatar,
  Stack,
  Container,
  Icon,
} from '@chakra-ui/react';
import about from "../../assets/seven-shooter-hPKTYwJ4FUo-unsplash.jpg"
import { SearchIcon } from '@chakra-ui/icons';
import { FaFacebook, FaTwitter, FaEnvelope } from 'react-icons/fa';
import post1 from "../../assets/post 1.jpg"
import ceo1 from "../../assets/ceo1.png"
import ceo2 from "../../assets/ceo2.jpg"
import ceo3 from "../../assets/ceo3.jpg"
import logo from '../../assets/logo.png'

export function Header() {

  return (
    <Flex as="header" align="center" padding="1rem" bg="white" boxShadow="sm" width="100%">
      <Box p="2">
        <Image src={logo} alt="Website logo" boxSize="70px" ml="4" />
      </Box>

      <Spacer /> {/* This pushes all elements to the right and left sides of the header */}

      <Flex alignItems="center" ml="auto">
        <Box display="flex" alignItems="center">
          {/* This container will group the navigation links, language selector, and login button */}

          <Link href="#" px="3" py="1" rounded="md" _hover={{ textDecoration: 'none', bg: 'gray.100' }} mr={20}>
            Newsfeed
          </Link>
          <Link href="#" px="3" py="1" rounded="md" _hover={{ textDecoration: 'none', bg: 'gray.100' }} mr={20}>
            Contact
          </Link>

          <Select placeholder="Language" width="auto" mr="20">
            <option value="en">English</option>
            <option value="es">Español</option>
            {/* More languages */}
          </Select>
          <Link href="/login">
            <Button bg="#426B1F" color="#FFF" variant="solid" size="lg" mr="4" _hover={{ bg: "#e0e0e0", color: "#426B1F" }}>Login</Button>
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
}

export function Quote() {
  return (
    <Box as="section" bg="white.100" my={20}>
      <Center flexDirection="column" textAlign="center" px={4}>
        <Text fontSize="2xl" mb={4}>
          Push <em>harder</em> than yesterday<br /> if you want a <em>different</em> tomorrow.
        </Text>
        <Button bg="#426B1F" color="#FFF" variant="solid" size="lg" _hover={{ bg: "#e0e0e0", color: "#426B1F" }}>
          Browse Newsfeed
        </Button>
      </Center>
    </Box>
  );
}

function AboutSection() {
  return (
    <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="center" p={5} bg="rgba(126,210,129,0.2)" w="full">
      {/* Left part with 2x2 grid of boxes */}
      <Grid gap={4} placeItems="center" maxWidth="40%">
        <Image src={about} alt="Descriptive text" boxSize="100%" objectFit="cover" objectPosition="center" borderRadius="lg" boxShadow="base" fallbackSrc='https://via.placeholder.com/150' />
      </Grid>

      {/* Right part with Lorem Ipsum text */}
      <Box maxWidth={{ base: "80%", md: "50%" }} textAlign="left" p={{ base: 4, md: 8 }}>
        <Text fontSize="4xl" color="black" fontWeight="bold">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        <Text fontSize="2xl" color="black" mt={2}>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
      </Box>
    </Flex>
  );
}

const discussions = [
  {
    id: 'd1',
    title: 'Photo correlations',
    author: 'Maria Omaga',
    timeAgo: '3 hours ago',
    avatarUrl: 'path_to_maria_avatar_image' // replace with actual avatar URL
  },
  {
    id: 'd2',
    title: 'Lightroom',
    author: 'Nicky Nicknack',
    timeAgo: '10 hours ago',
    avatarUrl: 'path_to_nicky_avatar_image' // replace with actual avatar URL
  },
  {
    id: 'd3',
    title: 'Took this myself! !?!?',
    author: 'Black Woman',
    timeAgo: '2 days ago',
    avatarUrl: 'path_to_black_woman_avatar_image' // replace with actual avatar URL
  },
  {
    id: 'd4',
    title: 'Saturation Enhancer',
    author: 'Shala Kaddidi DuDuhu',
    timeAgo: '5 days ago',
    avatarUrl: 'path_to_shala_avatar_image' // replace with actual avatar URL
  }
];

const latestArticle = {
  id: 'a1',
  title: 'Photo correlations',
  author: 'Maria Omaga',
  timeAgo: '3 hours ago',
  avatarUrl: 'path_to_maria_avatar_image', // replace with actual avatar URL
  imageUrl: post1 // replace with actual image URL of the forest
};

export function DiscussionPage() {
  return (
    <Flex background="#e1f4dc" p={20}>
      {/* Header for 'Discussions & Articles' and 'View all discussions' */}
      <Flex justifyContent="start" width="50%" p={10} direction="column">
        {/* 'Discussions & Articles' header box */}
        <Flex justifyContent="space-between" p={4} bg="#fff" borderRadius="lg" boxShadow="md" mb="5">
          <Text fontSize="3xl" fontWeight="bold" color="#426B1F" alignSelf="center">Discussions <br/>& Articles</Text>
          <Link color="#426B1F" fontWeight="bold" alignSelf="center">View all discussions</Link>
        </Flex>
        {/* 'View all discussions' header box */}

        <Box width="full" backgroundColor="#a5cda2" borderRadius="lg" p={5} boxShadow="lg" >
          <Stack spacing={4}>
            {/* Mapping discussions */}
            {discussions.map((discussion) => (
              <Flex key={discussion.id} alignItems="center">
                <Avatar name={discussion.author} src={discussion.avatarUrl} />
                <Flex justifyContent="space-between" p={4} bg="#fff" borderRadius="lg" boxShadow="md" _hover={{transform: 'translateY(-5px)', boxShadow: 'xl'}} transition="transform 0.2s, box-shadow 0.2s">
                <Box ml={3} >
                  <Text fontWeight="bold" color="#426b1f">{discussion.title}</Text>
                  <Text fontSize="sm" color="gray.300">{discussion.author} · {discussion.timeAgo}</Text>
                </Box>
                </Flex>
              </Flex>
            ))}
          </Stack>
        </Box>
      </Flex>


      {/* Latest Articles Panel */}
      <Box width="50%" ml={50}>
      {/* Title 'Latest Articles' */}
          <Text fontSize="4xl" fontWeight="bold" color="#426B1F" alignSelf="center" mb={5}>Latest Articles</Text>
      {/* Search bar */}
      <InputGroup mb={5}>
        <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
        <Input variant="filled" placeholder="Search discussions" />
      </InputGroup>

      {/* Green box containing the image and discussion title */}
      <Box backgroundColor="#a5cda2" borderRadius="lg" p={5} boxShadow="lg" position="relative" _hover={{transform: 'translateY(-5px)', boxShadow: 'xl'}} transition="transform 0.2s, box-shadow 0.2s">
        {/* Image */}
        <Image 
          src={latestArticle.imageUrl} 
          alt={latestArticle.title} 
          objectFit="cover" 
          width="100%" 
          height="50%"
        />

        {/* Discussion Title */}
        <Flex position="absolute" bottom={3} right={3} alignItems="center" backgroundColor="rgba(225, 244, 220, 0.8)" p={2} borderRadius="md" _hover={{transform: 'translateY(-5px)', boxShadow: 'xl'}} transition="transform 0.2s, box-shadow 0.2s">
          <Avatar name={latestArticle.author} src={latestArticle.avatarUrl} />
          <Box ml={3}>
            <Text fontWeight="bold">{latestArticle.title}</Text>
            <Text fontSize="sm">{latestArticle.author} · {latestArticle.timeAgo}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
    </Flex>
  );
}

const teamMembers = [
  {
    name: 'Marcus Thompson',
    title: 'Dean of Student Affairs',
    image: ceo1, // Replace with your image paths
  },
  {
    name: 'DaQuan Rodriguez',
    title: 'Director of Diversity and Inclusion Programs',
    image: ceo3,
  },
  {
    name: 'Jessica Patel',
    title: 'Assistant Professor of Environmental Science',
    image: ceo2,
  },
  // Add more team members as needed
];

function TeamSection() {
  return (
    <Box bg="#badbb2" p={10} textAlign="center">
      <Box display="inline-block" bg="white" px={3} py={5} borderRadius="md" boxShadow="md" textAlign="center">
        <Heading as="h2" size="lg" color="#1d4732">
          Team members
        </Heading>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} justifyContent="center" mt={10}>
        {teamMembers.map((member) => (
          <VStack
            key={member.name}
            spacing={4}
            p={5}
            borderRadius="lg" // Adjust the borderRadius to match the desired style
            boxShadow="lg"
            _hover={{
              transform: 'translateY(-5px)',
              boxShadow: 'xl' // You can adjust this value for a more dramatic effect
            }}
            transition="transform 0.2s, box-shadow 0.2s" // Shadow to lift the cards off the page
          >
            <Image
              src={member.image}
              alt={member.name}
              borderRadius="30"
              boxSize="250px"
              objectFit="cover"
              mb={4} // Margin bottom for spacing between image and text box
            />
            <Box p={3} borderRadius="md" boxShadow="sm" textAlign="center">
              <Text fontWeight="bold" fontSize="lg" color="#fff">{member.name}</Text>
              <Text fontSize="sm" color="#fff">{member.title}</Text>
            </Box>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export function Footer() {
  return (
    <Box bg="#8fa88a" color="white" p={10}>
      <Container centerContent maxW="none">
        <Stack direction={{ base: 'column', md: 'row' }} spacing={8} align="center" justify="space-between" width="full">
          {/* Left text block */}
          <VStack spacing={4} alignItems="flex-start">
            <Divider borderColor="whiteAlpha.800" />
            <Text fontSize="sm" textAlign="left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod <br /> tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim <br /> veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              <br /> commodo consequat.
            </Text>
            <Divider borderColor="whiteAlpha.800" />

          </VStack>

          {/* Center block with icons */}
          <VStack gap={3.5}>
            <Text fontSize="5xl" fontWeight="bold" mb={2}>Website</Text>
            <HStack spacing={4}>
              <Icon as={FaFacebook} w={10} h={10} href='/' />
              <Icon as={FaTwitter} w={10} h={10} />
              <Icon as={FaEnvelope} w={10} h={10} />
            </HStack>
            <Text fontSize="lg" textAlign="left">
              Or contact us locally
            </Text>
            <Text fontSize="lg" textAlign="left">
              +84 1234 5678
            </Text>
          </VStack>

          {/* Right text block */}
          <VStack alignItems="flex-start" spacing={2}>
            <Divider borderColor="whiteAlpha.800" />
            <Link href=''>
              <Text fontSize="3xl" fontWeight="bold">About Website</Text>
            </Link>
            <Link href=''>
              <Text fontSize="3xl">Terms & Conditions</Text>
            </Link>
            <Link href=''>
              <Text fontSize="3xl">Contact</Text>
            </Link>
            <Divider borderColor="whiteAlpha.800" />
          </VStack>
        </Stack>
      </Container>
    </Box>
  );
}

function Homepage() {
  return (
    <Box>
      <Header></Header>
      <Quote></Quote>
      <AboutSection></AboutSection>
      <DiscussionPage></DiscussionPage>
      <TeamSection></TeamSection>
      <Footer></Footer>
    </Box>

  );
}

export default Homepage