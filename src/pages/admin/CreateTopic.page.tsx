import React, { useState, useEffect } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
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
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { LoggedinHeader } from "./AdminHome.page";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Schema, model } from "mongoose";
import { Label } from "../../components/Login.styles";

interface Faculty {
  _id: string;
  name: string;
  marketing_coordinator_id: string;
}
interface EntryFormData {
  name: string;
  dateline1: string;
  dateline2: string;
  facultyId: string;
  description: string;
  [key: string]: string;
}

const CreateTopic: React.FC = () => {
  const [description, setDescription] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const toast = useToast();

  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<EntryFormData>({
    name: "",
    dateline1: "",
    dateline2: "",
    description: "",
    facultyId: "",
  });

  const fetchFaculties = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/faculty/get-all"
      );
      console.log("Faculty API Response:", response.data);
      setFaculties(response.data.data);
    } catch (error) {
      setErrorMessage("Error fetching faculties");
      setShowError(true);
      setTimeout(() => setShowError(false), 10000);
    }
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (upload) {
        if (upload.target && typeof upload.target.result === "string") {
          setImageSrc(upload.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageSrc("");
  };
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
    // Form submission logic here
    try {
      await axios.post("http://localhost:3001/api/entry/create", {
        name: formData.name,
        dateline1: Date.now(),
        dateline2: Date.now(),
        description: formData.description,
        faculty_id: formData.facultyId,
      });
    } catch (error: any) {
      console.error("error adding topic", error.res.data);
      toast({
        title: "Error adding topic.",
        description: error.res.data,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    toast({
      title: "Topic created.",
      description: "We've created your topic for you.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    // After submission clear the form
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
          <Heading
            as="h2"
            size="lg"
            mb={4}
            textColor="#426B1F"
            textAlign="center"
          >
            Create a Topic
          </Heading>

          <Divider my={4} borderColor="#426B1F" width="100%" />

          <VStack as="form" onSubmit={handleSubmit} spacing={6}>
            <FormControl id="topic-title" isRequired>
              <FormLabel>Topic title</FormLabel>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Boxed water is better!!!!"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id="topic-description" isRequired>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                id="description"
                name="description"
                placeholder="Input description"
                required
                value={formData.description}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="facultyId" isRequired>
              <FormLabel>Select Faculty</FormLabel>
              <select
                id="facultyId"
                name="facultyId"
                value={formData.facultyId}
                onChange={handleChange}
              >
                <option value="">Select Faculty</option>
                {faculties.map((faculty) => (
                  <option key={faculty._id} value={faculty._id}>
                    {faculty.name}
                  </option>
                ))}
              </select>
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
                onClick={(e) => handleSubmit(e)}
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
              >
                Accept
              </Button>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default CreateTopic;
