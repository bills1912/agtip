import React, { useState, useCallback } from 'react';
import { 
  Home,  BarChart3, Shield,  Building, 
  Settings, TrendingUp, Activity, Link 
} from 'lucide-react';

import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { Overview } from './components/pages/Overview';
import { Monitoring } from './components/pages/Monitoring';
import { Assessment } from './components/pages/Assessment';
import { FraudDetection } from './components/pages/FraudDetection';
import { FinancialInclusion } from './components/pages/FinancialInclusion';
import { BlockchainExplorer } from './components/pages/BlockchainExplorer';
import { Analytics } from './components/pages/Analytics';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { useRealTimeData } from './hooks/useRealTimeData';
import { useNotifications } from './hooks/useNotifications';
import type { MenuItem, SystemStatus } from './types/dashboard';

type PageType = 'overview' | 'monitoring' | 'assessment' | 'fraud' | 'financial' | 'blockchain' | 'analytics' | 'settings';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('overview');
  const realTimeData = useRealTimeData();
  const { unreadCount, } = useNotifications();

  const [systemStatus] = useState<SystemStatus>({
    aiModels: true,
    blockchain: true,
    satelliteFeed: true,
    apiServices: true
  });

  const menuItems: MenuItem[] = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'monitoring', label: 'Real-time Monitoring', icon: Activity },
    { id: 'assessment', label: 'Property Assessment', icon: Building },
    { id: 'fraud', label: 'Fraud Detection', icon: Shield },
    { id: 'financial', label: 'Financial Inclusion', icon: TrendingUp },
    { id: 'blockchain', label: 'Blockchain Explorer', icon: Link },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handlePageChange = useCallback((pageId: string): void => {
    if (isValidPage(pageId)) {
      setCurrentPage(pageId);
    }
  }, []);

  const handleNotificationClick = useCallback((): void => {
    console.log('Notification clicked');
    // Implement notification panel logic here
  }, []);

  const isValidPage = (pageId: string): pageId is PageType => {
    const validPages: PageType[] = ['overview', 'monitoring', 'assessment', 'fraud', 'financial', 'blockchain', 'analytics', 'settings'];
    return validPages.includes(pageId as PageType);
  };

  const renderPage = (): React.ReactNode => {
    switch(currentPage) {
      case 'overview':
        return <Overview realTimeData={realTimeData} />;
      case 'monitoring':
        return <Monitoring />;
      case 'assessment':
        return <Assessment />;
      case 'fraud':
        return <FraudDetection />;
      case 'financial':
        return <FinancialInclusion />;
      case 'blockchain':
        return <BlockchainExplorer />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Settings Page</h2>
            <p className="text-gray-600">Settings page will be implemented here with system configuration options.</p>
          </div>
        );
      default:
        return <Overview realTimeData={realTimeData} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100">
        <Header 
          notifications={unreadCount} 
          onNotificationClick={handleNotificationClick}
        />
        
        <div className="flex">
          <Sidebar
            menuItems={menuItems}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            systemStatus={systemStatus}
          />
          
          <main className="flex-1 p-6">
            <ErrorBoundary fallback={
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold text-red-600 mb-2">Page Error</h2>
                <p className="text-gray-600">Failed to load page content. Please try again.</p>
              </div>
            }>
              {renderPage()}
            </ErrorBoundary>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;