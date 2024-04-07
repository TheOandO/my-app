import { LoggedinHeader } from '../admin/AdminHome.page';
import { DiscussionPage, Footer } from '../guest/Home.page';
import { VStack, Text, HStack, Avatar, Button, Link, Box, Flex } from '@chakra-ui/react';
import { Topics } from '../student/StudentHome.page';

function PendingArticle() {

    const articles = [
        { id: 1, title: 'Take pics of your meat', author: 'Nicky Nicknack', timeLeft: '2 days remaining' },
        { id: 2, title: 'Vegetable day !?!', author: 'Black Woman', timeLeft: '4 days remaining' },
        { id: 3, title: 'Where’s your family ?', author: 'Maria Omaga', timeLeft: '5 days remaining' },
        { id: 4, title: 'Mother’s day bonanza', author: 'Shala Kadiddi Duduh', timeLeft: '6 days remaining' }
    ];

    return (
        <Flex direction={['column', 'row']} width="100%">
            <VStack
                bg='#869876'
                borderRadius="lg"
                p={5}
                spacing={4}
                align="stretch"
                flex={1}
            >
                <Text fontSize="4xl" fontWeight="bold" pb={2} color='white'>
                    Pending article
                </Text>
                {articles.map(article => (
                    <HStack key={article.id} justifyContent="space-between" p={3} bg="white" borderRadius="16" boxShadow="sm" spacing={4} _hover={{transform: "translateY(-4px)", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"}} transition="background-color 0.2s, box-shadow 0.2s transform 0.4s">
                        <Avatar size="md" name={article.author} />
                        <VStack align="start" spacing={4} flex="1">
                            <Text fontWeight="bold" fontSize='xl' color='#426b1f'>{article.title}</Text>
                            <Text fontSize="md" color="gray.500" fontStyle='italic'>{article.author} · {article.timeLeft}</Text>
                        </VStack>
                    </HStack>
                ))}
                <Flex justifyContent="center">
                    <Link href='/mc/PendingArticles' >
                        <Button mt={4} bg="#426b1f" color='#fff'  _hover={{ bg:"#fff", color:'#2d4b12'}} height='50px' width='550px'>
                            View all pending articles
                        </Button>
                    </Link>                    
                </Flex>

                
            </VStack>
            <Topics />   
        </Flex>

        
    );
}

function MCHome() {
    return(
        <Box>
            <LoggedinHeader />
            <PendingArticle />
            <DiscussionPage />
            <Footer />
        </Box>
    )
}

export default MCHome