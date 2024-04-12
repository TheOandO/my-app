import {
    Box,
    Flex,
    Text,
    Heading,
    Button,
    IconButton,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useDisclosure,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    Input,
    Select,
    VStack,
    Link,
    InputGroup,
    InputLeftElement,
    Icon,
    useColorModeValue,
    Divider,
} from '@chakra-ui/react';
import {
    FaUserPlus,
    FaEllipsisV,
    FaSearch,
    FaSortAmountDown,
    FaSortAmountUp,
    FaBell,
    FaUserCog,
    FaBacon,
} from 'react-icons/fa';
import { LoggedinHeader } from './AdminHome.page';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

  // Example members data
const members = [
    {
        id: 'P0001',
        name: 'Nicky Nicknack',
        email: 'nick@website.edu',
        role: 'Student',
        major: 'Photography',
        faculty: 'Faculty A',
    },
    {
        id: 'CS001',
        name: 'Mandy Chow',
        email: 'mandy@website.edu',
        role: 'Student',
        major: 'Computer Science',
        faculty: 'Faculty A',
    },
    {
        id: 'CS002',
        name: 'Kaling Bling',
        email: 'kaling@website.edu',
        role: 'Student',
        major: 'Computer Science',
        faculty: 'Faculty B',
    },
];

export function AdminSidebar() {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname.toLowerCase() === path.toLowerCase();
    };
    return (
        <Box minW="350px" bg="#2d4b12" color="white" p={5} alignItems="center" justifyContent="center" minH="100vh" // Minimum height to match the viewport height
        overflowY="auto">
            <VStack align="stretch" spacing={16} mt={20} alignItems="center" justifyContent="center">
            <Link as={RouterLink} to='/Admin/Members'>
                <Button bg={isActive('/Admin/Members') ? 'whitesmoke' : 'transparent'} 
                        _hover={isActive('/Admin/Members') ? {} : { bg: '#fff', color: '#2d4b12' }} 
                        leftIcon={<FaUserCog />} 
                        color={isActive('/Admin/Members') ? '#2d4b12' : 'whitesmoke'} 
                        w='300px'
                        variant='outline'>
                    Manage accounts
                </Button>
            </Link>
            <Link as={RouterLink} to='/Admin/ViewTopics'>
                <Button bg={isActive('/Admin/ViewTopics') ? 'whitesmoke' : 'transparent'} 
                        _hover={isActive('/Admin/ViewTopics') ? {} : { bg: '#fff', color: '#2d4b12' }} 
                        leftIcon={<FaBacon />} 
                        color={isActive('/Admin/ViewTopics') ? '#2d4b12' : 'whitesmoke'} 
                        w='300px'
                        variant='outline'>View Topics</Button>
                </Link>
                <Link as={RouterLink} to='/Admin/SendNotif'>
                <Button bg={isActive('/Admin/SendNotif') ? 'whitesmoke' : 'transparent'} 
                        _hover={isActive('/Admin/SendNotif') ? {} : { bg: '#fff', color: '#2d4b12' }} 
                        leftIcon={<FaBell />} 
                        color={isActive('/Admin/SendNotif') ? '#2d4b12' : 'whitesmoke'} 
                        w='300px'
                        variant='outline'>Send Notifications</Button>
                </Link>
            </VStack>
            {/* Footer */}
            <Text position="absolute" bottom={5} left={5} fontSize="sm">Copyright Website 2024</Text>
        </Box>
    );
}

