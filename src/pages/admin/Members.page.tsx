import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  Input,
  Select,
  VStack,
  Link,
  InputGroup,
  InputLeftElement,
  Icon,
  useColorModeValue,
  Divider,
  ModalOverlay,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useToast,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import {
  FaUserPlus,
  FaSearch,
  FaSortAmountDown,
  FaSortAmountUp,
  FaBell,
  FaUserCog,
} from "react-icons/fa";
import { LoggedinHeader } from "./AdminHome.page";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { EditIcon } from "@chakra-ui/icons";

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

interface Faculty {
  _id: string;
  name: string;
  marketing_coordinator_id: string;
}

interface Role {
  _id: string;
  roles: string;
}

export function AdminSidebar() {
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
      minH="100vh"
      overflowY="auto"
    >
      <VStack
        align="stretch"
        spacing={16}
        mt={20}
        alignItems="center"
        justifyContent="center"
      >
        <Link as={RouterLink} to="/Admin/Members">
          <Button
            bg={isActive("/Admin/Members") ? "whitesmoke" : "transparent"}
            _hover={
              isActive("/Admin/Members") ? {} : { bg: "#fff", color: "#2d4b12" }
            }
            leftIcon={<FaUserCog />}
            color={isActive("/Admin/Members") ? "#2d4b12" : "whitesmoke"}
            w="300px"
            variant="outline"
          >
            Manage accounts
          </Button>
        </Link>
        <Link as={RouterLink} to="/Admin/ViewTopics">
          <Button
            bg={isActive("/Admin/ViewTopics") ? "whitesmoke" : "transparent"}
            _hover={
              isActive("/Admin/ViewTopics")
                ? {}
                : { bg: "#fff", color: "#2d4b12" }
            }
            leftIcon={<FaBell />}
            color={isActive("/Admin/ViewTopics") ? "#2d4b12" : "whitesmoke"}
            w="300px"
            variant="outline"
          >
            View Topics
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



function MemberTable() {
  const [users, setUsers] = useState<User[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAscending, setIsAscending] = useState(true);
  const boxShadowColor = useColorModeValue(
    "0px 2px 12px rgba(130,148,116,0.8)",
    "0px 2px 12px rgba(130,148,116,0.8)"
  );
  const toast = useToast()
  const accessToken = localStorage.getItem('access_token');

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/user/get-all",{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }          
        }
      );
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const [faculties, setFaculties] = useState<Faculty[]>([]);

  const fetchFaculties = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/faculty/get-all", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setFaculties(response.data.data);
    } catch (error) {
      console.log("Error fetching faculties");
    }
  };

  const [roles, setRoles] = useState<Role[]>([]);

  const fetchRoles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/user/get-all-role", 
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }          
        }
      );
      setRoles(response.data.roles);
    } catch (error) {
      console.log("Error fetching Roles");
    }
  };

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userRole, setUserRole] = useState('');
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
      }
    }
    checkTokenValidity();
    fetchFaculties()
    fetchRoles()
    fetchUsers();
  }, []);

  // Function to find faculty name by faculty id
  const findFacultyName = (facultyId: string): string => {
    const faculty = faculties.find((f) => f._id === facultyId);
    return faculty ? faculty.name : 'Unknown Faculty';
  };

  function MemberModal({ userId }: { userId: string }) {
    const [user, setUser] = useState<User | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState({
      _id: '',
      name: '',
      email: '',
      password: '',
      roles: '',
      facultyid: '',
      username: '',
    });
    const fetchUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/user/get-by-id/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response.data.user)
        setUser(response.data);
        setFormData(response.data.user);
        setIsOpen(true);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const handleClose = () => {
      setIsOpen(false);
      setUser(null);
    };
  
    const handleEdit = async (e: React.FormEvent) => {
      e.preventDefault();
      // Form submission logic here
      try {
        await axios.put(`http://localhost:3001/api/user/edit/${userId}`, {
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          roles: formData.roles,
          faculty_id: formData.facultyid,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
        toast({
          title: "User created.",
          description: "User edit successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        window.location.reload();
      } catch (error: any) {
        console.error("Error editing user", error.res.data);
        toast({
          title: "Error editing user",
          description: error.res.data,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };
  
    const handleDelete = async (e: React.FormEvent) => {
      try {
        await axios.delete(`http://localhost:3001/api/user/delete/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
        );
        toast({
          title: "User deleted.",
          description: "The user has been successfully deleted.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        window.location.reload();
        } catch (error) {
        console.error("Error deleting user:", error);
        toast({
          title: "Error deleting user.",
          description: "An error occurred while deleting the user.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prevForm => ({
        ...prevForm,
        [name]: value,
      }));
    };
  
    return (
      <>
        <Button leftIcon={<EditIcon />} onClick={fetchUserById}>View</Button>
        {isOpen && (
          <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Editing User: {userId}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {user && (
                  <VStack as="form" onSubmit={handleEdit} spacing={6}>
                    <FormControl id="user-name" isRequired>
                      <FormLabel>Name</FormLabel>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </FormControl>
      
                    <FormControl id="facultyId" isRequired>
                      <FormLabel>Change Faculty</FormLabel>
                      <Select
                        id="facultyId"
                        name="facultyid"
                        value={formData.facultyid}
                        onChange={handleChange}
                      >
                        <option value="">Select Faculty</option>
                        {faculties.map((faculty) => (
                          <option key={faculty._id} value={faculty._id}>
                            {faculty.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl id="role">
                      <FormLabel>Role</FormLabel>
                      <Select
                        placeholder="Select role"
                        id="role"
                        name="role"
                        value={formData.roles}
                        onChange={handleChange}
                      >
                        <option value='student'>Student</option>
                        <option value='marketingManager'>Marketing Manager</option>
                        <option value='marketingCoordinator'>
                          Marketing Coordinator
                        </option>
                        <option value='admin'>Administrator</option>
                        <option value='guest'>Guest</option>
                      </Select>
                    </FormControl>

                    <FormControl id="Email">
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </FormControl>

                    <FormControl id="Username">
                      <FormLabel>Username</FormLabel>
                      <Input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        required
                        value={formData.username}
                        onChange={handleChange}
                      />
                    </FormControl>

                    <FormControl id="Password">
                      <FormLabel>Password</FormLabel>
                      <Input
                        type="text"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </VStack>
                )}
              </ModalBody>
              <ModalFooter>
                <Button bg="#426b1f" colorScheme="green" color='#fff' m={3} onClick={handleEdit}>
                  Save Changes
                </Button>
                <Button bg="#6B1F1F" colorScheme="red" color='#fff' m={3} onClick={handleDelete}>
                  Delete
                </Button>
                <Button onClick={handleClose} m={3}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </>
    );
  }  

  const truncate = (password:any) => {
    const maxLength = 5; // Maximum length of the displayed password
    if (password.length <= maxLength) {
      return password; // Return the full password if it's shorter than maxLength
    } else {
      return password.substring(0, maxLength) + '...'; // Truncate the password and add ellipses
    }
  };
  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
  };

  return (
    <Box flex="1" bgGradient="linear(to-t, #e1f5dd, white)" p={5}>
      {showError && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          {errorMessage}
          <Link href='/login' ml={10}>
            <Text fontStyle='italic'>Go to the Login Page</Text>
          </Link>
        </Alert>
      )}
      {userRole.includes('admin') && (
        <>
          <Flex justify="space-between" align="center">
            <Heading as="h2" size="lg" mb={10} textColor="#83AD5F">
              Account Manager
            </Heading>
            <InputGroup maxWidth="300px" mb={10}>
              <InputLeftElement pointerEvents="none">
                <FaSearch />
              </InputLeftElement>
              <Input placeholder="Search an account" />
            </InputGroup>
          </Flex>

          <Box
            bg="white"
            borderRadius="lg"
            p={8}
            overflowX="auto"
            boxShadow={boxShadowColor}
            maxHeight="800px"
            overflowY="auto" 
          >
            <Flex gap={4}>
              <Select placeholder="Role" boxShadow={boxShadowColor} width={40}>
                <option value="student">Student</option>
                <option value="MarketingManager">Marketing Manager</option>
                <option value="MarketingCoordinator">Marketing Coordinator</option>
                <option value="Admin">Administrator</option>
                <option value="Guest">Guest</option>
              </Select>
              <Select placeholder="Sort by" boxShadow={boxShadowColor} width={40}>
                <option value="name">Name</option>
                <option value="name">Username</option>
                <option value="id">ID</option>
                <option value="email">Email</option>
                <option value="role">Role</option>
                <option value="faculty">Faculty</option>
              </Select>
              <Button
                rightIcon={
                  isAscending ? (
                    <Icon as={FaSortAmountUp} />
                  ) : (
                    <Icon as={FaSortAmountDown} />
                  )
                }
                variant="outline"
                onClick={toggleSortOrder}
                boxShadow={boxShadowColor}
              >
                {isAscending ? "Ascending" : "Descending"}
              </Button>
            </Flex>
            <Divider my={10} borderColor="#426B1F" width="100%" />
            {/* Table for member data */}
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th fontSize="3xl">ID</Th>
                  <Th fontSize="3xl">Name</Th>
                  <Th fontSize="3xl">Username</Th>
                  <Th fontSize="3xl">Email</Th>
                  <Th fontSize="3xl">Password</Th>
                  <Th fontSize="3xl">Role</Th>
                  <Th fontSize="3xl">Faculty</Th>
                  <Th fontSize="3xl">Created At</Th>
                  <Th fontSize="3xl">Options</Th>
                </Tr>
              </Thead>
              <Divider my={4} borderColor="#fff" />
              <Tbody>
                {users?.map((user) => (
                  <Tr
                    bg="rgba(137, 188, 93, 0.2)"
                    key={user._id}
                    _hover={{
                      bg: "rgba(73,133,23,1)",
                      boxShadow: { boxShadowColor },
                      zIndex: 2,
                    }}
                    transition="background-color 0.2s, box-shadow 0.2s, transform 0.2s"
                  >
                    <Td>{user._id}</Td>
                    <Td>{user.name}</Td>
                    <Td>{user.username}</Td>
                    <Td>{user.email}</Td>
                    <Td>{truncate(user.password)}</Td>
                    <Td>{user.roles}</Td>
                    <Td>{findFacultyName(user.faculty_id)}</Td>
                    <Td>{format(user.createdAt, 'MM-dd-yyyy')}</Td>
                    <Td>
                      <MemberModal userId={user._id}/>
                    </Td>
                    <Divider my={4} borderColor="#426B1F" width="100%" />
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          <Link href="/Admin/Add">
            <Button
              leftIcon={<FaUserPlus />}
              bg="#2d4b12"
              color="#fff"
              variant="outline"
              colorScheme="green"
              onClick={onOpen}
              mt={8}
              _hover={{ bg: "#fff", color: "#2d4b12" }}
              _focus={{ boxShadow: "none" }}
            >
              Add an account
            </Button>
          </Link>
        </>
      )}
    </Box>
  );
}

function Members() {
  return (
    <Box>
      <LoggedinHeader />
      <Flex h="100vh" overflowY="hidden">
        <AdminSidebar />

        <MemberTable />
      </Flex>
    </Box>
  );
}

export default Members;
