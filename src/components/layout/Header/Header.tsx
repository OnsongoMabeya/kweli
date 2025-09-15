import { Box, Flex, Heading, Button, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');

  return (
    <Box as="header" bg={bg} color={color} boxShadow="sm" position="sticky" top={0} zIndex={10}>
      <Box maxW="container.xl" mx="auto" px={4} py={3}>
        <Flex justify="space-between" align="center">
          <Heading as={RouterLink} to="/" size="lg" fontWeight="bold" color="brand.500">
            Kweli
          </Heading>
          <Flex align="center" gap={4}>
            <Button as={RouterLink} to="/" variant="ghost">
              Home
            </Button>
            <Button as={RouterLink} to="/feedback" variant="ghost">
              Feedback
            </Button>
            <Button as={RouterLink} to="/reports" variant="ghost">
              Reports
            </Button>
            <Button onClick={toggleColorMode} variant="ghost">
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
