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

const articles = [
    // Replace with your actual article data (including author name, avatar URL, and submit date)
    {
      title: 'Mother Earth is pregnant for the third time',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      image: 'https://vinylcoverart.com/media/album-covers/3065/funkadelic-maggot-brain.jpg',
      author: 'John Doe',
      topicId: 2,
      avatarURL: 'https://via.placeholder.com/50', // Replace with placeholder or actual avatar URL
      submitDate: '2024-04-04',
    },
    {
      title: 'Sectoral heterochromia',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      image: 'https://i1.sndcdn.com/artworks-000157282441-rmtn0q-t500x500.jpg',
      author: 'Jane Doe',
      topicId: 1,
      avatarURL: '', // Replace with placeholder or actual avatar URL
      submitDate: '2024-04-03',
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
  return (
    <Box>
      <AdminHeader /> {/* Assuming AdminHeader is a separate component */}
      <VStack divider={<StackDivider />} spacing={4} overflowY="auto">
        <Heading size="lg" color="#2D3748">
          Welcome to The Newsfeed!
        </Heading>
        <Text fontSize="md" color="gray.500">
          Browse our favorite articles from students across all faculties.
        </Text>
        <Grid
          templateColumns="repeat(auto-fit, minmax(850px, 10fr))"
          gap={4}
          // Add property for two columns per row
          gridAutoRows="minmax(max-content, auto)"
        >
          {articles.slice(0, articlesToShow).map((article) => (
            <Box key={article.title} bg="#F7FAFC" p={5} borderRadius="md" shadow="base">
              <HStack spacing={4}>
                <Avatar src={article.avatarURL} name={article.author} />
                <VStack>
                  <Text fontWeight="bold">{article.author}</Text>
                  <Text fontSize="xs" color="gray.500">
                    Submitted: {article.submitDate}
                  </Text>
                </VStack>
                <Spacer /> {/* Add spacer to push topic to the right */}
                {topics.map((topics) => topics.id === article.topicId && (
                  <Tag variant="solid" colorScheme="green" borderRadius="full">
                    <Image objectFit="cover" src={topics.image} alt={topics.title} mr={2} w='45px' h='45px'/>
                  {topics.title}
                </Tag>
                ))}
                
              </HStack>
              <Heading fontSize="xl" mt={4}>
                {article.title}
              </Heading>
              <Text fontSize="md" color="gray.500">
                {article.description}
              </Text>
              <Image display="flex" mt={4} boxSize="150px" src={article.image} alt={article.title} justifyContent="center" />
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