import { Button, type ButtonProps, useBreakpointValue } from '@chakra-ui/react';
import type { ReactNode } from 'react';

export interface ResponsiveButtonProps extends ButtonProps {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | Record<string, string>;
  variant?: 'solid' | 'outline' | 'ghost' | 'link' | Record<string, string>;
  leftIcon?: ReactNode | Record<string, ReactNode>;
  rightIcon?: ReactNode | Record<string, ReactNode>;
  fullWidth?: boolean | Record<string, boolean>;
  loadingText?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const ResponsiveButton = ({
  children,
  size = 'md',
  variant = 'solid',
  leftIcon,
  rightIcon,
  fullWidth = false,
  loadingText,
  isLoading = false,
  isDisabled = false,
  type = 'button',
  onClick,
  ...props
}: ResponsiveButtonProps) => {
  // Handle responsive size
  const responsiveSize = useBreakpointValue(
    typeof size === 'string' ? { base: size } : size,
    { fallback: 'md' }
  );

  // Handle responsive variant
  const responsiveVariant = useBreakpointValue(
    typeof variant === 'string' ? { base: variant } : variant,
    { fallback: 'solid' }
  );

  // Handle responsive left icon
  const responsiveLeftIcon = useBreakpointValue(
    leftIcon && typeof leftIcon === 'object' && !('type' in leftIcon)
      ? leftIcon
      : { base: leftIcon },
    { fallback: undefined }
  );

  // Handle responsive right icon
  const responsiveRightIcon = useBreakpointValue(
    rightIcon && typeof rightIcon === 'object' && !('type' in rightIcon)
      ? rightIcon
      : { base: rightIcon },
    { fallback: undefined }
  );

  // Handle responsive full width
  const responsiveFullWidth = useBreakpointValue(
    typeof fullWidth === 'boolean' 
      ? { base: fullWidth } 
      : fullWidth,
    { fallback: false }
  );

  return (
    <Button
      size={responsiveSize}
      variant={responsiveVariant}
      leftIcon={responsiveLeftIcon as any}
      rightIcon={responsiveRightIcon as any}
      width={responsiveFullWidth ? '100%' : 'auto'}
      loadingText={loadingText}
      isLoading={isLoading}
      isDisabled={isDisabled}
      type={type}
      onClick={onClick}
      _hover={{
        transform: 'translateY(-1px)',
        boxShadow: 'md',
      }}
      _active={{
        transform: 'translateY(0)',
        boxShadow: 'sm',
      }}
      transition="all 0.2s"
      {...props}
    >
      {children}
    </Button>
  );
};

export default ResponsiveButton;
