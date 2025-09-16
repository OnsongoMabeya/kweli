import React, { useState } from 'react';
import { 
  Box, Flex, Grid, Heading, Text, Select, HStack, VStack, Badge, 
  useColorModeValue, Tabs, TabList, TabPanels, Tab, TabPanel, 
  Table, Thead, Tbody, Tr, Th, Td, Progress, Avatar, Card, CardBody,
  Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Icon, SimpleGrid
} from '@chakra-ui/react';
import { 
  FiBarChart2, FiPieChart, FiTrendingUp, FiUsers, FiMessageSquare, 
  FiAlertCircle, FiCheckCircle, FiClock, FiFilter, FiDownload
} from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Helmet } from 'react-helmet-async';
import { Tooltip as ChakraTooltip } from '@chakra-ui/react';

// Mock data for charts
const sentimentData = [
  { name: 'Positive', value: 65, color: '#4CAF50' },
  { name: 'Neutral', value: 25, color: '#FFC107' },
  { name: 'Negative', value: 10, color: '#F44336' },
];

const categoryData = [
  { name: 'UI/UX', value: 35 },
  { name: 'Performance', value: 25 },
  { name: 'Features', value: 20 },
  { name: 'Bugs', value: 15 },
  { name: 'Other', value: 5 },
];

const timeSeriesData = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 65 },
  { name: 'Mar', value: 55 },
  { name: 'Apr', value: 75 },
  { name: 'May', value: 60 },
  { name: 'Jun', value: 80 },
];

