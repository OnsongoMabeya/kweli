import { Box, Container, Heading, VStack, useColorModeValue } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import { ReportsDashboardNew as ReportsDashboard } from '../features/reports/ReportsDashboardNew';

const ErrorFallback = () => (
  <Box 
    p={4} 
    bg="red.50" 
    color="red.600" 
    borderRadius="md"
    borderWidth="1px"
    borderColor="red.200"
  >
    <Heading size="md" mb={2}>Something went wrong</Heading>
    <p>We're having trouble loading the reports dashboard. Please try again later.</p>
  </Box>
);

const ReportsPage = () => {
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <Box bg={bg} minH="100vh">
      <Helmet>
        <title>Feedback Reports - Kweli</title>
        <meta name="description" content="View and manage all feedback, bug reports, and feature requests." />
      </Helmet>
      
      <Box as="main" py={8}>
        <Container maxW="container.xl">
          <VStack spacing={8} align="stretch">
            <Box>
              <Heading as="h1" size="2xl" mb={2}>
                Feedback Analytics
              </Heading>
              <Box borderBottomWidth="2px" borderColor="brand.500" w="80px" />
            </Box>
            
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <ReportsDashboard />
            </ErrorBoundary>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default ReportsPage;
