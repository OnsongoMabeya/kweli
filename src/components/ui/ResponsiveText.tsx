import { Text, type TextProps, useBreakpointValue } from '@chakra-ui/react';
import type { ReactNode } from 'react';

type ResponsiveTextProps = Omit<TextProps, 'fontSize' | 'fontWeight' | 'lineHeight' | 'letterSpacing' | 'textAlign' | 'maxW'> & {
  children: ReactNode;
  size?: string | number | (string | number)[] | { [key: string]: string | number };
  weight?: string | number | (string | number)[] | { [key: string]: string | number };
  lineHeight?: string | number | (string | number)[] | { [key: string]: string | number };
  letterSpacing?: string | number | (string | number)[] | { [key: string]: string | number };
  textAlign?: 'left' | 'center' | 'right' | 'justify' | (string & {}) | (string | null | (string | null)[])[] | { [key: string]: string | number };
  maxW?: string | number | (string | number)[] | { [key: string]: string | number };
};

const useResponsiveProp = <T extends string | number | undefined>(
  value: T | T[] | { [key: string]: T } | undefined,
  defaultValue: T
): T => {
  const responsiveValue = useBreakpointValue(
    value && typeof value === 'object' && !Array.isArray(value)
      ? value as Record<string, T>
      : { base: value as T },
    { fallback: 'base' }
  );

  return responsiveValue ?? defaultValue;
};

const ResponsiveText = ({
  children,
  size = 'md',
  weight = 'normal',
  lineHeight = 'normal',
  letterSpacing = 'normal',
  textAlign = 'left',
  maxW,
  ...props
}: ResponsiveTextProps) => {
  const responsiveSize = useResponsiveProp(size, 'md');
  const responsiveWeight = useResponsiveProp(weight, 'normal');
  const responsiveLineHeight = useResponsiveProp(lineHeight, 'normal');
  const responsiveLetterSpacing = useResponsiveProp(letterSpacing, 'normal');
  const responsiveTextAlign = useResponsiveProp(textAlign as string, 'left');
  const responsiveMaxW = useResponsiveProp(maxW as string | number | undefined, undefined);

  return (
    <Text
      fontSize={responsiveSize}
      fontWeight={responsiveWeight}
      lineHeight={responsiveLineHeight}
      letterSpacing={responsiveLetterSpacing}
      textAlign={responsiveTextAlign as TextProps['textAlign']}
      maxW={responsiveMaxW}
      {...props}
    >
      {children}
    </Text>
  );
};

export default ResponsiveText;
