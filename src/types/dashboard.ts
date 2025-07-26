import type { LucideIcon } from 'lucide-react';

export interface RealTimeData {
  propertiesProcessed: number;
  fraudDetected: number;
  revenueGenerated: number;
  accuracyRate: number;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface Activity {
  time: string;
  action: string;
  location: string;
  status: 'success' | 'warning' | 'info';
}

export interface SystemStatus {
  aiModels: boolean;
  blockchain: boolean;
  satelliteFeed: boolean;
  apiServices: boolean;
}

export interface NotificationData {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface ChartData {
  name: string;
  value: number;
  change?: number;
  color?: string;
}

export interface PerformanceMetric {
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  target?: number;
}

export interface RegionalData {
  region: string;
  efficiency: number;
  revenue: string;
  growth: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface FraudAlert {
  id: string;
  type: 'Value Manipulation' | 'Identity Fraud' | 'Transaction Pattern' | 'Document Forgery';
  propertyId: string;
  risk: 'High' | 'Medium' | 'Low';
  description: string;
  timestamp: Date;
  status: 'active' | 'investigating' | 'resolved';
  assignedTo?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T = unknown> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}