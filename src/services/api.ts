import type { ApiResponse, PaginatedResponse } from '../types/dashboard';
import type { Property } from '../types/property';
import type { Block, Transaction } from '../types/blockchain';

export class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = import.meta.env.VITE_API_URL || 'http://localhost:3001/api') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Property methods
  async getProperties(): Promise<ApiResponse<PaginatedResponse<Property>>> {
    return this.get('/properties');
  }

  async getPropertyById(id: string): Promise<ApiResponse<Property>> {
    return this.get(`/properties/${id}`);
  }

  async updateProperty(id: string, data: Partial<Property>): Promise<ApiResponse<Property>> {
    return this.put(`/properties/${id}`, data);
  }

  // Fraud detection methods
//   async getFraudAlerts(): Promise<ApiResponse<PaginatedResponse<FraudAlert>>> {
//     return this.get('/fraud/alerts');
//   }

//   async updateFraudAlert(id: string, status: FraudAlert['status']): Promise<ApiResponse<FraudAlert>> {
//     return this.put(`/fraud/alerts/${id}`, { status });
//   }

  // Blockchain methods
  async getBlocks(limit = 10): Promise<ApiResponse<Block[]>> {
    return this.get(`/blockchain/blocks?limit=${limit}`);
  }

  async getTransactions(limit = 20): Promise<ApiResponse<Transaction[]>> {
    return this.get(`/blockchain/transactions?limit=${limit}`);
  }

  async getBlockByNumber(blockNumber: string): Promise<ApiResponse<Block>> {
    return this.get(`/blockchain/blocks/${blockNumber}`);
  }
}

export const apiService = new ApiService();