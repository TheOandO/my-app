import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  VStack,
  Link,
  Box,
  Text,
  Flex,
  Input,
  Collapse,
  Heading,
  StackDivider,
  HStack,
  InputGroup,
  InputLeftElement,
  Image,
  Avatar,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaFile, FaFilePdf, FaFileWord, FaNewspaper } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { LoggedinHeader } from "../admin/AdminHome.page";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { Schema } from "mongoose";

interface Comment {
  _id: string
  text: string;
  user_id: string;
  article_id: string
}
interface CommentFormData {
  text: string;
  user_id: string;
  article_id: string;
}
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

interface Entry {
  _id: string;
  name: string;
  dateline1: Date,
  dateline2: Date,
  faculty_id: Schema.Types.ObjectId
}

export function MCSidebar() {
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
        <Link as={RouterLink} to="/MC/PendingArticles">
          <Button
            bg={isActive("/MC/PendingArticles") ? "whitesmoke" : "transparent"}
            _hover={
              isActive("/MC/PendingArticles")
                ? {}
                : { bg: "#fff", color: "#2d4b12" }
            }
            leftIcon={<FaNewspaper />}
            color={isActive("/MC/PendingArticles") ? "#2d4b12" : "whitesmoke"}
            w="300px"
            variant="outline"
          >
            View Pending Articles
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

function ArticleList() {
  const [pendingArticles, setArticles] = useState<Article[]>([]);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const accessToken = localStorage.getItem('access_token');
  const toast = useToast();
  const [comments, setComments] = useState<Comment[]>([]); // Placeholder for comments state
  const [formData, setFormData] = useState<CommentFormData>({
    text: "",
    user_id: "",
    article_id: "",
  });

  const fetchComments = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/comment/get-all", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      console.log("Comments API Response:", response.data);
      setComments(response.data);
    } catch (error) {
      setErrorMessage("Error fetching users");
      setShowError(true);
      setTimeout(() => setShowError(false), 10000);
    }
  };


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

  const fetchEntries = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/entry/get-all", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      console.log("Entries API Response:", response.data);
      setUsers(response.data.data);
    } catch (error) {
      setErrorMessage("Error fetching Entries");
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
    Promise.all([fetchUsers(), fetchEntries(), fetchComments()])
      .then(() => fetchArticles())
      .catch(error => {
        console.error("Error fetching users and entries:", error);
        setErrorMessage("Error fetching users and entries");
        setShowError(true);
        setTimeout(() => setShowError(false), 10000);
      });
  }, []);
  //   //   id: 1,
  //   //   title: "No alarms to no surprises",
  //   //   description:
  //   //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris eu ex tincidunt scelerisque vel et risus. Fusce et lorem metus. Fusce pellentesque sed lacus at facilisis. Suspendisse in.",
  //   //   status: "Rejected" as StatusType,
  //   //   image:
  //   //     "https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/Radiohead_-_No_Surprises_%28CD1%29.jpg/220px-Radiohead_-_No_Surprises_%28CD1%29.jpg",
  //   //   authorId: "Mike Hawk",
  //   //   timeSubmitted: new Date("2024-03-25T12:00:00Z"),
  //   // },
  //   // {
  //   //   id: 2,
  //   //   title: "There could be hell below, below",
  //   //   description:
  //   //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris eu ex tincidunt scelerisque vel et risus. Fusce et lorem metus. Fusce pellentesque sed lacus at facilisis. Suspendisse in.",
  //   //   status: "Overdue" as StatusType,
  //   //   image:
  //   //     "https://i.discogs.com/DV7a-pnwsxi06Ci9Fxyy8pKjWWvDgQAR9RrLE7gOMgo/rs:fit/g:sm/q:90/h:600/w:594/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU2ODk0/ODAtMTM5OTk5NzU2/OC0yMDQ0LmpwZWc.jpeg",
  //   //   authorId: "Mike Hawk",
  //   //   timeSubmitted: new Date("2024-03-26T12:00:00Z"),
  //   // },
  //   // {
  //   //   id: 3,
  //   //   title: "Mother Earth is pregnant for the third time",
  //   //   description:
  //   //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris eu ex tincidunt scelerisque vel et risus. Fusce et lorem metus. Fusce pellentesque sed lacus at facilisis. Suspendisse in.",
  //   //   status: "Waiting" as StatusType,
  //   //   image:
  //   //     "https://vinylcoverart.com/media/album-covers/3065/funkadelic-maggot-brain.jpg",
  //   //   authorId: "Mike Hawk",
  //   //   timeSubmitted: new Date("2024-03-27T12:00:00Z"),
  //   // },
  // ]);

  const findUserName = (userId: string): string => {
    const user = users.find((u) => u._id === userId);
    return user ? user.username : 'Unknown User';
  };

  const findEntryName = (entryId: string): string => {
    const entry = entries.find((e) => e._id === entryId);
    return entry ? entry.name : 'Unknown Entry';
  };

  const handleExpandClick = async (article: Article) => {
    setExpandedArticleId(expandedArticleId === article._id ? null : article._id);
    
    // If expanding the article, fetch comments for the article
    if (expandedArticleId !== article._id) {
      try {
        const response = await axios.get("http://localhost:3001/api/comment/get-all", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            article_id: article._id,
          },
        });
        console.log("Comments API Response:", response.data);
        setComments(response.data.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
      }
    }
  };
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/comment/create", {
        text: formData.text,
        user_id: formData.user_id,
        article_id: formData.article_id
      });
      toast({
        title: "Comment created.",
        description: "We've created your comment for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setFormData({ ...formData, text: "" });     
      window.location.reload()
    } catch (error: any) {
      console.error("Error adding comment");
      toast({
        title: "Error adding comment",
        description: "Error adding comment",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

  };

  const stripHtmlTags = (html: string) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const getFileIcon = (fileName:any) => {
    const fileExtension = fileName.split('.').pop().toLowerCase();
    switch (fileExtension) {
      case 'pdf':
        return <FaFilePdf style={{ fontSize: '4em' }} />;
      case 'doc':
      case 'docx':
        return <FaFileWord style={{ fontSize: '4em' }} />;
      default:
        return <FaFile style={{ fontSize: '4em' }} />;
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
      <Box bg="#F7FAFC" p={5}>
        <Heading size="lg" color="#2D3748">
          Pending Articles: {pendingArticles.length}
        </Heading>
        <InputGroup size="lg" mt={4}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.500" />
          </InputLeftElement>
          <Input placeholder="Search an article" />
        </InputGroup>
      </Box>
      {/* Map through pending articles */}
      {pendingArticles.map((article) => (
        <Box key={article._id}>
          <HStack p={5} spacing={4} align="center" borderBottomWidth="1px">
            <Avatar
              name={findUserName(article.student_id)}
            />

            <VStack align="flex-start" flex={1}>
              <Text fontSize="xl">{findUserName(article.student_id)}</Text>
              <Text fontSize="xl" fontStyle='italic'>{findEntryName(article.entry_id)}</Text>
            </VStack>

            <VStack align="flex-start" flex={4}>
              <Heading fontSize="3xl">{stripHtmlTags(article.text)}</Heading>
            </VStack>

            {article.images && (
              <Image
                borderRadius="md"
                boxSize="150px"
                src={article.images}
                alt='image'
              />
            )}

            {article.files && Array.isArray(article.files) &&(
              <Flex alignItems="center">
                {article.files.map((file, index) => (
                  <Box key={index} mx={4}>
                    {getFileIcon(file)} {/* Function to get file icon based on file type */}
                    <Text>{file}</Text> {/* Display filename */}
                  </Box>
                ))}
              </Flex>
            )}

            <Button
              aria-label="Expand article"
              onClick={() => handleExpandClick(article)}
              variant="ghost"
            >
              {expandedArticleId === article._id ? "Collapse" : "Expand"}{" "}
              {expandedArticleId === article._id ? (
                <ChevronUpIcon />
              ) : (
                <ChevronDownIcon />
              )}
            </Button>
          </HStack>

          <Collapse
            in={expandedArticleId === article._id}
            animateOpacity
            unmountOnExit
          >
            {expandedArticleId === article._id && (
              <VStack align="stretch" p={5}>
                <Box>
                {/* {comments.map((comment) => (
                  <Box key={comment._id}>
                    <Text>{comment.text}</Text>
                  </Box>
                ))} */}
                  <Input
                    type="text"
                    placeholder="Add your comments"
                    id="text"
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                    size="lg"
                    mb={4}
                  />
                  <Button
                    bg="#426b1f"
                    color="#fff"
                    _hover={{ bg: "#fff", color: "#2d4b12" }}
                    onClick={(e) => handleSubmit(e)}
                  >
                    Send Comment
                  </Button>
                </Box>
              </VStack>
            )}
          </Collapse>
        </Box>
      ))}
    </VStack>
  );
}

function PendingArticles() {
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

  return (
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
          <Flex>
            <MCSidebar />
            <ArticleList />
          </Flex>
        </>
      )}
    </Box>
  );
}

export default PendingArticles;
