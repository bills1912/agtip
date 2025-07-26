export interface AnalyticsData {
  period: string;
  taxCollectionEfficiency: number;
  costReduction: number;
  processingSpeed: number;
  citizenSatisfaction: number;
  revenueImpact: number;
}

export interface RegionalPerformance {
  region: string;
  efficiency: number;
  revenue: number;
  growth: number;
  population: number;
  area: number;
}

export interface SystemMetrics {
  uptime: number;
  responseTime: number;
  errorRate: number;
  throughput: number;
  activeUsers: number;
  apiCalls: number;
}