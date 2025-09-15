import { Box, Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { Header, Footer } from './';
import ResponsiveContainer from './ResponsiveContainer';
import '../../styles/global.css';

interface LayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
}

const Layout = ({ children, fullWidth = false }: LayoutProps) => {
  return (
    <Flex 
      direction="column" 
      minH="100dvh"
      w="100vw"
      maxW="100%"
      overflowX="hidden"
      position="relative"
      className="safe-area"
    >
      <Header />
      <Box as="main" flex={1} py={{ base: 4, md: 6, lg: 8 }} w="100%">
        <ResponsiveContainer fullWidth={fullWidth}>
          {children}
        </ResponsiveContainer>
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
