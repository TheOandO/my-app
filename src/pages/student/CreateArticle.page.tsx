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
  FormErrorMessage,
  Text
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { LoggedinHeader } from "../admin/AdminHome.page";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

interface Article {
  text: string;
  files: (string | File)[];
  images: string[];
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

function CreateArticle() {
  const [, setText] = useState("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [userRole, setUserRole] = useState('');
  const [form, setForm] = useState<Article>({
    text: "",
    files: [],
    images: [],
    entryid: "",
    studentid: "",
    school_yearid: "",
    term_condition: false,
  })
  const toast = useToast();
  const url = 'http://localhost:3001/'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleText = (value: string) => {
    setForm(prevForm => ({
      ...prevForm,
      text: value,
    }));
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (upload) {
        if (upload && upload.target && typeof upload.target.result === "string") {
          setImageSrc(upload.target.result);
          // Set the image file directly
          setForm(prevForm => ({
            ...prevForm,
            images: [file], // Save the file directly
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageSrc("");
    setForm(prevForm => ({
      ...prevForm,
      images: [], // Clear the image array
    }));
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setForm(prevForm => ({
        ...prevForm,
        files: [file], // Save the file directly
      }));
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
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
          const response = await axios.get(url + "api/entry/get-all");
  
          // Filter entries based on faculty_id
          const filteredEntries: Entry[] = response.data.data.filter((entry: Entry) => entry.faculty_id === facultyId);
  
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

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        // Make a request to the /validate endpoint to check token validity
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
        setShowError(true)
        setErrorMessage('Unauthorized Access')

        // If token is invalid or expired, attempt to refresh it
        try {
          const refreshResponse = await axios.post(url + "api/user/refresh", {
            user: localStorage.getItem('user'),
          });

          // If refresh is successful, update the access token and continue rendering the student homepage
          console.log(refreshResponse.data.message);
          localStorage.setItem('access_token', refreshResponse.data.access_token);
          setUserRole(refreshResponse.data.user.roles);

          // setShowError(false)
          
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          // If refresh fails, redirect the user to the login page
          setShowError(true)
          setErrorMessage('Unauthorized Access')

        }
      }
    }
    checkTokenValidity();
    fetchEntries()
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  // Perform validation
    if (!form.entryid || !form.text || !isTermsAccepted) {
      // If any required field is empty or checkbox is unchecked, show error message
      toast({
        title: 'Form Validation Error',
        description: 'Please fill out all required fields and accept the terms & conditions.',
        status: 'error',
        duration: 10000,
        isClosable: true,
      });

      return;
    } else {
      try {
        const accessToken = localStorage.getItem('access_token');
        const userDataString = localStorage.getItem('user');
        const userData = userDataString ? JSON.parse(userDataString) : null; // Parse user data
        const studentId = userData ? userData._id : '';

        const SYresponse = await axios.get(url + "api/school-year/get-all");
        const schoolYearsData = SYresponse.data.data;
        const lastSchoolYear = schoolYearsData.length > 0 ? schoolYearsData[schoolYearsData.length - 1]._id : null;
    
        // Check if the last school year is valid and not expired
        if (lastSchoolYear) {
            const formData = new FormData();
            formData.append('term_condition', form.term_condition.toString());
            formData.append('text', form.text);

            // Append files if selected
            if (selectedFile) {
              formData.append('files', selectedFile || null);
            } 

            if (imageSrc) {
              const imageBlob = await fetch(imageSrc).then((res) => res.blob());
              const imageFile = new File([imageBlob], 'image.jpg', { type: 'image/jpeg' }); // Adjust the file name and type as needed
              formData.append('images', imageFile || null);
            }
              
            formData.append('entry_id', form.entryid);
            formData.append('student_id', studentId);
            formData.append('school_year_id', lastSchoolYear);
            const response = await axios.post(
              url + "api/article/create", formData,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  'Content-Type': 'multipart/form-data'
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
            setImageSrc(null);
            setSelectedFile(null);
            navigate('/student/MyArticles')

        } else {
          // Handle case where no valid school year is found
          setErrorMessage("No valid school year found");
          setShowError(true);
          setTimeout(() => setShowError(false), 10000);
        }
      } catch (error) {
        console.error("Error creating article:", error);
        setErrorMessage("Error creating article");
        setShowError(true);
        setTimeout(() => setShowError(false), 10000);
      }      
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
      {userRole.includes('student') && (
        <>
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
            Create an Article
          </Heading>

          <Divider my={4} borderColor="#426B1F" width="100%" />

          <VStack as="form" onSubmit={handleSubmit} spacing={12}>
            <FormControl id="article-topic" isRequired isInvalid={!form.entryid}>
            <FormErrorMessage>Please choose a topic</FormErrorMessage>
              <FormLabel htmlFor="entryId">Choose a topic</FormLabel>
              <Select id="entryId" name="entryid" value={form.entryid} onChange={handleChange}>
              <option value="">Select a Topic</option>
              {entries.map((entry) => (
                <option key={entry._id} value={entry._id}>
                  {entry.name}
                </option>
              ))}
              </Select>
            </FormControl>
            <FormControl id="article-description" isRequired isInvalid={!form.text}>
            <FormErrorMessage>Please enter a description</FormErrorMessage>
              <FormLabel>Description</FormLabel>
              <ReactQuill
                style={{ width: "100%", height: "300px" }}
                theme="snow"
                value={form.text}
                onChange={handleText}
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
            </FormControl>
            <FormControl>
              <FormLabel>File Upload</FormLabel>
              <Box width='full'>
                {selectedFile && (
                  <Box position="relative">
                    <Text>{selectedFile.name}</Text>
                  </Box>
                )}
                <Input
                  type="file"
                  id="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" // Specify accepted file types
                  onChange={handleFileChange}
                />
                  <IconButton
                    aria-label="Remove file"
                    icon={<CloseIcon />}
                    size="sm"
                    colorScheme="red"
                    position="absolute"
                    top="0"
                    right="0"
                    onClick={handleRemoveFile}
                  />
              </Box>
            </FormControl>
            <FormControl>
              <FormErrorMessage>Please accept the terms & conditions</FormErrorMessage>
              <Checkbox
                onChange={(e) => {
                  setIsTermsAccepted(e.target.checked);
                  // Set term_condition to true when the checkbox is checked
                  if (e.target.checked) {
                    form.term_condition = true
                  };
                }}
                defaultChecked={isTermsAccepted}
                isRequired
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
<Heading>1. Introduction</Heading>

These Terms of Service ("Terms") govern your access to and use of Website ("Website"), a platform that allows users to upload, share, and access articles ("Articles"). By accessing or using the Website, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access or use the Website.

<Heading>2. User Accounts</Heading>

2.1 You may be required to create an account ("Account") to access certain features of the Website. You are responsible for maintaining the confidentiality of your account information, including your username and password. You are also responsible for all activity that occurs under your Account.

2.2 You agree to provide true, accurate, current, and complete information when creating your Account. You agree to update your Account information to keep it accurate.

2.3 You may not use the Website for any illegal or unauthorized purpose. You are solely responsible for your use of the Website and for any violations of law or the rights of others that may result from your use of the Website.

<Heading>3. Content Ownership</Heading>

3.1 You retain all ownership rights to the Articles you upload to the Website.

3.2 By uploading Articles to the Website, you grant Website a non-exclusive, royalty-free, worldwide license to display, reproduce, modify, translate, publish, distribute, and otherwise use your Articles on the Website and for promotional purposes.

3.3 You are solely responsible for ensuring that you have the necessary rights to upload any Articles to the Website, including any intellectual property rights.

<Heading>4. User Conduct</Heading>

4.1 You agree not to upload any Articles that are:

Illegal, obscene, defamatory, threatening, harassing, abusive, hateful, or discriminatory.
In violation of any intellectual property rights of another person.
That contain viruses, malware, or other harmful code.
4.2 You agree not to use the Website to spam, advertise, or solicit others.

4.3 You agree not to impersonate any person or entity, or to falsely state or misrepresent your affiliation with a person or entity.

4.4 You agree not to interfere with or disrupt the Website or its servers.

<Heading>5. Termination</Heading>

Website may terminate your Account or your access to the Website at any time, for any reason, without notice.

<Heading>6. Disclaimer</Heading>

The Website and the Articles are provided "as is" and without warranties of any kind, express or implied. Website disclaims all warranties, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
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
                onClick={handleSubmit}
              >
                Post
              </Button>
            </HStack>
          </VStack>
        </Box>
      </VStack>
      </>
        )}
    </Box>
  );
}

export default CreateArticle;
