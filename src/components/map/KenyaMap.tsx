import React, { useMemo } from 'react';
import { Box, SvgIcon, Typography, Tooltip } from '@mui/material';
import type { Theme } from '@mui/material/styles';

interface CountyData {
  name: string;
  count: number;
  issues: string[];
  color: string;
}

interface KenyaMapProps {
  data: Record<string, CountyData>;
  onCountyClick?: (county: string) => void;
  selectedCounty?: string | null;
  theme?: Theme;
}

const getColorForCount = (count: number, maxCount: number): string => {
  if (count === 0) return '#e0e0e0';
  const intensity = Math.min(0.9, count / (maxCount || 1));
  const hue = 120 - (intensity * 120); // Green (120) to Red (0)
  return `hsl(${hue}, 100%, ${90 - (intensity * 40)}%)`;
};

const KenyaMap: React.FC<KenyaMapProps> = ({ data, onCountyClick, selectedCounty }) => {
  const maxCount = useMemo(() => {
    return Math.max(...Object.values(data).map(d => d.count), 1);
  }, [data]);

  // Simplified SVG path for Kenya with county boundaries
  // In a real app, you'd want to use a proper GeoJSON or topojson file
  const kenyaPaths = {
    nairobi: 'M300,150 L310,145 L315,155 L305,160 Z',
    mombasa: 'M350,300 L360,295 L365,305 L355,310 Z',
    kisumu: 'M200,250 L210,245 L215,255 L205,260 Z',
    // Add more counties as needed
  };

  const handleCountyClick = (county: string) => {
    if (onCountyClick) {
      onCountyClick(county);
    }
  };

  return (
    <Box position="relative" width="100%" height="500px">
      <SvgIcon
        component={({ children, ...props }) => (
          <svg
            viewBox="0 0 500 500"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            {...props}
          >
            {children}
          </svg>
        )}
      >
        {/* Background */}
        <rect x="0" y="0" width="500" height="500" fill="#f5f5f5" />
        
        {/* County paths */}
        {Object.entries(kenyaPaths).map(([countyId, path]) => {
          const countyData = data[countyId] || { count: 0, issues: [] };
          const fillColor = getColorForCount(countyData.count, maxCount);
          const isSelected = selectedCounty === countyId;
          
          return (
            <Tooltip
              key={countyId}
              title={
                <>
                  <Typography variant="subtitle2">{countyId}</Typography>
                  <Typography variant="body2">
                    Issues: {countyData.count}
                  </Typography>
                  {countyData.issues.length > 0 && (
                    <Box>
                      <Typography variant="caption">
                        {countyData.issues.join(', ')}
                      </Typography>
                    </Box>
                  )}
                </>
              }
              arrow
            >
              <path
                d={path}
                fill={fillColor}
                stroke="#ffffff"
                strokeWidth="1"
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  filter: isSelected ? 'drop-shadow(0 0 8px rgba(0,0,0,0.3))' : 'none',
                  transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                }}
                onClick={() => handleCountyClick(countyId)}
              />
            </Tooltip>
          );
        })}
        
        {/* Legend */}
        <g transform="translate(20, 20)">
          <rect x="0" y="0" width="200" height="100" fill="white" fillOpacity="0.8" rx="4" />
          <text x="10" y="20" fontSize="12" fontWeight="bold">Issues by County</text>
          <g transform="translate(10, 35)">
            <rect x="0" y="0" width="15" height="15" fill={getColorForCount(0, maxCount)} />
            <text x="20" y="12" fontSize="10">0</text>
          </g>
          <g transform="translate(10, 55)">
            <rect x="0" y="0" width="15" height="15" fill={getColorForCount(maxCount / 2, maxCount)} />
            <text x="20" y="12" fontSize="10">Medium</text>
          </g>
          <g transform="translate(10, 75)">
            <rect x="0" y="0" width="15" height="15" fill={getColorForCount(maxCount, maxCount)} />
            <text x="20" y="12" fontSize="10">High ({maxCount}+)</text>
          </g>
        </g>
      </SvgIcon>
    </Box>
  );
};

export default KenyaMap;
