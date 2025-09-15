import { Box, Container, Heading, VStack, HStack, Text, useColorModeValue, Icon, Flex, useBreakpointValue } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import { FiMessageSquare, FiAlertTriangle, FiTool, FiChevronRight } from 'react-icons/fi';
import FeedbackForm from '../components/forms/FeedbackForm';

const FeedbackPage = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.750');
  const isMobile = useBreakpointValue({ base: true, md: false });
  const heroBg = useColorModeValue(
    'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
    'linear-gradient(135deg, #3730A3 0%, #5B21B6 100%)'
  );
  
  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh">
      <Helmet>
        <title>Submit Feedback - Kweli</title>
        <meta name="description" content="Share your feedback, report bugs, or request new features for Kweli." />
      </Helmet>
      
      {/* Hero Section */}
      <Box bg={heroBg} color="white" py={{ base: 12, md: 16 }}>
        <Container maxW="7xl" px={{ base: 4, md: 8 }}>
          <VStack spacing={4} textAlign={{ base: 'center', md: 'left' }} align={{ base: 'center', md: 'flex-start' }}>
            <Text
              fontSize={{ base: 'sm', md: 'md' }}
              fontWeight="semibold"
              color="whiteAlpha.800"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              We Value Your Input
            </Text>
            <Heading
              as="h1"
              size={{ base: '2xl', md: '3xl' }}
              fontWeight="extrabold"
              lineHeight="1.2"
              maxW="3xl"
            >
              Help Us Improve Kweli
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }} maxW="2xl" opacity={0.9}>
              Your feedback helps us create a better experience for everyone. Share your thoughts, report issues, or suggest new features.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Box py={12}>
        <Container maxW="7xl" px={{ base: 4, md: 8 }}>
          <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
            {/* Form Section */}
            <Box flex={2}>
              <Box
                bg={cardBg}
                p={{ base: 6, md: 8 }}
                borderRadius="2xl"
                boxShadow="lg"
                position="relative"
                overflow="hidden"
              >
                <Box
                  position="absolute"
                  top={-20}
                  right={-20}
                  w={64}
                  h={64}
                  bg="blue.100"
                  opacity={0.1}
                  borderRadius="full"
                />
                <Box position="relative" zIndex={1}>
                  <Heading as="h2" size="lg" mb={6} color={useColorModeValue('gray.800', 'white')}>
                    Share Your Feedback
                  </Heading>
                  <FeedbackForm />
                </Box>
              </Box>
            </Box>

            {/* Info Sidebar */}
            <Box flex={1}>
              <VStack spacing={6} position={{ base: 'static', lg: 'sticky' }} top={6}>
                <Box
                  bg={cardBg}
                  p={6}
                  borderRadius="2xl"
                  boxShadow="lg"
                  w="100%"
                >
                  <Heading as="h3" size="md" mb={4} color={useColorModeValue('gray.800', 'white')}>
                    What to Include
                  </Heading>
                  <VStack spacing={4} align="stretch">
                    {[
                      {
                        icon: FiMessageSquare,
                        title: 'Be Specific',
                        description: 'Provide details about what you liked, what could be improved, or what issue you\'re experiencing.'
                      },
                      {
                        icon: FiAlertTriangle,
                        title: 'Report Issues',
                        description: 'Include steps to reproduce the problem and any error messages you see.'
                      },
                      {
                        icon: FiTool,
                        title: 'Suggest Features',
                        description: 'Have an idea? Tell us how it would work and why it would be valuable.'
                      }
                    ].map((item, index) => (
                      <HStack key={index} align="flex-start" spacing={4}>
                        <Flex
                          align="center"
                          justify="center"
                          flexShrink={0}
                          w={10}
                          h={10}
                          rounded="lg"
                          bg="blue.50"
                          color="blue.600"
                        >
                          <Icon as={item.icon} w={5} h={5} />
                        </Flex>
                        <Box>
                          <Text fontWeight="medium" color={useColorModeValue('gray.800', 'white')} mb={1}>
                            {item.title}
                          </Text>
                          <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>
                            {item.description}
                          </Text>
                        </Box>
                      </HStack>
                    ))}
                  </VStack>
                </Box>

                <Box
                  bg={useColorModeValue('blue.50', 'blue.900')}
                  p={6}
                  borderRadius="2xl"
                  w="100%"
                >
                  <Heading as="h3" size="md" mb={4} color={useColorModeValue('blue.800', 'white')}>
                    What Happens Next?
                  </Heading>
                  <VStack spacing={3} align="stretch">
                    {[
                      'We review all feedback carefully',
                      'You\'ll receive a confirmation email',
                      'Our team will follow up if we need more details',
                      'We\'ll notify you when your suggestion is implemented'
                    ].map((item, index) => (
                      <HStack key={index} spacing={3}>
                        <Icon as={FiChevronRight} color="blue.500" />
                        <Text fontSize="sm" color={useColorModeValue('blue.800', 'blue.100')}>
                          {item}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              </VStack>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default FeedbackPage;