function MemberTable() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isAscending, setIsAscending] = useState(true);
    const boxShadowColor = useColorModeValue('0px 2px 12px rgba(130,148,116,0.8)', '0px 2px 12px rgba(130,148,116,0.8)');
    const toggleSortOrder = () => {
        setIsAscending(!isAscending);
    };
    return (
        <Box flex="1" bgGradient="linear(to-t, #e1f5dd, white)" p={5}>
            <Flex justify="space-between" align="center">
                <Heading as="h2" size="lg" mb={10} textColor="#83AD5F">Account Manager</Heading>
                <InputGroup maxWidth="300px" mb={10}>
                    <InputLeftElement pointerEvents="none">
                        <FaSearch />
                    </InputLeftElement>
                    <Input placeholder="Search an account" />
                </InputGroup>
            </Flex>
                        
            <Box bg="white" borderRadius="lg" p={8} overflowX="auto" boxShadow={boxShadowColor}>
                <Flex gap={4} >
                    <Select placeholder="Role" boxShadow={boxShadowColor} width={40}>
                        <option value="student">Student</option>
                        <option value="MarketingManager">Marketing Manager</option>
                        <option value="MarketingCoordinator">Marketing Coordinator</option>
                        <option value="Admin">Administrator</option>
                        <option value="Guest">Guest</option>
                    </Select>
                    <Select placeholder="Sort by" boxShadow={boxShadowColor} width={40}>
                        <option value="name">Name</option>
                        <option value="id">ID</option>
                        <option value="email">Email</option>
                        <option value="role">Role</option>
                        <option value="major">Major</option>
                        <option value="faculty">Faculty</option>
                    </Select>
                    <Button
                        rightIcon={isAscending ? <Icon as={FaSortAmountUp} /> : <Icon as={FaSortAmountDown} />}
                        variant="outline"
                        onClick={toggleSortOrder}
                        boxShadow={boxShadowColor}
                    >
                        {isAscending ? 'Ascending' : 'Descending'}
                    </Button>
                    
                </Flex>
                <Divider my={10} borderColor="#426B1F" width='100%'/>
                    {/* Table for member data */}
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th fontSize="3xl">ID</Th>
                                <Th fontSize="3xl">Name</Th>
                                <Th fontSize="3xl">Email</Th>
                                <Th fontSize="3xl">Role</Th>
                                <Th fontSize="3xl">Major</Th>
                                <Th fontSize="3xl">Faculty</Th>
                                <Th fontSize="3xl">Options</Th>
                            </Tr>
                        </Thead>
                        <Divider my={4} borderColor="#fff"/>
                        <Tbody>
                            {members.map((member) => (
                            <Tr bg="rgba(137, 188, 93, 0.2)" key={member.id} _hover={{color: '#fff', bg: 'rgba(73,133,23,1)', boxShadow: {boxShadowColor}, transform: 'translateY(-2px)',
                                zIndex: 2}} transition="background-color 0.2s, box-shadow 0.2s, transform 0.2s" position='relative'>
                                <Td>{member.id}</Td>
                                <Td>{member.name}</Td>
                                <Td>{member.email}</Td>
                                <Td>{member.role}</Td>
                                <Td>{member.major}</Td>
                                <Td>{member.faculty}</Td>
 
                                <Td>
                                    <Menu>
                                        <MenuButton as={IconButton} icon={<FaEllipsisV />} />
                                        <MenuList>
                                            <MenuItem>View</MenuItem>
                                            <MenuItem>Update</MenuItem>
                                            <MenuItem>Delete</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Td>
                                <Divider my={4} borderColor="#426B1F" width='100%'/>
                            </Tr>
                            ))}
                        </Tbody>
                    </Table>
            </Box>
        {/* Button to add new member */}
            <Link href='/Admin/Add'>
                <Button leftIcon={<FaUserPlus />} bg="#2d4b12" color='#fff' variant="outline" colorScheme='green' onClick={onOpen} mt={8} _hover={{ bg:"#fff", color:'#2d4b12'}} _focus={{ boxShadow: "none" }}>
                    Add an account
                </Button>
            </Link>
                        
            {/* Drawer for adding a new member */}
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    {/* Drawer content */}
                </DrawerContent>
            </Drawer>
        </Box>
    )
}

function Members() {
    return (
        <Box>
            <LoggedinHeader/>
            <Flex h="100vh" overflowY="hidden">
                {/* Sidebar */}
                <AdminSidebar/>

                {/* Main content */}
                <MemberTable/>
            </Flex>
        </Box>
    );
}

export default Members;