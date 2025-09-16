import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme/newTheme';

// Layout
import Layout from './components/layout/Layout';

// Pages
import { HomePage, FeedbackPage, NotFoundPage } from './pages';
import LandingPage from './pages/LandingPage';
import EnhancedReportsPage from './pages/EnhancedReportsPage';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  // Removed service worker registration for development
  // You can add it back for production builds if needed

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout><HomePage /></Layout>} />
              <Route path="/landing" element={<Layout><LandingPage /></Layout>} />
              <Route path="/feedback" element={<Layout><FeedbackPage /></Layout>} />
              <Route path="/reports" element={<Layout><EnhancedReportsPage /></Layout>} />
              <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
            </Routes>
          </Router>
        </HelmetProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
