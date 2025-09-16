import * as React from 'react';
import { 
  FormControl,
  FormLabel,
  FormHelperText,
  FormControlLabel,
  TextField as MuiTextField,
  TextareaAutosize,
  Select,
  MenuItem,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Stack,
  Box,
  useTheme,
  useMediaQuery,
  type FormControlProps,
  type TextFieldProps as MuiTextFieldProps,
  type SelectProps,
  type CheckboxProps,
  type RadioGroupProps,
  type SwitchProps,
  type SxProps,
  type Theme
} from '@mui/material';
import type { UseFormRegister, FieldError } from 'react-hook-form';

type ReactNode = React.ReactNode;

type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local';

export interface FormFieldProps {
  name: string;
  label?: ReactNode;
  placeholder?: string;
  helperText?: ReactNode;
  error?: FieldError;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  size?: 'small' | 'medium';
  width?: string | number | SxProps<Theme>;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  sx?: SxProps<Theme>;
  fullWidth?: boolean;
}

// Define base form field props without conflicting with MUI TextField
type BaseFormFieldProps = Omit<FormFieldProps, 'helperText' | 'error' | 'label'>;

export interface TextFieldProps extends BaseFormFieldProps, Omit<MuiTextFieldProps, 'size' | 'name' | 'error' | 'helperText' | 'label'> {
  type?: InputType;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  label?: string | ReactNode;
  helperText?: string | ReactNode;
  error?: FieldError;
}

export interface TextAreaFieldProps extends BaseFormFieldProps, Omit<MuiTextFieldProps, 'size' | 'name' | 'error' | 'helperText' | 'label'> {
  rows?: number;
  multiline?: boolean;
  label?: string | ReactNode;
  helperText?: string | ReactNode;
  error?: FieldError;
}

export interface SelectFieldProps extends FormFieldProps, Omit<SelectProps, 'size' | 'name' | 'error'> {
  options: { value: string; label: string }[];
  value?: string;
  label?: string;
  placeholder?: string;
}

export interface CheckboxFieldProps extends FormFieldProps, Omit<CheckboxProps, 'size' | 'name'> {
  label?: string;
  checked?: boolean;
}

export interface RadioFieldProps extends FormFieldProps, Omit<RadioGroupProps, 'name' | 'onChange'> {
  options: { value: string; label: string }[];
  value?: string;
  label?: string;
  row?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
}

export interface SwitchFieldProps extends FormFieldProps, Omit<SwitchProps, 'size' | 'name'> {
  label?: string;
  checked?: boolean;
}

// Helper component to render form control with consistent styling
interface FormFieldWrapperProps extends Omit<FormFieldProps, 'error' | 'name'> {
  children: ReactNode;
  name: string;
  error?: FieldError;
  sx?: SxProps<Theme>;
}

const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({
  children,
  name,
  label,
  helperText,
  error,
  isRequired = false,
  isDisabled = false,
  isReadOnly = false,
  size = 'medium',
  width = '100%',
  direction = 'column',
  ...rest
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Handle responsive styles
  const responsiveSx = React.useMemo<SxProps<Theme>>(() => {
    const styles: Record<string, any> = { ...rest.sx };
    
    // Handle responsive width
    if (width) {
      if (typeof width === 'object') {
        styles.width = width;
      } else {
        styles.width = { xs: '100%', sm: width };
      }
    }
    
    // Handle responsive direction
    const dir = isMobile ? 'column' : direction;
    
    return {
      ...styles,
      '& .MuiFormControl-root': {
        width: '100%',
      },
      '& .MuiStack-root': {
        flexDirection: dir,
      },
    } as SxProps<Theme>;
  }, [width, direction, isMobile, rest.sx]);
  
  // Convert ReactNode to string for FormLabel
  const renderLabel = React.useMemo(() => {
    if (!label) return null;
    
    return (
      <FormLabel htmlFor={name} sx={{ mb: 1 }}>
        {label}
        {isRequired && (
          <Box component="span" sx={{ color: 'error.main', ml: 0.5 }}>
            *
          </Box>
        )}
      </FormLabel>
    );
  }, [label, name, isRequired]);
  
  return (
    <Box sx={responsiveSx}>
      <FormControl 
        fullWidth 
        required={isRequired} 
        disabled={isDisabled}
        error={!!error}
        sx={{ mb: 2 }}
      >
        {renderLabel}
        <Stack 
          direction={isMobile ? 'column' : direction} 
          spacing={2}
          sx={{ 
            '& > *': { 
              flex: 1,
              minWidth: 0 // Prevents flex items from overflowing
            } 
          }}
        >
          {children}
        </Stack>
        {error ? (
          <FormHelperText error>{error.message}</FormHelperText>
        ) : helperText ? (
          <FormHelperText>{helperText}</FormHelperText>
        ) : null}
      </FormControl>
    </Box>
  );
};

// Text Field Component
export const TextField = ({
  register,
  error,
  ...props
}: TextFieldProps & { register: UseFormRegister<any> }) => {
  const { name, type = 'text', placeholder, size = 'medium', ...rest } = props;
  
  if (!name) {
    console.error('TextField requires a name prop');
    return null;
  }
  
  return (
    <FormFieldWrapper {...rest} name={name} error={error}>
      <MuiTextField
        fullWidth
        type={type}
        placeholder={placeholder}
        size={size}
        variant="outlined"
        error={!!error}
        {...register(name)}
        {...rest}
      />
    </FormFieldWrapper>
  );
};

// TextArea Field Component
export const TextAreaField = ({
  register,
  error,
  ...props
}: TextAreaFieldProps & { register: UseFormRegister<any> }) => {
  const { name, placeholder, minRows = 3, ...rest } = props;
  
  if (!name) {
    console.error('TextAreaField requires a name prop');
    return null;
  }
  
  const { ref, ...registerProps } = register(name);
  
  // Create a ref callback that handles the register ref
  const setRef = React.useCallback((element: HTMLTextAreaElement | null) => {
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = element;
    }
  }, [ref]);
  
  // Style for the textarea
  const textareaStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: error ? '1px solid #f44336' : '1px solid #ccc',
    borderRadius: '4px',
    fontFamily: 'inherit',
    minHeight: '100px',
    resize: 'vertical',
  };
  
  // Filter out any props that might conflict with TextareaAutosize
  const { defaultValue, value, ...filteredRest } = rest;
  
  return (
    <FormFieldWrapper {...filteredRest} name={name} error={error}>
      <TextareaAutosize
        minRows={minRows}
        placeholder={placeholder}
        style={textareaStyle}
        ref={setRef}
        defaultValue={defaultValue as string | number | readonly string[] | undefined}
        value={value as string | number | readonly string[] | undefined}
        {...registerProps}
      />
    </FormFieldWrapper>
  );
};

