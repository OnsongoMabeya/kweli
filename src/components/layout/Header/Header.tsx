import { Box, Flex, Heading, Button, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Box 
      as="header" 
      position="sticky" 
      top={0} 
      zIndex={10} 
      bg={bg}
      color={color}
      borderBottomWidth="1px"
      borderColor={borderColor}
      boxShadow="sm"
    >
      <Flex 
        as="nav" 
        maxW="container.xl" 
        mx="auto" 
        px={{ base: 4, md: 6, lg: 8 }}
        py={4}
        justify="space-between"
        align="center"
      >
        <Heading 
          as={RouterLink} 
          to="/" 
          size="lg" 
          fontWeight="bold"
          bgGradient="linear(to-r, #9D20BD, #BD22A2)"
          bgClip="text"
          _hover={{
            textDecoration: 'none',
            bgGradient: 'linear(to-r, #BD22A2, #9D20BD)',
          }}
        >
          Kweli
        </Heading>
        
        <Flex gap={{ base: 2, md: 4 }} align="center">
          <Button 
            as={RouterLink} 
            to="/" 
            variant={isActive('/') ? 'solid' : 'ghost'}
            colorScheme="purple"
          >
            Home
          </Button>
          <Button 
            as={RouterLink} 
            to="/feedback" 
            variant={isActive('/feedback') ? 'solid' : 'ghost'}
            colorScheme="purple"
          >
            Feedback
          </Button>
          <Button 
            as={RouterLink} 
            to="/reports" 
            variant={isActive('/reports') ? 'solid' : 'ghost'}
            colorScheme="purple"
          >
            Reports
          </Button>
          <IconButton 
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            colorScheme="purple"
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
