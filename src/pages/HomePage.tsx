import { Box, Button, Container, Flex, Heading, Text, VStack, HStack, useColorModeValue, Icon, SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiMessageSquare, FiAlertTriangle, FiTool, FiBarChart2 } from 'react-icons/fi';

const FeatureCard = ({ icon, title, description, color }) => (
  <Box
    p={6}
    bg={useColorModeValue('white', 'gray.800')}
    borderRadius="xl"
    borderWidth="1px"
    borderColor={useColorModeValue('gray.200', 'gray.700')}
    _hover={{
      transform: 'translateY(-5px)',
      boxShadow: 'xl',
      transition: 'all 0.3s',
    }}
    height="100%"
    position="relative"
    overflow="hidden"
  >
    <Flex
      align="center"
      justify="center"
      w={12}
      h={12}
      mb={4}
      rounded="full"
      bg={`${color}.100`}
      color={`${color}.600`}
    >
      <Icon as={icon} w={6} h={6} />
    </Flex>
    <Heading as="h3" size="md" mb={2} color={useColorModeValue('gray.800', 'white')}>
      {title}
    </Heading>
    <Text color={useColorModeValue('gray.600', 'gray.300')}>
      {description}
    </Text>
  </Box>
);

const HomePage = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const heroBg = useColorModeValue(
    'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
    'linear-gradient(135deg, #3730A3 0%, #5B21B6 100%)'
  );

  return (
    <Box>
      {/* Hero Section */}
      <Box bg={heroBg} color="white" py={{ base: 16, md: 24 }}>
        <Container maxW="7xl" px={{ base: 4, md: 8 }}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justify="space-between"
          >
            <Box maxW={{ base: '100%', md: '50%' }} mb={{ base: 10, md: 0 }}>
              <Text
                fontSize={{ base: 'sm', md: 'md' }}
                fontWeight="semibold"
                color="whiteAlpha.800"
                mb={2}
              >
                VOICE YOUR THOUGHTS, SHAPE OUR FUTURE
              </Text>
              <Heading
                as="h1"
                size={{ base: '2xl', md: '4xl' }}
                fontWeight="extrabold"
                lineHeight="1.2"
                mb={6}
              >
                Your Feedback Drives Our Progress
              </Heading>
              <Text fontSize={{ base: 'lg', md: 'xl' }} mb={8} opacity={0.9}>
                Join thousands of users who are helping us build better products and services through their valuable insights and suggestions. Your voice matters.
              </Text>
              <HStack spacing={4} flexWrap="wrap">
                <Button
                  as={RouterLink}
                  to="/feedback"
                  size="lg"
                  colorScheme="whiteAlpha"
                  rightIcon={<FiArrowRight />}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                >
                  Share Your Feedback
                </Button>
                <Button
                  as="a"
                  href="#how-it-works"
                  variant="outline"
                  size="lg"
                  rightIcon={<FiArrowRight />}
                  _hover={{
                    bg: 'whiteAlpha.100',
                    transform: 'translateY(-2px)',
                  }}
                >
                  Learn More
                </Button>
              </HStack>
            </Box>
            {!isMobile && (
              <Box
                w={{ base: '100%', md: '45%' }}
                bg="whiteAlpha.100"
                p={6}
                borderRadius="2xl"
                backdropFilter="blur(8px)"
                border="1px solid"
                borderColor="whiteAlpha.200"
              >
                <Box
                  bg="white"
                  p={6}
                  borderRadius="xl"
                  boxShadow="xl"
                  color="gray.800"
                >
                  <Text fontSize="lg" fontWeight="bold" mb={4}>
                    👋 Welcome to Kweli Feedback Platform
                  </Text>
                  <Text mb={4}>
                    We're excited to hear from you! Share your thoughts, report issues, or suggest new features to help us improve.
                  </Text>
                  <Button
                    as={RouterLink}
                    to="/feedback"
                    colorScheme="blue"
                    size="sm"
                    rightIcon={<FiArrowRight />}
                    width="100%"
                  >
                    Get Started
                  </Button>
                </Box>
              </Box>
            )}
          </Flex>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={20} id="how-it-works">
        <Container maxW="7xl" px={{ base: 4, md: 8 }}>
          <Box textAlign="center" mb={16}>
            <Text
              fontSize="sm"
              fontWeight="semibold"
              color="blue.500"
              mb={2}
              textTransform="uppercase"
              letterSpacing="wide"
            >
              How It Works
            </Text>
            <Heading as="h2" size="2xl" mb={4}>
              Simple Steps to Make an Impact
            </Heading>
            <Text maxW="2xl" mx="auto" color={useColorModeValue('gray.600', 'gray.300')}>
              Your feedback is just a few clicks away from making a difference. Here's how you can contribute:
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={20}>
            {[
              {
                icon: FiMessageSquare,
                title: 'Share Your Thoughts',
                description: 'Tell us about your experience, suggest improvements, or share ideas for new features.',
                color: 'blue'
              },
              {
                icon: FiAlertTriangle,
                title: 'Report Issues',
                description: 'Found a bug or problem? Let us know so we can fix it and improve for everyone.',
                color: 'red'
              },
              {
                icon: FiBarChart2,
                title: 'See the Impact',
                description: 'Track how your feedback contributes to our ongoing improvements and updates.',
                color: 'green'
              }
            ].map((feature, index) => (
              <Box key={index}>
                <Flex
                  align="center"
                  justify="center"
                  w={16}
                  h={16}
                  mx="auto"
                  mb={6}
                  rounded="full"
                  bg={`${feature.color}.100`}
                  color={`${feature.color}.600`}
                >
                  <Icon as={feature.icon} w={8} h={8} />
                </Flex>
                <Text
                  textAlign="center"
                  fontWeight="bold"
                  fontSize="xl"
                  mb={2}
                  color={useColorModeValue('gray.800', 'white')}
                >
                  {feature.title}
                </Text>
                <Text textAlign="center" color={useColorModeValue('gray.600', 'gray.300')}>
                  {feature.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>

          <Box
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={8}
            borderRadius="2xl"
            textAlign="center"
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
            <Box
              position="absolute"
              bottom={-40}
              left={-20}
              w={80}
              h={80}
              bg="blue.200"
              opacity={0.05}
              borderRadius="full"
            />
            <Box position="relative" zIndex={1}>
              <Heading as="h3" size="lg" mb={4}>
                Ready to make a difference?
              </Heading>
              <Text maxW="2xl" mx="auto" mb={8} color={useColorModeValue('gray.700', 'gray.200')}>
                Join our community of feedback contributors and help shape the future of our products and services.
              </Text>
              <Button
                as={RouterLink}
                to="/feedback"
                colorScheme="blue"
                size="lg"
                rightIcon={<FiArrowRight />}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
              >
                Share Your Feedback Now
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box py={20} bg={useColorModeValue('gray.50', 'gray.900')}>
        <Container maxW="7xl" px={{ base: 4, md: 8 }}>
          <Box textAlign="center" mb={16}>
            <Text
              fontSize="sm"
              fontWeight="semibold"
              color="blue.500"
              mb={2}
              textTransform="uppercase"
              letterSpacing="wide"
            >
              Testimonials
            </Text>
            <Heading as="h2" size="2xl" mb={4}>
              What Our Users Say
            </Heading>
            <Text maxW="2xl" mx="auto" color={useColorModeValue('gray.600', 'gray.300')}>
              Don't just take our word for it. Here's what people are saying about their experience with Kweli.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {[
              {
                name: 'Sarah Johnson',
                role: 'Product Manager',
                content: 'Kweli has transformed how we collect and act on user feedback. The insights we\'ve gained have been invaluable for our product development.',
                avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
              },
              {
                name: 'Michael Chen',
                role: 'UX Designer',
                content: 'The feedback we receive through Kweli is incredibly detailed and actionable. It helps us create better user experiences every day.',
                avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
              },
              {
                name: 'Amina Diallo',
                role: 'Customer Success',
                content: 'Our response time to user issues has improved dramatically since implementing Kweli. The team loves how easy it is to track and manage feedback.',
                avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
              }
            ].map((testimonial, index) => (
              <Box
                key={index}
                bg={useColorModeValue('white', 'gray.800')}
                p={8}
                borderRadius="xl"
                boxShadow="lg"
                _hover={{
                  transform: 'translateY(-5px)',
                  transition: 'all 0.3s',
                }}
              >
                <Box display="flex" mb={4}>
                  {[...Array(5)].map((_, i) => (
                    <Icon as={FiCheckCircle} key={i} color="yellow.400" mr={1} />
                  ))}
                </Box>
                <Text mb={6} color={useColorModeValue('gray.600', 'gray.300')} fontStyle="italic">
                  "{testimonial.content}"
                </Text>
                <Flex align="center">
                  <Box
                    w={12}
                    h={12}
                    borderRadius="full"
                    bg={`url(${testimonial.avatar})`}
                    bgSize="cover"
                    bgPosition="center"
                    mr={4}
                  />
                  <Box>
                    <Text fontWeight="bold" color={useColorModeValue('gray.800', 'white')}>
                      {testimonial.name}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {testimonial.role}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={20} bg={useColorModeValue('white', 'gray.800')}>
        <Container maxW="4xl" textAlign="center">
          <Box
            bg={useColorModeValue('blue.600', 'blue.800')}
            p={{ base: 8, md: 12 }}
            borderRadius="2xl"
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              top={-20}
              right={-20}
              w={64}
              h={64}
              bg="whiteAlpha.100"
              borderRadius="full"
            />
            <Box
              position="absolute"
              bottom={-40}
              left={-20}
              w={80}
              h={80}
              bg="whiteAlpha.100"
              borderRadius="full"
            />
            <Box position="relative" zIndex={1}>
              <Heading as="h2" size="xl" color="white" mb={6}>
                Ready to make your voice heard?
              </Heading>
              <Text fontSize="xl" color="whiteAlpha.900" mb={8} maxW="2xl" mx="auto">
                Join thousands of users who are helping shape the future of our products and services. Your feedback makes a difference.
              </Text>
              <Button
                as={RouterLink}
                to="/feedback"
                size="lg"
                colorScheme="whiteAlpha"
                rightIcon={<FiArrowRight />}
                _hover={{
                  bg: 'whiteAlpha.200',
                  transform: 'translateY(-2px)',
                }}
              >
                Submit Your Feedback Now
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
