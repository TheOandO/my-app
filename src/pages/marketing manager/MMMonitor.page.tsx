import { Box, Button, Link, VStack, Text, Flex, Image, Divider, Heading, Icon, Input, InputGroup, Select, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, HStack, Tag, useToast, InputLeftElement, Avatar } from "@chakra-ui/react";
import { FaNewspaper, FaSearch, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { LoggedinHeader } from "../admin/AdminHome.page";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

export function MMSidebar() {
    const location = useLocation();
  
    const isActive = (path: string) => {
        return location.pathname.toLowerCase() === path.toLowerCase();
    };
  
    return (
        <Box minW="350px" bg="#2d4b12" color="white" p={5} alignItems="center" justifyContent="center" minH="100vh" // Minimum height to match the viewport height
        overflowY="auto">
            <VStack align="stretch" spacing={16} mt={20} alignItems="center" justifyContent="center">
            <Link as={RouterLink} to='/MM/Monitor'>
                <Button bg={isActive('/MM/Monitor') ? 'whitesmoke' : 'transparent'}
                        _hover={isActive('/MM/Monitor') ? {} : { bg: '#fff', color: '#2d4b12' }} 
                        leftIcon={<FaNewspaper />} 
                        color={isActive('/MM/Monitor') ? '#2d4b12' : 'whitesmoke'} 
                        w='300px'
                        variant='outline'>Monitor</Button>
                </Link>
            </VStack>
            {/* Footer */}
            <Text position="absolute" bottom={5} left={5} fontSize="sm">Copyright Website 2024</Text>
        </Box>
    );
}


interface Member {
    id: string;
    name: string;
    email: string;
    role: string;
    major: string;
    faculty: string;
  }
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
    {
      id: 'MC001',
      name: 'Super',
      email: 'sober@website.edu',
      role: 'Marketing Coordinator',
      major: 'None',
      faculty: 'Faculty A',
    },
    {
      id: 'MC002',
      name: 'Bat',
      email: 'bet@website.edu',
      role: 'Marketing Coordinator',
      major: 'None',
      faculty: 'Faculty B',
    },
];

    
  // Dummy student article data
type Article = {
    id: number;
    title: string;
    summary: string;
    status: StatusType;
    image?: string;
    comment?: string;
    authorId: string;
    timeSubmitted: Date;
  };
type StatusType = 'Waiting' | 'Rejected' | 'Overdue' | 'Published';
  const pendingArticles = [
    {
      id: 1,
      title: 'No alarms to no surprises',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris eu ex tincidunt scelerisque vel et risus. Fusce et lorem metus. Fusce pellentesque sed lacus at facilisis. Suspendisse in.',
      status: 'Rejected' as StatusType,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/Radiohead_-_No_Surprises_%28CD1%29.jpg/220px-Radiohead_-_No_Surprises_%28CD1%29.jpg',
      comment: 'bad',
      authorId: 'P0001' ,
      timeSubmitted: new Date('2024-03-27T12:00:00Z')
    },
    {
      id: 2,
      title: 'There could be hell below, below',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris eu ex tincidunt scelerisque vel et risus. Fusce et lorem metus. Fusce pellentesque sed lacus at facilisis. Suspendisse in.',
      status: 'Overdue' as StatusType,
      image: 'https://i.discogs.com/DV7a-pnwsxi06Ci9Fxyy8pKjWWvDgQAR9RrLE7gOMgo/rs:fit/g:sm/q:90/h:600/w:594/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU2ODk0/ODAtMTM5OTk5NzU2/OC0yMDQ0LmpwZWc.jpeg',
      comment: 'bad',
      authorId: 'CS001',
      timeSubmitted: new Date('2024-03-27T12:00:00Z')
    },
    {
      id: 3,
      title: 'Mother Earth is pregnant for the third time',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris eu ex tincidunt scelerisque vel et risus. Fusce et lorem metus. Fusce pellentesque sed lacus at facilisis. Suspendisse in.',
      status: 'Waiting' as StatusType,
      image: 'https://vinylcoverart.com/media/album-covers/3065/funkadelic-maggot-brain.jpg',
      comment: '',
      authorId: 'CS002',
      timeSubmitted: new Date('2024-03-27T12:00:00Z')
    }
  ];

  const publishedArticles = [
    {
        id: 4,
        title: "'Cause I'm as free as a bird now",
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris eu ex tincidunt scelerisque vel et risus. Fusce et lorem metus. Fusce pellentesque sed lacus at facilisis. Suspendisse in.',
        status: 'Published' as StatusType,
        image: 'https://i.scdn.co/image/ab67616d0000b273128450651c9f0442780d8eb8',
        comment: 'good',
        authorId: 'P0001',
        timeSubmitted: new Date('2024-03-27T12:00:00Z')
    },
    {
        id: 5,
        title: 'Sectoral heterochromia',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris eu ex tincidunt scelerisque vel et risus. Fusce et lorem metus. Fusce pellentesque sed lacus at facilisis. Suspendisse in.',
        status: 'Published' as StatusType,
        image: 'https://i1.sndcdn.com/artworks-000157282441-rmtn0q-t500x500.jpg',
        comment: 'good',
        authorId: 'CS001',
        timeSubmitted: new Date('2024-03-27T12:00:00Z')
    }
];


