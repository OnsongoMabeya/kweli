import { 
  Box, 
  Container, 
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
  useMediaQuery,
  useTheme,
  IconButton,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Tooltip,
  Badge,
  LinearProgress,
  colors
} from '@mui/material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';
import { Helmet } from 'react-helmet-async';
import { 
  FiTrendingUp, 
  FiAlertCircle, 
  FiUsers, 
  FiFilter,
  FiPieChart,
  FiBarChart2,
  FiCalendar,
  FiTag,
  FiMessageSquare
} from 'react-icons/fi';
import { useState } from 'react';

interface CategoryData {
  name: string;
  value: number;
  color: string;
  subcategories: Array<{
    name: string;
    value: number;
  }>;
}

interface FeedbackData {
  totalResponses: number;
  averageRating: number;
  responseRate: number;
  categories: CategoryData[];
  monthlyTrend: Array<{
    name: string;
    value: number;
  }>;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  recentFeedback: Array<{
    id: number;
    type: string;
    summary: string;
    sentiment: string;
    date: string;
    category: string;
    votes: number;
  }>;
}

const ErrorFallback = () => (
  <Box 
    p={6} 
    bg="red.50" 
    color="red.600" 
    borderRadius="xl"
    borderWidth="1px"
    borderColor="red.200"
    textAlign="center"
    maxW="2xl"
    mx="auto"
    my={8}
  >
    <Heading size="md" mb={3}>Something went wrong</Heading>
    <Text mb={4}>We're having trouble loading the reports dashboard. Our team has been notified.</Text>
    <Text fontSize="sm" color="red.500">Please try refreshing the page or come back later.</Text>
  </Box>
);

const feedbackData: FeedbackData = {
  totalResponses: 1248,
  averageRating: 4.2,
  responseRate: 0.78, 
  categories: [
    {
      name: 'Level 1',
      value: 40,
      color: '#4F46E5',
      subcategories: [
        { name: 'Subcategory A', value: 15 },
        { name: 'Subcategory B', value: 15 },
        { name: 'Subcategory C', value: 10 }
      ]
    },
    {
      name: 'Level 2',
      value: 30,
      color: '#EC4899',
      subcategories: [
        { name: 'Subcategory D', value: 10 },
        { name: 'Subcategory E', value: 15 },
        { name: 'Subcategory F', value: 5 }
      ]
    },
    {
      name: 'Level 3',
      value: 20,
      color: '#F59E0B',
      subcategories: [
        { name: 'Subcategory G', value: 5 },
        { name: 'Subcategory H', value: 10 },
        { name: 'Subcategory I', value: 5 }
      ]
    },
    {
      name: 'Level 4',
      value: 10,
      color: '#10B981',
      subcategories: [
        { name: 'Subcategory J', value: 3 },
        { name: 'Subcategory K', value: 4 },
        { name: 'Subcategory L', value: 3 }
      ]
    }
  ],
  monthlyTrend: [
    { name: 'Jan', value: 65 },
    { name: 'Feb', value: 78 },
    { name: 'Mar', value: 92 },
    { name: 'Apr', value: 84 },
    { name: 'May', value: 110 },
    { name: 'Jun', value: 125 },
  ],
  sentiment: {
    positive: 65,
    neutral: 25,
    negative: 10,
  },
  recentFeedback: [
    {
      id: 1,
      type: 'feature',
      summary: 'Add dark mode support',
      sentiment: 'positive',
      date: '2023-06-15',
      category: 'UI/UX',
      votes: 42,
    },
    {
      id: 2,
      type: 'bug',
      summary: 'Login page not loading on mobile',
      sentiment: 'negative',
      date: '2023-06-14',
      category: 'Authentication',
      votes: 18,
    },
  ],
};

