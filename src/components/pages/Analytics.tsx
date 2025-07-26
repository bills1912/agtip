// src/components/pages/Analytics.tsx
import React, { useState } from 'react';
import { TrendingUp, ArrowDown, Zap, Users, Download, LineChart, PieChart } from 'lucide-react';
import type { RegionalPerformance, SystemMetrics } from '../../types/analytics';
import { formatNumber, formatPercentage, formatCurrency } from '../../utils/formatters';
import { StatusCard } from '../common/StatusCard';

export const Analytics: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
//   const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'efficiency' | 'satisfaction' | 'cost'>('revenue');

  // Mock analytics data
  const [kpiData] = useState({
    taxCollectionEfficiency: 347,
    costReduction: 73,
    processingSpeed: 3.2,
    citizenSatisfaction: 89
  });

  const [regionalPerformance] = useState<RegionalPerformance[]>([
    { region: 'Jakarta', efficiency: 94, revenue: 45.2, growth: 320, population: 10560000, area: 664 },
    { region: 'Bandung', efficiency: 87, revenue: 12.8, growth: 280, population: 2500000, area: 167 },
    { region: 'Surabaya', efficiency: 82, revenue: 18.4, growth: 295, population: 2800000, area: 333 },
    { region: 'Medan', efficiency: 76, revenue: 8.9, growth: 245, population: 2200000, area: 265 }
  ]);

  const [systemMetrics] = useState<SystemMetrics>({
    uptime: 99.94,
    responseTime: 3.2,
    errorRate: 0.06,
    throughput: 1247,
    activeUsers: 2847,
    apiCalls: 458923
  });

