import { 
  Box, 
  Flex, 
  Heading, 
  Button, 
  useColorMode, 
  useColorModeValue, 
  useBreakpointValue,
  IconButton,
  HStack
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/feedback', label: 'Feedback' },
  { path: '/reports', label: 'Reports' },
];

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Box 
      as="header" 
      bg={bg} 
      color={color} 
      boxShadow="sm" 
      position="sticky" 
      top={0} 
      zIndex={10}
      w="100%"
      borderBottom="1px"
      borderColor={borderColor}
    >
      <Box 
        maxW={{ base: '100%', xl: '1440px' }} 
        mx="auto" 
        px={{ base: 4, md: 6, lg: 8 }}
        py={{ base: 2, md: 3 }}
      >
        <Flex justify="space-between" align="center">
          <Heading 
            as={RouterLink} 
            to="/" 
            size={{ base: 'md', md: 'lg' }} 
            fontWeight="bold" 
            color="brand.500"
            _hover={{ textDecoration: 'none' }}
          >
            Kweli
          </Heading>

          {isMobile ? (
            <Flex align="center" gap={2}>
              <IconButton
                aria-label="Toggle color mode"
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="ghost"
                size="sm"
              />
              <IconButton
                aria-label="Toggle menu"
                icon={isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
                onClick={toggleMenu}
                variant="ghost"
                size="sm"
              />
            </Flex>
          ) : (
            <HStack spacing={{ base: 2, md: 4 }} align="center">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  as={RouterLink}
                  to={item.path}
                  variant="ghost"
                  size={{ base: 'sm', md: 'md' }}
                  isActive={location.pathname === item.path}
                  _activeLink={{
                    color: 'brand.500',
                    fontWeight: 'semibold',
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <IconButton
                aria-label="Toggle color mode"
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="ghost"
                size={{ base: 'sm', md: 'md' }}
              />
            </HStack>
          )}
        </Flex>

        {/* Mobile menu */}
        {isMobile && isMenuOpen && (
          <Box 
            mt={2} 
            py={2}
            borderTop="1px"
            borderColor={borderColor}
          >
            {navItems.map((item) => (
              <Button
                key={item.path}
                as={RouterLink}
                to={item.path}
                variant="ghost"
                size="sm"
                width="100%"
                justifyContent="flex-start"
                borderRadius="none"
                isActive={location.pathname === item.path}
                _activeLink={{
                  bg: 'brand.50',
                  color: 'brand.500',
                  fontWeight: 'semibold',
                }}
                _hover={{
                  bg: 'gray.100',
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Header;
