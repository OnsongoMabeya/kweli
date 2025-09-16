import type { Feedback, FeedbackFormValues } from '../types/feedback';
import { getCurrentLocation } from '../utils/geolocation';

// Using shared types from '../types/feedback'

// Mock data for development
const mockFeedbacks: Feedback[] = [
  {
    id: '1',
    phoneNumber: '+1234567890',
    type: 'feedback',
    description: 'Great app! Really enjoying the features.',
    status: 'resolved',
    createdAt: '2023-10-15T10:30:00Z',
    updatedAt: '2023-10-15T10:30:00Z',
    referenceNumber: 'KW-1',
    priority: 'medium',
    department: {
      departmentId: 'interior',
      subDepartmentId: 'immigration',
      serviceId: 'passport'
    }
  },
  {
    id: '2',
    phoneNumber: '+1987654321',
    type: 'bug',
    description: 'Found an issue with the login page.',
    status: 'in-progress',
    createdAt: '2023-10-16T14:45:00Z',
    updatedAt: '2023-10-16T14:45:00Z',
    referenceNumber: 'KW-2',
    priority: 'high',
    department: {
      departmentId: 'health',
      subDepartmentId: 'hospitals',
      serviceId: 'emergency'
    }
  },
  {
    id: '3',
    phoneNumber: '+1555123456',
    type: 'feature',
    description: 'Would love to see dark mode support.',
    status: 'new',
    createdAt: '2023-10-17T09:15:00Z',
    updatedAt: '2023-10-17T09:15:00Z',
    referenceNumber: 'KW-3',
    priority: 'low',
    department: {
      departmentId: 'education',
      subDepartmentId: 'universities',
      serviceId: 'admissions'
    }
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// API functions
export const submitFeedback = async (data: FeedbackFormValues): Promise<Feedback> => {
  await delay(800); // Simulate network delay
  
  // Get user's current location if not already provided
  let location = data.location;
  if (!location) {
    try {
      const pos = await getCurrentLocation();
      if (pos && !pos.error) {
        location = {
          latitude: pos.latitude,
          longitude: pos.longitude,
          county: pos.county,
          timestamp: new Date().toISOString()
        };
      }
    } catch (error) {
      console.warn('Could not get user location:', error);
    }
  }
  
  const newFeedback: Feedback = {
    id: Math.random().toString(36).substr(2, 9),
    phoneNumber: data.phoneNumber,
    email: data.email,
    description: data.description,
    type: data.type,
    status: 'new',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    referenceNumber: `KW-${Date.now()}`,
    location,
    department: data.department,
    priority: data.priority
  };
  
  mockFeedbacks.unshift(newFeedback);
  return newFeedback;
};

export const fetchFeedbacks = async (): Promise<Feedback[]> => {
  await delay(500); // Simulate network delay
  return [...mockFeedbacks];
};

export const fetchFeedbackStats = async () => {
  await delay(300); // Simulate network delay
  
  const total = mockFeedbacks.length;
  const byType = mockFeedbacks.reduce((acc, { type }) => {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const byStatus = mockFeedbacks.reduce((acc, { status }) => {
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    total,
    byType,
    byStatus,
  };
};
