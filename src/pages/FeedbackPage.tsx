import { Box, Container, Heading, VStack, useColorModeValue } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import FeedbackForm from '../components/forms/FeedbackForm';

const FeedbackPage = () => {
  const bg = useColorModeValue('white', 'gray.800');
  
  return (
    <>
      <Helmet>
        <title>Submit Feedback - Kweli</title>
        <meta name="description" content="Share your feedback, report bugs, or request new features for Kweli." />
      </Helmet>
      
      <Box bg={bg} py={8} boxShadow="sm">
        <Container maxW="container.xl">
          <VStack spacing={2} align="stretch">
            <Heading as="h1" size="xl">
              Share Your Feedback
            </Heading>
            <Box
              height="4px"
              width="80px"
              bg="brand.500"
              borderRadius="full"
              mt={2}
              mb={6}
            />
          </VStack>
        </Container>
      </Box>
      
      <Container maxW="container.md" py={10}>
        <Box
          p={8}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
          bg={bg}
        >
          <FeedbackForm />
        </Box>
      </Container>
    </>
  );
};

export default FeedbackPage;
