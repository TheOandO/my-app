import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { LoggedinHeader } from "./AdminHome.page";
import { useNavigate } from "react-router-dom";

function CreateTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const toast = useToast();

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Form submission logic here
    toast({
      title: "Topic created.",
      description: "We've created your topic for you.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    // After submission clear the form
    setTitle("");
    setDescription("");
    setImageSrc("");
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
                placeholder="Boxed water is better !!!"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                size="lg" // Increased size for larger input
              />
            </FormControl>
            <FormControl id="topic-description" isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Description (200 words max)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={200}
                size="lg" // Increased size for larger textarea
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
}

export default CreateTopic;
