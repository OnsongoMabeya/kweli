import { 
  Flex, 
  Box, 
  IconButton, 
  useBreakpointValue, 
  useDisclosure, 
  Stack, 
  Link as ChakraLink,
  useColorModeValue
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import type { ReactNode } from 'react';

interface NavItem {
  label: string;
  path: string;
  icon?: ReactNode;
}

interface ResponsiveNavProps {
  items: NavItem[];
  logo: ReactNode;
  rightContent?: ReactNode;
  isSticky?: boolean;
  bg?: string;
  color?: string;
}

const ResponsiveNav = ({
  items,
  logo,
  rightContent,
  isSticky = true,
  bg,
  color,
}: ResponsiveNavProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  // Close mobile menu when route changes
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  // Default colors based on color mode
  const defaultBg = useColorModeValue('white', 'gray.800');
  const defaultColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const activeBg = useColorModeValue('gray.100', 'gray.600');

  return (
    <Box
      as="nav"
      bg={bg || defaultBg}
      color={color || defaultColor}
      borderBottom="1px"
      borderColor={borderColor}
      position={isSticky ? 'sticky' : 'relative'}
      top={0}
      zIndex={10}
      width="100%"
    >
      <Flex
        maxW="container.xl"
        mx="auto"
        px={{ base: 4, md: 6, lg: 8 }}
        py={3}
        align="center"
        justify="space-between"
      >
        {/* Logo */}
        <Flex align="center" flexShrink={0}>
          {logo}
        </Flex>

        {/* Desktop Navigation */}
        <Box display={{ base: 'none', md: 'block' }} flex={1} mx={6}>
          <Stack direction="row" spacing={4} align="center">
            {items.map((item) => (
              <ChakraLink
                key={item.path}
                as={RouterLink}
                to={item.path}
                px={3}
                py={2}
                rounded="md"
                fontWeight={location.pathname === item.path ? 'semibold' : 'normal'}
                color={location.pathname === item.path ? 'brand.500' : 'inherit'}
                _hover={{
                  textDecoration: 'none',
                  bg: hoverBg,
                }}
                _active={{
                  bg: activeBg,
                }}
                display="flex"
                alignItems="center"
                gap={2}
              >
                {item.icon}
                {item.label}
              </ChakraLink>
            ))}
          </Stack>
        </Box>

        {/* Right content (e.g., user menu, theme toggle) */}
        <Flex align="center">
          {rightContent}
          
          {/* Mobile menu button */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            ml={2}
            onClick={isOpen ? onClose : onOpen}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>
      </Flex>

      {/* Mobile Navigation */}
      {isMobile && isOpen && (
        <Box pb={4} display={{ md: 'none' }} px={4}>
          <Stack as="nav" spacing={1}>
            {items.map((item) => (
              <ChakraLink
                key={item.path}
                as={RouterLink}
                to={item.path}
                px={3}
                py={2}
                rounded="md"
                fontWeight={location.pathname === item.path ? 'semibold' : 'normal'}
                color={location.pathname === item.path ? 'brand.500' : 'inherit'}
                _hover={{
                  textDecoration: 'none',
                  bg: hoverBg,
                }}
                _active={{
                  bg: activeBg,
                }}
                display="flex"
                alignItems="center"
                gap={2}
              >
                {item.icon}
                {item.label}
              </ChakraLink>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default ResponsiveNav;
