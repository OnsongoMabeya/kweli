import { useBreakpointValue } from '@chakra-ui/react';

export const useResponsive = () => {
  // Common responsive values
  const isMobile = useBreakpointValue({ base: true, md: false });
  const isTablet = useBreakpointValue({ base: false, md: true, lg: false });
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  
  // Responsive spacing
  const spacing = useBreakpointValue({
    base: 4,    // Mobile
    md: 6,      // Tablet
    lg: 8,      // Desktop
    xl: 10,     // Large desktop
    '2xl': 12,  // Extra large screens
  });
  
  // Responsive font sizes
  const fontSize = {
    xs: useBreakpointValue({ base: '0.75rem', sm: '0.75rem' }),      // 12px
    sm: useBreakpointValue({ base: '0.875rem', sm: '0.875rem' }),    // 14px
    md: useBreakpointValue({ base: '1rem', sm: '1rem' }),            // 16px
    lg: useBreakpointValue({ base: '1.125rem', sm: '1.25rem' }),     // 18-20px
    xl: useBreakpointValue({ base: '1.25rem', md: '1.5rem' }),       // 20-24px
    '2xl': useBreakpointValue({ base: '1.5rem', md: '1.875rem' }),   // 24-30px
    '3xl': useBreakpointValue({ base: '1.875rem', md: '2.25rem' }),  // 30-36px
    '4xl': useBreakpointValue({ base: '2.25rem', md: '3rem' }),      // 36-48px
  };
  
  // Responsive padding and margin
  const padding = {
    xs: useBreakpointValue({ base: 1, sm: 1.5 }),
    sm: useBreakpointValue({ base: 2, sm: 3 }),
    md: useBreakpointValue({ base: 3, sm: 4, md: 5 }),
    lg: useBreakpointValue({ base: 4, sm: 5, md: 6 }),
    xl: useBreakpointValue({ base: 5, sm: 6, md: 8 }),
  };
  
  // Responsive border radius
  const radius = {
    sm: useBreakpointValue({ base: 'sm', md: 'md' }),
    md: useBreakpointValue({ base: 'md', lg: 'lg' }),
    lg: useBreakpointValue({ base: 'lg', xl: 'xl' }),
  };
  
  // Responsive container widths
  const containerWidths = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1440px',
  };
  
  // Responsive grid columns
  const grid = {
    columns: (count: number) => 
      useBreakpointValue({
        base: Math.min(1, count),
        sm: Math.min(2, count),
        md: Math.min(3, count),
        lg: Math.min(4, count),
        xl: count,
      }) || count,
  };
  
  return {
    // Device types
    isMobile,
    isTablet,
    isDesktop,
    
    // Responsive values
    spacing,
    fontSize,
    padding,
    radius,
    grid,
    containerWidths,
    
    // Helper functions
    responsive: (values: any) => {
      if (!values) return undefined;
      if (typeof values === 'object' && !Array.isArray(values)) {
        return useBreakpointValue(values);
      }
      return useBreakpointValue(Array.isArray(values) ? values : [values]);
    },
  };
};

export default useResponsive;
