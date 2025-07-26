export interface Block {
  number: string;
  hash: string;
  parentHash: string;
  timestamp: string;
  transactions: number;
  validator: string;
  size: string;
  gasUsed: string;
  gasLimit: string;
  difficulty?: string;
}

export interface SmartContract {
  address: string;
  type: 'Property Assessment' | 'Fraud Detection' | 'Financial Inclusion' | 'Tax Collection';
  count: number;
  color: string;
  deployedAt: string;
  version: string;
  status: 'active' | 'paused' | 'deprecated';
}

export interface Transaction {
  hash: string;
  blockNumber: string;
  from: string;
  to: string;
  value: string;
  gasPrice: string;
  gasUsed: string;
  timestamp: string;
  status: 'pending' | 'confirmed' | 'failed';
  type: 'property_update' | 'fraud_report' | 'tax_payment' | 'contract_call';
  metadata?: Record<string, unknown>;
}

export interface NetworkStats {
  totalBlocks: number;
  totalTransactions: number;
  averageBlockTime: number;
  networkHashRate?: string;
  activeValidators: number;
  pendingTransactions: number;
}