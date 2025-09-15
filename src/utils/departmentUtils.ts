import { governmentDepartments, type Department } from '../types/governmentDepartments';

// 1. Utility Functions

export function findDepartmentById(id: string): Department | undefined {
  return governmentDepartments.find(dept => dept.id === id);
}

export function findSubDepartment(departmentId: string, subDepartmentId: string) {
  const dept = findDepartmentById(departmentId);
  return dept?.subDepartments.find(sub => sub.id === subDepartmentId);
}

export function findService(departmentId: string, subDepartmentId: string, serviceId: string) {
  const subDept = findSubDepartment(departmentId, subDepartmentId);
  return subDept?.services.find(service => service.id === serviceId);
}

export function getAllDepartments() {
  return governmentDepartments.map(({ id, name }) => ({ id, name }));
}

export function getSubDepartments(departmentId: string) {
  const dept = findDepartmentById(departmentId);
  return dept?.subDepartments.map(({ id, name }) => ({ id, name })) || [];
}

export function getServices(departmentId: string, subDepartmentId: string) {
  const subDept = findSubDepartment(departmentId, subDepartmentId);
  return subDept?.services.map(({ id, name }) => ({ id, name })) || [];
}

export function searchDepartments(query: string): Department[] {
  const lowerQuery = query.toLowerCase();
  return governmentDepartments.filter(
    dept => dept.name.toLowerCase().includes(lowerQuery) ||
      dept.subDepartments.some(
        sub => sub.name.toLowerCase().includes(lowerQuery) ||
          sub.services.some(
            service => service.name.toLowerCase().includes(lowerQuery)
          )
      )
  );
}

// 2. Reporting Interface
type ReportFilter = {
  departmentId?: string;
  subDepartmentId?: string;
  serviceId?: string;
  issue?: string;
};

export function generateReport(filters: ReportFilter = {}) {
  let result = governmentDepartments;

  // Apply filters
  if (filters.departmentId) {
    result = result.filter(dept => dept.id === filters.departmentId);
  }

  // Process each department
  const report = result.map(department => {
    const subDepts = department.subDepartments
      .filter(subDept => !filters.subDepartmentId || subDept.id === filters.subDepartmentId)
      .map(subDept => {
        const services = subDept.services
          .filter(service => !filters.serviceId || service.id === filters.serviceId)
          .map(service => {
            const issues = filters.issue
              ? service.commonIssues.filter(issue => issue.toLowerCase().includes(filters.issue!.toLowerCase()))
              : service.commonIssues;
            
            return {
              serviceId: service.id,
              serviceName: service.name,
              issueCount: issues.length,
              issues
            };
          });

        return {
          subDepartmentId: subDept.id,
          subDepartmentName: subDept.name,
          services,
          totalIssues: services.reduce((sum, service) => sum + service.issueCount, 0)
        };
      });

    return {
      departmentId: department.id,
      departmentName: department.name,
      subDepartments: subDepts,
      totalIssues: subDepts.reduce((sum, subDept) => sum + subDept.totalIssues, 0)
    };
  });

  return report;
}

// 3. Enhanced Data Structure Helpers
type DepartmentStats = {
  departmentId: string;
  departmentName: string;
  subDepartmentCount: number;
  serviceCount: number;
  commonIssues: string[];
};

export function getDepartmentStats(): DepartmentStats[] {
  return governmentDepartments.map(dept => {
    const allServices = dept.subDepartments.flatMap(sub => sub.services);
    const allIssues = allServices.flatMap(service => service.commonIssues);
    
    return {
      departmentId: dept.id,
      departmentName: dept.name,
      subDepartmentCount: dept.subDepartments.length,
      serviceCount: allServices.length,
      commonIssues: [...new Set(allIssues)] // Remove duplicates
    };
  });
}

// Example usage:
/*
// Get all departments
const allDepts = getAllDepartments();

// Get sub-departments for a department
const subDepts = getSubDepartments('interior');

// Get services for a sub-department
const services = getServices('interior', 'national-id');

// Generate a report
const report = generateReport({
  departmentId: 'interior',
  issue: 'delay' // Optional: filter by issue
});

// Get department statistics
const stats = getDepartmentStats();
*/
