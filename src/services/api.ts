// API Configuration and Base Service
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://portal.lovejoy.health/api';

// API Headers with custom middleware requirement
const getHeaders = (token?: string) => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-Custom-Header': import.meta.env.VITE_CUSTOM_HEADER || 'lovejoy-health-portal', // Required by checkHeader middleware
  ...(token && { 'Authorization': `Bearer ${token}` }),
});

// Base API class with error handling
class BaseAPI {
  static async request<T>(
    endpoint: string, 
    options: RequestInit = {},
    token?: string
  ): Promise<T> {
    try {
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          ...getHeaders(token),
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - please check your connection');
      }
      console.error('API Request failed:', error);
      throw error;
    }
  }

  static async post<T>(endpoint: string, data: any, token?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }, token);
  }

  static async get<T>(endpoint: string, token?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
    }, token);
  }
}

export default BaseAPI;