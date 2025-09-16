import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import type { Feature, FeatureCollection, Point, LineString, Polygon } from 'geojson';
import type { CountyData } from '../../types/map';

// Define specific types for our GeoJSON features
type PointFeature = Feature<Point>;
type LineStringFeature = Feature<LineString>;
type PolygonFeature = Feature<Polygon>;
type KenyaFeature = PointFeature | LineStringFeature | PolygonFeature;

const defaultData: Record<string, CountyData> = {};

interface KenyaMapProps {
  data?: Record<string, CountyData>;
  selectedCounty?: string | null;
  onCountyClick?: (county: string) => void;
  width?: number | string;
  height?: number | string;
}
// Define the GeoJSON for Kenya with detailed locations
const kenyaGeoJSON: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    // Major Cities
    {
      type: "Feature",
      properties: { name: "Nairobi", type: "city", population: 4397000 },
      geometry: {
        type: "Point",
        coordinates: [36.8219, -1.2921]
      }
    },
    {
      type: "Feature",
      properties: { name: "Mombasa", type: "city", population: 1208000 },
      geometry: {
        type: "Point",
        coordinates: [39.6682, -4.0435]
      }
    },
    {
      type: "Feature",
      properties: { name: "Kisumu", type: "city", population: 610000 },
      geometry: {
        type: "Point",
        coordinates: [34.75, -0.1022]
      }
    },
    
    // Additional Major Towns
    {
      type: "Feature",
      properties: { name: "Nakuru", type: "town", population: 570674 },
      geometry: {
        type: "Point",
        coordinates: [36.08, -0.3031]
      }
    },
    {
      type: "Feature",
      properties: { name: "Eldoret", type: "town", population: 475716 },
      geometry: {
        type: "Point",
        coordinates: [35.2697, 0.5143]
      }
    },
    {
      type: "Feature",
      properties: { name: "Thika", type: "town", population: 251407 },
      geometry: {
        type: "Point",
        coordinates: [37.0833, -1.05]
      }
    },
    {
      type: "Feature",
      properties: { name: "Malindi", type: "town", population: 207253 },
      geometry: {
        type: "Point",
        coordinates: [40.12, -3.22]
      }
    },
    
    // National Parks and Reserves
    {
      type: "Feature",
      properties: { name: "Maasai Mara", type: "park", description: "Famous for the Great Migration" },
      geometry: {
        type: "Point",
        coordinates: [35.14, -1.49]
      }
    },
    {
      type: "Feature",
      properties: { name: "Amboseli", type: "park", description: "Iconic views of Mount Kilimanjaro" },
      geometry: {
        type: "Point",
        coordinates: [37.25, -2.65]
      }
    },
    
    // Major Lakes
    {
      type: "Feature",
      properties: { name: "Lake Victoria", type: "lake" },
      geometry: {
        type: "Point",
        coordinates: [33.5, -0.5]
      }
    },
    {
      type: "Feature",
      properties: { name: "Lake Nakuru", type: "lake" },
      geometry: {
        type: "Point",
        coordinates: [36.08, -0.3667]
      }
    },
    
    // Mountains
    {
      type: "Feature",
      properties: { name: "Mount Kenya", type: "mountain", elevation: 5199 },
      geometry: {
        type: "Point",
        coordinates: [37.3089, -0.1519]
      }
    },
    {
      type: "Feature",
      properties: { name: "Mount Elgon", type: "mountain", elevation: 4321 },
      geometry: {
        type: "Point",
        coordinates: [34.55, 1.12]
      }
    },
    
    // Border Points
    {
      type: "Feature",
      properties: { name: "Busia Border", type: "border" },
      geometry: {
        type: "Point",
        coordinates: [34.09, 0.46]
      }
    },
    {
      type: "Feature",
      properties: { name: "Namanga Border", type: "border" },
      geometry: {
        type: "Point",
        coordinates: [36.79, -2.55]
      }
    },
    
    // Airports
    {
      type: "Feature",
      properties: { name: "Jomo Kenyatta International Airport", type: "airport", code: "NBO" },
      geometry: {
        type: "Point",
        coordinates: [36.93, -1.32]
      }
    },
    {
      type: "Feature",
      properties: { name: "Moi International Airport", type: "airport", code: "MBA" },
      geometry: {
        type: "Point",
        coordinates: [39.59, -4.03]
      }
    },
    
    // Major Highways
    {
      type: "Feature",
      properties: { name: "Nairobi-Nakuru Highway", type: "highway" },
      geometry: {
        type: "LineString",
        coordinates: [
          [36.82, -1.29], // Nairobi
          [36.75, -1.10],
          [36.70, -0.90],
          [36.65, -0.70],
          [36.62, -0.50],
          [36.60, -0.30],
          [36.08, -0.30]  // Nakuru
        ]
      }
    },
    
    // Kenya's approximate border (simplified polygon)
    {
      type: "Feature",
      properties: { name: "Kenya Border", type: "border" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [41.9, -4.7],  // SE corner
            [41.9, 4.6],   // NE corner
            [33.9, 4.6],   // NW corner
            [33.9, -4.7],  // SW corner
            [41.9, -4.7]   // Back to SE corner
          ]
        ]
      }
    }
  ]
};


