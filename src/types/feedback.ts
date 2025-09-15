export * from './governmentDepartments';

export interface DepartmentSelection {
  departmentId: string;
  departmentName?: string;
  subDepartmentId: string;
  subDepartmentName?: string;
  serviceId: string;
  serviceName?: string;
  selectedIssue?: string;
  customIssue?: string;
}

export interface FeedbackFormValues {
  phoneNumber: string;
  email?: string;
  department: DepartmentSelection;
  description: string;
  attachments?: File[];
  priority: 'low' | 'medium' | 'high';
  currentStep: number;
}

export interface Feedback extends Omit<FeedbackFormValues, 'attachments' | 'currentStep'> {
  id: string;
  status: 'new' | 'in-progress' | 'resolved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  referenceNumber: string;
  attachments?: string[]; // URLs to stored files
  assignedTo?: string;
  resolutionNotes?: string;
  resolutionDate?: string;
}
