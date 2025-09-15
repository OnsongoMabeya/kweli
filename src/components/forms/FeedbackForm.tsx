import { Formik, Form } from 'formik';
import type { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useSubmitFeedback } from '../../hooks/useFeedback';
import { 
  Box, 
  useToast, 
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

const StepComponent = [
  DepartmentStep,
  SubDepartmentStep,
  ServiceStep,
  IssueStep,
  ContactStep,
];

const validationSchema = Yup.object({
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
  department: Yup.object({
    departmentId: Yup.string().required('Department is required'),
    departmentName: Yup.string().optional(),
    subDepartmentId: Yup.string().required('Service category is required'),
    subDepartmentName: Yup.string().optional(),
    serviceId: Yup.string().required('Service is required'),
    serviceName: Yup.string().optional(),
    selectedIssue: Yup.string().test(
      'issue-required',
      'Please select or describe an issue',
      function(value) {
        const { customIssue } = this.parent;
        return !!(value || (customIssue && customIssue.trim() !== ''));
      }
    ),
    customIssue: Yup.string()
      .when('selectedIssue', {
        is: (val: string) => val === '_custom',
        then: (schema) => 
          schema
            .min(10, 'Please provide more details (at least 10 characters)')
            .required('Please describe your issue'),
        otherwise: (schema) => schema.notRequired(),
      })
      .optional(),
  })
});

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
  
  const { setActiveStep: setStep } = useSteps({
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
  
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleSubmit = (
    values: FeedbackFormValues,
    { setSubmitting, resetForm }: FormikHelpers<FeedbackFormValues>
  ) => {
    // Prepare the feedback data for submission
    const submissionData = {
      ...values,
      department: {
        ...values.department,
        // Ensure we're not sending empty strings for optional fields
        customIssue: values.department.customIssue || undefined,
        selectedIssue: values.department.selectedIssue || undefined,
      },
      // Remove any undefined values
      ...(values.email ? { email: values.email } : {}),
    };

    submitFeedback(submissionData, {
      onSuccess: () => {
        toast({
          title: 'Feedback submitted!',
          description: 'Thank you for your valuable feedback.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        resetForm();
        // Reset to first step after successful submission
        setActiveStep(0);
        setStep(0);
      },
      onError: (error: unknown) => {
        console.error('Submission error:', error);
        toast({
          title: 'Submission failed',
          description: error instanceof Error ? error.message : 'Please try again later.',
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

  const CurrentStepComponent = StepComponent[activeStep];

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
        {(formik) => (
          <Form>
            <Stepper index={activeStep} orientation={isMobile ? 'vertical' : 'horizontal'} mb={8}>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>
                  <Box flexShrink="0">
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>
                  <StepSeparator />
                </Step>
              ))}
            </Stepper>

            <Box minH="400px">
              <CurrentStepComponent 
                values={formik.values}
                setFieldValue={formik.setFieldValue}
                nextStep={handleNext}
                prevStep={handlePrev}
                isSubmitting={formik.isSubmitting}
              />
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default FeedbackForm;
