import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Chip,
  Container, 
  Divider, 
  Paper, 
  Stack, 
  Tab, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Tabs, 
  Typography
} from '@mui/material';
import {
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  FileDownload as FileDownloadIcon,
  SentimentDissatisfied as SentimentDissatisfiedIcon,
  SentimentNeutral as SentimentNeutralIcon,
  SentimentSatisfiedAlt as SentimentSatisfiedAltIcon,
  TableChart as TableChartIcon,
  Tag as TagIcon,
  People as PeopleIcon
} from '@mui/icons-material';

interface FeedbackItem {
  id: number;
  type: 'bug' | 'suggestion' | 'feature';
  message: string;
  category: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  date: string;
  votes: number;
}

const tabOptions = [
  { label: 'Overview', icon: <BarChartIcon /> },
  { label: 'Trends', icon: <PieChartIcon /> },
  { label: 'Feedback', icon: <TableChartIcon /> },
] as const;

const ReportsPage: React.FC = () => {
  const [tabValue, setTabValue] = useState<number>(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const stats = [
    { label: 'Total Feedback', value: '1,234' },
    { label: 'Avg. Rating', value: '4.2' },
    { label: 'Response Rate', value: '89%' },
    { label: 'Active Users', value: '2.1k' },
  ] as const;

  const feedbackData: FeedbackItem[] = [
    {
      id: 1,
      type: 'bug',
      message: 'The login button is not working on mobile devices',
      category: 'Authentication',
      sentiment: 'negative',
      date: '2023-05-15T10:30:00Z',
      votes: 24,
    },
    {
      id: 2,
      type: 'feature',
      message: 'Add dark mode support',
      category: 'UI/UX',
      sentiment: 'positive',
      date: '2023-05-14T14:22:00Z',
      votes: 45,
    },
    {
      id: 3,
      type: 'suggestion',
      message: 'Improve the search functionality',
      category: 'Search',
      sentiment: 'neutral',
      date: '2023-05-13T09:15:00Z',
      votes: 12,
    },
  ];

  return (
    <Box component="section" sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 4, width: '100%' }}>
      <Container maxWidth={false} sx={{ maxWidth: 'xl' }}>
        <Helmet>
          <title>Reports | Feedback Analytics</title>
        </Helmet>

        <Box mb={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            Feedback Analytics
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track and analyze user feedback to improve your product
          </Typography>
        </Box>

        {/* Stats Grid */}
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 6 }}>
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {stat.label}
                  </Typography>
                  <Typography variant="h4" component="div">
                    {stat.value}
                  </Typography>
                  </CardContent>
                </Card>
            ))}
          </Box>
        </Box>

        {/* Tabs Section */}
        <Card>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ minHeight: 64 }}
          >
            {tabOptions.map((tab, index) => (
              <Tab
                key={index}
                icon={tab.icon}
                label={tab.label}
                sx={{ minHeight: 64, minWidth: 'auto' }}
              />
            ))}
          </Tabs>
          <Divider />
          <Box sx={{ p: 3 }}>
            {tabValue === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Feedback Overview
                </Typography>
                <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body1" color="text.secondary">
                    Feedback trend chart will be displayed here
                  </Typography>
                </Box>
              </Box>
            )}
            {tabValue === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Feedback by Category
                </Typography>
                <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body1" color="text.secondary">
                    Category distribution chart will be displayed here
                  </Typography>
                </Box>
              </Box>
            )}
            {tabValue === 2 && (
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">
                    Recent Feedback
                  </Typography>
                  <Button 
                    variant="outlined" 
                    startIcon={<FileDownloadIcon />}
                    size="small"
                  >
                    Export
                  </Button>
                </Stack>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>Message</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Sentiment</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Votes</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {feedbackData.map((feedback) => (
                        <TableRow key={feedback.id} hover>
                          <TableCell>
                            <Chip 
                              label={feedback.type}
                              color={
                                feedback.type === 'bug' ? 'error' : 
                                feedback.type === 'feature' ? 'success' : 'info'
                              }
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>{feedback.message}</TableCell>
                          <TableCell>
                            <Chip 
                              icon={<TagIcon fontSize="small" />} 
                              label={feedback.category} 
                              size="small" 
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              color: 
                                feedback.sentiment === 'positive' ? 'success.main' :
                                feedback.sentiment === 'negative' ? 'error.main' :
                                'warning.main'
                            }}>
                              {feedback.sentiment === 'positive' ? (
                                <SentimentSatisfiedAltIcon fontSize="small" sx={{ mr: 0.5 }} />
                              ) : feedback.sentiment === 'negative' ? (
                                <SentimentDissatisfiedIcon fontSize="small" sx={{ mr: 0.5 }} />
                              ) : (
                                <SentimentNeutralIcon fontSize="small" sx={{ mr: 0.5 }} />
                              )}
                              {feedback.sentiment.charAt(0).toUpperCase() + feedback.sentiment.slice(1)}
                            </Box>
                          </TableCell>
                          <TableCell>{new Date(feedback.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={0.5}>
                              <PeopleIcon fontSize="small" color="action" />
                              <Typography variant="body2">{feedback.votes}</Typography>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default ReportsPage;
