import { Text, TextProps, useBreakpointValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface ResponsiveTextProps extends TextProps {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | Record<string, string>;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | Record<string, string>;
  lineHeight?: string | number | Record<string, string | number>;
  letterSpacing?: string | Record<string, string>;
  maxW?: string | Record<string, string>;
  textAlign?: 'left' | 'center' | 'right' | 'justify' | Record<string, string>;
}

const ResponsiveText = ({
  children,
  size = 'md',
  weight = 'normal',
  lineHeight = 'normal',
  letterSpacing = 'normal',
  textAlign = 'left',
  ...props
}: ResponsiveTextProps) => {
  // Handle responsive size
  const responsiveSize = useBreakpointValue(
    typeof size === 'string' 
      ? { base: size } 
      : size,
    { fallback: 'md' }
  );

  // Handle responsive weight
  const responsiveWeight = useBreakpointValue(
    typeof weight === 'string' 
      ? { base: weight } 
      : weight,
    { fallback: 'normal' }
  );

  // Handle responsive line height
  const responsiveLineHeight = useBreakpointValue(
    typeof lineHeight === 'string' || typeof lineHeight === 'number'
      ? { base: lineHeight }
      : lineHeight,
    { fallback: 'normal' }
  );

  // Handle responsive letter spacing
  const responsiveLetterSpacing = useBreakpointValue(
    typeof letterSpacing === 'string'
      ? { base: letterSpacing }
      : letterSpacing,
    { fallback: 'normal' }
  );

  // Handle responsive text alignment
  const responsiveTextAlign = useBreakpointValue(
    typeof textAlign === 'string'
      ? { base: textAlign }
      : textAlign,
    { fallback: 'left' }
  );

  return (
    <Text
      fontSize={responsiveSize}
      fontWeight={responsiveWeight}
      lineHeight={responsiveLineHeight}
      letterSpacing={responsiveLetterSpacing}
      textAlign={responsiveTextAlign}
      {...props}
    >
      {children}
    </Text>
  );
};

export default ResponsiveText;