//   const [revenueData] = useState([
//     { month: 'Jan', manual: 12.5, agtip: 52.3 },
//     { month: 'Feb', manual: 11.8, agtip: 58.7 },
//     { month: 'Mar', manual: 13.2, agtip: 62.1 },
//     { month: 'Apr', manual: 12.1, agtip: 65.4 },
//     { month: 'May', manual: 14.3, agtip: 71.2 },
//     { month: 'Jun', manual: 13.9, agtip: 74.8 }
//   ]);

  const [impactMetrics] = useState([
    { metric: 'Properties Assessed', before: 1250, after: 45782, unit: '/month' },
    { metric: 'Assessment Time', before: 180, after: 3.2, unit: 'days → seconds' },
    { metric: 'Fraud Detection', before: 12, after: 96.8, unit: '% accuracy' },
    { metric: 'Cost per Assessment', before: 850000, after: 12500, unit: 'IDR' },
    { metric: 'Revenue Collection', before: 15.2, after: 67.8, unit: 'trillion IDR' },
    { metric: 'Citizen Satisfaction', before: 42, after: 89, unit: '% rating' }
  ]);

  const handleExportReport = () => {
    console.log('Exporting analytics report...');
  };

  const getEfficiencyColor = (efficiency: number): string => {
    if (efficiency >= 90) return 'text-green-600';
    if (efficiency >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGrowthColor = (growth: number): string => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const calculateImprovement = (before: number, after: number): number => {
    return ((after - before) / before) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Analytics & Reports</h2>
          <p className="text-gray-600">Comprehensive performance insights and impact analysis</p>
        </div>
        <div className="flex gap-2">
          <div className="flex border rounded-lg">
            {(['7d', '30d', '90d', '1y'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setSelectedTimeRange(range)}
                className={`px-3 py-2 text-sm ${
                  selectedTimeRange === range
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                } ${range === '7d' ? 'rounded-l-lg' : range === '1y' ? 'rounded-r-lg' : ''}`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
          <button 
            onClick={handleExportReport}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatusCard
          title="Tax Collection Efficiency"
          value={`+${kpiData.taxCollectionEfficiency}%`}
          subtitle="vs. manual system"
          icon={TrendingUp}
          variant="success"
          trend={{ direction: 'up', value: `+${kpiData.taxCollectionEfficiency}%`, color: 'text-green-300' }}
        />

        <StatusCard
          title="Cost Reduction"
          value={`${kpiData.costReduction}%`}
          subtitle="operational costs"
          icon={ArrowDown}
          variant="primary"
        />

        <StatusCard
          title="Processing Speed"
          value={`${kpiData.processingSpeed}s`}
          subtitle="avg. per property"
          icon={Zap}
          variant="warning"
        />

        <StatusCard
          title="Citizen Satisfaction"
          value={`${kpiData.citizenSatisfaction}%`}
          subtitle="satisfaction rate"
          icon={Users}
          variant="success"
        />
      </div>

      {/* Revenue Impact Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <LineChart className="h-5 w-5 mr-2 text-green-500" />
            Revenue Impact Analysis
          </h3>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center mb-4">
            <div className="text-center">
              <TrendingUp className="h-16 w-16 text-green-400 mx-auto mb-2" />
              <p className="text-gray-600">Revenue Growth Trend</p>
              <p className="text-sm text-gray-500">IDR 150T+ annual improvement</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center p-3 bg-red-50 rounded">
              <p className="text-red-800 font-semibold">Before AGTIP</p>
              <p className="text-2xl font-bold text-red-600">IDR 15.2T</p>
              <p className="text-xs text-red-600">Annual collection</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded">
              <p className="text-green-800 font-semibold">After AGTIP</p>
              <p className="text-2xl font-bold text-green-600">IDR 67.8T</p>
              <p className="text-xs text-green-600">Annual collection</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <PieChart className="h-5 w-5 mr-2 text-blue-500" />
            Regional Performance
          </h3>
          <div className="space-y-4">
            {regionalPerformance.map((region) => (
              <div key={region.region} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-semibold">{region.region}</p>
                  <p className="text-sm text-gray-600">
                    Pop: {formatNumber(region.population)} | Area: {region.area}km²
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${getEfficiencyColor(region.efficiency)}`}>
                    {region.efficiency}%
                  </p>
                  <p className="text-sm text-gray-500">Efficiency</p>
                  <p className={`text-xs font-medium ${getGrowthColor(region.growth)}`}>
                    +{region.growth}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Before vs After Comparison */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Before vs After AGTIP Implementation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {impactMetrics.map((item, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">{item.metric}</h4>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Before:</span>
                  <span className="font-semibold text-red-600">
                    {typeof item.before === 'number' && item.before > 1000000 
                      ? formatCurrency(item.before) 
                      : item.before.toLocaleString()
                    }
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">After:</span>
                  <span className="font-semibold text-green-600">
                    {typeof item.after === 'number' && item.after > 1000000 
                      ? formatCurrency(item.after) 
                      : item.after.toLocaleString()
                    }
                  </span>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{item.unit}</span>
                    <span className={`text-xs font-semibold ${
                      item.metric === 'Assessment Time' || item.metric === 'Cost per Assessment'
                        ? calculateImprovement(item.before, item.after) < 0 ? 'text-green-600' : 'text-red-600'
                        : calculateImprovement(item.before, item.after) > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.metric === 'Assessment Time' || item.metric === 'Cost per Assessment'
                        ? `${formatPercentage(Math.abs(calculateImprovement(item.before, item.after)))} reduction`
                        : `+${formatPercentage(calculateImprovement(item.before, item.after))} improvement`
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Performance Metrics */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">System Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold mb-3">AI Model Performance</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Property Detection</span>
                  <span className="font-semibold">96.8%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '96.8%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Fraud Detection</span>
                  <span className="font-semibold">94.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '94.2%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Value Assessment</span>
                  <span className="font-semibold">97.5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: '97.5%'}}></div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">System Reliability</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Uptime</span>
                  <span className="font-semibold">{systemMetrics.uptime}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: `${systemMetrics.uptime}%`}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Response Time</span>
                  <span className="font-semibold">&lt;{systemMetrics.responseTime}s</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Error Rate</span>
                  <span className="font-semibold">{systemMetrics.errorRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{width: `${systemMetrics.errorRate}%`}}></div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">User Adoption</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Government Users</span>
                  <span className="font-semibold">{formatNumber(systemMetrics.activeUsers)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '89%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Daily Throughput</span>
                  <span className="font-semibold">{formatNumber(systemMetrics.throughput)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '76%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>API Calls</span>
                  <span className="font-semibold">{formatNumber(systemMetrics.apiCalls)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: '92%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Economic Impact Summary */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Economic Impact Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold">IDR 52.6T</p>
            <p className="text-sm opacity-90">Additional Revenue</p>
            <p className="text-xs opacity-75">vs manual system</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">347%</p>
            <p className="text-sm opacity-90">Efficiency Gain</p>
            <p className="text-xs opacity-75">collection improvement</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">73%</p>
            <p className="text-sm opacity-90">Cost Savings</p>
            <p className="text-xs opacity-75">operational reduction</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">2.4M</p>
            <p className="text-sm opacity-90">Properties</p>
            <p className="text-xs opacity-75">assessed monthly</p>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-white/20">
          <p className="text-center text-lg">
            <strong>ROI:</strong> 1,247% return on investment within first year of implementation
          </p>
        </div>
      </div>

      {/* Future Projections */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Future Projections (Next 12 Months)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">IDR 150T</p>
            <p className="text-sm text-green-700">Projected Revenue</p>
            <p className="text-xs text-gray-600">+121% growth</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">5.2M</p>
            <p className="text-sm text-blue-700">Properties Assessed</p>
            <p className="text-xs text-gray-600">+117% increase</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">98.5%</p>
            <p className="text-sm text-purple-700">Target Accuracy</p>
            <p className="text-xs text-gray-600">+1.7% improvement</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-2xl font-bold text-orange-600">85%</p>
            <p className="text-sm text-orange-700">Cost Reduction</p>
            <p className="text-xs text-gray-600">+12% additional</p>
          </div>
        </div>
      </div>
    </div>
  );
};