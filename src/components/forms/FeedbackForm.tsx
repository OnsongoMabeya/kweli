import { Formik, Form } from 'formik';
import type { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useState, useMemo } from 'react';
import { useSubmitFeedback } from '../../hooks/useFeedback';
import { 
  Box, 
  useToast, 
  useSteps,
  Step,
  StepIndicator,
  StepNumber,
  StepTitle,
  StepDescription,
  Stepper,
  StepSeparator,
  useColorModeValue,
  Container,
  HStack,
  Button,
  useMediaQuery,
  type StackDirection,
} from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight, FiSend } from 'react-icons/fi';
import type { FeedbackFormValues } from '../../types/feedback';
import { 
  DepartmentStep, 
  SubDepartmentStep, 
  ServiceStep, 
  IssueStep, 
  ContactStep 
} from './FeedbackFormSteps';

const steps = [
  { title: 'Department', description: 'Select department' },
  { title: 'Category', description: 'Service category' },
  { title: 'Service', description: 'Specific service' },
  { title: 'Issue', description: 'Describe issue' },
  { title: 'Contact', description: 'Your details' },
];

const StepComponents = [
  DepartmentStep,
  SubDepartmentStep,
  ServiceStep,
  IssueStep,
  ContactStep,
] as const;

// Create a base schema without the cyclic dependency
const baseSchema = {
  phoneNumber: Yup.string()
    .matches(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}$/,
      'Please enter a valid phone number'
    )
    .required('Phone number is required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .optional(),
  description: Yup.string().optional(),
  currentStep: Yup.number().required(),
  priority: Yup.string()
    .oneOf(['low', 'medium', 'high'], 'Invalid priority')
    .default('medium'),
  attachments: Yup.array().of(Yup.mixed()),
  department: Yup.object({
    departmentId: Yup.string().required('Department is required'),
    departmentName: Yup.string().optional(),
    subDepartmentId: Yup.string().required('Service category is required'),
    subDepartmentName: Yup.string().optional(),
    serviceId: Yup.string().required('Service is required'),
    serviceName: Yup.string().optional(),
    selectedIssue: Yup.string().optional(),
    customIssue: Yup.string().optional()
  })
};

// Create the validation schema with the dynamic part
const createValidationSchema = () => {
  return Yup.object({
    ...baseSchema,
    department: Yup.object({
      ...baseSchema.department.fields,
      selectedIssue: Yup.string().test(
        'issue-required',
        'Please select or describe an issue',
        function(value) {
          const { customIssue } = this.parent;
          return !!(value || (customIssue && customIssue.trim() !== ''));
        }
      ),
      customIssue: Yup.string().when('selectedIssue', {
        is: (val: string) => val === '_custom',
        then: (schema) => schema
          .min(10, 'Please provide more details (at least 10 characters)')
          .required('Please describe your issue'),
        otherwise: (schema) => schema.notRequired(),
      })
    })
  });
};

const initialValues: FeedbackFormValues = {
  phoneNumber: '',
  email: '',
  description: '',
  currentStep: 0,
  department: {
    departmentId: '',
    departmentName: '',
    subDepartmentId: '',
    subDepartmentName: '',
    serviceId: '',
    serviceName: '',
    selectedIssue: '',
    customIssue: '',
  },
  priority: 'medium',
  attachments: [],
};

const FeedbackForm = () => {
  const toast = useToast();
  const { mutate: submitFeedback } = useSubmitFeedback();
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  
  const { setActiveStep: setStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  // Memoize the validation schema to prevent recreation on each render
  const validationSchema = useMemo(() => createValidationSchema(), []);

  const handleNext = () => {
    const nextStep = Math.min(activeStep + 1, steps.length - 1);
    setActiveStep(nextStep);
    setStep(nextStep);
  };

  const handlePrev = () => {
    const prevStep = Math.max(activeStep - 1, 0);
    setActiveStep(prevStep);
    setStep(prevStep);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
    setStep(step);
  };

  const handleFormSubmit = async (
    values: FeedbackFormValues,
    { resetForm }: FormikHelpers<FeedbackFormValues>
  ) => {
    setIsSubmitting(true);
    try {
      await submitFeedback(values);
      
      // Show success message
      toast({
        title: 'Feedback submitted',
        description: 'Thank you for your feedback!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      
      // Reset form and go to first step
      resetForm();
      setActiveStep(0);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit feedback. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const CurrentStepComponent = StepComponents[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const formBg = useColorModeValue('white', 'gray.800');
  const pageBg = useColorModeValue('gray.50', 'gray.900');
  const formShadow = useColorModeValue('md', 'dark-lg');

  return (
    <Box minH="100vh" bg={pageBg} py={8}>
      <Container maxW="7xl" h="100%" px={{ base: 4, md: 6, lg: 8 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
          validateOnMount={false}
          validateOnChange={false}
        >
          {(formik) => (
            <Form>
              <Box 
                bg={formBg}
                borderRadius="lg"
                p={6}
                boxShadow={formShadow}
                borderWidth="1px"
                borderColor={borderColor}
                minH="calc(100vh - 64px)"
                display="flex"
                flexDirection="column"
              >
                <Box mt={8} flex="1" display="flex" flexDirection="column">
                  <Box flex="1">
                    <CurrentStepComponent 
                      values={formik.values}
                      setFieldValue={formik.setFieldValue}
                      errors={formik.errors}
                      touched={formik.touched}
                      isSubmitting={isSubmitting}
                      formik={formik}
                      onNext={handleNext}
                      onPrev={handlePrev}
                    />
                  </Box>
                  {/* Navigation Buttons */}
                  <HStack 
                    mt={8} 
                    pt={4} 
                    borderTopWidth="1px" 
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    justify={activeStep === 0 ? 'flex-end' : 'space-between'}
                    spacing={4}
                  >
                    {activeStep > 0 && (
                      <Button
                        leftIcon={<FiChevronLeft />}
                        onClick={handlePrev}
                        variant="outline"
                        isDisabled={isSubmitting}
                      >
                        Back
                      </Button>
                    )}
                    
                    <Button
                      type={isLastStep ? 'submit' : 'button'}
                      colorScheme="blue"
                      rightIcon={isLastStep ? <FiSend /> : <FiChevronRight />}
                      onClick={!isLastStep ? handleNext : undefined}
                      isLoading={isSubmitting}
                      loadingText={isLastStep ? 'Submitting...' : 'Loading...'}
                      ml={activeStep === 0 ? 'auto' : 0}
                    >
                      {isLastStep ? 'Submit Feedback' : 'Next'}
                    </Button>
                  </HStack>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default FeedbackForm;
