import { useState, useCallback } from 'react';
import type { RealTimeData } from '../types/dashboard';
import { useInterval } from './useInterval';

interface UseRealTimeDataOptions {
  updateInterval?: number;
  autoUpdate?: boolean;
}

interface UseRealTimeDataReturn extends RealTimeData {
  startUpdates: () => void;
  stopUpdates: () => void;
  forceUpdate: () => void;
  isUpdating: boolean;
}

export const useRealTimeData = (options: UseRealTimeDataOptions = {}): UseRealTimeDataReturn => {
  const { updateInterval = 3000, autoUpdate = true } = options;
  
  const [data, setData] = useState<RealTimeData>({
    propertiesProcessed: 45782,
    fraudDetected: 23,
    revenueGenerated: 2.4,
    accuracyRate: 96.8
  });

  const [isUpdating, setIsUpdating] = useState<boolean>(autoUpdate);

  const updateData = useCallback(() => {
    setData(prev => ({
      propertiesProcessed: prev.propertiesProcessed + Math.floor(Math.random() * 5),
      fraudDetected: prev.fraudDetected + (Math.random() > 0.95 ? 1 : 0),
      revenueGenerated: prev.revenueGenerated + (Math.random() * 0.1),
      accuracyRate: 96.5 + (Math.random() * 0.6)
    }));
  }, []);

  const startUpdates = useCallback(() => {
    setIsUpdating(true);
  }, []);

  const stopUpdates = useCallback(() => {
    setIsUpdating(false);
  }, []);

  const forceUpdate = useCallback(() => {
    updateData();
  }, [updateData]);

  // Use our custom useInterval hook
  useInterval(
    updateData,
    isUpdating ? updateInterval : null
  );

  return {
    ...data,
    startUpdates,
    stopUpdates,
    forceUpdate,
    isUpdating
  };
};