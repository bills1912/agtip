export interface FinancialProgram {
  id: string;
  name: string;
  type: 'KUR Mikro' | 'KUR Kecil' | 'KUR TKI' | 'Other';
  disbursed: number;
  beneficiaries: number;
  interestRate: number;
  status: 'active' | 'suspended' | 'completed';
  startDate: string;
  endDate?: string;
}

export interface InclusionMetrics {
  region: string;
  msmeAccessRate: number;
  digitalLiteracyRate: number;
  financialServicePoints: number;
  creditDisbursed: number;
  population: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}