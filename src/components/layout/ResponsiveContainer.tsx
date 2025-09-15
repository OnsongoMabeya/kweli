import { Box, useBreakpointValue } from '@chakra-ui/react';
import type { BoxProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface ResponsiveContainerProps extends BoxProps {
  children: ReactNode;
  fullWidth?: boolean;
  contentWidth?: string | number;
}

const ResponsiveContainer = ({
  children,
  fullWidth = false,
  contentWidth = '1440px',
  ...rest
}: ResponsiveContainerProps) => {
  // Responsive padding values
  const paddingX = useBreakpointValue({
    base: 4,
    sm: 5,
    md: 6,
    lg: 8,
    xl: 12,
  });

  return (
    <Box
      w="100%"
      maxW={fullWidth ? '100%' : contentWidth}
      mx="auto"
      px={paddingX}
      position="relative"
      {...rest}
    >
      {children}
    </Box>
  );
};

export default ResponsiveContainer;
