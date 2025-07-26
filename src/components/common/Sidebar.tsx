import React from 'react';
import type { MenuItem, SystemStatus } from '../../types/dashboard';

interface SidebarProps {
  menuItems: MenuItem[];
  currentPage: string;
  onPageChange: (pageId: string) => void;
  systemStatus: SystemStatus;
}

export const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
  currentPage,
  onPageChange,
  systemStatus
}) => {
  return (
    <aside className="w-64 bg-white shadow-sm h-screen sticky top-0">
      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                currentPage === item.id
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">System Status</h4>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>AI Models:</span>
              <span className={systemStatus.aiModels ? "text-green-600" : "text-red-600"}>
                {systemStatus.aiModels ? "✓ Active" : "✗ Offline"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Blockchain:</span>
              <span className={systemStatus.blockchain ? "text-green-600" : "text-red-600"}>
                {systemStatus.blockchain ? "✓ Synced" : "✗ Offline"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Satellite Feed:</span>
              <span className={systemStatus.satelliteFeed ? "text-green-600" : "text-red-600"}>
                {systemStatus.satelliteFeed ? "✓ Live" : "✗ Offline"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>API Services:</span>
              <span className={systemStatus.apiServices ? "text-green-600" : "text-red-600"}>
                {systemStatus.apiServices ? "✓ Online" : "✗ Offline"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};