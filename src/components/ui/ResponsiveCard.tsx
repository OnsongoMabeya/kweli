import { Card, CardBody, CardProps, useBreakpointValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface ResponsiveCardProps extends CardProps {
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
  );

  // Handle hoverable state
  const hoverable = useBreakpointValue(
    typeof isHoverable === 'boolean' 
      ? { base: isHoverable } 
      : isHoverable,
    { fallback: false }
  );

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
    <Card
      variant={responsiveVariant}
      size={responsiveSize}
      width="100%"
      height="100%"
      position="relative"
      overflow="hidden"
      transition="all 0.2s ease-in-out"
      _hover={hoverable ? {
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
        cursor: isPressable ? 'pointer' : 'default',
      } : {}}
      _active={isPressable ? {
        transform: 'translateY(0)',
        boxShadow: 'md',
      } : {}}
      onClick={isPressable ? onPress : undefined}
      {...props}
    >
      <CardBody p={getPadding()}>
        {children}
      </CardBody>
    </Card>
  );
};

export default ResponsiveCard;
