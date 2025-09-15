import { 
  FormControl, 
  FormLabel, 
  FormErrorMessage, 
  FormHelperText, 
  Input, 
  Textarea, 
  Select, 
  Checkbox, 
  Radio, 
  Switch, 
  Stack, 
  VStack, 
  HStack, 
  useBreakpointValue,
  type FormControlProps,
  type InputProps,
  type TextareaProps,
  type SelectProps,
  type CheckboxProps,
  type RadioProps,
  type SwitchProps,
  type StackDirection
} from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local';

export interface FormFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: FieldError;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  width?: string | Record<string, string>;
  direction?: StackDirection | Record<string, StackDirection>;
}

export interface TextFieldProps extends FormFieldProps, Omit<InputProps, 'size' | 'name'> {
  type?: InputType;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

export interface TextAreaFieldProps extends FormFieldProps, Omit<TextareaProps, 'size' | 'name'> {
  rows?: number;
}

export interface SelectFieldProps extends FormFieldProps, Omit<SelectProps, 'size' | 'name'> {
  options: { value: string; label: string }[];
  placeholder?: string;
}

export interface CheckboxFieldProps extends FormFieldProps, Omit<CheckboxProps, 'size' | 'name'> {
  text?: string;
}

export interface RadioFieldProps extends FormFieldProps, Omit<RadioProps, 'size' | 'name'> {
  options: { value: string; label: string }[];
  direction?: 'row' | 'column';
}

export interface SwitchFieldProps extends FormFieldProps, Omit<SwitchProps, 'size' | 'name'> {
  text?: string;
}

// Helper component to render form control with consistent styling
const FormFieldWrapper = ({
  children,
  name,
  label,
  helperText,
  error,
  isRequired = false,
  isDisabled = false,
  isReadOnly = false,
  size = 'md',
  width = '100%',
  direction = 'column',
  ...props
}: FormFieldProps & { children: ReactNode }) => {
  const responsiveSize = useBreakpointValue(
    typeof size === 'string' ? { base: size } : size,
    { fallback: 'md' }
  );

  const responsiveWidth = useBreakpointValue(
    typeof width === 'string' ? { base: width } : width,
    { fallback: '100%' }
  );

  const responsiveDirection = useBreakpointValue(
    typeof direction === 'string' ? { base: direction } : direction,
    { fallback: 'column' }
  );

  return (
    <FormControl
      id={name}
      isInvalid={!!error}
      isRequired={isRequired}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      width={responsiveWidth}
      {...props}
    >
      <Stack spacing={2} direction={responsiveDirection}>
        {label && (
          <FormLabel mb={0} htmlFor={name}>
            {label}
            {isRequired && <Box as="span" color="red.500">*</Box>}
          </FormLabel>
        )}
        <Box flex={1}>
          {children}
          {!error && helperText && (
            <FormHelperText>{helperText}</FormHelperText>
          )}
          {error && (
            <FormErrorMessage>{error.message}</FormErrorMessage>
          )}
        </Box>
      </Stack>
    </FormControl>
  );
};

// Text Field Component
export const TextField = ({
  register,
  ...props
}: TextFieldProps & { register: UseFormRegister<any> }) => {
  const { name, type = 'text', placeholder, size, ...rest } = props;
  
  return (
    <FormFieldWrapper {...props}>
      <Input
        type={type}
        placeholder={placeholder}
        size={size}
        {...register(name)}
        {...rest}
      />
    </FormFieldWrapper>
  );
};

// TextArea Field Component
export const TextAreaField = ({
  register,
  ...props
}: TextAreaFieldProps & { register: UseFormRegister<any> }) => {
  const { name, placeholder, rows = 3, size, ...rest } = props;
  
  return (
    <FormFieldWrapper {...props}>
      <Textarea
        placeholder={placeholder}
        rows={rows}
        size={size}
        {...register(name)}
        {...rest}
      />
    </FormFieldWrapper>
  );
};

// Select Field Component
export const SelectField = ({
  register,
  ...props
}: SelectFieldProps & { register: UseFormRegister<any> }) => {
  const { name, options, placeholder, size, ...rest } = props;
  
  return (
    <FormFieldWrapper {...props}>
      <Select
        placeholder={placeholder}
        size={size}
        {...register(name)}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </FormFieldWrapper>
  );
};

// Checkbox Field Component
export const CheckboxField = ({
  register,
  ...props
}: CheckboxFieldProps & { register: UseFormRegister<any> }) => {
  const { name, text, size = 'md', ...rest } = props;
  
  return (
    <FormFieldWrapper {...props} direction="row" alignItems="center">
      <Checkbox
        size={size}
        {...register(name)}
        {...rest}
      >
        {text}
      </Checkbox>
    </FormFieldWrapper>
  );
};

// Radio Group Component
export const RadioGroupField = ({
  register,
  ...props
}: RadioFieldProps & { register: UseFormRegister<any> }) => {
  const { name, options, direction = 'column', size = 'md', ...rest } = props;
  
  return (
    <FormFieldWrapper {...props}>
      <Stack direction={direction} spacing={4}>
        {options.map((option) => (
          <HStack key={option.value} spacing={3}>
            <Radio
              value={option.value}
              size={size}
              {...register(name)}
              {...rest}
            >
              {option.label}
            </Radio>
          </HStack>
        ))}
      </Stack>
    </FormFieldWrapper>
  );
};

// Switch Field Component
export const SwitchField = ({
  register,
  ...props
}: SwitchFieldProps & { register: UseFormRegister<any> }) => {
  const { name, text, size = 'md', ...rest } = props;
  
  return (
    <FormFieldWrapper {...props} direction="row" alignItems="center">
      <HStack spacing={3}>
        <Switch
          size={size}
          {...register(name)}
          {...rest}
        />
        {text && <Box>{text}</Box>}
      </HStack>
    </FormFieldWrapper>
  );
};

// Form Component
export const ResponsiveForm = ({
  children,
  onSubmit,
  spacing = 4,
  width = '100%',
  ...props
}: {
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  spacing?: number | Record<string, number>;
  width?: string | Record<string, string>;
} & FormControlProps) => {
  const responsiveSpacing = useBreakpointValue(
    typeof spacing === 'number' ? { base: spacing } : spacing,
    { fallback: 4 }
  );

  const responsiveWidth = useBreakpointValue(
    typeof width === 'string' ? { base: width } : width,
    { fallback: '100%' }
  );

  return (
    <VStack
      as="form"
      onSubmit={onSubmit}
      spacing={responsiveSpacing}
      width={responsiveWidth}
      align="stretch"
      {...props}
    >
      {children}
    </VStack>
  );
};
