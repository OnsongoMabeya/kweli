import { Box, Text, Link, Flex, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const bg = useColorModeValue('gray.50', 'gray.900');
  const color = useColorModeValue('gray.700', 'gray.200');

  return (
    <Box as="footer" bg={bg} color={color} py={6} mt={8}>
      <Box maxW="container.xl" mx="auto" px={4}>
        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
          <Text mb={{ base: 4, md: 0 }}>
            © {new Date().getFullYear()} Kweli. All rights reserved.
          </Text>
          <Flex gap={6}>
            <Link as={RouterLink} to="/privacy" color="brand.500">
              Privacy Policy
            </Link>
            <Link as={RouterLink} to="/terms" color="brand.500">
              Terms of Service
            </Link>
            <Link as={RouterLink} to="/contact" color="brand.500">
              Contact
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer;
