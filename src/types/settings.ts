export interface AIModelConfig {
  propertyDetectionThreshold: number;
  fraudDetectionSensitivity: 'High' | 'Medium' | 'Low' | 'Custom';
  autoAssessmentLimit: number;
  modelVersion: string;
  trainingDataDate: string;
}

export interface BlockchainConfig {
  consensusMechanism: 'Proof of Authority' | 'Proof of Stake' | 'Delegated Proof of Stake';
  blockTime: number;
  validators: ValidatorNode[];
  gasPrice: string;
  networkId: string;
}

export interface ValidatorNode {
  id: string;
  name: string;
  address: string;
  status: 'active' | 'inactive' | 'syncing';
  uptime: number;
  lastSeen: string;
}

export interface NotificationSettings {
  type: string;
  enabled: boolean;
  channels: ('Email' | 'SMS' | 'Dashboard' | 'Webhook')[];
  threshold?: number;
  frequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
}