export interface FraudAlert {
  id: string;
  type: 'Value Manipulation' | 'Identity Fraud' | 'Transaction Pattern' | 'Document Forgery';
  propertyId: string;
  risk: 'High' | 'Medium' | 'Low';
  description: string;
  timestamp: string;
  status: 'active' | 'investigating' | 'resolved' | 'false_positive';
  assignedTo?: string;
  evidence: FraudEvidence[];
  priority: number;
  estimatedLoss?: number;
}

export interface FraudEvidence {
  type: 'document' | 'transaction' | 'satellite' | 'witness' | 'behavioral' | 'network' | 'valuation';
  description: string;
  confidence: number;
  source: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface FraudPattern {
  id: string;
  name: string;
  description: string;
  indicators: string[];
  riskScore: number;
  detectionRate: number;
  falsePositiveRate: number;
}