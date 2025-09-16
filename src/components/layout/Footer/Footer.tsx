import { Box, Container, Text, Link as ChakraLink, Flex, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const currentYear = new Date().getFullYear();
  
  const linkStyle = {
    color: 'purple.500',
    _hover: {
      textDecoration: 'underline',
      color: 'purple.600',
    },
    mx: { base: 2, md: 3 },
  };

  return (
    <Box 
      as="footer"
      bg={useColorModeValue('white', 'gray.800')}
      color={useColorModeValue('gray.600', 'gray.300')}
      borderTopWidth="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      mt={8}
      py={6}
    >
      <Container maxW="container.xl" px={{ base: 4, md: 6, lg: 8 }}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          textAlign={{ base: 'center', md: 'left' }}
        >
          <Text fontSize="sm" mb={{ base: 4, md: 0 }}>
            © {currentYear} Kweli. All rights reserved.
          </Text>
          <Flex 
            direction={{ base: 'column', sm: 'row' }}
            align="center"
            gap={{ base: 2, md: 4 }}
          >
            <ChakraLink as={RouterLink} to="/privacy" sx={linkStyle}>
              Privacy Policy
            </ChakraLink>
            <ChakraLink as={RouterLink} to="/terms" sx={linkStyle}>
              Terms of Service
            </ChakraLink>
            <ChakraLink as={RouterLink} to="/contact" sx={linkStyle}>
              Contact Us
            </ChakraLink>
            <ChakraLink 
              href="https://github.com/yourusername/kweli" 
              isExternal
              sx={linkStyle}
              display="inline-flex"
              alignItems="center"
            >
              GitHub
            </ChakraLink>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
