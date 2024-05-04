import { Box, Button, Link, VStack, Text, Flex, Image, Divider, Heading, Input, InputGroup, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, HStack, Tag, useToast, InputLeftElement, Avatar, Alert, AlertIcon } from "@chakra-ui/react";
import { FaNewspaper, FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { LoggedinHeader } from "../admin/AdminHome.page";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";

export function MMSidebar() {
    const location = useLocation();
  
    const isActive = (path: string) => {
        return location.pathname.toLowerCase() === path.toLowerCase();
    };
  
    return (
        <Box minW="350px" bg="#2d4b12" color="white" p={5} alignItems="center" justifyContent="center" minH="100vh" // Minimum height to match the viewport height
        overflowY="auto">
            <VStack align="stretch" spacing={16} mt={20} alignItems="center" justifyContent="center">
            <Link as={RouterLink} to='/MM/Monitor'>
                <Button bg={isActive('/MM/Monitor') ? 'whitesmoke' : 'transparent'}
                        _hover={isActive('/MM/Monitor') ? {} : { bg: '#fff', color: '#2d4b12' }} 
                        leftIcon={<FaNewspaper />} 
                        color={isActive('/MM/Monitor') ? '#2d4b12' : 'whitesmoke'} 
                        w='300px'
                        variant='outline'>Monitor</Button>
                </Link>
            </VStack>
            {/* Footer */}
            <Text position="absolute" bottom={5} left={5} fontSize="sm">Copyright Website 2024</Text>
        </Box>
    );
}

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  roles: string;
  faculty_id: string;
  username: string;
  createdAt: string;
}
interface Entry {
  _id: string;
  name: string;
  dateline1: Date;
  dateline2: Date;
  faculty_id: string;
}
interface Article {
  _id: string;
  text: string;
  student_id: string;
  createdAt: string;
  images: string;
  files: Array<string>;
  entry_id: string;
}
interface Faculty {
  _id: string;
  name: string;
  marketing_coordinator_id: string;
}
interface Comment {
  _id: string
  text: string;
  user_id: string;
  article_id: string
}

