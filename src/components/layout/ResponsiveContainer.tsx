import { Box, useTheme, useMediaQuery } from '@mui/material';
import type { BoxProps } from '@mui/material';
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
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.only('lg'));
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));

  // Get appropriate padding based on breakpoint
  const getPaddingX = () => {
    if (isXs) return theme.spacing(2);
    if (isSm) return theme.spacing(3);
    if (isMd) return theme.spacing(4);
    if (isLg) return theme.spacing(5);
    if (isXl) return theme.spacing(6);
    return theme.spacing(4); // default
  };

  return (
    <Box
      width="100%"
      maxWidth={fullWidth ? '100%' : contentWidth}
      marginX="auto"
      paddingX={getPaddingX()}
      position="relative"
      {...rest}
    >
      {children}
    </Box>
  );
};

export default ResponsiveContainer;
