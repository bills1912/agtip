// src/components/pages/FraudDetection.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Eye, 
  UserX, 
  FileX, 
  TrendingDown, 
  Search,
  Download,
  RefreshCw,
  Target,
  Activity,
  BarChart3,
  PieChart,
  Zap,
  Database,
  Users,
  DollarSign,
  ArrowUp,
  ArrowDown,
  Calendar,
  MapPin,
  Link,
  Layers
} from 'lucide-react';
import type { FraudAlert } from '../../types/fraud';
// import { useApi } from '../../hooks/useApi';
import { useDebounce } from '../../hooks/useDebounce';
// import { apiService } from '../../services/api';
import { formatRelativeTime, formatCurrency } from '../../utils/formatters';
// import { LoadingSpinner } from '../common/LoadingSpinner';

interface FraudStats {
  highRisk: number;
  mediumRisk: number;
  lowRisk: number;
  resolvedToday: number;
  totalSaved: number;
  activeCases: number;
  falsePositives: number;
  avgResponseTime: number;
}

interface MLModelMetrics {
  accuracy: number;
  falsePositive: number;
  falseNegative: number;
  responseTime: number;
  modelsActive: number;
  predictionsToday: number;
}

interface RealTimeData {
  alertsProcessed: number;
  fraudPrevented: number;
  riskScore: number;
  systemLoad: number;
}

