import { Card, CardBody, type CardProps, useBreakpointValue, Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

export interface ResponsiveCardProps extends Omit<CardProps, 'size'> {
  children: ReactNode;
  variant?: 'elevated' | 'outline' | 'filled' | 'unstyled' | Record<string, string>;
  size?: 'sm' | 'md' | 'lg' | Record<string, string>;
  isHoverable?: boolean | Record<string, boolean>;
  isPressable?: boolean;
  onPress?: () => void;
}

const ResponsiveCard = ({
  children,
  variant = 'elevated',
  size = 'md',
  isHoverable = false,
  isPressable = false,
  onPress,
  ...props
}: ResponsiveCardProps) => {
  // Handle responsive variant
  const responsiveVariant = useBreakpointValue(
    typeof variant === 'string' ? { base: variant } : variant,
    { fallback: 'elevated' }
  );

  // Handle responsive size
  const responsiveSize = useBreakpointValue(
    typeof size === 'string' ? { base: size } : size,
    { fallback: 'md' }
  ) as string;

  // Handle hoverable state with proper type safety
  const hoverConfig = useBreakpointValue(
    typeof isHoverable === 'boolean' 
      ? { base: isHoverable ? 'true' : 'false' } 
      : Object.fromEntries(
          Object.entries(isHoverable || {}).map(([key, value]) => [
            key,
            value ? 'true' : 'false'
          ])
        ),
    { fallback: 'false' }
  );
  
  const shouldHover = hoverConfig === 'true';
  
  // Apply hover styles conditionally
  const hoverProps = shouldHover ? {
    _hover: {
      transform: 'translateY(-2px)',
      boxShadow: 'md',
      transition: 'all 0.2s'
    }
  } : {};

  // Size-based padding
  const getPadding = () => {
    switch (responsiveSize) {
      case 'sm':
        return { base: 3, md: 4 };
      case 'lg':
        return { base: 5, md: 6, lg: 8 };
      case 'md':
      default:
        return { base: 4, md: 5, lg: 6 };
    }
  };

  return (
    <Box position="relative" w="100%" h="100%">
      <Card
        variant={responsiveVariant}
        size={responsiveSize}
        w="100%"
        h="100%"
        position="relative"
        overflow="hidden"
        transition="all 0.2s ease-in-out"
        {...hoverProps}
        _active={isPressable ? {
          transform: 'translateY(0)',
          shadow: 'md'
        } : undefined}
        onClick={isPressable ? onPress : undefined}
        {...props}
      >
        <CardBody p={getPadding()}>
          {children}
        </CardBody>
      </Card>
    </Box>
  );
};

export default ResponsiveCard;
