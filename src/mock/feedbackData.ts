import { Feedback } from "@/types/feedback";

interface ExtendedFeedback extends Omit<Feedback, 'location' | 'type' | 'priority'> {
  county: string;
  rating: number;
  comment: string;
  category: string;
  userId: string;
  type: 'feedback' | 'complaint' | 'suggestion' | 'bug' | 'feature';
  priority: 'low' | 'medium' | 'high';
}

export const mockFeedbacks: ExtendedFeedback[] = [
  {
    id: '1',
    type: 'feedback',
    priority: 'medium',
    phoneNumber: '+254700000000',
    description: 'Great healthcare services but could use more specialists in public hospitals.',
    message: 'Great healthcare services but could use more specialists in public hospitals.',
    department: {
      departmentId: 'health',
      subDepartmentId: 'hospitals',
      serviceId: 'specialists'
    },
    county: 'Nairobi',
    rating: 4,
    comment: 'Great healthcare services but could use more specialists in public hospitals.',
    category: 'Healthcare',
    createdAt: '2025-01-15T10:30:00Z',
    updatedAt: '2025-01-15T10:30:00Z',
    referenceNumber: 'REF-001',
    status: 'in-progress',
    userId: 'user123'
  },
  {
    id: '2',
    type: 'complaint',
    priority: 'high',
    phoneNumber: '+254711111111',
    description: 'Roads need urgent maintenance, especially in the CBD area.',
    message: 'Roads need urgent maintenance, especially in the CBD area.',
    department: {
      departmentId: 'infra',
      subDepartmentId: 'roads',
      serviceId: 'maintenance'
    },
    county: 'Mombasa',
    rating: 3,
    comment: 'Roads need urgent maintenance, especially in the CBD area.',
    category: 'Infrastructure',
    createdAt: '2025-01-18T14:45:00Z',
    updatedAt: '2025-01-18T14:45:00Z',
    referenceNumber: 'REF-002',
    status: 'in-progress',
    userId: 'user456'
  },
  {
    id: '3',
    type: 'feedback',
    priority: 'low',
    phoneNumber: '+254722222222',
    description: 'Excellent work on the new lakefront development!',
    message: 'Excellent work on the new lakefront development!',
    department: {
      departmentId: 'tourism',
      subDepartmentId: 'development',
      serviceId: 'lakefront'
    },
    county: 'Kisumu',
    rating: 5,
    comment: 'Excellent work on the new lakefront development!',
    category: 'Tourism',
    createdAt: '2025-02-02T09:15:00Z',
    updatedAt: '2025-02-02T09:15:00Z',
    referenceNumber: 'REF-003',
    status: 'rejected',
    userId: 'user789'
  },
  {
    id: '4',
    type: 'complaint',
    priority: 'high',
    phoneNumber: '+254733333333',
    description: 'Garbage collection services are inconsistent in my neighborhood.',
    message: 'Garbage collection services are inconsistent in my neighborhood.',
    department: {
      departmentId: 'sanitation',
      subDepartmentId: 'waste',
      serviceId: 'collection'
    },
    county: 'Nakuru',
    rating: 2,
    comment: 'Garbage collection services are inconsistent in my neighborhood.',
    category: 'Sanitation',
    createdAt: '2025-02-10T16:20:00Z',
    updatedAt: '2025-02-10T16:20:00Z',
    referenceNumber: 'REF-004',
    status: 'new',
    userId: 'user101'
  },
  {
    id: '5',
    type: 'feedback',
    priority: 'low',
    phoneNumber: '+254744444444',
    description: 'The new sports complex is world-class. Great job!',
    message: 'The new sports complex is world-class. Great job!',
    department: {
      departmentId: 'sports',
      subDepartmentId: 'facilities',
      serviceId: 'complexes'
    },
    county: 'Eldoret',
    rating: 4,
    comment: 'The new sports complex is world-class. Great job!',
    category: 'Sports',
    createdAt: '2025-02-15T11:00:00Z',
    updatedAt: '2025-02-15T11:00:00Z',
    referenceNumber: 'REF-005',
    status: 'resolved',
    userId: 'user202'
  },
  {
    id: '6',
    type: 'complaint',
    priority: 'high',
    phoneNumber: '+254755555555',
    description: 'Need more street lighting in the town center.',
    message: 'Need more street lighting in the town center.',
    department: {
      departmentId: 'infrastructure',
      subDepartmentId: 'lighting',
      serviceId: 'street-lights'
    },
    county: 'Kakamega',
    rating: 3,
    comment: 'Need more street lighting in the town center.',
    category: 'Security',
    createdAt: '2025-02-20T19:30:00Z',
    updatedAt: '2025-02-20T19:30:00Z',
    referenceNumber: 'REF-006',
    status: 'in-progress',
    userId: 'user303'
  },
  {
    id: '7',
    type: 'complaint',
    priority: 'high',
    phoneNumber: '+254766666666',
    description: 'Water shortage has been ongoing for weeks now.',
    message: 'Water shortage has been ongoing for weeks now.',
    department: {
      departmentId: 'utilities',
      subDepartmentId: 'water',
      serviceId: 'supply'
    },
    county: 'Kisii',
    rating: 1,
    comment: 'Water shortage has been ongoing for weeks now.',
    category: 'Water',
    createdAt: '2025-02-22T08:45:00Z',
    updatedAt: '2025-02-22T08:45:00Z',
    referenceNumber: 'REF-007',
    status: 'in-progress',
    userId: 'user404'
  },
  {
    id: '8',
    type: 'feedback',
    priority: 'medium',
    phoneNumber: '+254777777777',
    description: 'The new market has transformed our local economy.',
    message: 'The new market has transformed our local economy.',
    department: {
      departmentId: 'economic-development',
      subDepartmentId: 'markets',
      serviceId: 'market-development'
    },
    county: 'Meru',
    rating: 5,
    comment: 'The new market has transformed our local economy.',
    category: 'Economy',
    createdAt: '2025-03-01T13:20:00Z',
    updatedAt: '2025-03-01T13:20:00Z',
    referenceNumber: 'REF-008',
    status: 'resolved',
    userId: 'user505'
  },
  {
    id: '9',
    type: 'suggestion',
    priority: 'high',
    phoneNumber: '+254788888888',
    description: 'Public transport system needs improvement.',
    message: 'Public transport system needs improvement.',
    department: {
      departmentId: 'transport',
      subDepartmentId: 'public-transport',
      serviceId: 'system-improvement'
    },
    county: 'Nairobi',
    rating: 2,
    comment: 'Public transport system needs improvement.',
    category: 'Transport',
    createdAt: '2025-03-05T17:10:00Z',
    updatedAt: '2025-03-05T17:10:00Z',
    referenceNumber: 'REF-009',
    status: 'in-progress',
    userId: 'user606'
  },
  {
    id: '10',
    type: 'feedback',
    priority: 'medium',
    phoneNumber: '+254799999999',
    description: 'The new beach cleanup initiative is impressive!',
    message: 'The new beach cleanup initiative is impressive!',
    department: {
      departmentId: 'environment',
      subDepartmentId: 'conservation',
      serviceId: 'beach-cleanup'
    },
    county: 'Mombasa',
    rating: 4,
    comment: 'The new beach cleanup initiative is impressive!',
    category: 'Environment',
    createdAt: '2025-03-10T10:00:00Z',
    updatedAt: '2025-03-10T10:00:00Z',
    referenceNumber: 'REF-010',
    status: 'new',
    userId: 'user707'
  },
  {
    id: '11',
    type: 'suggestion',
    priority: 'medium',
    phoneNumber: '+254710101010',
    description: 'Need more public parks and green spaces.',
    message: 'Need more public parks and green spaces.',
    department: {
      departmentId: 'urban-planning',
      subDepartmentId: 'parks',
      serviceId: 'green-spaces'
    },
    county: 'Kisumu',
    rating: 3,
    comment: 'Need more public parks and green spaces.',
    category: 'Environment',
    createdAt: '2025-03-12T15:30:00Z',
    updatedAt: '2025-03-12T15:30:00Z',
    referenceNumber: 'REF-011',
    status: 'new',
    userId: 'user808'
  },
  {
    id: '12',
    type: 'feedback',
    priority: 'low',
    phoneNumber: '+254711111111',
    description: 'The county education program is excellent.',
    message: 'The county education program is excellent.',
    department: {
      departmentId: 'education',
      subDepartmentId: 'programs',
      serviceId: 'county-education'
    },
    county: 'Nakuru',
    rating: 5,
    comment: 'The county education program is excellent.',
    category: 'Education',
    createdAt: '2025-03-15T09:20:00Z',
    updatedAt: '2025-03-15T09:20:00Z',
    referenceNumber: 'REF-012',
    status: 'resolved',
    userId: 'user909'
  }
];

export const mockCountyStats = {
  'Nairobi': { count: 2, averageRating: 3.0 },
  'Mombasa': { count: 2, averageRating: 3.5 },
  'Kisumu': { count: 2, averageRating: 4.0 },
  'Nakuru': { count: 2, averageRating: 3.5 },
  'Eldoret': { count: 1, averageRating: 4.0 },
  'Kakamega': { count: 1, averageRating: 3.0 },
  'Kisii': { count: 1, averageRating: 1.0 },
  'Meru': { count: 1, averageRating: 5.0 }
};
