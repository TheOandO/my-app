import {
  Box,
  Text,
  Button,
  VStack,
  Link,
  Flex,
  StackDivider,
  Heading,
  InputGroup,
  HStack,
  Input,
  InputLeftElement,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Alert,
  AlertIcon,
  Textarea,
} from "@chakra-ui/react";
import { FaFile, FaFilePdf, FaFileWord, FaNewspaper, FaTrash } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { LoggedinHeader } from "../admin/AdminHome.page";
import { AddIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { Schema } from "mongoose";

export function StudentSidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.toLowerCase() === path.toLowerCase();
  };

  return (
    <Box
      minW="350px"
      bg="#2d4b12"
      color="white"
      p={5}
      alignItems="center"
      justifyContent="center"
      minH="100vh" // Minimum height to match the viewport height
      overflowY="auto"
    >
      <VStack
        align="stretch"
        spacing={16}
        mt={20}
        alignItems="center"
        justifyContent="center"
      >
        <Link as={RouterLink} to="/student/MyArticles">
          <Button
            bg={isActive("/student/MyArticles") ? "whitesmoke" : "transparent"}
            _hover={
              isActive("/student/MyArticles")
                ? {}
                : { bg: "#fff", color: "#2d4b12" }
            }
            leftIcon={<FaNewspaper />}
            color={isActive("/student/MyArticles") ? "#2d4b12" : "whitesmoke"}
            w="300px"
            variant="outline"
          >
            View My Articles
          </Button>
        </Link>
      </VStack>
      {/* Footer */}
      <Text position="absolute" bottom={5} left={5} fontSize="sm">
        Copyright Website 2024
      </Text>
    </Box>
  );
}

interface Article {
  _id: string;
  text: string;
  files: string;
  images: string;
  entry_id: string;
  student_id: Schema.Types.ObjectId;
  schoolyear_id: Schema.Types.ObjectId;
  createdAt: string;
}
interface Topic {
  _id: string;
  name: string;
  dateline1: Date;
  dateline2: Date;
  faculty_id: Schema.Types.ObjectId;
}
interface Comment {
  _id: string
  text: string;
  user_id: string;
  article_id: string
}

