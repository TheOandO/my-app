import { Box, Button, Center, HStack, Link, Text } from "@chakra-ui/react";
import { LoggedinHeader } from "../admin/AdminHome.page";
import { DiscussionPage } from "../guest/Home.page";
import { Footer } from "../guest/Home.page";

export function Quote() {
    return (
      <Box as="section" bg="white.100" my={20}>
        <Center flexDirection="column" textAlign="center" px={4}>
          <Text fontSize="2xl" mb={4}>
            Push <em>harder</em> than yesterday<br /> if you want a <em>different</em> tomorrow.
          </Text>
          <HStack spacing={10}>
            <Link href='/MM/Newsfeed'>
                <Button bg="#426B1F" color="#FFF" variant="solid" size="lg" _hover={{ bg: "#e0e0e0", color: "#426B1F" }}>
                Browse Newsfeed
                </Button>
            </Link>
            <Link href='/MM/Monitor'>
                <Button bg="#426B1F" color="#FFF" variant="solid" size="lg" _hover={{ bg: "#e0e0e0", color: "#426B1F" }}>
                View Monitor List
                </Button>
            </Link>            
          </HStack>

        </Center>
      </Box>
    );
  }

function MMHome() {
    return(
        <Box>
            <LoggedinHeader />
            <Quote />
            <DiscussionPage />
            <Footer />
        </Box>
    )
}

export default MMHome