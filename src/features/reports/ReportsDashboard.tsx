import { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Flex,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Text,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface FeedbackItem {
  id: string;
  name: string;
  email: string;
  type: 'feedback' | 'bug' | 'feature' | 'other';
  message: string;
  createdAt: string;
  status: 'new' | 'in-progress' | 'resolved';
}

const statusColors = {
  new: 'blue',
  'in-progress': 'orange',
  resolved: 'green',
} as const;

const typeColors = {
  feedback: 'blue',
  bug: 'red',
  feature: 'purple',
  other: 'gray',
} as const;

const ReportsDashboard = () => {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Simulate API call to fetch feedback data
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Mock data - in a real app, this would come from an API
        const mockData: FeedbackItem[] = [
          {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            type: 'feature',
            message: 'It would be great to have dark mode support.',
            createdAt: new Date().toISOString(),
            status: 'resolved',
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            type: 'bug',
            message: 'The submit button is not working on the feedback form.',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            status: 'in-progress',
          },
          {
            id: '3',
            name: 'Alex Johnson',
            email: 'alex@example.com',
            type: 'feedback',
            message: 'Great app! Loving the user interface.',
            createdAt: new Date(Date.now() - 172800000).toISOString(),
            status: 'new',
          },
        ];
        
        setFeedback(mockData);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const filteredFeedback = feedback.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  if (isLoading) {
    return (
      <Center minH="200px">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6} flexWrap="wrap" gap={4}>
        <Heading size="lg">Feedback Dashboard</Heading>
        
        <Flex gap={4} flexWrap="wrap">
          <InputGroup maxW="300px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search feedback..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bg={bg}
            />
          </InputGroup>
          
          <Select
            placeholder="Filter by type"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            maxW="200px"
            bg={bg}
          >
            <option value="all">All Types</option>
            <option value="feedback">General Feedback</option>
            <option value="bug">Bug Report</option>
            <option value="feature">Feature Request</option>
            <option value="other">Other</option>
          </Select>
          
          <Select
            placeholder="Filter by status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            maxW="200px"
            bg={bg}
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </Select>
        </Flex>
      </Flex>

      {filteredFeedback.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Text fontSize="lg" color="gray.500">
            No feedback found matching your criteria.
          </Text>
        </Box>
      ) : (
        <Box overflowX="auto">
          <Table variant="simple" bg={bg} borderRadius="md" borderWidth="1px" borderColor={borderColor}>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Type</Th>
                <Th>Message</Th>
                <Th>Status</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredFeedback.map((item) => (
                <Tr key={item.id} _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}>
                  <Td>{item.name}</Td>
                  <Td>{item.email}</Td>
                  <Td>
                    <Badge colorScheme={typeColors[item.type]}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </Badge>
                  </Td>
                  <Td maxW="300px" whiteSpace="normal">
                    <Text isTruncated maxW="300px">{item.message}</Text>
                  </Td>
                  <Td>
                    <Badge 
                      colorScheme={statusColors[item.status] as any}
                      textTransform="capitalize"
                    >
                      {item.status}
                    </Badge>
                  </Td>
                  <Td whiteSpace="nowrap">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default ReportsDashboard;
