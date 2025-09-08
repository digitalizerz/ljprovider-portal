import BaseAPI from './api';
import type { Doctor, ApiResponse } from '../types/api';

export class AuthAPI extends BaseAPI {
  // Doctor login - try multiple possible endpoints
  static async doctorLogin(data: {
    email: string;
    password: string;
  }): Promise<ApiResponse<Doctor & { token: string }>> {
    console.log('🔑 AuthAPI.doctorLogin called with:', { email: data.email });
    
    // Try different possible Laravel endpoints
    const possibleEndpoints = [
      '/api/doctorLogin',      // Laravel API route
      '/doctorLogin',          // Direct route
      '/api/doctor/login',     // RESTful style
      '/doctor/login',         // Web route style
      '/login'                 // Generic login
    ];
    
    for (const endpoint of possibleEndpoints) {
      try {
        console.log(`🔍 Trying endpoint: ${endpoint}`);
        return await this.post(endpoint, data);
      } catch (error) {
        console.log(`❌ Failed endpoint ${endpoint}:`, error.message);
        // Continue to next endpoint
      }
    }
    
    throw new Error('No working login endpoint found. Please check your Laravel routes.');
  }

  // Test connection to Laravel backend
  static async testConnection(): Promise<any> {
    console.log('🧪 Testing Laravel connection...');
    
    const testEndpoints = [
      '/api/test',
      '/test',
      '/api/health',
      '/health',
      '/'  // Root endpoint
    ];
    
    for (const endpoint of testEndpoints) {
      try {
        console.log(`🔍 Testing endpoint: ${endpoint}`);
        const response = await this.get(endpoint);
        console.log(`✅ Working endpoint found: ${endpoint}`, response);
        return { endpoint, response };
      } catch (error) {
        console.log(`❌ Failed endpoint ${endpoint}:`, error.message);
      }
    }
    
    throw new Error('Cannot connect to Laravel backend');
  }

  // Refresh authentication
  static async refreshAuth(token: string): Promise<ApiResponse<Doctor>> {
    console.log('🔄 AuthAPI.refreshAuth called');
    return this.post('/api/refreshAuth', {}, token);
  }

  // Check if doctor profile exists
  static async checkDoctorProfile(data: {
    email: string;
  }): Promise<ApiResponse<{ exists: boolean; status?: string }>> {
    console.log('👤 AuthAPI.checkDoctorProfile called');
    return this.post('/api/checkDoctorProfile', data);
  }
}