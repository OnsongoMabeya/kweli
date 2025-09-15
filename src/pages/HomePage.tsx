import { Box, Button, Container, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => {
  const bgGradient = useColorModeValue(
    'linear(to-r, brand.100, brand.300)',
    'linear(to-r, brand.800, brand.600)'
  );

  return (
    <Container maxW="7xl" py={20}>
      <VStack spacing={8} textAlign="center">
        <Box
          px={8}
          py={10}
          bg={bgGradient}
          borderRadius="xl"
          color="white"
          boxShadow="xl"
          w="100%"
        >
          <Heading as="h1" size="2xl" mb={4}>
            Welcome to Kweli
          </Heading>
          <Text fontSize="xl" mb={8} maxW="2xl" mx="auto">
            Your feedback matters. Help us improve by sharing your thoughts and suggestions.
          </Text>
          <Button
            as={RouterLink}
            to="/feedback"
            colorScheme="whiteAlpha"
            size="lg"
            _hover={{ bg: 'whiteAlpha.800', color: 'brand.600' }}
          >
            Share Your Feedback
          </Button>
        </Box>

        <Box mt={16} w="100%">
          <Heading as="h2" size="xl" mb={8} textAlign="center">
            How It Works
          </Heading>
          
          <Box display="grid" gridTemplateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8}>
            {[
              {
                title: 'Share Feedback',
                description: 'Let us know what you think about our service and how we can improve.'
              },
              {
                title: 'Track Issues',
                description: 'Report bugs or issues you encounter while using our platform.'
              },
              {
                title: 'Request Features',
                description: 'Have an idea for a new feature? We\'d love to hear about it!'
              }
            ].map((item, index) => (
              <Box
                key={index}
                p={6}
                borderWidth="1px"
                borderRadius="lg"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: 'lg',
                  transition: 'all 0.2s',
                }}
              >
                <Text fontSize="xl" fontWeight="bold" mb={2} color="brand.500">
                  {item.title}
                </Text>
                <Text color={useColorModeValue('gray.600', 'gray.300')}>
                  {item.description}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>

        <Box mt={20} textAlign="center">
          <Text fontSize="lg" mb={6}>
            Ready to get started?
          </Text>
          <Button
            as={RouterLink}
            to="/feedback"
            colorScheme="brand"
            size="lg"
            px={10}
          >
            Submit Feedback Now
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default HomePage;
