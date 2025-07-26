// src/components/pages/Assessment.tsx
import React, { useState, useCallback } from 'react';
import { Building, Database, Zap, CheckCircle, FileText, Eye, Search, Filter, Upload, Download, Map } from 'lucide-react';
import type { Property, AssessmentFactor } from '../../types/property';
import { useDebounce } from '../../hooks/useDebounce';
import { formatCurrency, formatRelativeTime, formatPercentage } from '../../utils/formatters';
// import { validateProperty } from '../../utils/validation';

interface AssessmentPipelineStage {
  stage: string;
  count: number;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface AssessmentStats {
  totalAssessments: number;
  completedToday: number;
  averageTime: number;
  accuracyRate: number;
}

export const Assessment: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | Property['status']>('all');
  const [selectedValueRange, setSelectedValueRange] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  
  const debouncedSearch = useDebounce(searchTerm, 300);

  const [assessmentStats] = useState<AssessmentStats>({
    totalAssessments: 45782,
    completedToday: 1247,
    averageTime: 3.2,
    accuracyRate: 96.8
  });

  const [pipelineStages] = useState<AssessmentPipelineStage[]>([
    { 
      stage: 'Data Collection', 
      count: 342, 
      color: 'blue', 
      icon: Database,
      description: 'Gathering satellite and market data'
    },
    { 
      stage: 'AI Processing', 
      count: 186, 
      color: 'yellow', 
      icon: Zap,
      description: 'Machine learning analysis'
    },
    { 
      stage: 'Validation', 
      count: 94, 
      color: 'purple', 
      icon: CheckCircle,
      description: 'Quality assurance checks'
    },
    { 
      stage: 'Completed', 
      count: 1247, 
      color: 'green', 
      icon: FileText,
      description: 'Ready for use'
    }
  ]);

  const [recentAssessments] = useState<Property[]>([
    {
      id: 'JKT001234',
      location: 'Jakarta Selatan, Kebayoran Baru',
      previousValue: 2500000000,
      newValue: 3200000000,
      change: 28,
      status: 'Completed',
      coordinates: { lat: -6.2297, lng: 106.7956 },
      lastUpdated: '2024-01-15T14:30:00Z'
    },
    {
      id: 'BDG005678',
      location: 'Bandung, Dago',
      previousValue: 800000000,
      newValue: 950000000,
      change: 19,
      status: 'Pending',
      coordinates: { lat: -6.8957, lng: 107.6338 },
      lastUpdated: '2024-01-15T14:25:00Z'
    },
    {
      id: 'SBY009876',
      location: 'Surabaya, Gubeng',
      previousValue: 1200000000,
      newValue: 1400000000,
      change: 17,
      status: 'Review',
      coordinates: { lat: -7.2655, lng: 112.7378 },
      lastUpdated: '2024-01-15T14:20:00Z'
    },
    {
      id: 'MDN004321',
      location: 'Medan, Polonia',
      previousValue: 600000000,
      newValue: 720000000,
      change: 20,
      status: 'Completed',
      coordinates: { lat: 3.5894, lng: 98.6738 },
      lastUpdated: '2024-01-15T14:15:00Z'
    }
  ]);

  const [assessmentFactors] = useState<AssessmentFactor[]>([
    { name: 'Location Score', value: 8.5, weight: 25, source: 'satellite' },
    { name: 'Market Trend', value: 7.8, weight: 20, source: 'market' },
    { name: 'Infrastructure', value: 9.2, weight: 15, source: 'government' },
    { name: 'Building Quality', value: 8.1, weight: 20, source: 'satellite' },
    { name: 'Accessibility', value: 7.9, weight: 10, source: 'government' },
    { name: 'Comparable Sales', value: 8.7, weight: 10, source: 'market' }
  ]);

