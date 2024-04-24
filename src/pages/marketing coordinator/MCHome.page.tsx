import { LoggedinHeader } from '../admin/AdminHome.page';
import { DiscussionPage, Footer } from '../guest/Home.page';
import { VStack, Text, HStack, Avatar, Button, Link, Box, Flex, Alert, AlertIcon } from '@chakra-ui/react';
import { Topics } from '../student/StudentHome.page';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface Article {
    _id: string;
    text: string;
    files: Array<string>;
    images: string;
    entry_id: string;
    student_id: string;
    faculty_id: string;
    school_year_id: string;
    term_condition: boolean;
    createdAt: string
}

interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    roles: string;
    faculty_id: string;
    username: string;
    createdAt: string
}

function PendingArticle() {
    const [pendingArticles, setArticles] = useState<Article[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const accessToken = localStorage.getItem('access_token');
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    const fetchUsers = async () => {
        try {
          const response = await axios.get("http://localhost:3001/api/user/get-all", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          console.log("Users API Response:", response.data);
          setUsers(response.data.users);
        } catch (error) {
          setErrorMessage("Error fetching users");
          setShowError(true);
          setTimeout(() => setShowError(false), 10000);
        }
      };    

    const fetchArticles = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/article/get-all`, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              } 
            });
          console.log("Faculty API Response:", response.data);
          setArticles(response.data.data);
        } catch (error) {
          setErrorMessage("Error fetching faculties");
          setShowError(true);
          setTimeout(() => setShowError(false), 10000);
        }
      };


    useEffect(() => {
        fetchUsers()
        fetchArticles()
      }, []);

    const findUserName = (userId: string): string => {
        const user = users.find((u) => u._id === userId);
        return user ? user.username : 'User';
    };

    const stripHtmlTags = (html: string) => {
        const tmp = document.createElement("div");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };

    return (
        <Flex direction={['column', 'row']} width="100%" overflowY='auto' maxH='700px'>
            {showError && (
                <Alert status="error" mt={4}>
                    <AlertIcon />
                    {errorMessage}
                </Alert>
            )}
                <VStack
                    bg='#869876'
                    borderRadius="lg"
                    p={5}
                    spacing={4}
                    align="stretch"
                    flex={1}
                >
                    <VStack overflowY='auto' align="stretch">
                        <Text fontSize="4xl" fontWeight="bold" pb={2} color='white'>
                            Pending article
                        </Text>
                        {pendingArticles.map(article => (
                            <HStack key={article._id} justifyContent="space-between" p={3} bg="white" borderRadius="16" boxShadow="sm" spacing={4} _hover={{transform: "translateY(-4px)", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"}} transition="background-color 0.2s, box-shadow 0.2s transform 0.4s" >
                                <Avatar size="md" name={findUserName(article.student_id)} />
                                <VStack align="start" spacing={4} flex="1">
                                    <Text fontWeight="bold" fontSize='xl' color='#426b1f'>{stripHtmlTags(article.text)}</Text>
                                    <Text fontSize="md" color="gray.500" fontStyle='italic'>{findUserName(article.student_id)} · Created {format(article.createdAt, 'MMMM dd yyyy')}</Text>
                                </VStack>
                            </HStack>
                        ))}                    
                    </VStack>

                    <Flex justifyContent="center">
                        <Link href='/mc/PendingArticles' >
                            <Button mt={4} bg="#426b1f" color='#fff'  _hover={{ bg:"#fff", color:'#2d4b12'}} height='50px' width='550px'>
                                View all pending articles
                            </Button>
                        </Link>                    
                    </Flex>

                    
                </VStack>
                <Topics />   
        </Flex>

        
    );
}

function MCHome() {
    const [userRole, setUserRole] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
      const checkTokenValidity = async () => {
        try {
          // Make a request to the /validate endpoint to check token validity
          await axios.post("http://localhost:3001/api/user/validate", {
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
            const refreshResponse = await axios.post("http://localhost:3001/api/user/refresh", {
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
        };
      }
      checkTokenValidity()
    }, [])
      
    return(
        <Box>
            {showError && (
                <Alert status="error" mt={4}>
                    <AlertIcon />
                    {errorMessage}
                </Alert>
            )}
            {userRole.includes('marketingCoordinator') && (
                <>
                    <LoggedinHeader />
                    <PendingArticle />
                    <DiscussionPage />
                    <Footer />
                </>
            )}
        </Box>
    )
}

export default MCHome