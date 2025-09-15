import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import type { CustomTheme } from './types';

// Theme configuration
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// Color palette
const colors = {
  brand: {
    50: '#e6f0ff',
    100: '#b3d1ff',
    200: '#80b3ff',
    300: '#4d94ff',
    400: '#1a75ff',
    500: '#0066ff',
    600: '#0052cc',
    700: '#003d99',
    800: '#002966',
    900: '#001433',
    primary: '#0066ff',
  },
};

// Fonts
const fonts = {
  heading: `'Inter', ${'system-ui, sans-serif'}`,
  body: `'Inter', ${'system-ui, sans-serif'}`,
};

// Global styles
const styles = {
  global: (props: { colorMode: 'light' | 'dark' }) => ({
    body: {
      bg: mode('white', 'gray.800')(props),
      color: mode('gray.800', 'whiteAlpha.900')(props),
    },
  }),
};

// Component styles
const components = {
  Button: {
    baseStyle: {
      fontWeight: 'medium',
      borderRadius: 'md',
    },
    variants: {
      solid: () => ({
        bg: 'brand.500',
        color: 'white',
        _hover: {
          bg: 'brand.600',
          _disabled: {
            bg: 'brand.500',
          },
        },
        _active: { bg: 'brand.700' },
      }),
      outline: () => ({
        borderColor: 'brand.500',
        color: 'brand.500',
        _hover: {
          bg: 'brand.50',
        },
      }),
    },
    defaultProps: {
      variant: 'solid',
    },
  },
};

const theme = extendTheme({
  config,
  colors,
  fonts,
  styles,
  components,
}) as CustomTheme;

export default theme;