const StatCard = ({ 
  icon, 
  title, 
  value, 
  change, 
  isPositive = true,
  description 
}: { 
  icon: any; 
  title: string; 
  value: string | number; 
  change?: string; 
  isPositive?: boolean;
  description?: string;
}) => {
  const bg = useColorModeValue('white', 'gray.750');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  return (
    <Box 
      bg={bg}
      p={6}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
      boxShadow="sm"
      height="100%"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'md',
        transition: 'all 0.2s',
      }}
    >
      <HStack spacing={3} mb={4}>
        <Flex
          align="center"
          justify="center"
          w={10}
          h={10}
          borderRadius="lg"
          bg={isPositive ? 'blue.50' : 'red.50'}
          color={isPositive ? 'blue.500' : 'red.500'}
          flexShrink={0}
        >
          <Icon as={icon} w={5} h={5} />
        </Flex>
        <Box>
          <Text fontSize="sm" fontWeight="medium" color="gray.500">
            {title}
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color={useColorModeValue('gray.800', 'white')}>
            {value}
          </Text>
        </Box>
      </HStack>
      {change && (
        <Stat>
          <StatHelpText color={isPositive ? 'green.500' : 'red.500'} mb={0} mt={2}>
            <HStack spacing={1}>
              <Icon as={isPositive ? FiTrendingUp : FiAlertCircle} />
              <span>{change}</span>
            </HStack>
          </StatHelpText>
        </Stat>
      )}
      {description && (
        <Text fontSize="sm" color="gray.500" mt={2}>
          {description}
        </Text>
      )}
    </Box>
  );
};

const SentimentMeter = ({ 
  positive, 
  neutral, 
  negative 
}: { 
  positive: number; 
  neutral: number; 
  negative: number 
}) => {
  return (
    <VStack spacing={4} align="stretch" mt={4}>
      <Box>
        <HStack justify="space-between" mb={1}>
          <HStack spacing={2}>
            <Box w={3} h={3} bg="green.500" borderRadius="full" />
            <Text fontSize="sm">Positive</Text>
          </HStack>
          <Text fontWeight="medium">{positive}%</Text>
        </HStack>
        <Progress value={positive} size="sm" colorScheme="green" borderRadius="full" />
      </Box>
      <Box>
        <HStack justify="space-between" mb={1}>
          <HStack spacing={2}>
            <Box w={3} h={3} bg="gray.400" borderRadius="full" />
            <Text fontSize="sm">Neutral</Text>
          </HStack>
          <Text fontWeight="medium">{neutral}%</Text>
        </HStack>
        <Progress value={neutral} size="sm" bg="gray.100" borderRadius="full" />
      </Box>
      <Box>
        <HStack justify="space-between" mb={1}>
          <HStack spacing={2}>
            <Box w={3} h={3} bg="red.500" borderRadius="full" />
            <Text fontSize="sm">Negative</Text>
          </HStack>
          <Text fontWeight="medium">{negative}%</Text>
        </HStack>
        <Progress value={negative} size="sm" colorScheme="red" borderRadius="full" />
      </Box>
    </VStack>
  );
};

const renderLabelContent = (props: { name?: string; percent?: number }) => {
  const { name = '', percent = 0 } = props;
  return `${name}: ${(percent * 100).toFixed(0)}%`;
};

