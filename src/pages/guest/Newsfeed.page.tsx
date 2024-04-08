import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Box,
  Heading,
  Text,
  Image,
  Tag,
  Button,
  Grid,
  Avatar,
  Spacer,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  useColorModeValue,
  Divider,
  Icon,
  Select,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { LoggedinHeader } from '../admin/AdminHome.page';
import meat from '../../assets/contains-meat.png'
import vegetable from '../../assets/vegetable.png'
import family from '../../assets/family.png'
import woman from '../../assets/women.png'
import { formatDistanceToNow } from 'date-fns';
import { FaSearch, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { Footer } from './Home.page';
interface Article {
  title: string;
  author: string;
  submitDate: Date | number | string; // or
  description: string;
  image: string;
  avatarURL: string;
  topicId: number;
  // Add any other properties as needed
}
const articles: Article[] = [
    // Replace with your actual article data (including author name, avatar URL, and submit date)
    {
      title: 'Mother Earth is pregnant for the third time',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris eu ex tincidunt scelerisque vel et risus. Fusce et lorem metus. Fusce pellentesque sed lacus at facilisis. Suspendisse in.',
      image: 'https://vinylcoverart.com/media/album-covers/3065/funkadelic-maggot-brain.jpg',
      author: 'Nicky Nicknack',
      topicId: 2,
      avatarURL: 'https://via.placeholder.com/50', // Replace with placeholder or actual avatar URL
      submitDate: new Date('2024-03-25T12:00:00Z'),
    },
    {
      title: 'Sectoral heterochromia',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris eu ex tincidunt scelerisque vel et risus. Fusce et lorem metus. Fusce pellentesque sed lacus at facilisis. Suspendisse in.',
      image: 'https://i1.sndcdn.com/artworks-000157282441-rmtn0q-t500x500.jpg',
      author: 'Mandy Chow',
      topicId: 1,
      avatarURL: '', // Replace with placeholder or actual avatar URL
      submitDate: new Date('2024-03-25T12:00:00Z'),
    },    
    {
      title: `Cause I'm as free as a bird now`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris eu ex tincidunt scelerisque vel et risus. Fusce et lorem metus. Fusce pellentesque sed lacus at facilisis. Suspendisse in.',
      image: 'https://i.scdn.co/image/ab67616d0000b273128450651c9f0442780d8eb8',
      author: 'Kaling Bling',
      topicId: 4,
      avatarURL: '', // Replace with placeholder or actual avatar URL
      submitDate: new Date('2024-03-25T12:00:00Z'),
    },
    {
      title: 'There could be hell below, below',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris eu ex tincidunt scelerisque vel et risus. Fusce et lorem metus. Fusce pellentesque sed lacus at facilisis. Suspendisse in.',
      image: 'https://i.discogs.com/DV7a-pnwsxi06Ci9Fxyy8pKjWWvDgQAR9RrLE7gOMgo/rs:fit/g:sm/q:90/h:600/w:594/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU2ODk0/ODAtMTM5OTk5NzU2/OC0yMDQ0LmpwZWc.jpeg',
      author: 'Mandy Chow',
      topicId: 3,
      avatarURL: '', // Replace with placeholder or actual avatar URL
      submitDate: new Date('2024-03-25T12:00:00Z'),
    },    {
      title: 'No alarms to no surprises',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris eu ex tincidunt scelerisque vel et risus. Fusce et lorem metus. Fusce pellentesque sed lacus at facilisis. Suspendisse in.',
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/Radiohead_-_No_Surprises_%28CD1%29.jpg/220px-Radiohead_-_No_Surprises_%28CD1%29.jpg',
      author: 'Nicky Nicknack',
      topicId: 2,
      avatarURL: '', // Replace with placeholder or actual avatar URL
      submitDate: new Date('2024-03-25T12:00:00Z'),
    },    {
      title: 'Sectoral heterochromia',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris eu ex tincidunt scelerisque vel et risus. Fusce et lorem metus. Fusce pellentesque sed lacus at facilisis. Suspendisse in.',
      image: 'https://i1.sndcdn.com/artworks-000157282441-rmtn0q-t500x500.jpg',
      author: 'Kaling Bling',
      topicId: 1,
      avatarURL: '', // Replace with placeholder or actual avatar URL
      submitDate: new Date('2024-03-25T12:00:00Z'),
    },
    // ... more articles
];

const topics = [
    {
        id: 1,
        title: 'Take pics of your meat',
        image: meat,
        timeLeft: '2 days remaining',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris eu ex tincidunt scelerisque vel et risus. Fusce et lorem metus. Fusce pellentesque sed lacus at facilisis. Suspendisse in.',
        status: 'In progress',
    },
    {
        id: 2,
        title: 'Vegetable day !?!',
        image: vegetable,
        timeLeft: '4 days ago',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris eu ex tincidunt scelerisque vel et risus. Fusce et lorem metus. Fusce pellentesque sed lacus at facilisis. Suspendisse in.',
        status: 'Expired',
    },
    {
        id: 3,
        title: 'Where’s your family ?',
        image: family,
        timeLeft: 'In 1 week',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris eu ex tincidunt scelerisque vel et risus. Fusce et lorem metus. Fusce pellentesque sed lacus at facilisis. Suspendisse in.',
        status: 'Upcoming',
    },
    {
        id: 4,
        title: 'Mother’s day bonanza',
        image: woman,
        timeLeft: 'In 1 month',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris eu ex tincidunt scelerisque vel et risus. Fusce et lorem metus. Fusce pellentesque sed lacus at facilisis. Suspendisse in.',
        status: 'Upcoming',
    },
];

function ArticleList({ articles }: { articles: Article[] }) {
  const [articlesToShow, setArticlesToShow] = useState(4);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  const handleLoadMore = () => {
    setArticlesToShow(articlesToShow + 4); // Increase the number of articles to show
  };

  const colorSchemes = ['teal', 'purple', 'orange', 'green'];

  function getRandomColorScheme() {
    const randomIndex = Math.floor(Math.random() * colorSchemes.length);
    return colorSchemes[randomIndex];
  }

  const [isAscending, setIsAscending] = useState(true);
  const boxShadowColor = useColorModeValue('0px 2px 8px rgba(130,148,116,0.8)', '0px 2px 12px rgba(130,148,116,0.8)');
  const toggleSortOrder = () => {
      setIsAscending(!isAscending);
  };

  function trimText(text: any, limit: any){
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  }

  const openModal = (article: Article) => {
    setSelectedArticle(article);
  };
  const closeModal = () => {
    setSelectedArticle(null);
  };

  return(
      <VStack spacing={4} overflowY="auto">
        <Heading fontSize="5xl" color="#426b1f">
          Welcome to The Newsfeed!
        </Heading>
        <Text fontSize="md" color="gray.500">
          Browse our favorite articles from students across all faculties.
        </Text>
        <Divider my={6} borderWidth={2} borderColor="#426B1F" width='100%'/>
        <HStack mb={5} gap={6}>
          <InputGroup minW={450} maxW={900}>
            <InputLeftElement pointerEvents="none">
              <FaSearch />
            </InputLeftElement>
            <Input placeholder="Search an article" />
          </InputGroup>

          <Flex gap={6}>
            <Select placeholder="Sort by" boxShadow={boxShadowColor} width={40}>
              <option value="date">Date</option>
              <option value="name">Name</option>
              <option value="topic">Topic</option>
              <option value="major">Major</option>
              <option value="faculty">Faculty</option>
            </Select>
            <Button
              rightIcon={isAscending ? <Icon as={FaSortAmountUp} /> : <Icon as={FaSortAmountDown} />}
              variant="outline"
              onClick={toggleSortOrder}
              boxShadow={boxShadowColor}
              minW={180}
            >
              {isAscending ? 'Ascending' : 'Descending'}
            </Button>                
          </Flex>
          <Button bg='#426b1f' color='whitesmoke' variant="ghost" colorScheme="green" _hover={{ bg:"#BDD7A6", color:'#426b1f'}} _focus={{ boxShadow: "none" }} transition="background-color 0.2s, box-shadow 0.2s" minW={150}>
            Submit
          </Button>
        </HStack>
        
        <Grid
          templateColumns="repeat(2, minmax(150px, 5fr))"
          gridAutoRows="minmax(min-content, auto)"
          gap={38}
        >
          {articles.slice(0, articlesToShow).map((article) => (
            <Box key={article.title} bg="#F7FAFC" p={5} boxShadow={boxShadowColor} borderRadius="lg" cursor="pointer" onClick={() => openModal(article)} w='550px' mb={10}>
              <HStack spacing={4}>
                <Avatar src={article.avatarURL} name={article.author} />
                <VStack>
                  <Text fontSize="lg" fontWeight="bold">{article.author}</Text>
                  <Text fontSize="sm" color="gray.400" fontStyle="italic">
                        Submitted {formatDistanceToNow(new Date(article.submitDate), { addSuffix: true })}
                    </Text>
                </VStack>
                <Spacer /> {/* Add spacer to push topic to the right */}
                {topics.map((topics) => topics.id === article.topicId && (
                  <Tag variant="solid" colorScheme={getRandomColorScheme()}  borderRadius="full" minW={60}>
                    <Image objectFit="cover" src={topics.image} alt={topics.title} mr={2} w='40px' h='40px'/>
                    {topics.title}
                  </Tag>
                ))}
                
              </HStack>
              <Heading fontSize="3xl" mt={4}>
                {article.title}
              </Heading>
              <Text fontSize="md" color="gray.500">
                {trimText(article.description, 15)}
              </Text>
              <Image display="flex" mt={4} boxSize="300px" src={article.image} alt={article.title} mx="auto" maxW='300px' maxH='300px'/>
            </Box>
          ))}
            {/* Modal for displaying article */}
        <Modal isOpen={selectedArticle !== null} onClose={closeModal} isCentered motionPreset='slideInBottom' size='6xl'>
          <ModalOverlay />
          <ModalContent>
            <HStack m='12' >
              <VStack alignItems='flex-start'>
                <HStack spacing={10} mb={6}>
                  <Avatar size='xl' src={selectedArticle?.avatarURL} name={selectedArticle?.author} />
                  <VStack>
                    <Text fontSize="xl" fontWeight="bold">{selectedArticle?.author}</Text>
                    <Text fontSize="lg" color="gray.400" fontStyle="italic">
                      {selectedArticle?.submitDate ? selectedArticle.submitDate.toLocaleString() : 'No submit date'}
                    </Text>
                  </VStack>
                  <Spacer /> {/* Add spacer to push topic to the right */}
                  {topics.map((topics) => topics.id === selectedArticle?.topicId && (
                    <Tag variant="solid" colorScheme={getRandomColorScheme()}  borderRadius="full" minW={54}>
                      <Image objectFit="cover" src={topics.image} alt={topics.title} mr={2} w='45px' h='45px'/>
                      {topics.title}
                    </Tag>
                  ))}
                  
                </HStack>
                <Heading fontSize='4xl' fontStyle='bold' mb={6}>
                  {selectedArticle?.title}
                </Heading>
                <Text fontSize="xl" color="gray.500">
                  {selectedArticle?.description}
                </Text>
              </VStack>
              <Divider orientation='vertical' minH='450px' borderColor='#426b1f' borderWidth={2} mx={6}/>
              <Image display="flex" mt={4} boxSize="400px" src={selectedArticle?.image} alt={selectedArticle?.title} mx="auto" maxW='500px' maxH='500px'/>
                           
            </HStack>
          <ModalCloseButton />
          </ModalContent>
        </Modal>
        </Grid>
        {articles.length > articlesToShow && (
          <Button onClick={handleLoadMore} bg='#426b1f' color='whitesmoke' variant="outline" colorScheme="green" _hover={{ bg:"whitesmoke", color:'#426b1f'}} _focus={{ boxShadow: "none" }} transition="background-color 0.2s, box-shadow 0.2s" minW={50} w='50%' m={10}>
            Load More Articles
          </Button>
        )}
      </VStack>    
  )
}

function Newsfeed() {
  return (
    <Box>
      <LoggedinHeader />
      <ArticleList articles={articles}/>
      <Footer/>
    </Box>
  );
}
  
  
  export default Newsfeed;