const EnhancedReportsPage = () => {
  const [timeRange, setTimeRange] = useState('week');
  const cardBg = useColorModeValue('white', 'gray.750');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.200');

  const StatCard = ({ title, value, change, icon, color }) => (
    <Card bg={cardBg} borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
      <CardBody>
        <HStack justify="space-between" mb={2}>
          <Text fontSize="sm" color="gray.500">{title}</Text>
          <Box p={2} bg={`${color}.100`} borderRadius="lg">
            <Icon as={icon} boxSize={5} color={`${color}.500`} />
          </Box>
        </HStack>
        <HStack align="flex-end" spacing={2}>
          <Text fontSize="2xl" fontWeight="bold" color={textColor}>{value}</Text>
          <Badge colorScheme={change >= 0 ? 'green' : 'red'} fontSize="xs">
            {change >= 0 ? '+' : ''}{change}%
          </Badge>
        </HStack>
        <StatHelpText>vs last period</StatHelpText>
      </CardBody>
    </Card>
  );

  return (
    <Box p={{ base: 4, md: 6 }} maxW="100vw" overflowX="hidden">
      <Helmet>
        <title>Analytics Dashboard | Kweli</title>
      </Helmet>

      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="lg" mb={1}>Analytics Dashboard</Heading>
          <Text color="gray.500">Track and analyze feedback metrics</Text>
        </Box>
        <HStack>
          <Select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            size="sm"
            w="150px"
            variant="filled"
            icon={<FiFilter />}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </Select>
          <IconButton
            aria-label="Download report"
            icon={<FiDownload />}
            variant="outline"
            size="sm"
          />
        </HStack>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} mb={8}>
        <StatCard 
          title="Total Feedback" 
          value="1,234" 
          change={12.5} 
          icon={FiMessageSquare} 
          color="blue" 
        />
        <StatCard 
          title="Positive Sentiment" 
          value="78%" 
          change={8.2} 
          icon={FiTrendingUp} 
          color="green" 
        />
        <StatCard 
          title="Active Users" 
          value="2.1k" 
          change={15.3} 
          icon={FiUsers} 
          color="purple" 
        />
        <StatCard 
          title="Avg. Response Time" 
          value="2.4h" 
          change={-5.7} 
          icon={FiClock} 
          color="orange" 
        />
      </SimpleGrid>

      <Tabs variant="enclosed" colorScheme="purple" isLazy>
        <TabList>
          <Tab><Icon as={FiBarChart2} mr={2} /> Overview</Tab>
          <Tab><Icon as={FiPieChart} mr={2} /> Sentiment</Tab>
          <Tab><Icon as={FiUsers} mr={2} /> Users</Tab>
        </TabList>
        
        <TabPanels mt={6}>
          <TabPanel p={0}>
            <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="xl" overflow="hidden">
              <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
                <Heading size="md" mb={2}>Feedback Trends</Heading>
                <Text color="gray.500">Feedback volume over the last 6 months</Text>
              </Box>
              <Box p={6} h="400px">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#9D20BD" radius={[4, 4, 0, 0]}>
                      {timeSeriesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#9D20BD" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </TabPanel>
          
          <TabPanel p={0}>
            <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
              <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="xl" overflow="hidden">
                <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
                  <Heading size="md" mb={2}>Sentiment Analysis</Heading>
                  <Text color="gray.500">Distribution of feedback sentiment</Text>
                </Box>
                <Box p={6} h="300px">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sentimentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {sentimentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip formatter={(value: any) => [`${value}%`, 'Percentage']} />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Card>
              
              <Box>
                <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="xl" overflow="hidden" mb={6}>
                  <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
                    <Heading size="md" mb={2}>Sentiment Summary</Heading>
                  </Box>
                  <Box p={6}>
                    <VStack spacing={6} align="stretch">
                      {sentimentData.map((item) => (
                        <Box key={item.name}>
                          <Flex justify="space-between" mb={1}>
                            <Text>{item.name}</Text>
                            <Text fontWeight="medium">{item.value}%</Text>
                          </Flex>
                          <Progress 
                            value={item.value} 
                            size="sm" 
                            colorScheme={item.name.toLowerCase()} 
                            borderRadius="full" 
                          />
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                </Card>
                
                <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="xl" overflow="hidden">
                  <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
                    <Heading size="md" mb={2}>Top Categories</Heading>
                  </Box>
                  <Box p={6}>
                    <VStack spacing={4} align="stretch">
                      {categoryData.map((item) => (
                        <Box key={item.name}>
                          <Flex justify="space-between" mb={1}>
                            <Text>{item.name}</Text>
                            <Text fontWeight="medium">{item.value}%</Text>
                          </Flex>
                          <Progress 
                            value={item.value} 
                            size="sm" 
                            colorScheme="purple" 
                            borderRadius="full"
                            bg={useColorModeValue('gray.100', 'gray.700')}
                          />
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                </Card>
              </Box>
            </Grid>
          </TabPanel>
          
          <TabPanel p={0}>
            <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} borderRadius="xl" overflow="hidden">
              <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
                <Heading size="md" mb={2}>User Activity</Heading>
                <Text color="gray.500">Recent user interactions and feedback</Text>
              </Box>
              <Box p={6}>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>User</Th>
                      <Th>Feedback</Th>
                      <Th>Sentiment</Th>
                      <Th>Date</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>
                        <HStack>
                          <Avatar size="sm" name="John Doe" src="https://randomuser.me/api/portraits/men/1.jpg" />
                          <Text>John Doe</Text>
                        </HStack>
                      </Td>
                      <Td maxW="300px" isTruncated>Loving the new dashboard design!</Td>
                      <Td><Badge colorScheme="green">Positive</Badge></Td>
                      <Td>2h ago</Td>
                      <Td><Badge colorScheme="green" variant="subtle">Resolved</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <HStack>
                          <Avatar size="sm" name="Jane Smith" src="https://randomuser.me/api/portraits/women/1.jpg" />
                          <Text>Jane Smith</Text>
                        </HStack>
                      </Td>
                      <Td maxW="300px" isTruncated>Having issues with the login page on mobile</Td>
                      <Td><Badge colorScheme="red">Negative</Badge></Td>
                      <Td>5h ago</Td>
                      <Td><Badge colorScheme="yellow" variant="subtle">In Progress</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <HStack>
                          <Avatar size="sm" name="Alex Johnson" />
                          <Text>Alex Johnson</Text>
                        </HStack>
                      </Td>
                      <Td maxW="300px" isTruncated>Feature request: Dark mode support</Td>
                      <Td><Badge colorScheme="green">Positive</Badge></Td>
                      <Td>1d ago</Td>
                      <Td><Badge colorScheme="blue" variant="subtle">Under Review</Badge></Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default EnhancedReportsPage;