const CategoryPieChart = ({ data }: { data: CategoryData[] }) => {
  const mainCategories = data.map(category => ({
    name: category.name,
    value: category.value,
    color: category.color
  }));

  // Get subcategories for the second level
  const allSubcategories = data.flatMap(category => 
    category.subcategories.map(sub => ({
      ...sub,
      parent: category.name,
      color: category.color
    }))
  );

  return (
    <Box>
      <Tabs variant="enclosed" colorScheme="blue" mb={4}>
        <TabList>
          <Tab>Main Categories</Tab>
          <Tab>Subcategories</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0} pt={4}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mainCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                  label={renderLabelContent}
                >
                  {mainCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value: number, name: string, props: any) => [
                    value,
                    props.payload.name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </TabPanel>
          <TabPanel p={0} pt={4}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={allSubcategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={renderLabelContent}
                >
                  {allSubcategories.map((entry, index) => (
                    <Cell key={`subcell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value: number, name: string, props: any) => [
                    value,
                    `${props.payload.parent} - ${props.payload.name}`,
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

const TrendChart = ({ 
  data 
}: { 
  data: Array<{ name: string; value: number }> 
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis />
        <RechartsTooltip 
          formatter={(value) => [`${value} responses`, '']}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Bar dataKey="value" fill="#4F46E5" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill="#4F46E5" />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

const ReportsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const bg = theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50];
  const cardBg = theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.background.paper;

  return (
    <Box bg={bg} minH="100vh">
      <Helmet>
        <title>Feedback Reports - Kweli</title>
        <meta name="description" content="View and manage all feedback, bug reports, and feature requests." />
      </Helmet>
      
      {/* Header Section */}
      <Box bg={useColorModeValue('white', 'gray.800')} boxShadow="sm">
        <Container maxW="7xl" py={8} px={{ base: 4, md: 8 }}>
          <VStack spacing={2} align="stretch">
            <HStack justify="space-between" align="center">
              <Box>
                <Heading as="h1" size="2xl" fontWeight="bold" color={useColorModeValue('gray.800', 'white')}>
                  Feedback Analytics
                </Heading>
                <Text color={useColorModeValue('gray.600', 'gray.300')} mt={2}>
                  Track and analyze user feedback to improve your product
                </Text>
              </Box>
              {!isMobile && (
                <HStack spacing={4}>
                  <Box
                    as="button"
                    px={4}
                    py={2}
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    _hover={{
                      bg: useColorModeValue('gray.50', 'gray.700'),
                    }}
                  >
                    <HStack spacing={2}>
                      <Icon as={FiFilter} />
                      <Text>Filter</Text>
                    </HStack>
                  </Box>
                  <Box
                    as="button"
                    px={4}
                    py={2}
                    bg="blue.600"
                    color="white"
                    borderRadius="lg"
                    _hover={{
                      bg: 'blue.700',
                    }}
                  >
                    Export Report
                  </Box>
                </HStack>
              )}
            </HStack>
            <Box borderBottomWidth="1px" borderColor={useColorModeValue('gray.200', 'gray.700')} mt={4} />
          </VStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Box py={8}>
        <Container maxW="7xl" px={{ base: 4, md: 8 }}>
          {/* Summary Stats */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={10}>
            <StatCard 
              icon={FiMessageSquare} 
              title="Total Responses" 
              value={feedbackData.totalResponses.toLocaleString()}
              change="+12% from last month"
              isPositive={true}
              description="Total feedback received"
            />
            <StatCard 
              icon={FiBarChart2} 
              title="Avg. Rating" 
              value={feedbackData.averageRating.toFixed(1)} 
              change="+0.3 from last month" 
              isPositive={true}
              description="Out of 5"
            />
            <StatCard 
              icon={FiUsers} 
              title="Response Rate" 
              value={`${(feedbackData.responseRate * 100).toFixed(0)}%`} 
              change="+5% from last month" 
              isPositive={true}
              description="Of total users"
            />
            <Box 
              bg={cardBg}
              p={6}
              borderRadius="xl"
              borderWidth="1px"
              borderColor={useColorModeValue('gray.200', 'gray.700')}
              boxShadow="sm"
            >
              <HStack spacing={3} mb={4}>
                <Flex
                  align="center"
                  justify="center"
                  w={10}
                  h={10}
                  borderRadius="lg"
                  bg="purple.50"
                  color="purple.500"
                >
                  <Icon as={FiPieChart} w={5} h={5} />
                </Flex>
                <Text fontSize="sm" fontWeight="medium" color="gray.500">
                  Sentiment
                </Text>
              </HStack>
              <SentimentMeter 
                positive={feedbackData.sentiment.positive}
                neutral={feedbackData.sentiment.neutral}
                negative={feedbackData.sentiment.negative}
              />
            </Box>
          </SimpleGrid>

          {/* Charts Section */}
          <Box
            bg={cardBg}
            borderRadius="2xl"
            boxShadow="lg"
            p={{ base: 4, md: 6 }}
            mb={8}
          >
            <Tabs variant="enclosed" colorScheme="blue">
              <TabList>
                <Tab>
                  <HStack spacing={2}>
                    <Icon as={FiBarChart2} />
                    <Text>Trends</Text>
                  </HStack>
                </Tab>
                <Tab>
                  <HStack spacing={2}>
                    <Icon as={FiPieChart} />
                    <Text>Categories</Text>
                  </HStack>
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel px={0}>
                  <Box h="300px" mt={4}>
                    <TrendChart data={feedbackData.monthlyTrend} />
                  </Box>
                </TabPanel>
                <TabPanel px={0}>
                  <Box h="300px" mt={4}>
                    <CategoryPieChart data={feedbackData.categories} />
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>

          {/* Recent Feedback */}
          <Box
            bg={cardBg}
            borderRadius="2xl"
            boxShadow="lg"
            p={{ base: 4, md: 6 }}
          >
            <HStack justify="space-between" mb={6}>
              <Box>
                <Heading size="md" color={useColorModeValue('gray.800', 'white')}>
                  Recent Feedback
                </Heading>
                <Text color={useColorModeValue('gray.600', 'gray.300')}>
                  Latest user feedback and insights
                </Text>
              </Box>
              <Box
                as="button"
                px={4}
                py={2}
                color="blue.600"
                fontSize="sm"
                fontWeight="medium"
                _hover={{
                  textDecoration: 'underline',
                }}
              >
                View All
              </Box>
            </HStack>

            <VStack spacing={4} align="stretch">
              {feedbackData.recentFeedback.map((item) => (
                <Box
                  key={item.id}
                  p={4}
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor={useColorModeValue('gray.100', 'gray.700')}
                  _hover={{
                    bg: useColorModeValue('gray.50', 'gray.700'),
                  }}
                >
                  <HStack spacing={3} align="flex-start">
                    <Flex
                      align="center"
                      justify="center"
                      w={8}
                      h={8}
                      borderRadius="md"
                      bg={item.type === 'bug' ? 'red.50' : 'blue.50'}
                      color={item.type === 'bug' ? 'red.500' : 'blue.500'}
                      flexShrink={0}
                      mt={1}
                    >
                      <Icon as={item.type === 'bug' ? FiAlertCircle : FiMessageSquare} w={4} h={4} />
                    </Flex>
                    <Box flex={1}>
                      <HStack spacing={2} mb={1}>
                        <Text fontWeight="medium" color={useColorModeValue('gray.800', 'white')}>
                          {item.summary}
                        </Text>
                        <Badge 
                          colorScheme={
                            item.sentiment === 'positive' ? 'green' : 
                            item.sentiment === 'negative' ? 'red' : 'gray'
                          }
                          variant="subtle"
                          fontSize="xs"
                          textTransform="none"
                        >
                          {item.sentiment}
                        </Badge>
                      </HStack>
                      <HStack spacing={4} fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>
                        <HStack spacing={1}>
                          <Icon as={FiCalendar} w={3} h={3} />
                          <Text>{item.date}</Text>
                        </HStack>
                        <HStack spacing={1}>
                          <Icon as={FiTag} w={3} h={3} />
                          <Text>{item.category}</Text>
                        </HStack>
                        <HStack spacing={1}>
                          <Icon as={FiUsers} w={3} h={3} />
                          <Text>{item.votes} votes</Text>
                        </HStack>
                      </HStack>
                    </Box>
                    <Box
                      as="button"
                      px={3}
                      py={1}
                      borderRadius="md"
                      fontSize="sm"
                      fontWeight="medium"
                      bg={useColorModeValue('gray.100', 'gray.700')}
                      _hover={{
                        bg: useColorModeValue('gray.200', 'gray.600'),
                      }}
                    >
                      Details
                    </Box>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </Box>

          {/* Action Items */}
          <Box
            mt={8}
            p={6}
            bgGradient="linear(to-r, blue.50, purple.50)"
            _dark={{ bgGradient: 'linear(to-r, blue.900, purple.900)' }}
            borderRadius="2xl"
            textAlign="center"
          >
            <Heading size="md" mb={2} color={useColorModeValue('gray.800', 'white')}>
              Ready to dive deeper?
            </Heading>
            <Text color={useColorModeValue('gray.600', 'gray.300')} mb={6} maxW="2xl" mx="auto">
              Export your feedback data for further analysis or share these insights with your team.
            </Text>
            <HStack spacing={4} justify="center">
              <Box
                as="button"
                px={6}
                py={2}
                bg="white"
                color="blue.600"
                borderRadius="lg"
                fontWeight="medium"
                _dark={{ bg: 'gray.800', color: 'white' }}
                _hover={{
                  transform: 'translateY(-1px)',
                  boxShadow: 'sm',
                }}
              >
                Export Data
              </Box>
              <Box
                as="button"
                px={6}
                py={2}
                bg="blue.600"
                color="white"
                borderRadius="lg"
                fontWeight="medium"
                _hover={{
                  bg: 'blue.700',
                  transform: 'translateY(-1px)',
                  boxShadow: 'sm',
                }}
              >
                Share Report
              </Box>
            </HStack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ReportsPage;
