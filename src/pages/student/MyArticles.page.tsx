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
} from "@chakra-ui/react";
import { FaFile, FaFilePdf, FaFileWord, FaNewspaper } from "react-icons/fa";
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
        <Link as={RouterLink} to="/Student/MyArticles">
          <Button
            bg={isActive("/Student/MyArticles") ? "whitesmoke" : "transparent"}
            _hover={
              isActive("/Student/MyArticles")
                ? {}
                : { bg: "#fff", color: "#2d4b12" }
            }
            leftIcon={<FaNewspaper />}
            color={isActive("/Student/MyArticles") ? "#2d4b12" : "whitesmoke"}
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

function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const toast = useToast();

  const handleClick = (article: any) => {
    if (article.comment) {
      setSelectedComment(article.comment); // Assuming comment is always a string
    } else {
      toast({
        // Display toast notification
        title: "No comment yet!",
        status: "info",
        duration: 2000,
        isClosable: true,
        colorScheme: "green",
      });
    }
  };

  const accessToken = localStorage.getItem("access_token");
  const userDataString = localStorage.getItem("user");
  const userData = userDataString ? JSON.parse(userDataString) : null; // Parse user data
  const userId = userData ? userData._id : ""; // Extract ID from user data
  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/article/get-by-student/${userId}`,
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
        "http://localhost:3001/api/entry/get-all"
      );
      setTopics(response.data.data);
    } catch (error) {
      setErrorMessage("Error fetching entries");
      setShowError(true);
      setTimeout(() => setShowError(false), 10000);
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
        await axios.post("http://localhost:3001/api/user/validate", {
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
            "http://localhost:3001/api/user/refresh",
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
  function ArticleModal({ articleId }: { articleId: string }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [article, setArticle] = useState<Article | null>(null);
    const [formData, setFormData] = useState({
      _id: "",
      text: "",
      files: [],
      images: [],
      entry_id: "",
      student_id: "",
      schoolyear_id: "",
    });
    const fetchArticleById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/article/get-by-id/${articleId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response.data.article);
        setArticle(response.data);
        setFormData(response.data.article);
        setIsOpen(true);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    const handleClose = () => {
      setIsOpen(false);
      setArticle(null);
    };

    const handleEdit = async (e: React.FormEvent) => {
      e.preventDefault();
      // Form submission logic here
      try {
        await axios.put(`http://localhost:3001/api/article/edit/${articleId}`, {
          text: formData.text,
          files: formData.files,
          images: formData.images,
          entry_id: formData.entry_id,
          student_id: formData.student_id,
          schoolyear_id: formData.schoolyear_id,
        });
        toast({
          title: "Article Edited.",
          description: "We've edited your article for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        window.location.reload();
      } catch (error: any) {
        console.error("Error editing article", error.res.data);
        toast({
          title: "Error editing article.",
          description: error.res.data,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };

    const handleDelete = async (e: React.FormEvent) => {
      try {
        await axios.delete(
          `http://localhost:3001/api/article/delete/${articleId}`
        );
        toast({
          title: "Articcle deleted.",
          description: "The article has been successfully deleted.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setIsOpen(false);
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
  }

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
              <Input placeholder="Search my article" />
            </InputGroup>
            <Link href="/Student/CreateArticle">
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
          {articles.map((article) => (
            <HStack
              key={article._id}
              p={5}
              spacing={4}
              align="center"
              borderBottomWidth="1px"
            >
              {article.images && Array.isArray(article.images) && (
                <>
                  {article.images.map((image, index) => (
                    <Image
                      key={index}
                      borderRadius="md"
                      boxSize="100px"
                      src={`http://localhost:3001/src/assets/uploads/${image}`}
                      alt="image"
                    />
                  ))}
                </>
              )}
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
                      {/* Function to get file icon based on file type */}
                      <Text>{file}</Text> {/* Display filename */}
                    </Box>
                  ))}
                </Flex>
              )}
              <VStack>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleClick(article)}
                >
                  View comment
                </Button>
                <Button
                  rightIcon={<EditIcon />}
                  bg="#fff"
                  color="#426b1f"
                  variant="solid"
                  size="xl"
                  p="4"
                  fontSize="lg"
                  onClick={}
                >
                  Edit
                </Button>
              </VStack>
            </HStack>
          ))}

          {/* Comment modal */}
          <Modal
            isOpen={!!selectedComment}
            onClose={() => setSelectedComment(null)}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Comment</ModalHeader>
              <ModalCloseButton />
              <ModalBody p={4}>
                {selectedComment ? (
                  <Text>{selectedComment}</Text>
                ) : (
                  <Text>No comment yet!</Text>
                )}
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
