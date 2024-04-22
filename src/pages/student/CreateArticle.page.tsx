import React, { useEffect, useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  Box,
  IconButton,
  useToast,
  HStack,
  useColorModeValue,
  Divider,
  Heading,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Checkbox,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { LoggedinHeader } from "../admin/AdminHome.page";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

interface Article {
  text: string;
  files: string;
  images: string;
  entryid: string;
  studentid: string;
  school_yearid: string;
  term_condition: boolean;
}

interface Entry {
  _id: string;
  name: string;
  dateline1: Date,
  dateline2: Date,
  faculty_id: string;
}

interface SchoolYear {
  _id: string;
  name: string,
  start_time: Date,
  end_time: Date
}

function CreateArticle() {
  const [text, setText] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [schoolyears, setSchoolyears] = useState<SchoolYear[]>([]);

  const [form, setForm] = useState<Article>({
    text: "",
    files: "",
    images: "",
    entryid: "",
    studentid: "",
    school_yearid: "",
    term_condition: false,
  })
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchEntries = async () => {
    try {
      // Retrieve user data from local storage
      const userDataString = localStorage.getItem('user');
  
      // If user data exists and contains faculty_id
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const facultyId = userData?.faculty_id; // Access faculty_id safely
  
        if (facultyId) {
          const response = await axios.get("http://localhost:3001/api/entry/get-all");
          console.log("Entries API Response:", response.data);
  
          // Filter entries based on faculty_id
          const filteredEntries: Entry[] = response.data.data.filter((entry: Entry) => entry.faculty_id === facultyId);
  
          // Set filtered entries
          setEntries(filteredEntries);
        } else {
          console.error("faculty_id not found in user data");
          setErrorMessage("Error fetching Entries");
          setShowError(true);
          setTimeout(() => setShowError(false), 10000);
        }
      } else {
        console.error("User data not found in local storage");
        setErrorMessage("Error fetching Entries");
        setShowError(true);
        setTimeout(() => setShowError(false), 10000);
      }
    } catch (error) {
      console.error("Error fetching Entries:", error);
      setErrorMessage("Error fetching Entries");
      setShowError(true);
      setTimeout(() => setShowError(false), 10000);
    }
  };
  

  const fetchSchoolYears = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/school-year/get-all");
        console.log("SchoolYears API Response:", response.data);
        setSchoolyears(response.data.data);
      } catch (error) {
      setErrorMessage("Error fetching SchoolYears");
      setShowError(true);
      setTimeout(() => setShowError(false), 10000);
    }
  };

  useEffect(() => {
    fetchEntries()
    fetchSchoolYears()
  }, [])

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (upload) {
        if (upload && upload.target && typeof upload.target.result === "string") {
          setImageSrc(upload.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageSrc("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    try {
      const accessToken = localStorage.getItem('access_token');
      const userDataString = localStorage.getItem('user');
      const userData = userDataString ? JSON.parse(userDataString) : null; // Parse user data
      const studentId = userData ? userData.student_id : ''; // Extract student ID from user data
  
      // Construct FormData object
      const formData = new FormData();
      formData.append('text', form.text);
      formData.append('files', form.files);
      formData.append('images', imageSrc);
      formData.append('entry_id', form.entryid);
      formData.append('student_id', studentId);
      formData.append('school_year_id', form.school_yearid);
  
      const response = await axios.post(
        "http://localhost:3001/api/article/create",
        formData, // Use FormData object as request body
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data', // Set content type to form-data
          },
        }
      );
  
      // Handle success response
      console.log("Article created:", response.data);
      toast({
        title: "Article created.",
        description: "Your article has been created successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
  
      // Clear the form fields
      setText("");
      setImageSrc("");
  
    } catch (error) {
      console.error("Error creating article:", error);
      setErrorMessage("Error creating article");
      setShowError(true);
      setTimeout(() => setShowError(false), 10000);
    }
  };
  
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const formBackground = useColorModeValue("white", "white.500.700");
  return (
    <Box
      bgGradient="linear(to-t, #e1f5dd, rgba(44, 44, 44, 0.1))"
      minH="100vh"
      px={6}
      overflowY="auto"
    >
      <LoggedinHeader />
      <VStack spacing={8} mx="auto" maxW="xl" px={6} mt={200} mb={200}>
        <Box
          borderRadius="lg"
          boxShadow="lg"
          bg={formBackground}
          p={8}
          width={{ base: "90%", md: "768px" }} // Increased width for medium-sized devices and up
        >
          {showError && (
            <Alert status="error" mt={4}>
              <AlertIcon />
              {errorMessage}
            </Alert>
          )}
          <Heading
            as="h2"
            size="lg"
            mb={4}
            textColor="#426B1F"
            textAlign="center"
          >
            Create a Article
          </Heading>

          <Divider my={4} borderColor="#426B1F" width="100%" />

          <VStack as="form" onSubmit={handleSubmit} spacing={6}>
            <FormControl id="article-topic" isRequired>
              <FormLabel>Choose a topic</FormLabel>
              <Select id="entryId" name="entryId" value={form.entryid} onChange={handleChange}>
              {entries.map((entry) => (
                <option key={entry._id} value={entry._id}>
                  {entry.name}
                </option>
              ))}
              </Select>
            </FormControl>
            <FormControl id="article-description" isRequired>
              <FormLabel>Description</FormLabel>
              <ReactQuill
                style={{ width: "100%", height: "300px" }}
                theme="snow"
                value={text}
                onChange={setText}
              />
            </FormControl>
            <FormControl id="image">
              <FormLabel>Image</FormLabel>
              <Box width="full">
                {imageSrc && (
                  <Box position="relative" textAlign="center">
                    <Image
                      src={imageSrc}
                      maxH="400px"
                      alt="Uploaded image preview"
                    />
                    <IconButton
                      aria-label="Remove image"
                      icon={<CloseIcon />}
                      size="sm"
                      colorScheme="red"
                      position="absolute"
                      top="0"
                      right="0"
                      onClick={handleRemoveImage}
                    />
                  </Box>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  size="md"
                  pt={2}
                  width="full" // Stretch the input to take full width
                />
              </Box>
            </FormControl>
            <FormControl>
              {/* Terms and conditions checkbox */}
              <Checkbox
                onChange={(e) => {
                  setIsTermsAccepted(e.target.checked);
                  // Set term_condition to true when the checkbox is checked
                  if (e.target.checked) {
                    form.term_condition = true
                  };
                }}
                defaultChecked={isTermsAccepted}
              >
                I agree to the{" "}
                <Button onClick={onOpen} variant="link" colorScheme="green">
                  terms & conditions
                </Button>{" "}
                upon submiting the article.
              </Checkbox>
              {/* Terms and Conditions Modal */}
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxW="800px" w="auto">
                  <ModalHeader color="#426B1F">Terms & Conditions</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras ultrices luctus metus ullamcorper pulvinar. Fusce in
                      metus eleifend ex lobortis tempus vel vel risus. Cras et
                      ante mattis, dictum nisi non, porttitor velit. Phasellus a
                      pretium mauris, egestas aliquet sapien. Donec erat felis,
                      vehicula quis augue non, pretium tempus massa.
                      Pellentesque quis vehicula massa. Morbi eget iaculis arcu,
                      vestibulum scelerisque velit. Etiam vehicula ex id ornare
                      consectetur. Aenean condimentum sem vel lectus rhoncus,
                      vel posuere risus semper. Nam lacinia eu tellus eget
                      cursus. Sed in eros justo. Morbi lobortis erat erat, in
                      dapibus tortor ultricies ut. Donec suscipit ante mattis ex
                      mollis, ac dignissim orci rhoncus. <br /> Sed eros tellus,
                      dictum quis libero at, pellentesque ornare erat. Sed
                      ullamcorper consequat justo sollicitudin facilisis.
                      Vestibulum eros urna, scelerisque eu aliquam quis, semper
                      et orci. Pellentesque placerat dapibus sem, a vehicula
                      ligula sollicitudin sit amet. Interdum et malesuada fames
                      ac ante ipsum primis in faucibus. Mauris convallis
                      volutpat erat, nec condimentum augue commodo eget. Cras
                      neque erat, imperdiet eget volutpat a, facilisis sit amet
                      risus. Morbi porta consequat dui, malesuada tristique nisl
                      scelerisque vitae. Proin pretium tempor erat sit amet
                      lacinia. Suspendisse quis diam vehicula leo eleifend
                      vestibulum. Etiam auctor metus id tellus laoreet, in
                      elementum tortor tempus. Pellentesque at tristique orci,
                      non posuere augue. Ut vitae felis fermentum, imperdiet
                      velit scelerisque, sollicitudin ipsum. Aenean ultrices
                      vehicula aliquet.
                      <br /> Praesent vehicula orci quis magna lacinia, ut
                      posuere elit fringilla. Sed porta dapibus elit a
                      consectetur. Vestibulum justo metus, venenatis eu diam at,
                      ultricies suscipit eros. Maecenas sem leo, gravida id
                      volutpat quis, elementum nec ipsum. Ut ex arcu, blandit
                      non nibh at, ultrices finibus turpis. Morbi et feugiat
                      nulla, et ullamcorper ex. Integer id enim semper,
                      condimentum dolor id, interdum sapien. Ut turpis nunc,
                      semper sit amet erat nec, iaculis imperdiet libero. In
                      condimentum eleifend magna, id molestie nulla. Phasellus
                      quis tortor in dolor vehicula fermentum nec eu arcu.
                      Aliquam erat volutpat. Vestibulum id bibendum magna, nec
                      molestie urna. Nulla porttitor odio sed lobortis accumsan.
                      Integer cursus ante non tincidunt dapibus. <br />
                      Nunc posuere luctus arcu, in finibus magna maximus eu. Ut
                      pulvinar facilisis eleifend. Aliquam sed vulputate velit,
                      a tempus metus. Sed non eleifend urna. Mauris ipsum mi,
                      tristique in velit et, aliquam luctus orci. Curabitur
                      pretium rutrum turpis. Class aptent taciti sociosqu ad
                      litora torquent per conubia nostra, per inceptos
                      himenaeos. Etiam laoreet elit at lectus lacinia varius.
                      Nullam justo turpis, elementum quis feugiat eu, iaculis et
                      risus. Etiam et dignissim dui. Suspendisse potenti.
                      Phasellus in enim eu massa laoreet tempus eget vitae
                      metus. Vivamus ornare ultrices neque quis vulputate. Nam
                      quis enim sed diam mattis dapibus et vel urna. In hac
                      habitasse platea dictumst. Class aptent taciti sociosqu ad
                      litora torquent per conubia nostra, per inceptos
                      himenaeos. In placerat justo tellus, ut vehicula augue
                      pellentesque in. Aenean semper sem at ante dictum, vitae
                      hendrerit elit efficitur.
                    </p>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </FormControl>
            <HStack width="full" justifyContent="space-between">
              <Button
                width="full"
                mr={2}
                onClick={handleBack}
                colorScheme="#f7f7f7"
                color="#2d4b12"
                variant="ghost"
              >
                Back
              </Button>
              <Button
                width="full"
                ml={2}
                colorScheme="green"
                bg="#2d4b12"
                color="white"
                variant="ghost"
                _hover={{
                  bg: "grey",
                  color: "#2d4b12",
                  transform: "translateY(-2px)",
                }}
                _focus={{ boxShadow: "none" }}
                transition="background-color 0.2s, box-shadow 0.2s, transform 0.2s"
                onClick={(e) => handleSubmit(e)}
              >
                Post
              </Button>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}

export default CreateArticle;
