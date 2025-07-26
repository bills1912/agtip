import React from 'react';
import { Building, DollarSign, Shield, Target, TrendingUp, LineChart, PieChart, Activity } from 'lucide-react';
import { StatusCard } from '../common/StatusCard';
import { LoadingSpinner } from '../common/LoadingSpinner';
import type { RealTimeData, Activity as ActivityType } from '../../types/dashboard';
import { formatNumber, formatPercentage, } from '../../utils/formatters';

interface OverviewProps {
  realTimeData: RealTimeData;
  loading?: boolean;
}

export const Overview: React.FC<OverviewProps> = ({ realTimeData, loading = false }) => {
  const activities: ActivityType[] = [
    { time: '14:32', action: 'Property assessment completed', location: 'Jakarta Selatan', status: 'success' },
    { time: '14:28', action: 'Fraud alert triggered', location: 'Bandung', status: 'warning' },
    { time: '14:25', action: 'Blockchain validation successful', location: 'Surabaya', status: 'success' },
    { time: '14:22', action: 'Satellite data processed', location: 'Medan', status: 'info' },
    { time: '14:18', action: 'New policy recommendation generated', location: 'System', status: 'info' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatusCard
          title="Properties Processed Today"
          value={formatNumber(realTimeData.propertiesProcessed)}
          subtitle="+12.5% dari kemarin"
          icon={Building}
          variant="primary"
          trend={{ direction: 'up', value: '+12.5%', color: 'text-green-300' }}
        />

        <StatusCard
          title="Revenue Generated"
          value={`IDR ${realTimeData.revenueGenerated.toFixed(1)}T`}
          subtitle="+300% improvement"
          icon={DollarSign}
          variant="success"
          trend={{ direction: 'up', value: '+300%', color: 'text-green-300' }}
        />

        <StatusCard
          title="Fraud Detected"
          value={realTimeData.fraudDetected}
          subtitle="Under investigation"
          icon={Shield}
          variant="danger"
        />

        <StatusCard
          title="AI Accuracy Rate"
          value={formatPercentage(realTimeData.accuracyRate)}
          subtitle="Target: >95%"
          icon={Target}
          variant="primary"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <LineChart className="h-5 w-5 mr-2 text-blue-500" />
            Tax Collection Trend
          </h3>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-16 w-16 text-blue-400 mx-auto mb-2" />
              <p className="text-gray-600">Real-time chart visualization</p>
              <p className="text-sm text-gray-500">300% improvement YoY</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <PieChart className="h-5 w-5 mr-2 text-green-500" />
            Financial Inclusion Coverage
          </h3>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <div className="text-center">
              <Target className="h-16 w-16 text-green-400 mx-auto mb-2" />
              <p className="text-gray-600">Coverage by Region</p>
              <p className="text-sm text-gray-500">Jakarta: 87% | Bandung: 72%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Activity className="h-5 w-5 mr-2 text-indigo-500" />
          Recent System Activities
        </h3>
        <div className="space-y-3 scrollbar-thin max-h-64 overflow-y-auto">
          {activities.map((activity, index) => {
            const statusColors: Record<ActivityType['status'], string> = {
              success: 'bg-green-400',
              warning: 'bg-yellow-400',
              info: 'bg-blue-400'
            };

            return (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded transition-colors hover:bg-gray-100">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${statusColors[activity.status]}`}></div>
                  <div>
                    <p className="font-medium text-balance">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.location}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};