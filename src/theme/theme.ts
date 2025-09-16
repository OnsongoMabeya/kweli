import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import type { CustomTheme } from './types';

// Theme configuration
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// Color palette with the new scheme
const colors = {
  brand: {
    50: '#f5e5f9',
    100: '#e5b8f0',
    200: '#d68ae7',
    300: '#c65dde',
    400: '#b62fd5',
    500: '#9D20BD', // Primary brand color
    600: '#7d1a97',
    700: '#5e1371',
    800: '#3e0d4b',
    900: '#1f0625',
    primary: '#9D20BD',
    secondary: '#BD22A2',
    accent: '#22BDB8',
  },
  gradient: {
    primary: 'linear-gradient(135deg, #9D20BD 0%, #BD22A2 100%)',
    secondary: 'linear-gradient(135deg, #BD22A2 0%, #22BDB8 100%)',
    accent: 'linear-gradient(135deg, #22BDB8 0%, #9D20BD 100%)',
  },
};

// Fonts
const fonts = {
  heading: `'Poppins', sans-serif`,
  body: `'Inter', sans-serif`,
};

// Global styles
const styles = {
  global: (props: { colorMode: 'light' | 'dark' }) => ({
    'html, body': {
      scrollBehavior: 'smooth',
      bg: mode('gray.50', 'gray.900')(props),
      color: mode('gray.800', 'whiteAlpha.900')(props),
      minH: '100vh',
    },
    '::selection': {
      bg: 'brand.primary',
      color: 'white',
    },
    '::-webkit-scrollbar': {
      width: '10px',
      height: '10px',
    },
    '::-webkit-scrollbar-track': {
      bg: mode('gray.100', 'gray.800')(props),
    },
    '::-webkit-scrollbar-thumb': {
      bg: 'brand.primary',
      borderRadius: 'full',
      '&:hover': {
        bg: 'brand.secondary',
      },
    },
  }),
};

// Component styles
const components = {
  Button: {
    baseStyle: {
      fontWeight: 'semibold',
      borderRadius: 'xl',
      transition: 'all 0.3s ease-in-out',
      _hover: {
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
      },
      _active: {
        transform: 'translateY(0)',
      },
    },
    variants: {
      solid: () => ({
        bg: 'brand.primary',
        color: 'white',
        _hover: {
          bg: 'brand.600',
          _disabled: {
            bg: 'brand.500',
          },
        },
        _active: { bg: 'brand.700' },
      }),
      gradient: () => ({
        bg: 'brand.gradient.primary',
        color: 'white',
        _hover: {
          bg: 'brand.gradient.secondary',
          _disabled: {
            bg: 'brand.gradient.primary',
          },
        },
        _active: { bg: 'brand.gradient.accent' },
      }),
      outline: () => ({
        border: '2px solid',
        borderColor: 'brand.primary',
        color: 'brand.primary',
        _hover: {
          bg: 'whiteAlpha.200',
          color: 'white',
          borderColor: 'white',
        },
      }),
      ghost: () => ({
        color: 'brand.primary',
        _hover: {
          bg: 'whiteAlpha.200',
          color: 'white',
        },
      }),
    },
    defaultProps: {
      variant: 'gradient',
    },
  },
  Card: {
    baseStyle: {
      container: {
        borderRadius: 'xl',
        boxShadow: 'xl',
        transition: 'all 0.3s ease-in-out',
        _hover: {
          transform: 'translateY(-5px)',
          boxShadow: '2xl',
        },
      },
    },
    variants: {
      elevated: {
        bg: 'white',
        border: '1px solid',
        borderColor: 'gray.100',
      },
      gradient: {
        bg: 'linear-gradient(145deg, white 0%, #f9f5ff 100%)',
        border: '1px solid',
        borderColor: 'purple.50',
      },
    },
  },
  Heading: {
    baseStyle: {
      fontWeight: 'bold',
      letterSpacing: 'tighter',
      bgGradient: 'linear(to-r, brand.primary, brand.secondary)',
      bgClip: 'text',
    },
  },
  Link: {
    baseStyle: {
      color: 'brand.primary',
      _hover: {
        textDecoration: 'none',
        color: 'brand.secondary',
      },
    },
  },
};

const theme = extendTheme({
  config,
  colors,
  fonts,
  styles,
  components,
  shadows: {
    outline: '0 0 0 3px var(--chakra-colors-brand-500)',
  },
}) as CustomTheme;

export default theme;
