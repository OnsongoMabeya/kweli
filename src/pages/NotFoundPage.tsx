import { Box, Button, Container, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFoundPage = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  return (
    <>
      <Helmet>
        <title>Page Not Found - Kweli</title>
        <meta name="description" content="The page you're looking for doesn't exist or has been moved." />
      </Helmet>
      
      <Container maxW="container.md" py={20}>
        <VStack spacing={8} textAlign="center">
          <Box
            p={8}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="lg"
            bg={bg}
            borderColor={borderColor}
            width="100%"
            maxW="lg"
            mx="auto"
          >
            <Box
              as="span"
              display="inline-block"
              fontSize="6xl"
              fontWeight="bold"
              color="brand.500"
              lineHeight="1"
              mb={4}
            >
              404
            </Box>
            
            <Heading as="h1" size="xl" mb={4}>
              Page Not Found
            </Heading>
            
            <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')} mb={8}>
              Oops! The page you're looking for doesn't exist or has been moved.
            </Text>
            
            <Button
              as={RouterLink}
              to="/"
              colorScheme="brand"
              size="lg"
              px={8}
            >
              Go to Homepage
            </Button>
          </Box>
          
          <Text color={useColorModeValue('gray.500', 'gray.500')} fontSize="sm">
            Need help?{' '}
            <Box as="span" color="brand.500" _hover={{ textDecoration: 'underline' }}>
              <RouterLink to="/feedback">Contact support</RouterLink>
            </Box>
          </Text>
        </VStack>
      </Container>
    </>
  );
};

export default NotFoundPage;
