// src/components/pages/Monitoring.tsx
import React, { useState, useCallback } from 'react';
import { Map, Globe, RefreshCw, Download, MapPin, Layers, Eye, AlertTriangle } from 'lucide-react';
import { useInterval } from '../../hooks/useInterval';
import { useToggle } from '../../hooks/useToggle';
import { formatNumber, formatRelativeTime } from '../../utils/formatters';

interface SatelliteMarker {
  id: string;
  lat: number;
  lng: number;
  status: 'new_construction' | 'under_review' | 'verified' | 'no_change';
  propertyId: string;
  lastUpdate: string;
  confidence: number;
}

interface MonitoringStats {
  propertiesMonitored: number;
  changesDetected: number;
  processingSpeed: number;
  satelliteFeeds: number;
}

export const Monitoring: React.FC = () => {
  const [isLiveMode, toggleLiveMode] = useToggle(true);
  const [selectedLayer, setSelectedLayer] = useState<'satellite' | 'changes' | 'heatmap'>('satellite');
  const [stats, setStats] = useState<MonitoringStats>({
    propertiesMonitored: 2400000,
    changesDetected: 1247,
    processingSpeed: 3.2,
    satelliteFeeds: 4
  });

  const [markers] = useState<SatelliteMarker[]>([
    { id: '1', lat: -6.2088, lng: 106.8456, status: 'new_construction', propertyId: 'JKT-001234', lastUpdate: '2024-01-15T14:32:00Z', confidence: 95 },
    { id: '2', lat: -6.9175, lng: 107.6191, status: 'under_review', propertyId: 'BDG-005678', lastUpdate: '2024-01-15T14:28:00Z', confidence: 87 },
    { id: '3', lat: -7.2575, lng: 112.7521, status: 'verified', propertyId: 'SBY-009876', lastUpdate: '2024-01-15T14:25:00Z', confidence: 98 },
    { id: '4', lat: 3.5952, lng: 98.6722, status: 'no_change', propertyId: 'MDN-004321', lastUpdate: '2024-01-15T14:22:00Z', confidence: 92 }
  ]);

  // Simulate real-time updates
  useInterval(() => {
    if (isLiveMode) {
      setStats(prev => ({
        propertiesMonitored: prev.propertiesMonitored + Math.floor(Math.random() * 10),
        changesDetected: prev.changesDetected + (Math.random() > 0.7 ? 1 : 0),
        processingSpeed: 2.8 + (Math.random() * 0.8),
        satelliteFeeds: prev.satelliteFeeds
      }));
    }
  }, 5000);

  const handleExportData = useCallback(() => {
    console.log('Exporting monitoring data...');
  }, []);

  const handleRefreshData = useCallback(() => {
    console.log('Refreshing satellite data...');
  }, []);

  const getMarkerColor = (status: SatelliteMarker['status']): string => {
    const colors = {
      'new_construction': 'bg-red-500',
      'under_review': 'bg-yellow-500',
      'verified': 'bg-green-500',
      'no_change': 'bg-blue-500'
    };
    return colors[status];
  };

  const getStatusLabel = (status: SatelliteMarker['status']): string => {
    const labels = {
      'new_construction': 'New Construction',
      'under_review': 'Under Review',
      'verified': 'Verified',
      'no_change': 'No Change'
    };
    return labels[status];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Real-time Property Monitoring</h2>
          <p className="text-gray-600">Satellite-powered property change detection</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleRefreshData}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <button 
            onClick={handleExportData}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold text-gray-700">Properties Monitored</h4>
          <p className="text-2xl font-bold text-blue-600">{formatNumber(stats.propertiesMonitored)}</p>
          <p className="text-sm text-gray-500">Jakarta Metropolitan</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold text-gray-700">Changes Detected Today</h4>
          <p className="text-2xl font-bold text-green-600">{formatNumber(stats.changesDetected)}</p>
          <p className="text-sm text-gray-500">Auto-flagged for review</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold text-gray-700">Processing Speed</h4>
          <p className="text-2xl font-bold text-purple-600">{stats.processingSpeed.toFixed(1)}s</p>
          <p className="text-sm text-gray-500">Average per property</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold text-gray-700">Satellite Feeds</h4>
          <p className="text-2xl font-bold text-orange-600">{stats.satelliteFeeds}</p>
          <p className="text-sm text-gray-500">
            <span className={`w-2 h-2 rounded-full inline-block mr-1 ${isLiveMode ? 'bg-green-500' : 'bg-gray-400'}`}></span>
            {isLiveMode ? 'Live' : 'Offline'}
          </p>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Map className="h-5 w-5 mr-2 text-blue-500" />
            Satellite Monitoring Dashboard
          </h3>
          <div className="flex items-center gap-4">
            {/* Layer Controls */}
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-gray-500" />
              <select 
                value={selectedLayer}
                onChange={(e) => setSelectedLayer(e.target.value as typeof selectedLayer)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="satellite">Satellite View</option>
                <option value="changes">Change Detection</option>
                <option value="heatmap">Heat Map</option>
              </select>
            </div>
            
            {/* Live Mode Toggle */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isLiveMode}
                onChange={toggleLiveMode}
                className="rounded"
              />
              <span className="text-sm">Live Mode</span>
            </label>
          </div>
        </div>

        {/* Simulated Map View */}
        <div className="h-96 bg-gradient-to-b from-blue-100 to-green-100 rounded-lg flex items-center justify-center relative overflow-hidden">
          {/* Map Info Panel */}
          <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow z-10">
            <p className="text-sm font-medium">Live Satellite Feed</p>
            <p className="text-xs text-gray-600">Sentinel-2 | 10m resolution</p>
            <p className="text-xs text-gray-600">Last Update: {new Date().toLocaleTimeString()}</p>
          </div>
          
          {/* Simulated Property Markers */}
          {markers.map((marker) => (
            <div
              key={marker.id}
              className={`absolute w-3 h-3 ${getMarkerColor(marker.status)} rounded-full ${
                marker.status === 'new_construction' || marker.status === 'under_review' ? 'animate-pulse' : ''
              }`}
              style={{
                top: `${20 + (Math.abs(marker.lat) * 8)}%`,
                left: `${20 + (marker.lng > 0 ? marker.lng * 0.5 : Math.abs(marker.lng) * 0.5)}%`
              }}
              title={`${marker.propertyId} - ${getStatusLabel(marker.status)}`}
            />
          ))}
          
          {/* Center Content */}
          <div className="text-center">
            <Globe className="h-16 w-16 text-blue-400 mx-auto mb-2" />
            <p className="text-gray-600">Interactive Map View</p>
            <p className="text-sm text-gray-500">Showing real-time property changes</p>
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow z-10">
            <h4 className="text-xs font-semibold mb-2">Legend</h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>New Construction</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Under Review</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>No Change</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Detections */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
          Recent Change Detections
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Property ID</th>
                <th className="text-left py-2">Location</th>
                <th className="text-left py-2">Change Type</th>
                <th className="text-left py-2">Confidence</th>
                <th className="text-left py-2">Detected</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {markers.map((marker) => (
                <tr key={marker.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 font-mono text-xs">{marker.propertyId}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      {marker.lat.toFixed(4)}, {marker.lng.toFixed(4)}
                    </div>
                  </td>
                  <td className="py-3">{getStatusLabel(marker.status)}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${marker.confidence > 90 ? 'bg-green-500' : marker.confidence > 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${marker.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs">{marker.confidence}%</span>
                    </div>
                  </td>
                  <td className="py-3">{formatRelativeTime(marker.lastUpdate)}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      marker.status === 'verified' ? 'bg-green-100 text-green-800' :
                      marker.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                      marker.status === 'new_construction' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {getStatusLabel(marker.status)}
                    </span>
                  </td>
                  <td className="py-3">
                    <button className="text-blue-500 hover:text-blue-700">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};