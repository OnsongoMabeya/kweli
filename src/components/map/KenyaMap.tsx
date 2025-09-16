import React, { useEffect, useRef, useMemo, useCallback, useState } from 'react';
import * as d3 from 'd3';
import type { Feature, Geometry } from 'geojson';
import { Box, CircularProgress, Typography, Button } from '@mui/material';

// Define types
interface CountyData {
  count: number;
  // Add other properties as needed
}

// Define the structure of our county properties
interface CountyProperties {
  name: string;
  code: number;
  [key: string]: any; // Allow additional properties
}

type CountyFeature = Feature<Geometry, CountyProperties>;

interface KenyaMapProps {
  data?: Record<string, CountyData>;
  selectedCounty?: string | null;
  onCountyClick?: (county: string) => void;
  width?: number | string;
  height?: number | string;
}

const KenyaMap: React.FC<KenyaMapProps> = ({
  data = {},
  selectedCounty = null,
  onCountyClick = () => {},
  width = '100%',
  height = '500px'
}) => {
  // State for map data and UI
  const [dimensions, setDimensions] = useState({ 
    width: typeof width === 'number' ? width : 800, 
    height: typeof height === 'number' ? height : 600 
  });
  const [counties, setCounties] = useState<CountyFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCounty, setHoveredCounty] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(d3.zoomIdentity);
  
  // Handle window resize
  useEffect(() => {
    const updateDimensions = () => {
      if (typeof width === 'string' || typeof height === 'string') {
        const container = svgRef.current?.parentElement;
        if (container) {
          setDimensions({
            width: container.clientWidth,
            height: container.clientHeight
          });
        }
      }
    };

    // Initial dimensions
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [width, height]);

  // Load counties data
  useEffect(() => {
    const loadCounties = async () => {
      try {
        setLoading(true);
        console.log('Fetching GeoJSON data...');
        const response = await fetch('/data/kenya-counties.geojson');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const geoData = await response.json() as { 
          type: string;
          features: Array<CountyFeature>;
        };
        
        console.log('GeoJSON data loaded:', { 
          type: geoData.type, 
          features: geoData.features?.length || 0 
        });
        
        if (!geoData?.features?.length) {
          throw new Error('No features found in GeoJSON');
        }
        
        // Ensure each feature has the required properties
        const validFeatures = geoData.features
          .filter(feature => feature.properties?.name && feature.properties?.code)
          .map(feature => ({
            ...feature,
            properties: {
              ...feature.properties
            }
          }));
        
        setCounties(validFeatures);
        setError(null);
      } catch (err) {
        console.error('Error loading counties:', err);
        setError(`Failed to load map data: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    loadCounties();
  }, []);

  // Color scale for the map
  const colorScale = useMemo(() => {
    const counts = Object.values(data).map(d => d?.count || 0);
    const maxCount = Math.max(1, ...counts);
    return d3.scaleSequential(d3.interpolateYlOrRd)
      .domain([0, maxCount]);
  }, [data]);

  // Set up D3 projection
  const projection = useMemo(() => {
    console.log('Setting up projection with dimensions:', dimensions);
    
    if (!counties.length) {
      return d3.geoMercator()
        .center([37.9062, 0.5])
        .scale(5000)
        .translate([dimensions.width / 2, dimensions.height / 2]);
    }
    
    // Log sample county data for debugging
    const firstCounty = counties[0];
    if (firstCounty) {
      console.log('Sample county data:', {
        name: firstCounty.properties?.name,
        type: firstCounty.geometry.type,
        hasCoordinates: 'coordinates' in firstCounty.geometry
      });
    }

    // Create a simpler projection for testing
    const proj = d3.geoMercator()
      .center([37.9062, 0.5]) // Center on Kenya
      .scale(5000) // Fixed scale
      .translate([dimensions.width / 2, dimensions.height / 2]);
    
    // Debug: Log projection details
    console.log('Initial projection:', {
      center: proj.center(),
      scale: proj.scale(),
      translate: proj.translate()
    });
    
    // Debug: Log first county's coordinates
    if (counties.length > 0) {
      const firstCounty = counties[0];
      const geometry = firstCounty.geometry as any; // Type assertion for coordinates access
      console.log('First county:', {
        name: firstCounty.properties?.name,
        type: firstCounty.geometry.type,
        coordinates: geometry.coordinates
      });
    }
    
    return proj;
  }, [counties, dimensions]);

  // Set up zoom behavior
  useEffect(() => {
    if (!svgRef.current) return;

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .on('zoom', (event) => {
        setTransform(event.transform);
      });

    d3.select(svgRef.current).call(zoom);
    
    return () => {
      if (svgRef.current) {
        d3.select(svgRef.current).on('.zoom', null);
      }
    };
  }, [dimensions]);

  // Create path generator with the current transform applied
  const pathGenerator = useMemo(() => {
    if (!projection) return () => '';
    
    // Use the base projection for now, without transform
    const path = d3.geoPath().projection(projection);
    
    // Debug: Log path for first county
    if (counties.length > 0) {
      const firstCounty = counties[0];
      const pathData = path(firstCounty);
      console.log('First county path:', pathData ? pathData.substring(0, 100) + '...' : 'No path data');
    }
    
    return path;
  }, [projection, transform, counties]);

  // Handle county interactions
  const handleCountyClick = useCallback((countyName: string) => {
    onCountyClick(countyName);
  }, [onCountyClick]);

  // Handle mouse enter/leave directly in the path element to avoid extra callbacks

  // Handle mouse move for tooltip positioning
  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (!tooltipRef.current) return;
    
    const tooltip = tooltipRef.current;
    const x = event.clientX;
    const y = event.clientY;
    
    tooltip.style.left = `${x + 10}px`;
    tooltip.style.top = `${y + 10}px`;
  }, []);

  // Zoom handlers
  const zoomIn = useCallback(() => {
    if (!svgRef.current) return;
    d3.select(svgRef.current)
      .transition()
      .call(d3.zoom<SVGSVGElement, unknown>().scaleBy, 1.5);
  }, []);

  const zoomOut = useCallback(() => {
    if (!svgRef.current) return;
    d3.select(svgRef.current)
      .transition()
      .call(d3.zoom<SVGSVGElement, unknown>().scaleBy, 0.75);
  }, []);

  const resetZoom = useCallback(() => {
    if (!svgRef.current) return;
    d3.select(svgRef.current)
      .transition()
      .call(d3.zoom<SVGSVGElement, unknown>().transform, d3.zoomIdentity);
  }, []);

  // Render error state
  if (error) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100%"
        bgcolor="error.light"
        color="error.contrastText"
        p={2}
        borderRadius={1}
      >
        <Typography variant="body1" align="center">
          {error}
        </Typography>
      </Box>
    );
  }

  // Render loading state
  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Debug rectangle to show the SVG viewport
  const debugViewport = (
    <rect
      x="0"
      y="0"
      width={dimensions.width}
      height={dimensions.height}
      fill="none"
      stroke="red"
      strokeWidth="2"
      strokeDasharray="5,5"
    />
  );

  // Render the map
  console.log('Rendering map with', counties.length, 'counties');
  console.log('Map dimensions:', dimensions);

  return (
    <Box 
      width="100%" 
      height="100%" 
      border="1px solid #ddd"
      overflow="hidden"
      position="relative"
      bgcolor="#f5f5f5"
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        style={{ 
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          cursor: 'move'
        }}
        preserveAspectRatio="xMidYMid meet"
      >
        <g>
          {/* Background */}
          <rect 
            x="0" 
            y="0" 
            width={dimensions.width} 
            height={dimensions.height} 
            fill="#f0f8ff"
          />
          
          {/* Debug: Center point */}
          <circle 
            cx={dimensions.width / 2} 
            cy={dimensions.height / 2} 
            r="5" 
            fill="red" 
            fillOpacity="0.5"
          />
          
          {/* Debug: Viewport outline */}
          {debugViewport}
          
          {/* Render counties */}
          {counties.map((county, index) => {
            const countyName = county.properties?.name;
            if (!countyName) {
              console.warn('County feature missing name property:', county);
              return null;
            }
            
            const countyData = data[countyName];
            const isSelected = countyName === selectedCounty;
            const isHovered = countyName === hoveredCounty;
            
            try {
              const pathData = pathGenerator(county);
              if (!pathData) {
                console.warn(`No path data for county: ${countyName}`, county);
                return null;
              }
              
              console.log(`Rendering county ${countyName} with path:`, pathData.substring(0, 50) + '...');
              
              return (
                <path
                  key={`${countyName}-${index}`}
                  d={pathData}
                  fill={countyData ? colorScale(countyData.count) : '#e0e0e0'}
                  stroke="#333"
                  strokeWidth={isSelected || isHovered ? 2 : 0.5}
                  opacity={isHovered ? 0.8 : 1}
                  onClick={() => handleCountyClick(countyName)}
                  onMouseEnter={() => setHoveredCounty(countyName)}
                  onMouseLeave={() => setHoveredCounty(null)}
                  onMouseMove={handleMouseMove}
                  style={{ 
                    cursor: 'pointer',
                    vectorEffect: 'non-scaling-stroke',
                    transition: 'opacity 0.2s, stroke-width 0.2s'
                  }}
                />
              );
            } catch (err) {
              console.error(`Error rendering county ${countyName}:`, err, county);
              return null;
            }
          })}
        </g>
        
        {/* No data message */}
        {counties.length === 0 && (
          <text 
            x="50%" 
            y="50%" 
            textAnchor="middle" 
            fill="#666"
            style={{
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            No map data available
          </text>
        )}
      </svg>
      
      {/* Zoom controls */}
      <Box
        position="absolute"
        top={16}
        right={16}
        zIndex={1}
        display="flex"
        flexDirection="column"
        gap={1}
        bgcolor="background.paper"
        p={1}
        borderRadius={1}
        boxShadow={2}
      >
        <Button 
          variant="contained" 
          size="small" 
          onClick={zoomIn}
          sx={{ minWidth: 'auto', padding: '4px 8px' }}
        >
          +
        </Button>
        <Button 
          variant="contained" 
          size="small" 
          onClick={zoomOut}
          sx={{ minWidth: 'auto', padding: '4px 8px' }}
        >
          -
        </Button>
        <Button 
          variant="contained" 
          size="small" 
          onClick={resetZoom}
          sx={{ minWidth: 'auto', padding: '4px 8px' }}
        >
          Reset
        </Button>
      </Box>
      
      <Box 
        width="100%" 
        height="100%" 
        border="1px solid #ddd"
        overflow="hidden"
        position="relative"
        bgcolor="#f5f5f5"
      >
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          style={{ 
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            cursor: 'move'
          }}
          preserveAspectRatio="xMidYMid meet"
        >
          <g>
            {/* Background */}
            <rect 
              x="0" 
              y="0" 
              width={dimensions.width} 
              height={dimensions.height} 
              fill="#f0f8ff"
            />
            
            {/* Debug: Center point */}
            <circle 
              cx={dimensions.width / 2} 
              cy={dimensions.height / 2} 
              r="5" 
              fill="red" 
              fillOpacity="0.5"
            />
            
            {/* Debug: Viewport outline */}
            <rect
              x="0"
              y="0"
              width={dimensions.width}
              height={dimensions.height}
              fill="none"
              stroke="red"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            
            {/* Debug: Center point */}
            <circle 
              cx={dimensions.width / 2} 
              cy={dimensions.height / 2} 
              r="5" 
              fill="red" 
              fillOpacity="0.5"
            />
            
            {/* Debug: Viewport outline */}
            {debugViewport}
            
            {/* Render counties */}
            {counties.map((county, index) => {
              const countyName = county.properties?.name;
              if (!countyName) {
                console.warn('County feature missing name property:', county);
                return null;
              }
              
              const countyData = data[countyName];
              const isSelected = countyName === selectedCounty;
              const isHovered = countyName === hoveredCounty;
              
              try {
                const pathData = pathGenerator(county);
                if (!pathData) {
                  console.warn(`No path data for county: ${countyName}`, county);
                  return null;
                }
                
                console.log(`Rendering county ${countyName} with path:`, pathData.substring(0, 50) + '...');
                
                return (
                  <path
                    key={`${countyName}-${index}`}
                    d={pathData}
                    fill={countyData ? colorScale(countyData.count) : '#e0e0e0'}
                    stroke="#333"
                    strokeWidth={isSelected || isHovered ? 2 : 0.5}
                    opacity={isHovered ? 0.8 : 1}
                    onClick={() => handleCountyClick(countyName)}
                    onMouseEnter={() => setHoveredCounty(countyName)}
                    onMouseLeave={() => setHoveredCounty(null)}
                    onMouseMove={handleMouseMove}
                    style={{ 
                      cursor: 'pointer',
                      vectorEffect: 'non-scaling-stroke',
                      transition: 'opacity 0.2s, stroke-width 0.2s'
                    }}
                  />
                );
              } catch (err) {
                console.error(`Error rendering county ${countyName}:`, err, county);
                return null;
              }
            })}
          </g>
          
          {/* No data message */}
          {counties.length === 0 && (
            <text 
              x="50%" 
              y="50%" 
              textAnchor="middle" 
              fill="#666"
              style={{
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              No map data available
            </text>
          )}
        </svg>
        
        {/* Tooltip */}
        {hoveredCounty && data[hoveredCounty] && (
          <Box
            ref={tooltipRef}
            position="absolute"
            top={0}
            left={0}
            bgcolor="background.paper"
            p={1}
            borderRadius={1}
            boxShadow={1}
            zIndex={1}
          >
            <Typography variant="subtitle2">{hoveredCounty}</Typography>
            <Typography variant="body2">
              Reports: {data[hoveredCounty]?.count || 0}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default KenyaMap;
