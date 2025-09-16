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

export interface GeoLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
  region?: string;
  county?: string;
  timestamp?: string;
}

export type FeedbackType = 'feedback' | 'complaint' | 'suggestion' | 'bug' | 'feature';

export interface FeedbackFormValues {
  phoneNumber: string;
  email?: string;
  department: DepartmentSelection;
  description: string;
  message?: string;
  type: FeedbackType;
  attachments?: File[];
  priority: 'low' | 'medium' | 'high';
  currentStep: number;
  location?: GeoLocation;
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
