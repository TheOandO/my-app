import { VStack, Button, Box, Text, Link, FormControl, FormLabel, Input, Heading, Textarea, CheckboxGroup, Stack, Checkbox, Flex, useColorModeValue} from "@chakra-ui/react";
import { FaUserCog, FaDatabase, FaBell, FaUser } from "react-icons/fa";
import { LoggedinHeader } from "./AdminHome.page";
import { AdminSidebar } from "./Members.page";

function SendNotif() {
    const handleFormSubmit = (e: any) => {
        e.preventDefault();
        // Logic to handle form submission
      };
    const boxShadowColor = useColorModeValue('0px 2px 12px rgba(130,148,116,0.8)', '0px 2px 12px rgba(130,148,116,0.8)');
      return (
      <>
      <LoggedinHeader/>
      <Flex>
        <AdminSidebar/>
        <Box flex="1" p={6} display="flex" flexDirection="column"  bgGradient="linear(to-t, #e1f5dd, white)">
            <Heading as="h3" size="lg" mb={10} textColor="#83AD5F">Send notifications</Heading>
            <Box p={6} w="full" alignItems="center" justifyContent="center">
                <VStack spacing={6}  p={6} boxShadow={boxShadowColor} borderRadius="lg" bg="white">
                    <form onSubmit={handleFormSubmit} style={{ width: '100%', marginTop: '5'}}>
                    <FormControl id="title" isRequired>
                        <FormLabel>Title </FormLabel>
                        <Input type="text" boxShadow={`0px 0px 10px rgba(130, 148, 116, 0.4)`} placeholder="(20 words max)"/>
                    </FormControl>
                        <FormControl id="description" mt={4} isRequired>
                            <FormLabel>Description </FormLabel>
                            <Textarea boxShadow={`0px 0px 10px rgba(130, 148, 116, 0.4)`} placeholder="(100 words max)"/>
                        </FormControl>
                        <FormControl id="faculty" mt={4}>
                            <FormLabel>Faculty</FormLabel>
                            <CheckboxGroup colorScheme="green">
                            <Stack direction="row">
                                <Checkbox value="facultyA">Faculty A</Checkbox>
                                <Checkbox value="facultyB">Faculty B</Checkbox>
                                <Checkbox value="facultyC">Faculty C</Checkbox>
                            </Stack>
                            </CheckboxGroup>
                        </FormControl>
                        <FormControl id="recipient" mt={4}>
                            <FormLabel>Recipient</FormLabel>
                            <CheckboxGroup colorScheme="green">
                            <Stack direction="row">
                                <Checkbox value="students">Students</Checkbox>
                                <Checkbox value="marketingManager">Marketing Manager</Checkbox>
                                <Checkbox value="marketingCoordinator">Marketing Coordinator</Checkbox>
                                <Checkbox value="administrator">Administrator</Checkbox>
                                <Checkbox value="guest">Guest</Checkbox>
                            </Stack>
                            </CheckboxGroup>
                        </FormControl>
                        <Button type="submit" bg="#2d4b12" color='#fff' variant="outline" colorScheme='green' mt={8} _hover={{ bg:"#fff", color:'#2d4b12'}} _focus={{ boxShadow: "none" }}>
                            Send
                        </Button>
                        </form>
                    </VStack>
            </Box>
        </Box>
      </Flex>
        
        </>
      );
}

export default SendNotif;
