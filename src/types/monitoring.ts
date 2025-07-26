export interface SatelliteData {
  id: string;
  satellite: 'Sentinel-2' | 'Landsat-8' | 'SPOT' | 'WorldView';
  resolution: string;
  captureDate: string;
  cloudCoverage: number;
  area: {
    coordinates: number[][];
    type: 'Polygon';
  };
  changes: PropertyChange[];
}

export interface PropertyChange {
  propertyId: string;
  changeType: 'new_construction' | 'demolition' | 'renovation' | 'land_use_change';
  confidence: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  detectedAt: string;
  verified: boolean;
}