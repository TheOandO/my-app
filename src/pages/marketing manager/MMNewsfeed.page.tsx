import React, { useState } from "react";
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
  Alert,
  AlertIcon,
  Link,
} from "@chakra-ui/react";
import { LoggedinHeader } from "../admin/AdminHome.page";
import { FaSearch, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { Footer } from "../guest/Home.page";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
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

function ArticleList() {
  const [articlesToShow, setArticlesToShow] = useState(4);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [value, setValue] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const accessToken = localStorage.getItem("access_token");
  const toast = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const url = 'http://localhost:3001/'

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
      console.log("Faculty API Response:", response.data);
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
      console.log("Entries API Response:", response.data);
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
      console.log("Users API Response:", response.data);
      setUsers(response.data.users);
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
    fetchUsers()
    fetchEntries()
    fetchArticles()
  }, []);

  const handleDownload = async () => {
    
    try {
      if (selectedArticle) {
        const downloadUrl = url + `api/getContribution/article/${selectedArticle._id}/zip`;
        await axios.get(
          downloadUrl,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            },
          }
        );
        window.open(downloadUrl)
      } else {
        toast({
          title: "No article selected",
          description: "Please select an article to download.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error downloading article:", error);
      toast({
        title: "Error",
        description: "Error downloading article. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleLoadMore = () => {
    setArticlesToShow(articlesToShow + 4);
  };

  const colorSchemes = ["teal", "purple", "orange", "green"];

  function getRandomColorScheme() {
    const randomIndex = Math.floor(Math.random() * colorSchemes.length);
    return colorSchemes[randomIndex];
  }

  const [isAscending, setIsAscending] = useState(true);
  const boxShadowColor = useColorModeValue(
    "0px 2px 8px rgba(130,148,116,0.8)",
    "0px 2px 12px rgba(130,148,116,0.8)"
  );
  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
  };

  const openModal = (article: Article) => {
    setSelectedArticle(article);
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  const findUserName = (userId: string): string => {
    const user = users.find((u) => u._id === userId);
    return user ? user.name : 'User';
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

  return (
    <VStack spacing={4} overflowY="auto">
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
          <Heading fontSize="4xl" color="#426b1f">
            Welcome to The Newsfeed, Marketing Manager!
          </Heading>
          <Text fontSize="md" color="gray.500">
            Browse and download our favorite articles from students across all
            faculties.
          </Text>
          <Divider my={6} borderWidth={2} borderColor="#426B1F" width="100%" />
          <HStack mb={5} gap={6}>
            <InputGroup minW={450} maxW={900}>
              <InputLeftElement pointerEvents="none">
                <FaSearch />
              </InputLeftElement>
              <Input
                placeholder="Search an article"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <div
                className="dropdown"
                style={{
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                  margin: "2px 0",
                  border: "1px solid gray",
                }}
              >
                {articles
                  .filter((article) => {
                      article.text.toLowerCase().includes(value.toLowerCase())
                  })
                  .slice(0, 5)
                  .map((article) => (
                    <div className="dropdown-row" style={{ textAlign: "start" }}>
                      <a href="#">{stripHtmlTags(article.text)}</a>
                    </div>
                  ))}
              </div>
            </InputGroup>

            <Flex gap={6}>
              <Select placeholder="Sort by" boxShadow={boxShadowColor} width={40}>
                <option value="date">Date</option>
                <option value="name">Name</option>
                <option value="faculty">Faculty</option>
              </Select>
              <Button
                rightIcon={
                  isAscending ? (
                    <Icon as={FaSortAmountUp} />
                  ) : (
                    <Icon as={FaSortAmountDown} />
                  )
                }
                variant="outline"
                onClick={toggleSortOrder}
                boxShadow={boxShadowColor}
                minW={180}
              >
                {isAscending ? "Ascending" : "Descending"}
              </Button>
            </Flex>
            <Button
              bg="#426b1f"
              color="whitesmoke"
              variant="ghost"
              colorScheme="green"
              _hover={{ bg: "#BDD7A6", color: "#426b1f" }}
              _focus={{ boxShadow: "none" }}
              transition="background-color 0.2s, box-shadow 0.2s"
              minW={150}
            >
              Submit
            </Button>
          </HStack>

          <Grid
            templateColumns="repeat(2, minmax(150px, 5fr))"
            gridAutoRows="minmax(min-content, auto)"
            gap={38}
          >
            {articles.slice(0, articlesToShow).map((article) => (
              <Box
                key={article._id}
                bg="#F7FAFC"
                p={5}
                boxShadow={boxShadowColor}
                borderRadius="lg"
                cursor="pointer"
                onClick={() => openModal(article)}
                w="550px"
                mb={10}
              >
                <HStack spacing={4}>
                  <Avatar src={findUserName(article.student_id)} name={findUserName(article.student_id)} />
                  <VStack  alignItems="flex-start">
                    <Text fontSize="lg" fontWeight="bold">
                      {findUserName(article.student_id)}
                    </Text>
                    <Text fontSize="sm" color="gray.400" fontStyle="italic">
                      Submitted {article.createdAt}
                    </Text>
                  </VStack>
                  <Spacer />
                  <VStack>
                    <Tag
                      key={article.entry_id}
                        variant="solid"
                        colorScheme={getRandomColorScheme()}
                        borderRadius="full"
                        minW={60}
                      minH={10}
                    >
                      {findEntryName(article.entry_id)}
                    </Tag>
                  <Button
                    bg="#426b1f"
                    color="whitesmoke"
                    variant="ghost"
                    colorScheme="green"
                    _hover={{ bg: "whitesmoke", color: "#426b1f" }}
                    _focus={{ boxShadow: "none" }}
                    transition="background-color 0.2s, box-shadow 0.2s"
                    borderRadius="full"
                    minW={54}
                    w={60}
                    key={article._id}
                    onClick={handleDownload}
                  >
                    Download
                  </Button>
                </VStack>
              </HStack>
              <Heading fontSize="3xl" mt={4}>
                {stripHtmlTags(article.text)}
              </Heading>
              <Image
                display="flex"
                mt={4}
                boxSize="300px"
                src={url + `assets/uploads/${article.images}`}
                alt={stripHtmlTags(article.text)}
                mx="auto"
                maxW="250px"
                maxH="300px"
              />
            </Box>
          ))}

          <Modal
            isOpen={selectedArticle !== null}
              onClose={closeModal}
              isCentered
              motionPreset="slideInBottom"
              size="6xl"
          >
            <ModalOverlay />
            <ModalContent>
                <HStack m="12">
                  <VStack>
                    <HStack spacing={10} mb={6}>
                      <Avatar
                        size="xl"
                        src={selectedArticle?.student_id}
                      />
                      <VStack alignItems="flex-start">
                        <Text fontSize="xl" fontWeight="bold">
                          {findUserName(selectedArticle?.student_id ?? 'Searching Username...')}
                        </Text>
                        <Text fontSize="lg" color="gray.400" fontStyle="italic">
                          {selectedArticle?.createdAt
                            ?'Submitted at ' + selectedArticle.createdAt.toLocaleString()
                            : "No submit date"}
                        </Text>
                      </VStack>
                      <Spacer /> 
      
                        <Tag
                          key={selectedArticle?.entry_id}
                          variant="solid"
                          colorScheme={getRandomColorScheme()}
                          borderRadius="full"
                          minW={40}
                          maxW={50}
                          minH={10}
                          maxH={16}
                        >
                          {findEntryName(selectedArticle?.entry_id ?? 'Searching Entry...')}
                        </Tag>

                    </HStack>
                    <Heading fontSize="4xl" fontStyle="bold" mb={6}>
                      {selectedArticle?.text}
                    </Heading>
                    <Button
                      fontSize="2xl"
                      bg="#426b1f"
                      color="whitesmoke"
                      variant="ghost"
                      colorScheme="green"
                      _hover={{ bg: "whitesmoke", color: "#426b1f" }}
                      _focus={{ boxShadow: "none" }}
                      transition="background-color 0.2s, box-shadow 0.2s"
                      borderRadius="10"
                      w={300}
                      minH={14}
                      mt={10}
                      alignItems="center"
                      value={selectedArticle?._id}
                      onClick={handleDownload}
                    >
                      Download
                    </Button>
                  </VStack>
                  <Divider
                    orientation="vertical"
                    minH="450px"
                    borderColor="#426b1f"
                    borderWidth={2}
                    mx={6}
                  />
                    <VStack alignItems="flex-start">
                      <Heading fontSize="xl">Files:</Heading>
                      <VStack spacing={2} alignItems="flex-start">
                        {selectedArticle?.files &&
                          selectedArticle.files.map((file, index) => (
                            <Box key={index}>
                              <Text>{file}</Text>
                            </Box>
                          ))}
                      </VStack>
                      <Heading fontSize='xl'>Images: </Heading>
                    <Image display="flex" mt={4} boxSize="400px"
                      src={url + `assets/uploads/${selectedArticle?.images}`}
                      alt={selectedArticle?.text}
                      mx="auto"
                      maxW="500px"
                      maxH="500px"
                    />                  
                    </VStack>

                </HStack>
                <ModalCloseButton />
            </ModalContent>
          </Modal>
        </Grid>
        {articles.length > articlesToShow && (
            <Button
              onClick={handleLoadMore}
              bg="#426b1f"
              color="whitesmoke"
              variant="outline"
              colorScheme="green"
              _hover={{ bg: "whitesmoke", color: "#426b1f" }}
              _focus={{ boxShadow: "none" }}
              transition="background-color 0.2s, box-shadow 0.2s"
              minW={50}
              w="50%"
              m={10}
            >
              Load More Articles
            </Button>
        )}
      </>
    )}
    </VStack>
  );
}

function MMNewsfeed() {
  return (
    <Box>
      <LoggedinHeader />
      <ArticleList />
      <Footer />
    </Box>
  );
}

export default MMNewsfeed;