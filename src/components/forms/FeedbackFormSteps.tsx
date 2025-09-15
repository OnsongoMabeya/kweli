import { VStack, HStack, Button, Box, Divider, SimpleGrid, Card, CardBody, FormControl, FormLabel, Radio, RadioGroup, Stack, Textarea, FormHelperText, Input, Text, Heading } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { governmentDepartments } from '../../types/governmentDepartments';
import type { FeedbackFormValues } from '../../types/feedback';

interface StepProps {
  values: FeedbackFormValues;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  nextStep: () => void;
  prevStep: () => void;
  isSubmitting?: boolean;
}

export const DepartmentStep = ({ values, setFieldValue, nextStep }: StepProps) => (
  <VStack spacing={6} align="stretch">
    <Box>
      <Heading size="md" mb={2}>Select Government Department</Heading>
      <Text color="gray.600">
        Please select the government department related to your feedback or complaint.
      </Text>
    </Box>
    
    <SimpleGrid columns={[1, 2, 3]} spacing={4} mt={4}>
      {governmentDepartments.map((dept) => (
        <Card
          key={dept.id}
          onClick={() => {
            setFieldValue('department.departmentId', dept.id);
            setFieldValue('department.departmentName', dept.name);
            nextStep();
          }}
          cursor="pointer"
          borderWidth={values.department.departmentId === dept.id ? '2px' : '1px'}
          borderColor={values.department.departmentId === dept.id ? 'blue.500' : 'gray.200'}
          _hover={{ borderColor: 'blue.300' }}
        >
          <CardBody>
            <Text fontWeight="medium">{dept.name}</Text>
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  </VStack>
);

export const SubDepartmentStep = ({ 
  values, 
  setFieldValue, 
  nextStep, 
  prevStep, 
  isSubmitting
}: StepProps) => {
  const selectedDept = governmentDepartments.find(d => d.id === values.department.departmentId);
  
  if (!selectedDept) {
    prevStep();
    return null;
  }
  
  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Text fontSize="sm" color="gray.500" mb={1}>Department</Text>
        <Text fontWeight="medium" mb={4}>{selectedDept.name}</Text>
        <Divider />
      </Box>
      
      <Box>
        <Heading size="md" mb={4}>Select Sub-Department</Heading>
        <SimpleGrid columns={[1, 2]} spacing={4}>
          {selectedDept.subDepartments.map((subDept) => (
            <Card
              key={subDept.id}
              onClick={() => {
                setFieldValue('department.subDepartmentId', subDept.id);
                setFieldValue('department.subDepartmentName', subDept.name);
                nextStep();
              }}
              cursor="pointer"
              borderWidth={values.department.subDepartmentId === subDept.id ? '2px' : '1px'}
              borderColor={values.department.subDepartmentId === subDept.id ? 'blue.500' : 'gray.200'}
              _hover={{ borderColor: 'blue.300' }}
            >
              <CardBody>
                <Text fontWeight="medium">{subDept.name}</Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
      
      <HStack justify="space-between" mt={8}>
        <Button leftIcon={<FiChevronLeft />} onClick={prevStep} variant="outline">
          Back
        </Button>
      </HStack>
    </VStack>
  );
};

export const ServiceStep = ({ 
  values, 
  setFieldValue, 
  nextStep, 
  prevStep, 
  isSubmitting
}: StepProps) => {
  const selectedDept = governmentDepartments.find(d => d.id === values.department.departmentId);
  const selectedSubDept = selectedDept?.subDepartments.find(
    sub => sub.id === values.department.subDepartmentId
  );
  
  if (!selectedSubDept) {
    prevStep();
    return null;
  }
  
  const services = selectedSubDept.services || [];
  
  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Text fontSize="sm" color="gray.500" mb={1}>Service Category</Text>
        <Text fontWeight="medium" mb={4}>
          {selectedDept?.name} / {selectedSubDept.name}
        </Text>
        <Divider />
      </Box>
      
      <Box>
        <Heading size="md" mb={4}>Select Service</Heading>
        <RadioGroup
          value={values.department.serviceId || ''}
          onChange={(value) => {
            const selectedService = services.find(s => s.id === value);
            setFieldValue('department.serviceId', value);
            setFieldValue('department.serviceName', selectedService?.name || '');
          }}
        >
          <Stack spacing={4}>
            {services.map((service) => (
              <Card key={service.id}>
                <CardBody p={4}>
                  <Radio value={service.id}>
                    <Text fontWeight="medium">{service.name}</Text>
                  </Radio>
                </CardBody>
              </Card>
            ))}
          </Stack>
        </RadioGroup>
      </Box>
      
      <HStack justify="space-between" mt={8}>
        <Button leftIcon={<FiChevronLeft />} onClick={prevStep} variant="outline">
          Back
        </Button>
        <Button
          rightIcon={<FiChevronRight />}
          onClick={nextStep}
          colorScheme="blue"
          isDisabled={!values.department.serviceId}
          isLoading={isSubmitting}
        >
          Next
        </Button>
      </HStack>
    </VStack>
  );
};

export const IssueStep = ({ 
  values, 
  setFieldValue, 
  nextStep, 
  prevStep, 
  isSubmitting
}: StepProps) => {
  const selectedDept = governmentDepartments.find(d => d.id === values.department.departmentId);
  const selectedSubDept = selectedDept?.subDepartments?.find(
    sub => sub.id === values.department.subDepartmentId
  );
  const selectedService = selectedSubDept?.services?.find(
    s => s.id === values.department.serviceId
  );
  
  if (!selectedService) {
    prevStep();
    return null;
  }
  
  const commonIssues = selectedService.commonIssues || [];
  
  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Text fontSize="sm" color="gray.500" mb={1}>Service</Text>
        <Text fontWeight="medium" mb={4}>
          {selectedDept?.name} / {selectedSubDept?.name} / {selectedService.name}
        </Text>
        <Divider />
      </Box>
      
      <Box>
        <Heading size="md" mb={4}>Describe Your Issue</Heading>
        <FormControl isRequired mb={6}>
          <FormLabel>Issue Type</FormLabel>
          <RadioGroup
            value={values.department.selectedIssue || ''}
            onChange={(value) => setFieldValue('department.selectedIssue', value)}
          >
            <Stack spacing={4}>
              {commonIssues.length > 0 && commonIssues.map((issue) => (
                <Card key={issue}>
                  <CardBody p={4}>
                    <Radio value={issue}>
                      <Text fontWeight="medium">{issue}</Text>
                    </Radio>
                  </CardBody>
                </Card>
              ))}
              <Card>
                <CardBody p={4}>
                  <Radio value="other">
                    <Text fontWeight="medium">Other (please specify)</Text>
                  </Radio>
                </CardBody>
              </Card>
            </Stack>
          </RadioGroup>
        </FormControl>
        
        {values.department.selectedIssue === 'other' && (
          <FormControl isRequired mb={6}>
            <FormLabel>Please describe your issue</FormLabel>
            <Textarea
              value={values.department.customIssue || ''}
              onChange={(e) => setFieldValue('department.customIssue', e.target.value)}
              placeholder="Please provide details about your issue"
            />
          </FormControl>
        )}
        
        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={values.description}
            onChange={(e) => setFieldValue('description', e.target.value)}
            placeholder="Please provide a detailed description of your feedback or complaint"
            minH="150px"
          />
          <FormHelperText>
            Be as specific as possible. Include relevant dates, names, and any reference numbers if available.
          </FormHelperText>
        </FormControl>
      </Box>
      
      <HStack justify="space-between" mt={8}>
        <Button leftIcon={<FiChevronLeft />} onClick={prevStep} variant="outline">
          Back
        </Button>
        <Button
          rightIcon={<FiChevronRight />}
          onClick={nextStep}
          colorScheme="blue"
          isDisabled={!values.description || (!values.department.selectedIssue && !values.department.customIssue)}
          isLoading={isSubmitting}
        >
          Next
        </Button>
      </HStack>
    </VStack>
  );
};

export const ContactStep = ({ 
  values, 
  setFieldValue, 
  prevStep, 
  isSubmitting
}: StepProps) => {
  return (
    <VStack spacing={6} align="stretch">
      <VStack align="flex-start" spacing={1} w="full">
        <Text fontSize="sm" color="gray.500">Issue Summary</Text>
        <Box bg="gray.50" p={4} borderRadius="md" w="full">
          <Text fontWeight="medium">
            {values.department.selectedIssue || values.department.customIssue}
          </Text>
        </Box>
      </VStack>
      
      <Box>
        <Heading size="md" mb={4}>Your Contact Information</Heading>
        <Text color="gray.600" mb={6}>
          Please provide your phone number so we can follow up on your feedback if needed.
        </Text>
        
        <FormControl isRequired mb={6}>
          <FormLabel>Phone Number</FormLabel>
          <Input
            type="tel"
            value={values.phoneNumber}
            onChange={(e) => setFieldValue('phoneNumber', e.target.value)}
            placeholder="+254 7XX XXX XXX"
            maxLength={13}
          />
          <FormHelperText>
            We'll only use this to contact you about your feedback.
          </FormHelperText>
        </FormControl>
        
        <FormControl mb={6}>
          <FormLabel>Email (Optional)</FormLabel>
          <Input
            type="email"
            value={values.email || ''}
            onChange={(e) => setFieldValue('email', e.target.value)}
            placeholder="your.email@example.com"
          />
          <FormHelperText>
            Provide an email if you'd prefer to be contacted this way.
          </FormHelperText>
        </FormControl>
        
        <FormControl>
          <FormLabel>Attachments (Optional)</FormLabel>
          <Box
            borderWidth={1}
            borderStyle="dashed"
            borderRadius="md"
            p={8}
            textAlign="center"
            cursor="pointer"
            _hover={{ bg: 'gray.50' }}
          >
            <Text>Drag & drop files here or click to browse</Text>
            <Text fontSize="sm" color="gray.500" mt={2}>
              Max file size: 5MB. Supported formats: JPG, PNG, PDF
            </Text>
          </Box>
        </FormControl>
      </Box>
      
      <HStack justify="space-between" mt={8}>
        <Button leftIcon={<FiChevronLeft />} onClick={prevStep} variant="outline">
          Back
        </Button>
        <Button
          type="submit"
          colorScheme="blue"
          isLoading={isSubmitting}
          isDisabled={!values.phoneNumber}
        >
          Submit Feedback
        </Button>
      </HStack>
    </VStack>
  );
};
