export const API_ENDPOINTS = {
  PROPERTIES: '/properties',
  FRAUD_ALERTS: '/fraud/alerts',
  BLOCKCHAIN: '/blockchain',
  ANALYTICS: '/analytics',
  SETTINGS: '/settings'
} as const;

export const STATUS_COLORS = {
  success: 'bg-green-400',
  warning: 'bg-yellow-400',
  info: 'bg-blue-400',
  error: 'bg-red-400'
} as const;

export const GRADIENT_VARIANTS = {
  primary: 'gradient-primary',
  success: 'gradient-success',
  warning: 'gradient-warning',
  danger: 'gradient-danger'
} as const;

export const PROPERTY_STATUS = {
  COMPLETED: 'Completed',
  PENDING: 'Pending',
  REVIEW: 'Review'
} as const;

export const FRAUD_RISK_LEVELS = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low'
} as const;

export const BLOCKCHAIN_NETWORKS = {
  MAINNET: 'mainnet',
  TESTNET: 'testnet',
  DEVNET: 'devnet'
} as const;

export const DATE_FORMATS = {
  SHORT: 'dd/MM/yyyy',
  LONG: 'dd MMMM yyyy',
  WITH_TIME: 'dd/MM/yyyy HH:mm',
  ISO: 'yyyy-MM-dd'
} as const;

export const PAGINATION_LIMITS = {
  SMALL: 10,
  MEDIUM: 20,
  LARGE: 50,
  EXTRA_LARGE: 100
} as const;