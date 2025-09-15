import { Formik, Form } from 'formik';
import type { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useSubmitFeedback } from '../../hooks/useFeedback';
import { 
  Box, 
  VStack, 
  useToast, 
  Progress, 
  useSteps,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  Stepper,
  StepSeparator,
  useBreakpointValue
} from '@chakra-ui/react';
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

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}$/,
      'Please enter a valid phone number'
    )
    .required('Phone number is required'),
  department: Yup.object().shape({
    departmentId: Yup.string().required('Department is required'),
    subDepartmentId: Yup.string().required('Service category is required'),
    serviceId: Yup.string().required('Service is required'),
    selectedIssue: Yup.string().when('customIssue', {
      is: (val: string) => !val || val.trim() === '',
      then: (schema) => schema.required('Please select or describe an issue'),
      otherwise: (schema) => schema.notRequired(),
    }),
    customIssue: Yup.string().when('selectedIssue', {
      is: (val: string) => !val || val === '_custom',
      then: (schema) => 
        schema
          .min(10, 'Please provide more details (at least 10 characters)')
          .required('Please describe your issue'),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
  description: Yup.string().notRequired(),
});

const initialValues: FeedbackFormValues = {
  phoneNumber: '',
  description: '',
  currentStep: 0,
  department: {
    departmentId: '',
    subDepartmentId: '',
    serviceId: '',
    selectedIssue: '',
    customIssue: '',
  },
  priority: 'medium',
};

const FeedbackForm = () => {
  const toast = useToast();
  const { mutate: submitFeedback } = useSubmitFeedback();
  const [activeStep, setActiveStep] = useState(0);
  
  const { activeStep: step, setActiveStep: setStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = (
    values: FeedbackFormValues,
    { setSubmitting, resetForm }: FormikHelpers<FeedbackFormValues>
  ) => {
    // Prepare the feedback data for submission
    const feedbackData = {
      ...values,
      currentStep: 0, // Reset step for the form
      status: 'new' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      referenceNumber: `REF-${Date.now()}`,
    };

    submitFeedback(feedbackData, {
      onSuccess: () => {
        toast({
          title: 'Feedback submitted!',
          description: 'Thank you for your valuable feedback. Your reference number is ' + feedbackData.referenceNumber,
          status: 'success',
          duration: 8000,
          isClosable: true,
        });
        resetForm({
          values: {
            ...initialValues,
            currentStep: 0,
          },
        });
        setActiveStep(0);
        setStep(0);
      },
      onError: () => {
        toast({
          title: 'Submission failed',
          description: 'There was an error submitting your feedback. Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box maxW="3xl" mx="auto" p={4}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <VStack spacing={8}>
              {/* Progress Stepper */}
              <Box w="full" py={4}>
                <Stepper
                  index={step}
                  size={isMobile ? 'sm' : 'md'}
                  colorScheme="blue"
                  orientation={isMobile ? 'vertical' : 'horizontal'}
                  gap={isMobile ? '0' : '4'}
                >
                  {steps.map((step, index) => (
                    <Step key={index}>
                      <StepIndicator>
                        <StepStatus
                          complete={<StepIcon />}
                          incomplete={<StepNumber />}
                          active={<StepNumber />}
                        />
                      </StepIndicator>
                      {!isMobile && (
                        <Box flexShrink='0'>
                          <StepTitle>{step.title}</StepTitle>
                          <StepDescription>{step.description}</StepDescription>
                        </Box>
                      )}
                      {!isMobile && index < steps.length - 1 && <StepSeparator />}
                    </Step>
                  ))}
                </Stepper>
                <Progress 
                  value={(step / (steps.length - 1)) * 100} 
                  size='xs' 
                  colorScheme='blue' 
                  mt={4} 
                  hasStripe 
                  isAnimated 
                />
              </Box>

              {/* Form Steps */}
              <Box w="full" minH="400px">
                {activeStep === 0 && (
                  <DepartmentStep 
                    values={values} 
                    setFieldValue={setFieldValue} 
                    nextStep={handleNext}
                  />
                )}
                
                {activeStep === 1 && (
                  <SubDepartmentStep 
                    values={values} 
                    setFieldValue={setFieldValue} 
                    nextStep={handleNext}
                    prevStep={handlePrev}
                  />
                )}
                
                {activeStep === 2 && (
                  <ServiceStep 
                    values={values} 
                    setFieldValue={setFieldValue} 
                    nextStep={handleNext}
                    prevStep={handlePrev}
                  />
                )}
                
                {activeStep === 3 && (
                  <IssueStep 
                    values={values} 
                    setFieldValue={setFieldValue} 
                    nextStep={handleNext}
                    prevStep={handlePrev}
                  />
                )}
                
                {activeStep === 4 && (
                  <ContactStep 
                    values={values} 
                    setFieldValue={setFieldValue} 
                    prevStep={handlePrev}
                    isSubmitting={isSubmitting}
                  />
                )}
              </Box>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default FeedbackForm;
