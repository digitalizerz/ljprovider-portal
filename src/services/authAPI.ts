import BaseAPI from './api';
import type { Doctor, ApiResponse } from '../types/api';

export class AuthAPI extends BaseAPI {
  // Doctor login using your exact Laravel endpoint
  static async doctorLogin(data: {
    email: string;
    password: string;
  }): Promise<ApiResponse<Doctor & { token: string }>> {
    console.log('🔑 AuthAPI.doctorLogin called with:', { email: data.email });
    
    try {
      // Use your exact Laravel endpoint
      console.log('🔍 Calling Laravel endpoint: /api/doctorLogin');
      const response = await this.post('/doctorLogin', data);
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