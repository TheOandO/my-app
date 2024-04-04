import React from 'react';
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

const articles = [
    // Replace with your actual article data (including author name, avatar URL, and submit date)
    {
      title: 'Mother Earth is pregnant for the third time',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      image: 'https://via.placeholder.com/150',
      topic: 'Science',
      authorName: 'John Doe',
      avatarURL: 'https://via.placeholder.com/50', // Replace with placeholder or actual avatar URL
      submitDate: '2024-04-04',
    },
    {
      title: 'Sectoral heterochromia',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      image: 'https://via.placeholder.com/150',
      topic: 'Biology',
      authorName: 'Jane Doe',
      avatarURL: 'https://via.placeholder.com/50', // Replace with placeholder or actual avatar URL
      submitDate: '2024-04-03',
    },
    // ... more articles
  ];

  const Newsfeed = () => {
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
            templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
            gap={4}
            // Add property for two columns per row
            gridAutoRows="minmax(min-content, auto)"
          >
            {articles.map((article) => (
              <Box key={article.title} bg="#F7FAFC" p={5} borderRadius="md" shadow="base">
                <HStack spacing={4}>
                  <Avatar src={article.avatarURL} />
                  <VStack>
                    <Text fontWeight="bold">{article.authorName}</Text>
                    <Text fontSize="xs" color="gray.500">
                      Submitted: {article.submitDate}
                    </Text>
                  </VStack>
                  <Spacer /> {/* Add spacer to push topic to the right */}
                  <Tag variant="solid" colorScheme="teal" borderRadius="full">
                    {article.topic}
                  </Tag>
                </HStack>
                <Heading fontSize="xl" mt={4}>
                  {article.title}
                </Heading>
                <Text fontSize="md" color="gray.500">
                  {article.description}
                </Text>
                <Image mt={4} boxSize="150px" src={article.image} alt={article.title} />
              </Box>
            ))}
          </Grid>
        </VStack>
      </Box>
    );
  };
  
  
  export default Newsfeed;