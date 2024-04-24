import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  VStack,
  Link,
  Box,
  Text,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  Collapse,
  Heading,
  Textarea,
  StackDivider,
  HStack,
  InputGroup,
  InputLeftElement,
  Image,
  Avatar,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaNewspaper } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { LoggedinHeader } from "../admin/AdminHome.page";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { now } from "mongoose";
import { Schema } from "mongoose";

interface Comment {
  text: string;
  user_id: Schema.Types.ObjectId;
  article_id: Schema.Types.ObjectId;
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
  type StatusType = "Waiting" | "Rejected" | "Overdue" | "Approved";
  const [pendingArticles, setArticles] = useState<Article[]>([]);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userRole, setUserRole] = useState("");

  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/article/get-all"
      );
      console.log("Faculty API Response:", response.data);
      setArticles(response.data.data);
    } catch (error) {
      setErrorMessage("Error fetching faculties");
      setShowError(true);
      setTimeout(() => setShowError(false), 10000);
    }
  };
  useEffect(() => {
    fetchArticles();
  }, []);

  // const [pendingArticles, setArticles] = useState([
  //   // {
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

  // Add a helper function to handle the article expansion
  const handleExpandClick = (pendingArticlesID: Article["_id"]) => {
    // If the clicked article is already expanded, collapse it, otherwise expand it
    setExpandedArticleId(
      expandedArticleId === pendingArticlesID ? null : pendingArticlesID
    );
  };
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(
    null
  );
  const [comments, setComments] = useState<Comment[]>([]); // Placeholder for comments state
  const [formData, setFormData] = useState<CommentFormData>({
    text: "",
    user_id: "",
    article_id: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // function trimText(text: any, limit: any) {
  //   const words = text.split(" ");
  //   if (words.length > limit) {
  //     return words.slice(0, limit).join(" ") + "...";
  //   }
  //   return text;
  // }
  const toast = useToast();

  const handleStatusChange = (
    _id: string,
    newStatus: "Approved" | "Rejected" | "Waiting"
  ) => {
    const updatedArticles = pendingArticles.map((article) => {
      if (article._id === _id) {
        return { ...article, status: newStatus };
      }
      return article;
    });
    setArticles(updatedArticles);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/comment/create", {
        text: formData.text,
      });
    } catch (error: any) {
      console.error("error adding comment", error.res.data);
      toast({
        title: "Error adding comment",
        description: error.res.data,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    toast({
      title: "Comment created.",
      description: "We've created your comment for you.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    // After submission clear the form
  };

  const StatusButton: React.FC<{ articleId: string; status: StatusType }> = ({
    articleId,
    status,
  }) => {
    let color = "gray";
    if (status === "Approved") color = "#246B1F";
    if (status === "Rejected") color = "#6B1F1F";
    if (status === "Waiting") color = "#246B1F";
    return (
      <Menu>
        <MenuButton
          as={Button}
          bg={color}
          color="white"
          borderRadius="20px"
          rightIcon={<ChevronDownIcon />}
        >
          {status}
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => handleStatusChange(articleId, "Approved")}
            color="#426b1f"
          >
            Approve
          </MenuItem>
          <MenuItem
            onClick={() => handleStatusChange(articleId, "Rejected")}
            color="#6B1F1F"
          >
            Deny
          </MenuItem>
          <MenuItem
            onClick={() => handleStatusChange(articleId, "Waiting")}
            color="gray"
          >
            Waiting
          </MenuItem>
        </MenuList>
      </Menu>
    );
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
              name={article.student_id}
              src={`path_to_author_avatar_based_on_${article.student_id}`}
            />

            <VStack align="flex-start" flex={1}>
              <Text fontSize="xl">{article.student_id}</Text>
            </VStack>

            <VStack align="flex-start" flex={4}>
              <Heading fontSize="3xl">{article.text}</Heading>
              <Text fontSize="xl" color="gray.500">
                {expandedArticleId === article._id
                  ? article.files
                  : article.text}
              </Text>
            </VStack>

            {article.images && (
              <Image
                borderRadius="md"
                boxSize="150px"
                src={article.images}
                alt={article.text}
              />
            )}

            <StatusButton articleId={article._id} status="Approved" />
            <Button
              aria-label="Expand article"
              onClick={() => handleExpandClick(article._id)}
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
                  {/* Add a textarea or input for comments here */}
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
  return (
    <Box>
      <LoggedinHeader />
      <Flex>
        <MCSidebar />
        <ArticleList />
      </Flex>
    </Box>
  );
}

export default PendingArticles;