export const FraudDetection: React.FC = () => {
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Active' | 'Investigating' | 'Resolved'>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('24h');
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Real-time data updates
  const [realTimeData, setRealTimeData] = useState<RealTimeData>({
    alertsProcessed: 1247,
    fraudPrevented: 23,
    riskScore: 7.2,
    systemLoad: 68
  });

  const [stats] = useState<FraudStats>({
    highRisk: 7,
    mediumRisk: 23,
    lowRisk: 12,
    resolvedToday: 156,
    totalSaved: 45.7,
    activeCases: 42,
    falsePositives: 8,
    avgResponseTime: 3.2
  });

  const [mlMetrics] = useState<MLModelMetrics>({
    accuracy: 96.8,
    falsePositive: 2.1,
    falseNegative: 0.3,
    responseTime: 1.2,
    modelsActive: 4,
    predictionsToday: 8947
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        alertsProcessed: prev.alertsProcessed + Math.floor(Math.random() * 3),
        fraudPrevented: prev.fraudPrevented + (Math.random() > 0.98 ? 1 : 0),
        riskScore: Math.max(1, Math.min(10, prev.riskScore + (Math.random() - 0.5) * 0.5)),
        systemLoad: Math.max(20, Math.min(90, prev.systemLoad + (Math.random() - 0.5) * 5))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Mock fraud alerts data with more comprehensive information
  const [fraudAlerts] = useState<FraudAlert[]>([
    {
      id: 'FRD-001',
      type: 'Value Manipulation',
      propertyId: 'JKT-887234',
      risk: 'High',
      description: 'Suspicious undervaluation detected - 40% below market rate',
      timestamp: '2024-01-15T12:00:00Z',
      status: 'active',
      assignedTo: 'investigator-01',
      evidence: [
        { type: 'document', description: 'Falsified assessment report', confidence: 95, source: 'AI Analysis', timestamp: '2024-01-15T12:00:00Z' },
        { type: 'transaction', description: 'Unusual payment pattern', confidence: 87, source: 'Transaction Monitor', timestamp: '2024-01-15T11:45:00Z' },
        { type: 'behavioral', description: 'Anomalous owner behavior', confidence: 78, source: 'Pattern Analysis', timestamp: '2024-01-15T11:30:00Z' }
      ],
      priority: 1,
      estimatedLoss: 2500000000
    },
    {
      id: 'FRD-002',
      type: 'Identity Fraud',
      propertyId: 'BDG-445123',
      risk: 'Medium',
      description: 'Ownership verification failed - Document inconsistencies',
      timestamp: '2024-01-15T10:00:00Z',
      status: 'investigating',
      assignedTo: 'investigator-02',
      evidence: [
        { type: 'document', description: 'ID verification mismatch', confidence: 78, source: 'OCR System', timestamp: '2024-01-15T10:00:00Z' },
        { type: 'document', description: 'Signature analysis failed', confidence: 82, source: 'Handwriting AI', timestamp: '2024-01-15T09:45:00Z' }
      ],
      priority: 2,
      estimatedLoss: 800000000
    },
    {
      id: 'FRD-003',
      type: 'Transaction Pattern',
      propertyId: 'SBY-991876',
      risk: 'High',
      description: 'Unusual transaction frequency and timing patterns',
      timestamp: '2024-01-15T08:00:00Z',
      status: 'active',
      assignedTo: 'investigator-01',
      evidence: [
        { type: 'transaction', description: 'Multiple rapid transactions', confidence: 92, source: 'Pattern Analysis', timestamp: '2024-01-15T08:00:00Z' },
        { type: 'network', description: 'Suspicious network connections', confidence: 85, source: 'Network Monitor', timestamp: '2024-01-15T07:30:00Z' }
      ],
      priority: 1,
      estimatedLoss: 1200000000
    },
    {
      id: 'FRD-004',
      type: 'Document Forgery',
      propertyId: 'MDN-332455',
      risk: 'Medium',
      description: 'Fake property certificate detected',
      timestamp: '2024-01-15T06:00:00Z',
      status: 'resolved',
      assignedTo: 'investigator-03',
      evidence: [
        { type: 'document', description: 'Certificate forgery detected', confidence: 94, source: 'Document AI', timestamp: '2024-01-15T06:00:00Z' }
      ],
      priority: 2,
      estimatedLoss: 450000000
    },
    {
      id: 'FRD-005',
      type: 'Value Manipulation',
      propertyId: 'PLG-778899',
      risk: 'Low',
      description: 'Minor valuation discrepancy detected',
      timestamp: '2024-01-15T04:00:00Z',
      status: 'false_positive',
      assignedTo: 'investigator-02',
      evidence: [
        { type: 'valuation', description: 'Market value variance', confidence: 65, source: 'Valuation AI', timestamp: '2024-01-15T04:00:00Z' }
      ],
      priority: 3,
      estimatedLoss: 150000000
    }
  ]);

  const filteredAlerts = fraudAlerts.filter(alert => {
    const matchesRisk = selectedRiskLevel === 'All' || alert.risk === selectedRiskLevel;
    const matchesStatus = selectedStatus === 'All' || 
      (selectedStatus === 'Active' && alert.status === 'active') ||
      (selectedStatus === 'Investigating' && alert.status === 'investigating') ||
      (selectedStatus === 'Resolved' && (alert.status === 'resolved' || alert.status === 'false_positive'));
    const matchesSearch = alert.propertyId.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                         alert.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                         alert.id.toLowerCase().includes(debouncedSearch.toLowerCase());
    return matchesRisk && matchesStatus && matchesSearch;
  });

  const handleInvestigate = useCallback((alertId: string) => {
    console.log('Investigating alert:', alertId);
    // Implementation for investigating alert
  }, []);

  const handleResolve = useCallback((alertId: string) => {
    console.log('Resolving alert:', alertId);
    // Implementation for resolving alert
  }, []);

  const handleExport = useCallback(() => {
    console.log('Exporting fraud data for timerange:', timeRange);
    // Implementation for exporting data
  }, [timeRange]);

  const getRiskColor = (risk: FraudAlert['risk']): string => {
    const colors = {
      'High': 'text-red-600 bg-red-100 border-red-200',
      'Medium': 'text-yellow-600 bg-yellow-100 border-yellow-200',
      'Low': 'text-green-600 bg-green-100 border-green-200'
    };
    return colors[risk];
  };

  const getStatusColor = (status: FraudAlert['status']): string => {
    const colors = {
      'active': 'text-red-600 bg-red-100 border-red-200',
      'investigating': 'text-blue-600 bg-blue-100 border-blue-200',
      'resolved': 'text-green-600 bg-green-100 border-green-200',
      'false_positive': 'text-gray-600 bg-gray-100 border-gray-200'
    };
    return colors[status];
  };

  const getFraudIcon = (type: FraudAlert['type']) => {
    const icons = {
      'Value Manipulation': TrendingDown,
      'Identity Fraud': UserX,
      'Transaction Pattern': Clock,
      'Document Forgery': FileX
    };
    return icons[type] || AlertTriangle;
  };

  const getPriorityColor = (priority: number): string => {
    if (priority === 1) return 'bg-red-500';
    if (priority === 2) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Fraud Detection & Prevention</h2>
          <p className="text-gray-600">AI-powered fraud detection and investigation tools</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">System Active</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
            <button 
              onClick={handleExport}
              className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Status Bar */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-blue-100">Alerts Processed</p>
            <p className="text-2xl font-bold">{realTimeData.alertsProcessed.toLocaleString()}</p>
            <p className="text-sm text-blue-100">Last 24h</p>
          </div>
          <div className="text-center">
            <p className="text-blue-100">Fraud Prevented</p>
            <p className="text-2xl font-bold">{realTimeData.fraudPrevented}</p>
            <p className="text-sm text-blue-100">Active cases</p>
          </div>
          <div className="text-center">
            <p className="text-blue-100">Risk Score</p>
            <p className="text-2xl font-bold">{realTimeData.riskScore.toFixed(1)}/10</p>
            <p className="text-sm text-blue-100">Current level</p>
          </div>
          <div className="text-center">
            <p className="text-blue-100">System Load</p>
            <p className="text-2xl font-bold">{realTimeData.systemLoad}%</p>
            <p className="text-sm text-blue-100">Processing capacity</p>
          </div>
        </div>
      </div>

      {/* Alert Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-800 font-semibold">High Risk Alerts</p>
              <p className="text-2xl font-bold text-red-600">{stats.highRisk}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <p className="text-sm text-red-600 mt-1">Requires immediate attention</p>
          <div className="flex items-center mt-2">
            <ArrowUp className="h-4 w-4 text-red-500" />
            <span className="text-xs text-red-600">+2 since yesterday</span>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-800 font-semibold">Medium Risk</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.mediumRisk}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
          <p className="text-sm text-yellow-600 mt-1">Under investigation</p>
          <div className="flex items-center mt-2">
            <ArrowDown className="h-4 w-4 text-green-500" />
            <span className="text-xs text-yellow-600">-5 since yesterday</span>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-800 font-semibold">Resolved Today</p>
              <p className="text-2xl font-bold text-green-600">{stats.resolvedToday}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <p className="text-sm text-green-600 mt-1">Successfully prevented</p>
          <div className="flex items-center mt-2">
            <ArrowUp className="h-4 w-4 text-green-500" />
            <span className="text-xs text-green-600">+23% improvement</span>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-800 font-semibold">Total Saved</p>
              <p className="text-2xl font-bold text-blue-600">IDR {stats.totalSaved}T</p>
            </div>
            <Shield className="h-8 w-8 text-blue-500" />
          </div>
          <p className="text-sm text-blue-600 mt-1">This month</p>
          <div className="flex items-center mt-2">
            <DollarSign className="h-4 w-4 text-blue-500" />
            <span className="text-xs text-blue-600">Revenue protected</span>
          </div>
        </div>
      </div>

      {/* Search, Filters and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search and Filters */}
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Search & Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedRiskLevel}
              onChange={(e) => setSelectedRiskLevel(e.target.value as typeof selectedRiskLevel)}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Risk Levels</option>
              <option value="High">High Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="Low">Low Risk</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as typeof selectedStatus)}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Investigating">Investigating</option>
              <option value="Resolved">Resolved</option>
            </select>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as typeof timeRange)}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Cases</span>
              <span className="font-semibold">{stats.activeCases}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">False Positives</span>
              <span className="font-semibold text-orange-600">{stats.falsePositives}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg Response</span>
              <span className="font-semibold text-blue-600">{stats.avgResponseTime}min</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Accuracy Rate</span>
              <span className="font-semibold text-green-600">{mlMetrics.accuracy}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ML Model Performance Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2 text-purple-500" />
            ML Model Performance
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{mlMetrics.accuracy}%</p>
              <p className="text-sm text-gray-600">Accuracy Rate</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: `${mlMetrics.accuracy}%`}}></div>
              </div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{mlMetrics.falsePositive}%</p>
              <p className="text-sm text-gray-600">False Positive</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: `${mlMetrics.falsePositive * 10}%`}}></div>
              </div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{mlMetrics.falseNegative}%</p>
              <p className="text-sm text-gray-600">False Negative</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{width: `${mlMetrics.falseNegative * 20}%`}}></div>
              </div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">{mlMetrics.responseTime}s</p>
              <p className="text-sm text-gray-600">Response Time</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{width: '75%'}}></div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Models Active:</span>
                <span className="font-semibold">{mlMetrics.modelsActive}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Predictions Today:</span>
                <span className="font-semibold">{mlMetrics.predictionsToday.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
            Detection Trends
          </h3>
          <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
            <div className="text-center">
              <Activity className="h-16 w-16 text-blue-400 mx-auto mb-2" />
              <p className="text-gray-600">Fraud Detection Trends</p>
              <p className="text-sm text-gray-500">24h rolling window</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <p className="font-semibold text-red-600">Peak Hour</p>
              <p className="text-gray-600">14:00-15:00</p>
            </div>
            <div>
              <p className="font-semibold text-green-600">Avg Daily</p>
              <p className="text-gray-600">42 alerts</p>
            </div>
            <div>
              <p className="font-semibold text-blue-600">Success Rate</p>
              <p className="text-gray-600">94.2%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Fraud Alerts */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Shield className="h-5 w-5 mr-2 text-red-500" />
            Active Fraud Alerts ({filteredAlerts.length})
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Auto-refresh every 30s</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Shield className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No fraud alerts found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAlerts.map((alert) => {
              const IconComponent = getFraudIcon(alert.type);
              return (
                <div key={alert.id} className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <IconComponent className="h-4 w-4 text-red-600" />
                        <span className="font-mono text-sm text-gray-600">{alert.id}</span>
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(alert.priority)}`} title={`Priority ${alert.priority}`}></div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getRiskColor(alert.risk)}`}>
                          {alert.risk} Risk
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(alert.status)}`}>
                          {alert.status.replace('_', ' ').toUpperCase()}
                        </span>
                        {alert.assignedTo && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                            <Users className="h-3 w-3 inline mr-1" />
                            {alert.assignedTo}
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold text-gray-800 mb-1">{alert.type}</p>
                          <p className="text-sm text-gray-600 mb-3">{alert.description}</p>
                          <div className="text-sm text-gray-500 space-y-1">
                            <p className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              Property: <span className="font-mono">{alert.propertyId}</span>
                            </p>
                            <p className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Detected: {formatRelativeTime(alert.timestamp)}
                            </p>
                            {alert.estimatedLoss && (
                              <p className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                Estimated Loss: <span className="text-red-600 font-semibold">{formatCurrency(alert.estimatedLoss)}</span>
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-semibold mb-2 flex items-center gap-1">
                            <Database className="h-3 w-3" />
                            Evidence ({alert.evidence.length})
                          </h5>
                          <div className="space-y-2 max-h-32 overflow-y-auto">
                            {alert.evidence.map((evidence, idx) => (
                              <div key={idx} className="text-xs bg-white p-2 rounded border">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-medium">{evidence.description}</span>
                                  <div className="flex items-center gap-1">
                                    <div className={`w-2 h-2 rounded-full ${
                                      evidence.confidence >= 90 ? 'bg-green-500' :
                                      evidence.confidence >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}></div>
                                    <span className="text-gray-500">{evidence.confidence}%</span>
                                  </div>
                                </div>
                                <div className="flex justify-between items-center text-gray-500">
                                  <span>Source: {evidence.source}</span>
                                  <span>{formatRelativeTime(evidence.timestamp)}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4 flex flex-col gap-2">
                      <button 
                        onClick={() => handleInvestigate(alert.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 flex items-center gap-1 transition-colors"
                      >
                        <Eye className="h-3 w-3" />
                        Investigate
                      </button>
                      {alert.status === 'active' && (
                        <button 
                          onClick={() => handleResolve(alert.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
                        >
                          <CheckCircle className="h-3 w-3 inline mr-1" />
                          Resolve
                        </button>
                      )}
                      {alert.status === 'investigating' && (
                        <button className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition-colors">
                          <Clock className="h-3 w-3 inline mr-1" />
                          Update
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Investigation Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Zap className="h-5 w-5 mr-2 text-yellow-500" />
            AI Investigation Tools
          </h3>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Pattern Analysis Engine
              </h4>
              <p className="text-sm text-gray-600 mb-2">Real-time pattern detection across multiple data sources</p>
              <div className="flex justify-between items-center">
                <span className="text-sm">Status: Active</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-500">Processing 1,247 patterns/sec</span>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <FileX className="h-4 w-4" />
                Document Forensics AI
              </h4>
              <p className="text-sm text-gray-600 mb-2">Advanced document authenticity verification</p>
              <div className="flex justify-between items-center">
                <span className="text-sm">Accuracy: 98.7%</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-500">342 docs analyzed today</span>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Link className="h-4 w-4" />
                Network Analysis
              </h4>
              <p className="text-sm text-gray-600 mb-2">Transaction and relationship mapping</p>
              <div className="flex justify-between items-center">
                <span className="text-sm">Networks: 12,456</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-gray-500">89 suspicious clusters</span>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <TrendingDown className="h-4 w-4" />
                Valuation Intelligence
              </h4>
              <p className="text-sm text-gray-600 mb-2">Property value manipulation detection</p>
              <div className="flex justify-between items-center">
                <span className="text-sm">Baseline: IDR 2.4T</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-xs text-gray-500">23 anomalies detected</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-indigo-500" />
            Recent System Activities
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {[
              { time: '14:32', action: 'High-risk fraud alert triggered', location: 'JKT-887234', status: 'warning', type: 'alert' },
              { time: '14:28', action: 'Document forgery detected', location: 'BDG-445123', status: 'error', type: 'detection' },
              { time: '14:25', action: 'Pattern analysis completed', location: 'SBY-991876', status: 'success', type: 'analysis' },
              { time: '14:22', action: 'Investigation case resolved', location: 'MDN-332455', status: 'success', type: 'resolution' },
              { time: '14:18', action: 'ML model updated', location: 'System', status: 'info', type: 'system' },
              { time: '14:15', action: 'Suspicious transaction flagged', location: 'PLG-778899', status: 'warning', type: 'transaction' },
              { time: '14:12', action: 'Identity verification failed', location: 'DPS-556677', status: 'error', type: 'identity' },
              { time: '14:08', action: 'Automated investigation started', location: 'YGY-889900', status: 'info', type: 'investigation' },
              { time: '14:05', action: 'False positive resolved', location: 'SMG-112233', status: 'success', type: 'resolution' },
              { time: '14:02', action: 'Network anomaly detected', location: 'PKU-445566', status: 'warning', type: 'network' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    activity.status === 'success' ? 'bg-green-400' :
                    activity.status === 'warning' ? 'bg-yellow-400' :
                    activity.status === 'error' ? 'bg-red-400' : 'bg-blue-400'
                  }`}></div>
                  <div>
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-gray-600 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {activity.location}
                      <span className="mx-1">•</span>
                      <span className="capitalize">{activity.type}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500">{activity.time}</span>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    activity.status === 'success' ? 'bg-green-100 text-green-800' :
                    activity.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    activity.status === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {activity.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Integration Status */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Layers className="h-5 w-5 mr-2 text-blue-500" />
          System Integration Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-sm">Blockchain Network</h4>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-xs text-gray-600 mb-2">Immutable fraud record storage</p>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-green-600">Active</span>
              </div>
              <div className="flex justify-between">
                <span>Nodes:</span>
                <span>127</span>
              </div>
              <div className="flex justify-between">
                <span>Transactions:</span>
                <span>18.7M</span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-sm">Satellite Monitoring</h4>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-xs text-gray-600 mb-2">Real-time property change detection</p>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Coverage:</span>
                <span className="text-green-600">2.4M properties</span>
              </div>
              <div className="flex justify-between">
                <span>Resolution:</span>
                <span>10m/pixel</span>
              </div>
              <div className="flex justify-between">
                <span>Updates:</span>
                <span>Every 6hrs</span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-sm">External APIs</h4>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            </div>
            <p className="text-xs text-gray-600 mb-2">Third-party data integration</p>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Banking APIs:</span>
                <span className="text-green-600">12/12</span>
              </div>
              <div className="flex justify-between">
                <span>Gov Systems:</span>
                <span className="text-yellow-600">8/9</span>
              </div>
              <div className="flex justify-between">
                <span>Response Time:</span>
                <span>1.2s avg</span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-sm">AI Processing</h4>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-xs text-gray-600 mb-2">Machine learning pipeline</p>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>GPU Cluster:</span>
                <span className="text-green-600">12/12 nodes</span>
              </div>
              <div className="flex justify-between">
                <span>Queue:</span>
                <span>23 jobs</span>
              </div>
              <div className="flex justify-between">
                <span>Throughput:</span>
                <span>1.2K/sec</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Analytics */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <PieChart className="h-5 w-5 mr-2 text-green-500" />
          Advanced Analytics & Insights
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Fraud Type Distribution</h4>
            <div className="space-y-2">
              {[
                { type: 'Value Manipulation', count: 45, color: 'red' },
                { type: 'Identity Fraud', count: 23, color: 'yellow' },
                { type: 'Document Forgery', count: 18, color: 'purple' },
                { type: 'Transaction Pattern', count: 12, color: 'blue' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 bg-${item.color}-500 rounded`}></div>
                    <span className="text-sm">{item.type}</span>
                  </div>
                  <span className="font-semibold">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Regional Hotspots</h4>
            <div className="space-y-2">
              {[
                { region: 'Jakarta', risk: 'High', cases: 67 },
                { region: 'Bandung', risk: 'Medium', cases: 34 },
                { region: 'Surabaya', risk: 'Medium', cases: 28 },
                { region: 'Medan', risk: 'Low', cases: 15 }
              ].map((region, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <span className="text-sm font-medium">{region.region}</span>
                    <div className={`text-xs px-2 py-1 rounded-full inline-block ml-2 ${
                      region.risk === 'High' ? 'bg-red-100 text-red-800' :
                      region.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {region.risk}
                    </div>
                  </div>
                  <span className="font-semibold">{region.cases}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Prevention Impact</h4>
            <div className="space-y-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">IDR 127.8T</p>
                <p className="text-sm text-gray-600">Total Revenue Protected</p>
                <p className="text-xs text-green-600">+340% vs manual system</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center p-2 bg-blue-50 rounded">
                  <p className="font-semibold">98.7%</p>
                  <p className="text-gray-600">Detection Rate</p>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded">
                  <p className="font-semibold">2.3min</p>
                  <p className="text-gray-600">Avg Response</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};