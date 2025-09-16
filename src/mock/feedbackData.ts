import { Feedback } from "@/types/feedback";

export const mockFeedbacks: Feedback[] = [
  {
    id: '1',
    county: 'Nairobi',
    rating: 4,
    comment: 'Great healthcare services but could use more specialists in public hospitals.',
    category: 'Healthcare',
    date: '2025-01-15T10:30:00Z',
    status: 'pending',
    userId: 'user123'
  },
  {
    id: '2',
    county: 'Mombasa',
    rating: 3,
    comment: 'Roads need urgent maintenance, especially in the CBD area.',
    category: 'Infrastructure',
    date: '2025-01-18T14:45:00Z',
    status: 'pending',
    userId: 'user456'
  },
  {
    id: '3',
    county: 'Kisumu',
    rating: 5,
    comment: 'Excellent work on the new lakefront development!',
    category: 'Tourism',
    date: '2025-02-02T09:15:00Z',
    status: 'approved',
    userId: 'user789'
  },
  {
    id: '4',
    county: 'Nakuru',
    rating: 2,
    comment: 'Garbage collection services are inconsistent in my neighborhood.',
    category: 'Sanitation',
    date: '2025-02-10T16:20:00Z',
    status: 'pending',
    userId: 'user101'
  },
  {
    id: '5',
    county: 'Eldoret',
    rating: 4,
    comment: 'The new sports complex is world-class. Great job!',
    category: 'Sports',
    date: '2025-02-15T11:00:00Z',
    status: 'approved',
    userId: 'user202'
  },
  {
    id: '6',
    county: 'Kakamega',
    rating: 3,
    comment: 'Need more street lighting in the town center.',
    category: 'Security',
    date: '2025-02-20T19:30:00Z',
    status: 'pending',
    userId: 'user303'
  },
  {
    id: '7',
    county: 'Kisii',
    rating: 1,
    comment: 'Water shortage has been ongoing for weeks now.',
    category: 'Water',
    date: '2025-02-22T08:45:00Z',
    status: 'pending',
    userId: 'user404'
  },
  {
    id: '8',
    county: 'Meru',
    rating: 5,
    comment: 'The new market has transformed our local economy.',
    category: 'Economy',
    date: '2025-03-01T13:20:00Z',
    status: 'approved',
    userId: 'user505'
  },
  {
    id: '9',
    county: 'Nairobi',
    rating: 2,
    comment: 'Public transport system needs improvement.',
    category: 'Transport',
    date: '2025-03-05T17:10:00Z',
    status: 'pending',
    userId: 'user606'
  },
  {
    id: '10',
    county: 'Mombasa',
    rating: 4,
    comment: 'The new beach cleanup initiative is impressive!',
    category: 'Environment',
    date: '2025-03-10T10:00:00Z',
    status: 'approved',
    userId: 'user707'
  },
  {
    id: '11',
    county: 'Kisumu',
    rating: 3,
    comment: 'Need more public parks and green spaces.',
    category: 'Environment',
    date: '2025-03-12T15:30:00Z',
    status: 'pending',
    userId: 'user808'
  },
  {
    id: '12',
    county: 'Nakuru',
    rating: 5,
    comment: 'The county education program is excellent.',
    category: 'Education',
    date: '2025-03-15T09:20:00Z',
    status: 'approved',
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
