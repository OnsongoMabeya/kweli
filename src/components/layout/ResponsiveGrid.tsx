import { SimpleGrid, type SimpleGridProps, useBreakpointValue } from '@chakra-ui/react';
import type { ReactNode } from 'react';

export interface ResponsiveGridProps extends Omit<SimpleGridProps, 'columns'> {
  children: ReactNode;
  minChildWidth?: string | number | Record<string, string | number>;
  columns?: number | Record<string, number>;
  spacing?: string | number | Record<string, string | number>;
}

const ResponsiveGrid = ({
  children,
  minChildWidth,
  columns = 1,
  spacing = 4,
  ...props
}: ResponsiveGridProps) => {
  // Handle responsive columns
  const responsiveColumns = useBreakpointValue(
    typeof columns === 'number' 
      ? { base: Math.min(1, columns), sm: Math.min(2, columns), md: columns } 
      : columns,
    { fallback: 'md' }
  );

  // Handle responsive minChildWidth
  const responsiveMinChildWidth = useBreakpointValue(
    minChildWidth && typeof minChildWidth === 'object' 
      ? minChildWidth 
      : { base: minChildWidth },
    { fallback: 'md' }
  );

  // Handle responsive spacing
  const responsiveSpacing = useBreakpointValue(
    typeof spacing === 'object' 
      ? spacing 
      : { base: spacing },
    { fallback: 'md' }
  );

  return (
    <SimpleGrid
      columns={responsiveColumns}
      minChildWidth={responsiveMinChildWidth}
      spacing={responsiveSpacing}
      w="100%"
      {...props}
    >
      {children}
    </SimpleGrid>
  );
};

export default ResponsiveGrid;
