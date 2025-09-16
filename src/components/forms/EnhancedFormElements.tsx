import { Input, Textarea, Select, FormControl, FormLabel, FormErrorMessage, Box, Text, Icon, useColorModeValue } from '@chakra-ui/react';
import { FiAlertCircle, FiCheck, FiInfo } from 'react-icons/fi';
import { motion } from 'framer-motion';

// Animated form field wrapper
export const FormField = ({ children, label, error, helperText, isRequired = false }) => {
  const labelColor = useColorModeValue('gray.700', 'gray.200');
  const helperColor = useColorModeValue('gray.500', 'gray.400');
  
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired} mb={6}>
      {label && (
        <FormLabel 
          fontWeight="medium" 
          color={labelColor}
          mb={2}
          fontSize="sm"
          textTransform="uppercase"
          letterSpacing="wider"
        >
          {label}
        </FormLabel>
      )}
      
      <Box position="relative">
        {children}
        
        {!error && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <Icon as={FiCheck} color="green.500" boxSize={5} />
          </motion.div>
        )}
      </Box>
      
      {error ? (
        <FormErrorMessage mt={1}>
          <Icon as={FiAlertCircle} mr={1} />
          {error}
        </FormErrorMessage>
      ) : helperText ? (
        <Text mt={1} fontSize="sm" color={helperColor}>
          <Icon as={FiInfo} mr={1} />
          {helperText}
        </Text>
      ) : null}
    </FormControl>
  );
};

// Enhanced Input
const EnhancedInput = (props) => {
  const { label, error, helperText, isRequired, ...rest } = props;
  const inputBg = useColorModeValue('white', 'gray.700');
  const inputBorder = useColorModeValue('gray.200', 'gray.600');
  const focusBorderColor = useColorModeValue('purple.500', 'purple.300');
  
  return (
    <FormField label={label} error={error} helperText={helperText} isRequired={isRequired}>
      <Input
        bg={inputBg}
        borderColor={inputBorder}
        _hover={{ borderColor: 'gray.300' }}
        _focus={{
          borderColor: focusBorderColor,
          boxShadow: `0 0 0 1px ${focusBorderColor}`,
        }}
        _placeholder={{
          color: 'gray.400',
          fontSize: 'sm',
        }}
        size="lg"
        borderRadius="lg"
        transition="all 0.2s"
        {...rest}
      />
    </FormField>
  );
};

// Enhanced Textarea
const EnhancedTextarea = (props) => {
  const { label, error, helperText, isRequired, ...rest } = props;
  const inputBg = useColorModeValue('white', 'gray.700');
  const inputBorder = useColorModeValue('gray.200', 'gray.600');
  const focusBorderColor = useColorModeValue('purple.500', 'purple.300');
  
  return (
    <FormField label={label} error={error} helperText={helperText} isRequired={isRequired}>
      <Textarea
        bg={inputBg}
        borderColor={inputBorder}
        _hover={{ borderColor: 'gray.300' }}
        _focus={{
          borderColor: focusBorderColor,
          boxShadow: `0 0 0 1px ${focusBorderColor}`,
        }}
        _placeholder={{
          color: 'gray.400',
          fontSize: 'sm',
        }}
        size="lg"
        borderRadius="lg"
        minH="120px"
        resize="vertical"
        transition="all 0.2s"
        {...rest}
      />
    </FormField>
  );
};

// Enhanced Select
const EnhancedSelect = (props) => {
  const { label, error, helperText, isRequired, children, ...rest } = props;
  const inputBg = useColorModeValue('white', 'gray.700');
  const inputBorder = useColorModeValue('gray.200', 'gray.600');
  const focusBorderColor = useColorModeValue('purple.500', 'purple.300');
  
  return (
    <FormField label={label} error={error} helperText={helperText} isRequired={isRequired}>
      <Select
        bg={inputBg}
        borderColor={inputBorder}
        _hover={{ borderColor: 'gray.300' }}
        _focus={{
          borderColor: focusBorderColor,
          boxShadow: `0 0 0 1px ${focusBorderColor}`,
        }}
        size="lg"
        borderRadius="lg"
        transition="all 0.2s"
        iconColor="purple.500"
        {...rest}
      >
        {children}
      </Select>
    </FormField>
  );
};

export { EnhancedInput as Input, EnhancedTextarea as Textarea, EnhancedSelect as Select };
