import { theme as baseTheme } from '@chakra-ui/react';

type ColorHue = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

type CustomColors = {
  brand: ColorHue & {
    primary: string;
  };
};

type CustomTheme = Omit<typeof baseTheme, 'colors'> & {
  colors: typeof baseTheme.colors & CustomColors;
};

// Extend the Chakra UI theme with our custom types
declare module '@chakra-ui/react' {
  // @ts-ignore - This is a known workaround for Chakra UI theme extension
  export interface Theme extends CustomTheme {}
}

export type { CustomTheme, CustomColors, ColorHue };
