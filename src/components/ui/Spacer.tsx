import { Box } from '@chakra-ui/react';
import type { BoxProps } from '@chakra-ui/react';

export interface SpacerProps extends BoxProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | number;
  horizontal?: boolean;
}

const Spacer = ({ 
  size = 'md', 
  horizontal = false, 
  ...props 
}: SpacerProps) => {
  const sizeMap = {
    xs: 1,      // 4px
    sm: 2,       // 8px
    md: 4,       // 16px
    lg: 6,       // 24px
    xl: 8,       // 32px
    '2xl': 10,   // 40px
    '3xl': 12,   // 48px
    '4xl': 16,   // 64px
  };

  const spacingValue = typeof size === 'string' ? sizeMap[size] * 4 : size;
  
  return (
    <Box
      {...(horizontal 
        ? { width: `${spacingValue}px`, height: 'auto', display: 'inline-block' } 
        : { height: `${spacingValue}px`, width: '100%' }
      )}
      flexShrink={0}
      {...props}
    />
  );
};

export default Spacer;
