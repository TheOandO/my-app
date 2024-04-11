import { Box, Button, Link, VStack, Text, Flex, InputLeftElement, Divider, Heading, Icon, Input, InputGroup, Select, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { FaNewspaper, FaSearch, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { LoggedinHeader } from "../admin/AdminHome.page";
import { useState } from "react";

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
];

    
  // Dummy student article data
type StatusType = 'Waiting' | 'Rejected' | 'Overdue' | 'Published';
  const pendingArticles = [
    {
      id: 1,
      title: 'No alarms to no surprises',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris eu ex tincidunt scelerisque vel et risus. Fusce et lorem metus. Fusce pellentesque sed lacus at facilisis. Suspendisse in.',
      status: 'Rejected' as StatusType,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/Radiohead_-_No_Surprises_%28CD1%29.jpg/220px-Radiohead_-_No_Surprises_%28CD1%29.jpg',
      comment: 'bad',
      authorId: 'P0001' 
    },
    {
      id: 2,
      title: 'There could be hell below, below',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris eu ex tincidunt scelerisque vel et risus. Fusce et lorem metus. Fusce pellentesque sed lacus at facilisis. Suspendisse in.',
      status: 'Overdue' as StatusType,
      image: 'https://i.discogs.com/DV7a-pnwsxi06Ci9Fxyy8pKjWWvDgQAR9RrLE7gOMgo/rs:fit/g:sm/q:90/h:600/w:594/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU2ODk0/ODAtMTM5OTk5NzU2/OC0yMDQ0LmpwZWc.jpeg',
      comment: 'bad',
      authorId: 'CS001'
    },
    {
      id: 3,
      title: 'Mother Earth is pregnant for the third time',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris eu ex tincidunt scelerisque vel et risus. Fusce et lorem metus. Fusce pellentesque sed lacus at facilisis. Suspendisse in.',
      status: 'Waiting' as StatusType,
      image: 'https://vinylcoverart.com/media/album-covers/3065/funkadelic-maggot-brain.jpg',
      comment: '',
      authorId: 'CS002'
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
        authorId: 'P0001'
    },
    {
        id: 5,
        title: 'Sectoral heterochromia',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris eu ex tincidunt scelerisque vel et risus. Fusce et lorem metus. Fusce pellentesque sed lacus at facilisis. Suspendisse in.',
        status: 'Published' as StatusType,
        image: 'https://i1.sndcdn.com/artworks-000157282441-rmtn0q-t500x500.jpg',
        comment: 'good',
        authorId: 'CS001'
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
  
    return (
      <Box flex="1" bgGradient="linear(to-t, #e1f5dd, white)" p={5}>
        {/* Existing content... */}
        <Box bg="white" borderRadius="lg" p={8} overflowX="auto" boxShadow={boxShadowColor}>
          {/* Existing content... */}
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
                  <Td>{member.major}</Td>
                  <Td>{member.faculty}</Td>
                  <Divider my={4} borderColor="#426B1F" width='100%'/>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
  
        {/* Modal for displaying articles */}
        <Modal isOpen={selectedMember !== null} onClose={handleCloseModal}  size='6xl' isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedMember?.name}'s Articles</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Display pending articles title if there are pending articles */}
              {pendingArticles.some(article => article.authorId === selectedMember?.id) && (
                <>
                  <Heading size="md">Pending Articles</Heading>
                  {pendingArticles.filter(article => article.authorId === selectedMember?.id).map(article => (
                    <Box key={article.id}>
                      <p>Title: {article.title}</p>
                      <p>Summary: {article.summary}</p>
                      <img src={article.image} alt={article.title} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    </Box>
                  ))}
                </>
              )}
              {/* Display published articles title if there are published articles */}
              {publishedArticles.some(article => article.authorId === selectedMember?.id) && (
                <>
                  <Heading size="md">Published Articles</Heading>
                  {publishedArticles.filter(article => article.authorId === selectedMember?.id).map(article => (
                    <Box key={article.id}>
                      <p>Title: {article.title}</p>
                      <p>Summary: {article.summary}</p>
                      <img src={article.image} alt={article.title} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    </Box>
                  ))}
                </>
              )}
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