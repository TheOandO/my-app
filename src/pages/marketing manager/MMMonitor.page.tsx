import { Box, Button, Link, VStack, Text } from "@chakra-ui/react";
import { FaNewspaper } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { LoggedinHeader } from "../admin/AdminHome.page";

export function MMSidebar() {
    const location = useLocation();
  
    const isActive = (path: string) => {
        return location.pathname.toLowerCase() === path.toLowerCase();
    };
  
    return (
        <Box minW="350px" bg="#2d4b12" color="white" p={5} alignItems="center" justifyContent="center" minH="100vh" // Minimum height to match the viewport height
        overflowY="auto">
            <VStack align="stretch" spacing={16} mt={20} alignItems="center" justifyContent="center">
            <Link as={RouterLink} to='/MC/PendingArticles'>
                <Button bg={isActive('/MC/PendingArticles') ? 'whitesmoke' : 'transparent'}
                        _hover={isActive('/MC/PendingArticles') ? {} : { bg: '#fff', color: '#2d4b12' }} 
                        leftIcon={<FaNewspaper />} 
                        color={isActive('/MC/PendingArticles') ? '#2d4b12' : 'whitesmoke'} 
                        w='300px'
                        variant='outline'>View Pending Articles</Button>
                </Link>
            </VStack>
            {/* Footer */}
            <Text position="absolute" bottom={5} left={5} fontSize="sm">Copyright Website 2024</Text>
        </Box>
    );
}

function MMMonitor() {
    return(
        <Box>
            <LoggedinHeader />
            <MMSidebar />
        </Box>
    )
}

export default MMMonitor()