function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [value, setValue] = useState("");
  const toast = useToast();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const url = 'http://localhost:3001/'

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

  const accessToken = localStorage.getItem("access_token");
  const userDataString = localStorage.getItem("user");
  const userData = userDataString ? JSON.parse(userDataString) : null; // Parse user data
  const userId = userData ? userData._id : ""; // Extract ID from user data
  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        url + `api/article/get-by-student/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setArticles(response.data.data);
      console.log(response.data);
    } catch {
      setShowError(true);
      setErrorMessage("Unauthorized Access");
    }
  };

  const fetchEntries = async () => {
    try {
      const response = await axios.get(
        url + "api/entry/get-all"
      );
      setTopics(response.data.data);
    } catch (error) {
      setErrorMessage("Error fetching entries");
      setShowError(true);
      setTimeout(() => setShowError(false), 10000);
    }
  };
  const handleDelete = async (articleId: string) => {
    try {
      await axios.delete(
        url + `api/article/delete/${articleId}`
      );
      toast({
        title: "Articcle deleted.",
        description: "The article has been successfully deleted.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting article:", error);
      toast({
        title: "Error deleting article.",
        description: "An error occurred while deleting the article.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const [topics, setTopics] = useState<Topic[]>([]);
  // Function to find faculty name by faculty id
  const findTopicName = (topicId: string): string => {
    const topic = topics.find((t) => t._id === topicId);
    return topic ? topic.name : "Entry";
  };

  const [userRole, setUserRole] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        // Make a request to the /validate endpoint to check token validity
        await axios.post(url + "api/user/validate", {
          access_token: localStorage.getItem("access_token"),
          user: localStorage.getItem("user"),
        });

        const userDataString = localStorage.getItem("user");
        const userData = JSON.parse(userDataString || "");
        const userRole = userData.roles;
        setUserRole(userRole);
      } catch (error) {
        console.error("Error validating token:", error);
        // If token is invalid or expired, attempt to refresh it
        try {
          const refreshResponse = await axios.post(
            url + "api/user/refresh",
            {
              user: localStorage.getItem("user"),
            }
          );

          console.log(refreshResponse.data.message);
          localStorage.setItem(
            "access_token",
            refreshResponse.data.access_token
          );
          setUserRole(refreshResponse.data.user.roles);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          // If refresh fails, redirect the user to the login page
          setShowError(true);
          setErrorMessage("Error refreshing token");
        }
      }
    };
    checkTokenValidity();
    fetchEntries();
    fetchArticles();
  }, []);

  const stripHtmlTags = (html: string) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const getFileIcon = (fileName: any) => {
    const fileExtension = fileName.split(".").pop().toLowerCase();
    switch (fileExtension) {
      case "pdf":
        return <FaFilePdf style={{ fontSize: "4em" }} />;
      case "doc":
      case "docx":
        return <FaFileWord style={{ fontSize: "4em" }} />;
      default:
        return <FaFile style={{ fontSize: "4em" }} />;
    }
  };
  return (
    <VStack
      divider={<StackDivider />}
      w="100%"
      h="full"
      spacing={4}
      align="stretch"
      overflowY="auto"
    >
      {showError && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
      {userRole.includes("student") && (
        <>
          <Box bg="#F7FAFC" p={5}>
            <Heading size="lg" color="#2D3748">
              My Articles: {articles.length}
            </Heading>
            <InputGroup size="lg" mt={4}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.500" />
              </InputLeftElement>
              <Input
                placeholder="Search an article"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </InputGroup>
            <Link href="/student/CreateArticle">
              <Button
                leftIcon={<AddIcon />}
                bg="#426b1f"
                color="whitesmoke"
                my={4}
                _hover={{
                  bg: "grey",
                  color: "#2d4b12",
                  transform: "translateY(-2px)",
                }}
                _focus={{ boxShadow: "none" }}
                transition="background-color 0.2s, box-shadow 0.2s, transform 0.2s"
              >
                Create New Article
              </Button>
            </Link>
          </Box>
          {articles.filter((article => article.text.toLowerCase().includes(value.toLowerCase()))).map((article) => (
            <HStack
              key={article._id}
              p={5}
              spacing={4}
              align="center"
              borderBottomWidth="1px"
            >
              <Image borderRadius="md" boxSize="310px" maxW={200} maxH={300} w={200} h={200} src={url + `assets/uploads/${article.images}`} alt="image"/>
              <Box flex={1}>
                <Text fontSize="2xl">{stripHtmlTags(article.text)}</Text>
                <Text fontSize="md">
                  Created {formatDistanceToNow(new Date(article.createdAt))} ago
                </Text>
                <Text fontSize="md" fontStyle="italic">
                  Topic: {findTopicName(article.entry_id)}
                </Text>
              </Box>

              {article.files && Array.isArray(article.files) && (
                <Flex alignItems="center">
                  {article.files.map((file, index) => (
                    <Box key={index} mx={4}>
                      {getFileIcon(file)}{" "}
                      <Text>{file}</Text>
                    </Box>
                  ))}
                </Flex>
              )}
              <VStack>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleClick(article._id)}
                >
                  View comment
                </Button>
                <Button
                  rightIcon={<FaTrash />}
                  bg="#fff"
                  color="#426b1f"
                  variant="solid"
                  size="xl"
                  p="4"
                  fontSize="lg"
                  onClick={() => handleDelete(article._id)}
                >
                  Delete
                </Button>
              </VStack>
            </HStack>
          ))}
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
    </VStack>
  );
}

function MyArticles() {
  return (
    <Box>
      <LoggedinHeader />
      <Flex>
        <StudentSidebar />
        <ArticleList />
      </Flex>
    </Box>
  );
}

export default MyArticles;
