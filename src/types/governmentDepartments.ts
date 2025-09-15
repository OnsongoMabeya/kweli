// Base types for the hierarchical structure
export interface Department {
  id: string;
  name: string;
  subDepartments: SubDepartment[];
}

export interface SubDepartment {
  id: string;
  name: string;
  services: Service[];
}

export interface Service {
  id: string;
  name: string;
  commonIssues: string[];
}

// Government departments data
export const governmentDepartments: Department[] = [
  {
    id: 'interior',
    name: 'Ministry of Interior & National Administration',
    subDepartments: [
      {
        id: 'national-id',
        name: 'National ID & Civil Registration',
        services: [
          {
            id: 'birth-certificate',
            name: 'Birth Certificate Application',
            commonIssues: [
              'Delay in processing',
              'Wrong details printed',
              'Portal errors during application',
              'Paid but certificate not issued'
            ]
          },
          {
            id: 'national-id',
            name: 'National ID Application',
            commonIssues: [
              'Delay in issuance',
              'Lost ID replacement issues',
              'Errors in details (name, DOB)'
            ]
          }
        ]
      },
      {
        id: 'immigration',
        name: 'Immigration & Passports',
        services: [
          {
            id: 'passport-application',
            name: 'New Passport Application',
            commonIssues: [
              'Long delays',
              'Rejected application without reason'
            ]
          },
          {
            id: 'passport-renewal',
            name: 'Passport Renewal',
            commonIssues: [
              'Payment made but not processed',
              'Lost passport replacement delays'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'education',
    name: 'Ministry of Education',
    subDepartments: [
      {
        id: 'primary-secondary',
        name: 'Primary & Secondary Education',
        services: [
          {
            id: 'kcpe-kcse',
            name: 'KCPE/KCSE Registration',
            commonIssues: [
              'Incorrect candidate details',
              'Missing index numbers'
            ]
          }
        ]
      },
      {
        id: 'higher-education',
        name: 'Higher Education',
        services: [
          {
            id: 'kuccps',
            name: 'KUCCPS Placement',
            commonIssues: [
              'Wrong allocation',
              'Portal errors'
            ]
          }
        ]
      }
    ]
  },
  // Add more departments following the same structure
];

// Helper function to find a department by ID
export function findDepartmentById(id: string): Department | undefined {
  return governmentDepartments.find(dept => dept.id === id);
}

// Helper function to find a sub-department by ID
export function findSubDepartment(departmentId: string, subDepartmentId: string): SubDepartment | undefined {
  const department = findDepartmentById(departmentId);
  return department?.subDepartments.find(sub => sub.id === subDepartmentId);
}

// Helper function to find a service by ID
export function findService(departmentId: string, subDepartmentId: string, serviceId: string): Service | undefined {
  const subDepartment = findSubDepartment(departmentId, subDepartmentId);
  return subDepartment?.services.find(service => service.id === serviceId);
}
