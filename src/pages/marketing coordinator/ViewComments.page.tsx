import { Alert, AlertIcon, Flex, Box } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { LoggedinHeader } from "../admin/AdminHome.page";
import { MCSidebar } from "./PendingArticles.page";

function CommentsViewer() {
    const [userRole, setUserRole] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
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
        };
      }
      checkTokenValidity()
    }, [])
  
    return (
      <Box>
        {showError && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}
        {userRole.includes('marketingCoordinator') && (
          <>
            <LoggedinHeader />
            <Flex>
              <MCSidebar />
              
            </Flex>
          </>
        )}
      </Box>
    );
  }

  export default CommentsViewer