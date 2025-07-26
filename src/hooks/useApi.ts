import { useState, useEffect, useCallback } from 'react';
import type { ApiResponse } from '../types/dashboard';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  immediate?: boolean;
  dependencies?: unknown[];
}

export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  options: UseApiOptions = {}
): UseApiState<T> & { refetch: () => Promise<void> } {
  const { immediate = true, dependencies = [] } = options;
  
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await apiCall();
      if (response.success) {
        setState({ data: response.data, loading: false, error: null });
      } else {
        setState({ 
          data: null, 
          loading: false, 
          error: response.message || 'Request failed' 
        });
      }
    } catch (error) {
      setState({ 
        data: null, 
        loading: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  }, [apiCall]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute, ...dependencies]);

  return {
    ...state,
    refetch: execute
  };
}