function MemberTable() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [selectedMember, setSelectedMember] = useState<User | null>(null);
  const accessToken = localStorage.getItem("access_token");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const toast = useToast();
  const url = 'http://localhost:3001/'
  const boxShadowColor = useColorModeValue('0px 2px 12px rgba(130,148,116,0.8)', '0px 2px 12px rgba(130,148,116,0.8)');

  const [searchQuery, setSearchQuery] = useState("");

  // Function to filter users based on the search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const handleMemberSelect = (user: User) => {
    setSelectedMember(user);
  };
  
  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  const fetchFaculties = async () => {
    try {
      const response = await axios.get(
        url + "api/faculty/get-all"
      );
      setFaculties(response.data.data);
    } catch (error) {
      setErrorMessage("Error fetching faculties");
      setShowError(true);
      setTimeout(() => setShowError(false), 10000);
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        url + `api/article/get-all`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setArticles(response.data.data);
    } catch (error) {
      setErrorMessage("Error fetching faculties");
      setShowError(true);
      setTimeout(() => setShowError(false), 10000);
    }
  };

  const fetchEntries = async () => {
    try {
      const response = await axios.get(
        url + "api/entry/get-all",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setEntries(response.data.data);
    } catch (error) {
      setErrorMessage("Error fetching Entries");
      setShowError(true);
      setTimeout(() => setShowError(false), 10000);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        url + "api/user/get-all"
      ,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      },
      );
      const filteredUsers = response.data.users.filter((user:User) => {
        return user.roles.includes("student") || user.roles.includes("marketingCoordinator");
      });
      setUsers(filteredUsers);
    } catch (error) {
      setErrorMessage("Error fetching users");
      setShowError(true);
      setTimeout(() => setShowError(false), 10000);
    }
  };

  const [userRole, setUserRole] = useState('');
  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        await axios.post(url + "api/user/validate", {
          access_token: localStorage.getItem('access_token'),
          user: localStorage.getItem('user'),
          
        },);
        
        const userDataString = localStorage.getItem('user');
        const userData = JSON.parse(userDataString || '');
        const userRole = userData.roles;
        setUserRole(userRole);
  
      } catch (error) {
        console.error("Error validating token:", error);
        try {
          const refreshResponse = await axios.post(url + "api/user/refresh", {
            user: localStorage.getItem('user'),
            access_token: localStorage.getItem('access_token'),
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
      }
    }
    checkTokenValidity();
    fetchFaculties()
    fetchUsers()
    fetchEntries()
    fetchArticles()
  }, []);

  const [selectedComment, setSelectedComment] = useState<Comment[]>([]); 
  const handleClick = async (articleId: string| undefined) => {
    try {
      const response = await axios.get(url + "api/comment/get-all", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          article_id: articleId,
        },
      });
      const comments = response.data.data;
      const filteredComments = comments.filter((comment:Comment) => comment.article_id === articleId);

      setSelectedComment(filteredComments);

      if (filteredComments.length === 0) {
        toast({
          title: 'No comments yet!',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      // Handle error
    }
  };

  const findUserName = (userId: string) => {
    const user = users.find(u => u._id === userId);
    return user ? user.name : 'User'; 
  };

  const findFacultyName = (facultyId: string): string => {
    const faculty = faculties.find((f) => f._id === facultyId);
    return faculty ? faculty.name : 'Unknown Faculty';
  };

  const findEntryName = (entryId: string): string => {
    const entry = entries.find((e) => e._id === entryId);
    return entry ? entry.name : 'Entry';
  };

  const stripHtmlTags = (html: string) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const MarketingCoordinatorModal: React.FC<{
    selectedUser: User;
    selectedArticles: Article[];
    handleClick: (comment: string | undefined) => void;
  }> = ({ selectedUser, selectedArticles, handleClick }) => {
    console.log("Selected User:", selectedUser);
    console.log("All Selected Articles:", selectedArticles);
  
    const coordinatorFaculty = selectedUser.faculty_id;
    console.log("Coordinator Faculty ID:", coordinatorFaculty);
  
    // Filter articles based on the coordinator's faculty_id
    const filteredArticlesByFaculty = selectedArticles.filter(article => {
      const user = users.find(user => user._id === article.student_id);
      return user && user.faculty_id === coordinatorFaculty;
    });
    console.log("Filtered Articles:", filteredArticlesByFaculty);
  
    return (
      <>
        <Heading fontSize="2xl" m='4'>Pending Articles: ({filteredArticlesByFaculty.length})</Heading>
        {filteredArticlesByFaculty.map(article => (
          <HStack key={article._id} p={5} spacing={4} align="center" borderBottomWidth="1px">
            <Avatar src={findUserName(article.student_id)} name={findUserName(article.student_id)} />
            <VStack>
              <Text fontSize='xl'>By {findUserName(article.student_id)}</Text>
              <Text fontStyle='italic' fontSize='md'>Created {formatDistanceToNow(article.createdAt)} ago</Text>
            </VStack>
            <Box flex={1}>
              <Heading fontSize="3xl">{stripHtmlTags(article.text)}</Heading>
            </Box>
            {article.images && (
              <Image borderRadius="md" boxSize="150px" src={url + `assets/uploads/${article.images}`} alt={stripHtmlTags(article.text)} maxW= '100px' maxH= '100px' />
            )}
            <VStack>
              <Tag
                key={article.entry_id}
                variant="solid"
                colorScheme='green'
                borderRadius="full"
                minW={40}
                maxW={50}
                minH={10}
                maxH={16}
                fontWeight='bold'
                my={4}
              >
                {findEntryName(article.entry_id)}
              </Tag>
                <Button
                  size="lg"
                  variant="solid"
                  onClick={() => handleClick(article._id)}
                  colorScheme="gray"
                  borderRadius='full'
                  minW={40}
                  maxW={50}
                  minH={10}
                  maxH={16}
                  my={4}
                >
                    View comment
                </Button>                
            </VStack>
          </HStack>
        ))}
      </>
    );
  };

  const StudentModal: React.FC<{
    selectedMember: User | null;
    selectedArticles: Article[];
    handleClick: (comment: string | undefined) => void;
  }> = ({ selectedMember, selectedArticles, handleClick }) => {
    if (!selectedMember) {
      return null;
    }
    return (
      <>
        <Heading fontSize="2xl" m='4'>Pending Articles: ({selectedArticles.length})</Heading>
          {selectedArticles.map(article => (
            <HStack key={article._id} p={5} spacing={4} align="center" borderBottomWidth="1px">
              {article.images && (
                <Image borderRadius="md" boxSize="150px" src={url + `assets/uploads/${article.images}`} alt={stripHtmlTags(article.text)} maxW= '100px' maxH= '100px' />
              )}
              <Box flex={1}>
                <Heading fontSize="3xl">{stripHtmlTags(article.text)}</Heading>
              </Box>
              <VStack>
                <Tag
                  key={article.entry_id}
                  variant="solid"
                  colorScheme='green'
                  borderRadius="full"
                  minW={60}
                  minH={10}
                  fontWeight='bold'
                >
                  {findEntryName(article.entry_id)}
                </Tag>
                <Button
                  size="lg"
                  variant="solid"
                  onClick={() => handleClick(article._id)}
                  colorScheme="gray"
                  borderRadius='full'
                >
                    View comment
                </Button>
              </VStack>
            </HStack>
          ))}
      </>
    );
  };

  return (
    <Box flex="1" bgGradient="linear(to-t, #e1f5dd, white)" p={5}>
      {showError && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          {errorMessage}
          <Link href='/login' ml={10}>
            <Text fontStyle='italic'>Go to the Login Page</Text>
          </Link>
        </Alert>
      )}
      {userRole.includes('marketingManager') && (
        <>
          <Flex justify="space-between" align="center">
            <Heading as="h2" fontSize="6xl" mb={10} textColor="#83AD5F">Account Monitor</Heading>
            <InputGroup maxWidth="300px" mb={10}>
              <InputLeftElement pointerEvents="none">
                <FaSearch />
              </InputLeftElement>
              <Input
                placeholder="Search a user"
                _placeholder={{ color: "gray.500" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />            
            </InputGroup>
          </Flex>
          <Box bg="white" borderRadius="lg" p={8} overflowX="auto" boxShadow={boxShadowColor}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th fontSize="3xl">ID</Th>
                  <Th fontSize="3xl">Name</Th>
                  <Th fontSize="3xl">Username</Th>
                  <Th fontSize="3xl">Email</Th>
                  <Th fontSize="3xl">Role</Th>
                  <Th fontSize="3xl">Faculty</Th>
                </Tr>
              </Thead>
              <Divider my={4} borderColor="#fff"/>
              <Tbody>
                {filteredUsers.map((user) => (
                  <Tr
                    bg="rgba(137, 188, 93, 0.2)"
                    key={user._id}
                    _hover={{color: '#fff', bg: 'rgba(73,133,23,1)', boxShadow: {boxShadowColor}, transform: 'translateY(-2px)', zIndex: 2}}
                    transition="background-color 0.2s, box-shadow 0.2s, transform 0.2s"
                    position='relative'
                    onClick={() => handleMemberSelect(user)} // Call handleMemberSelect on click
                  >
                    <Td>{user._id}</Td>
                    <Td>{user.name}</Td>
                    <Td>{user.username}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.roles}</Td>
                    <Td>{findFacultyName(user.faculty_id)}</Td>
                    <Divider my={4} borderColor="#426B1F" width='100%'/>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
      
          <Modal isOpen={selectedMember !== null} onClose={ handleCloseModal}  size='6xl' isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontSize='4xl' color='#426b1f'>{selectedMember?.roles.includes('marketingCoordinator')
                ? `${selectedMember?.name}'s Pending Articles`
                : `${selectedMember?.name}'s Articles`}
              </ModalHeader>
              <ModalCloseButton />
              <Divider my={2} borderColor="#426B1F" width='100%'/>
              <ModalBody>
              {selectedMember?.roles.includes('marketingCoordinator') ? (
                <MarketingCoordinatorModal
                  selectedUser={selectedMember}
                  selectedArticles={articles}
                  handleClick={handleClick}
                />
              ) : (
                <StudentModal
                  selectedMember={selectedMember}
                  selectedArticles={articles.filter(article => article.student_id === selectedMember?._id)}
                  handleClick={handleClick}
                />
              )}
              </ModalBody>
            </ModalContent>
          </Modal>  

          <Modal isOpen={selectedComment.length !== 0} onClose={() => setSelectedComment([])} size="md" isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontSize='3xl' color='#426b1f'>Article Comment</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {selectedComment!.map(comment => (
                  <Text fontSize='xl' m='5'>{comment.text}</Text>
                ))}
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
        )}
    </Box>
    )
}

export default function MMMonitor() {
    return(
        <Box>
            <LoggedinHeader />
            <Flex>
                <MMSidebar />
                <MemberTable />
            </Flex>  
        </Box>
    )
}