function MemberTable() {
    const [isAscending, setIsAscending] = useState(true);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null); // Explicitly specify the type of selectedMember
    const boxShadowColor = useColorModeValue('0px 2px 12px rgba(130,148,116,0.8)', '0px 2px 12px rgba(130,148,116,0.8)');
    const toggleSortOrder = () => {
        setIsAscending(!isAscending);
    };
  
    // Function to handle member selection
    const handleMemberSelect = (member: Member) => {
      setSelectedMember(member);
    };
  
    // Function to handle modal close
    const handleCloseModal = () => {
      setSelectedMember(null);
    };
  
    const StatusButton : React.FC<{ status: StatusType }> = ({ status }) => {
      let color = 'gray';
      if (status === 'Waiting') color = '#426B1F';
      if (status === 'Published') color = '#426B1F';
      if (status === 'Rejected') color = '#6B1F1F';
      if (status === 'Overdue') color = '#383838';
      return <Tag fontSize="lg" fontWeight='bold' width='140px' height='50px' display='flex' alignItems='center' justifyContent='center' borderRadius="full" variant="solid" bg={color} color='white'>{status}</Tag>
    }

    const [selectedComment, setSelectedComment] = useState(null); 
    const toast = useToast();
    const handleClick = (comment:any) => {
      if (comment) {
        setSelectedComment(comment);
      } else {
        toast({ // Display toast notification
          title: 'No comment yet!',
          status: 'info',
          duration: 2000,
          isClosable: true,
          colorScheme: 'green',
          size: 'xl'
        });
      }
    };
   
    // Separate component for rendering modal content for Marketing Managers
    const MarketingCoordinatorModal: React.FC<{
      selectedMember: Member;
      pendingArticles: Article[];
      handleClick: (comment: string | undefined) => void;
    }> = ({ selectedMember, pendingArticles, handleClick }) => {
      const getStudentName = (authorId: string) => {
        const student = members.find(member => member.id === authorId);
        return student ? student.name : 'Unknown'; // Return the student's name if found, otherwise return 'Unknown'
      };
      // Extract manager's faculty from selectedMember
      const coordinatorFaculty = selectedMember.faculty;
       // Filter articles based on both student's and manager's faculty
      const filteredArticlesByFaculty = pendingArticles.filter(article => {
        const student = members.find(member => member.id === article.authorId);
        return student && student.faculty === coordinatorFaculty;
      });
      return ( 
          <>
            <Heading fontSize="2xl" m='4'>Pending Articles: ({filteredArticlesByFaculty.length})</Heading>
            <Box maxHeight="400px" overflowY="auto">
              {filteredArticlesByFaculty
                .map(article => (
                <HStack key={article.id} p={5} spacing={4} align="center" borderBottomWidth="1px">
                  <Avatar size='lg' name={article.authorId} src={`path_to_author_avatar_based_on_${article.authorId}`} />

                  <VStack align="flex-start" flex={1} mr={4}>
                    <Text fontSize="xl">{getStudentName(article.authorId)}</Text>
                    <Text fontSize="sm" color="gray.400" fontStyle="italic">
                      Submitted {formatDistanceToNow(new Date(article.timeSubmitted), { addSuffix: true })}
                    </Text>
                  </VStack>
                    
                  <VStack align="flex-start" flex={4}>
                    <Heading fontSize="3xl">{article.title}</Heading>
                      <Text fontSize="xl" color="gray.500">
                        {article.summary}
                      </Text>
                  </VStack>

                  {article.image && (
                    <Image borderRadius="md" boxSize="150px" src={article.image} alt={article.title} />
                  )}
                  <VStack>
                    <StatusButton status={article.status} />
                    <Button
                      size="lg"
                      variant="solid"
                      onClick={() => handleClick(article.comment)}
                      colorScheme="gray"
                      borderRadius='full'
                    >
                      View comment
                    </Button> 
                  </VStack>

                </HStack>
                ))}
            </Box>
          </>  
      );
    };

  // Separate component for rendering modal content for students
  const StudentModal: React.FC<{
    selectedMember: Member;
    pendingArticles: Article[];
    publishedArticles: Article[];
    handleClick: (comment: string | undefined) => void;
  }> = ({ selectedMember, pendingArticles, publishedArticles, handleClick }) => {
    return (
          <>
            <Heading fontSize="2xl" m='4'>Pending Articles: ({pendingArticles.filter(article => article.authorId === selectedMember?.id).length})</Heading>
            {pendingArticles.filter(article => article.authorId === selectedMember?.id).map(article => (
              <HStack key={article.id} p={5} spacing={4} align="center" borderBottomWidth="1px">
                {article.image && (
                  <Image borderRadius="md" boxSize="150px" src={article.image} alt={article.title} maxW= '100px' maxH= '100px' />
                )}
                <Box flex={1}>
                  <Heading fontSize="3xl">{article.title}</Heading>
                  <Text fontSize="lg" color="gray.500">{article.summary}</Text>
                </Box>
                <VStack>
                  <StatusButton status={article.status} />
                  <Button
                    size="lg"
                    variant="solid"
                    onClick={() => handleClick(article.comment)}
                    colorScheme="gray"
                    borderRadius='full'
                  >
                    View comment
                  </Button>
                </VStack>
              </HStack>
            ))}

            <Heading fontSize="2xl" m='4'>Published Articles: ({publishedArticles.filter(article => article.authorId === selectedMember?.id).length})</Heading>
            {publishedArticles.filter(article => article.authorId === selectedMember?.id).map(article => (
            <HStack key={article.id} p={5} spacing={4} align="center" borderBottomWidth="1px">
              {article.image && (
                <Image borderRadius="md" boxSize="150px" src={article.image} alt={article.title} />
              )}
              <Box flex={1} my={4}>
                <Heading fontSize="3xl" my={4}>{article.title}</Heading>
                <Text fontSize="lg" color="gray.500">{article.summary}</Text>
              </Box>
              <VStack>
                <StatusButton status={article.status} />
                <Button
                  size="lg"
                  variant="solid"
                  onClick={() => handleClick(article.comment)}
                  colorScheme="gray"
                  borderRadius='full'
                >
                  View comment
                </Button>                        
              </VStack>

            </HStack>
            ))}
      </>
    );
  };

    return (
      <Box flex="1" bgGradient="linear(to-t, #e1f5dd, white)" p={5}>
          <Flex justify="space-between" align="center">
            <Heading as="h2" fontSize="6xl" mb={10} textColor="#83AD5F">Account Monitor</Heading>
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
              <option value="MarketingCoordinator">Marketing Coordinator</option>
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
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th fontSize="3xl">ID</Th>
                <Th fontSize="3xl">Name</Th>
                <Th fontSize="3xl">Email</Th>
                <Th fontSize="3xl">Role</Th>
                <Th fontSize="3xl">Faculty</Th>
              </Tr>
            </Thead>
            <Divider my={4} borderColor="#fff"/>
            <Tbody>
              {members.map((member) => (
                <Tr
                  bg="rgba(137, 188, 93, 0.2)"
                  key={member.id}
                  _hover={{color: '#fff', bg: 'rgba(73,133,23,1)', boxShadow: {boxShadowColor}, transform: 'translateY(-2px)', zIndex: 2}}
                  transition="background-color 0.2s, box-shadow 0.2s, transform 0.2s"
                  position='relative'
                  onClick={() => handleMemberSelect(member)} // Call handleMemberSelect on click
                >
                  <Td>{member.id}</Td>
                  <Td>{member.name}</Td>
                  <Td>{member.email}</Td>
                  <Td>{member.role}</Td>
                  <Td>{member.faculty}</Td>
                  <Divider my={4} borderColor="#426B1F" width='100%'/>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
  
        {/* Modal for displaying articles */}
        <Modal isOpen={selectedMember !== null} onClose={ handleCloseModal}  size='6xl' isCentered>
          <ModalOverlay />
          <ModalContent>
          <ModalHeader fontSize='4xl' color='#426b1f'>{selectedMember?.role === 'Marketing Coordinator'
              ? `${selectedMember?.name}'s Pending Articles`
              : `${selectedMember?.name}'s Articles`}
          </ModalHeader>
            <ModalCloseButton />
            <Divider my={2} borderColor="#426B1F" width='100%'/>
            <ModalBody>
            {selectedMember ? (
              selectedMember?.role === 'Marketing Coordinator' ? (
                <MarketingCoordinatorModal selectedMember={selectedMember} pendingArticles={pendingArticles} handleClick={handleClick} />
              ) : (
                <StudentModal selectedMember={selectedMember} pendingArticles={pendingArticles} publishedArticles={publishedArticles} handleClick={handleClick} />
              )
            ) : (
              <p>No member selected.</p> // Placeholder or any other content for when no member is selected
            )}
            </ModalBody>
          </ModalContent>
        </Modal>  
        {/* Modal for displaying comments */}
        <Modal isOpen={selectedComment !== null} onClose={() => setSelectedComment(null)} size="md" isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize='3xl' color='#426b1f'>Article Comment</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize='xl' m='5'>{selectedComment}</Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    )
  }

export default function MMMonitor() {
    return(
        <Box>
            <LoggedinHeader />
            <Flex>
                <MMSidebar />
                <MemberTable />
            </Flex>  
        </Box>
    )
}