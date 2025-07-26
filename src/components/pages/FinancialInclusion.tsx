// src/components/pages/FinancialInclusion.tsx
import React, { useState } from 'react';
import { TrendingUp, MapPin, Users, DollarSign, CreditCard, Smartphone, Building, Target } from 'lucide-react';
import type { InclusionMetrics, FinancialProgram } from '../../types/financial';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { StatusCard } from '../common/StatusCard';

export const FinancialInclusion: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1M' | '3M' | '6M' | '1Y'>('3M');

  // Mock data for financial inclusion metrics
  const [overallMetrics] = useState({
    msmeAccessRate: 68.4,
    financialServicePoints: 2847,
    digitalLiteracyRate: 73.2,
    creditDisbursed: 12.4
  });

  const [regionalMetrics] = useState<InclusionMetrics[]>([
    {
      region: 'Jakarta',
      msmeAccessRate: 87.2,
      digitalLiteracyRate: 89.5,
      financialServicePoints: 1247,
      creditDisbursed: 5.8,
      population: 10560000,
      coordinates: { lat: -6.2088, lng: 106.8456 }
    },
    {
      region: 'Bandung',
      msmeAccessRate: 72.1,
      digitalLiteracyRate: 78.3,
      financialServicePoints: 523,
      creditDisbursed: 2.1,
      population: 2500000,
      coordinates: { lat: -6.9175, lng: 107.6191 }
    },
    {
      region: 'Surabaya',
      msmeAccessRate: 69.8,
      digitalLiteracyRate: 75.6,
      financialServicePoints: 687,
      creditDisbursed: 2.8,
      population: 2800000,
      coordinates: { lat: -7.2575, lng: 112.7521 }
    },
    {
      region: 'Medan',
      msmeAccessRate: 58.3,
      digitalLiteracyRate: 64.2,
      financialServicePoints: 390,
      creditDisbursed: 1.7,
      population: 2200000,
      coordinates: { lat: 3.5952, lng: 98.6722 }
    }
  ]);

  const [financialPrograms] = useState<FinancialProgram[]>([
    {
      id: 'KUR-001',
      name: 'KUR Mikro',
      type: 'KUR Mikro',
      disbursed: 2100000000000,
      beneficiaries: 45678,
      interestRate: 6,
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    },
    {
      id: 'KUR-002',
      name: 'KUR Kecil',
      type: 'KUR Kecil',
      disbursed: 4800000000000,
      beneficiaries: 23456,
      interestRate: 6,
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    },
    {
      id: 'KUR-003',
      name: 'KUR TKI',
      type: 'KUR TKI',
      disbursed: 890000000000,
      beneficiaries: 3421,
      interestRate: 6,
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    }
  ]);

  const filteredMetrics = selectedRegion === 'all' 
    ? regionalMetrics 
    : regionalMetrics.filter(metric => metric.region.toLowerCase() === selectedRegion.toLowerCase());

  const getAccessRateColor = (rate: number): string => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Financial Inclusion Dashboard</h2>
          <p className="text-gray-600">Promoting financial access and MSME growth</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Regions</option>
            {regionalMetrics.map(metric => (
              <option key={metric.region} value={metric.region.toLowerCase()}>
                {metric.region}
              </option>
            ))}
          </select>
          <div className="flex border rounded-lg">
            {(['1M', '3M', '6M', '1Y'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedTimeframe(period)}
                className={`px-3 py-2 text-sm ${
                  selectedTimeframe === period
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                } ${period === '1M' ? 'rounded-l-lg' : period === '1Y' ? 'rounded-r-lg' : ''}`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatusCard
          title="MSME Access Rate"
          value={`${overallMetrics.msmeAccessRate}%`}
          subtitle="+50% improvement"
          icon={TrendingUp}
          variant="success"
          trend={{ direction: 'up', value: '+50%', color: 'text-green-300' }}
        />

        <StatusCard
          title="Financial Services"
          value={formatNumber(overallMetrics.financialServicePoints)}
          subtitle="Active touchpoints"
          icon={MapPin}
          variant="primary"
        />

        <StatusCard
          title="Digital Literacy"
          value={`${overallMetrics.digitalLiteracyRate}%`}
          subtitle="+60% from baseline"
          icon={Smartphone}
          variant="warning"
          trend={{ direction: 'up', value: '+60%', color: 'text-green-300' }}
        />

        <StatusCard
          title="Credit Disbursed"
          value={`IDR ${overallMetrics.creditDisbursed}T`}
          subtitle="This quarter"
          icon={DollarSign}
          variant="success"
        />
      </div>

      {/* Regional Coverage Map */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Regional Financial Inclusion Coverage</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Visualization */}
          <div className="h-64 bg-gradient-to-b from-blue-50 to-green-50 rounded-lg flex items-center justify-center relative">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-blue-400 mx-auto mb-2" />
              <p className="text-gray-600">Indonesia Financial Inclusion Map</p>
            </div>
            
            {/* Regional indicators */}
            <div className="absolute top-4 left-4 space-y-2">
              {regionalMetrics.slice(0, 3).map((metric) => (
                <div key={metric.region} className="bg-white p-2 rounded shadow text-xs">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      metric.msmeAccessRate >= 80 ? 'bg-green-500' :
                      metric.msmeAccessRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span>{metric.region}: {metric.msmeAccessRate}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Statistics */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-700">Regional Performance</h4>
            {filteredMetrics.map((metric) => (
              <div key={metric.region} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    metric.msmeAccessRate >= 80 ? 'bg-green-500' :
                    metric.msmeAccessRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="font-medium">{metric.region}</p>
                    <p className="text-sm text-gray-600">Pop: {formatNumber(metric.population)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${getAccessRateColor(metric.msmeAccessRate)}`}>
                    {metric.msmeAccessRate}%
                  </p>
                  <p className="text-sm text-gray-500">Access Rate</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MSME Credit Programs and Impact Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MSME Credit Programs */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">MSME Credit Programs</h3>
          <div className="space-y-4">
            {financialPrograms.map((program) => (
              <div key={program.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800">{program.name}</h4>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    {program.interestRate}%
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Disbursed</p>
                    <p className="font-semibold">{formatCurrency(program.disbursed / 1000000000000, 'IDR')}T</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Beneficiaries</p>
                    <p className="font-semibold">{formatNumber(program.beneficiaries)}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Utilization</span>
                    <span>78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Property Valuation Impact */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Property Valuation Impact</h3>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                <Building className="h-4 w-4 mr-2" />
                Before AGTIP
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Avg. Valuation Time:</span>
                  <span className="font-semibold">3-6 months</span>
                </div>
                <div className="flex justify-between">
                  <span>Accuracy Rate:</span>
                  <span className="font-semibold">68%</span>
                </div>
                <div className="flex justify-between">
                  <span>MSME Access:</span>
                  <span className="font-semibold">45%</span>
                </div>
                <div className="flex justify-between">
                  <span>Credit Approval:</span>
                  <span className="font-semibold">12 weeks</span>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                <Target className="h-4 w-4 mr-2" />
                After AGTIP
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Avg. Valuation Time:</span>
                  <span className="font-semibold text-green-600">&lt;5 seconds</span>
                </div>
                <div className="flex justify-between">
                  <span>Accuracy Rate:</span>
                  <span className="font-semibold text-green-600">96.8%</span>
                </div>
                <div className="flex justify-between">
                  <span>MSME Access:</span>
                  <span className="font-semibold text-green-600">68.4%</span>
                </div>
                <div className="flex justify-between">
                  <span>Credit Approval:</span>
                  <span className="font-semibold text-green-600">2-3 days</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-3 rounded-lg">
              <h5 className="font-semibold text-yellow-800 text-sm mb-1">Key Improvements</h5>
              <ul className="text-xs text-yellow-700 space-y-1">
                <li>• 99.9% faster property valuation</li>
                <li>• 52% increase in MSME financial access</li>
                <li>• 95% reduction in processing time</li>
                <li>• 42% improvement in accuracy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Literacy and Service Points */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Digital Literacy Progress */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Smartphone className="h-5 w-5 mr-2 text-blue-500" />
            Digital Literacy Progress
          </h3>
          <div className="space-y-4">
            {regionalMetrics.map((metric) => (
              <div key={metric.region}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{metric.region}</span>
                  <span className="font-semibold">{metric.digitalLiteracyRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      metric.digitalLiteracyRate >= 80 ? 'bg-green-500' :
                      metric.digitalLiteracyRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${metric.digitalLiteracyRate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-3 bg-blue-50 rounded-lg">
            <h5 className="font-semibold text-blue-800 text-sm mb-2">Training Programs</h5>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-blue-600">Mobile Banking</p>
                <p className="font-semibold">12,450 trained</p>
              </div>
              <div>
                <p className="text-blue-600">Digital Payments</p>
                <p className="font-semibold">8,920 trained</p>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Service Points */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-green-500" />
            Financial Service Points
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <CreditCard className="h-8 w-8 text-green-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-green-600">1,247</p>
              <p className="text-xs text-green-700">ATMs</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Building className="h-8 w-8 text-blue-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-blue-600">892</p>
              <p className="text-xs text-blue-700">Bank Branches</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-purple-600">708</p>
              <p className="text-xs text-purple-700">Agents</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <Smartphone className="h-8 w-8 text-orange-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-orange-600">156</p>
              <p className="text-xs text-orange-700">Digital Kiosks</p>
            </div>
          </div>

          <div className="space-y-3">
            <h5 className="font-semibold text-gray-700 text-sm">Coverage by Region</h5>
            {regionalMetrics.map((metric) => (
              <div key={metric.region} className="flex justify-between items-center">
                <span className="text-sm">{metric.region}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{metric.financialServicePoints}</span>
                  <span className="text-xs text-gray-500">points</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};