  const filteredAssessments = recentAssessments.filter(property => {
    const matchesSearch = property.id.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                         property.location.toLowerCase().includes(debouncedSearch.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || property.status === selectedStatus;
    
    const matchesValueRange = selectedValueRange === 'all' || 
      (selectedValueRange === 'low' && property.newValue < 1000000000) ||
      (selectedValueRange === 'medium' && property.newValue >= 1000000000 && property.newValue < 3000000000) ||
      (selectedValueRange === 'high' && property.newValue >= 3000000000);
    
    return matchesSearch && matchesStatus && matchesValueRange;
  });

  const handleViewProperty = useCallback((propertyId: string) => {
    console.log('Viewing property:', propertyId);
  }, []);

  const handleBulkAssessment = useCallback(() => {
    console.log('Starting bulk assessment...');
  }, []);

  const handleExportResults = useCallback(() => {
    console.log('Exporting assessment results...');
  }, []);

  const getStatusColor = (status: Property['status']): string => {
    const colors = {
      'Completed': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Review': 'bg-blue-100 text-blue-800'
    };
    return colors[status];
  };

  const getChangeColor = (change: number): string => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 95) return 'text-green-600';
    if (confidence >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getFactorValue = (factor: AssessmentFactor): number => {
    return typeof factor.value === 'number' ? factor.value : parseFloat(factor.value.toString());
  };

  const getFactorConfidence = (factor: AssessmentFactor): number => {
    const numericValue = getFactorValue(factor);
    return numericValue * 10;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">AI-Powered Property Assessment</h2>
          <p className="text-gray-600">Automated property valuation using satellite data and machine learning</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleBulkAssessment}
            className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
          >
            <Upload className="h-4 w-4" />
            Bulk Assessment
          </button>
          <button 
            onClick={handleExportResults}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            <Download className="h-4 w-4" />
            Export Results
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Assessments</p>
              <p className="text-3xl font-bold">{assessmentStats.totalAssessments.toLocaleString()}</p>
            </div>
            <Building className="h-12 w-12 text-blue-200" />
          </div>
          <p className="text-sm text-blue-100 mt-2">All time</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Completed Today</p>
              <p className="text-3xl font-bold">{assessmentStats.completedToday.toLocaleString()}</p>
            </div>
            <CheckCircle className="h-12 w-12 text-green-200" />
          </div>
          <p className="text-sm text-green-100 mt-2">+12% from yesterday</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Average Time</p>
              <p className="text-3xl font-bold">{assessmentStats.averageTime}s</p>
            </div>
            <Zap className="h-12 w-12 text-purple-200" />
          </div>
          <p className="text-sm text-purple-100 mt-2">Per property</p>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Accuracy Rate</p>
              <p className="text-3xl font-bold">{assessmentStats.accuracyRate}%</p>
            </div>
            <FileText className="h-12 w-12 text-orange-200" />
          </div>
          <p className="text-sm text-orange-100 mt-2">Target: 95%</p>
        </div>
      </div>

      {/* Assessment Pipeline */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Assessment Pipeline Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {pipelineStages.map((stage, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <stage.icon className={`h-8 w-8 mx-auto mb-2 text-${stage.color}-500`} />
              <p className="font-semibold">{stage.stage}</p>
              <p className="text-2xl font-bold text-gray-800">{stage.count}</p>
              <p className="text-xs text-gray-500 mt-1">{stage.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            {pipelineStages.map((stage, index) => (
              <React.Fragment key={index}>
                <div className={`w-3 h-3 rounded-full bg-${stage.color}-500`}></div>
                {index < pipelineStages.length - 1 && (
                  <div className="w-8 h-0.5 bg-gray-300"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Property ID or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as typeof selectedStatus)}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Review">Review</option>
          </select>

          <select
            value={selectedValueRange}
            onChange={(e) => setSelectedValueRange(e.target.value as typeof selectedValueRange)}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Value Ranges</option>
            <option value="low">Low (&lt; 1B)</option>
            <option value="medium">Medium (1B - 3B)</option>
            <option value="high">High (&gt; 3B)</option>
          </select>

          <button className="btn-primary flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Advanced
          </button>
        </div>
      </div>

      {/* Assessment Results */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Recent Assessments ({filteredAssessments.length})</h3>
        
        {filteredAssessments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Building className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No assessments found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Property ID</th>
                  <th className="text-left py-2">Location</th>
                  <th className="text-left py-2">Previous Value</th>
                  <th className="text-left py-2">New Value</th>
                  <th className="text-left py-2">Change</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Last Updated</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssessments.map((property) => (
                  <tr key={property.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 font-mono text-xs">{property.id}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Map className="h-3 w-3 text-gray-400" />
                        <span className="max-w-40 truncate">{property.location}</span>
                      </div>
                    </td>
                    <td className="py-3">{formatCurrency(property.previousValue)}</td>
                    <td className="py-3 font-semibold">{formatCurrency(property.newValue)}</td>
                    <td className="py-3">
                      <span className={`font-semibold ${getChangeColor(property.change)}`}>
                        {property.change >= 0 ? '+' : ''}{formatPercentage(property.change)}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                        {property.status}
                      </span>
                    </td>
                    <td className="py-3 text-gray-500">{formatRelativeTime(property.lastUpdated)}</td>
                    <td className="py-3">
                      <button 
                        onClick={() => handleViewProperty(property.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Assessment Factors Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Assessment Factors</h3>
          <div className="space-y-4">
            {assessmentFactors.map((factor, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{factor.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{getFactorValue(factor).toFixed(1)}/10</span>
                    <span className="text-xs text-gray-500">({factor.weight}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      getFactorValue(factor) >= 8 ? 'bg-green-500' :
                      getFactorValue(factor) >= 6 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${getFactorValue(factor) * 10}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className={`text-xs px-2 py-1 rounded ${
                    factor.source === 'satellite' ? 'bg-blue-100 text-blue-700' :
                    factor.source === 'market' ? 'bg-green-100 text-green-700' :
                    factor.source === 'government' ? 'bg-purple-100 text-purple-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {factor.source}
                  </span>
                  <span className={`text-xs font-medium ${getConfidenceColor(getFactorConfidence(factor))}`}>
                    {getFactorConfidence(factor).toFixed(1)}% confidence
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Data Sources</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Satellite Imagery</p>
                  <p className="text-xs text-gray-600">Sentinel-2, Landsat-8</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">94.2%</p>
                <p className="text-xs text-gray-500">Accuracy</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Market Data</p>
                  <p className="text-xs text-gray-600">Property listings, sales</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">91.8%</p>
                <p className="text-xs text-gray-500">Coverage</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Government Data</p>
                  <p className="text-xs text-gray-600">Zoning, infrastructure</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">96.1%</p>
                <p className="text-xs text-gray-500">Reliability</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Survey Data</p>
                  <p className="text-xs text-gray-600">Field surveys, inspections</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">88.5%</p>
                <p className="text-xs text-gray-500">Completion</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 bg-gray-50 rounded-lg">
            <h5 className="font-semibold text-gray-700 text-sm mb-2">Processing Statistics</h5>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-gray-600">Data Points</p>
                <p className="font-semibold">847,392</p>
              </div>
              <div>
                <p className="text-gray-600">ML Models</p>
                <p className="font-semibold">12</p>
              </div>
              <div>
                <p className="text-gray-600">Last Training</p>
                <p className="font-semibold">3 days ago</p>
              </div>
              <div>
                <p className="text-gray-600">Success Rate</p>
                <p className="font-semibold">96.8%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};