import { Box, BoxProps, useBreakpointValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface PageContainerProps extends BoxProps {
  children: ReactNode;
  maxW?: string | Record<string, string>;
  paddingX?: string | number | Record<string, string | number>;
  paddingY?: string | number | Record<string, string | number>;
  isFullWidth?: boolean;
}

const PageContainer = ({
  children,
  maxW = 'container.xl',
  paddingX = { base: 4, sm: 6, md: 8, lg: 10 },
  paddingY = { base: 4, md: 6, lg: 8 },
  isFullWidth = false,
  ...props
}: PageContainerProps) => {
  // Handle responsive max width
  const responsiveMaxW = useBreakpointValue(
    typeof maxW === 'string' ? { base: maxW } : maxW,
    { fallback: 'container.xl' }
  );

  // Handle responsive padding
  const responsivePaddingX = useBreakpointValue(
    typeof paddingX === 'string' || typeof paddingX === 'number'
      ? { base: paddingX }
      : paddingX,
    { fallback: 4 }
  );

  const responsivePaddingY = useBreakpointValue(
    typeof paddingY === 'string' || typeof paddingY === 'number'
      ? { base: paddingY }
      : paddingY,
    { fallback: 4 }
  );

  return (
    <Box
      width="100%"
      maxW={isFullWidth ? '100%' : responsiveMaxW}
      mx="auto"
      px={responsivePaddingX}
      py={responsivePaddingY}
      {...props}
    >
      {children}
    </Box>
  );
};

export default PageContainer;
