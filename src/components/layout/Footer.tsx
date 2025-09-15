import { 
  Box, 
  Text, 
  Link, 
  Flex, 
  useColorModeValue, 
  Container,
  Stack,
  useBreakpointValue
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.700', 'gray.200');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const isMobile = useBreakpointValue({ base: true, md: false });

  const footerLinks = [
    { path: '/privacy', label: 'Privacy Policy' },
    { path: '/terms', label: 'Terms of Service' },
    { path: '/contact', label: 'Contact' },
    { path: '/about', label: 'About Us' },
    { path: '/faq', label: 'FAQ' },
  ];

  return (
    <Box 
      as="footer" 
      bg={bg} 
      color={color} 
      borderTop="1px"
      borderColor={borderColor}
      py={{ base: 6, md: 8 }}
      mt="auto"
      w="100%"
    >
      <Container 
        maxW={{ base: '100%', xl: '1440px' }}
        px={{ base: 4, md: 6, lg: 8 }}
      >
        <Flex 
          direction={{ base: 'column', md: 'row' }} 
          justify="space-between" 
          align={{ base: 'flex-start', md: 'center' }}
          gap={4}
        >
          <Text 
            fontSize={{ base: 'sm', md: 'md' }}
            mb={{ base: 2, md: 0 }}
          >
            © {new Date().getFullYear()} Kweli. All rights reserved.
          </Text>
          
          <Stack 
            direction={{ base: 'column', sm: 'row' }}
            spacing={{ base: 2, sm: 4, md: 6 }}
            wrap="wrap"
            align={{ base: 'flex-start', sm: 'center' }}
          >
            {footerLinks.map((link) => (
              <Link 
                key={link.path}
                as={RouterLink} 
                to={link.path} 
                color="brand.500"
                fontSize={{ base: 'sm', md: 'md' }}
                _hover={{ 
                  textDecoration: 'none',
                  color: 'brand.600',
                }}
                whiteSpace="nowrap"
              >
                {link.label}
              </Link>
            ))}
          </Stack>
          
          {!isMobile && (
            <Text 
              fontSize={{ base: 'xs', md: 'sm' }}
              color={useColorModeValue('gray.500', 'gray.400')}
              mt={{ base: 2, md: 0 }}
            >
              v1.0.0
            </Text>
          )}
        </Flex>
        
        {isMobile && (
          <Text 
            fontSize="xs"
            color={useColorModeValue('gray.500', 'gray.400')}
            mt={4}
          >
            v1.0.0
          </Text>
        )}
      </Container>
    </Box>
  );
};

export default Footer;
