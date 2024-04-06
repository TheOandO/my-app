import { Avatar, Box, Button, Flex, HStack, VStack, Text, InputGroup, Input, InputRightElement, FormControl, FormLabel, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, ModalFooter, useDisclosure } from "@chakra-ui/react";
import { AdminHeader } from "./admin/AdminHome.page";
import { EditIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useParams } from "react-router-dom";

// Dummy profile data
const profile = [
  {
    id: 1,
    name: 'Mike Hawk',
    email: 'hawk@website.edu',
    faculty: 'Faculty A',
    password: 'password123',
    major: 'Computer Science',
    image: 'path-to-avatar-image.jpg' // Replace with actual path to the avatar image
  },
  {
    id: 2,
    name: 'Sarah Lee',
    email: 'sarah.lee@university.com',
    faculty: 'Faculty B',
    password: 'secure_password',
    major: 'Biology',
    image: 'path-to-sarah-avatar.png' // Replace with actual path to the avatar image
  },
  {
    id: 3,
    name: 'David Kim',
    email: 'david_kim@hotmail.co.kr',
    faculty: 'Faculty C',
    password: 'coding_is_fun',
    major: 'Software Engineering',
    image: 'path-to-david-avatar.gif' // Replace with actual path to the avatar image
  }
];
  
const ProfileCard : React.FC<{ profileId: number }> = ({ profileId }) =>{
  const selectedProfile = profile.find((profile) => profile.id === profileId);
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!selectedProfile) {
    return <Text>Profile not found!</Text>;
  }

  return (
    <VStack spacing={4} align="flex-start" w="100%" bg="#fff" m='10'>
      <Box bg='#869876' p={4} borderRadius="lg" w="100%">
        <HStack spacing={4} align="center">
          <Avatar name={selectedProfile.name} src={selectedProfile.image} size="xl" />
          <VStack spacing={0} align="flex-start">
            <Text fontWeight="bold" fontSize="2xl" color="#fff">
              {selectedProfile.name}
            </Text>
            <Text fontSize="md" color="#fff">
              Student of {selectedProfile.faculty}
            </Text>
          </VStack>
        </HStack>
      </Box>

      <Box bg='#869876' p={4} borderRadius="lg" w="100%">
        <VStack spacing={4} align="flex-start">
          <Text fontSize="4xl" fontWeight="bold" color="#fff" mb={2}>
            Personal information
          </Text>
          <HStack justifyContent="space-between" w="full" fontSize="xl">
            <Text color="#fff">Name</Text>
            <Text color="#fff">{selectedProfile.name}</Text>
          </HStack>
          <HStack justifyContent="space-between" w="full" fontSize="xl">
            <Text color="#fff">Email</Text>
            <Text color="#fff">{selectedProfile.email}</Text>
          </HStack>
          <HStack justifyContent="space-between" w="full" fontSize="xl">
            <Text color="#fff">Faculty</Text>
            <Text color="#fff">{selectedProfile.faculty}</Text>
          </HStack>
          <HStack justifyContent="space-between" w="full" fontSize="xl">
            <Text color="#fff">Major</Text>
            <Text color="#fff">{selectedProfile.major}</Text>
          </HStack>
          <VStack justifyContent="space-between" w="full" alignItems="flex-start" fontSize="xl">
            <Text color="#fff">Password</Text>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={showPassword ? 'text' : 'password'}
                value={selectedProfile.password}
                isReadOnly
                color="#fff"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={toggleShowPassword} colorScheme="green">
                  {showPassword ? <ViewOffIcon color="#fff" /> : <ViewIcon color="#fff" />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </VStack>


            <Button
        rightIcon={<EditIcon />}
        bg="#fff"
        color='#426b1f'
        variant="solid"
        size="xl"
        p="4"
        fontSize="lg"
        onClick={onOpen}
      >
        Edit
      </Button>
          </VStack>
    {/* Edit Profile Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Your form fields for avatar, old password, new password, and confirm new password here */}
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Upload Avatar</FormLabel>
                <Input type="file" accept="image/*" />
              </FormControl>
              <FormControl>
                <FormLabel>Old Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <FormControl>
                <FormLabel>New Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <FormControl>
                <FormLabel>Confirm New Password</FormLabel>
                <Input type="password" />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button bg='whitesmoke' color='#426b1f' variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button bg='#426b1f' color='whitesmoke' variant="ghost" colorScheme="green" _hover={{ bg:"whitesmoke", color:'#2d4b12'}} _focus={{ boxShadow: "none" }} transition="background-color 0.2s, box-shadow 0.2s">
                Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </Box>
      </VStack>
    );
  };
  

function MyAccount() {
  const { id } = useParams();

    return(
        <Box>
            <AdminHeader />
            <Flex>
                <ProfileCard profileId={parseInt(id as string)}/>
            </Flex>
        </Box>
    )
}

export default MyAccount