import React from 'react';
import { Bell, Zap, Users } from 'lucide-react';

interface HeaderProps {
  notifications: number;
  onNotificationClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ notifications, onNotificationClick }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AGTIP</h1>
              <p className="text-xs text-gray-500">Agentic Geospatial Tax Intelligence Platform</p>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="status-indicator bg-green-500"></div>
              <span>System Operational</span>
              <span className="mx-2">|</span>
              <span>Last Update: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell 
              className="h-6 w-6 text-gray-600 cursor-pointer" 
              onClick={onNotificationClick}
            />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-500">System Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};