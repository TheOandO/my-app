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
  StackDivider,
  Grid,
  Avatar,
  Spacer,
} from '@chakra-ui/react';
import { AdminHeader } from '../admin/AdminHome.page';
import meat from '../../assets/contains-meat.png'
import vegetable from '../../assets/vegetable.png'
import family from '../../assets/family.png'
import woman from '../../assets/women.png'
import { formatDistanceToNow } from 'date-fns';

const articles = [
    // Replace with your actual article data (including author name, avatar URL, and submit date)
    {
      title: 'Mother Earth is pregnant for the third time',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      image: 'https://vinylcoverart.com/media/album-covers/3065/funkadelic-maggot-brain.jpg',
      author: 'Nicky Nicknack',
      topicId: 2,
      avatarURL: 'https://via.placeholder.com/50', // Replace with placeholder or actual avatar URL
      submitDate: '2024-04-04',
    },
    {
      title: 'Sectoral heterochromia',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      image: 'https://i1.sndcdn.com/artworks-000157282441-rmtn0q-t500x500.jpg',
      author: 'Mandy Chow',
      topicId: 1,
      avatarURL: '', // Replace with placeholder or actual avatar URL
      submitDate: new Date('2024-03-25T12:00:00Z'),
    },    
    {
      title: `Cause I'm as free as a bird now`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      image: 'https://i.scdn.co/image/ab67616d0000b273128450651c9f0442780d8eb8',
      author: 'Kaling Bling',
      topicId: 4,
      avatarURL: '', // Replace with placeholder or actual avatar URL
      submitDate: new Date('2024-03-25T12:00:00Z'),
    },
    {
      title: 'There could be hell below, below',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      image: 'https://i.discogs.com/DV7a-pnwsxi06Ci9Fxyy8pKjWWvDgQAR9RrLE7gOMgo/rs:fit/g:sm/q:90/h:600/w:594/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU2ODk0/ODAtMTM5OTk5NzU2/OC0yMDQ0LmpwZWc.jpeg',
      author: 'Mandy Chow',
      topicId: 3,
      avatarURL: '', // Replace with placeholder or actual avatar URL
      submitDate: new Date('2024-03-25T12:00:00Z'),
    },    {
      title: 'No alarms to no surprises',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/Radiohead_-_No_Surprises_%28CD1%29.jpg/220px-Radiohead_-_No_Surprises_%28CD1%29.jpg',
      author: 'Nicky Nicknack',
      topicId: 2,
      avatarURL: '', // Replace with placeholder or actual avatar URL
      submitDate: new Date('2024-03-25T12:00:00Z'),
    },    {
      title: 'Sectoral heterochromia',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
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
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        status: 'In progress',
    },
    {
        id: 2,
        title: 'Vegetable day !?!',
        image: vegetable,
        timeLeft: '4 days ago',
        description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
        status: 'Expired',
    },
    {
        id: 3,
        title: 'Where’s your family ?',
        image: family,
        timeLeft: 'In 1 week',
        description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip...',
        status: 'Upcoming',
    },
    {
        id: 4,
        title: 'Mother’s day bonanza',
        image: woman,
        timeLeft: 'In 1 month',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore...',
        status: 'Upcoming',
    },
];

function Newsfeed() {
  const [articlesToShow, setArticlesToShow] = useState(4);

  const handleLoadMore = () => {
    setArticlesToShow(articlesToShow + 4); // Increase the number of articles to show
  };

  const colorSchemes = ['teal', 'purple', 'orange', 'green'];

  function getRandomColorScheme() {
    const randomIndex = Math.floor(Math.random() * colorSchemes.length);
    return colorSchemes[randomIndex];
  }

  return (
    <Box>
      <AdminHeader /> {/* Assuming AdminHeader is a separate component */}
      <VStack divider={<StackDivider />} spacing={4} overflowY="auto" >
        <Heading fontSize="5xl" color="#426b1f" textAlign="left">
          Welcome to The Newsfeed!
        </Heading>
        <Text fontSize="md" color="gray.500">
          Browse our favorite articles from students across all faculties.
        </Text>
        <Grid
          templateColumns="repeat(auto-fit, minmax(1050px, 10fr))"
          gap={4}
        >
          {articles.slice(0, articlesToShow).map((article) => (
            <Box key={article.title} bg="#F7FAFC" p={5} borderRadius="md" shadow="base">
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
                  <Tag variant="solid" colorScheme={getRandomColorScheme()}  borderRadius="full">
                    <Image objectFit="cover" src={topics.image} alt={topics.title} mr={2} w='45px' h='45px'/>
                    {topics.title}
                </Tag>
                ))}
                
              </HStack>
              <Heading fontSize="3xl" mt={4}>
                {article.title}
              </Heading>
              <Text fontSize="md" color="gray.500">
                {article.description}
              </Text>
              <Image display="flex" mt={4} boxSize="400px" src={article.image} alt={article.title} mx="auto" maxW='500px' maxH='500px'/>
            </Box>
          ))}
        </Grid>
        {articles.length > articlesToShow && (
          <Button onClick={handleLoadMore} colorScheme="teal" variant="outline">
            Load More Articles
          </Button>
        )}
      </VStack>
    </Box>
  );
}
  
  
  export default Newsfeed;