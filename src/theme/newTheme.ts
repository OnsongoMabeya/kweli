import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { mode, type StyleFunctionProps } from '@chakra-ui/theme-tools';

// 1. Theme configuration
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
  disableTransitionOnChange: false,
};

// 2. Color palette
const colors = {
  brand: {
    50: '#f9f0ff',
    100: '#f0d9ff',
    200: '#e0b3ff',
    300: '#c980ff',
    400: '#b24dff',
    500: '#9D20BD', // Primary brand color
    600: '#8a1aa7',
    700: '#771391',
    800: '#630d7a',
    900: '#500864',
  },
};

// 3. Semantic tokens
const semanticTokens = {
  colors: {
    'chakra-body-text': { _light: 'gray.800', _dark: 'whiteAlpha.900' },
    'chakra-body-bg': { _light: 'white', _dark: 'gray.900' },
    'chakra-border-color': { _light: 'gray.200', _dark: 'whiteAlpha.300' },
    'chakra-subtle-bg': { _light: 'gray.50', _dark: 'gray.800' },
    'chakra-placeholder-color': { _light: 'gray.500', _dark: 'whiteAlpha.400' },
  },
};

// 4. Typography
const fonts = {
  heading: `'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
  body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
  mono: `'Fira Code', 'SFMono-Regular', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
};

// 5. Global styles
const styles = {
  global: (props: StyleFunctionProps) => ({
    'html, body': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      scrollBehavior: 'smooth',
      bg: mode('white', 'gray.900')(props),
      color: mode('gray.800', 'whiteAlpha.900')(props),
    },
    '*, *::before, *::after': {
      boxSizing: 'inherit',
    },
    '::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '::-webkit-scrollbar-track': {
      bg: 'transparent',
    },
    '::-webkit-scrollbar-thumb': {
      bg: mode('gray.300', 'gray.600')(props),
      borderRadius: '4px',
      '&:hover': {
        bg: mode('gray.400', 'gray.500')(props),
      },
    },
    '::selection': {
      bg: 'brand.500',
      color: 'white',
    },
  }),
};

// 6. Component styles
const components = {
  Button: {
    baseStyle: {
      fontWeight: 'semibold',
      borderRadius: 'xl',
      transition: 'all 0.2s ease-in-out',
      _hover: {
        transform: 'translateY(-1px)',
        _disabled: {
          transform: 'none',
        },
      },
      _active: {
        transform: 'translateY(0)',
      },
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
      }),
      outline: () => ({
        border: '2px solid',
        borderColor: 'brand.500',
        color: 'brand.500',
        _hover: {
          bg: 'brand.50',
        },
      }),
      ghost: () => ({
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
  Link: {
    baseStyle: {
      color: 'brand.500',
      _hover: {
        textDecoration: 'none',
        color: 'brand.600',
      },
    },
  },
};

// 7. Breakpoints
const breakpoints = {
  sm: '30em', // 480px
  md: '48em', // 768px
  lg: '62em', // 992px
  xl: '80em', // 1280px
  '2xl': '96em', // 1536px
};

// 8. Create and export the theme
const theme = extendTheme({
  config,
  colors,
  semanticTokens,
  fonts,
  styles,
  components,
  breakpoints,
  shadows: {
    outline: '0 0 0 3px rgba(157, 32, 189, 0.6)',
  },
});

export default theme;
