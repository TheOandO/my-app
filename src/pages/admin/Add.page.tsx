import {
    Box,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Select,
    Button,
    useColorModeValue,
    Heading
} from '@chakra-ui/react';
import { LoggedinHeader } from './AdminHome.page';


function AddForm() {
    // Form submission handler
    const handleFormSubmit = (e: any) => {
        e.preventDefault();
        // Logic to handle form submission
    };

    return(
        <form onSubmit={handleFormSubmit}>
                        <VStack spacing={4}>
                            <Heading as="h1" size="2xl" color="#2d4b12" my={4}>Add an account</Heading>
                            <FormControl id="fullName">
                                <FormLabel>Full name</FormLabel>
                                <Input type="text" placeholder="Ex: Tony Lavon" isRequired/>
                            </FormControl>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" placeholder="Ex: tony@website.edu" isRequired/>
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input type="password" placeholder="Ex: 123456" isRequired/>
                            </FormControl>
                            <FormControl id="role">
                                <FormLabel>Role</FormLabel>
                                <Select placeholder="Select role">
                                    <option value="Student">Student</option>
                                    <option value="MarketingManager">Marketing Manager</option>
                                    <option value="MarketingManager">Marketing Manager</option>
                                    <option value="MarketingCoordinator">Marketing Coordinator</option>
                                    <option value="Admin">Administrator</option>
                                    <option value="Guest">Guest</option>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>
                                    <Select placeholder='Select Major'>
                                        <option value="Photography">Photography</option>
                                        <option value="CompScience">CompScience</option>
                                        <option value="Design">Design</option>
                                        <option value="None">None</option>
                                    </Select>
                                </FormLabel>
                            </FormControl>
                            <FormControl id="faculty">
                                <FormLabel>Faculty</FormLabel>
                                <Select placeholder="Select faculty">
                                    <option value="facultyA">Faculty A</option>
                                    <option value="facultyB">Faculty B</option>
                                    <option value="facultyC">Faculty C</option>
                                </Select>
                            </FormControl>
                            <Button
                                type="submit"
                                bg="#2d4b12"
                                color="white"
                                variant='outline'
                                _hover={{
                                    bg: "#fff",
                                    color:"#2d4b12",
                                    transform: 'translateY(-2px)'
                                }}
                                width="full"
                                transition="background-color 0.2s, box-shadow 0.2s, transform 0.2s"
                                _focus={{ boxShadow: "none" }}
                                mt={10}
                            >
                                Sign up
                            </Button>
                        </VStack>
                    </form>
    )
}

function Add() {
    // For gradient background
    const formBackground = useColorModeValue('white', 'gray.700');

    return (
        <Box bgGradient="linear(to-t, #e1f5dd, rgba(44, 44, 44, 0.1))" minH="100vh" px={6}>
            <LoggedinHeader/>
            <VStack spacing={8} mx="auto" maxW="xl" px={6} mt={200}>
                <Box
                    borderRadius="lg"
                    boxShadow="lg"
                    bg={formBackground}
                    p={8}
                    minW={{ base: "90%", md: "468px" }}
                >
                    <AddForm />
                </Box>
            </VStack>
        </Box>
    );
}
  
export default Add;
  