// Select Field Component
export const SelectField = ({
  register,
  ...props
}: SelectFieldProps & { register: UseFormRegister<any> }) => {
  const { 
    name, 
    options, 
    placeholder, 
    size = 'medium',
    error,
    ...rest 
  } = props;
  
  if (!name) {
    console.error('SelectField requires a name prop');
    return null;
  }
  
  // Filter out any props that might conflict with Select
  const { variant, ...filteredRest } = rest as any;
  
  return (
    <FormFieldWrapper {...filteredRest} name={name} error={error}>
      <Select
        displayEmpty
        size={size}
        variant={variant || 'outlined'}
        renderValue={(selected: unknown) => {
          if (!selected) {
            return <em>{placeholder}</em>;
          }
          const selectedOption = options.find(opt => opt.value === selected);
          return <>{selectedOption?.label || String(selected)}</>;
        }}
        {...register(name)}
        {...filteredRest}
        error={!!error}
      >
        <MenuItem disabled value="">
          <em>{placeholder}</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
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
  const { name, label, size = 'medium', ...rest } = props;
  
  if (!name) {
    console.error('CheckboxField requires a name prop');
    return null;
  }
  
  return (
    <FormFieldWrapper {...rest} name={name}>
      <FormControlLabel
        control={
          <Checkbox 
            size={size} 
            {...register(name)}
            {...rest}
          />
        }
        label={label}
      />
    </FormFieldWrapper>
  );
};

// Radio Group Component
export const RadioGroupField = ({
  register,
  ...props
}: RadioFieldProps & { register: UseFormRegister<any> }) => {
  const { name, options, direction = 'column', size = 'medium', ...rest } = props;
  
  if (!name) {
    console.error('RadioGroupField requires a name prop');
    return null;
  }
  
  return (
    <FormFieldWrapper {...rest} name={name}>
      <FormControl component="fieldset">
        <RadioGroup name={name} row={direction === 'row'}>
          <Stack direction={direction} spacing={2}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio size={size} />}
                label={option.label}
                {...register(name)}
              />
            ))}
          </Stack>
        </RadioGroup>
      </FormControl>
    </FormFieldWrapper>
  );
};

// Switch Field Component
export const SwitchField = ({
  register,
  ...props
}: SwitchFieldProps & { register: UseFormRegister<any> }) => {
  const { name, label, size = 'medium', ...rest } = props;
  
  if (!name) {
    console.error('SwitchField requires a name prop');
    return null;
  }
  
  return (
    <FormFieldWrapper {...rest} name={name}>
      <FormControlLabel
        control={
          <Switch 
            size={size} 
            {...register(name)}
            {...rest}
          />
        }
        label={label}
      />
    </FormFieldWrapper>
  );
};

// Form Component
export const ResponsiveForm = ({
  children,
  onSubmit,
  spacing = 4,
  width = '100%',
  maxWidth = '900px', 
  ...rest
}: {
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  spacing?: number | Record<string, number>;
  width?: string | Record<string, string>;
  maxWidth?: string | Record<string, string>;
} & FormControlProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const baseSpacing = typeof spacing === 'number' ? spacing : 4; // Default to 4 if spacing is not a number
  const responsiveSpacing = isMobile ? baseSpacing / 2 : baseSpacing;
  const responsiveWidth = isMobile ? '100%' : width;
  const responsiveMaxWidth = isMobile ? '100%' : maxWidth;

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        width: responsiveWidth,
        maxWidth: responsiveMaxWidth,
        mx: 'auto',
        '& > *:not(:last-child)': {
          mb: responsiveSpacing
        },
        ...rest.sx
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
