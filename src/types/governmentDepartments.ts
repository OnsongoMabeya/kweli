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
// export const governmentDepartments: Department[] = [
//   {
//     id: 'interior',
//     name: 'Ministry of Interior & National Administration',
//     subDepartments: [
//       {
//         id: 'national-id',
//         name: 'National ID & Civil Registration',
//         services: [
//           {
//             id: 'birth-certificate',
//             name: 'Birth Certificate Application',
//             commonIssues: [
//               'Delay in processing',
//               'Wrong details printed',
//               'Portal errors during application',
//               'Paid but certificate not issued'
//             ]
//           },
//           {
//             id: 'national-id',
//             name: 'National ID Application',
//             commonIssues: [
//               'Delay in issuance',
//               'Lost ID replacement issues',
//               'Errors in details (name, DOB)'
//             ]
//           }
//         ]
//       },
//       {
//         id: 'immigration',
//         name: 'Immigration & Passports',
//         services: [
//           {
//             id: 'passport-application',
//             name: 'New Passport Application',
//             commonIssues: [
//               'Long delays',
//               'Rejected application without reason'
//             ]
//           },
//           {
//             id: 'passport-renewal',
//             name: 'Passport Renewal',
//             commonIssues: [
//               'Payment made but not processed',
//               'Lost passport replacement delays'
//             ]
//           }
//         ]
//       }
//     ]
//   },
//   {
//     id: 'education',
//     name: 'Ministry of Education',
//     subDepartments: [
//       {
//         id: 'primary-secondary',
//         name: 'Primary & Secondary Education',
//         services: [
//           {
//             id: 'kcpe-kcse',
//             name: 'KCPE/KCSE Registration',
//             commonIssues: [
//               'Incorrect candidate details',
//               'Missing index numbers'
//             ]
//           }
//         ]
//       },
//       {
//         id: 'higher-education',
//         name: 'Higher Education',
//         services: [
//           {
//             id: 'kuccps',
//             name: 'KUCCPS Placement',
//             commonIssues: [
//               'Wrong allocation',
//               'Portal errors'
//             ]
//           }
//         ]
//       }
//     ]
//   },
//   // Add more departments following the same structure
// ];

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
            id: 'national-id-application',
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
          },
          {
            id: 'helb',
            name: 'HELB Loan Application',
            commonIssues: [
              'Disbursement delays',
              'Portal downtime'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'health',
    name: 'Ministry of Health',
    subDepartments: [
      {
        id: 'hospitals',
        name: 'Hospitals & Clinics',
        services: [
          {
            id: 'admission',
            name: 'Hospital Admission',
            commonIssues: [
              'Delayed admission',
              'Lack of beds',
              'Mistreatment by staff'
            ]
          }
        ]
      },
      {
        id: 'nhif',
        name: 'NHIF & Insurance',
        services: [
          {
            id: 'nhif-registration',
            name: 'NHIF Registration',
            commonIssues: [
              'Rejected without explanation',
              'Portal errors'
            ]
          },
          {
            id: 'nhif-claims',
            name: 'Hospital Reimbursement',
            commonIssues: [
              'Claim rejected without explanation',
              'Delayed reimbursement'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'transport',
    name: 'Ministry of Transport & Infrastructure',
    subDepartments: [
      {
        id: 'ntsa',
        name: 'NTSA (Licensing & Registration)',
        services: [
          {
            id: 'driving-license',
            name: 'Driving License Application',
            commonIssues: [
              'Delays in Smart DL',
              'Wrong details on license'
            ]
          },
          {
            id: 'vehicle-registration',
            name: 'Motor Vehicle Registration',
            commonIssues: [
              'Delayed number plates',
              'Duplicate records'
            ]
          }
        ]
      },
      {
        id: 'roads',
        name: 'Roads & Highways',
        services: [
          {
            id: 'maintenance',
            name: 'Road Maintenance',
            commonIssues: [
              'Potholes',
              'Unfinished projects'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'finance',
    name: 'Ministry of Finance & National Treasury',
    subDepartments: [
      {
        id: 'kra',
        name: 'Kenya Revenue Authority',
        services: [
          {
            id: 'tax-filing',
            name: 'Tax Filing',
            commonIssues: [
              'Portal downtime',
              'Wrong penalties applied'
            ]
          },
          {
            id: 'pin-registration',
            name: 'PIN Registration',
            commonIssues: [
              'Delayed issuance',
              'Errors in details'
            ]
          }
        ]
      },
      {
        id: 'customs',
        name: 'Customs & Excise',
        services: [
          {
            id: 'cargo-clearance',
            name: 'Cargo Clearance',
            commonIssues: [
              'Excessive delays',
              'Unfair duty charges'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'lands',
    name: 'Ministry of Lands, Housing & Urban Development',
    subDepartments: [
      {
        id: 'land-registration',
        name: 'Land Registration',
        services: [
          {
            id: 'title-deeds',
            name: 'Title Deed Issuance',
            commonIssues: [
              'Delayed issuance',
              'Wrong details',
              'Double allocation'
            ]
          }
        ]
      },
      {
        id: 'housing',
        name: 'Housing & Affordable Housing Program',
        services: [
          {
            id: 'allocation',
            name: 'House Allocation',
            commonIssues: [
              'Unfair allocation',
              'Corruption in process'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'agriculture',
    name: 'Ministry of Agriculture, Livestock, Fisheries & Cooperatives',
    subDepartments: [
      {
        id: 'crop-production',
        name: 'Crop Production',
        services: [
          {
            id: 'fertilizer',
            name: 'Fertilizer Subsidy Program',
            commonIssues: [
              'Late distribution',
              'Corruption in allocation'
            ]
          }
        ]
      },
      {
        id: 'livestock',
        name: 'Livestock Development',
        services: [
          {
            id: 'vaccination',
            name: 'Animal Vaccination',
            commonIssues: [
              'Shortages',
              'Poor coordination'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'water',
    name: 'Ministry of Water, Sanitation & Irrigation',
    subDepartments: [
      {
        id: 'water-supply',
        name: 'Water Supply & Distribution',
        services: [
          {
            id: 'billing',
            name: 'Water Billing',
            commonIssues: [
              'Overbilling',
              'No water supply despite billing'
            ]
          }
        ]
      },
      {
        id: 'irrigation',
        name: 'Irrigation Schemes',
        services: [
          {
            id: 'scheme-maintenance',
            name: 'Scheme Maintenance',
            commonIssues: [
              'Non-functional canals',
              'Delayed repairs'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'environment',
    name: 'Ministry of Environment, Climate Change & Forestry',
    subDepartments: [
      {
        id: 'nema',
        name: 'National Environment Management Authority',
        services: [
          {
            id: 'licensing',
            name: 'Environmental Licensing',
            commonIssues: [
              'Delays in processing',
              'Unclear requirements'
            ]
          }
        ]
      },
      {
        id: 'forestry',
        name: 'Forestry & Kenya Forest Service',
        services: [
          {
            id: 'logging',
            name: 'Illegal Logging Reports',
            commonIssues: [
              'No action taken',
              'Delayed investigations'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'energy',
    name: 'Ministry of Energy & Petroleum',
    subDepartments: [
      {
        id: 'kplc',
        name: 'Kenya Power & Lighting Company',
        services: [
          {
            id: 'billing',
            name: 'Electricity Billing',
            commonIssues: [
              'Overbilling',
              'Meter errors'
            ]
          },
          {
            id: 'outages',
            name: 'Power Outages',
            commonIssues: [
              'Frequent blackouts',
              'Delayed reconnection'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'ict',
    name: 'Ministry of ICT & Digital Economy',
    subDepartments: [
      {
        id: 'ecitizen',
        name: 'eCitizen Services',
        services: [
          {
            id: 'payments',
            name: 'Payments',
            commonIssues: [
              'Payment failures',
              'Service delays'
            ]
          }
        ]
      },
      {
        id: 'huduma',
        name: 'Huduma Centres',
        services: [
          {
            id: 'queues',
            name: 'Service Queues',
            commonIssues: [
              'Long waiting times',
              'Unavailability of services'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'labour',
    name: 'Ministry of Labour & Social Protection',
    subDepartments: [
      {
        id: 'nssf',
        name: 'NSSF (National Social Security Fund)',
        services: [
          {
            id: 'contributions',
            name: 'Contributions',
            commonIssues: [
              'Errors in contribution records',
              'Withdrawal delays'
            ]
          }
        ]
      },
      {
        id: 'social-assistance',
        name: 'Social Assistance Programs',
        services: [
          {
            id: 'inua-jamii',
            name: 'Inua Jamii',
            commonIssues: [
              'Delayed payments',
              'Missing beneficiaries'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'tourism',
    name: 'Ministry of Tourism & Wildlife',
    subDepartments: [
      {
        id: 'tourism-promotion',
        name: 'Tourism Promotion',
        services: [
          {
            id: 'licensing',
            name: 'Tourism Licensing',
            commonIssues: [
              'Delays in approval',
              'Unclear requirements'
            ]
          }
        ]
      },
      {
        id: 'wildlife',
        name: 'Wildlife Services',
        services: [
          {
            id: 'human-wildlife',
            name: 'Human-Wildlife Conflict',
            commonIssues: [
              'No compensation provided',
              'Delayed response to reports'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'sports',
    name: 'Ministry of Sports, Culture & Arts',
    subDepartments: [
      {
        id: 'sports-development',
        name: 'Sports Development',
        services: [
          {
            id: 'stadiums',
            name: 'Stadium Projects',
            commonIssues: [
              'Delayed completion',
              'Poor quality facilities'
            ]
          }
        ]
      },
      {
        id: 'culture',
        name: 'Culture & Heritage',
        services: [
          {
            id: 'heritage-sites',
            name: 'Heritage Sites',
            commonIssues: [
              'Neglect',
              'Poor preservation'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'defence',
    name: 'Ministry of Defence',
    subDepartments: [
      {
        id: 'veterans',
        name: 'Veterans Affairs',
        services: [
          {
            id: 'pensions',
            name: 'Veterans Pensions',
            commonIssues: [
              'Delayed pensions',
              'Medical neglect'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'foreign-affairs',
    name: 'Ministry of Foreign Affairs',
    subDepartments: [
      {
        id: 'embassies',
        name: 'Embassies & Consulates',
        services: [
          {
            id: 'visa-services',
            name: 'Visa Services',
            commonIssues: [
              'Delays in processing',
              'Unclear requirements'
            ]
          }
        ]
      },
      {
        id: 'diaspora',
        name: 'Diaspora Affairs',
        services: [
          {
            id: 'support',
            name: 'Diaspora Support',
            commonIssues: [
              'Lack of assistance',
              'Unresponsive contacts'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'justice',
    name: 'Ministry of Justice & Attorney General',
    subDepartments: [
      {
        id: 'societies',
        name: 'Societies & NGOs',
        services: [
          {
            id: 'registration',
            name: 'NGO Registration',
            commonIssues: [
              'Delays in processing',
              'Unfair rejection'
            ]
          }
        ]
      },
      {
        id: 'public-trustee',
        name: 'Public Trustee Services',
        services: [
          {
            id: 'estate-management',
            name: 'Estate Management',
            commonIssues: [
              'Delays in release',
              'Lack of updates'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'judiciary',
    name: 'Judiciary',
    subDepartments: [
      {
        id: 'courts',
        name: 'Courts',
        services: [
          {
            id: 'case-backlog',
            name: 'Case Backlog',
            commonIssues: [
              'Delays in hearings',
              'Corruption allegations'
            ]
          }
        ]
      },
      {
        id: 'family-division',
        name: 'Family Division',
        services: [
          {
            id: 'child-custody',
            name: 'Child Custody Cases',
            commonIssues: [
              'Delayed rulings',
              'Unfair judgments'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'commissions',
    name: 'Independent Commissions',
    subDepartments: [
      {
        id: 'iebc',
        name: 'IEBC (Independent Electoral and Boundaries Commission)',
        services: [
          {
            id: 'voter-registration',
            name: 'Voter Registration',
            commonIssues: [
              'Errors in voter roll',
              'Missing details'
            ]
          }
        ]
      },
      {
        id: 'eacc',
        name: 'EACC (Ethics & Anti-Corruption Commission)',
        services: [
          {
            id: 'case-management',
            name: 'Corruption Case Management',
            commonIssues: [
              'Delayed investigations',
              'Weak enforcement'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'counties',
    name: 'County Governments',
    subDepartments: [
      {
        id: 'county-health',
        name: 'County Health Services',
        services: [
          {
            id: 'drug-supply',
            name: 'Drug Supply',
            commonIssues: [
              'Stockouts',
              'Expired medicines'
            ]
          }
        ]
      },
      {
        id: 'county-revenue',
        name: 'County Revenue Collection',
        services: [
          {
            id: 'licenses',
            name: 'Business Licenses',
            commonIssues: [
              'Overcharging',
              'Corruption in issuance'
            ]
          }
        ]
      }
    ]
  }
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
