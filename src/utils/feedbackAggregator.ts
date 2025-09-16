import type { Feedback } from '../types/feedback';
import type { CountyData } from '../types/map';

export function aggregateFeedbackByCounty(feedbacks: Feedback[]): Record<string, CountyData> {
  const countyData: Record<string, CountyData> = {};
  
  // Initialize all counties with zero counts
  const kenyanCounties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Nyeri', 'Thika', 'Malindi',
    'Kitale', 'Garissa', 'Kakamega', 'Kisii', 'Meru', 'Nanyuki', 'Narok', 'Nyahururu'
  ];
  
  kenyanCounties.forEach(county => {
    countyData[county.toLowerCase()] = {
      name: county,
      count: 0,
      issues: [],
      color: '#e0e0e0'
    };
  });
  
  // Count feedback by county
  feedbacks.forEach(feedback => {
    if (feedback.location?.county) {
      const county = feedback.location.county.toLowerCase();
      if (!countyData[county]) {
        countyData[county] = {
          name: feedback.location.county,
          count: 0,
          issues: [],
          color: '#e0e0e0'
        };
      }
      
      countyData[county].count += 1;
      
      // Add unique issues
      const issue = feedback.department?.serviceName || 'General';
      if (!countyData[county].issues.includes(issue)) {
        countyData[county].issues.push(issue);
      }
    }
  });
  
  // Calculate max count for color scaling
  const maxCount = Math.max(...Object.values(countyData).map(d => d.count), 1);
  
  // Update colors based on count
  Object.values(countyData).forEach(data => {
    data.color = getColorForCount(data.count, maxCount);
  });
  
  return countyData;
}

function getColorForCount(count: number, maxCount: number): string {
  if (count === 0) return '#e0e0e0';
  const intensity = Math.min(0.9, count / (maxCount || 1));
  const hue = 120 - (intensity * 120); // Green (120) to Red (0)
  return `hsl(${hue}, 100%, ${90 - (intensity * 40)}%)`;
}

// Get summary statistics for the dashboard
export function getFeedbackStats(feedbacks: Feedback[]) {
  const total = feedbacks.length;
  const byCounty: Record<string, number> = {};
  const byDepartment: Record<string, number> = {};
  const byStatus: Record<string, number> = {};
  
  feedbacks.forEach(feedback => {
    // Count by county
    const county = feedback.location?.county || 'Unknown';
    byCounty[county] = (byCounty[county] || 0) + 1;
    
    // Count by department
    const dept = feedback.department?.departmentName || 'Unknown';
    byDepartment[dept] = (byDepartment[dept] || 0) + 1;
    
    // Count by status
    byStatus[feedback.status] = (byStatus[feedback.status] || 0) + 1;
  });
  
  return {
    total,
    byCounty,
    byDepartment,
    byStatus,
    lastUpdated: new Date().toISOString()
  };
}