const KenyaMap: React.FC<KenyaMapProps> = ({
  data = defaultData,
  selectedCounty = null,
  onCountyClick = () => {},
  width = '100%',
  height = '500px'
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Helper function to get coordinates from a Point feature
  const getPointCoordinates = (feature: KenyaFeature): [number, number] | null => {
    if (feature.geometry.type === 'Point') {
      return feature.geometry.coordinates as [number, number];
    }
    return null;
  };

  // Get max count for color scaling
  const maxCount = useMemo(() => {
    return Math.max(...Object.values(data).map(d => d?.count || 0), 1);
  }, [data]);

  // Get color based on count
  const getColorForCount = useCallback((count: number): string => {
    if (count === 0) return '#e0e0e0';
    const intensity = Math.min(0.9, count / maxCount);
    const hue = 120 - (intensity * 120); // Green (120) to Red (0)
    return `hsl(${hue}, 100%, ${90 - (intensity * 40)}%)`;
  }, [maxCount]);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const containerWidth = svgRef.current.clientWidth;
    const containerHeight = svgRef.current.clientHeight;

    // Create a projection for Kenya with adjusted scale and center
    const projection = d3.geoMercator()
      .center([37.8, 0.2])  // Center of Kenya
      .scale(2500)          // Adjust this value to zoom in/out
      .translate([containerWidth / 2, containerHeight / 2]);

    // Create a path generator
    const path = d3.geoPath().projection(projection);
    
    // Add a base layer for Kenya
    svg.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('fill', '#f0f8ff');  // Light blue background

    // Process features by type with proper type guards
    const featuresByType = {
      border: kenyaGeoJSON.features.filter((f): f is Feature<Polygon> => 
        f.properties?.type === 'border' && f.geometry.type === 'Polygon'
      ),
      city: kenyaGeoJSON.features.filter((f): f is Feature<Point> => 
        f.properties?.type === 'city' && f.geometry.type === 'Point'
      ),
      town: kenyaGeoJSON.features.filter((f): f is Feature<Point> => 
        f.properties?.type === 'town' && f.geometry.type === 'Point'
      ),
      park: kenyaGeoJSON.features.filter((f): f is Feature<Point> => 
        f.properties?.type === 'park' && f.geometry.type === 'Point'
      ),
      lake: kenyaGeoJSON.features.filter((f): f is Feature<Point> => 
        f.properties?.type === 'lake' && f.geometry.type === 'Point'
      ),
      mountain: kenyaGeoJSON.features.filter((f): f is Feature<Point> => 
        f.properties?.type === 'mountain' && f.geometry.type === 'Point'
      ),
      airport: kenyaGeoJSON.features.filter((f): f is Feature<Point> => 
        f.properties?.type === 'airport' && f.geometry.type === 'Point'
      ),
      highway: kenyaGeoJSON.features.filter((f): f is Feature<LineString, any> => 
        f.properties?.type === 'highway' && f.geometry.type === 'LineString'
      )
    };

    // Draw Kenya border
    svg.selectAll('.kenya-border')
      .data(featuresByType.border.filter(f => f.geometry.type === 'Polygon'))
      .enter()
      .append('path')
      .attr('class', 'kenya-border')
      .attr('d', path)
      .attr('fill', '#e0f7fa')
      .attr('stroke', '#0288d1')
      .attr('stroke-width', 1);

    // Draw highways
    svg.selectAll('.highway')
      .data(featuresByType.highway)
      .enter()
      .append('path')
      .attr('class', 'highway')
      .attr('d', path)
      .attr('stroke', '#ff9800')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5')
      .attr('fill', 'none');

    // Draw lakes
    featuresByType.lake.forEach(lake => {
      const coords = getPointCoordinates(lake);
      if (!coords) return;
      
      const [x, y] = projection(coords) || [0, 0];
      svg.append('circle')
        .attr('class', 'lake')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 8)
        .attr('fill', '#2196f3')
        .attr('opacity', 0.6);
    });

    // Draw mountains
    featuresByType.mountain.forEach(mountain => {
      const coords = getPointCoordinates(mountain);
      if (!coords) return;
      
      const [x, y] = projection(coords) || [0, 0];
      svg.append('path')
        .attr('class', 'mountain')
        .attr('d', `M${x - 5},${y + 5} L${x},${y - 5} L${x + 5},${y + 5} Z`)
        .attr('fill', '#795548')
        .attr('stroke', '#5d4037')
        .attr('stroke-width', 0.5);
    });

    // Draw national parks
    featuresByType.park.forEach(park => {
      const coords = getPointCoordinates(park);
      if (!coords) return;
      
      const [x, y] = projection(coords) || [0, 0];
      svg.append('circle')
        .attr('class', 'park')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 6)
        .attr('fill', '#4caf50')
        .attr('opacity', 0.7);
    });

    // Draw towns
    featuresByType.town.forEach(town => {
      const coords = getPointCoordinates(town);
      if (!coords) return;
      
      const [x, y] = projection(coords) || [0, 0];
      svg.append('circle')
        .attr('class', 'town')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 4)
        .attr('fill', '#ff9800');
    });

    // Draw cities (larger points)
    featuresByType.city.forEach(city => {
      const coords = getPointCoordinates(city);
      if (!coords) return;
      
      const [x, y] = projection(coords) || [0, 0];
      svg.append('circle')
        .attr('class', 'city')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 6)
        .attr('fill', '#f44336');
    });

    // Draw airports
    featuresByType.airport.forEach(airport => {
      const coords = getPointCoordinates(airport);
      if (!coords) return;
      
      const [x, y] = projection(coords) || [0, 0];
      svg.append('path')
        .attr('class', 'airport')
        .attr('d', `M${x - 4},${y} L${x + 4},${y} M${x},${y - 4} L${x},${y + 4}`)
        .attr('stroke', '#9c27b0')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
    });

    // Add labels for major locations
    const addLabel = (feature: PointFeature, className: string, dy = -10) => {
      const coords = getPointCoordinates(feature);
      const name = feature.properties?.name;
      if (!coords || !name) return;
      
      const [x, y] = projection(coords) || [0, 0];
      svg.append('text')
        .attr('x', x)
        .attr('y', y + dy)
        .text(name)
        .attr('class', `map-label ${className}`)
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('fill', '#333')
        .attr('font-weight', 'bold')
        .attr('paint-order', 'stroke')
        .attr('stroke', 'white')
        .attr('stroke-width', '3px')
        .attr('stroke-linecap', 'butt')
        .attr('stroke-linejoin', 'miter');
    };

    // Add labels for cities and major towns
    featuresByType.city.forEach(feature => addLabel(feature, 'city-label', -10));
    featuresByType.town.forEach(feature => addLabel(feature, 'town-label', -10));
    featuresByType.park.forEach(feature => addLabel(feature, 'park-label', 15));
    featuresByType.airport.forEach(feature => addLabel(feature, 'airport-label', 15));

    // Add interactive elements
    const interactiveFeatures = [
      ...featuresByType.city,
      ...featuresByType.town,
      ...featuresByType.park,
      ...featuresByType.airport,
      ...featuresByType.mountain
    ];

    interactiveFeatures.forEach(feature => {
      const coords = getPointCoordinates(feature);
      if (!coords) return;
      
      const [x, y] = projection(coords) || [0, 0];
      const props = feature.properties || {};
      
      svg.append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 8)  // Invisible hit area
        .attr('opacity', 0)
        .style('cursor', 'pointer')
        .on('mouseover', function() {
          if (!tooltipRef.current) return;
          
          let tooltipText = `<strong>${props.name || 'Unknown'}</strong>`;
          if (props.type) tooltipText += `<br>Type: ${props.type}`;
          if (props.population) tooltipText += `<br>Population: ${props.population.toLocaleString()}`;
          if (props.elevation) tooltipText += `<br>Elevation: ${props.elevation}m`;
          if (props.description) tooltipText += `<br>${props.description}`;
          if (props.code) tooltipText += `<br>Code: ${props.code}`;
          
          tooltipRef.current.style.display = 'block';
          tooltipRef.current.innerHTML = tooltipText;
          d3.select(this).attr('opacity', 0.2);
        })
        .on('mousemove', (event: MouseEvent) => {
          if (tooltipRef.current) {
            tooltipRef.current.style.left = `${event.pageX + 10}px`;
            tooltipRef.current.style.top = `${event.pageY + 10}px`;
          }
        })
        .on('mouseout', function() {
          if (tooltipRef.current) {
            tooltipRef.current.style.display = 'none';
          }
          d3.select(this).attr('opacity', 0);
        });
    });

  }, [data, selectedCounty, onCountyClick, maxCount, getColorForCount]);

  return (
    <div style={{ position: 'relative', width, height }}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        style={{ backgroundColor: '#f5f5f5' }}
      />
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          padding: '8px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          pointerEvents: 'none',
          display: 'none',
          zIndex: 10,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      />
    </div>
  );
};

export default KenyaMap;
