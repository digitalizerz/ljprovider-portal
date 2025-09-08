// API Configuration for Laravel Superadmin Backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://portal.lovejoy.health/api';

// Custom headers required by your Laravel middleware
const getHeaders = (token?: string) => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-Custom-Header': import.meta.env.VITE_CUSTOM_HEADER || 'lovejoy-health-portal',
  ...(token && { 'Authorization': `Bearer ${token}` }),
});

// Enhanced API class with better error handling and debugging
class BaseAPI {
  static async request<T>(
    endpoint: string, 
    options: RequestInit = {},
    token?: string
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    console.log('🔗 API Request:', {
      url,
      method: options.method || 'GET',
      headers: getHeaders(token),
      hasToken: !!token
    });

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          ...getHeaders(token),
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);
      
      console.log('📡 API Response:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error Response:', errorText);
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ API Success:', data);
      return data;
      
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('⏰ API Timeout:', url);
        throw new Error('Request timeout - please check your connection and API server');
      }
      
      console.error('💥 API Request Failed:', {
        url,
        error: error.message,
        stack: error.stack
      });
      
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