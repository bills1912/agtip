export interface Property {
  id: string;
  location: string;
  previousValue: number;
  newValue: number;
  change: number;
  status: 'Completed' | 'Pending' | 'Review';
  coordinates: {
    lat: number;
    lng: number;
  };
  lastUpdated: string;
  assessmentHistory?: PropertyAssessment[];
}

export interface PropertyAssessment {
  id: string;
  propertyId: string;
  valuation: number;
  confidence: number;
  assessmentDate: string;
  assessor: {
    type: 'AI' | 'Human' | 'Hybrid';
    name: string;
    id: string;
  };
  methodology: string;
  factors: AssessmentFactor[];
}

export interface AssessmentFactor {
  name: string;
  value: number | string;
  weight: number;
  source: 'satellite' | 'market' | 'government' | 'survey';
}

export interface PropertyFilter {
  location?: string;
  status?: Property['status'];
  valueRange?: {
    min: number;
    max: number;
  };
  dateRange?: {
    from: string;
    to: string;
  };
}