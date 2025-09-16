import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import type { Feature, Geometry, GeoJsonProperties } from 'geojson';

interface CountyData {
  count: number;
  // Add other properties as needed
}

interface SimpleKenyaMapProps {
  data?: Record<string, CountyData>;
  selectedCounty?: string | null;
  onCountyClick?: (county: string) => void;
  width?: number | string;
  height?: number | string;
}

const SimpleKenyaMap: React.FC<SimpleKenyaMapProps> = ({
  data = {},
  selectedCounty = null,
  onCountyClick = () => {},
  width = '100%',
  height = '500px'
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [counties, setCounties] = React.useState<Array<Feature<Geometry, GeoJsonProperties>>>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [dimensions, setDimensions] = React.useState({ 
    width: typeof width === 'number' ? width : 800, 
    height: typeof height === 'number' ? height : 600 
  });

  // Load GeoJSON data
  useEffect(() => {
    const loadGeoJson = async () => {
      try {
        console.log('Loading GeoJSON from /data/kenya-counties-complete.geojson');
        const response = await fetch('/data/kenya-counties-complete.geojson');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const geoData = await response.json();
        console.log('GeoJSON loaded successfully', { 
          featureCount: geoData.features?.length || 0,
          type: geoData.type
        });
        
        if (!geoData.features || !Array.isArray(geoData.features)) {
          throw new Error('Invalid GeoJSON format: missing features array');
        }
        
        setCounties(geoData.features);
        setLoading(false);
      } catch (err) {
        console.error('Error loading GeoJSON:', err);
        setError(`Failed to load map data: ${err instanceof Error ? err.message : String(err)}`);
        setLoading(false);
      }
    };

    loadGeoJson();
  }, []);

  // Set up projection and path generator
  const { pathGenerator } = useMemo(() => {
    try {
      console.log('Setting up projection and path generator');
      
      if (counties.length === 0) {
        console.log('No counties data available yet');
        return { pathGenerator: null };
      }

      // Log first county for debugging
      console.log('First county data:', {
        type: counties[0].type,
        properties: counties[0].properties,
        geometryType: counties[0].geometry?.type
      });

      // Calculate bounds of all features
      const featureCollection = {
        type: 'FeatureCollection',
        features: counties
      };
      
      console.log('Calculating bounds for feature collection');
      const bounds = d3.geoBounds(featureCollection as any);
      console.log('Map bounds:', bounds);

      // Calculate center and scale
      const center: [number, number] = [
        (bounds[0][0] + bounds[1][0]) / 2,
        (bounds[0][1] + bounds[1][1]) / 2
      ];
      console.log('Map center:', center);

      // Create a projection that fits Kenya
      const projection = d3.geoMercator()
        .center(center)
        .scale(1)
        .translate([0, 0]);

      // Create a temporary path to calculate bounds
      console.log('Creating temporary path for bounds calculation');
      const tempPath = d3.geoPath().projection(projection);
      const boundsPath = tempPath.bounds(featureCollection as any);
      console.log('Path bounds:', boundsPath);

      // Calculate scale and translate to fit the map
      const scale = 0.95 / Math.max(
        (boundsPath[1][0] - boundsPath[0][0]) / dimensions.width,
        (boundsPath[1][1] - boundsPath[0][1]) / dimensions.height
      );
      console.log('Calculated scale:', scale);

      // Update projection with calculated scale and center
      projection
        .scale(scale)
        .translate([dimensions.width / 2, dimensions.height / 2]);

      // Create final path generator
      const pathGenerator = d3.geoPath().projection(projection);
      
      // Log first path for debugging
      if (counties[0]) {
        try {
          const firstPath = pathGenerator(counties[0]);
          console.log('Generated first path:', firstPath?.substring(0, 50) + '...');
        } catch (e) {
          console.error('Error generating first path:', e);
        }
      }

      console.log('Path generator created successfully');
      return { pathGenerator };
    } catch (error) {
      console.error('Error setting up projection and path generator:', error);
      return { projection: null, pathGenerator: null };
    }
  }, [counties, dimensions]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (typeof width === 'string' && width.endsWith('%')) {
        const container = svgRef.current?.parentElement;
        if (container) {
          setDimensions({
            width: container.clientWidth,
            height: container.clientHeight
          });
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [width, height]);

  // Handle county click
  const handleCountyClick = useCallback((countyName: string) => {
    onCountyClick(countyName);
  }, [onCountyClick]);

  // Render the map with loading and error states
  if (loading) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height={dimensions.height}>
        <CircularProgress />
        <Typography variant="body2" color="textSecondary" mt={2}>
          Loading map data...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height={dimensions.height}>
        <Typography color="error" variant="h6" gutterBottom>
          Error loading map
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {error}
        </Typography>
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  if (counties.length === 0) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height={dimensions.height}>
        <Typography variant="h6" color="textSecondary">
          No map data available
        </Typography>
        <Typography variant="body2" color="textSecondary" mt={1}>
          Please check your internet connection and try again.
        </Typography>
      </Box>
    );
  }

  console.log('Rendering map with dimensions:', dimensions);
  console.log('Number of counties to render:', counties.length);
  console.log('First county properties:', counties[0]?.properties);

  return (
    <Box position="relative" width={width} height={height}>
      <Box position="absolute" top={8} left={8} zIndex={1} bgcolor="rgba(255,255,255,0.8)" p={1} borderRadius={1}>
        <Typography variant="caption">
          {counties.length} counties loaded | {Object.keys(data).length} data points
        </Typography>
      </Box>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        style={{ 
          display: 'block',
          backgroundColor: '#f0f8ff',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
        preserveAspectRatio="xMidYMid meet"
      >
        <rect width="100%" height="100%" fill="#f0f8ff" rx="8" />
        
        {/* Background pattern */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e0e8f0" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {counties.map((county, index) => {
          const countyName = county.properties?.name;
          if (!countyName) {
            console.warn('County missing name property at index', index, county);
            return null;
          }
          
          const countyData = data[countyName];
          const isSelected = countyName === selectedCounty;
          
          // Get the path data
          let pathData;
          try {
            pathData = pathGenerator?.(county);
            if (!pathData) {
              console.warn(`No path data for ${countyName}`, county);
              return null;
            }
          } catch (err) {
            console.error(`Error generating path for ${countyName}:`, err);
            return null;
          }
          
          return (
            <g key={`${countyName}-${index}`}>
              <path
                d={pathData || ''}
                fill={countyData ? '#4caf50' : '#e0e0e0'}
                stroke="#333"
                strokeWidth={isSelected ? 2 : 0.5}
                fillOpacity={0.7}
                strokeOpacity={0.9}
                onClick={() => handleCountyClick(countyName)}
                style={{ cursor: 'pointer' }}
              />
              {/* Add county name label */}
              {pathData && (
                <text
                  x={pathGenerator?.centroid(county)[0]}
                  y={pathGenerator?.centroid(county)[1]}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#333"
                >
                  {countyName}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </Box>
  );
};

export default SimpleKenyaMap;
