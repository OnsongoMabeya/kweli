import { useState } from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Badge,
  Text,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useMemo } from 'react';
import { useFeedbacks, useFeedbackStats } from '../../hooks/useFeedback';
import type { Feedback } from '../../types/feedback';

const statusColorMap: Record<string, string> = {
  new: 'blue',
  'in-progress': 'orange',
  resolved: 'green',
  rejected: 'red',
};

const typeColorMap: Record<string, string> = {
  'service-delivery': 'blue',
  'policy-issue': 'red',
  'public-safety': 'green',
  'infrastructure': 'orange',
  'other': 'gray',
};

export const ReportsDashboardNew = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  
  const { data: feedbacks = [], isLoading: isLoadingFeedbacks } = useFeedbacks();
  const { data: stats, isLoading: isLoadingStats } = useFeedbackStats();
  
  const filteredFeedbacks: Feedback[] = useMemo(() => {
    return feedbacks.filter((feedback) => {
      const matchesSearch = feedback.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          feedback.message.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || feedback.status === selectedStatus;
      const matchesType = selectedType === 'all' || feedback.type === selectedType;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [feedbacks, searchTerm, selectedStatus, selectedType]);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  if (isLoadingStats || isLoadingFeedbacks) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="200px">
        <Spinner size="xl" />
      </Box>
    );
  }
  
  return (
    <Box>
      {/* Stats Cards */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={8}>
        <Card bg={bgColor} border="1px" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <StatLabel>Total Feedback</StatLabel>
              <StatNumber>{stats?.total || 0}</StatNumber>
            </Stat>
          </CardBody>
        </Card>
        
        <Card bg={bgColor} border="1px" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <StatLabel>In Progress</StatLabel>
              <StatNumber>{stats?.byStatus?.['in-progress'] || 0}</StatNumber>
            </Stat>
          </CardBody>
        </Card>
        
        <Card bg={bgColor} border="1px" borderColor={borderColor}>
          <CardBody>
            <Stat>
              <StatLabel>Resolved</StatLabel>
              <StatNumber>{stats?.byStatus?.resolved || 0}</StatNumber>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>
      
      {/* Filters */}
      <Card bg={bgColor} border="1px" borderColor={borderColor} mb={8}>
        <CardHeader pb={0}>
          <Heading size="md">Feedback List</Heading>
        </CardHeader>
        <CardBody>
          <Flex direction={{ base: 'column', md: 'row' }} gap={4} mb={6}>
            <InputGroup maxW="400px">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
            
            <Select
              placeholder="Filter by status"
              maxW="200px"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </Select>
            
            <Select
              placeholder="Filter by type"
              maxW="200px"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="feedback">General Feedback</option>
              <option value="bug">Bug Report</option>
              <option value="feature">Feature Request</option>
              <option value="other">Other</option>
            </Select>
          </Flex>
          
          {/* Feedback Table */}
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Phone Number</Th>
                  <Th>Type</Th>
                  <Th>Status</Th>
                  <Th>Date</Th>
                  <Th>Message</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredFeedbacks.length === 0 ? (
                  <Tr>
                    <Td colSpan={5} textAlign="center" py={8}>
                      <Text color="gray.500">No feedback found matching your criteria</Text>
                    </Td>
                  </Tr>
                ) : (
                  filteredFeedbacks.map((feedback: Feedback) => (
                    <Tr key={feedback.id} _hover={{ bg: 'gray.50', _dark: { bg: 'gray.700' } }}>
                      <Td>
                        <Text fontWeight="medium">{feedback.phoneNumber}</Text>
                      </Td>
                      <Td>
                        <Badge colorScheme={typeColorMap[feedback.type] || 'gray'}>
                          {(() => {
                            const typeLabels: Record<string, string> = {
                              'service-delivery': 'Service Delivery',
                              'policy-issue': 'Policy Issue',
                              'public-safety': 'Public Safety',
                              'infrastructure': 'Infrastructure',
                              'other': 'Other'
                            };
                            return typeLabels[feedback.type] || feedback.type;
                          })()}
                        </Badge>
                      </Td>
                      <Td>
                        <Badge colorScheme={statusColorMap[feedback.status]}>
                          {feedback.status.split('-').map(word => 
                            (word as string).charAt(0).toUpperCase() + (word as string).slice(1)
                          ).join(' ')}
                        </Badge>
                      </Td>
                      <Td whiteSpace="nowrap">
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </Td>
                      <Td maxW="300px" isTruncated title={feedback.message}>
                        {feedback.message}
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};

export default ReportsDashboardNew;
