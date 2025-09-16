declare module '*.geojson' {
  import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';
  const value: FeatureCollection<Geometry, GeoJsonProperties>;
  export default value;
}
