import { Box, Container, useBreakpointValue } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import '../../styles/global.css';

interface LayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
}

export function Layout({ children, fullWidth = false }: LayoutProps) {
  const padding = useBreakpointValue({
    base: 4,
    md: 6,
    lg: 8
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      width="100vw"
      maxWidth="100%"
      overflowX="hidden"
      position="relative"
    >
      <Header />
      <Box
        as="main"
        flex={1}
        py={padding}
        width="100%"
      >
        {fullWidth ? (
          <>{children}</>
        ) : (
          <Container maxW="container.xl" px={{ base: 4, md: 6, lg: 8 }}>
            {children}
          </Container>
        )}
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;
