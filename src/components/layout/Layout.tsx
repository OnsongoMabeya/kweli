import { Box, Flex, Container } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { Header, Footer } from './';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box as="main" flex={1} py={8}>
        <Container maxW="container.xl">
          {children}
        </Container>
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
