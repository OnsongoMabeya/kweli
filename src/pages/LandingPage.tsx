import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Card, 
  CardContent,
  Paper
} from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { fetchFeedbacks } from '../api/feedbackService';
import type { Feedback } from '../types/feedback';
import KenyaMap from '../components/map/KenyaMap';
import { getFeedbackStats, aggregateFeedbackByCounty } from '../utils/feedbackAggregator';

const HeroSection = styled(Box)(({ theme }: { theme: Theme }) => ({
  background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
  color: 'white',
  padding: theme.spacing(8, 0),
  marginBottom: theme.spacing(6),
  textAlign: 'center',
}));

const StatsCard = styled(Card)(({ theme }: { theme: Theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const LandingPage: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<{
    total: number;
    byCounty: Record<string, number>;
    byDepartment: Record<string, number>;
    byStatus: Record<string, number>;
    lastUpdated: string;
  }>({
    total: 0,
    byCounty: {},
    byDepartment: {},
    byStatus: {},
    lastUpdated: '',
  });
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFeedbacks();
        setFeedbacks(data);
        setStats(getFeedbackStats(data));
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading feedback data:', error);
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  const countyData = aggregateFeedbackByCounty(feedbacks);
  
  const handleCountyClick = (county: string) => {
    setSelectedCounty(county === selectedCounty ? null : county);
  };
  
  const handleSubmitFeedback = () => {
    navigate('/feedback');
  };
  
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <HeroSection>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            Kenya Citizen Feedback Platform
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            Your voice matters. Help improve government services by sharing your feedback.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleSubmitFeedback}
            sx={{ mt: 3, mb: 2 }}
          >
            Share Your Feedback
          </Button>
        </Container>
      </HeroSection>
      
      <Container maxWidth="lg" sx={{ flex: 1, mb: 6 }}>
        <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Feedback Overview
          </Typography>
          {isLoading ? (
            <Typography>Loading map data...</Typography>
          ) : (
            <KenyaMap 
              data={countyData} 
              onCountyClick={handleCountyClick}
              selectedCounty={selectedCounty}
            />
          )}
        </Paper>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4, mb: 6 }}>
          <Box>
            <StatsCard>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Feedback
                </Typography>
                <Typography variant="h3" component="div">
                  {stats.total}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  as of {new Date(stats.lastUpdated).toLocaleDateString()}
                </Typography>
              </CardContent>
            </StatsCard>
          </Box>
          <Box>
            <StatsCard>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Departments with Most Feedback
                </Typography>
                {Object.entries(stats.byDepartment)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 3)
                  .map(([dept, count]) => (
                    <Box key={dept} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>{dept}</Typography>
                      <Typography>{count as number}</Typography>
                    </Box>
                  ))}
              </CardContent>
            </StatsCard>
          </Box>
          <Box>
            <StatsCard>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Status Overview
                </Typography>
                {Object.entries(stats.byStatus).map(([status, count]) => (
                  <Box key={status} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>{status.charAt(0).toUpperCase() + status.slice(1)}</Typography>
                    <Typography>{count as number}</Typography>
                  </Box>
                ))}
              </CardContent>
            </StatsCard>
          </Box>
        </Box>
      </Container>
      
      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" gutterBottom>
            Kenya Citizen Feedback Platform
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Making government services better through your feedback
          </Typography>
          <Box mt={4} display="flex" justifyContent="center">
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={handleSubmitFeedback}
            >
              Share Your Feedback
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
