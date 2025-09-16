import { Button, useBreakpointValue } from '@chakra-ui/react';
import type { ButtonProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';

type ResponsiveValue<T> = T | { [key: string]: T };

export interface ResponsiveButtonProps extends Omit<ButtonProps, 'size' | 'variant' | 'leftIcon' | 'rightIcon' | 'isFullWidth'> {
  children: ReactNode;
  size?: ResponsiveValue<ButtonProps['size']>;
  variant?: ResponsiveValue<ButtonProps['variant']>;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: ResponsiveValue<boolean>;
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
  // Get responsive values
  const responsiveSize = useBreakpointValue(
    typeof size === 'object' ? size : { base: size },
    { fallback: 'md' }
  ) as ButtonProps['size'];

  const responsiveVariant = useBreakpointValue(
    typeof variant === 'object' ? variant : { base: variant },
    { fallback: 'solid' }
  ) as ButtonProps['variant'];

  const responsiveFullWidth = useBreakpointValue(
    typeof fullWidth === 'object' 
      ? fullWidth 
      : { base: fullWidth },
    { fallback: undefined }
  ) as boolean | undefined;

  return (
    <Button
      size={responsiveSize}
      variant={responsiveVariant}
      leftIcon={leftIcon as any}
      rightIcon={rightIcon as any}
      isFullWidth={responsiveFullWidth}
      isLoading={isLoading}
      loadingText={loadingText}
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
