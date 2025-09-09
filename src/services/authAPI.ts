import BaseAPI from './api';
import type { Doctor, ApiResponse } from '../types/api';

export class AuthAPI extends BaseAPI {
  // Doctor login for web portal (different from mobile app)
  static async doctorLogin(data: {
    email: string;
    password: string;
  }): Promise<ApiResponse<Doctor & { token: string }>> {
    console.log('🔑 AuthAPI.doctorLogin called with:', { email: data.email });
    
    try {
      // Try web-specific login endpoint first
      console.log('🔍 Trying web login endpoint: /api/doctorWebLogin');
      try {
        const response = await this.post('/doctorWebLogin', {
          email: data.email,
          password: data.password,
        });
        console.log('✅ Laravel doctorWebLogin response:', response);
        return response;
      } catch (webError) {
        console.log('⚠️ Web login endpoint not found, trying mobile endpoint without firebase');
        
        // Fallback to mobile endpoint but handle firebase requirement
        const response = await this.post('/doctorLogin', {
          email: data.email,
          password: data.password,
          firebase_token: '', // Empty string instead of null
        });
        console.log('✅ Laravel doctorLogin response:', response);
        return response;
      }
    } catch (error) {
      console.error('❌ Laravel login failed:', error);
      throw error;
    }
  }

  // Alternative: Try basic auth endpoint
  static async basicLogin(data: {
    email: string;
    password: string;
  }): Promise<ApiResponse<Doctor & { token: string }>> {
    console.log('🔑 Trying basic login endpoint');
    try {
      // Try common Laravel auth endpoints
      const endpoints = ['/login', '/auth/login', '/doctor/login', '/web/login'];
      
      for (const endpoint of endpoints) {
        try {
          console.log(`🔍 Trying endpoint: ${endpoint}`);
          const response = await this.post(endpoint, {
            email: data.email,
            password: data.password,
          });
          console.log(`✅ Success with ${endpoint}:`, response);
          return response;
        } catch (endpointError) {
          console.log(`❌ ${endpoint} failed:`, endpointError.message);
          continue;
        }
      }
      
      throw new Error('No working login endpoint found');
    } catch (error) {
      console.error('❌ Basic login failed:', error);
      throw error;
    }
  }

  // Mobile doctor login with firebase token
  static async mobileDoctorLogin(data: {
    email: string;
    password: string;
    firebase_token?: string;
  }): Promise<ApiResponse<Doctor & { token: string }>> {
    console.log('📱 AuthAPI.mobileDoctorLogin called');
    try {
      const response = await this.post('/doctorLogin', {
        email: data.email,
        password: data.password,
        firebase_token: data.firebase_token || null
      });
      console.log('✅ Laravel doctorLogin response:', response);
      return response;
    } catch (error) {
      console.error('❌ Laravel doctorLogin failed:', error);
      throw error;
    }
  }

  // Test connection to your Laravel backend
  static async testConnection(): Promise<any> {
    console.log('🧪 Testing Laravel connection...');
    return BaseAPI.testConnection();
  }

  // Fetch doctor profile using your exact endpoint
  static async fetchDoctorProfile(token: string): Promise<ApiResponse<Doctor>> {
    console.log('👤 AuthAPI.fetchDoctorProfile called');
    try {
      const response = await this.post('/fetchMyDoctorProfile', {}, token);
      console.log('✅ fetchMyDoctorProfile response:', response);
      return response;
    } catch (error) {
      console.error('❌ fetchMyDoctorProfile failed:', error);
      throw error;
    }
  }

  // Update doctor profile using your exact endpoint
  static async updateDoctorProfile(data: any, token: string): Promise<ApiResponse<Doctor>> {
    console.log('📝 AuthAPI.updateDoctorProfile called');
    try {
      const response = await this.post('/updateDoctorDetails', data, token);
      console.log('✅ updateDoctorDetails response:', response);
      return response;
    } catch (error) {
      console.error('❌ updateDoctorDetails failed:', error);
      throw error;
    }
  }
}