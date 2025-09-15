import { VStack, HStack, Button, Box, Divider, SimpleGrid, Card, CardBody, CardHeader, FormControl, FormLabel, Radio, RadioGroup, Stack, Textarea, FormHelperText, Input, Text, Heading } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { governmentDepartments } from '../../types/governmentDepartments';
import type { FeedbackFormValues } from '../../types/feedback';

// Department Selection Step
interface StepProps {
  values: FeedbackFormValues;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  nextStep?: () => void;
  prevStep?: () => void;
  isSubmitting?: boolean;
}

export const DepartmentStep = ({ setFieldValue, nextStep }: StepProps) => (
  <VStack spacing={6} align="stretch">
    <Heading size="md">Select Government Department</Heading>
    <Text color="gray.600">
      Please select the government department related to your feedback or complaint.
    </Text>
    
    <SimpleGrid columns={[1, 2, 3]} spacing={4} mt={4}>
      {governmentDepartments.map((dept) => (
        <Card
          key={dept.id}
          variant="outline"
          cursor="pointer"
          _hover={{ borderColor: 'blue.500', shadow: 'md' }}
          onClick={() => {
            setFieldValue('department.departmentId', dept.id);
            nextStep();
          }}
        >
          <CardHeader pb={2}>
            <Heading size="sm">{dept.name}</Heading>
          </CardHeader>
          <CardBody pt={0}>
            <Text fontSize="sm" color="gray.600">
              {dept.subDepartments.length} service categories
            </Text>
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  </VStack>
);

// SubDepartment Selection Step
export const SubDepartmentStep = ({ values, setFieldValue, nextStep, prevStep }: StepProps) => {
  const selectedDept = governmentDepartments.find(d => d.id === values.department.departmentId);
  
  if (!selectedDept) {
    if (prevStep) prevStep();
    return null;
  }

  if (!selectedDept) return null;
  
  return (
    <VStack spacing={6} align="stretch">
      <VStack align="flex-start" spacing={1} w="full">
        <Text fontSize="sm" color="gray.500">Department</Text>
        <Text fontWeight="medium">{selectedDept.name}</Text>
      </VStack>
      
      <Divider />
      
      <VStack spacing={4} align="stretch">
        <Heading size="md">Select Service Category</Heading>
        <Text color="gray.600">
          Choose the specific service category related to your feedback.
        </Text>
        
        <SimpleGrid columns={[1, 2]} spacing={4} mt={2}>
          {selectedDept.subDepartments.map((subDept) => (
            <Card
              key={subDept.id}
              variant="outline"
              cursor="pointer"
              _hover={{ borderColor: 'blue.500', shadow: 'sm' }}
              onClick={() => {
                setFieldValue('department.subDepartmentId', subDept.id);
                nextStep();
              }}
            >
              <CardBody>
                <Text fontWeight="medium">{subDept.name}</Text>
                <Text fontSize="sm" color="gray.600" mt={1}>
                  {subDept.services.length} service{subDept.services.length !== 1 ? 's' : ''} available
                </Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
      
      <Button
        leftIcon={<FiChevronLeft />}
        variant="ghost"
        onClick={prevStep}
        alignSelf="flex-start"
        mt={4}
      >
        Back to Departments
      </Button>
    </VStack>
  );
};

// Service Selection Step
export const ServiceStep = ({ values, setFieldValue, nextStep, prevStep }: StepProps) => {
  const selectedDept = governmentDepartments.find(d => d.id === values.department.departmentId);
  const selectedSubDept = selectedDept?.subDepartments.find(
    sub => sub.id === values.department.subDepartmentId
  );
  
  if (!selectedSubDept) {
    if (prevStep) prevStep();
    return null;
  }

  if (!selectedSubDept) return null;
  
  return (
    <VStack spacing={6} align="stretch">
      <VStack align="flex-start" spacing={1} w="full">
        <Text fontSize="sm" color="gray.500">Service Category</Text>
        <Text fontWeight="medium">{selectedDept?.name} / {selectedSubDept.name}</Text>
      </VStack>
      
      <Divider />
      
      <VStack spacing={4} align="stretch">
        <Heading size="md">Select Service</Heading>
        <Text color="gray.600">
          Choose the specific service you want to provide feedback about.
        </Text>
        
        <RadioGroup
          value={values.department.serviceId || ''}
          onChange={(val: string) => setFieldValue('department.serviceId', val)}
        >
          <Stack spacing={4}>
            {selectedSubDept.services.map((service) => (
              <Card
                key={service.id}
                variant="outline"
                borderWidth="1px"
                borderRadius="md"
                p={4}
                cursor="pointer"
                _hover={{ borderColor: 'blue.500' }}
                onClick={() => setFieldValue('department.serviceId', service.id)}
              >
                <Radio value={service.id} w="full">
                  <VStack align="flex-start" spacing={1} ml={2}>
                    <Text fontWeight="medium">{service.name}</Text>
                    {service.commonIssues && service.commonIssues.length > 0 && (
                      <Text fontSize="sm" color="gray.600">
                        Common issues: {service.commonIssues.slice(0, 2).join(', ')}
                        {service.commonIssues.length > 2 ? '...' : ''}
                      </Text>
                    )}
                  </VStack>
                </Radio>
              </Card>
            ))}
          </Stack>
        </RadioGroup>
      </VStack>
      
      <HStack justify="space-between" mt={4}>
        <Button
          leftIcon={<FiChevronLeft />}
          variant="ghost"
          onClick={prevStep}
        >
          Back
        </Button>
        <Button
          rightIcon={<FiChevronRight />}
          colorScheme="blue"
          isDisabled={!values.department.serviceId}
          onClick={nextStep}
        >
          Continue
        </Button>
      </HStack>
    </VStack>
  );
};

// Issue Description Step
export const IssueStep = ({ values, setFieldValue, nextStep, prevStep }: StepProps) => {
  const selectedDept = governmentDepartments.find(d => d.id === values.department.departmentId);
  const selectedSubDept = selectedDept?.subDepartments?.find(
    sub => sub.id === values.department.subDepartmentId
  );
  const selectedService = selectedSubDept?.services?.find(
    s => s.id === values.department.serviceId
  );
  
  if (!selectedService) {
    if (prevStep) prevStep();
    return null;
  }

  if (!selectedService) return null;
  
  return (
    <VStack spacing={6} align="stretch">
      <VStack align="flex-start" spacing={1} w="full">
        <Text fontSize="sm" color="gray.500">Service</Text>
        <Text fontWeight="medium">
          {selectedDept?.name} / {selectedSubDept?.name} / {selectedService.name}
        </Text>
      </VStack>
      
      <Divider />
      
      <VStack spacing={4} align="stretch">
        <Heading size="md">Describe the Issue</Heading>
        
        {selectedService.commonIssues && selectedService.commonIssues.length > 0 && (
          <RadioGroup
            value={values.department.selectedIssue || ''}
            onChange={(val: string) => {
              setFieldValue('department.selectedIssue', val);
              setFieldValue('department.customIssue', '');
            }}
          >
            <Stack spacing={3}>
              {selectedService.commonIssues.map((issue, idx) => (
                <Radio key={idx} value={issue}>
                  {issue}
                </Radio>
              ))}
              <Radio value="_custom">
                Other (please specify)
              </Radio>
            </Stack>
          </RadioGroup>
        )}
        
        {(values.department.selectedIssue === '_custom' || 
          !selectedService.commonIssues || 
          selectedService.commonIssues.length === 0) && (
          <FormControl mt={4}>
            <FormLabel>Describe your issue in detail</FormLabel>
            <Textarea
              value={values.department.customIssue || ''}
              onChange={(e) => setFieldValue('department.customIssue', e.target.value)}
              placeholder="Please provide a clear description of the issue..."
              rows={4}
            />
            <FormHelperText>
              Be as specific as possible to help us address your concern effectively.
            </FormHelperText>
          </FormControl>
        )}
      </VStack>
      
      <HStack justify="space-between" mt={4}>
        <Button
          leftIcon={<FiChevronLeft />}
          variant="ghost"
          onClick={prevStep}
        >
          Back
        </Button>
        <Button
          rightIcon={<FiChevronRight />}
          colorScheme="blue"
          isDisabled={
            !values.department.selectedIssue && 
            !values.department.customIssue?.trim()
          }
          onClick={nextStep}
        >
          Continue
        </Button>
      </HStack>
    </VStack>
  );
};

// Contact Information Step
export const ContactStep = ({ values, setFieldValue, prevStep, isSubmitting }: StepProps & { isSubmitting: boolean }) => {
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
      
      <Divider />
      
      <VStack spacing={4} align="stretch">
        <Heading size="md">Contact Information</Heading>
        <Text color="gray.600">
          Please provide your contact information so we can follow up on your feedback.
        </Text>
        
        <FormControl isRequired>
          <FormLabel>Phone Number</FormLabel>
          <Input
            type="tel"
            placeholder="+254 700 000000"
            value={values.phoneNumber}
            onChange={(e) => setFieldValue('phoneNumber', e.target.value)}
          />
          <FormHelperText>
            We'll use this to contact you about your feedback.
          </FormHelperText>
        </FormControl>
        
        <FormControl>
          <FormLabel>Additional Notes (Optional)</FormLabel>
          <Textarea
            placeholder="Add any additional information that might be helpful..."
            rows={4}
            value={values.description}
            onChange={(e) => setFieldValue('description', e.target.value)}
          />
        </FormControl>
      </VStack>
      
      <HStack justify="space-between" mt={4}>
        <Button
          leftIcon={<FiChevronLeft />}
          variant="ghost"
          onClick={prevStep}
        >
          Back
        </Button>
        <Button
          type="submit"
          colorScheme="blue"
          isLoading={isSubmitting}
          loadingText="Submitting..."
          isDisabled={!values.phoneNumber}
        >
          Submit Feedback
        </Button>
      </HStack>
    </VStack>
  );
};
