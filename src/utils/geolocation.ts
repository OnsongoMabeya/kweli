// Kenyan counties with their approximate center coordinates
export const kenyanCounties = [
  { name: 'Mombasa', lat: -4.0435, lng: 39.6682 },
  { name: 'Kwale', lat: -4.1816, lng: 39.4606 },
  { name: 'Kilifi', lat: -3.5107, lng: 39.9093 },
  { name: 'Tana River', lat: -1.6519, lng: 39.6516 },
  { name: 'Lamu', lat: -2.2696, lng: 40.9006 },
  { name: 'Taita Taveta', lat: -3.3167, lng: 38.3667 },
  { name: 'Garissa', lat: -0.4532, lng: 39.6461 },
  { name: 'Wajir', lat: 1.7488, lng: 40.0586 },
  { name: 'Mandera', lat: 3.9366, lng: 41.8675 },
  { name: 'Marsabit', lat: 2.3284, lng: 37.9899 },
  { name: 'Isiolo', lat: 0.3557, lng: 37.5833 },
  { name: 'Meru', lat: 0.0515, lng: 37.6456 },
  { name: 'Tharaka-Nithi', lat: -0.2961, lng: 37.7231 },
  { name: 'Embu', lat: -0.5301, lng: 37.4500 },
  { name: 'Kitui', lat: -1.3667, lng: 38.0167 },
  { name: 'Machakos', lat: -1.5221, lng: 37.2632 },
  { name: 'Makueni', lat: -2.2783, lng: 37.8282 },
  { name: 'Nyandarua', lat: -0.5323, lng: 36.4275 },
  { name: 'Nyeri', lat: -0.4167, lng: 36.9500 },
  { name: 'Kirinyaga', lat: -0.4998, lng: 37.2803 },
  { name: 'Murang\'a', lat: -0.7200, lng: 37.1500 },
  { name: 'Kiambu', lat: -1.0333, lng: 37.0833 },
  { name: 'Turkana', lat: 3.1201, lng: 35.6000 },
  { name: 'West Pokot', lat: 1.2500, lng: 35.1000 },
  { name: 'Samburu', lat: 1.1167, lng: 36.6833 },
  { name: 'Trans Nzoia', lat: 1.0500, lng: 34.9500 },
  { name: 'Uasin Gishu', lat: 0.5167, lng: 35.2833 },
  { name: 'Elgeyo-Marakwet', lat: 0.5000, lng: 35.6500 },
  { name: 'Nandi', lat: 0.1833, lng: 35.1500 },
  { name: 'Baringo', lat: 0.4667, lng: 35.9500 },
  { name: 'Laikipia', lat: 0.2000, lng: 36.3667 },
  { name: 'Nakuru', lat: -0.3000, lng: 36.0667 },
  { name: 'Narok', lat: -1.0833, lng: 35.8667 },
  { name: 'Kajiado', lat: -1.8500, lng: 36.7833 },
  { name: 'Kericho', lat: -0.3667, lng: 35.2833 },
  { name: 'Bomet', lat: -0.7833, lng: 35.3333 },
  { name: 'Kakamega', lat: 0.2833, lng: 34.7500 },
  { name: 'Vihiga', lat: 0.0500, lng: 34.7167 },
  { name: 'Bungoma', lat: 0.5667, lng: 34.5667 },
  { name: 'Busia', lat: 0.4500, lng: 34.1167 },
  { name: 'Siaya', lat: 0.0667, lng: 34.2833 },
  { name: 'Kisumu', lat: -0.1000, lng: 34.7500 },
  { name: 'Homa Bay', lat: -0.5333, lng: 34.4500 },
  { name: 'Migori', lat: -1.0667, lng: 34.4667 },
  { name: 'Kisii', lat: -0.6833, lng: 34.7667 },
  { name: 'Nyamira', lat: -0.5667, lng: 34.9333 },
  { name: 'Nairobi', lat: -1.2864, lng: 36.8172 }
];

/**
 * Finds the nearest Kenyan county based on coordinates
 */
export function findNearestCounty(lat: number, lng: number): string | undefined {
  if (!lat || !lng) return undefined;
  
  let nearestCounty: string | undefined;
  let minDistance = Infinity;
  
  for (const county of kenyanCounties) {
    const distance = Math.sqrt(
      Math.pow(county.lat - lat, 2) + 
      Math.pow(county.lng - lng, 2)
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      nearestCounty = county.name;
    }
  }
  
  return nearestCounty;
}

/**
 * Gets user's current location
 */
export async function getCurrentLocation(): Promise<{
  latitude: number;
  longitude: number;
  county?: string;
  error?: string;
}> {
  if (!navigator.geolocation) {
    return { 
      latitude: 0, 
      longitude: 0, 
      error: 'Geolocation is not supported by your browser' 
    };
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const county = findNearestCounty(latitude, longitude);
        resolve({ latitude, longitude, county });
      },
      (error) => {
        console.error('Error getting location:', error);
        resolve({ 
          latitude: 0, 
          longitude: 0, 
          error: 'Unable to retrieve your location' 
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  });
}
